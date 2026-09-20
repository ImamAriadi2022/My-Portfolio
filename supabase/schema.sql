-- ==============================================================================
-- SKEMA DATABASE SUPABASE & POSTGRESQL (IMAM ARIADI PORTFOLIO)
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query
-- ==============================================================================

-- 1. Tabel Projects (Portofolio Proyek)
CREATE TABLE IF NOT EXISTS public.projects (
  id BIGSERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL, -- 'frontend-web', 'frontend-mobile', 'backend', 'ai'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  goal TEXT,
  architecture TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  type VARCHAR(50) DEFAULT 'project', -- 'demo' | 'project'
  demo_url TEXT,
  github_url TEXT,
  details TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabel Blogs (Artikel & Tutorial)
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(100) NOT NULL,
  date VARCHAR(50),
  read_time VARCHAR(50),
  image TEXT,
  cover_image TEXT,
  article_url TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabel Pricing Packages (Paket Layanan & Harga)
CREATE TABLE IF NOT EXISTS public.pricing_packages (
  id VARCHAR(100) PRIMARY KEY,
  category VARCHAR(50) NOT NULL, -- 'web-development', 'learning', 'it-support', 'consultation'
  name VARCHAR(255) NOT NULL,
  badge VARCHAR(100),
  is_popular BOOLEAN DEFAULT false,
  price VARCHAR(100) NOT NULL,
  price_period VARCHAR(100),
  description TEXT,
  timeline VARCHAR(100),
  features JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  whatsapp_message TEXT,
  sort_order INT DEFAULT 0
);

-- ==============================================================================
-- KEAMANAN: Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Publik (SELECT / Baca Bebas)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public projects are viewable by everyone') THEN
    CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public blogs are viewable by everyone') THEN
    CREATE POLICY "Public blogs are viewable by everyone" ON public.blogs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public pricing are viewable by everyone') THEN
    CREATE POLICY "Public pricing are viewable by everyone" ON public.pricing_packages FOR SELECT USING (true);
  END IF;
END $$;

-- ==============================================================================
-- SEED DATA AWAL (PORTFOLIO PROYEK)
-- ==============================================================================
INSERT INTO public.projects (id, category, title, description, goal, architecture, features, image, images, technologies, type, demo_url, github_url, details, featured)
VALUES
(
  1,
  'frontend-web',
  'TeraLab (E-Learning Platform)',
  'Website Teralab Proteksi adalah landing page modern berbasis React dan Bootstrap dengan desain responsif, navigasi smooth, kartu layanan interaktif, serta fitur chatbot yang memudahkan komunikasi langsung dengan pengunjung.',
  'Menyediakan platform edukasi dan landing page modern yang mempermudah calon siswa serta profesional kelistrikan memahami materi proteksi, sekaligus meningkatkan konversi konsultasi pelatihan melalui alur informasi yang terstruktur.',
  'Single Page Application (SPA) berbasis React dengan modular component-based architecture, state management lokal yang ringan, layout Bootstrap 4 responsif, serta integrasi webhook chatbot interaktif untuk lead capture real-time.',
  '["Landing page interaktif dengan navigasi halus (smooth scrolling) dan responsive di semua perangkat", "Katalog silabus kursus dan kartu layanan proteksi kelistrikan dengan animasi interaktif", "Chatbot terintegrasi untuk customer support cepat dan konsultasi langsung", "Optimasi aset dan struktur halaman ramah SEO untuk visibilitas mesin pencari"]'::jsonb,
  '/img/teralab.png',
  '[{"url": "/img/teralab.png", "caption": "Halaman Beranda & Navigasi Silabus"}, {"url": "/assets/img/b1.jpg", "caption": "Katalog Layanan & Modul Proteksi"}, {"url": "/assets/img/port3.jpg", "caption": "Fitur Chatbot & Konsultasi Interaktif"}]'::jsonb,
  '["React", "JavaScript", "Material-UI", "Bootstrap"]'::jsonb,
  'demo',
  'https://teralab-proteksi.vercel.app/',
  'https://github.com/ImamAriadi2022/teralab-proteksi',
  NULL,
  true
),
(
  4,
  'frontend-mobile',
  'Task Manager App',
  'Aplikasi mobile untuk manajemen tugas dengan fitur reminder, kategori, dan sinkronisasi cloud.',
  'Meningkatkan produktivitas tim dan individu dalam mengelola ritme kerja harian melalui sistem pencatatan tugas yang cepat, terorganisir per prioritas, dan memiliki notifikasi pengingat otomatis agar tidak ada deadline yang terlewat.',
  'Aplikasi mobile cross-platform berbasis React Native dengan Redux Toolkit untuk state flow terpusat, lapisan penyimpanan AsyncStorage untuk strategi offline-first data persistence, serta modul push notification native Android/iOS.',
  '["Manajemen tugas komprehensif dengan kategori prioritas (Tinggi, Sedang, Rendah)", "Sistem push notification otomatis untuk pengingat tenggat waktu (deadline)", "Dukungan offline-first: data tetap tersimpan aman saat tidak ada koneksi internet", "Filter cerdas dan pelacakan riwayat tugas selesai dengan visual progres"]'::jsonb,
  '/assets/img/b2.png',
  '[{"url": "/assets/img/b2.png", "caption": "Dashboard Utama & Manajemen Tugas"}, {"url": "/assets/img/b3.png", "caption": "Detail Tenggat Waktu & Prioritas"}, {"url": "/assets/img/b4.png", "caption": "Riwayat Tugas Selesai & Filter Kategori"}]'::jsonb,
  '["React Native", "Redux", "AsyncStorage", "Push Notifications"]'::jsonb,
  'demo',
  'https://expo.dev/@imam/task-manager',
  'https://github.com/imam/task-manager-app',
  NULL,
  true
),
(
  7,
  'backend',
  'TodoList WEB3 using ethereum',
  'Backend API untuk TodoList berbasis WEB3 dengan smart contract dan IPFS.',
  'Membangun ekosistem manajemen aktivitas terdesentralisasi (DApp) yang permanen, transparan, dan bebas sensor pihak ketiga dengan memanfaatkan smart contract jaringan Ethereum dan penyimpanan terdistribusi.',
  'Solidity Smart Contract dikembangkan dan diuji menggunakan Hardhat framework, dihubungkan ke client-side melalui Ethers.js/Web3.js, metadata terenkripsi disimpan di jaringan IPFS (InterPlanetary File System), serta optimasi gas fee pada penulisan state contract.',
  '["Autentikasi akun Web3 terdesentralisasi via integrasi dompet crypto MetaMask", "Penyimpanan riwayat tugas permanen dan immutable pada blockchain Ethereum", "Penyimpanan aset terdistribusi menggunakan protokol IPFS yang tahan sensor", "Smart contract teroptimasi untuk konsumsi gas yang efisien pada setiap transaksi"]'::jsonb,
  '/img/web3.png',
  '[{"url": "/img/web3.png", "caption": "Antarmuka DApp & Koneksi Dompet MetaMask"}, {"url": "/assets/img/b7.png", "caption": "Pengujian & Kompilasi Smart Contract via Hardhat"}, {"url": "/assets/img/b8.jpg", "caption": "Penyimpanan Desentralisasi Metadata IPFS"}]'::jsonb,
  '["Node.js", "Hardhat", "Solidity", "IPFS", "Ethers.js"]'::jsonb,
  'project',
  NULL,
  'https://github.com/ImamAriadi2022/metamint-nft-dapp',
  'API yang menangani 10,000+ transaksi per hari dengan response time rata-rata 150ms. Implementasi rate limiting, caching dengan Redis, dan monitoring dengan Prometheus.',
  true
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- SEED DATA AWAL (BLOGS)
-- ==============================================================================
INSERT INTO public.blogs (id, title, excerpt, content, category, date, read_time, image, cover_image, article_url, tags, featured)
VALUES
(
  1,
  'Panduan Lengkap Memulai React Hooks untuk Pemula & Profesional',
  'Pelajari cara menggunakan React Hooks secara efektif dalam proyek web Anda. Dari useState hingga useEffect, kuasai fundamental dan contoh praktisnya.',
  'Panduan komprehensif yang membahas React Hooks esensial termasuk useState, useEffect, useContext, dan pembuatan custom hooks.',
  'Web',
  '15 Desember 2024',
  '8 menit baca',
  '/assets/img/b4.png',
  '/assets/img/blog-covers/react-hooks.jpg',
  'https://medium.com/@imam-ariadi/react-hooks-complete-guide',
  '["React", "JavaScript", "Frontend", "Hooks"]'::jsonb,
  true
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- SEED DATA AWAL (PRICING PACKAGES)
-- ==============================================================================
INSERT INTO public.pricing_packages (id, category, name, badge, is_popular, price, price_period, description, timeline, features, technologies, whatsapp_message, sort_order)
VALUES
(
  'landing-page',
  'web-development',
  'Landing Page / Company Profile',
  'Pilihan Pemula',
  false,
  'Rp 1.500.000',
  'mulai dari / proyek',
  'Website profesional untuk UMKM, personal brand, organisasi, perusahaan, produk, maupun layanan yang membutuhkan kehadiran digital.',
  '3 - 7 Hari Kerja',
  '["Desain responsif Mobile, Tablet, dan Desktop", "Hingga 6 section utama", "Integrasi WhatsApp & Form Kontak", "Animasi dan interaksi dasar", "Optimasi performa dan SEO dasar", "Bantuan konfigurasi domain & hosting", "Garansi perbaikan bug 14 hari"]'::jsonb,
  '["React / Vite", "Tailwind CSS / Bootstrap", "SEO Ready"]'::jsonb,
  'Halo Mas Imam, saya tertarik dengan paket Landing Page / Company Profile. Bisa minta detail paket dan estimasinya?',
  1
),
(
  'web-application',
  'web-development',
  'Web Application',
  'Paling Populer',
  true,
  'Rp 3.500.000',
  'mulai dari / proyek',
  'Pengembangan aplikasi web dinamis dengan database, autentikasi, dashboard, CRUD, dan fitur bisnis yang disesuaikan dengan kebutuhan.',
  '2 - 4 Minggu',
  '["Frontend interaktif berbasis React", "Backend API menggunakan Node.js / Express", "Sistem login dan autentikasi", "Role & permission management", "Database MySQL / PostgreSQL / MongoDB", "Dashboard dan sistem CRUD", "Integrasi API pihak ketiga", "Source code dan dokumentasi proyek", "Garansi bug hingga 30 hari"]'::jsonb,
  '["React", "Node.js", "Express", "MySQL / PostgreSQL", "REST API"]'::jsonb,
  'Halo Mas Imam, saya ingin membuat Web Application untuk kebutuhan bisnis/proyek saya. Bisa diskusi mengenai fitur dan estimasinya?',
  2
),
(
  'custom-web-system',
  'web-development',
  'Custom Web System',
  'Kebutuhan Khusus',
  false,
  'Rp 6.000.000',
  'mulai dari / proyek',
  'Pengembangan sistem web kompleks seperti sistem informasi, dashboard manajemen, marketplace, SaaS, sistem internal perusahaan, atau platform digital dengan kebutuhan khusus.',
  '4 - 8 Minggu',
  '["Arsitektur sistem scalable & clean code", "Frontend & Backend custom sesuai kebutuhan bisnis", "Database relasional / NoSQL teroptimasi", "Integrasi Payment Gateway (Midtrans/Xendit)", "Sistem laporan, export PDF/Excel, chart", "Testing, staging, & production deployment", "Dokumentasi teknis & video panduan penggunaan", "Garansi dan pemeliharaan hingga 60 hari"]'::jsonb,
  '["Next.js / React", "Node.js / Go / PHP", "PostgreSQL / MySQL", "Payment Gateway", "Docker / Cloud"]'::jsonb,
  'Halo Mas Imam, saya memiliki proyek Custom Web System yang ingin didiskusikan. Kapan ada waktu untuk konsultasi?',
  3
),
(
  'mentoring-pemula',
  'learning',
  'Mentoring Pemula (HTML, CSS, JS)',
  'Bimbingan 1-on-1',
  false,
  'Rp 150.000',
  '/ sesi (90 menit)',
  'Bimbingan privat intensif belajar pemrograman web dari nol hingga bisa membuat website sendiri. Materi disesuaikan dengan ritme belajar Anda.',
  'Jadwal Fleksibel',
  '["Sesi 1-on-1 via Google Meet / Zoom", "Materi fundamental: HTML5, CSS3, JavaScript ES6+", "Latihan studi kasus membuat proyek nyata", "Code review dan tanya jawab langsung", "Materi rangkuman & source code sesi", "Konsultasi santai via chat selama program"]'::jsonb,
  '["HTML5", "CSS3", "JavaScript", "Git & GitHub", "VS Code"]'::jsonb,
  'Halo Mas Imam, saya ingin daftar Mentoring Pemula untuk belajar web programming dari dasar. Bagaimana jadwal dan alurnya?',
  4
),
(
  'mentoring-frontend',
  'learning',
  'Mentoring Frontend (React / Next.js)',
  'Paling Diminati',
  true,
  'Rp 250.000',
  '/ sesi (90 menit)',
  'Tingkatkan kemampuan frontend development Anda ke level profesional dengan menguasai React, modern state management, hooks, dan ekosistem Next.js.',
  'Jadwal Fleksibel',
  '["Sesi 1-on-1 dengan studi kasus proyek nyata", "Pendalaman React Hooks, Component Lifecycle, & State", "Best practices clean code & modular architecture", "Konsumsi REST API & penanganan state asinkron", "Tips persiapan portfolio & interview kerja frontend", "Review code portfolio Anda secara mendalam"]'::jsonb,
  '["React.js", "Next.js", "Tailwind CSS", "REST API", "Zustand / Redux"]'::jsonb,
  'Halo Mas Imam, saya tertarik ikut Mentoring Frontend React/Next.js. Kapan ada jadwal kosong untuk sesi mentoring?',
  5
),
(
  'bimbingan-skripsi',
  'learning',
  'Bimbingan Skripsi & Tugas Akhir IT',
  'Solusi Mahasiswa',
  false,
  'Rp 500.000',
  'mulai dari / paket',
  'Pendampingan pembuatan aplikasi untuk skripsi, tesis, atau tugas akhir jurusan Teknik Informatika / Sistem Informasi sampai siap sidang.',
  'Sesuai Deadline Kampus',
  '["Konsultasi arsitektur sistem & diagram (UML/ERD)", "Bimbingan koding dan implementasi algoritma/metode", "Debugging error dan optimasi performa aplikasi", "Simulasi pertanyaan sidang dan demo aplikasi", "Bantuan penyusunan bab implementasi sistem", "Jaminan aplikasi berjalan lancar saat didemokan"]'::jsonb,
  '["Web / Mobile App", "MySQL / PostgreSQL", "Metode & Algoritma", "Clean Architecture"]'::jsonb,
  'Halo Mas Imam, saya butuh bimbingan untuk proyek skripsi/tugas akhir IT saya. Bisakah saya konsultasikan judul dan aplikasinya?',
  6
),
(
  'deployment-domain',
  'it-support',
  'Setup Deployment, Domain & VPS',
  'Cepat & Bergaransi',
  false,
  'Rp 300.000',
  '/ proyek setup',
  'Bantuan teknis untuk mendeploy aplikasi web Anda ke server produksi (VPS / Cloud Hosting), konfigurasi DNS domain kustom, dan setup SSL gratis.',
  '1 - 2 Hari Kerja',
  '["Deploy ke VPS (Ubuntu/Debian) atau Vercel/cPanel", "Konfigurasi web server Nginx / Apache", "Setup custom domain dan DNS management", "Pemasangan sertifikat SSL (HTTPS) gratis", "Konfigurasi environment variables & database", "Dokumentasi akses dan cara maintain server"]'::jsonb,
  '["VPS / Cloud", "Nginx / Apache", "SSL (Let''s Encrypt)", "DNS Management", "Docker Dasar"]'::jsonb,
  'Halo Mas Imam, saya butuh bantuan untuk setup deployment dan domain untuk website saya. Bisa bantu prosesnya?',
  7
),
(
  'maintenance-bugfix',
  'it-support',
  'Maintenance, Bugfix & Optimasi',
  'Problem Solver',
  false,
  'Rp 200.000',
  'mulai dari / per kasus',
  'Layanan investigasi dan perbaikan bug, error sistem, pembaruan dependensi, peningkatan kecepatan loading, atau penambahan fitur kecil pada website.',
  '1 - 3 Hari Kerja',
  '["Analisis mendalam sumber error / bottleneck", "Perbaikan bug pada Frontend atau Backend", "Optimasi kecepatan website dan Google PageSpeed", "Pembersihan malware atau script mencurigakan", "Update versi library dan framework yang usang", "Laporan hasil perbaikan dan rekomendasi"]'::jsonb,
  '["Bug Fixing", "Performance Tuning", "Security Audit", "Code Refactoring"]'::jsonb,
  'Halo Mas Imam, website saya mengalami error/bug dan butuh bantuan perbaikan segera. Bisa bantu cek masalahnya?',
  8
),
(
  'konsultasi-teknis',
  'consultation',
  'Konsultasi Teknis & Arsitektur IT',
  'Solusi Profesional',
  false,
  'Rp 200.000',
  '/ sesi (60 menit)',
  'Sesi diskusi mendalam untuk membahas ide produk, pemilihan tech stack, review arsitektur aplikasi, estimasi biaya proyek, atau roadmap pengembangan.',
  'Jadwal Fleksibel',
  '["Sesi 1-on-1 via Google Meet dengan screen share", "Rekomendasi tech stack terbaik untuk kebutuhan bisnis", "Review arsitektur sistem, database, dan security", "Estimasi timeline dan biaya pengembangan realistis", "Penyusunan spesifikasi kebutuhan perangkat lunak", "Ringkasan notulensi dan action item setelah sesi"]'::jsonb,
  '["System Architecture", "Tech Stack Selection", "Product Strategy", "Security Best Practice"]'::jsonb,
  'Halo Mas Imam, saya ingin menjadwalkan sesi Konsultasi Teknis IT untuk mendiskusikan rencana proyek/produk saya.',
  9
)
ON CONFLICT (id) DO NOTHING;

