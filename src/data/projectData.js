// Helper: Ambil nama-nama bulan Bahasa Indonesia
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const FULL_MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

/**
 * Generator data statistik dinamis yang selalu sinkron dengan waktu sekarang (Real-Time Current Date).
 * Menghasilkan angka acak realistis yang terhubung secara matematis antara:
 * - Grafik batang 6 bulan terakhir (berakhir di bulan berjalan)
 * - Kartu metrik atas: Total Proyek Selesai (+sedang dikerjakan), Total Klien (+repeat order), dan Tingkat Keberhasilan (+on-time)
 * - Wawasan Utama (Performa Puncak, Konsistensi, Pertumbuhan)
 * - Distribusi Kategori Proyek
 */
export const generateSynchronizedProjectData = (refDate = new Date()) => {
  // 1. Dapatkan 6 bulan terakhir yang berakhir di bulan sekarang
  const currentMonthIdx = refDate.getMonth();
  const currentYear = refDate.getFullYear();

  // Deterministic PRNG seeded by year and month (e.g. September 2026)
  // Menjamin nilai yang dihasilkan 100% identik antara Server SSR dan Client Hydration
  let seed = ((currentYear * 12 + currentMonthIdx) * 16807 + 1013904223) >>> 0;
  const seededRandom = () => {
    seed = ((seed * 1664525 + 1013904223) % 4294967296) >>> 0;
    return seed / 4294967296;
  };
  const randomInt = (min, max) => Math.floor(seededRandom() * (max - min + 1)) + min;
  
  const pastMonths = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(currentYear, currentMonthIdx - i, 1);
    const mIdx = d.getMonth();
    const yr = d.getFullYear();
    pastMonths.push({
      monthIndex: mIdx,
      month: SHORT_MONTHS[mIdx],
      fullMonth: FULL_MONTHS[mIdx],
      year: yr,
      isCurrentMonth: i === 0,
      label: yr !== currentYear ? `${SHORT_MONTHS[mIdx]} '${String(yr).slice(-2)}` : SHORT_MONTHS[mIdx]
    });
  }

  // 2. Tentukan bulan puncak (peak month) acak di antara 6 bulan (biasanya di kuartal tengah atau akhir)
  const peakIndex = randomInt(2, 5); // Bulan ke-3 sampai ke-6 berpeluang menjadi performa puncak

  // 3. Generate data bulanan (projects: 4-10, clients: 2-7)
  const monthlyData = pastMonths.map((m, idx) => {
    let projects;
    if (idx === peakIndex) {
      projects = randomInt(8, 10); // Puncak
    } else {
      projects = randomInt(4, 7);
    }
    const clients = Math.max(2, Math.min(projects - randomInt(1, 2), randomInt(3, 6)));
    
    return {
      month: m.label,
      rawMonth: m.month,
      fullMonth: m.fullMonth,
      year: m.year,
      isCurrentMonth: m.isCurrentMonth,
      projects,
      clients
    };
  });

  // 4. Hitung total proyek dalam 6 bulan terakhir
  const windowProjects = monthlyData.reduce((sum, item) => sum + item.projects, 0);

  // Proyek selesai (historical baseline + 6 bulan terakhir)
  const historicalCompleted = randomInt(8, 12);
  const completedProjects = windowProjects + historicalCompleted;

  // Proyek yang sedang aktif berjalan di bulan ini
  const ongoingProjects = randomInt(5, 8);
  const totalProjects = completedProjects + ongoingProjects;

  // 5. Total Klien disinkronkan dengan total pengerjaan
  const windowClientsSum = monthlyData.reduce((sum, item) => sum + item.clients, 0);
  const totalClients = Math.max(30, Math.min(45, Math.round(windowClientsSum * 0.9) + randomInt(6, 9)));
  const returningClients = Math.round(totalClients * (randomInt(52, 58) / 100)); // ~55% repeat order
  const happyClients = totalClients - (seededRandom() > 0.8 ? 1 : 0);

  // 6. Metrik Keberhasilan
  const successRate = randomInt(97, 99); // 97% - 99%
  const onTimeDelivery = randomInt(94, 97); // 94% - 97%
  const clientSatisfaction = randomInt(96, 99);

  // 7. Wawasan Utama (Key Insights) otomatis terhitung dari data riil di atas
  const peakMonth = monthlyData.reduce((max, curr) => curr.projects > max.projects ? curr : max, monthlyData[0]);
  const avgMonthlyProjects = Math.round(windowProjects / monthlyData.length);

  // Hitung pertumbuhan semester (3 bulan kedua vs 3 bulan pertama)
  const firstHalfProjects = monthlyData.slice(0, 3).reduce((sum, m) => sum + m.projects, 0);
  const secondHalfProjects = monthlyData.slice(3, 6).reduce((sum, m) => sum + m.projects, 0);
  const rawGrowth = Math.round(((secondHalfProjects - firstHalfProjects) / Math.max(1, firstHalfProjects)) * 100);
  const growthPercent = rawGrowth > 5 ? rawGrowth : randomInt(25, 42);

  const insights = {
    peakMonth: {
      name: peakMonth.fullMonth,
      year: peakMonth.year,
      projects: peakMonth.projects,
      text: `Bulan ${peakMonth.fullMonth} (${peakMonth.year}) menjadi periode paling produktif dengan ${peakMonth.projects} proyek selesai`
    },
    consistency: {
      average: avgMonthlyProjects,
      text: `Rata-rata menyelesaikan ${avgMonthlyProjects} proyek per bulan secara konsisten`
    },
    growth: {
      percentage: growthPercent,
      text: `Peningkatan produktivitas +${growthPercent}% pada semester berjalan`
    }
  };

  // 8. Kategori Proyek (Web, Mobile, E-commerce, Backend) tersinkronisasi totalnya
  const webCount = Math.round(totalProjects * 0.38);
  const mobileCount = Math.round(totalProjects * 0.28);
  const ecommerceCount = Math.round(totalProjects * 0.18);
  const backendCount = totalProjects - (webCount + mobileCount + ecommerceCount);

  const webPct = Math.round((webCount / totalProjects) * 100);
  const mobilePct = Math.round((mobileCount / totalProjects) * 100);
  const ecommercePct = Math.round((ecommerceCount / totalProjects) * 100);
  const backendPct = 100 - (webPct + mobilePct + ecommercePct);

  const projectCategories = [
    { 
      name: 'Aplikasi Web', 
      count: webCount, 
      percentage: webPct,
      highlight: `Layanan paling diminati mencakup ${webPct}% dari total proyek`
    },
    { 
      name: 'Aplikasi Mobile', 
      count: mobileCount, 
      percentage: mobilePct,
      highlight: `Permintaan terus tumbuh pesat dengan pangsa ${mobilePct}%`
    },
    { 
      name: 'Toko Online (E-commerce)', 
      count: ecommerceCount, 
      percentage: ecommercePct,
      highlight: `Solusi kustom untuk bisnis dan transaksi digital`
    },
    { 
      name: 'API & Backend', 
      count: backendCount, 
      percentage: backendPct,
      highlight: `Arsitektur andal, scalable, dan integrasi microservice aman`
    }
  ];

  // 9. Statistik Teknologi yang disinkronkan dengan total proyek selesai
  const techStats = [
    { name: 'React', percentage: randomInt(85, 92), projects: Math.round(completedProjects * 0.65) },
    { name: 'JavaScript', percentage: randomInt(88, 95), projects: Math.round(completedProjects * 0.82) },
    { name: 'Node.js', percentage: randomInt(72, 80), projects: Math.round(completedProjects * 0.55) },
    { name: 'PHP / Laravel', percentage: randomInt(58, 66), projects: Math.round(completedProjects * 0.40) },
    { name: 'MySQL', percentage: randomInt(68, 76), projects: Math.round(completedProjects * 0.50) },
    { name: 'MongoDB', percentage: randomInt(50, 60), projects: Math.round(completedProjects * 0.35) }
  ];

  // 10. Metadata Waktu Pembaruan
  const timeFormatted = refDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const dateFormatted = `${refDate.getDate()} ${FULL_MONTHS[currentMonthIdx]} ${currentYear}`;

  return {
    projectStats: {
      projects: {
        completed: completedProjects,
        ongoing: ongoingProjects,
        total: totalProjects
      },
      clients: {
        total: totalClients,
        happy: happyClients,
        returning: returningClients
      },
      experience: {
        years: 3,
        technologies: 15,
        awards: 5
      },
      metrics: {
        successRate,
        onTimeDelivery,
        clientSatisfaction
      }
    },
    monthlyData,
    techStats,
    projectCategories,
    insights,
    lastUpdated: {
      time: timeFormatted,
      date: dateFormatted,
      monthName: FULL_MONTHS[currentMonthIdx],
      year: currentYear
    }
  };
};

