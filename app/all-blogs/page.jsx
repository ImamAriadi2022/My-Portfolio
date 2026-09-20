import { createServerClient } from '../../lib/supabase/server';
import AllBlogs from '../../src/components/AllBlogs';
import { blogData } from '../../src/data/blogData';

export const metadata = {
  title: 'Semua Artikel Blog & Panduan Teknis',
  description:
    'Kumpulan panduan teknis, tutorial pemrograman web & mobile, tips arsitektur sistem, dan wawasan seputar dunia teknologi oleh Imam Ariadi.',
  alternates: {
    canonical: '/all-blogs',
  },
  openGraph: {
    title: 'Artikel Blog & Tutorial Teknis | Imam Ariadi',
    description:
      'Pelajari tips dan tutorial pemrograman React, Next.js, Node.js, dan arsitektur web modern bersama Imam Ariadi.',
    url: '/all-blogs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Blog & Tutorial Teknis | Imam Ariadi',
    description:
      'Pelajari tips dan tutorial pemrograman React, Next.js, Node.js, dan arsitektur web modern bersama Imam Ariadi.',
  },
};

export const revalidate = 60;

export default async function AllBlogsPage() {
  let allBlogs = blogData;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      allBlogs = data.map((b) => ({
        id: b.id,
        title: b.title,
        excerpt: b.excerpt,
        description: b.description || b.excerpt,
        image: b.image,
        coverImage: b.cover_image || b.coverImage || b.image,
        date: b.date,
        category: b.category,
        readTime: b.read_time || b.readTime || '5 menit baca',
        author: b.author || 'Imam Ariadi',
        tags: Array.isArray(b.tags) ? b.tags : (typeof b.tags === 'string' ? JSON.parse(b.tags) : []),
        articleUrl: b.article_url || b.articleUrl || '#',
        slug: b.slug,
        featured: Boolean(b.featured)
      }));
    }
  } catch (error) {
    console.warn('Supabase fetch notice on AllBlogsPage (using fallback data):', error?.message || error);
  }

  return <AllBlogs initialBlogs={allBlogs} />;
}
