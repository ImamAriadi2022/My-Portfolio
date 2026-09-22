import { createServerClient } from '../../../../lib/supabase/server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengambil data paket harga.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      id,
      category,
      name,
      badge,
      isPopular,
      is_popular,
      price,
      pricePeriod,
      price_period,
      description,
      timeline,
      features,
      technologies,
      whatsappMessage,
      whatsapp_message,
      sortOrder,
      sort_order,
    } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { success: false, error: 'Nama paket, kategori, dan harga wajib diisi.' },
        { status: 400 }
      );
    }

    const packageId =
      id?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
        '-' +
        Date.now().toString().slice(-4);

    const supabase = createServerClient();
    const row = {
      id: packageId,
      category,
      name,
      badge: badge || null,
      is_popular: isPopular !== undefined ? Boolean(isPopular) : Boolean(is_popular),
      price,
      price_period: pricePeriod || price_period || 'mulai dari / proyek',
      description: description || null,
      timeline: timeline || null,
      features: Array.isArray(features) ? features : [],
      technologies: Array.isArray(technologies) ? technologies : [],
      whatsapp_message: whatsappMessage || whatsapp_message || `Halo Mas Imam, saya tertarik dengan paket ${name}.`,
      sort_order: Number(sortOrder ?? sort_order ?? 0),
    };

    const { data, error } = await supabase
      .from('pricing_packages')
      .insert([row])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin POST pricing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menyimpan paket harga.' },
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
        { success: false, error: 'ID paket harga diperlukan untuk update.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const row = {};
    if (updates.category !== undefined) row.category = updates.category;
    if (updates.name !== undefined) row.name = updates.name;
    if (updates.badge !== undefined) row.badge = updates.badge;
    if (updates.isPopular !== undefined || updates.is_popular !== undefined) {
      row.is_popular = Boolean(updates.isPopular ?? updates.is_popular);
    }
    if (updates.price !== undefined) row.price = updates.price;
    if (updates.pricePeriod !== undefined || updates.price_period !== undefined) {
      row.price_period = updates.pricePeriod ?? updates.price_period;
    }
    if (updates.description !== undefined) row.description = updates.description;
    if (updates.timeline !== undefined) row.timeline = updates.timeline;
    if (updates.features !== undefined) row.features = updates.features;
    if (updates.technologies !== undefined) row.technologies = updates.technologies;
    if (updates.whatsappMessage !== undefined || updates.whatsapp_message !== undefined) {
      row.whatsapp_message = updates.whatsappMessage ?? updates.whatsapp_message;
    }
    if (updates.sortOrder !== undefined || updates.sort_order !== undefined) {
      row.sort_order = Number(updates.sortOrder ?? updates.sort_order);
    }

    const { data, error } = await supabase
      .from('pricing_packages')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/');

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin PUT pricing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memperbarui paket harga.' },
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
        { success: false, error: 'ID paket harga diperlukan untuk penghapusan.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.from('pricing_packages').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Paket harga berhasil dihapus.' });
  } catch (error) {
    console.error('Admin DELETE pricing error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menghapus paket harga.' },
      { status: 500 }
    );
  }
}
