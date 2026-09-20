'use client';

import { useState } from 'react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pengembangan Website',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Mohon lengkapi nama, email, dan pesan Anda.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal mengirim pesan.');

      setSuccessData(json);
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat mengirim pesan.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Pengembangan Website',
      message: '',
    });
    setSuccessData(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="contact-modal-overlay" onClick={handleReset}>
      <div className="contact-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="contact-modal-header">
          <div>
            <h3 className="contact-modal-title">
              <i className="fa fa-paper-plane" style={{ color: '#28a745' }}></i>
              Mulai Diskusi Proyek
            </h3>
            <p className="contact-modal-sub">
              Sampaikan ide, kebutuhan aplikasi, atau konsultasi teknis Anda.
            </p>
          </div>
          <button className="contact-modal-close" onClick={handleReset} aria-label="Tutup">
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="contact-modal-body">
          {successData ? (
            <div className="contact-success-box">
              <div className="contact-success-icon">
                <i className="fa fa-check"></i>
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>
                Pesan Berhasil Terkirim!
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px' }}>
                Terima kasih, <strong>{formData.name}</strong>. Pesan Anda telah tersimpan dan akan segera saya tanggapi melalui email atau WhatsApp.
              </p>

              {successData.whatsappUrl && (
                <div style={{ marginTop: '20px' }}>
                  <p style={{ color: '#cbd5e1', fontSize: '12px', marginBottom: '8px' }}>
                    Ingin respon lebih cepat? Langsung lanjutkan obrolan ke WhatsApp:
                  </p>
                  <a
                    href={successData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-wa-btn"
                  >
                    <i className="fa fa-whatsapp" style={{ fontSize: '18px' }}></i>
                    Lanjutkan Chat ke WhatsApp
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label className="contact-label">Nama Lengkap *</label>
                  <input
                    type="text"
                    className="contact-input"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-label">Email Aktif *</label>
                  <input
                    type="email"
                    className="contact-input"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label className="contact-label">Nomor WhatsApp / HP</label>
                  <input
                    type="tel"
                    className="contact-input"
                    placeholder="+62 8..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-label">Layanan yang Dibutuhkan</label>
                  <select
                    className="contact-select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Pengembangan Website">Pengembangan Website</option>
                    <option value="Aplikasi Mobile (Android/iOS)">Aplikasi Mobile (Android/iOS)</option>
                    <option value="Backend & REST API">Backend & REST API</option>
                    <option value="Bimbingan Skripsi / Belajar">Bimbingan Skripsi / Belajar</option>
                    <option value="Setup Server, VPS & Domain">Setup Server, VPS & Domain</option>
                    <option value="Sesi Konsultasi Teknis">Sesi Konsultasi Teknis</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-group">
                <label className="contact-label">Detail Kebutuhan atau Pertanyaan *</label>
                <textarea
                  className="contact-textarea"
                  placeholder="Ceritakan rencana proyek, estimasi timeline, atau kendala teknis yang ingin Anda selesaikan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#94a3b8',
                    padding: '11px 20px',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                  onClick={handleReset}
                  disabled={loading}
                >
                  Batal
                </button>
                <button type="submit" className="contact-btn-submit" disabled={loading}>
                  {loading ? (
                    'Mengirim Pesan...'
                  ) : (
                    <>
                      <i className="fa fa-send"></i> Kirim Pesan
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
