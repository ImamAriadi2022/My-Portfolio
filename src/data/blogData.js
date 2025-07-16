export const blogData = [
  {
    id: 1,
    title: 'Getting Started with React Hooks: A Complete Guide',
    excerpt: 'Learn how to use React Hooks effectively in your projects. From useState to useEffect, master the fundamentals with practical examples.',
    description: 'A comprehensive guide covering all essential React Hooks including useState, useEffect, useContext, and custom hooks. Perfect for developers transitioning from class components to functional components.',
    image: '/assets/img/b4.png',
    coverImage: '/assets/img/blog-covers/react-hooks.jpg', // Optional: different cover for detail page
    date: 'December 15, 2024',
    category: 'Web',
    readTime: '8 min read',
    author: 'Imam Ariadi',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
    articleUrl: 'https://medium.com/@imam-ariadi/react-hooks-complete-guide', // Direct link to article
    slug: 'react-hooks-complete-guide',
    featured: true
  },
];

// Blog categories for filtering (if needed later)
export const blogCategories = [
  { id: 'all', name: 'All Posts', icon: 'fa-th' },
  { id: 'AI', name: 'AI', icon: 'fa-robot' },
  { id: 'Web', name: 'Web Development', icon: 'fa-web' },
  { id: 'Mobile', name: 'Mobile Development', icon: 'fa-mobile-alt' },
  { id: 'Tutorials', name: 'Tutorials', icon: 'fa-book-open' }
];
