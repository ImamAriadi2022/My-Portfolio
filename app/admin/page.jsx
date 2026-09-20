'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsRes, projectsRes, blogsRes] = await Promise.all([
          fetch('/api/admin/stats').then((r) => r.json()),
          fetch('/api/admin/projects').then((r) => r.json()),
          fetch('/api/admin/blogs').then((r) => r.json()),
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (projectsRes.success) setRecentProjects(projectsRes.data.slice(0, 5));
        if (blogsRes.success) setRecentBlogs(blogsRes.data.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px', color: '#ffffff' }}>
          Selamat Datang di Admin CMS
        </h2>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
          Kelola konten portofolio, artikel blog, dan paket layanan harga secara real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {/* Projects Card */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper admin-stat-icon-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats ? stats.projects.total : '...'}</span>
            <span className="admin-stat-label">Total Proyek Portofolio</span>
            <span className="admin-stat-sub">{stats ? `${stats.projects.featured} unggulan di beranda` : ''}</span>
          </div>
        </div>

        {/* Blogs Card */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper admin-stat-icon-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats ? stats.blogs.total : '...'}</span>
            <span className="admin-stat-label">Artikel Blog & Tutorial</span>
            <span className="admin-stat-sub" style={{ color: '#60a5fa' }}>{stats ? `${stats.blogs.featured} featured post` : ''}</span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper admin-stat-icon-amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats ? stats.pricing.total : '...'}</span>
            <span className="admin-stat-label">Paket Layanan Harga</span>
            <span className="admin-stat-sub" style={{ color: '#fbbf24' }}>{stats ? `${stats.pricing.popular} paket populer` : ''}</span>
          </div>
        </div>

        {/* Database Status Card */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper admin-stat-icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value" style={{ fontSize: '20px', color: '#34ce57' }}>
              {stats?.supabaseConnected ? 'Online' : 'Offline'}
            </span>
            <span className="admin-stat-label">Supabase PostgreSQL</span>
            <span className="admin-stat-sub" style={{ color: '#a78bfa' }}>Koneksi RLS Aktif</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="admin-card" style={{ padding: '18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Aksi Cepat:</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/admin/projects" className="admin-btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Kelola Proyek
            </Link>
            <Link href="/admin/blogs" className="admin-btn-primary" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderColor: '#2563eb' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Kelola Blog
            </Link>
            <Link href="/admin/pricing" className="admin-btn-primary" style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', borderColor: '#d97706' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Kelola Harga
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Projects & Recent Blogs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Recent Projects Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              Proyek Portofolio Terbaru
            </h3>
            <Link href="/admin/projects" style={{ fontSize: '12px', color: '#34ce57', textDecoration: 'none' }}>
              Lihat Semua →
            </Link>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Proyek</th>
                  <th>Kategori</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>
                      {loading ? 'Memuat proyek...' : 'Belum ada proyek di database.'}
                    </td>
                  </tr>
                ) : (
                  recentProjects.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.image}
                            alt={p.title}
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/assets/img/b1.jpg'; }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: '#ffffff' }}>{p.title}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID #{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge admin-badge-muted">{p.category}</span>
                      </td>
                      <td>
                        {p.featured ? (
                          <span className="admin-badge admin-badge-green">Unggulan</span>
                        ) : (
                          <span className="admin-badge admin-badge-muted">Standar</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Blogs Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Artikel Blog Terbaru
            </h3>
            <Link href="/admin/blogs" style={{ fontSize: '12px', color: '#60a5fa', textDecoration: 'none' }}>
              Lihat Semua →
            </Link>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Judul Artikel</th>
                  <th>Kategori</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>
                      {loading ? 'Memuat artikel...' : 'Belum ada artikel blog.'}
                    </td>
                  </tr>
                ) : (
                  recentBlogs.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={b.image || b.cover_image || '/assets/img/b4.png'}
                            alt={b.title}
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/assets/img/b4.png'; }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: '#ffffff', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {b.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID #{b.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge admin-badge-blue">{b.category}</span>
                      </td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>
                        {b.date || 'Baru'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
