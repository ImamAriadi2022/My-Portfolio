# PHASE.md

# Imam Ariadi Portfolio CMS Development Roadmap

Version: 2.0

---

# Project Goal
Membangun platform personal website yang terdiri dari:
* Public Website
* Admin CMS
* REST API
* Dockerized Infrastructure
* Automated Deployment
* Production Ready Environment
Target deployment menggunakan:
* VPS
* Docker
* Docker Compose
* Existing MySQL Server
* GitHub Container Registry (GHCR)
* GitHub Actions

Database MySQL tidak dijalankan sebagai container baru. Project hanya menggunakan database baru (`portfolio_db`) pada MySQL Server yang sudah ada.

---

# Phase 0 — Architecture & Planning
## Objective
Menyusun seluruh fondasi arsitektur sebelum implementasi dimulai.

## Scope
* Finalisasi kebutuhan sistem
* Menentukan struktur monorepo
* Mendesain ERD Database
* Mendesain REST API
* Mendesain struktur folder
* Mendesain role dan permission
* Mendesain deployment architecture
* Mendesain Docker architecture

## Deliverables
* ERD
* API Contract (Swagger Draft)
* Folder Structure
* Docker Architecture
* Deployment Flow
* Phase Roadmap

## Exit Criteria

* Seluruh arsitektur disetujui.
* Tidak ada perubahan besar terhadap struktur project.

---

# Phase 1 — Project Foundation
## Objective
Membangun pondasi project agar seluruh tim atau AI Agent memiliki struktur kerja yang konsisten.

## Scope
### Frontend
* React
* Vite
* TypeScript
* React Router
* Axios
* React Query
* Zustand

### Backend
* NestJS
* Prisma
* Swagger
* Validation
* Logger

### Repository
* Monorepo
* Shared Packages
* Environment Configuration

### Docker
* Dockerfile Frontend
* Dockerfile Backend
* Dockerfile Nginx
* Docker Compose Development
* Docker Compose Production

### Documentation
* README
* agents.md
* Coding Convention

## Deliverables
Project dapat dijalankan secara lokal menggunakan Docker Compose.

## Exit Criteria
* Frontend berjalan.
* Backend berjalan.
* Docker Compose berhasil dijalankan.
* Repository siap dikembangkan.

---

# Phase 2 — Backend Core
## Objective
Membangun pondasi backend agar seluruh module CMS dapat menggunakan infrastruktur yang sama.

## Scope
### Core Infrastructure
* Config Module
* Logger
* Exception Filter
* Validation Pipe
* Response Wrapper
* Pagination Helper
* Slug Helper
* Date Helper
* Upload Helper
* Environment Validation

### Database
* Prisma
* Migration
* Seeder

### Initial Database
* User
* Role
* Refresh Token

### Security Infrastructure
* JWT Utility
* Cookie Utility
* Password Utility
* Permission Utility

### Documentation
* Swagger
* OpenAPI

### Monitoring
* Health Endpoint

```
GET /health
```

## Deliverables
Backend Framework siap digunakan untuk seluruh module.
## Exit Criteria
* Migration berhasil.
* Seeder berhasil.
* Swagger aktif.
* Health endpoint aktif.

---

# Phase 3 — Authentication
## Objective
Membangun sistem autentikasi untuk CMS.
## Scope
* Login
* Logout
* Refresh Token
* Current User
* RBAC
* Permission Guard

## Deliverables
Admin dapat login ke CMS.

## Exit Criteria

* JWT berjalan.
* Refresh Token berjalan.
* HttpOnly Cookie berjalan.
* Seeder Admin berhasil.

---

# Phase 4 — Media Management
## Objective
Membangun Media Library yang digunakan seluruh CMS.

## Scope
* Upload Image
* Upload PDF
* Upload Resume
* Replace File
* Delete File
* Media Metadata

## Deliverables
Media Library siap digunakan.

## Exit Criteria
* Upload berhasil.
* Delete berhasil.
* Replace berhasil.

---

# Phase 5 — Portfolio CMS

## Objective
Membangun CRUD Portfolio.

