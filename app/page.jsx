import { createServerClient } from '../lib/supabase/server';
import HomePageClient from '../src/components/HomePageClient';
import { portfolioData, allPortfolioData } from '../src/data/portfolioData';
import { blogData } from '../src/data/blogData';

export const revalidate = 60; // ISR: revalidate cache every 60 seconds

export default async function HomePage() {
  let projects = portfolioData;
  let allProjects = allPortfolioData;
  let blogs = blogData;

  try {
    const supabase = createServerClient();
    const [projectsRes, blogsRes] = await Promise.allSettled([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('blogs').select('*').order('created_at', { ascending: false })
    ]);

    if (projectsRes.status === 'fulfilled' && projectsRes.value?.data && projectsRes.value.data.length > 0) {
      allProjects = projectsRes.value.data.map((p) => ({
        id: p.id,
        category: p.category,
        title: p.title,
        description: p.description,
        goal: p.goal,
        architecture: p.architecture,
        features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features) : []),
        image: p.image,
        images: Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : (p.image ? [p.image] : [])),
        technologies: Array.isArray(p.technologies) ? p.technologies : (typeof p.technologies === 'string' ? JSON.parse(p.technologies) : []),
        type: p.type || 'project',
        demoUrl: p.demo_url || p.demoUrl || '#',
        githubUrl: p.github_url || p.githubUrl || '',
        details: p.details || '',
        featured: Boolean(p.featured)
      }));

      // Top featured projects for homepage
      const featured = allProjects.filter((p) => p.featured);
      projects = featured.length > 0 ? featured.slice(0, 3) : allProjects.slice(0, 3);
    }

    if (blogsRes.status === 'fulfilled' && blogsRes.value?.data && blogsRes.value.data.length > 0) {
      blogs = blogsRes.value.data.map((b) => ({
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
    console.warn('Supabase fetch notice on HomePage (using fallback data):', error?.message || error);
  }

  return (
    <HomePageClient
      initialProjects={projects}
      initialAllProjects={allProjects}
      initialBlogs={blogs}
    />
  );
}
