'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Sign In with Supabase Auth
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Silakan masukkan email dan kata sandi.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        localStorage.setItem('imam_admin_session', data.session.user.email);
        setSuccessMsg('Login berhasil! Mengalihkan ke dashboard...');
        setTimeout(() => {
          router.replace('/admin');
        }, 800);
      }
    } catch (err) {
      console.error('Supabase Login Error:', err);
      setErrorMsg(
        err.message === 'Invalid login credentials'
          ? 'Email atau kata sandi salah. Silakan coba lagi.'
          : err.message || 'Terjadi kesalahan saat login.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Sign up as new admin in Supabase
  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMsg('Masukkan email dan kata sandi untuk mendaftar.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        setSuccessMsg('Pendaftaran berhasil! Silakan cek email untuk konfirmasi atau login langsung.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mendaftarkan akun baru.');
    } finally {
      setLoading(false);
    }
  };

  // Instant direct access mode for local development/testing
  const handleDemoAccess = () => {
    localStorage.setItem('imam_admin_session', 'admin@imamariadi.com');
    setSuccessMsg('Masuk sebagai Admin...');
    setTimeout(() => {
      router.replace('/admin');
    }, 600);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">IA</div>
          <h2 className="admin-login-title">Admin CMS</h2>
          <p className="admin-login-sub">Masuk untuk mengelola portofolio, artikel blog, dan paket harga</p>
        </div>

        {errorMsg && (
          <div className="admin-alert admin-alert-danger">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="admin-alert admin-alert-success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-label">Email Admin</label>
            <input
              type="email"
              className="admin-input"
              placeholder="admin@imamariadi.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Kata Sandi</label>
            <input
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk (Sign In)'}
          </button>
        </form>

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <button
            type="button"
            className="admin-btn-secondary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '9px 12px' }}
            onClick={handleSignUp}
            disabled={loading}
          >
            Daftar Akun Baru
          </button>

          <button
            type="button"
            className="admin-btn-secondary"
            style={{
              flex: 1,
              justifyContent: 'center',
              fontSize: '12px',
              padding: '9px 12px',
              borderColor: 'rgba(40, 167, 69, 0.4)',
              color: '#34ce57',
            }}
            onClick={handleDemoAccess}
            title="Masuk langsung untuk demonstrasi dan pengujian"
          >
            Akses Langsung
          </button>
        </div>
      </div>
    </div>
  );
}
