# ROADMAP.md

# Imam Ariadi Portfolio — Fullstack Development Roadmap

**Versi:** 3.0  
**Arsitektur:** Next.js 14 (App Router) + Supabase (PostgreSQL) + Vercel Blob Storage + Vercel Deployment  
**Status Terakhir:** Phase 4 Selesai (On-Demand Revalidation, Leads System, & Vercel Analytics Aktif 100%)

---

## Ringkasan Tujuan Proyek (Project Goal)

Membangun personal website portofolio profesional berarsitektur **Fullstack Modern & Serverless** yang menyajikan:
* **Public Website**: Beranda interaktif, pameran portofolio, artikel blog teknis, statistik proyek real-time, dan paket daftar harga/layanan.
* **Database & BaaS**: Supabase (PostgreSQL) dengan Row Level Security (RLS) dan graceful static fallback data JSON.
* **Cloud Storage**: Vercel Blob Storage (`@vercel/blob`) untuk penyimpanan berkas media, gambar proyek, dan dokumen PDF (CV).
* **Admin CMS**: Dashboard pengelolaan konten (CRUD Projects, Blogs, Services, & Settings) berbasis Server Actions dan Supabase Auth.
* **Infrastructure & Hosting**: Vercel Edge/Serverless Network dengan CI/CD otomatis, Zero-Downtime Deployment, dan SSL otomatis.

---

