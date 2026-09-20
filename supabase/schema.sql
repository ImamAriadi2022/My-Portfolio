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
-- PENAMBAHAN FITUR, SEED PAKET HARGA & RLS ADMIN LANJUTAN:
-- Silakan jalankan skrip delta migration: supabase/extend1.sql
-- ==============================================================================


