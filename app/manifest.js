export default function manifest() {
  return {
    name: 'Imam Ariadi - Portofolio Web & Mobile Developer',
    short_name: 'Imam Portfolio',
    description:
      'Portofolio profesional Imam Ariadi - Fullstack Web & Mobile Developer spesialis Next.js, React, Node.js, dan Supabase.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#28a745',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/assets/img/favicon.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/assets/img/favicon.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
