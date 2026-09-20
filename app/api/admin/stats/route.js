import { createServerClient } from '../../../../lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createServerClient();

    const [projectsRes, blogsRes, pricingRes] = await Promise.allSettled([
      supabase.from('projects').select('id, featured, category', { count: 'exact' }),
      supabase.from('blogs').select('id, featured, category', { count: 'exact' }),
      supabase.from('pricing_packages').select('id, is_popular, category', { count: 'exact' }),
    ]);

    const projectsData = projectsRes.status === 'fulfilled' && !projectsRes.value.error ? projectsRes.value.data : [];
    const blogsData = blogsRes.status === 'fulfilled' && !blogsRes.value.error ? blogsRes.value.data : [];
    const pricingData = pricingRes.status === 'fulfilled' && !pricingRes.value.error ? pricingRes.value.data : [];

    const stats = {
      projects: {
        total: projectsData.length,
        featured: projectsData.filter((p) => p.featured).length,
      },
      blogs: {
        total: blogsData.length,
        featured: blogsData.filter((b) => b.featured).length,
      },
      pricing: {
        total: pricingData.length,
        popular: pricingData.filter((p) => p.is_popular).length,
      },
      supabaseConnected: true,
      lastChecked: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gagal mengambil ringkasan statistik.',
        data: {
          projects: { total: 0, featured: 0 },
          blogs: { total: 0, featured: 0 },
          pricing: { total: 0, popular: 0 },
          supabaseConnected: false,
        },
      },
      { status: 500 }
    );
  }
}
