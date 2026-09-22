/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/price-list',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
