import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Terminal, 
  Palette, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Camera, 
  TrendingUp, 
  Radio, 
  Compass, 
  Layers 
} from 'lucide-react';

/**
 * 100% Self-Contained, Offline-Ready Visual Template Thumbnail
 * Renders authentic, high-fidelity visual mockups for all 55 templates
 * across all 11 FolioVerse categories with zero reliance on external network CDNs.
 */
export default function TemplateThumbnail({ tpl, height = '215px' }) {
  const [imgError, setImgError] = useState(false);
  const cat = tpl?.category || 'modern';
  const accent = tpl?.accentColor || '#6366f1';
  const name = tpl?.name || 'Template';

  // If the template has an image and it hasn't failed to load, attempt rendering it with fallback
  const showImage = Boolean(tpl?.previewImage) && !imgError;

  const renderVisualMockup = () => {
    switch (cat) {
      // -----------------------------------------------------------------------
      // 1. BOOK-STYLE PORTFOLIOS (OpenBook, Vintage Journal, The Biography, etc.)
      // -----------------------------------------------------------------------
      case 'book': {
        const isVintage = tpl.id === 'vintage-journal';
        const isMystic = tpl.id === 'mystic-pages';
        const bookBg = isMystic ? '#0a0914' : (isVintage ? '#23180d' : '#18120c');
        const pageBg = isMystic ? '#121124' : (isVintage ? '#f4eedb' : '#faf7f0');
        const pageText = isMystic ? '#e2e8f0' : '#1e293b';

        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 50% 30%, ${bookBg} 0%, #06050a 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 3D Realistic Open Book Spread */}
            <div style={{
              width: '92%',
              height: '84%',
              display: 'flex',
              borderRadius: '8px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.85), 0 0 0 1px rgba(212, 175, 55, 0.3)',
              position: 'relative'
            }}>
              {/* Left Page */}
              <div style={{
                flex: 1,
                background: pageBg,
                color: pageText,
                padding: '0.75rem',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
                borderRight: '1px solid rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                boxShadow: 'inset -8px 0 16px rgba(0,0,0,0.12)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>
                    ✦
                  </div>
                  <div>
                    <div style={{ width: '45px', height: '5px', background: isMystic ? '#94a3b8' : '#0f172a', borderRadius: '2px' }} />
                    <div style={{ width: '30px', height: '3px', background: accent, borderRadius: '2px', marginTop: '2px' }} />
                  </div>
                </div>
                <div style={{ width: '90%', height: '3px', background: isMystic ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
                <div style={{ width: '80%', height: '3px', background: isMystic ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
                <div style={{ width: '70%', height: '3px', background: isMystic ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', opacity: 0.6 }}>
                  <span>Vol. I</span>
                  <span>pg. 01</span>
                </div>
              </div>

              {/* Center Spine Crease & Gold Ribbon Bookmark */}
              <div style={{
                width: '6px',
                background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4))',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '1px',
                  width: '4px',
                  height: '65%',
                  background: 'linear-gradient(to bottom, #d4af37, #b45309)',
                  borderRadius: '1px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                }} />
              </div>

              {/* Right Page */}
              <div style={{
                flex: 1,
                background: pageBg,
                color: pageText,
                padding: '0.75rem',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                boxShadow: 'inset 8px 0 16px rgba(0,0,0,0.12)'
              }}>
                <div style={{ width: '50px', height: '5px', background: accent, borderRadius: '2px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', marginTop: '0.2rem' }}>
                  <div style={{ height: '24px', background: isMystic ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', borderRadius: '4px', border: `1px solid ${accent}40` }} />
                  <div style={{ height: '24px', background: isMystic ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', borderRadius: '4px', border: `1px solid ${accent}40` }} />
                </div>
                <div style={{ width: '90%', height: '3px', background: isMystic ? '#334155' : '#cbd5e1', borderRadius: '2px', marginTop: '0.2rem' }} />
                <div style={{ width: '75%', height: '3px', background: isMystic ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', fontSize: '0.55rem', opacity: 0.6 }}>
                  <span>pg. 02</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 2. DEVELOPER & TECH (Neon Dev, Terminal Pro, Code Architect, etc.)
      // -----------------------------------------------------------------------
      case 'developer': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: '#040711',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'monospace'
          }}>
            {/* Background Silicon Grid Lines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 255, 204, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

            {/* Terminal Window Mockup */}
            <div style={{
              background: 'rgba(10, 15, 29, 0.94)',
              border: '1px solid rgba(0, 255, 204, 0.3)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              boxShadow: '0 12px 28px rgba(0, 255, 204, 0.1)',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Window Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.55rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#eab308' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: '#64748b' }}>dev@folio:~$</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#00ffcc', lineHeight: 1.5 }}>
                <div><span style={{ color: '#a855f7' }}>const</span> folio = <span style={{ color: '#38bdf8' }}>new</span> Architect();</div>
                <div style={{ color: '#94a3b8' }}>&gt; stack: [<span style={{ color: '#f59e0b' }}>'React'</span>, <span style={{ color: '#f59e0b' }}>'Rust'</span>, <span style={{ color: '#f59e0b' }}>'K8s'</span>]</div>
                <div><span style={{ color: '#22c55e' }}>✓</span> status: <span style={{ color: '#22c55e' }}>200_READY_TO_DEPLOY</span></div>
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 3. STUDENT & FRESHER (Campus Launch, Scholar Space, etc.)
      // -----------------------------------------------------------------------
      case 'student': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '10px',
              padding: '0.85rem',
              boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
              border: '1.5px solid rgba(37, 99, 235, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#fff' }}>
                  🎓
                </div>
                <div>
                  <div style={{ width: '70px', height: '7px', background: '#0f172a', borderRadius: '3px' }} />
                  <div style={{ width: '50px', height: '4px', background: '#2563eb', borderRadius: '2px', marginTop: '3px' }} />
                </div>
                <span style={{ marginLeft: 'auto', background: '#dbeafe', color: '#1d4ed8', fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                  GPA 3.9
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <span style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.62rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>CS Major</span>
                <span style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.62rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>Capstone Lab</span>
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 4. UI/UX & DESIGN (Figma Flow, Glass Bento, Minimal Canvas, etc.)
      // -----------------------------------------------------------------------
      case 'design': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #110e20 0%, #1e1338 100%)',
            padding: '0.85rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            alignContent: 'center',
            position: 'relative'
          }}>
            {/* Bento Card 1: Vector Node */}
            <div style={{ background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.35)', borderRadius: '8px', padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.62rem', color: '#f472b6', fontWeight: 800 }}>FIGMA ➔ PROD</span>
              <div style={{ display: 'flex', gap: '4px', marginTop: '0.2rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ec4899' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8b5cf6' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38bdf8' }} />
              </div>
            </div>
            {/* Bento Card 2: Interactive Switch */}
            <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '8px', padding: '0.65rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '18px', borderRadius: '9999px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#fff' }} />
              </div>
              <span style={{ fontSize: '0.55rem', color: '#c084fc', marginTop: '0.3rem', fontWeight: 700 }}>60 FPS UI</span>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 5. FREELANCE & BRAND (Freelancer Bold, Agency Studio, etc.)
      // -----------------------------------------------------------------------
      case 'freelance': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #180d26 0%, #291240 100%)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1.5px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '10px',
              padding: '0.85rem',
              boxShadow: '0 12px 24px rgba(168, 85, 247, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 800 }}>⚡ STUDIO RETAINER</span>
                <span style={{ fontSize: '0.6rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>ACTIVE</span>
              </div>
              <div style={{ width: '70%', height: '8px', background: '#fff', borderRadius: '3px', marginBottom: '0.3rem' }} />
              <div style={{ width: '45%', height: '5px', background: '#a855f7', borderRadius: '2px' }} />
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 6. CREATIVE & PHOTOGRAPHY (Cinematic, Art Director, Film Noir, etc.)
      // -----------------------------------------------------------------------
      case 'creative': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 40%, #15120d 0%, #08080a 100%)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Golden Filigree Frame */}
            <div style={{
              width: '88%',
              height: '82%',
              border: '1.5px solid rgba(212, 175, 55, 0.5)',
              borderRadius: '4px',
              padding: '0.65rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.1)'
            }}>
              <span style={{ fontSize: '1.4rem', color: '#d4af37', marginBottom: '0.2rem' }}>📷</span>
              <span style={{ fontSize: '0.68rem', color: '#d4af37', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase' }}>
                EXHIBITION MMXXVI
              </span>
              <div style={{ width: '35px', height: '1px', background: '#d4af37', margin: '0.35rem 0' }} />
              <span style={{ fontSize: '0.55rem', color: '#9ca3af', fontStyle: 'italic' }}>Curated Visual Works</span>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 7. BUSINESS & CORP (Executive Brief, Consultant Clean, etc.)
      // -----------------------------------------------------------------------
      case 'business': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0e1526 0%, #172138 100%)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              boxShadow: '0 10px 24px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.62rem', color: '#fbbf24', fontWeight: 800 }}>EXECUTIVE BRIEF</span>
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 800 }}>▲ +38% ARR</span>
              </div>
              {/* Mini Bar Chart Pillars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '36px', borderBottom: '1px solid rgba(148, 163, 184, 0.2)', paddingBottom: '2px' }}>
                <div style={{ flex: 1, height: '40%', background: '#3b82f6', borderRadius: '2px 2px 0 0' }} />
                <div style={{ flex: 1, height: '65%', background: '#60a5fa', borderRadius: '2px 2px 0 0' }} />
                <div style={{ flex: 1, height: '85%', background: '#d97706', borderRadius: '2px 2px 0 0' }} />
                <div style={{ flex: 1, height: '100%', background: '#fbbf24', borderRadius: '2px 2px 0 0' }} />
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 8. CONTENT CREATOR (Creator Pulse, Studio Stream, etc.)
      // -----------------------------------------------------------------------
      case 'creator': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a0815 0%, #300c28 100%)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#ef4444', color: '#fff', padding: '0.15rem 0.45rem', borderRadius: '9999px', fontSize: '0.58rem', fontWeight: 800 }}>
              ● LIVE
            </div>
            {/* Center Play Button Graphic */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(244, 63, 94, 0.5)',
              color: '#fff',
              fontSize: '1.1rem',
              paddingLeft: '3px'
            }}>
              ▶
            </div>
            <span style={{ fontSize: '0.62rem', color: '#fbcfe8', fontWeight: 700, marginTop: '0.45rem' }}>
              ❤️ 100K Subscribers
            </span>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 9. CYBER & SYSTEMS (Cyber Shield, Zero Trust, etc.)
      // -----------------------------------------------------------------------
      case 'cybersecurity': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: '#030706',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            fontFamily: 'monospace'
          }}>
            <div style={{
              border: '1.5px solid #22c55e',
              background: 'rgba(34, 197, 94, 0.08)',
              borderRadius: '6px',
              padding: '0.65rem',
              boxShadow: '0 0 16px rgba(34, 197, 94, 0.15)'
            }}>
              <div style={{ fontSize: '0.62rem', color: '#22c55e', fontWeight: 800, marginBottom: '0.25rem' }}>
                [CLEARANCE LEVEL 5]
              </div>
              <div style={{ fontSize: '0.58rem', color: '#86efac', lineHeight: 1.4 }}>
                &gt; ZERO_TRUST: ENFORCED<br />
                &gt; CVE_STATUS: 0_VULNS<br />
                &gt; PGP: VERIFIED
              </div>
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 10. SERVICES & STUDIO (Craftsman, Modular Studio, etc.)
      // -----------------------------------------------------------------------
      case 'services': {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #091322 0%, #102340 100%)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              border: '1px dashed rgba(56, 189, 248, 0.4)',
              borderRadius: '8px',
              padding: '0.65rem',
              background: 'rgba(15, 23, 42, 0.8)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.9rem' }}>📐</span>
                <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: 800 }}>MODULAR DRAFT</span>
              </div>
              <div style={{ width: '80%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '0.2rem' }} />
              <div style={{ width: '55%', height: '3px', background: '#38bdf8', borderRadius: '2px' }} />
            </div>
          </div>
        );
      }

      // -----------------------------------------------------------------------
      // 11. MODERN & EXPERIMENTAL (Default)
      // -----------------------------------------------------------------------
      default: {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 40% 40%, #171133 0%, #080712 100%)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Glowing Nebula Plasma Blobs */}
            <div style={{ position: 'absolute', top: '15%', right: '15%', width: '55px', height: '55px', borderRadius: '50%', background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(8px)', opacity: 0.6 }} />
            <div style={{ position: 'absolute', bottom: '15%', left: '15%', width: '65px', height: '65px', borderRadius: '50%', background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', filter: 'blur(10px)', opacity: 0.5 }} />
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${accent}50`,
              borderRadius: '10px',
              padding: '0.75rem',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}>
              <div style={{ width: '65%', height: '7px', background: '#fff', borderRadius: '3px', marginBottom: '0.3rem' }} />
              <div style={{ width: '40%', height: '4px', background: accent, borderRadius: '2px', marginBottom: '0.5rem' }} />
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <div style={{ width: '28px', height: '14px', background: `${accent}25`, borderRadius: '4px' }} />
                <div style={{ width: '28px', height: '14px', background: `${accent}25`, borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div style={{ position: 'relative', height, width: '100%', overflow: 'hidden', background: '#090d16' }}>
      {/* If external image exists and loads, show it. Otherwise show authentic visual mockup! */}
      {showImage ? (
        <img 
          src={tpl.previewImage} 
          alt={name} 
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95, transition: 'transform 0.4s ease' }} 
        />
      ) : (
        renderVisualMockup()
      )}
      
      {/* Subtle Gradient Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9, 13, 22, 0.85) 0%, rgba(9, 13, 22, 0.15) 50%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Badges on Top Left */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '0.35rem', zIndex: 2, flexWrap: 'wrap' }}>
        <span className="badge badge-free" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
          Free
        </span>
        {tpl?.isSignature && (
          <span className="badge badge-signature" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', background: 'rgba(99, 102, 241, 0.25)', borderColor: '#818cf8', color: '#c084fc' }}>
            📖 3D Book
          </span>
        )}
      </div>

      {/* Corner category tag on Bottom Right */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(5, 8, 16, 0.85)', backdropFilter: 'blur(8px)', border: `1px solid ${accent}50`, padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.68rem', color: '#e2e8f0', fontWeight: 700, zIndex: 2 }}>
        #{tpl?.number || ''} {tpl?.categoryName?.split(' ')[0] || cat}
      </div>
    </div>
  );
}

