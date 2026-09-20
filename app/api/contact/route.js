import { createServerClient } from '../../../lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    let leadData = null;
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : null,
            subject: subject ? subject.trim() : 'Konsultasi Proyek',
            message: message.trim(),
            status: 'unread',
          },
        ])
        .select()
        .single();

      if (!error && data) {
        leadData = data;
      }
    } catch (dbErr) {
      console.warn('Leads table insert warning (table might need extend2.sql):', dbErr.message);
    }

    // Format WhatsApp follow-up URL
    const targetWa = '6285788322061';
    const waText = `Halo Mas Imam, saya ${name.trim()} (${email.trim()}).\nSubjek: ${subject || 'Diskusi Proyek'}\n\nPesan: ${message.trim()}`;
    const whatsappUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      message: 'Terima kasih! Pesan Anda telah berhasil terkirim.',
      data: leadData || { name, email, subject, message },
      whatsappUrl,
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengirim pesan.' },
      { status: 500 }
    );
  }
}
