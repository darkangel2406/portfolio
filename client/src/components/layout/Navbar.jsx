import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CategoryModal from '../modals/CategoryModal';
import { 
  BookOpen, 
  Sparkles, 
  PlusCircle, 
  LayoutDashboard, 
  ChevronDown, 
  Menu, 
  X,
  FileText,
  Palette
} from 'lucide-react';

export default function Navbar() {
  const { user, isPremium, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(9, 13, 22, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.65rem 0'
      }}>
        <div 
          className="container" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '0.5rem',
            paddingLeft: '0.85rem',
            paddingRight: '0.85rem'
          }}
        >
          {/* Brand Logo - Direct navigation to Dashboard (Main Page) */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.55rem', 
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
            }}>
              <BookOpen style={{ width: '18px', height: '18px', color: '#fff' }} />
            </div>
            <span 
              className="navbar-logo-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: '#fff',
                whiteSpace: 'nowrap'
              }}
            >
              Folio<span className="text-gradient">Verse</span>
            </span>
          </Link>

          {/* DESKTOP NAV (Hidden on screens <= 768px via CSS class 'desktop-nav') */}
          <div 
            className="desktop-nav"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              fontSize: '0.94rem', 
              fontWeight: 600 
            }}
          >
            {/* Dashboard Link (Main Home Page) */}
            <Link
              to="/dashboard"
              className="btn btn-outline btn-sm interactive-hover-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: ['/', '/dashboard'].includes(location.pathname) ? '#818cf8' : '#e2e8f0',
                borderColor: ['/', '/dashboard'].includes(location.pathname) ? '#6366f1' : 'rgba(255, 255, 255, 0.15)',
                background: ['/', '/dashboard'].includes(location.pathname) ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                padding: '0.45rem 0.95rem'
              }}
              title="View and manage your created portfolios"
            >
              <LayoutDashboard style={{ width: '15px', height: '15px', color: '#818cf8' }} />
              <span>Dashboard</span>
            </Link>

            {/* User clicks Templates button -> opens Modal with separate Portfolio & Resume template sections */}
            <button 
              onClick={() => setIsCategoryModalOpen(true)}
              className="btn btn-outline btn-sm interactive-hover-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#fff',
                borderColor: 'rgba(99, 102, 241, 0.4)',
                background: 'rgba(99, 102, 241, 0.1)',
                cursor: 'pointer',
                padding: '0.45rem 0.95rem'
              }}
              title="Click to choose template category (Portfolios & Resumes)"
            >
              <Sparkles style={{ width: '15px', height: '15px', color: '#c084fc' }} />
              <span>Templates</span>
              <ChevronDown style={{ width: '13px', height: '13px', opacity: 0.8 }} />
            </button>
          </div>

          {/* DESKTOP CTA BUTTONS (Hidden on screens <= 768px via CSS class 'desktop-cta') */}
          <div 
            className="desktop-cta"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            {/* Create Resume Button */}
            <Link 
              to="/resume-builder" 
              className="btn btn-sm interactive-hover-btn"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.48rem 0.95rem',
                borderRadius: '8px',
                whiteSpace: 'nowrap'
              }}
              title="Create a new resume with editable sections"
            >
              <PlusCircle style={{ width: '14px', height: '14px' }} />
              <span>Create Resume</span>
            </Link>

            {/* Create Portfolio Button */}
            <Link 
              to="/editor/new" 
              className="btn btn-primary btn-sm interactive-hover-btn"
              style={{
                background: 'var(--gradient-brand)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.48rem 0.95rem',
                borderRadius: '8px',
                whiteSpace: 'nowrap'
              }}
              title="Open Portfolio Studio Editor to build a portfolio"
            >
              <PlusCircle style={{ width: '14px', height: '14px' }} />
              <span>Create Portfolio</span>
            </Link>
          </div>

          {/* MOBILE TOGGLE BUTTON (Controlled by CSS media query .mobile-nav-toggle) */}
          <div className="mobile-nav-toggle" style={{ alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                background: isMobileMenuOpen ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                borderRadius: '8px',
                padding: '0.45rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '38px',
                height: '38px'
              }}
            >
              {isMobileMenuOpen ? (
                <X style={{ width: '20px', height: '20px', color: '#fff' }} />
              ) : (
                <Menu style={{ width: '20px', height: '20px', color: '#fff' }} />
              )}
            </button>
          </div>

        </div>

        {/* MOBILE COLLAPSIBLE DRAWER (Appears smoothly when hamburger clicked on 350px / mobile) */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-nav-drawer"
            style={{
              padding: '1rem 0.85rem 1.25rem',
              background: 'rgba(15, 23, 42, 0.98)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              animation: 'fadeInDown 0.2s ease-out'
            }}
          >
            {/* Dashboard Link in Mobile Drawer */}
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: ['/', '/dashboard'].includes(location.pathname) ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxSizing: 'border-box'
              }}
            >
              <LayoutDashboard style={{ width: '18px', height: '18px', color: '#818cf8' }} />
              <span>Dashboard</span>
            </Link>

            {/* Templates Selector Button in Mobile Drawer */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCategoryModalOpen(true);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Sparkles style={{ width: '18px', height: '18px', color: '#c084fc' }} />
                <span>Browse All Templates</span>
              </div>
              <ChevronDown style={{ width: '16px', height: '16px', opacity: 0.8 }} />
            </button>

            {/* Create Resume Button in Mobile Drawer */}
            <Link
              to="/resume-builder"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
              }}
            >
              <FileText style={{ width: '16px', height: '16px' }} />
              <span>Create Resume</span>
            </Link>

            {/* Create Portfolio Button in Mobile Drawer */}
            <Link
              to="/editor/new"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                background: 'var(--gradient-brand)',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
              }}
            >
              <Palette style={{ width: '16px', height: '16px' }} />
              <span>Create Portfolio</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Category Selection Modal */}
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </>
  );
}
