import { createServerClient } from '../lib/supabase/server';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imamdev.my.id';
  const now = new Date();

  // Core Static Pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/all-projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/all-blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Try to fetch dynamic projects and blogs dates from Supabase
  try {
    const supabase = createServerClient();
    const [projectsRes, blogsRes] = await Promise.allSettled([
      supabase.from('projects').select('id, created_at').order('created_at', { ascending: false }),
      supabase.from('blogs').select('id, created_at').order('created_at', { ascending: false }),
    ]);

    if (projectsRes.status === 'fulfilled' && projectsRes.value.data?.length > 0) {
      const latestProject = projectsRes.value.data[0];
      routes[1].lastModified = new Date(latestProject.created_at);
    }

    if (blogsRes.status === 'fulfilled' && blogsRes.value.data?.length > 0) {
      const latestBlog = blogsRes.value.data[0];
      routes[2].lastModified = new Date(latestBlog.created_at);
    }
  } catch (e) {
    console.warn('Sitemap dynamic date fetch fallback:', e.message);
  }

  return routes;
}
