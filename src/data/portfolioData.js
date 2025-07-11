export const portfolioData = [
  // Frontend Web Projects - Top 3
  {
    id: 1,
    category: 'frontend-web',
    title: 'E-Commerce Dashboard',
    description: 'Modern admin dashboard untuk e-commerce dengan fitur analitik real-time, manajemen produk, dan laporan penjualan.',
    image: '/assets/img/port3.jpg',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Chart.js'],
    type: 'demo',
    demoUrl: 'https://ecommerce-dashboard-demo.vercel.app',
    githubUrl: 'https://github.com/imam/ecommerce-dashboard',
    featured: true
  },
  {
    id: 2,
    category: 'frontend-web',
    title: 'Restaurant Website',
    description: 'Website responsive untuk restaurant dengan sistem reservasi online, menu interaktif, dan galeri foto.',
    image: '/assets/img/port9.jpg',
    technologies: ['Vue.js', 'Tailwind CSS', 'Firebase'],
    type: 'demo',
    demoUrl: 'https://restaurant-website-demo.netlify.app',
    githubUrl: 'https://github.com/imam/restaurant-website',
    featured: true
  },
  {
    id: 3,
    category: 'frontend-web',
    title: 'Learning Management System',
    description: 'Platform pembelajaran online dengan fitur video streaming, quiz interaktif, dan tracking progress siswa.',
    image: '/assets/img/b1.jpg',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Clerk'],
    type: 'project',
    githubUrl: 'https://github.com/imam/lms-platform',
    details: 'Project ini dikembangkan untuk sekolah lokal dengan 500+ siswa. Fitur utama meliputi manajemen kelas, assignment submission, dan real-time chat antara guru dan siswa.',
    featured: true
  },

  // Frontend Mobile Apps - Top 3
  {
    id: 4,
    category: 'frontend-mobile',
    title: 'Task Manager App',
    description: 'Aplikasi mobile untuk manajemen tugas dengan fitur reminder, kategori, dan sinkronisasi cloud.',
    image: '/assets/img/b2.png',
    technologies: ['React Native', 'Redux', 'AsyncStorage', 'Push Notifications'],
    type: 'demo',
    demoUrl: 'https://expo.dev/@imam/task-manager',
    githubUrl: 'https://github.com/imam/task-manager-app',
    featured: true
  },
  {
    id: 5,
    category: 'frontend-mobile',
    title: 'Fitness Tracker',
    description: 'Aplikasi tracking olahraga dengan GPS, monitoring detak jantung, dan social sharing.',
    image: '/assets/img/b3.png',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    type: 'project',
    githubUrl: 'https://github.com/imam/fitness-tracker',
    details: 'Aplikasi ini mengintegrasikan sensor smartphone untuk tracking aktivitas fisik. Telah diunduh 1000+ kali di Google Play Store dengan rating 4.5 bintang.',
    featured: true
  },
  {
    id: 6,
    category: 'frontend-mobile',
    title: 'Food Delivery App',
    description: 'Aplikasi pemesanan makanan dengan real-time tracking, payment gateway, dan review system.',
    image: '/assets/img/b4.png',
    technologies: ['React Native', 'Expo', 'Stripe', 'Socket.io'],
    type: 'demo',
    demoUrl: 'https://expo.dev/@imam/food-delivery',
    githubUrl: 'https://github.com/imam/food-delivery-app',
    featured: true
  },

  // Backend Projects - Top 3
  {
    id: 7,
    category: 'backend',
    title: 'RESTful API E-Commerce',
    description: 'Backend API untuk e-commerce dengan authentication, payment processing, dan inventory management.',
    image: '/assets/img/b5.png',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe API'],
    type: 'project',
    githubUrl: 'https://github.com/imam/ecommerce-api',
    details: 'API yang menangani 10,000+ transaksi per hari dengan response time rata-rata 150ms. Implementasi rate limiting, caching dengan Redis, dan monitoring dengan Prometheus.',
    featured: true
  },
  {
    id: 8,
    category: 'backend',
    title: 'Microservices Architecture',
    description: 'Sistem microservices untuk aplikasi fintech dengan service discovery dan load balancing.',
    image: '/assets/img/b6.jpg',
    technologies: ['Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    type: 'project',
    githubUrl: 'https://github.com/imam/fintech-microservices',
    details: 'Arsitektur terdiri dari 8 microservices yang handle user management, transaction processing, notification service, dan audit logging. Deployed menggunakan CI/CD pipeline.',
    featured: true
  },
  {
    id: 9,
    category: 'backend',
    title: 'Real-time Chat API',
    description: 'Backend untuk aplikasi chat real-time dengan support grup, file sharing, dan end-to-end encryption.',
    image: '/assets/img/b7.png',
    technologies: ['Node.js', 'Socket.io', 'MongoDB', 'AWS S3', 'WebRTC'],
    type: 'demo',
    demoUrl: 'https://chat-api-docs.herokuapp.com',
    githubUrl: 'https://github.com/imam/realtime-chat-api',
    featured: true
  }
];

// Data portfolio lengkap untuk halaman All Projects
export const allPortfolioData = [
  ...portfolioData, // 9 project featured
  
  // Additional Frontend Web Projects
  {
    id: 10,
    category: 'frontend-web',
    title: 'Social Media Dashboard',
    description: 'Dashboard analytics untuk media sosial dengan integrasi Instagram, Facebook, dan Twitter API.',
    image: '/assets/img/b8.jpg',
    technologies: ['React', 'Redux Toolkit', 'Chart.js', 'Axios'],
    type: 'demo',
    demoUrl: 'https://social-dashboard-demo.vercel.app',
    githubUrl: 'https://github.com/imam/social-dashboard'
  },
  {
    id: 11,
    category: 'frontend-web',
    title: 'Blog Platform CMS',
    description: 'Content Management System untuk blog dengan rich text editor dan SEO optimization.',
    image: '/assets/img/port3.png',
    technologies: ['Next.js', 'Tailwind CSS', 'Supabase', 'MDX'],
    type: 'project',
    githubUrl: 'https://github.com/imam/blog-cms',
    details: 'Platform blog yang support markdown, image optimization, dan auto-generated sitemap untuk SEO.'
  },
  
  // Additional Mobile Apps
  {
    id: 12,
    category: 'frontend-mobile',
    title: 'Weather Forecast App',
    description: 'Aplikasi cuaca dengan prediksi 7 hari, notifikasi cuaca ekstrem, dan location-based forecast.',
    image: '/assets/img/arr (4).jpg',
    technologies: ['React Native', 'OpenWeather API', 'AsyncStorage'],
    type: 'demo',
    demoUrl: 'https://expo.dev/@imam/weather-app',
    githubUrl: 'https://github.com/imam/weather-app'
  },
  {
    id: 13,
    category: 'frontend-mobile',
    title: 'Expense Tracker',
    description: 'Aplikasi tracking pengeluaran dengan kategori, budget planning, dan financial reports.',
    image: '/assets/img/favicon.jpg',
    technologies: ['Flutter', 'SQLite', 'Charts', 'Local Notifications'],
    type: 'project',
    githubUrl: 'https://github.com/imam/expense-tracker',
    details: 'App untuk mengelola keuangan personal dengan fitur export to CSV dan reminder pembayaran.'
  },
  
  // Additional Backend Projects
  {
    id: 14,
    category: 'backend',
    title: 'Authentication Service',
    description: 'Microservice untuk authentication dengan JWT, OAuth, dan multi-factor authentication.',
    image: '/assets/img/hero-section.png',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Passport.js'],
    type: 'project',
    githubUrl: 'https://github.com/imam/auth-service',
    details: 'Service yang handle authentication untuk multiple applications dengan rate limiting dan session management.'
  },
  {
    id: 15,
    category: 'backend',
    title: 'File Storage API',
    description: 'RESTful API untuk file upload, processing, dan CDN distribution dengan image optimization.',
    image: '/assets/img/foto imamprofil.png',
    technologies: ['Python', 'FastAPI', 'AWS S3', 'Celery', 'ImageMagick'],
    type: 'demo',
    demoUrl: 'https://file-api-docs.herokuapp.com',
    githubUrl: 'https://github.com/imam/file-storage-api'
  }
];

export const portfolioCategories = [
  { id: 'all', name: 'All Projects', icon: 'fa-th' },
  { id: 'frontend-web', name: 'Frontend Web', icon: 'fa-globe' },
  { id: 'frontend-mobile', name: 'Mobile Apps', icon: 'fa-mobile' },
  { id: 'backend', name: 'Backend', icon: 'fa-server' }
];

export const services = [
  {
    id: 1,
    icon: '/assets/img/service/icon-responsive.svg',
    title: 'UI/UX Designer',
    description: 'Creating intuitive and engaging user interfaces with modern design principles'
  },
  {
    id: 2,
    icon: '/assets/img/service/icon-email.svg',
    title: 'Fullstack Web Developer',
    description: 'Building complete web applications from frontend to backend with modern technologies'
  },
  {
    id: 3,
    icon: '/assets/img/service/icon-lock.svg',
    title: 'Graphic Design',
    description: 'Designing visual content for digital and print media with creative solutions'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: 'Web Design Evolution Insights',
    excerpt: 'Discover the latest advancements shaping the digital landscape, ensuring your online presence stays ahead of the curve.',
    image: '/assets/img/b4.png',
    date: 'July 31, 2024',
    category: 'Design',
    slug: 'web-design-evolution-insights'
  },
  {
    id: 2,
    title: 'Responsive Design Innovations',
    excerpt: 'Explore cutting-edge techniques and technologies ensuring seamless user experiences across all devices.',
    image: '/assets/img/b3.png',
    date: 'July 31, 2024',
    category: 'Design',
    slug: 'responsive-design-innovations'
  },
  {
    id: 3,
    title: 'User-Centric Web Solutions',
    excerpt: 'Crafting websites focused on meeting user needs, enhancing engagement and satisfaction.',
    image: '/assets/img/b5.png',
    date: 'July 31, 2024',
    category: 'Design',
    slug: 'user-centric-web-solutions'
  },
  {
    id: 4,
    title: 'Modern JavaScript Frameworks',
    excerpt: 'A comprehensive guide to choosing the right JavaScript framework for your next project.',
    image: '/assets/img/b8.jpg',
    date: 'August 15, 2024',
    category: 'Development',
    slug: 'modern-javascript-frameworks'
  },
  {
    id: 5,
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging trends and technologies that will shape the future of web development.',
    image: '/assets/img/b6.jpg',
    date: 'August 20, 2024',
    category: 'Technology',
    slug: 'future-of-web-development'
  },
  {
    id: 6,
    title: 'Design Systems Best Practices',
    excerpt: 'Building scalable and maintainable design systems for modern web applications.',
    image: '/assets/img/b7.png',
    date: 'September 5, 2024',
    category: 'Design',
    slug: 'design-systems-best-practices'
  }
];
