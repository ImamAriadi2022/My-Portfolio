# ROADMAP.md

# Imam Ariadi Portfolio — Fullstack Development Roadmap

**Versi:** 3.0  
**Arsitektur:** Next.js 14 (App Router) + Supabase (PostgreSQL) + Vercel Blob Storage + Vercel Deployment  
**Status Terakhir:** Phase 6 Selesai (100% Seluruh Roadmap Tuntas — Production Live di https://imamdev.my.id)

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

## Phase 5 — SEO, Meta Tags, Structured Data & PWA (SELESAI)

### Objective
Mengoptimalkan visibilitas website di mesin pencari (Google Search), kesiapan instalasi Progressive Web App (PWA), serta tampilan tautan yang kaya saat dibagikan di media sosial mengacu pada domain kustom resmi **`https://imamdev.my.id`**.

### Scope & Deliverables
* [x] **Konfigurasi Base URL Produksi**:
  * Pendaftaran `NEXT_PUBLIC_SITE_URL="https://imamdev.my.id"` pada `.env.local` sebagai single source of truth URL kanonikal.
* [x] **Dynamic Sitemap Generator ([`app/sitemap.js`](file:///c:/programming/My-Portfolio/app/sitemap.js))**:
  * Menghasilkan file XML `https://imamdev.my.id/sitemap.xml` secara otomatis.
  * Mengambil waktu update riil (`updated_at` / `lastModified`) secara live dari Supabase PostgreSQL untuk route `/`, `/all-projects`, `/price-list`, dan `/all-blogs`.
  * Konfigurasi frekuensi perayapan (`changeFrequency`) dan prioritas indeksasi (`priority`).
* [x] **Robots Engine ([`app/robots.js`](file:///c:/programming/My-Portfolio/app/robots.js))**:
  * Menghasilkan `https://imamdev.my.id/robots.txt`.
  * Mengizinkan mesin pencari merayapi seluruh halaman publik (`Allow: /`).
  * Memblokir perayapan Googlebot ke area sensitif (`Disallow: /admin/` dan `Disallow: /api/`).
  * Menautkan lokasi resmi Sitemap XML.
* [x] **Progressive Web App Manifest ([`app/manifest.js`](file:///c:/programming/My-Portfolio/app/manifest.js))**:
  * Menyajikan manifest PWA `/manifest.webmanifest` dengan standar aplikasi modern.
  * Konfigurasi tema warna dark mode (`background: #000000`, `theme: #28a745`), ikon high-res 192x192 & 512x512, serta mode tampilan `standalone`.
* [x] **Rich Structured Data / JSON-LD ([`src/components/JsonLd.jsx`](file:///c:/programming/My-Portfolio/src/components/JsonLd.jsx))**:
  * Standarisasi Schema.org untuk 3 entitas utama:
    * `Person`: Profil lengkap Imam Ariadi, profesi Fullstack Web & Mobile Developer, portofolio profil LinkedIn/GitHub, dan relasi website.
    * `WebSite`: Metadata identitas website `https://imamdev.my.id` dan deskripsi kapabilitas.
    * `ProfessionalService`: Entitas bisnis jasa teknologi, harga layanan (IDR), jam operasional, dan cakupan bimbingan skripsi / pembuatan aplikasi.
* [x] **Perluasan Metadata Halaman**:
  * [`app/layout.jsx`](file:///c:/programming/My-Portfolio/app/layout.jsx): OpenGraph card lengkap, Twitter large summary card, canonical URL, author, creator, publisher, format-detection, dan Googlebot directives.
  * [`app/all-projects/page.jsx`](file:///c:/programming/My-Portfolio/app/all-projects/page.jsx): Metadata SEO khusus katalog proyek portofolio.
  * [`app/all-blogs/page.jsx`](file:///c:/programming/My-Portfolio/app/all-blogs/page.jsx): Metadata SEO khusus kumpulan artikel & panduan IT.
  * [`app/price-list/page.jsx`](file:///c:/programming/My-Portfolio/app/price-list/page.jsx): Metadata SEO khusus daftar harga & paket layanan jasa.
* [x] **Verifikasi & Validasi Endpoint**:
  * `GET /robots.txt`: Menghasilkan status 200 OK dengan proteksi admin/api dan penunjuk sitemap.
  * `GET /sitemap.xml`: Menghasilkan XML 200 OK dengan format sitemap schema valid.
  * `GET /manifest.webmanifest`: Menghasilkan JSON 200 OK dengan parameter PWA lengkap.
  * Injeksi metadata dan tag JSON-LD pada HTML render server terkonfirmasi valid.

---

## Phase 6 — Deployment Production & Continuous Delivery (SELESAI)

### Objective
Menjalankan website di jaringan server global Vercel dengan otomatisasi deployment berbasis Git pada domain kustom resmi **`https://imamdev.my.id`**.

### Scope & Deliverables
* [x] **Koneksi Repositori GitHub & Vercel**:
  * Repositori GitHub [`ImamAriadi2022/My-Portfolio`](https://github.com/ImamAriadi2022/My-Portfolio) terhubung langsung ke pipeline deployment otomatis Vercel.
* [x] **Spesifikasi Framework & Konfigurasi Build ([`vercel.json`](file:///c:/programming/My-Portfolio/vercel.json))**:
  * Pemasangan `vercel.json` dengan deklarasi eksplisit `"framework": "nextjs"` untuk mengunci build runner Vercel pada Next.js 14 App Router.
* [x] **Template Variabel Lingkungan ([`.env.example`](file:///c:/programming/My-Portfolio/.env.example))**:
  * Dokumentasi lengkap seluruh variabel lingkungan produksi (Supabase URL, Anon Key, Service Role Key, Vercel Blob Token, Site URL, Revalidation Secret).
* [x] **Pencegahan Kebocoran Kredensial ([`.gitignore`](file:///c:/programming/My-Portfolio/.gitignore))**:
  * Mengabaikan `.env*.local`, `.env`, dan direktori `.vercel/` dari pelacakan git.
* [x] **Continuous Deployment Pipeline**:
  * Setiap commit ke branch `main` otomatis di-build dan di-deploy ke production secara zero-downtime.
* [x] **Konfigurasi Domain Kustom & SSL/TLS**:
  * Domain utama `https://imamdev.my.id` dan subdomain `https://www.imamdev.my.id` aktif dengan sertifikat enkripsi SSL/TLS resmi.
* [x] **Verifikasi Live Production (Sukses 100%)**:
  * `GET https://www.imamdev.my.id/`: Status 200 OK (Next.js App Router PRERENDER).
  * `GET https://www.imamdev.my.id/price-list`: Status 200 OK.
  * `GET https://www.imamdev.my.id/pricing`: Status 308 Permanent Redirect ke `/price-list`.
  * `GET https://www.imamdev.my.id/all-projects`: Status 200 OK.
  * `GET https://www.imamdev.my.id/all-blogs`: Status 200 OK.
  * `GET https://www.imamdev.my.id/admin`: Status 200 OK.
  * `GET https://www.imamdev.my.id/sitemap.xml`: Status 200 OK (Dynamic Supabase timestamps).
  * `GET https://www.imamdev.my.id/robots.txt`: Status 200 OK.
  * `GET https://www.imamdev.my.id/manifest.webmanifest`: Status 200 OK.
  * `GET https://www.imamdev.my.id/api/admin/stats`: Status 200 OK (`supabaseConnected: true`, 3 projects, 1 blog, 9 packages).

