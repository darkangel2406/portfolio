import React, { useState, useEffect } from 'react';
import { 
  setGlobalBackground, 
  getGlobalBackground, 
  BG_CHANGE_EVENT 
} from './AnimatedBackground';
import { Sparkles, Palette, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const BG_OPTIONS = [
  { id: 'birds', name: 'Real Birds & Clouds', icon: '🕊️', subtitle: 'Gentle Blue Sky & White Clouds' },
  { id: 'net', name: '3D Constellation Net', icon: '🕸️', subtitle: 'Interactive 3D Geometry' },
  { id: 'waves', name: 'Low-Poly Waves', icon: '🌊', subtitle: 'Interactive 3D Ocean' },
  { id: 'halo', name: 'Chromatic Halo', icon: '🔮', subtitle: 'Luminous Aurora Plasma' },
  { id: 'aurora', name: 'Deep Nebula', icon: '✨', subtitle: 'Cosmic Ambient Stardust' },
];

export default function BackgroundSwitcher() {
  const [activeBg, setActiveBg] = useState(() => getGlobalBackground());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleBgChange = (e) => {
      if (e.detail?.style) {
        setActiveBg(e.detail.style);
      }
    };
    window.addEventListener(BG_CHANGE_EVENT, handleBgChange);
    return () => window.removeEventListener(BG_CHANGE_EVENT, handleBgChange);
  }, []);

  const handleSelect = (id) => {
    setActiveBg(id);
    setGlobalBackground(id);
    setIsOpen(false);
  };

  const currentOption = BG_OPTIONS.find(o => o.id === activeBg) || BG_OPTIONS[0];

  return (
    <div 
      className="bg-switcher-container"
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 999,
        fontFamily: 'var(--font-sans)',
        maxWidth: 'calc(100vw - 32px)'
      }}
    >
      {/* Background Selector Menu Dropup */}
      {isOpen && (
        <div 
          className="glass-panel"
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '0',
            width: '260px',
            maxWidth: 'calc(100vw - 32px)',
            padding: '0.65rem',
            borderRadius: '16px',
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 20px rgba(99, 102, 241, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <div style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Background (5)
            </span>
            <span style={{ fontSize: '0.68rem', color: '#c084fc', fontWeight: 700 }}>Interactive</span>
          </div>

          {BG_OPTIONS.map((opt) => {
            const isSelected = opt.id === activeBg;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid transparent',
                  background: isSelected ? 'rgba(99, 102, 241, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{opt.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ 
                      fontSize: '0.84rem', 
                      fontWeight: 700, 
                      color: isSelected ? '#a5b4fc' : '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {opt.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.68rem', 
                      color: '#94a3b8',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {opt.subtitle}
                    </div>
                  </div>
                </div>
                {isSelected && <Check style={{ width: '14px', height: '14px', color: '#818cf8', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="interactive-hover-btn bg-switcher-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.42rem 0.8rem',
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(99, 102, 241, 0.45)',
          borderRadius: '9999px',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          fontSize: '0.82rem',
          fontWeight: 700
        }}
        title="Switch between 5 interactive background animations"
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{currentOption.icon}</span>
        <span className="bg-pill-text bg-pill-text-desktop" style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {currentOption.name.replace(' & Fog', '').replace('3D ', '')} BG
        </span>
        <span className="bg-pill-text-mobile" style={{ fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap', display: 'none' }}>
          BG
        </span>
        {isOpen ? (
          <ChevronDown style={{ width: '13px', height: '13px', opacity: 0.7 }} />
        ) : (
          <ChevronUp style={{ width: '13px', height: '13px', opacity: 0.7 }} />
        )}
      </button>
    </div>
  );
}
