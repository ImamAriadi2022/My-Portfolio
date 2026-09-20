import { createServerClient } from '../../../../lib/supabase/server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengambil data proyek.' },
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
      description,
      goal,
      architecture,
      features,
      image,
      images,
      technologies,
      type,
      demoUrl,
      githubUrl,
      details,
      featured,
    } = body;

    if (!title || !category || !image) {
      return NextResponse.json(
        { success: false, error: 'Judul, kategori, dan gambar cover wajib diisi.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Safely assign next sequential ID
    const { data: maxRow } = await supabase
      .from('projects')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    const nextId = (maxRow && maxRow[0]?.id ? Number(maxRow[0].id) : 0) + 1;

    const row = {
      id: nextId,
      title,
      category,
      description: description || null,
      goal: goal || null,
      architecture: architecture || null,
      features: Array.isArray(features) ? features : [],
      image,
      images: Array.isArray(images) ? images : (images ? [images] : [image]),
      technologies: Array.isArray(technologies) ? technologies : [],
      type: type || 'project',
      demo_url: demoUrl || null,
      github_url: githubUrl || null,
      details: details || null,
      featured: Boolean(featured),
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([row])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/all-projects');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin POST project error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menyimpan proyek.' },
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
        { success: false, error: 'ID proyek diperlukan untuk update.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const row = {};
    if (updates.title !== undefined) row.title = updates.title;
    if (updates.category !== undefined) row.category = updates.category;
    if (updates.description !== undefined) row.description = updates.description;
    if (updates.goal !== undefined) row.goal = updates.goal;
    if (updates.architecture !== undefined) row.architecture = updates.architecture;
    if (updates.features !== undefined) row.features = updates.features;
    if (updates.image !== undefined) row.image = updates.image;
    if (updates.images !== undefined) row.images = updates.images;
    if (updates.technologies !== undefined) row.technologies = updates.technologies;
    if (updates.type !== undefined) row.type = updates.type;
    if (updates.demoUrl !== undefined) row.demo_url = updates.demoUrl;
    if (updates.githubUrl !== undefined) row.github_url = updates.githubUrl;
    if (updates.details !== undefined) row.details = updates.details;
    if (updates.featured !== undefined) row.featured = Boolean(updates.featured);

    const { data, error } = await supabase
      .from('projects')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/all-projects');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin PUT project error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memperbarui proyek.' },
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
        { success: false, error: 'ID proyek diperlukan untuk penghapusan.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/');
    revalidatePath('/all-projects');

    return NextResponse.json({ success: true, message: 'Proyek berhasil dihapus.' });
  } catch (error) {
    console.error('Admin DELETE project error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menghapus proyek.' },
      { status: 500 }
    );
  }
}
