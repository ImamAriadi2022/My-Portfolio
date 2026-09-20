'use client';

import { useState, useEffect } from 'react';
import MediaUploader from '../../../src/components/MediaUploader';

const INITIAL_BLOG_FORM = {
  id: null,
  title: '',
  category: 'Web',
  excerpt: '',
  content: '',
  date: '',
  readTime: '5 menit baca',
  image: '',
  coverImage: '',
  articleUrl: '',
  tags: '',
  featured: false,
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(INITIAL_BLOG_FORM);
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

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data || []);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Filter blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = categoryFilter === 'all' || b.category?.toLowerCase() === categoryFilter.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      b.title?.toLowerCase().includes(query) ||
      b.excerpt?.toLowerCase().includes(query) ||
      (Array.isArray(b.tags) && b.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesCat && matchesSearch;
  });

  // Unique categories list
  const uniqueCategories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));

  // Open Create Modal
  const openCreateModal = () => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setFormData({
      ...INITIAL_BLOG_FORM,
      date: today,
    });
    setIsEditing(false);
    setFormError('');
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (b) => {
    setFormData({
      id: b.id,
      title: b.title || '',
      category: b.category || 'Web',
      excerpt: b.excerpt || '',
      content: b.content || '',
      date: b.date || '',
      readTime: b.read_time || b.readTime || '5 menit baca',
      image: b.image || '',
      coverImage: b.cover_image || b.coverImage || b.image || '',
      articleUrl: b.article_url || b.articleUrl || '',
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
      featured: Boolean(b.featured),
    });
    setIsEditing(true);
    setFormError('');
    setModalOpen(true);
  };

  // Submit Save/Update
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      setFormError('Judul dan kategori artikel wajib diisi.');
      return;
    }

    setFormSaving(true);
    setFormError('');

    const payload = {
      ...formData,
      image: formData.image || formData.coverImage || '/assets/img/b4.png',
      coverImage: formData.coverImage || formData.image || '/assets/img/blog-covers/react-hooks.jpg',
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      const endpoint = '/api/admin/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan artikel.');

      showToast(isEditing ? 'Artikel blog berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!');
      setModalOpen(false);
      loadBlogs();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan artikel blog.');
    } finally {
      setFormSaving(false);
    }
  };

  // Delete Blog
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs?id=${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menghapus artikel.');

      showToast('Artikel blog berhasil dihapus.');
      setDeleteId(null);
      loadBlogs();
    } catch (err) {
      alert(err.message || 'Gagal menghapus artikel.');
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
            border: '1px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '10px',
            padding: '12px 20px',
            color: '#60a5fa',
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
            Manajemen Artikel & Blog
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
            Tulis tutorial baru, perbarui ringkasan materi, tautkan link artikel, atau unggah cover artikel.
          </p>
        </div>

        <button
          className="admin-btn-primary"
          style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderColor: '#2563eb' }}
          onClick={openCreateModal}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tulis Artikel Baru
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="admin-search-input"
            placeholder="Cari berdasarkan judul, cuplikan, atau tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blogs Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cover & Judul Artikel</th>
                <th>Kategori</th>
                <th>Tanggal & Waktu</th>
                <th>Status Unggulan</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    Memuat data artikel blog dari Supabase...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    Tidak ada artikel yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={b.image || b.cover_image || '/assets/img/b4.png'}
                          alt={b.title}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            backgroundColor: '#0a0b10',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                          onError={(e) => { e.target.src = '/assets/img/b4.png'; }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px', maxWidth: '340px' }}>
                            {b.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            ID #{b.id} {b.tags?.length ? `• ${b.tags.slice(0, 2).join(', ')}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="admin-badge admin-badge-blue">
                        {b.category}
                      </span>
                    </td>

                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>
                      <div>{b.date || 'Tanggal tidak diatur'}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{b.read_time || '5 menit baca'}</div>
                    </td>

                    <td>
                      {b.featured ? (
                        <span className="admin-badge admin-badge-green">★ Featured</span>
                      ) : (
                        <span className="admin-badge admin-badge-muted">Standar</span>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-action-group" style={{ justifyContent: 'flex-end' }}>
                        {b.article_url && (
                          <a
                            href={b.article_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-action-btn"
                            title="Buka Tautan Artikel Asli"
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
                          onClick={() => openEditModal(b)}
                          title="Edit Artikel"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        <button
                          className="admin-action-btn admin-action-btn-danger"
                          onClick={() => setDeleteId(b.id)}
                          title="Hapus Artikel"
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {isEditing ? `Edit Artikel #${formData.id}` : 'Tulis Artikel Blog Baru'}
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
                  <label className="admin-label">Judul Artikel *</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Contoh: Panduan Lengkap Memulai Next.js 14 App Router"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Kategori *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Web, Mobile, Backend, AI, Tutorial"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Estimasi Waktu Baca</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="5 menit baca"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>
                </div>

                {/* Media Uploader Integration */}
                <div className="admin-form-group">
                  <label className="admin-label">Gambar Cover Artikel</label>
                  <MediaUploader
                    label="Unggah Cover Blog (Vercel Blob / WebP / PNG / JPG)"
                    defaultUrl={formData.image || formData.coverImage}
                    onUploadSuccess={(url) => setFormData({ ...formData, image: url, coverImage: url })}
                  />
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Atau URL cover langsung (cth: /assets/img/b4.png)"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value, coverImage: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Cuplikan / Excerpt</label>
                  <textarea
                    className="admin-textarea"
                    rows="3"
                    placeholder="Ringkasan isi artikel dalam 1-2 kalimat..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Konten Lengkap (Markdown atau Teks)</label>
                  <textarea
                    className="admin-textarea"
                    rows="5"
                    placeholder="Konten atau rangkuman materi artikel..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Tanggal Terbit</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="15 Desember 2024"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Tautan Eksternal (Medium / Dev.to)</label>
                    <input
                      type="url"
                      className="admin-input"
                      placeholder="https://medium.com/@imam-ariadi/..."
                      value={formData.articleUrl}
                      onChange={(e) => setFormData({ ...formData, articleUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="React, Next.js, JavaScript, Tutorial"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginTop: '12px' }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Tampilkan sebagai Artikel Unggulan (Featured Post)</span>
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
                <button
                  type="submit"
                  className="admin-btn-primary"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderColor: '#2563eb' }}
                  disabled={formSaving}
                >
                  {formSaving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
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
                Hapus Artikel #{deleteId}
              </h3>
              <button className="admin-modal-close" onClick={() => setDeleteId(null)}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>
                Apakah Anda yakin ingin menghapus artikel blog ini? Tindakan ini tidak dapat dibatalkan.
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
