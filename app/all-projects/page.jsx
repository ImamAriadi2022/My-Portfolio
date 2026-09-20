import { createServerClient } from '../../lib/supabase/server';
import AllProjects from '../../src/components/AllProjects';
import { allPortfolioData } from '../../src/data/portfolioData';

export const metadata = {
  title: 'Semua Proyek - Imam Ariadi | Portofolio',
  description: 'Jelajahi seluruh portofolio proyek pengembangan web, aplikasi mobile, dan backend oleh Imam Ariadi.',
};

export const revalidate = 60;

export default async function AllProjectsPage() {
  let allProjects = allPortfolioData;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      allProjects = data.map((p) => ({
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
    }
  } catch (error) {
    console.warn('Supabase fetch notice on AllProjectsPage (using fallback data):', error?.message || error);
  }

  return <AllProjects initialProjects={allProjects} />;
}
