import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import JsonLd from '../src/components/JsonLd';
import { AudienceModeProvider } from '../src/context/AudienceModeContext';
import '../src/index.css';
import '../src/styles.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imamdev.my.id';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Imam Ariadi - Portofolio Web & Mobile Developer',
    template: '%s | Imam Ariadi',
  },
  description:
    'Portofolio profesional Imam Ariadi - Fullstack Web & Mobile Developer spesialis Next.js, React, Node.js, dan Supabase. Menyediakan jasa pembuatan website modern, aplikasi mobile, dan bimbingan teknologi.',
  keywords: [
    'Imam Ariadi',
    'Fullstack Developer',
    'Web Developer Indonesia',
    'Mobile App Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js',
    'Supabase Developer',
    'Jasa Pembuatan Website',
    'Bimbingan Skripsi IT',
    'Frontend Developer',
    'Backend Developer',
  ],
  authors: [{ name: 'Imam Ariadi', url: baseUrl }],
  creator: 'Imam Ariadi',
  publisher: 'Imam Ariadi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    siteName: 'Imam Ariadi Portfolio',
    title: 'Imam Ariadi - Fullstack Web & Mobile Developer',
    description:
      'Solusi rekayasa perangkat lunak modern: landing page responsif, aplikasi web dinamis, aplikasi mobile, dan arsitektur backend scalable.',
    images: [
      {
        url: '/assets/img/hero-section.png',
        width: 1200,
        height: 630,
        alt: 'Imam Ariadi - Fullstack Web & Mobile Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imam Ariadi - Fullstack Web & Mobile Developer',
    description: 'Portofolio profesional dan karya rekayasa perangkat lunak oleh Imam Ariadi.',
    images: ['/assets/img/hero-section.png'],
    creator: '@imamariadi_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/img/favicon.jpg',
    apple: '/assets/img/favicon.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var m = localStorage.getItem('imam_audience_mode') || 'hrd';
                  document.documentElement.setAttribute('data-audience-mode', m);
                  if (m === 'client') {
                    document.documentElement.classList.add('client-theme');
                    if (document.body) document.body.classList.add('client-theme');
                  } else {
                    document.documentElement.classList.add('hrd-theme');
                    if (document.body) document.body.classList.add('hrd-theme');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <Script
          src="/assets/js/particles.min.js"
          strategy="beforeInteractive"
        />
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <AudienceModeProvider>
          <div id="root">{children}</div>
        </AudienceModeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