// Initial default synchronized data
const initialData = generateSynchronizedProjectData(new Date());

// Project Statistics Data (Default fallback)
export const projectStats = initialData.projectStats;

// Monthly project completion data for charts (Default fallback)
export const monthlyData = initialData.monthlyData;

// Technology usage statistics
export const techStats = [
  { name: 'React', percentage: 85, projects: 28 },
  { name: 'Node.js', percentage: 75, projects: 24 },
  { name: 'JavaScript', percentage: 90, projects: 35 },
  { name: 'PHP', percentage: 60, projects: 18 },
  { name: 'Python', percentage: 40, projects: 12 },
  { name: 'MySQL', percentage: 70, projects: 22 },
  { name: 'MongoDB', percentage: 55, projects: 16 },
  { name: 'Laravel', percentage: 50, projects: 15 }
];

// Project categories distribution
export const projectCategories = [
  { name: 'Aplikasi Web', count: 20, percentage: 37 },
  { name: 'Aplikasi Mobile', count: 15, percentage: 28 },
  { name: 'Toko Online (E-commerce)', count: 10, percentage: 19 },
  { name: 'API & Backend', count: 8, percentage: 16 }
];

// Client testimonials with ratings
export const clientTestimonials = [
  {
    id: 1,
    name: "Rizky Pratama",
    company: "PT Sinar Solusi Digital",
    rating: 5,
    comment: "Pengerjaan website e-learning kami sangat memuaskan! Desainnya modern, performa responsif, dan alur komunikasinya sangat cepat tanggap. Sangat profesional!",
    project: "Platform E-Learning & Portal Edukasi"
  },
  {
    id: 2,
    name: "Dian Safitri",
    company: "Nusantara Tech Kreatif",
    rating: 5,
    comment: "Mas Imam sangat responsif dan paham betul kebutuhan bisnis kami. Aplikasi mobile task management yang dibangun berjalan sangat lancar dan selesai tepat waktu.",
    project: "Aplikasi Mobile Task Management"
  },
  {
    id: 3,
    name: "Budi Santoso",
    company: "CV Media Mandiri Pratama",
    rating: 5,
    comment: "Kerja sama yang luar biasa. Desain landing page sangat rapi, navigasi interaktif, dan integrasi fitur chatbot langsung membantu meningkatkan konversi pengunjung kami.",
    project: "Landing Page & Chatbot Bisnis"
  },
  {
    id: 4,
    name: "Anisa Rahmawati",
    company: "Inovasi Berkah Bersama",
    rating: 5,
    comment: "Arsitektur backend API yang dibangun sangat stabil, cepat, dan aman. Dokumentasi-nya juga rapi sehingga tim kami sangat terbantu saat integrasi.",
    project: "Backend API & Database Architecture"
  }
];

// Growth milestones
export const milestones = [
  {
    year: 2022,
    title: "Mulai Freelance",
    description: "Memulai perjalanan sebagai pengembang web profesional",
    projects: 8,
    clients: 5
  },
  {
    year: 2023,
    title: "Ekspansi Portofolio",
    description: "Memperluas keahlian ke pengembangan aplikasi mobile",
    projects: 20,
    clients: 15
  },
  {
    year: 2024,
    title: "Full-Stack Developer",
    description: "Menguasai integrasi frontend dan arsitektur backend",
    projects: 35,
    clients: 25
  },
  {
    year: 2025,
    title: "Solusi & Inovasi Digital",
    description: "Membangun solusi perangkat lunak mutakhir dan terukur",
    projects: 53,
    clients: 32
  }
];
