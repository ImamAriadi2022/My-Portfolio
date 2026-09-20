import { createServerClient } from '../../../../lib/supabase/server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengambil data artikel blog.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      excerpt,
      content,
      date,
      readTime,
      image,
      coverImage,
      articleUrl,
      tags,
      featured,
    } = body;

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: 'Judul dan kategori artikel wajib diisi.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Safely assign next sequential ID
    const { data: maxRow } = await supabase
      .from('blogs')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    const nextId = (maxRow && maxRow[0]?.id ? Number(maxRow[0].id) : 0) + 1;

    // Format current date in Indonesian format if date not provided
    const currentDateStr = date || new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const row = {
      id: nextId,
      title,
      category,
      excerpt: excerpt || null,
      content: content || null,
      date: currentDateStr,
      read_time: readTime || '5 menit baca',
      image: image || coverImage || '/assets/img/b4.png',
      cover_image: coverImage || image || '/assets/img/blog-covers/react-hooks.jpg',
      article_url: articleUrl || null,
      tags: Array.isArray(tags) ? tags : [],
      featured: Boolean(featured),
    };

    const { data, error } = await supabase
      .from('blogs')
      .insert([row])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/all-blogs');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin POST blog error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menyimpan artikel blog.' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID artikel diperlukan untuk update.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const row = {};
    if (updates.title !== undefined) row.title = updates.title;
    if (updates.category !== undefined) row.category = updates.category;
    if (updates.excerpt !== undefined) row.excerpt = updates.excerpt;
    if (updates.content !== undefined) row.content = updates.content;
    if (updates.date !== undefined) row.date = updates.date;
    if (updates.readTime !== undefined) row.read_time = updates.readTime;
    if (updates.image !== undefined) row.image = updates.image;
    if (updates.coverImage !== undefined) row.cover_image = updates.coverImage;
    if (updates.articleUrl !== undefined) row.article_url = updates.articleUrl;
    if (updates.tags !== undefined) row.tags = updates.tags;
    if (updates.featured !== undefined) row.featured = Boolean(updates.featured);

    const { data, error } = await supabase
      .from('blogs')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/all-blogs');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin PUT blog error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memperbarui artikel.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID artikel diperlukan untuk penghapusan.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/all-blogs');

    return NextResponse.json({ success: true, message: 'Artikel blog berhasil dihapus.' });
  } catch (error) {
    console.error('Admin DELETE blog error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menghapus artikel.' },
      { status: 500 }
    );
  }
}
