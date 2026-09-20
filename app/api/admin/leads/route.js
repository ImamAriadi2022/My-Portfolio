import { createServerClient } from '../../../../lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // If table does not exist yet (code 42P01 in postgres), return empty array gracefully
      if (error.code === '42P01') {
        return NextResponse.json({ success: true, data: [], tablePending: true });
      }
      throw error;
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengambil pesan leads.' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID dan status pesan diperlukan.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin PUT leads error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memperbarui status pesan.' },
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
        { success: false, error: 'ID pesan diperlukan untuk penghapusan.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase.from('leads').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Pesan berhasil dihapus.' });
  } catch (error) {
    console.error('Admin DELETE leads error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menghapus pesan.' },
      { status: 500 }
    );
  }
}
