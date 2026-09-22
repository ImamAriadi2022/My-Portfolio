export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imamdev.my.id';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Imam Ariadi',
    alternateName: 'Imam',
    url: baseUrl,
    image: `${baseUrl}/assets/img/hero-section.png`,
    jobTitle: 'Fullstack Web & Mobile Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance & Independent Software Engineering',
    },
    sameAs: [
      'https://github.com/ImamAriadi2022',
      'https://linkedin.com/in/imam-ariadi',
      'https://instagram.com/imamariadi_',
      'https://medium.com/@imam-ariadi',
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'React Native',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'PostgreSQL',
      'Supabase',
      'Fullstack Development',
      'REST API',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Imam Ariadi Portfolio',
    url: baseUrl,
    description:
      'Portofolio profesional dan blog teknis Imam Ariadi, Fullstack Web & Mobile Developer berfokus pada ekosistem React, Next.js, dan Supabase.',
    author: {
      '@type': 'Person',
      name: 'Imam Ariadi',
    },
    inLanguage: 'id-ID',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jasa Pembuatan Website & Bimbingan IT - Imam Ariadi',
    image: `${baseUrl}/assets/img/hero-section.png`,
    url: baseUrl,
    priceRange: 'Rp 150.000 - Rp 6.000.000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
