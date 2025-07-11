export const blogData = [
  {
    id: 1,
    title: 'Getting Started with React Hooks: A Complete Guide',
    excerpt: 'Learn how to use React Hooks effectively in your projects. From useState to useEffect, master the fundamentals with practical examples.',
    description: 'A comprehensive guide covering all essential React Hooks including useState, useEffect, useContext, and custom hooks. Perfect for developers transitioning from class components to functional components.',
    image: '/assets/img/b4.png',
    coverImage: '/assets/img/blog-covers/react-hooks.jpg', // Optional: different cover for detail page
    date: 'December 15, 2024',
    category: 'React',
    readTime: '8 min read',
    author: 'Imam Ariadi',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
    articleUrl: 'https://medium.com/@imam-ariadi/react-hooks-complete-guide', // Direct link to article
    slug: 'react-hooks-complete-guide',
    featured: true
  },
  {
    id: 2,
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt: 'Step-by-step tutorial on creating robust REST APIs using Node.js, Express, and MongoDB with authentication and validation.',
    description: 'Learn how to build production-ready RESTful APIs from scratch. Covers routing, middleware, authentication, error handling, and database integration.',
    image: '/assets/img/b3.png',
    coverImage: '/assets/img/blog-covers/nodejs-api.jpg',
    date: 'December 10, 2024',
    category: 'Backend',
    readTime: '12 min read',
    author: 'Imam Ariadi',
    tags: ['Node.js', 'Express', 'MongoDB', 'API'],
    articleUrl: 'https://dev.to/imam-ariadi/building-restful-apis-nodejs',
    slug: 'building-restful-apis-nodejs',
    featured: true
  },
  {
    id: 3,
    title: 'Modern CSS Techniques: Grid vs Flexbox',
    excerpt: 'Understand when to use CSS Grid vs Flexbox. Compare their strengths and learn best practices for modern web layouts.',
    description: 'A detailed comparison of CSS Grid and Flexbox, including practical examples, use cases, and modern layout techniques for responsive design.',
    image: '/assets/img/b5.png',
    coverImage: '/assets/img/blog-covers/css-grid-flex.jpg',
    date: 'December 5, 2024',
    category: 'CSS',
    readTime: '6 min read',
    author: 'Imam Ariadi',
    tags: ['CSS', 'Grid', 'Flexbox', 'Frontend'],
    articleUrl: 'https://codepen.io/imam-ariadi/pen/css-grid-vs-flexbox',
    slug: 'css-grid-vs-flexbox',
    featured: false
  },
  {
    id: 4,
    title: 'Database Design Best Practices for Web Applications',
    excerpt: 'Essential database design principles, normalization techniques, and performance optimization strategies for scalable applications.',
    description: 'Learn fundamental database design concepts including normalization, indexing, relationships, and query optimization for better application performance.',
    image: '/assets/img/b8.jpg',
    coverImage: '/assets/img/blog-covers/database-design.jpg',
    date: 'November 28, 2024',
    category: 'Database',
    readTime: '10 min read',
    author: 'Imam Ariadi',
    tags: ['Database', 'SQL', 'PostgreSQL', 'Performance'],
    articleUrl: 'https://hashnode.com/@imam-ariadi/database-design-best-practices',
    slug: 'database-design-best-practices',
    featured: false
  },
  {
    id: 5,
    title: 'React Native vs Flutter: Which to Choose in 2024?',
    excerpt: 'Comprehensive comparison of React Native and Flutter for mobile app development. Performance, ecosystem, and development experience.',
    description: 'An in-depth analysis comparing React Native and Flutter frameworks, covering performance metrics, development speed, community support, and real-world use cases.',
    image: '/assets/img/b6.jpg',
    coverImage: '/assets/img/blog-covers/react-native-flutter.jpg',
    date: 'November 20, 2024',
    category: 'Mobile',
    readTime: '15 min read',
    author: 'Imam Ariadi',
    tags: ['React Native', 'Flutter', 'Mobile Development', 'Cross Platform'],
    articleUrl: 'https://blog.imam-ariadi.dev/react-native-vs-flutter-2024',
    slug: 'react-native-vs-flutter-2024',
    featured: true
  },
  {
    id: 6,
    title: 'Implementing JWT Authentication in Full-Stack Applications',
    excerpt: 'Complete guide to implementing secure JWT authentication with refresh tokens, role-based access control, and best security practices.',
    description: 'Learn how to implement secure authentication systems using JSON Web Tokens, including token refresh strategies, role-based permissions, and security considerations.',
    image: '/assets/img/b7.png',
    coverImage: '/assets/img/blog-covers/jwt-auth.jpg',
    date: 'November 15, 2024',
    category: 'Security',
    readTime: '11 min read',
    author: 'Imam Ariadi',
    tags: ['JWT', 'Authentication', 'Security', 'Full Stack'],
    articleUrl: 'https://medium.com/@imam-ariadi/jwt-authentication-complete-guide',
    slug: 'jwt-authentication-complete-guide',
    featured: false
  }
];

// Blog categories for filtering (if needed later)
export const blogCategories = [
  { id: 'all', name: 'All Posts', icon: 'fa-th' },
  { id: 'React', name: 'React', icon: 'fa-code' },
  { id: 'Backend', name: 'Backend', icon: 'fa-server' },
  { id: 'CSS', name: 'CSS', icon: 'fa-paint-brush' },
  { id: 'Database', name: 'Database', icon: 'fa-database' },
  { id: 'Mobile', name: 'Mobile', icon: 'fa-mobile' },
  { id: 'Security', name: 'Security', icon: 'fa-shield' }
];
