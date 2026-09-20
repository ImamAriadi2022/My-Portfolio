import { createServerClient } from '../../lib/supabase/server';
import AllBlogs from '../../src/components/AllBlogs';
import { blogData } from '../../src/data/blogData';

export const metadata = {
  title: 'Semua Artikel Blog - Imam Ariadi | Portofolio',
  description: 'Kumpulan panduan teknis, tutorial pemrograman, dan wawasan seputar teknologi oleh Imam Ariadi.',
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
