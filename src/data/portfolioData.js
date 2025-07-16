export const portfolioData = [
  // Frontend Web Projects - Top 3
  {
    id: 1,
    category: 'frontend-web',
    title: 'TeraLab (E-Learning Platform)',
    description: 'Website Teralab Proteksi adalah landing page modern berbasis React dan Bootstrap dengan desain responsif, navigasi smooth, kartu layanan interaktif, serta fitur chatbot yang memudahkan komunikasi langsung dengan pengunjung.',
    image: '/img/teralab.png',
    images: [
      '/img/teralab.png',
      '/assets/img/b1.jpg',
      '/assets/img/port3.jpg'
    ],
    technologies: ['React', 'JavaScript', 'Material-UI', 'Bootstrap'],
    type: 'demo',
    demoUrl: 'https://teralab-proteksi.vercel.app/',
    githubUrl: 'https://github.com/ImamAriadi2022/teralab-proteksi',
    featured: true
  },

  // Frontend Mobile Apps - Top 3
  {
    id: 4,
    category: 'frontend-mobile',
    title: 'Task Manager App',
    description: 'Aplikasi mobile untuk manajemen tugas dengan fitur reminder, kategori, dan sinkronisasi cloud.',
    image: '/assets/img/b2.png',
    images: [
      '/assets/img/b2.png',
      '/assets/img/b3.png',
      '/assets/img/b4.png'
    ],
    technologies: ['React Native', 'Redux', 'AsyncStorage', 'Push Notifications'],
    type: 'demo',
    demoUrl: 'https://expo.dev/@imam/task-manager',
    githubUrl: 'https://github.com/imam/task-manager-app',
    featured: true
  },

  // Backend Projects - Top 3
  {
    id: 7,
    category: 'backend',
    title: 'TodoList WEB3 using ethereum',
    description: 'Backend API untuk TodoList berbasis WEB3 dengan smart contract dan IPFS.',
    image: '/img/web3.png',
    images: [
      '/img/web3.png',
      '/assets/img/b7.png',
      '/assets/img/b8.jpg'
    ],
    technologies: ['Node.js', 'hardhat', 'Solidity'],
    type: 'project',
    githubUrl: 'https://github.com/ImamAriadi2022/metamint-nft-dapp',
    details: 'API yang menangani 10,000+ transaksi per hari dengan response time rata-rata 150ms. Implementasi rate limiting, caching dengan Redis, dan monitoring dengan Prometheus.',
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
  }
];

export const portfolioCategories = [
  { id: 'all', name: 'All Projects', icon: 'fa-th' },
  { id: 'frontend-web', name: 'Frontend Web', icon: 'fa-globe' },
  { id: 'frontend-mobile', name: 'Mobile Apps', icon: 'fa-mobile' },
  { id: 'backend', name: 'Backend', icon: 'fa-server' },
  { id: 'ai', name: 'Artificial Intelligence', icon: 'fa-robot' }
];

export const services = [
  {
    id: 1,
    icon: '/assets/img/service/icon-responsive.svg',
    title: 'Backend Development',
    description: 'Building robust and scalable server-side applications with modern technologies and best practices'
  },
  {
    id: 2,
    icon: '/assets/img/service/icon-email.svg',
    title: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces for web and mobile applications'
  },
  {
    id: 3,
    icon: '/assets/img/service/icon-lock.svg',
    title: 'Fullstack Development',
    description: 'Complete end-to-end development solutions for both web and mobile applications'
  }
];
