import { createServerClient } from '../../lib/supabase/server';
import PriceList from '../../src/components/PriceList';
import pricingData from '../../src/data/pricingData.json';

export const metadata = {
  title: 'Daftar Harga & Paket Layanan',
  description:
    'Pilihan paket layanan transparan untuk pengembangan website, bimbingan coding privat, skripsi IT, konfigurasi server/domain, dan sesi konsultasi teknis profesional.',
  alternates: {
    canonical: '/price-list',
  },
  openGraph: {
    title: 'Daftar Harga & Paket Layanan | Imam Ariadi',
    description:
      'Layanan pembuatan landing page, web application, custom web system, dan bimbingan belajar dengan harga terjangkau dan garansi hasil.',
    url: '/price-list',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar Harga & Paket Layanan | Imam Ariadi',
    description:
      'Layanan pembuatan landing page, web application, custom web system, dan bimbingan belajar dengan harga terjangkau dan garansi hasil.',
  },
};

export const revalidate = 60;

export default async function PriceListPage() {
  let packages = pricingData.packages;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      packages = data.map((p) => ({
        id: p.id,
        category: p.category,
        name: p.name,
        badge: p.badge,
        isPopular: Boolean(p.is_popular),
        price: p.price,
        pricePeriod: p.price_period,
        description: p.description,
        timeline: p.timeline,
        features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features) : []),
        technologies: Array.isArray(p.technologies) ? p.technologies : (typeof p.technologies === 'string' ? JSON.parse(p.technologies) : []),
        whatsappMessage: p.whatsapp_message
      }));
    }
  } catch (error) {
    console.warn('Supabase fetch notice on PriceListPage (using fallback data):', error?.message || error);
  }

  return <PriceList initialPackages={packages} />;
}
