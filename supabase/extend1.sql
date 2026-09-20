-- ==============================================================================
-- SUPABASE EXTENSION & DELTA MIGRATION: EXTEND1.SQL
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query
-- (Skrip ini HANYA berisi penambahan fitur baru, Anda TIDAK perlu menjalankan ulang schema.sql)
-- ==============================================================================

-- 1. KEBIJAKAN ROW LEVEL SECURITY (RLS) UNTUK ADMIN TERAUTENTIKASI (CRUD)
DO $$
BEGIN
  -- Projects: Insert, Update, Delete untuk Authenticated Admin
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can insert projects') THEN
    CREATE POLICY "Authenticated users can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can update projects') THEN
    CREATE POLICY "Authenticated users can update projects" ON public.projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can delete projects') THEN
    CREATE POLICY "Authenticated users can delete projects" ON public.projects FOR DELETE TO authenticated USING (true);
  END IF;

  -- Blogs: Insert, Update, Delete untuk Authenticated Admin
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can insert blogs') THEN
    CREATE POLICY "Authenticated users can insert blogs" ON public.blogs FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can update blogs') THEN
    CREATE POLICY "Authenticated users can update blogs" ON public.blogs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can delete blogs') THEN
    CREATE POLICY "Authenticated users can delete blogs" ON public.blogs FOR DELETE TO authenticated USING (true);
  END IF;

  -- Pricing Packages: Insert, Update, Delete untuk Authenticated Admin
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can insert pricing') THEN
    CREATE POLICY "Authenticated users can insert pricing" ON public.pricing_packages FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can update pricing') THEN
    CREATE POLICY "Authenticated users can update pricing" ON public.pricing_packages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can delete pricing') THEN
    CREATE POLICY "Authenticated users can delete pricing" ON public.pricing_packages FOR DELETE TO authenticated USING (true);
  END IF;
END $$;

-- 2. SINKRONISASI SEQUENCE ID (Mencegah error 'duplicate key' pada ID auto-increment)
SELECT setval('public.projects_id_seq', COALESCE((SELECT MAX(id) FROM public.projects), 1));
SELECT setval('public.blogs_id_seq', COALESCE((SELECT MAX(id) FROM public.blogs), 1));

-- 3. SEED DATA PAKET LAYANAN & HARGA (PRICING PACKAGES)
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