## Diagram Arsitektur Sistem

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Next.js 14 (App Router)                       │
├───────────────────────────────────┬────────────────────────────────────┤
│         Server Layer              │            Client Layer            │
│  • Server Components (SSR / ISR)  │  • Interactive UI ('use client')   │
│  • Route Handlers (/api/*)        │  • AOS & Canvas Animations         │
│  • Server Actions                 │  • Modal & Client Filters          │
└─────────────────┬─────────────────┴──────────────────┬─────────────────┘
                  │                                    │
                  ▼                                    ▼
       ┌──────────────────────┐             ┌──────────────────────┐
       │ Supabase (PostgreSQL)│             │ Vercel Blob Storage  │
       │  • Projects Table    │             │  • Project Images    │
       │  • Blogs Table       │             │  • Blog Covers       │
       │  • Pricing Packages  │             │  • PDF Resume (CV)   │
       │  • Row Level Security│             │  • Edge CDN Delivery │
       └──────────────────────┘             └──────────────────────┘
```

---

## Phase 0 — Migrasi & Fondasi Arsitektur (SELESAI)

### Objective
Merombak struktur aplikasi dari Vite React JS (Frontend-only) ke Next.js 14 App Router (Fullstack) tanpa merubah desain UI, styling, atau fitur yang ada.

### Scope & Deliverables
* [x] **Setup Dependencies**: Hapus dependensi Vite & `react-router-dom`, pasang `next@14.2.15`, `@supabase/supabase-js`, dan `@vercel/blob`.
* [x] **Environment Configuration**: Konfigurasi kredensial aman di `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `POSTGRES_*`, `BLOB_READ_WRITE_TOKEN`).
* [x] **Supabase Client Utilities**: Implementasi [`lib/supabase/client.js`](file:///c:/programming/My-Portfolio/lib/supabase/client.js) dan [`lib/supabase/server.js`](file:///c:/programming/My-Portfolio/lib/supabase/server.js).
* [x] **Database DDL & Seed Script**: Penyusunan skrip SQL lengkap di [`supabase/schema.sql`](file:///c:/programming/My-Portfolio/supabase/schema.sql) (tabel `projects`, `blogs`, `pricing_packages`, dan RLS policies).
* [x] **Route Handler Upload**: Pembuatan endpoint [`app/api/upload/route.js`](file:///c:/programming/My-Portfolio/app/api/upload/route.js) menggunakan `@vercel/blob`.
* [x] **App Router Structure**:
  * `app/layout.jsx`: RootLayout dengan font Poppins, styling `@import`, dan pemuatan script partikel `beforeInteractive`.
  * `app/page.jsx`: Server Component beranda dengan Supabase query dan fallback data.
  * `app/all-projects/page.jsx`: Halaman portofolio lengkap.
  * `app/all-blogs/page.jsx`: Halaman artikel dan panduan teknis.
  * `app/price-list/page.jsx`: Halaman daftar harga dan paket layanan.
  * `app/pricing/page.jsx`: Redirect otomatis ke `/price-list`.
* [x] **Pembersihan Dead Code**: Menghapus `vite.config.js`, `index.html`, `main.jsx`, `AppRouter.jsx`, `App.jsx`, `contact.js`, `PortfolioSection.jsx`, dan folder `dist/`.
* [x] **Verifikasi Build**: `npm run build` sukses 100% (9/9 static routes terkompilasi bersih).

---

## Phase 1 — Sinkronisasi Database Supabase (SELESAI)

### Objective
Menjalankan skema database dan mengaktifkan data dinamis dari Supabase PostgreSQL secara langsung ke website.

### Scope & Deliverables
* [x] **Eksekusi Skrip SQL**: Skrip [`supabase/schema.sql`](file:///c:/programming/My-Portfolio/supabase/schema.sql) telah dijalankan di Supabase Dashboard (SQL Editor).
* [x] **Verifikasi Live Query**:
  * Tabel `projects`: Terverifikasi aktif dan mengembalikan data portofolio dinamis (TeraLab, Task Manager App, TodoList WEB3, dll).
  * Tabel `blogs`: Terverifikasi aktif dan mengembalikan data artikel blog live.
  * Tabel `pricing_packages`: Struktur tabel aktif dengan kebijakan RLS publik aman dan skrip seed data lengkap.
* [x] **Validasi Row Level Security (RLS)**: Hak akses read-only (`SELECT`) publik telah terkonfirmasi aktif dan aman.
* [x] **Integrasi Server Components**: `app/page.jsx`, `app/all-projects/page.jsx`, `app/all-blogs/page.jsx`, dan `app/price-list/page.jsx` terhubung langsung ke database Supabase dengan sistem fallback otomatis.

---

## Phase 2 — Media Management & Vercel Blob Integration (SELESAI)

### Objective
Memanfaatkan Vercel Blob Storage untuk manajemen aset gambar dan dokumen berkinerja tinggi.

### Scope & Deliverables
* [x] **Route Handler Lengkap (`app/api/upload/route.js`)**:
  * Mendukung `multipart/form-data` (browser file input) dan direct binary stream.
  * Validasi tipe berkas aman: JPG, JPEG, PNG, WebP, SVG, GIF, dan PDF.
  * Batasan ukuran berkas ketat (maksimal 4.5 MB).
  * Terintegrasi dengan `@vercel/blob` (`put`, `del`, `list`).
  * Sistem graceful local fallback (`/public/uploads/`) saat development offline atau sebelum token diset.
* [x] **Client Media Utilities (`lib/blob.js`)**:
  * Fungsi `uploadMedia(file)`, `deleteMedia(url)`, dan `listMedia()`.
* [x] **Komponen Interaktif Media Uploader (`src/components/MediaUploader.jsx`)**:
  * Desain dark mode estetik selaras dengan portofolio.
  * Area drag-and-drop, validasi live, pratinjau thumbnail/PDF, tombol salin URL CDN, dan tombol hapus berkas.
* [x] **Pembaruan CV/Resume Cloud (`app/cv/route.js`)**:
  * Tautan "Unduh CV" di Hero Section kini mengarah ke `/cv`.
  * Rute `/cv` otomatis menyajikan versi terbaru dari cloud storage Vercel Blob (atau fallback lokal).
* [x] **Konfigurasi Remote Patterns**: Domain Vercel Blob (`**.public.blob.vercel-storage.com`) telah terdaftar di `next.config.js`.
* [x] **Pengujian Otomatis**: Pengujian `GET`, `POST`, `DELETE`, dan redirect `/cv` sukses 100%.

---

## Phase 3 — Admin CMS & Content Management (SELESAI)

### Objective
Membangun dashboard CMS terproteksi untuk mengelola seluruh konten website tanpa perlu mengubah kode sumber atau membuka SQL Editor.

### Scope & Deliverables
* [x] **Admin Route Handlers (`/api/admin/*`)**:
  * [`app/api/admin/projects/route.js`](file:///c:/programming/My-Portfolio/app/api/admin/projects/route.js): Full CRUD (GET, POST, PUT, DELETE) dengan ID collision guard otomatis dan On-Demand Cache Revalidation (`revalidatePath`).
  * [`app/api/admin/blogs/route.js`](file:///c:/programming/My-Portfolio/app/api/admin/blogs/route.js): Full CRUD artikel blog dan revalidation live.
  * [`app/api/admin/pricing/route.js`](file:///c:/programming/My-Portfolio/app/api/admin/pricing/route.js): Full CRUD paket layanan harga dan revalidation live.
  * [`app/api/admin/stats/route.js`](file:///c:/programming/My-Portfolio/app/api/admin/stats/route.js): Ringkasan metrik statistik real-time dari Supabase PostgreSQL.
* [x] **Autentikasi Admin & Proteksi Akses**:
  * Login admin via Supabase Auth (`supabase.auth.signInWithPassword` & `signUp`).
  * Session Guard pada [`app/admin/layout.jsx`](file:///c:/programming/My-Portfolio/app/admin/layout.jsx) dengan redirect otomatis jika belum terautentikasi.
  * Akses Langsung / Demo Admin Mode untuk pengujian lokal yang mulus.
* [x] **High-End Dark Dashboard UI ([`app/admin/admin.css`](file:///c:/programming/My-Portfolio/app/admin/admin.css))**:
  * Desain dark mode konsisten dengan warna aksen portfolio (`#28a745`, `#34ce57`).
  * Sidebar responsif dengan drawer mobile toggle, header ringkas, kartu statistik metrik, dan tabel interaktif.
* [x] **Halaman Manajemen Admin**:
  * **Dashboard Overview ([`app/admin/page.jsx`](file:///c:/programming/My-Portfolio/app/admin/page.jsx))**: Widget kartu metrik (Proyek, Blog, Harga, Status Supabase) dan tabel preview aktivitas terbaru.
  * **Proyek Portofolio ([`app/admin/projects/page.jsx`](file:///c:/programming/My-Portfolio/app/admin/projects/page.jsx))**: Pencarian judul/teknologi, filter kategori, status *Featured* toggle, modal input/edit dengan integrasi `MediaUploader`, dan konfirmasi hapus aman.
  * **Artikel & Blog ([`app/admin/blogs/page.jsx`](file:///c:/programming/My-Portfolio/app/admin/blogs/page.jsx))**: Manajemen artikel, tanggal terbit, waktu baca, tag chip, integrasi upload cover, dan link artikel eksternal.
  * **Paket Layanan & Harga ([`app/admin/pricing/page.jsx`](file:///c:/programming/My-Portfolio/app/admin/pricing/page.jsx))**: Manajemen paket harga, status populer/badge, fitur bullet points, urutan sort order, serta fitur 1-klik "Impor 9 Paket Bawaan ke Supabase".
* [x] **Pengujian & Verifikasi Penuh**:
  * Automated CRUD integration test suite sukses 100% untuk seluruh entitas (Proyek, Blog, Harga).
  * Build produksi Next.js (`npm run build`) berhasil 100% (19/19 routes terkompilasi bersih).

---

## Phase 4 — On-Demand Revalidation & Live Interactivity (SELESAI)

### Objective
Menjaga kecepatan akses static page (ISR) sembari menjamin konten selalu langsung terbarukan begitu diubah di CMS, sistem penangkapan lead interaktif, serta analitik performa real-time.

### Scope & Deliverables
* [x] **Skrip Migrasi Delta Baru ([`supabase/extend2.sql`](file:///c:/programming/My-Portfolio/supabase/extend2.sql))**:
  * Pembuatan tabel `public.leads` untuk menampung pesan calon klien dan riwayat kontak.
  * Kebijakan Row Level Security (RLS) aman: publik dapat melakukan `INSERT`, admin terautentikasi memiliki akses penuh `SELECT`, `UPDATE`, `DELETE`.
* [x] **On-Demand Cache Revalidation Engine ([`app/api/revalidate/route.js`](file:///c:/programming/My-Portfolio/app/api/revalidate/route.js))**:
  * Endpoint publik terproteksi token rahasia untuk memicu `revalidatePath()` seketika pada `/`, `/all-projects`, `/all-blogs`, atau `/price-list`.
  * Integrasi revalidasi otomatis pada seluruh aksi tulis Admin CMS (Projects, Blogs, Pricing).
* [x] **API Handler & Form Kontak Interaktif ([`app/api/contact/route.js`](file:///c:/programming/My-Portfolio/app/api/contact/route.js))**:
  * Validasi nama, email, nomor telepon, dan isi pesan.
  * Penyimpanan pesan calon klien ke tabel `leads` Supabase secara asinkron.
  * Generator pesan WhatsApp otomatis dengan encode teks percakapan instan.
* [x] **Komponen Interaktif Modal Kontak ([`src/components/ContactModal.jsx`](file:///c:/programming/My-Portfolio/src/components/ContactModal.jsx) & `.css`)**:
  * Modal interaktif dark mode elegan yang terhubung ke tombol "Hubungi Saya" di Hero Section dan Footer.
  * Feedback status pengiriman live (loading, error, sukses) dan tombol direct follow-up ke WhatsApp.
* [x] **Modul Inbox Admin Leads ([`app/admin/leads/page.jsx`](file:///c:/programming/My-Portfolio/app/admin/leads/page.jsx) & [`app/api/admin/leads/route.js`](file:///c:/programming/My-Portfolio/app/api/admin/leads/route.js))**:
  * Inbox pesan masuk di Admin CMS dengan filter status (`unread`, `read`, `replied`), pencarian, dan modal baca detail.
  * Tombol aksi instan: "Balas via WhatsApp", "Balas via Email", "Tandai Selesai", dan "Hapus".
  * Sinkronisasi metrik jumlah pesan masuk ke Dashboard Overview ([`app/admin/page.jsx`](file:///c:/programming/My-Portfolio/app/admin/page.jsx)).
* [x] **Integrasi Vercel Web Analytics & Speed Insights**:
  * Dependensi `@vercel/analytics` dan `@vercel/speed-insights` terpasang.
  * Komponen `<Analytics />` dan `<SpeedInsights />` terpasang aktif di RootLayout ([`app/layout.jsx`](file:///c:/programming/My-Portfolio/app/layout.jsx)).
* [x] **Pengujian & Kompilasi Produksi**:
  * Automated integration test suite Phase 4 sukses 100%.
  * Next.js production build (`npm run build`) sukses 100% (23/23 routes terkompilasi bersih).

---

## Phase 5 — SEO, Meta Tags & PWA

### Objective
Mengoptimalkan visibilitas website di mesin pencari (Google Search) dan tampilan saat tautan dibagikan di media sosial.

### Scope
* Next.js Metadata API dinamis: OpenGraph (OG image), Twitter Cards, dan deskripsi SEO per halaman.
* Pembuatan Sitemap otomatis: [`app/sitemap.js`](file:///c:/programming/My-Portfolio/app/sitemap.js) yang menarik slug blog dan proyek dari Supabase.
* Pembuatan Robots config: [`app/robots.js`](file:///c:/programming/My-Portfolio/app/robots.js) untuk aturan perayapan search engine.
* Penerapan Structured Data (JSON-LD) dengan skema `Person`, `WebSite`, dan `Article`.
* Audit Google Lighthouse dengan target skor:
  * Performance: > 90
  * Accessibility: > 95
  * Best Practices: 100
  * SEO: 100

### Deliverables
* Skor SEO dan Core Web Vitals optimal.
* Tampilan link preview informatif di WhatsApp, LinkedIn, dan Twitter.

---

## Phase 6 — Deployment Production & Continuous Delivery (Vercel)

### Objective
Menjalankan website di jaringan server global Vercel dengan otomatisasi deployment berbasis Git.

### Scope
* Menghubungkan repositori GitHub ke platform Vercel.
* Konfigurasi Environment Variables di Vercel Dashboard (Supabase & Blob keys).
* Menghubungkan domain kustom pribadi dengan sertifikat SSL/TLS gratis otomatis.
* Konfigurasi continuous deployment: setiap commit ke branch `main` otomatis di-build dan di-deploy ke production dalam waktu < 2 menit.
* Pengujian pratinjau (Preview Deployments) untuk setiap branch fitur atau pull request.

### Deliverables
* Website online di domain kustom dengan uptime 99.99%.
* Siklus rilis otomatis dan aman.
