/**
 * DATA PORTFOLIO IMAM ARIADI
 * 
 * CATATAN PENGGUNAAN:
 * 1. `image`: Gambar sampul utama (cover) yang akan tampil di kartu (card) proyek.
 * 2. `images`: Array pameran dokumentasi / screenshot seluruh halaman proyek.
 *    Bisa berupa string URL: ['/img/page1.png', '/img/page2.png']
 *    Atau objek dengan caption: [{ url: '/img/page1.png', caption: 'Halaman Dashboard' }]
 * 3. `demoUrl`: Link demo aplikasi live.
 *    - Jika proyek SUDAH TERDEPLOY: isi URL live demo (contoh: 'https://teralab.vercel.app').
 *    - Jika proyek BELUM TERDEPLOY: isi `null` atau kosongkan. Sistem akan otomatis menampilkan
 *      status "Lokal / Belum Terdeploy Publik" dan mengarahkan calon buyer melihat pameran screenshot.
 */

export const portfolioData = [
  // Frontend Web Projects - Top 3
  {
    id: 1,
    category: 'frontend-web',
    title: 'TeraLab (E-Learning Platform)',
    description: 'Website Teralab Proteksi adalah landing page modern berbasis React dan Bootstrap dengan desain responsif, navigasi smooth, kartu layanan interaktif, serta fitur chatbot yang memudahkan komunikasi langsung dengan pengunjung.',
    goal: 'Menyediakan platform edukasi dan landing page modern yang mempermudah calon siswa serta profesional kelistrikan memahami materi proteksi, sekaligus meningkatkan konversi konsultasi pelatihan melalui alur informasi yang terstruktur.',
    architecture: 'Single Page Application (SPA) berbasis React dengan modular component-based architecture, state management lokal yang ringan, layout Bootstrap 4 responsif, serta integrasi webhook chatbot interaktif untuk lead capture real-time.',
    features: [
      'Landing page interaktif dengan navigasi halus (smooth scrolling) dan responsive di semua perangkat',
      'Katalog silabus kursus dan kartu layanan proteksi kelistrikan dengan animasi interaktif',
      'Chatbot terintegrasi untuk customer support cepat dan konsultasi langsung',
      'Optimasi aset dan struktur halaman ramah SEO untuk visibilitas mesin pencari'
    ],
    // Gambar Cover Utama untuk Card
    image: '/img/teralab.png',
    // Dokumentasi Screenshot Seluruh Halaman untuk Modal
    images: [
      { url: '/img/teralab.png', caption: 'Halaman Beranda & Navigasi Silabus' },
      { url: '/assets/img/b1.jpg', caption: 'Katalog Layanan & Modul Proteksi' },
      { url: '/assets/img/port3.jpg', caption: 'Fitur Chatbot & Konsultasi Interaktif' }
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
    goal: 'Meningkatkan produktivitas tim dan individu dalam mengelola ritme kerja harian melalui sistem pencatatan tugas yang cepat, terorganisir per prioritas, dan memiliki notifikasi pengingat otomatis agar tidak ada deadline yang terlewat.',
    architecture: 'Aplikasi mobile cross-platform berbasis React Native dengan Redux Toolkit untuk state flow terpusat, lapisan penyimpanan AsyncStorage untuk strategi offline-first data persistence, serta modul push notification native Android/iOS.',
    features: [
      'Manajemen tugas komprehensif dengan kategori prioritas (Tinggi, Sedang, Rendah)',
      'Sistem push notification otomatis untuk pengingat tenggat waktu (deadline)',
      'Dukungan offline-first: data tetap tersimpan aman saat tidak ada koneksi internet',
      'Filter cerdas dan pelacakan riwayat tugas selesai dengan visual progres'
    ],
    // Gambar Cover Utama untuk Card
    image: '/assets/img/b2.png',
    // Dokumentasi Screenshot Seluruh Halaman untuk Modal
    images: [
      { url: '/assets/img/b2.png', caption: 'Dashboard Utama & Manajemen Tugas' },
      { url: '/assets/img/b3.png', caption: 'Detail Tenggat Waktu & Prioritas' },
      { url: '/assets/img/b4.png', caption: 'Riwayat Tugas Selesai & Filter Kategori' }
    ],
    technologies: ['React Native', 'Redux', 'AsyncStorage', 'Push Notifications'],
    type: 'demo',
    demoUrl: 'https://expo.dev/@imam/task-manager',
    githubUrl: 'https://github.com/imam/task-manager-app',
    featured: true
  },

  // Backend Projects - Top 3 (Contoh Proyek Belum Dideploy / DApp Blockchain)
  {
    id: 7,
    category: 'backend',
    title: 'TodoList WEB3 using ethereum',
    description: 'Backend API untuk TodoList berbasis WEB3 dengan smart contract dan IPFS.',
    goal: 'Membangun ekosistem manajemen aktivitas terdesentralisasi (DApp) yang permanen, transparan, dan bebas sensor pihak ketiga dengan memanfaatkan smart contract jaringan Ethereum dan penyimpanan terdistribusi.',
    architecture: 'Solidity Smart Contract dikembangkan dan diuji menggunakan Hardhat framework, dihubungkan ke client-side melalui Ethers.js/Web3.js, metadata terenkripsi disimpan di jaringan IPFS (InterPlanetary File System), serta optimasi gas fee pada penulisan state contract.',
    features: [
      'Autentikasi akun Web3 terdesentralisasi via integrasi dompet crypto MetaMask',
      'Penyimpanan riwayat tugas permanen dan immutable pada blockchain Ethereum',
      'Penyimpanan aset terdistribusi menggunakan protokol IPFS yang tahan sensor',
      'Smart contract teroptimasi untuk konsumsi gas yang efisien pada setiap transaksi'
    ],
    // Gambar Cover Utama untuk Card
    image: '/img/web3.png',
    // Dokumentasi Screenshot Seluruh Halaman untuk Modal
    images: [
      { url: '/img/web3.png', caption: 'Antarmuka DApp & Koneksi Dompet MetaMask' },
      { url: '/assets/img/b7.png', caption: 'Pengujian & Kompilasi Smart Contract via Hardhat' },
      { url: '/assets/img/b8.jpg', caption: 'Penyimpanan Desentralisasi Metadata IPFS' }
    ],
    technologies: ['Node.js', 'Hardhat', 'Solidity', 'IPFS', 'Ethers.js'],
    type: 'project',
    demoUrl: null, // Belum terdeploy publik (lingkungan lokal / testnet)
    githubUrl: 'https://github.com/ImamAriadi2022/metamint-nft-dapp',
    details: 'API yang menangani 10,000+ transaksi per hari dengan response time rata-rata 150ms. Implementasi rate limiting, caching dengan Redis, dan monitoring dengan Prometheus.',
    featured: true
  }
];

// Data portfolio lengkap untuk halaman All Projects
export const allPortfolioData = [
  ...portfolioData, // 3 project featured
  
  // Additional Frontend Web Projects
  {
    id: 10,
    category: 'frontend-web',
    title: 'Social Media Dashboard',
    description: 'Dashboard analytics untuk media sosial dengan integrasi Instagram, Facebook, dan Twitter API.',
    goal: 'Menyediakan dasbor satu pintu bagi digital agency dan brand manager untuk memantau performa engagement, pertumbuhan follower, dan efektivitas kampanye dari berbagai platform media sosial secara real-time.',
    architecture: 'React SPA dengan Redux Toolkit untuk state caching data analitik, visualisasi grafik interaktif menggunakan Chart.js, serta integrasi RESTful API via Axios dengan mekanisme auto-refresh token dan rate-limiting throttle.',
    features: [
      'Agregasi metrik multi-platform (Instagram, Facebook, Twitter) dalam satu tampilan ringkas',
      'Visualisasi grafik interaktif untuk pergerakan impresi, jangkauan, dan tingkat interaksi',
      'Fitur ekspor ringkasan performa kampanye ke format PDF dan CSV untuk kebutuhan laporan',
      'Mode gelap/terang (Dark/Light Mode) dengan penyimpanan preferensi pengguna'
    ],
    image: '/assets/img/b8.jpg',
    images: [
      { url: '/assets/img/b8.jpg', caption: 'Ringkasan Metrik Multi-Platform & Total Engagement' },
      { url: '/assets/img/b6.jpg', caption: 'Grafik Analitik Interaktif Performa Kampanye' },
      { url: '/assets/img/port9.jpg', caption: 'Fitur Filter Periode & Ekspor Laporan CSV/PDF' }
    ],
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
    goal: 'Membantu pengguna merencanakan mobilitas harian dengan prakiraan cuaca hiperlokal yang akurat, peringatan cuaca buruk instan, dan visualisasi kondisi atmosfer yang mudah dipahami dalam hitungan detik.',
    architecture: 'React Native mobile app dengan Geolocation Native Module untuk penentuan titik koordinat GPS presisi, integrasi OpenWeather API dengan strategi local cache untuk menghemat konsumsi kuota data dan response latency.',
    features: [
      'Deteksi cuaca otomatis berdasarkan GPS lokasi terkini serta pencarian kota internasional',
      'Prediksi kondisi cuaca per jam dan rangkuman mingguan hingga 7 hari ke depan',
      'Peringatan dini untuk potensi cuaca ekstrem, curah hujan tinggi, dan indeks UV',
      'Antarmuka dinamis dengan animasi visual yang berganti sesuai kondisi cuaca aktual'
    ],
    image: '/assets/img/arr (4).jpg',
    images: [
      { url: '/assets/img/arr (4).jpg', caption: 'Tampilan Cuaca Real-Time Berdasarkan GPS' },
      { url: '/assets/img/b2.png', caption: 'Prakiraan Cuaca Per Jam & 7 Hari ke Depan' },
      { url: '/assets/img/b3.png', caption: 'Peringatan Dini Cuaca Ekstrem & Indeks UV' }
    ],
    technologies: ['React Native', 'OpenWeather API', 'AsyncStorage'],
    type: 'demo',
    demoUrl: 'https://expo.dev/@imam/weather-app',
    githubUrl: 'https://github.com/imam/weather-app'
  },
  
  // Additional Backend Projects (Contoh Proyek Belum Dideploy / Microservice Internal)
  {
    id: 14,
    category: 'backend',
    title: 'Authentication Service',
    description: 'Microservice untuk authentication dengan JWT, OAuth, dan multi-factor authentication.',
    goal: 'Menyediakan infrastruktur autentikasi dan otorisasi terpusat (Identity Provider) yang aman, scalable, dan siap pakai untuk berbagai layanan aplikasi web dan mobile tanpa perlu merombak ulang sistem keamanan.',
    architecture: 'Microservice Node.js / Express dengan Clean Architecture (Controller, Service, Repository), database PostgreSQL untuk penyimpanan relasi user & role, Redis untuk session store & token blacklisting, serta implementasi OAuth 2.0 dan JWT via secure HttpOnly Cookie.',
    features: [
      'Autentikasi JWT dual-token (Access Token masa aktif pendek + Refresh Token rotasi)',
      'Dukungan Social Login terintegrasi (Google OAuth & GitHub OAuth)',
      'Proteksi Brute-Force dan Rate Limiting terdistribusi menggunakan Redis',
      'Role-Based Access Control (RBAC) granular dan audit trail pencatatan aktivitas login'
    ],
    image: '/assets/img/b7.png',
    images: [
      { url: '/assets/img/b7.png', caption: 'Dokumentasi RESTful API via Swagger UI' },
      { url: '/assets/img/b5.png', caption: 'Skema Database Relasional PostgreSQL' },
      { url: '/assets/img/port3.png', caption: 'Arsitektur Microservice & Redis Session Store' }
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Passport.js', 'JWT'],
    type: 'project',
    demoUrl: null, // Microservice backend internal / belum terdeploy publik
    githubUrl: 'https://github.com/imam/auth-service',
    details: 'Layanan terpusat yang menangani autentikasi untuk berbagai aplikasi dengan rate limiting dan pengelolaan sesi yang aman.'
  }
];

export const portfolioCategories = [
  { id: 'all', name: 'Semua Proyek', icon: 'fa-th' },
  { id: 'frontend-web', name: 'Web Frontend', icon: 'fa-globe' },
  { id: 'frontend-mobile', name: 'Aplikasi Mobile', icon: 'fa-mobile' },
  { id: 'backend', name: 'Backend & API', icon: 'fa-server' },
  { id: 'ai', name: 'Kecerdasan Buatan (AI)', icon: 'fa-robot' }
];

export const services = [
  {
    id: 1,
    icon: '/assets/img/service/icon-responsive.svg',
    title: 'Pengembangan Backend',
    description: 'Membangun arsitektur server yang andal, aman, dan berkinerja tinggi dengan teknologi modern dan standar industri.'
  },
  {
    id: 2,
    icon: '/assets/img/service/icon-email.svg',
    title: 'Pengembangan Frontend',
    description: 'Merancang antarmuka pengguna (UI/UX) yang responsif, interaktif, dan estetik untuk aplikasi web dan mobile.'
  },
  {
    id: 3,
    icon: '/assets/img/service/icon-lock.svg',
    title: 'Pengembangan Fullstack',
    description: 'Solusi pengembangan aplikasi menyeluruh mulai dari perancangan database, backend API, hingga antarmuka pengguna siap pakai.'
  }
];
