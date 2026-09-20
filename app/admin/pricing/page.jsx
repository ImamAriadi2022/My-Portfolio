'use client';

import { useState, useEffect } from 'react';
import pricingJson from '../../../src/data/pricingData.json';

const PRICING_CATEGORIES = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'web-development', label: 'Pengembangan Web' },
  { value: 'learning', label: 'Bimbingan Belajar' },
  { value: 'it-support', label: 'Support IT' },
  { value: 'consultation', label: 'Konsultasi Berbayar' },
];

const INITIAL_PACKAGE_FORM = {
  id: '',
  category: 'web-development',
  name: '',
  badge: '',
  is_popular: false,
  price: '',
  price_period: 'mulai dari / proyek',
  description: '',
  timeline: '',
  features: '',
  technologies: '',
  whatsapp_message: '',
  sort_order: 1,
};

export default function AdminPricingPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(INITIAL_PACKAGE_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Import State
  const [importing, setImporting] = useState(false);

  // Toast
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pricing');
      const json = await res.json();
      if (json.success) {
        setPackages(json.data || []);
      }
    } catch (err) {
      console.error('Failed to load packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  // Filter packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesCat = categoryFilter === 'all' || pkg.category === categoryFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      pkg.name?.toLowerCase().includes(query) ||
      pkg.description?.toLowerCase().includes(query) ||
      (Array.isArray(pkg.technologies) && pkg.technologies.some((t) => t.toLowerCase().includes(query)));
    return matchesCat && matchesSearch;
  });

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      ...INITIAL_PACKAGE_FORM,
      sort_order: packages.length + 1,
    });
    setIsEditing(false);
    setFormError('');
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (pkg) => {
    setFormData({
      id: pkg.id,
      category: pkg.category || 'web-development',
      name: pkg.name || '',
      badge: pkg.badge || '',
      is_popular: Boolean(pkg.is_popular),
      price: pkg.price || '',
      price_period: pkg.price_period || 'mulai dari / proyek',
      description: pkg.description || '',
      timeline: pkg.timeline || '',
      features: Array.isArray(pkg.features) ? pkg.features.join('\n') : '',
      technologies: Array.isArray(pkg.technologies) ? pkg.technologies.join(', ') : '',
      whatsapp_message: pkg.whatsapp_message || '',
      sort_order: pkg.sort_order ?? 1,
    });
    setIsEditing(true);
    setFormError('');
    setModalOpen(true);
  };

  // Submit Save/Update
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      setFormError('Nama paket, kategori, dan harga wajib diisi.');
      return;
    }

    setFormSaving(true);
    setFormError('');

    const payload = {
      ...formData,
      features: formData.features
        ? formData.features.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
      technologies: formData.technologies
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      const endpoint = '/api/admin/pricing';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyimpan paket harga.');

      showToast(isEditing ? 'Paket harga berhasil diperbarui!' : 'Paket harga baru berhasil ditambahkan!');
      setModalOpen(false);
      loadPackages();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan paket harga.');
    } finally {
      setFormSaving(false);
    }
  };

  // Delete Package
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pricing?id=${encodeURIComponent(deleteId)}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menghapus paket harga.');

      showToast('Paket harga berhasil dihapus.');
      setDeleteId(null);
      loadPackages();
    } catch (err) {
      alert(err.message || 'Gagal menghapus paket harga.');
    } finally {
      setDeleting(false);
    }
  };

  // Import Default Packages from JSON into Supabase
  const handleImportDefaults = async () => {
    const confirmImport = window.confirm(
      'Apakah Anda ingin mengimpor 9 paket layanan bawaan (default) langsung ke database Supabase?'
    );
    if (!confirmImport) return;

    setImporting(true);
    try {
      const defaultPackages = pricingJson.packages || [];
      let successCount = 0;

      for (const p of defaultPackages) {
        const payload = {
          id: p.id,
          category: p.category,
          name: p.name,
          badge: p.badge || null,
          is_popular: Boolean(p.isPopular),
          price: p.price,
          price_period: p.pricePeriod || 'mulai dari / proyek',
          description: p.description,
          timeline: p.timeline,
          features: p.features || [],
          technologies: p.technologies || [],
          whatsapp_message: p.whatsappMessage || `Halo Mas Imam, saya tertarik dengan paket ${p.name}.`,
          sort_order: defaultPackages.indexOf(p) + 1,
        };

        const res = await fetch('/api/admin/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const resJson = await res.json();
        if (resJson.success) successCount++;
      }

      showToast(`Berhasil mengimpor ${successCount} paket ke database Supabase!`);
      loadPackages();
    } catch (err) {
      alert('Gagal mengimpor paket bawaan: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            background: '#12141c',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '10px',
            padding: '12px 20px',
            color: '#fbbf24',
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
            Manajemen Paket Layanan & Harga
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
            Kelola paket harga web development, bimbingan belajar, IT support, dan sesi konsultasi.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {packages.length === 0 && !loading && (
            <button
              className="admin-btn-secondary"
              onClick={handleImportDefaults}
              disabled={importing}
              style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {importing ? 'Mengimpor...' : '📥 Impor 9 Paket Bawaan ke Supabase'}
            </button>
          )}

          <button
            className="admin-btn-primary"
            style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', borderColor: '#d97706' }}
            onClick={openCreateModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Paket Baru
          </button>
        </div>
      </div>

      {/* If table is empty */}
      {packages.length === 0 && !loading && (
        <div className="admin-card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h4 style={{ color: '#fbbf24', margin: '0 0 6px', fontSize: '15px' }}>
                Tabel Paket Harga di Supabase Masih Kosong
              </h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
                Halaman publik saat ini menggunakan data cadangan statis. Klik tombol di sebelah kanan untuk menyinkronkan 9 paket bawaan langsung ke Supabase PostgreSQL Anda.
              </p>
            </div>
            <button
              className="admin-btn-primary"
              style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', borderColor: '#d97706' }}
              onClick={handleImportDefaults}
              disabled={importing}
            >
              {importing ? 'Mengimpor...' : '📥 Impor Sekarang'}
            </button>
          </div>
        </div>
      )}

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
            placeholder="Cari berdasarkan nama paket atau teknologi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {PRICING_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Pricing Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Paket & Slug</th>
                <th>Kategori</th>
                <th>Harga & Periode</th>
                <th>Timeline</th>
                <th>Badge / Status</th>
                <th>Urutan</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    Memuat paket harga dari Supabase...
                  </td>
                </tr>
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    Belum ada data paket harga. Silakan klik tombol "Impor 9 Paket Bawaan" di atas.
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px' }}>
                          {pkg.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          Slug: <code>{pkg.id}</code>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="admin-badge admin-badge-muted">
                        {pkg.category}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, color: '#34ce57' }}>{pkg.price}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{pkg.price_period}</div>
                    </td>

                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>
                      {pkg.timeline || '-'}
                    </td>

                    <td>
                      {pkg.is_popular ? (
                        <span className="admin-badge admin-badge-amber">★ Populer</span>
                      ) : pkg.badge ? (
                        <span className="admin-badge admin-badge-blue">{pkg.badge}</span>
                      ) : (
                        <span className="admin-badge admin-badge-muted">Standar</span>
                      )}
                    </td>

                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>
                      #{pkg.sort_order ?? 0}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-action-group" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="admin-action-btn"
                          onClick={() => openEditModal(pkg)}
                          title="Edit Paket"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        <button
                          className="admin-action-btn admin-action-btn-danger"
                          onClick={() => setDeleteId(pkg.id)}
                          title="Hapus Paket"
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
                {isEditing ? `Edit Paket: ${formData.name}` : 'Tambah Paket Harga Baru'}
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

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Nama Paket *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Contoh: Web Application"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Slug ID (Opsional jika baru)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="web-application"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      disabled={isEditing}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Kategori Layanan *</label>
                    <select
                      className="admin-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="web-development">Pengembangan Web</option>
                      <option value="learning">Bimbingan Belajar</option>
                      <option value="it-support">Support IT</option>
                      <option value="consultation">Konsultasi Berbayar</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Badge Promosi (Opsional)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Paling Populer, Pilihan Pemula, dll."
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Harga Layanan *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Rp 3.500.000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Periode / Satuan Harga</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="mulai dari / proyek atau / sesi (90 menit)"
                      value={formData.price_period}
                      onChange={(e) => setFormData({ ...formData, price_period: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Estimasi Timeline Pengerjaan</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="2 - 4 Minggu atau 3 - 7 Hari Kerja"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Urutan Tampilan (Sort Order)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Deskripsi Paket</label>
                  <textarea
                    className="admin-textarea"
                    rows="2"
                    placeholder="Uraian manfaat dan cakupan paket layanan..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Daftar Fitur / Cakupan (Satu baris per fitur)</label>
                  <textarea
                    className="admin-textarea"
                    rows="4"
                    placeholder="Frontend interaktif berbasis React&#10;Backend API Node.js&#10;Database PostgreSQL / MySQL&#10;Garansi bug 30 hari"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Teknologi Terkait (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="React, Node.js, Next.js, PostgreSQL"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Pesan WhatsApp Otomatis (Saat tombol di-klik)</label>
                  <textarea
                    className="admin-textarea"
                    rows="2"
                    placeholder="Halo Mas Imam, saya tertarik dengan paket ini..."
                    value={formData.whatsapp_message}
                    onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginTop: '12px' }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                    />
                    <span>Tandai sebagai Paket Paling Populer (Highlighted)</span>
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
                  style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', borderColor: '#d97706' }}
                  disabled={formSaving}
                >
                  {formSaving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Paket'}
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
                Hapus Paket: {deleteId}
              </h3>
              <button className="admin-modal-close" onClick={() => setDeleteId(null)}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>
                Apakah Anda yakin ingin menghapus paket layanan ini? Tindakan ini tidak dapat dibatalkan.
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
