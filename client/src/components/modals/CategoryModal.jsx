import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../data/templatesData';
import { RESUME_CATEGORIES } from '../../data/resumesData';
import { 
  X, 
  BookOpen, 
  Code, 
  GraduationCap, 
  Palette, 
  Briefcase, 
  Camera, 
  TrendingUp, 
  Play, 
  Shield, 
  Sparkles, 
  Layers,
  ArrowRight,
  FileText
} from 'lucide-react';

const CATEGORY_ICONS = {
  all: Layers,
  book: BookOpen,
  developer: Code,
  student: GraduationCap,
  design: Palette,
  freelance: Briefcase,
  creative: Camera,
  business: TrendingUp,
  creator: Play,
  cybersecurity: Shield,
  services: Sparkles,
  modern: Sparkles
};

export default function CategoryModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isResumePath = location.pathname.includes('resume');
  const [activeTab, setActiveTab] = useState(isResumePath ? 'resumes' : 'portfolios');

  if (!isOpen) return null;

  const handleSelectPortfolioCat = (categoryId) => {
    onClose();
    navigate(`/templates?category=${categoryId}`);
  };

  const handleSelectResumeCat = (categoryId) => {
    onClose();
    navigate(`/resume-builder?category=${categoryId}`);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(5, 8, 14, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.85rem 0.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '960px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '1.5rem 1.15rem',
        borderRadius: '20px',
        position: 'relative',
        background: '#0d1322',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxSizing: 'border-box'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close modal"
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94a3b8', cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingRight: '1.5rem', paddingLeft: '0.5rem' }}>
          <span className="badge badge-signature" style={{ marginBottom: '0.5rem', fontSize: '0.74rem' }}>
            Choose Your Creative Path
          </span>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.85rem)', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
            Select a Template Category
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Choose between 3D Book &amp; Web Portfolios or College Course Resumes to filter by your discipline.
          </p>
        </div>

        {/* Dual Path Selector Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.65rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem'
        }}>
          <button 
            onClick={() => setActiveTab('portfolios')}
            className={`btn ${activeTab === 'portfolios' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              borderRadius: '10px',
              fontSize: '0.86rem',
              fontWeight: 700,
              padding: '0.6rem 1.1rem',
              background: activeTab === 'portfolios' ? 'var(--gradient-brand)' : '#151d30',
              borderColor: activeTab === 'portfolios' ? '#6366f1' : '#334155',
              color: '#fff',
              boxShadow: activeTab === 'portfolios' ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
              flex: '1 1 auto',
              minWidth: '135px'
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            <span>Portfolios (55)</span>
          </button>

          <button 
            onClick={() => setActiveTab('resumes')}
            className={`btn ${activeTab === 'resumes' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              borderRadius: '10px',
              fontSize: '0.86rem',
              fontWeight: 700,
              padding: '0.6rem 1.1rem',
              background: activeTab === 'resumes' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#151d30',
              borderColor: activeTab === 'resumes' ? '#10b981' : '#334155',
              color: '#fff',
              boxShadow: activeTab === 'resumes' ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none',
              flex: '1 1 auto',
              minWidth: '135px'
            }}
          >
            <FileText style={{ width: '16px', height: '16px' }} />
            <span>Resumes (21+)</span>
          </button>
        </div>

        {/* PORTFOLIO CATEGORIES */}
        {activeTab === 'portfolios' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                const Icon = CATEGORY_ICONS[cat.id] || Sparkles;

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectPortfolioCat(cat.id)}
                    className="interactive-hover-card"
                    style={{
                      background: '#151d30',
                      border: '1.5px solid #334155',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: cat.id === 'book' ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : 'rgba(99, 102, 241, 0.25)',
                      color: cat.id === 'book' ? '#fff' : '#a5b4fc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon style={{ width: '22px', height: '22px' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>
                        {cat.name}
                      </h3>
                      <span style={{ fontSize: '0.82rem', color: '#93c5fd', fontWeight: 600 }}>
                        5 Specialized Templates &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>
              <button 
                onClick={() => handleSelectPortfolioCat('all')}
                className="btn btn-outline interactive-hover-btn"
                style={{ padding: '0.65rem 2rem', fontSize: '0.92rem', background: '#151d30', borderColor: '#475569', color: '#fff' }}
              >
                <span>Browse All 55 Portfolio Templates Library &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* RESUME COLLEGE COURSE CATEGORIES */}
        {activeTab === 'resumes' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              {RESUME_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <div
                  key={cat.id}
                  onClick={() => handleSelectResumeCat(cat.id)}
                  className="interactive-hover-card"
                  style={{
                    background: '#151d30',
                    border: `1.5px solid ${cat.id === 'agri-sciences' ? '#16a34a' : '#334155'}`,
                    borderRadius: '16px',
                    padding: '1.25rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: cat.id === 'agri-sciences' ? '#16a34a' : 'rgba(56, 189, 248, 0.2)',
                    color: '#fff',
                    fontSize: '1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {cat.icon || '🎓'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {cat.name}
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: cat.id === 'agri-sciences' ? '#4ade80' : '#38bdf8', fontWeight: 600 }}>
                      {cat.id === 'agri-sciences' ? '🌾 Dedicated Smart AgTech Template &rarr;' : 'College Course Curated &rarr;'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>
              <button 
                onClick={() => handleSelectResumeCat('all')}
                className="btn btn-outline interactive-hover-btn"
                style={{ padding: '0.65rem 2rem', fontSize: '0.92rem', background: '#151d30', borderColor: '#475569', color: '#fff' }}
              >
                <span>Browse All 21+ College Resume Templates &rarr;</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
