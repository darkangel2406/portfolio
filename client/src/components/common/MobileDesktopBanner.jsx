import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, X, ExternalLink, Sparkles } from 'lucide-react';

export default function MobileDesktopBanner() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth <= 850;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isDismissedStored = sessionStorage.getItem('folioview_mobile_desktop_dismissed') === 'true';

      setIsMobile(isMobileWidth || isMobileUA);
      setIsDismissed(isDismissedStored);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('folioview_mobile_desktop_dismissed', 'true');
    } catch (e) {
      // Storage access safety
    }
  };

  if (!isMobile || isDismissed) {
    return null;
  }

  return (
    <aside 
      aria-label="Desktop site recommendation"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderBottom: '1px solid rgba(129, 140, 248, 0.45)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.65)',
        padding: '0.65rem 1rem',
        color: '#f8fafc',
        fontFamily: 'var(--font-sans)',
        animation: 'fadeInDown 0.25s ease-out'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.85rem'
      }}>
        {/* Left: Icon & Alert Message */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', flex: 1 }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.35)',
            border: '1px solid rgba(165, 180, 252, 0.4)',
            borderRadius: '8px',
            padding: '0.35rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '0.1rem'
          }}>
            <Monitor style={{ width: '18px', height: '18px', color: '#38bdf8' }} />
          </div>

          <div style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
            <div style={{ fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span>⚠️ Switch to Desktop Site for Friendly Experience</span>
              <span style={{ 
                background: 'rgba(56, 189, 248, 0.2)', 
                color: '#38bdf8', 
                fontSize: '0.68rem', 
                padding: '0.1rem 0.4rem', 
                borderRadius: '4px', 
                border: '1px solid rgba(56, 189, 248, 0.3)' 
              }}>
                Friendly Mode
              </span>
            </div>
            <p style={{ margin: '0.2rem 0 0', color: '#c7d2fe', fontSize: '0.78rem' }}>
              To use this website friendly with optimal 3D interactive controls and creation studios, please enable <strong>"Desktop site"</strong> in your mobile browser menu (tap <strong>⋮</strong> or <strong>Share</strong> &gt; <strong>Desktop site</strong>) or open on a computer.
            </p>
          </div>
        </div>

        {/* Right: Dismiss button */}
        <button
          onClick={handleDismiss}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            color: '#e2e8f0',
            cursor: 'pointer',
            padding: '0.35rem 0.55rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.74rem',
            fontWeight: 700,
            flexShrink: 0
          }}
          title="Dismiss notification"
          aria-label="Dismiss alert"
        >
          <span>Got it</span>
          <X style={{ width: '14px', height: '14px' }} />
        </button>
      </div>
    </aside>
  );
}

