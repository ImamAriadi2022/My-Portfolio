/**
 * Client Utility untuk Mengunggah dan Mengelola Media (Vercel Blob Storage)
 */

export async function uploadMedia(file) {
  if (!file) {
    throw new Error('Berkas file wajib dipilih.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Gagal mengunggah media.');
  }

  return data;
}

export async function deleteMedia(fileUrl) {
  if (!fileUrl) return;

  const response = await fetch(`/api/upload?url=${encodeURIComponent(fileUrl)}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Gagal menghapus media.');
  }

  return data;
}

export async function listMedia() {
  const response = await fetch('/api/upload');
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Gagal mengambil daftar media.');
  }
  return data.files || [];
}
