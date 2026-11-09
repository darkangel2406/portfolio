import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  User,
  Lock,
  Download,
  Trash2,
  Crown,
  Check,
  AlertCircle,
  ShieldAlert,
  Loader,
  Palette,
  Sparkles
} from 'lucide-react';
import AdBanner from '../components/common/AdBanner';
import { 
  setGlobalBackground, 
  getGlobalBackground, 
  BG_CHANGE_EVENT 
} from '../components/common/AnimatedBackground';
import { BG_OPTIONS } from '../components/common/BackgroundSwitcher';

export default function Settings() {
  const { user, isPremium, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [activeBg, setActiveBg] = useState(() => getGlobalBackground());

  useEffect(() => {
    const handleBgChange = (e) => {
      if (e.detail?.style) {
        setActiveBg(e.detail.style);
      }
    };
    window.addEventListener(BG_CHANGE_EVENT, handleBgChange);
    return () => window.removeEventListener(BG_CHANGE_EVENT, handleBgChange);
  }, []);

  const handleSelectBg = (id) => {
    setActiveBg(id);
    setGlobalBackground(id);
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword

      !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    try {
      setLoadingPassword(true);
      await api.changePassword({ currentPassword, newPassword });
      setPasswordMsg('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleExportData = async () => {
    try {
      setExporting(true);
      const token = localStorage.getItem('folioview_token');
      const response = await fetch('/api/auth/export-data', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `folioview-export-${user?.id || 'data'}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert(`Export error: ${err.message}`);
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.prompt(
      'WARNING: This will permanently delete your account and all associated portfolios. Type "DELETE" to confirm:'
    );

    if (confirmation === 'DELETE') {
      try {
        await api.deleteAccount();
        logout();
        navigate('/');
      } catch (err) {
        alert(`Account deletion failed: ${err.message}`);
      }
    }
  };

  return (
    <div style={{ padding: '3.5rem 0 6rem', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '780px' }}>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Account Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          Manage your security preferences, premium license, and portfolio data.
        </p>

        {/* Dedicated Ad Section for Settings Page */}
        <AdBanner slot="settings-page" format="horizontal" style={{ margin: '0 auto 2rem' }} />

        {/* Profile & Entitlement Card */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', fontSize: '1.25rem', fontWeight: 700 }}>
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{user?.name || 'Account User'}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{user?.email}</p>
              </div>
            </div>
            <span className="badge badge-free">
              <Sparkles style={{ width: '13px', height: '13px' }} /> Full Access (100% Free Lifetime)
            </span>
          </div>
        </div>

        {/* Website Background Animation Selector */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Palette style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> Website Background Animation
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
              Active: {BG_OPTIONS.find(o => o.id === activeBg)?.name || 'Real Birds & Clouds'}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Customize the ambient 60 FPS interactive physics canvas that animates across the entire FolioVerse website.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {BG_OPTIONS.map((opt) => {
              const isSelected = opt.id === activeBg;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectBg(opt.id)}
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.25)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? '#38bdf8' : '#fff' }}>
                      {opt.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {opt.subtitle}
                    </div>
                  </div>
                  {isSelected && <Check style={{ width: '16px', height: '16px', color: '#38bdf8', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Change Password Card */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock style={{ width: '18px', height: '18px', color: '#818cf8' }} /> Change Password
          </h3>

          {passwordMsg && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.75rem 1rem', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.88rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check style={{ width: '16px', height: '16px' }} />
              <span>{passwordMsg}</span>
            </div>
          )}

          {passwordError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1rem', borderRadius: '8px', color: '#fca5a5', fontSize: '0.88rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle style={{ width: '16px', height: '16px' }} />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loadingPassword} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              {loadingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Data Portability (Export Data) */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> Export Your Data
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Download a complete JSON archive of your portfolios, drafts, and account history for backup or migration anytime.
          </p>
          <button onClick={handleExportData} disabled={exporting} className="btn btn-secondary">
            <Download style={{ width: '15px', height: '15px' }} />
            <span>{exporting ? 'Preparing Archive...' : 'Download Portfolio Backup (.json)'}</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert style={{ width: '18px', height: '18px' }} /> Danger Zone
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Permanently delete your account, saved drafts, published URLs, and license records. This action cannot be reversed.
          </p>
          <button onClick={handleDeleteAccount} className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#fca5a5' }}>
            <Trash2 style={{ width: '15px', height: '15px' }} />
            <span>Delete Account &amp; All Data</span>
          </button>
        </div>

      </div>
    </div>
  );
}
