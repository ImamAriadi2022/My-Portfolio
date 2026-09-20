'use client';

import { useState, useEffect } from 'react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tablePending, setTablePending] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal State
  const [selectedLead, setSelectedLead] = useState(null);

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const json = await res.json();
      if (json.success) {
        setLeads(json.data || []);
        if (json.tablePending) setTablePending(true);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Status pesan berhasil diubah ke: ${newStatus}`);
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        loadLeads();
      }
    } catch (err) {
      alert('Gagal memperbarui status: ' + err.message);
    }
  };

  // Delete Lead
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads?id=${deleteId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        showToast('Pesan berhasil dihapus.');
        setDeleteId(null);
        if (selectedLead && selectedLead.id === deleteId) {
          setSelectedLead(null);
        }
        loadLeads();
      }
    } catch (err) {
      alert('Gagal menghapus pesan: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      l.name?.toLowerCase().includes(query) ||
      l.email?.toLowerCase().includes(query) ||
      l.subject?.toLowerCase().includes(query) ||
      l.message?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unread':
        return <span className="admin-badge admin-badge-amber">● Belum Dibaca</span>;
      case 'read':
        return <span className="admin-badge admin-badge-blue">✓ Sudah Dibaca</span>;
      case 'replied':
        return <span className="admin-badge admin-badge-green">✔ Sudah Dibalas</span>;
      default:
        return <span className="admin-badge admin-badge-muted">{status}</span>;
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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px', color: '#ffffff' }}>
            Pesan Masuk & Calon Klien (Leads)
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
            Kelola pesan pertanyaan, tawaran kerja sama, dan permintaan konsultasi dari website.
          </p>
        </div>

        <button className="admin-btn-secondary" onClick={loadLeads} title="Muat ulang pesan">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Segarkan Data
        </button>
      </div>

      {/* Table Pending Notice (if extend2.sql hasn't been executed yet) */}
      {tablePending && (
        <div className="admin-card" style={{ borderColor: 'rgba(59, 130, 246, 0.3)', background: 'rgba(59, 130, 246, 0.05)' }}>
          <h4 style={{ color: '#60a5fa', margin: '0 0 6px', fontSize: '15px' }}>
            Tabel Leads Belum Dibuat di Supabase
          </h4>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
            Untuk mulai menyimpan pesan kontak ke database PostgreSQL, silakan jalankan skrip delta <code>supabase/extend2.sql</code> di Supabase SQL Editor Anda.
          </p>
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
            placeholder="Cari pengirim, email, subjek, atau isi pesan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="unread">Belum Dibaca</option>
          <option value="read">Sudah Dibaca</option>
          <option value="replied">Sudah Dibalas</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pengirim</th>
                <th>Subjek & Pesan</th>
                <th>Nomor Kontak</th>
                <th>Waktu Masuk</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    Memuat data pesan masuk...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                    {search ? 'Tidak ada pesan yang cocok dengan kata kunci.' : 'Kotak masuk masih kosong.'}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
                  <tr key={l.id} style={{ background: l.status === 'unread' ? 'rgba(245, 158, 11, 0.03)' : undefined }}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px' }}>
                          {l.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                          <a href={`mailto:${l.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {l.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ maxWidth: '320px' }}>
                        <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '13px' }}>
                          {l.subject || 'Konsultasi'}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#94a3b8',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {l.message}
                        </div>
                      </div>
                    </td>

                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>
                      {l.phone ? (
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#34ce57', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <i className="fa fa-whatsapp"></i> {l.phone}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>
                      {l.created_at
                        ? new Date(l.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </td>

                    <td>{getStatusBadge(l.status)}</td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-action-group" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="admin-action-btn"
                          onClick={() => {
                            setSelectedLead(l);
                            if (l.status === 'unread') {
                              handleUpdateStatus(l.id, 'read');
                            }
                          }}
                          title="Buka Isi Pesan"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>

                        <button
                          className="admin-action-btn admin-action-btn-danger"
                          onClick={() => setDeleteId(l.id)}
                          title="Hapus Pesan"
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

      {/* Message Detail Modal */}
      {selectedLead && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Detail Pesan Masuk</h3>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                  ID #{selectedLead.id} • Diterima pada{' '}
                  {selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleString('id-ID') : '-'}
                </div>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedLead(null)}>
                ✕
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                <div style={{ background: '#0a0b10', padding: '12px 16px', borderRadius: '8px', border: '1px solid #232734' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Nama Pengirim</div>
                  <div style={{ fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>{selectedLead.name}</div>
                </div>

                <div style={{ background: '#0a0b10', padding: '12px 16px', borderRadius: '8px', border: '1px solid #232734' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Email</div>
                  <div style={{ fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>{selectedLead.email}</div>
                </div>
              </div>

              {selectedLead.phone && (
                <div style={{ background: '#0a0b10', padding: '12px 16px', borderRadius: '8px', border: '1px solid #232734', marginBottom: '18px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Nomor Telepon / WhatsApp</div>
                  <div style={{ fontWeight: 600, color: '#34ce57', marginTop: '2px' }}>{selectedLead.phone}</div>
                </div>
              )}

              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Subjek Permintaan
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>
                  {selectedLead.subject || 'Konsultasi Umum'}
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Isi Pesan
                </div>
                <div
                  style={{
                    background: '#0a0b10',
                    border: '1px solid #232734',
                    borderRadius: '10px',
                    padding: '16px',
                    color: '#e2e8f0',
                    fontSize: '13px',
                    lineHeight: '1.7',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {selectedLead.message}
                </div>
              </div>

              {/* Status Update Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Ubah Status:</span>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                  onClick={() => handleUpdateStatus(selectedLead.id, 'read')}
                >
                  Tandai Dibaca
                </button>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  style={{ fontSize: '11px', padding: '6px 12px', borderColor: 'rgba(40,167,69,0.3)', color: '#34ce57' }}
                  onClick={() => handleUpdateStatus(selectedLead.id, 'replied')}
                >
                  Tandai Sudah Dibalas
                </button>
              </div>
            </div>

            <div className="admin-modal-footer">
              <a
                href={`mailto:${selectedLead.email}?subject=Re: ${encodeURIComponent(selectedLead.subject || 'Konsultasi Portfolio')}&body=Halo ${encodeURIComponent(selectedLead.name)},\n\nTerima kasih atas pesan Anda.\n\n`}
                className="admin-btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Balas Email
              </a>

              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${selectedLead.name}, saya Imam Ariadi menindaklanjuti pesan Anda terkait "${selectedLead.subject || 'proyek'}"...`)}`}
                  className="admin-btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleUpdateStatus(selectedLead.id, 'replied')}
                >
                  <i className="fa fa-whatsapp" style={{ fontSize: '14px' }}></i>
                  Balas via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '440px' }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title" style={{ color: '#f87171' }}>
                Hapus Pesan #{deleteId}
              </h3>
              <button className="admin-modal-close" onClick={() => setDeleteId(null)}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px' }}>
                Apakah Anda yakin ingin menghapus pesan ini dari database?
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
