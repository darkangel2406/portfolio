import React from 'react';
import { Shield, Sparkles, Terminal, Palette, GraduationCap, Briefcase, Award, CheckCircle } from 'lucide-react';

export default function CategoryCornerStructures({ category = 'developer', accentColor = '#6366f1' }) {
  // 1. DEVELOPER / CYBERSECURITY: Glowing Cyber HUD Corner Brackets
  if (category === 'developer' || category === 'cybersecurity') {
    return (
      <div className="category-corners-hud" style={{ pointerEvents: 'none' }}>
        {/* Top Left Bracket */}
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: accentColor,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(5, 7, 14, 0.85)',
          padding: '0.2rem 0.6rem',
          borderLeft: `2px solid ${accentColor}`,
          borderTop: `2px solid ${accentColor}`,
          borderRadius: '4px 0 0 0',
          backdropFilter: 'blur(8px)'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}`, animation: 'pulse 1.5s infinite' }} />
          <span>┌ [SYS_DEV_ONLINE]</span>
        </div>

        {/* Top Right Bracket */}
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: accentColor,
          background: 'rgba(5, 7, 14, 0.85)',
          padding: '0.2rem 0.6rem',
          borderRight: `2px solid ${accentColor}`,
          borderTop: `2px solid ${accentColor}`,
          borderRadius: '0 4px 0 0',
          backdropFilter: 'blur(8px)'
        }}>
          <span>[PORT: 443 // TLS] ┐</span>
        </div>

        {/* Bottom Left Bracket */}
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#64748b',
          background: 'rgba(5, 7, 14, 0.85)',
          padding: '0.2rem 0.6rem',
          borderLeft: `2px solid ${accentColor}80`,
          borderBottom: `2px solid ${accentColor}80`,
          borderRadius: '0 0 0 4px',
          backdropFilter: 'blur(8px)'
        }}>
          <span>└ [KERNEL: 6.8-LTS]</span>
        </div>

        {/* Bottom Right Bracket */}
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#64748b',
          background: 'rgba(5, 7, 14, 0.85)',
          padding: '0.2rem 0.6rem',
          borderRight: `2px solid ${accentColor}80`,
          borderBottom: `2px solid ${accentColor}80`,
          borderRadius: '0 0 4px 0',
          backdropFilter: 'blur(8px)'
        }}>
          <span>[PING: 14ms // ACTIVE] ┘</span>
        </div>
      </div>
    );
  }

  // 2. CREATIVE / ARTS / PHOTOGRAPHY: Luxury Gold Filigree & Serif Roman Numerals
  if (category === 'creative') {
    return (
      <div className="category-corners-creative" style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'fixed',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 40,
          fontFamily: 'var(--font-serif)',
          fontSize: '0.8rem',
          color: '#d4af37',
          letterSpacing: '0.15em',
          borderTop: '1px solid #d4af37',
          borderLeft: '1px solid #d4af37',
          padding: '0.35rem 0.75rem',
          background: 'rgba(10, 10, 12, 0.85)',
          backdropFilter: 'blur(8px)'
        }}>
          ⚜ CURATED ATELIER • MMXXVI
        </div>

        <div style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 40,
          fontFamily: 'var(--font-serif)',
          fontSize: '0.8rem',
          color: '#d4af37',
          borderTop: '1px solid #d4af37',
          borderRight: '1px solid #d4af37',
          padding: '0.35rem 0.75rem',
          background: 'rgba(10, 10, 12, 0.85)',
          backdropFilter: 'blur(8px)'
        }}>
          EXHIBITION NO. 01 ⚜
        </div>
      </div>
    );
  }

  // 3. STUDENT / ACADEMIC: Collegiate Crest Ribbon & Honor Badge
  if (category === 'student') {
    return (
      <div className="category-corners-student" style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'fixed',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 40,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          color: '#fff',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)'
        }}>
          <GraduationCap style={{ width: '14px', height: '14px' }} />
          <span>VERIFIED GRADUATE // CLASS OF 2026</span>
        </div>

        <div style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 40,
          background: '#ffffff',
          color: '#1e3a8a',
          border: '1px solid #cbd5e1',
          padding: '0.35rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.72rem',
          fontWeight: 800,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          ★ DEAN’S HONOR ROLL
        </div>
      </div>
    );
  }

  // 4. UI/UX & PRODUCT DESIGN: Figma Canvas Markers & Alignment Crosshairs
  if (category === 'design') {
    return (
      <div className="category-corners-design" style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#ec4899',
          background: 'rgba(11, 15, 25, 0.9)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px'
        }}>
          + [FRAME: 1920 × 1080]
        </div>

        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#c084fc',
          background: 'rgba(11, 15, 25, 0.9)',
          border: '1px solid rgba(192, 132, 252, 0.3)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px'
        }}>
          [X: 0, Y: 0] +
        </div>

        <div style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          zIndex: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: '#94a3b8',
          background: 'rgba(11, 15, 25, 0.85)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px'
        }}>
          + AUTO-LAYOUT // 60FPS
        </div>
      </div>
    );
  }

  // 5. BUSINESS & EXECUTIVE: Executive Pinstripe & Wax Seal
  if (category === 'business') {
    return (
      <div className="category-corners-business" style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'fixed',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 40,
          borderLeft: '3px solid #d97706',
          paddingLeft: '0.65rem',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#fbbf24',
          background: 'rgba(14, 19, 31, 0.85)',
          padding: '0.25rem 0.6rem'
        }}>
          CONFIDENTIAL MONOGRAPH
        </div>

        <div style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 40,
          border: '1px solid rgba(217, 119, 6, 0.4)',
          borderRadius: '6px',
          padding: '0.25rem 0.65rem',
          fontSize: '0.72rem',
          fontWeight: 800,
          color: '#fbbf24',
          background: 'rgba(14, 19, 31, 0.9)'
        }}>
          EXECUTIVE ADVISORY • P&amp;L
        </div>
      </div>
    );
  }

  // 6. FREELANCE & BRAND / CREATOR: Neo-Brutalist Sticker Badges
  if (category === 'freelance' || category === 'creator') {
    return (
      <div className="category-corners-freelance" style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'fixed',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 40,
          background: '#fef08a',
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          padding: '0.3rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: 900,
          transform: 'rotate(-3deg)'
        }}>
          ⚡ VERIFIED INDIE CREATOR
        </div>

        <div style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 40,
          background: '#6ee7b7',
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          padding: '0.3rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: 900,
          transform: 'rotate(2deg)'
        }}>
          ★ AVAILABLE FOR COMMISSIONS
        </div>
      </div>
    );
  }

  return null;
}
