import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdBanner from '../components/common/AdBanner';
import { 
  PlusCircle, 
  FileText, 
  Sparkles, 
  BookOpen,
  ArrowRight,
  Monitor,
  Mail,
  Palette,
  Download,
  CheckCircle2,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '3.5rem 0 6rem', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Dashboard Welcome Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>
                Welcome back, {user?.name || 'Creator'}!
              </h1>
              <span className="badge badge-free">
                <Sparkles style={{ width: '13px', height: '13px' }} /> 100% Free Access
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              Dual Creative Studio: Choose your studio below to launch your next signature portfolio or resume.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/resume-templates" className="btn btn-secondary" style={{ borderColor: '#34d399', color: '#34d399' }}>
              <FileText style={{ width: '17px', height: '17px' }} />
              <span>Resume Studio</span>
            </Link>
            <Link to="/templates" className="btn btn-primary">
              <PlusCircle style={{ width: '18px', height: '18px' }} />
              <span>Portfolio Studio</span>
            </Link>
          </div>
        </div>

        {/* Mobile User Recommendation Alert Banner */}
        <div 
          className="glass-panel"
          style={{
            padding: '1rem 1.35rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.75) 0%, rgba(49, 46, 129, 0.75) 100%)',
            border: '1.5px solid rgba(129, 140, 248, 0.45)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(56, 189, 248, 0.2)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Monitor style={{ width: '22px', height: '22px', color: '#38bdf8' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.88rem', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span>⚠️ Mobile Creators: Switch to Desktop Site for Friendly Experience</span>
              <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontSize: '0.72rem', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                Friendly Mode
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0', color: '#c7d2fe', fontSize: '0.82rem' }}>
              To use FolioVerse friendly with full interactive 3D controls, drag-and-drop page turning, and dual studio side-by-side editing, please switch your mobile browser to <strong>"Desktop site"</strong> (tap browser menu <strong>⋮</strong> &gt; <strong>Desktop site</strong>) or open on a computer.
            </p>
          </div>
        </div>

        {/* Dedicated Ad Section: Dashboard Top Banner */}
        <AdBanner slot="dashboard-top" format="horizontal" />

        {/* DUAL CREATION STUDIOS HUB (PORTFOLIO & RESUME CREATION) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}>
          {/* Portfolio Studio Card */}
          <div 
            className="glass-panel interactive-hover-card gateway-card"
            style={{
              padding: '1.75rem 1.35rem',
              borderRadius: '20px',
              border: '2px solid rgba(99, 102, 241, 0.25)',
              background: 'rgba(15, 23, 42, 0.72)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)'
              }}>
                <BookOpen style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Portfolio Creation</span>
                  <span>🎨</span>
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 600 }}>
                  55 Curated Designs &bull; 3D Interactive Books
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Select from 3D turning-page book portfolios, developer terminal HUDs, and bento UI showcases with 5 interactive animated backgrounds.
            </p>

            <Link 
              to="/templates"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.8rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: '12px',
                justifyContent: 'center'
              }}
            >
              <span>Start Creation</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>

          {/* Resume Studio Card */}
          <div 
            className="glass-panel interactive-hover-card gateway-card"
            style={{
              padding: '1.75rem 1.35rem',
              borderRadius: '20px',
              border: '2px solid rgba(16, 185, 129, 0.25)',
              background: 'rgba(15, 23, 42, 0.72)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
              }}>
                <FileText style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Resume Creation</span>
                  <span>📄</span>
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                  21+ Degree Streams &bull; ATS Optimized Formats
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Choose course-tailored box alignments (Bento, Dual-Column, Classic, Split Metrics) with verified degree seals and course emojis.
            </p>

            <Link 
              to="/resume-templates"
              className="btn btn-primary"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderColor: '#10b981',
                padding: '0.8rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: '12px',
                justifyContent: 'center'
              }}
            >
              <span>Start Creation</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </div>

        {/* ============================================================
            HOW IT WORKS OF OUR WEBSITE SECTION
            ============================================================ */}
        <div style={{ marginTop: '4.5rem', marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-signature" style={{ marginBottom: '0.65rem' }}>
              <Sparkles style={{ width: '13px', height: '13px' }} /> Simple 3-Step Process
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 850, color: '#fff', marginBottom: '0.65rem' }}>
              How FolioVerse Works
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              From initial discipline selection to complete standalone downloads in 3 effortless steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
            {/* Step 1 */}
            <div className="glass-panel interactive-hover-card" style={{ padding: '1.75rem', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', fontWeight: 800, fontSize: '1.15rem' }}>
                  01
                </div>
                <BookOpen style={{ width: '22px', height: '22px', color: '#818cf8', opacity: 0.8 }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 750, color: '#fff', marginBottom: '0.65rem' }}>
                1. Select Your Studio &amp; Template
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>
                Choose <strong>Portfolio Studio</strong> for signature 3D digital turning-page books, developer HUD terminals, and modern bento grids, or <strong>Resume Studio</strong> for ATS-friendly college degree templates with course emojis &amp; verified seals.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/templates" style={{ fontSize: '0.82rem', color: '#818cf8', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  Browse 55 Templates &rarr;
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-panel interactive-hover-card" style={{ padding: '1.75rem', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', fontWeight: 800, fontSize: '1.15rem' }}>
                  02
                </div>
                <Palette style={{ width: '22px', height: '22px', color: '#c084fc', opacity: 0.8 }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 750, color: '#fff', marginBottom: '0.65rem' }}>
                2. Customize with Live Physics
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>
                Fill in your career milestones, GitHub repositories, skills, and contact details in our real-time split studio. Enjoy authentic button feedback sounds, physical paper turnover acoustics, and live animated background weather cycles.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/resume-templates" style={{ fontSize: '0.82rem', color: '#c084fc', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  Browse Degree Resumes &rarr;
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-panel interactive-hover-card" style={{ padding: '1.75rem', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', fontWeight: 800, fontSize: '1.15rem' }}>
                  03
                </div>
                <Download style={{ width: '22px', height: '22px', color: '#34d399', opacity: 0.8 }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 750, color: '#fff', marginBottom: '0.65rem' }}>
                3. Download Standalone Website
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>
                Hit <strong>Download Portfolio</strong> to generate an ultra-fast, zero-dependency standalone HTML file directly into your device downloads. It opens in any browser offline or online with zero hosting fees and zero watermarks!
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  100% Free &amp; Offline Ready ✓
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            BEZALYNXLABS COMPANY SUPPORT & ASSISTANCE SECTION
            ============================================================ */}
        <div 
          className="glass-panel"
          style={{
            padding: '2rem 2.25rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            marginTop: '3.5rem'
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                fontSize: '0.74rem',
                fontWeight: 800,
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                letterSpacing: '0.05em'
              }}>
                OFFICIAL SUPPORT
              </span>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>
                by <strong style={{ color: '#fff' }}>BEZALYNXLABS</strong>
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
              Need Help or Custom Template Requests?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              <strong>BEZALYNXLABS</strong> provides dedicated support for students, developers, and institutions using FolioVerse. Reach out to our engineering team directly via email for technical questions, custom degree templates, or troubleshooting.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '280px' }}>
            <a 
              href="mailto:bezalynxlabs@gmail.com" 
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1.4rem',
                fontSize: '0.96rem',
                fontWeight: 700,
                borderRadius: '12px'
              }}
            >
              <Mail style={{ width: '18px', height: '18px' }} />
              <span>bezalynxlabs@gmail.com</span>
            </a>
            <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
              Company: <strong style={{ color: '#fff' }}>BEZALYNXLABS</strong> • Fast Response Guaranteed
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

