'use client';

import { useState, useEffect } from 'react';
import MediaUploader from '../../../src/components/MediaUploader';

const CATEGORIES = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'frontend-web', label: 'Frontend Web' },
  { value: 'frontend-mobile', label: 'Frontend Mobile' },
  { value: 'backend', label: 'Backend' },
  { value: 'ai', label: 'AI & Machine Learning' },
];

const INITIAL_FORM = {
  id: null,
  title: '',
  category: 'frontend-web',
  type: 'project',
  description: '',
  goal: '',
  architecture: '',
  technologies: '',
  features: '',
  image: '',
  demoUrl: '',
  githubUrl: '',
  featured: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const json = await res.json();
      if (json.success) {
        setProjects(json.data || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      (Array.isArray(p.technologies) && p.technologies.some((t) => t.toLowerCase().includes(query)));
    return matchesCat && matchesSearch;
  });

  // Open Create Modal
  const openCreateModal = () => {
    setFormData(INITIAL_FORM);
    setIsEditing(false);
    setFormError('');
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (p) => {
    setFormData({
      id: p.id,
      title: p.title || '',
      category: p.category || 'frontend-web',
      type: p.type || 'project',
      description: p.description || '',
      goal: p.goal || '',
      architecture: p.architecture || '',
      technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : '',
      features: Array.isArray(p.features) ? p.features.join('\n') : '',
      image: p.image || '',
      demoUrl: p.demo_url || p.demoUrl || '',
      githubUrl: p.github_url || p.githubUrl || '',
      featured: Boolean(p.featured),
    });
    setIsEditing(true);
    setFormError('');
    setModalOpen(true);
  };

  // Submit Save/Update
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.image) {
      setFormError('Judul, kategori, dan gambar cover wajib diisi.');
      return;
    }

    setFormSaving(true);
    setFormError('');

    const payload = {
      ...formData,
      technologies: formData.technologies
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      features: formData.features
        ? formData.features.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
    };

    try {
      const endpoint = '/api/admin/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan data.');

      showToast(isEditing ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!');
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan proyek.');
    } finally {
      setFormSaving(false);
    }
  };

  // Delete Project
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects?id=${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menghapus proyek.');

      showToast('Proyek berhasil dihapus.');
      setDeleteId(null);
      loadProjects();
    } catch (err) {
      alert(err.message || 'Gagal menghapus proyek.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#12141c',
            border: '1px solid rgba(40, 167, 69, 0.4)',
            borderRadius: '10px',
            padding: '12px 20px',
            color: '#34ce57',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{toast}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px', color: '#ffffff' }}>
            Manajemen Portofolio Proyek
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
            Tambah, edit, unggah tangkapan layar, atau hapus karya proyek portofolio.
          </p>
        </div>

        <button className="admin-btn-primary" onClick={openCreateModal}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Proyek Baru
        </button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="admin-search-input"
            placeholder="Cari berdasarkan judul atau teknologi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cover & Proyek</th>
                <th>Kategori</th>
                <th>Teknologi</th>
                <th>Status Unggulan</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    Memuat data proyek dari Supabase...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    Tidak ada proyek yang cocok dengan pencarian / filter.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            backgroundColor: '#0a0b10',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                          onError={(e) => { e.target.src = '/assets/img/b1.jpg'; }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px' }}>
                            {p.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            ID #{p.id} • {p.type === 'demo' ? 'Live Demo' : 'Proyek'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="admin-badge admin-badge-muted">
                        {p.category}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '220px' }}>
                        {Array.isArray(p.technologies) && p.technologies.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="admin-tag-chip" style={{ fontSize: '10px' }}>
                            {t}
                          </span>
                        ))}
                        {Array.isArray(p.technologies) && p.technologies.length > 3 && (
                          <span style={{ fontSize: '10px', color: '#64748b' }}>
                            +{p.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      {p.featured ? (
                        <span className="admin-badge admin-badge-green">★ Unggulan</span>
                      ) : (
                        <span className="admin-badge admin-badge-muted">Standar</span>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-action-group" style={{ justifyContent: 'flex-end' }}>
                        {p.demo_url && (
                          <a
                            href={p.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-action-btn"
                            title="Buka Demo"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        )}

                        <button
                          className="admin-action-btn"
                          onClick={() => openEditModal(p)}
                          title="Edit Proyek"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        <button
                          className="admin-action-btn admin-action-btn-danger"
                          onClick={() => setDeleteId(p.id)}
                          title="Hapus Proyek"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form (Create / Edit) */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {isEditing ? `Edit Proyek #${formData.id}` : 'Tambah Proyek Baru'}
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => setModalOpen(false)}
                disabled={formSaving}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {formError && (
                  <div className="admin-alert admin-alert-danger">
                    <span>{formError}</span>
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-label">Judul Proyek *</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Contoh: TeraLab E-Learning Platform"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Kategori *</label>
                    <select
                      className="admin-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="frontend-web">Frontend Web</option>
                      <option value="frontend-mobile">Frontend Mobile</option>
                      <option value="backend">Backend</option>
                      <option value="ai">AI & Machine Learning</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Tipe Portofolio</label>
                    <select
                      className="admin-select"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="project">Project (Karya Nyata)</option>
                      <option value="demo">Live Demo</option>
                    </select>
                  </div>
                </div>

                {/* Media Uploader Integration */}
                <div className="admin-form-group">
                  <label className="admin-label">Cover Gambar Proyek *</label>
                  <MediaUploader
                    label="Unggah Gambar Cover Proyek (Vercel Blob / WebP / PNG / JPG)"
                    defaultUrl={formData.image}
                    onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                  />
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Atau masukkan URL / path gambar langsung (cth: /img/teralab.png)"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Deskripsi Singkat</label>
                  <textarea
                    className="admin-textarea"
                    rows="3"
                    placeholder="Deskripsi ringkas proyek..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Tujuan / Goal Proyek</label>
                    <textarea
                      className="admin-textarea"
                      rows="2"
                      placeholder="Tujuan pembuatan proyek..."
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Arsitektur Sistem</label>
                    <textarea
                      className="admin-textarea"
                      rows="2"
                      placeholder="Arsitektur atau alur teknis..."
                      value={formData.architecture}
                      onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Teknologi (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Contoh: React, Next.js, Tailwind CSS, Supabase"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Fitur-Fitur Utama (Satu baris per fitur)</label>
                  <textarea
                    className="admin-textarea"
                    rows="3"
                    placeholder="Desain responsif&#10;Autentikasi akun&#10;Dashboard interaktif"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">URL Demo / Live Site</label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://example.com"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">URL GitHub Repository</label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://github.com/..."
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '12px' }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Tampilkan sebagai Proyek Unggulan di Beranda (Featured)</span>
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setModalOpen(false)}
                  disabled={formSaving}
                >
                  Batal
                </button>
                <button type="submit" className="admin-btn-primary" disabled={formSaving}>
                  {formSaving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '440px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title" style={{ color: '#f87171' }}>
                Hapus Proyek #{deleteId}
              </h3>
              <button className="admin-modal-close" onClick={() => setDeleteId(null)}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>
                Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setDeleteId(null)}
                disabled={deleting}
              >
                Batal
              </button>
              <button
                type="button"
                className="admin-btn-primary"
                style={{ background: '#dc2626', borderColor: '#dc2626' }}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