## Scope
* Category
* Technology
* Gallery
* Thumbnail
* Publish
* Draft
* Featured Project

## Deliverables
Portfolio dapat dikelola melalui CMS.

## Exit Criteria
Portfolio tampil otomatis pada Public Website.

---

# Phase 6 — Blog CMS
## Objective
Membangun Blog Management.

## Scope
* Rich Text Editor
* Category
* Tags
* SEO
* Slug
* Cover Image
* Publish
* Draft

## Deliverables
Blog dapat dikelola melalui CMS.

## Exit Criteria
Blog tampil otomatis pada Public Website.

---

# Phase 7 — Resume CMS
## Objective
Mengelola seluruh informasi pribadi.
## Scope
* About
* Experience
* Education
* Skill
* Service
* Certificate

## Deliverables
Semua informasi personal dapat diedit melalui CMS.

## Exit Criteria
Tidak ada data personal yang masih hardcode.

---

# Phase 8 — Website Settings

## Objective
Mengelola konfigurasi website.

## Scope
* Hero
* Navigation
* Footer
* Social Media
* Contact
* Resume
* SEO
* Analytics

## Deliverables
Website dapat dikonfigurasi tanpa mengubah source code.

## Exit Criteria
Seluruh konfigurasi berasal dari database.

---

# Phase 9 — Dashboard
## Objective
Membangun dashboard administrator.

## Scope
* Statistics
* Recent Portfolio
* Recent Blog
* Storage Usage
* Quick Actions

## Deliverables
Dashboard Administrator selesai.

## Exit Criteria
Dashboard menampilkan seluruh ringkasan website.

---

# Phase 10 — Public API
## Objective
Menghubungkan frontend dengan backend.
## Scope
* Portfolio API
* Blog API
* Resume API
* Settings API
* Statistics API

## Deliverables
Frontend menggunakan REST API sepenuhnya.

## Exit Criteria
Folder `src/data` sudah tidak digunakan lagi.

---

# Phase 11 — Frontend Integration
## Objective
Mengintegrasikan seluruh CMS dengan website publik.

## Scope
* API Integration
* Loading State
* Error Handling
* Empty State
* Image Optimization

## Deliverables
Website menjadi dynamic website.

## Exit Criteria
Semua data berasal dari backend.

---

# Phase 12 — Production Docker
## Objective
Membangun environment production.

## Scope
Container yang dibangun:
* portfolio-frontend
* portfolio-backend
* portfolio-nginx
Menggunakan Existing MySQL Server.
Tidak membuat container MySQL baru.

## Deliverables
Docker Production siap.

## Exit Criteria
Docker Compose Production berjalan tanpa error.

---

# Phase 13 — CI/CD
## Objective
Mengotomatisasi proses build dan deployment.

## Scope
GitHub Actions:
* Lint
* Test
* Build Frontend
* Build Backend
* Build Docker Images
* Push GHCR
* Deploy VPS
* Prisma Migration
* Health Check

## Deliverables
Deployment otomatis melalui GitHub Actions.

## Exit Criteria
Push ke branch `main` menghasilkan deployment otomatis.

---

# Phase 14 — VPS Deployment
## Objective
Menjalankan sistem pada server production.
## Scope
* Docker Compose
* Existing MySQL Server
* Existing Reverse Proxy
* SSL
* Domain
* Environment Variables
* Migration
* Seeder

Database yang dibuat:

```
portfolio_db
```

User Database:

```
portfolio_user
```

## Deliverables
Website dapat diakses secara online.

## Exit Criteria
* HTTPS aktif.
* Frontend aktif.
* Backend aktif.
* Database terhubung.
* Upload berjalan.
* Admin dapat login.

---

# Phase 15 — Production Ready
## Objective
Memastikan sistem siap digunakan dalam jangka panjang.

## Scope
* Security Review
* Backup Strategy
* Health Monitoring
* Log Rotation
* Image Cleanup
* Performance Review

## Deliverables
Production Ready Release.

## Exit Criteria
* Auto Deploy aktif.
* Backup aktif.
* Monitoring aktif.
* Logging aktif.
* Semua module CMS stabil.
* Dokumentasi deployment lengkap.
