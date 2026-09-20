import { put, del, list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Batasan & Validasi Media
const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.pdf'];

/**
 * Helper untuk sanitasi nama file
 */
function sanitizeFilename(originalName = 'file') {
  const ext = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-');
  return `${base}-${Date.now()}${ext}`;
}

/**
 * POST /api/upload
 * Menerima upload gambar (proyek/blog) atau dokumen PDF (CV)
 */
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let fileBuffer;
    let fileName = 'upload';
    let mimeType = 'application/octet-stream';
    let fileSize = 0;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');

      if (!file || typeof file === 'string') {
        return NextResponse.json(
          { success: false, error: 'Berkas file tidak ditemukan dalam form data.' },
          { status: 400 }
        );
      }

      fileName = file.name || 'upload';
      mimeType = file.type || 'application/octet-stream';
      fileSize = file.size;

      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      // Direct binary stream
      const { searchParams } = new URL(request.url);
      fileName = searchParams.get('filename') || `upload-${Date.now()}.jpg`;
      const arrayBuffer = await request.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
      fileSize = fileBuffer.length;
      mimeType = request.headers.get('content-type') || 'image/jpeg';
    }

    // 1. Validasi Ukuran File
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `Ukuran berkas (${(fileSize / (1024 * 1024)).toFixed(2)} MB) melebihi batas maksimal 4.5 MB.`,
        },
        { status: 400 }
      );
    }

    // 2. Validasi Ekstensi & Tipe MIME
    const ext = path.extname(fileName).toLowerCase();
    const isValidExt = ALLOWED_EXTENSIONS.includes(ext);
    const isValidMime = ALLOWED_MIME_TYPES.includes(mimeType) || mimeType === 'application/octet-stream';

    if (!isValidExt && !isValidMime) {
      return NextResponse.json(
        {
          success: false,
          error: `Format berkas tidak diizinkan. Gunakan JPG, PNG, WebP, SVG, GIF, atau PDF.`,
        },
        { status: 400 }
      );
    }

    const safeFilename = sanitizeFilename(fileName);

    // 3. Simpan ke Vercel Blob Storage jika Token tersedia
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(safeFilename, fileBuffer, {
        access: 'public',
        contentType: mimeType,
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        contentType: blob.contentType,
        size: fileSize,
        storage: 'vercel-blob',
      });
    }

    // 4. Fallback Lokal (Saat development offline / sebelum token Vercel dimasukkan)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const localFilePath = path.join(uploadsDir, safeFilename);
    await fs.writeFile(localFilePath, fileBuffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeFilename}`,
      pathname: safeFilename,
      contentType: mimeType,
      size: fileSize,
      storage: 'local-fallback',
      notice: 'Tersimpan di local fallback (BLOB_READ_WRITE_TOKEN belum diset di .env.local)',
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan saat mengunggah berkas.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/upload?url=...
 * Menghapus berkas media yang sudah diunggah
 */
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');

  if (!fileUrl) {
    return NextResponse.json(
      { success: false, error: 'Parameter URL berkas yang ingin dihapus diperlukan.' },
      { status: 400 }
    );
  }

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN && fileUrl.includes('blob.vercel-storage.com')) {
      await del(fileUrl);
      return NextResponse.json({ success: true, message: 'Berkas di Vercel Blob berhasil dihapus.' });
    }

    // Local file cleanup
    if (fileUrl.startsWith('/uploads/')) {
      const filename = path.basename(fileUrl);
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
      await fs.unlink(filePath).catch(() => null);
      return NextResponse.json({ success: true, message: 'Berkas lokal berhasil dihapus.' });
    }

    return NextResponse.json({ success: true, message: 'Berkas diabaikan (bukan file upload aktif).' });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menghapus berkas.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/upload
 * Menampilkan ringkasan berkas media
 */
export async function GET() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ limit: 20 });
      return NextResponse.json({ success: true, storage: 'vercel-blob', files: blobs });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let localFiles = [];
    try {
      const entries = await fs.readdir(uploadsDir);
      localFiles = entries.map((name) => ({
        pathname: name,
        url: `/uploads/${name}`,
      }));
    } catch {
      localFiles = [];
    }

    return NextResponse.json({
      success: true,
      storage: 'local-fallback',
      files: localFiles,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengambil daftar media.' },
      { status: 500 }
    );
  }
}
