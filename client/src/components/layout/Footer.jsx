import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, ShieldCheck, Zap } from 'lucide-react';
import AdBanner from '../common/AdBanner';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(5, 8, 14, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '3rem 0 2.5rem',
      marginTop: 'auto',
      fontSize: '0.9rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        
        {/* Dedicated Universal Ad Section Present on Every Footer Page */}
        <AdBanner slot="footer-universal" format="horizontal" style={{ marginBottom: '2.5rem' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen style={{ width: '18px', height: '18px', color: '#fff' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>
                Folio<span className="text-gradient">Verse</span>
              </span>
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '1.25rem', color: '#94a3b8' }}>
              The modern no-code portfolio creator by <strong>BEZALYNXLABS</strong> featuring signature interactive 3D digital books and 55 customizable templates for developers, students, and creators.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck style={{ width: '14px', height: '14px' }} /> 100% Free &amp; Open Source Core
            </div>
          </div>

          {/* Templates Directory */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Templates</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link to="/templates?category=book" style={{ color: '#94a3b8' }}>3D Interactive Books</Link></li>
              <li><Link to="/templates?category=developer" style={{ color: '#94a3b8' }}>Developer &amp; Tech (Neon Dev)</Link></li>
              <li><Link to="/templates?category=student" style={{ color: '#94a3b8' }}>Student &amp; Fresher (Campus Launch)</Link></li>
              <li><Link to="/templates?category=design" style={{ color: '#94a3b8' }}>UI/UX &amp; Graphic Designers</Link></li>
              <li><Link to="/templates" style={{ color: '#94a3b8' }}>Browse All 55 Templates</Link></li>
            </ul>
          </div>

          {/* Product & Solutions */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link to="/dashboard" style={{ color: '#94a3b8' }}>User Dashboard</Link></li>
              <li><a href="/#features" style={{ color: '#94a3b8' }}>How it Works</a></li>
              <li><Link to="/templates" style={{ color: '#94a3b8' }}>All 55 Templates Free</Link></li>
              <li><Link to="/resume-templates" style={{ color: '#94a3b8' }}>Resume Builder (21+ Degrees)</Link></li>
              <li><Link to="/editor/new" style={{ color: '#94a3b8' }}>Portfolio Editor</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Support &amp; Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="mailto:bezalynxlabs@gmail.com" style={{ color: '#38bdf8', fontWeight: 600 }}>
                  bezalynxlabs@gmail.com
                </a>
              </li>
              <li><span style={{ color: '#e2e8f0', fontWeight: 600 }}>BEZALYNXLABS</span></li>
              <li><Link to="/privacy" style={{ color: '#94a3b8' }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: '#94a3b8' }}>Terms of Service</Link></li>
              <li><span style={{ color: '#64748b' }}>Zero AI Paywall Core</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} BEZALYNXLABS. All rights reserved. Crafted for students, developers, and creative minds.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart style={{ width: '13px', height: '13px', color: '#f43f5e' }} /> by <strong>BEZALYNXLABS</strong>
          </div>
        </div>

      </div>
    </footer>
  );
}
