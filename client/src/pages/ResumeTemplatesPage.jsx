import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RESUME_TEMPLATES, RESUME_CATEGORIES } from '../data/resumesData';
import AdBanner from '../components/common/AdBanner';
import { 
  Sparkles, 
  Search, 
  Eye, 
  ArrowRight, 
  Check, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Globe, 
  ShieldCheck, 
  X,
  Printer,
  ChevronRight,
  Layout,
  Layers,
  Filter,
  User
} from 'lucide-react';

function ResumeVisualThumbnail({ tpl }) {
  const accent = tpl.accentColor || '#10b981';
  const layout = tpl.layout || 'bento-grid';
  const isLeft = layout === 'sidebar-left';
  const isRight = layout === 'sidebar-right';
  const isCentered = layout === 'minimal-centered';
  const isTwoCol = layout === 'two-column-split' || layout === 'clinical-two-col' || layout === 'executive-split';
  const isBento = layout === 'bento-grid' || layout === 'agri-bento' || layout === 'classic-grid';

  return (
    <div style={{
      width: '100%',
      height: '175px',
      background: '#ffffff',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      border: `1.5px solid ${accent}40`,
      padding: '0.75rem',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '1.25rem',
      userSelect: 'none'
    }}>
      {/* Top Academic Ribbon */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '45px', height: '3px', background: accent }} />
      {/* Corner Badge Pill */}
      <div style={{ position: 'absolute', top: '6px', right: '8px', fontSize: '0.55rem', fontWeight: 800, color: accent, background: `${accent}15`, border: `1px solid ${accent}30`, padding: '0.1rem 0.35rem', borderRadius: '4px', textTransform: 'uppercase' }}>
        {tpl.collegeCourse?.slice(0, 16) || 'ATS CERTIFIED'}
      </div>

      {isLeft ? (
        <div style={{ display: 'flex', height: '100%', gap: '0.65rem' }}>
          {/* Left Mini Sidebar */}
          <div style={{ width: '30%', background: `${accent}12`, borderRadius: '6px', padding: '0.45rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
            <div style={{ width: '28px', height: '32px', borderRadius: '4px', background: `${accent}35`, border: `1.5px solid ${accent}`, marginTop: '0.2rem' }} />
            <div style={{ width: '80%', height: '3px', background: `${accent}40`, borderRadius: '2px' }} />
            <div style={{ width: '60%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '70%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '100%', borderTop: `1px dashed ${accent}30`, marginTop: 'auto', paddingTop: '0.2rem' }} />
            <div style={{ width: '85%', height: '4px', background: accent, borderRadius: '2px' }} />
          </div>
          {/* Right Main */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ width: '65%', height: '8px', background: '#0f172a', borderRadius: '3px' }} />
            <div style={{ width: '45%', height: '5px', background: accent, borderRadius: '2px' }} />
            <div style={{ width: '100%', height: '2px', background: '#e2e8f0', margin: '0.2rem 0' }} />
            <div style={{ width: '90%', height: '4px', background: '#64748b', borderRadius: '2px' }} />
            <div style={{ width: '95%', height: '4px', background: '#94a3b8', borderRadius: '2px' }} />
            <div style={{ width: '75%', height: '4px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '50%', height: '6px', background: accent, borderRadius: '2px', marginTop: '0.25rem' }} />
            <div style={{ width: '85%', height: '4px', background: '#64748b', borderRadius: '2px' }} />
            <div style={{ width: '80%', height: '4px', background: '#94a3b8', borderRadius: '2px' }} />
          </div>
        </div>
      ) : isRight ? (
        <div style={{ display: 'flex', height: '100%', gap: '0.65rem' }}>
          {/* Left Main */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ width: '65%', height: '8px', background: '#0f172a', borderRadius: '3px' }} />
            <div style={{ width: '45%', height: '5px', background: accent, borderRadius: '2px' }} />
            <div style={{ width: '100%', height: '2px', background: '#e2e8f0', margin: '0.2rem 0' }} />
            <div style={{ width: '90%', height: '4px', background: '#64748b', borderRadius: '2px' }} />
            <div style={{ width: '95%', height: '4px', background: '#94a3b8', borderRadius: '2px' }} />
            <div style={{ width: '75%', height: '4px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '50%', height: '6px', background: accent, borderRadius: '2px', marginTop: '0.25rem' }} />
            <div style={{ width: '85%', height: '4px', background: '#64748b', borderRadius: '2px' }} />
          </div>
          {/* Right Mini Sidebar */}
          <div style={{ width: '30%', background: `${accent}12`, borderRadius: '6px', padding: '0.45rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
            <div style={{ width: '28px', height: '32px', borderRadius: '4px', background: `${accent}35`, border: `1.5px solid ${accent}`, marginTop: '0.2rem' }} />
            <div style={{ width: '80%', height: '3px', background: `${accent}40`, borderRadius: '2px' }} />
            <div style={{ width: '60%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '70%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
          </div>
        </div>
      ) : isCentered ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', gap: '0.3rem', textAlign: 'center' }}>
          <div style={{ width: '30px', height: '34px', borderRadius: '4px', background: `${accent}25`, border: `1.5px solid ${accent}` }} />
          <div style={{ width: '55%', height: '8px', background: '#0f172a', borderRadius: '3px' }} />
          <div style={{ width: '35%', height: '5px', background: accent, borderRadius: '2px' }} />
          <div style={{ width: '80%', height: '1.5px', background: `${accent}40`, margin: '0.15rem 0' }} />
          <div style={{ width: '90%', height: '4px', background: '#64748b', borderRadius: '2px' }} />
          <div style={{ width: '85%', height: '4px', background: '#94a3b8', borderRadius: '2px' }} />
          <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
            <div style={{ width: '35px', height: '10px', background: `${accent}18`, borderRadius: '3px' }} />
            <div style={{ width: '35px', height: '10px', background: `${accent}18`, borderRadius: '3px' }} />
            <div style={{ width: '35px', height: '10px', background: `${accent}18`, borderRadius: '3px' }} />
          </div>
        </div>
      ) : isTwoCol ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ width: '80px', height: '8px', background: '#0f172a', borderRadius: '3px', marginBottom: '0.2rem' }} />
              <div style={{ width: '60px', height: '4px', background: accent, borderRadius: '2px' }} />
            </div>
            <div style={{ width: '26px', height: '30px', borderRadius: '4px', background: `${accent}25`, border: `1.5px solid ${accent}` }} />
          </div>
          <div style={{ width: '100%', height: '1.5px', background: '#e2e8f0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ width: '60%', height: '5px', background: accent, borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: '#64748b', borderRadius: '2px' }} />
              <div style={{ width: '85%', height: '3px', background: '#94a3b8', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ width: '60%', height: '5px', background: accent, borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: '#64748b', borderRadius: '2px' }} />
              <div style={{ width: '85%', height: '3px', background: '#94a3b8', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      ) : isBento ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.4rem' }}>
          <div style={{ background: `${accent}10`, border: `1px solid ${accent}30`, borderRadius: '6px', padding: '0.35rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ width: '70px', height: '7px', background: '#0f172a', borderRadius: '3px', marginBottom: '0.15rem' }} />
              <div style={{ width: '45px', height: '4px', background: accent, borderRadius: '2px' }} />
            </div>
            <div style={{ width: '22px', height: '24px', borderRadius: '4px', background: `${accent}30`, border: `1px solid ${accent}` }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.4rem', flex: 1 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ width: '50%', height: '4px', background: accent, borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: '#64748b', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#94a3b8', borderRadius: '2px' }} />
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ width: '50%', height: '4px', background: accent, borderRadius: '2px' }} />
              <div style={{ width: '85%', height: '3px', background: '#64748b', borderRadius: '2px' }} />
              <div style={{ width: '75%', height: '3px', background: '#94a3b8', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      ) : (
        /* Timeline Editorial */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ width: '75px', height: '7px', background: '#0f172a', borderRadius: '3px', marginBottom: '0.15rem' }} />
              <div style={{ width: '50px', height: '4px', background: accent, borderRadius: '2px' }} />
            </div>
            <div style={{ width: '24px', height: '26px', borderRadius: '4px', background: `${accent}30`, border: `1px solid ${accent}` }} />
          </div>
          <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '0.45rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, marginTop: '0.2rem' }}>
            <div style={{ width: '70%', height: '5px', background: '#0f172a', borderRadius: '2px' }} />
            <div style={{ width: '90%', height: '3px', background: '#64748b', borderRadius: '2px' }} />
            <div style={{ width: '85%', height: '3px', background: '#94a3b8', borderRadius: '2px' }} />
            <div style={{ width: '50%', height: '4px', background: accent, borderRadius: '2px', marginTop: '0.15rem' }} />
            <div style={{ width: '80%', height: '3px', background: '#64748b', borderRadius: '2px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumeTemplatesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [alignmentFilter, setAlignmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Alignment tags list
  const alignments = [
    { id: 'all', name: 'All Alignments' },
    { id: 'bento', name: 'Bento Grid Multi-Box', icon: '📐' },
    { id: 'sidebar', name: 'Dual-Column Sidebar', icon: '📊' },
    { id: 'classic', name: 'Classic Ivy Centered', icon: '📜' },
    { id: 'split', name: 'Split Metrics Grid', icon: '🩺' },
    { id: 'terminal', name: 'Terminal HUD Box', icon: '💻' }
  ];

  const filteredTemplates = useMemo(() => {
    return RESUME_TEMPLATES.filter(tpl => {
      // Category filter
      const matchesCat = selectedCategory === 'all' || tpl.category === selectedCategory;
      
      // Alignment filter
      let matchesAlign = true;
      if (alignmentFilter === 'bento') matchesAlign = tpl.layout?.includes('bento');
      else if (alignmentFilter === 'sidebar') matchesAlign = tpl.layout?.includes('sidebar') || tpl.layout?.includes('split');
      else if (alignmentFilter === 'classic') matchesAlign = tpl.layout?.includes('classic') || tpl.layout?.includes('editorial');
      else if (alignmentFilter === 'split') matchesAlign = tpl.layout?.includes('matrix') || tpl.layout?.includes('clinical');
      else if (alignmentFilter === 'terminal') matchesAlign = tpl.layout?.includes('terminal') || tpl.layout?.includes('hud');

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        tpl.name.toLowerCase().includes(q) || 
        tpl.collegeCourse.toLowerCase().includes(q) || 
        tpl.description.toLowerCase().includes(q) ||
        (tpl.cornerBadge && tpl.cornerBadge.toLowerCase().includes(q));

      return matchesCat && matchesAlign && matchesSearch;
    });
  }, [selectedCategory, alignmentFilter, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 0 6rem', position: 'relative' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.14)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '0.4rem 1.25rem',
            borderRadius: '9999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#34d399',
            marginBottom: '1.25rem'
          }}>
            <Sparkles style={{ width: '15px', height: '15px' }} />
            <span>31+ College &amp; Professional Disciplines &bull; Distinct Layout Alignments</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', color: '#fff' }}>
            Choose Your <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>College Course Resume</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Every discipline features tailored box structures, course emojis, credential seals, and industry-standard coursework. Preview any layout before starting creation.
          </p>
        </div>

        {/* Dedicated Ad Section for Resume Templates */}
        <AdBanner slot="resume-templates" format="horizontal" style={{ margin: '0 auto 2.5rem' }} />

        {/* Search & Alignment Toolbar */}
        <div className="resume-toolbar-box" style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '1.25rem 1.75rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '450px' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#64748b' }} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree (Agri, CS, MBA, Medical, Law)..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.6rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(5, 7, 14, 0.6)',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Alignment Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {alignments.map(a => (
              <button
                key={a.id}
                onClick={() => setAlignmentFilter(a.id)}
                className="btn btn-sm"
                style={{
                  background: alignmentFilter === a.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  border: alignmentFilter === a.id ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: alignmentFilter === a.id ? '#34d399' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.85rem'
                }}
              >
                <span>{a.icon}</span>
                <span>{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Discipline Filter Scroll Strip */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '3rem', scrollbarWidth: 'none' }}>
          {RESUME_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: selectedCategory === cat.id ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedCategory === cat.id ? 'rgba(16, 185, 129, 0.22)' : 'rgba(15, 23, 42, 0.6)',
                color: selectedCategory === cat.id ? '#34d399' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Resume Template Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredTemplates.map(tpl => {
            const layoutBadge = tpl.layout?.includes('bento') ? '📐 BENTO BOX GRID'
              : tpl.layout?.includes('sidebar') ? '📊 DUAL-COLUMN SIDEBAR'
              : tpl.layout?.includes('classic') ? '📜 CLASSIC CENTERED'
              : tpl.layout?.includes('matrix') ? '🩺 SPLIT METRICS GRID'
              : '⚡ MODULAR BOX';

            return (
              <div 
                key={tpl.id}
                className="glass-panel interactive-hover-card"
                style={{
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1.5px solid ${tpl.accentColor}35`,
                  background: 'rgba(15, 23, 42, 0.75)',
                  position: 'relative'
                }}
              >
                {/* Header Row: Course Emojis & Alignment Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', fontSize: '1.35rem' }}>
                    {(tpl.emojis || ['🎓']).slice(0, 4).map((em, idx) => (
                      <span key={idx}>{em}</span>
                    ))}
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    background: `${tpl.accentColor}18`,
                    border: `1px solid ${tpl.accentColor}40`,
                    color: tpl.accentColor,
                    letterSpacing: '0.04em'
                  }}>
                    {layoutBadge}
                  </span>
                </div>

                {/* Unique Resume Visual Layout Thumbnail */}
                <ResumeVisualThumbnail tpl={tpl} />

                {/* Template Name & Degree Track */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem', lineHeight: 1.25 }}>
                  {tpl.name}
                </h3>
                <div style={{ fontSize: '0.88rem', color: tpl.accentColor, fontWeight: 700, marginBottom: '1rem' }}>
                  {tpl.collegeCourse}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {tpl.description}
                </p>

                {/* Corner Official Seal Tag */}
                <div style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: `1px dashed ${tpl.accentColor}40`,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#cbd5e1',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <ShieldCheck style={{ width: '15px', height: '15px', color: tpl.accentColor }} />
                  <span>{tpl.cornerBadge || 'ACCREDITED COURSE DEGREE'}</span>
                </div>

                {/* Card Actions: Preview & Start Creation */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setPreviewTemplate(tpl)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.18)', color: '#fff' }}
                  >
                    <Eye style={{ width: '15px', height: '15px' }} />
                    <span>Preview</span>
                  </button>
                  <Link 
                    to={`/resume-builder/${tpl.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1.2, background: tpl.accentColor, borderColor: tpl.accentColor, fontWeight: 800, color: '#fff' }}
                  >
                    <span>Start Creation</span>
                    <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ============================================================
          INTERACTIVE FULLSCREEN RESUME PREVIEW MODAL
          ============================================================ */}
      {previewTemplate && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(4, 7, 17, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
            animation: 'fadeInUp 0.25s ease-out'
          }}
          onClick={() => setPreviewTemplate(null)}
        >
          {/* Top Modal Controls */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '880px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '0.85rem 1.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{(previewTemplate.emojis || ['🎓'])[0]}</span>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800 }}>{previewTemplate.name}</h3>
                <div style={{ color: previewTemplate.accentColor, fontSize: '0.82rem', fontWeight: 600 }}>{previewTemplate.collegeCourse}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link 
                to={`/resume-builder/${previewTemplate.id}`}
                className="btn btn-primary btn-sm"
                style={{ background: previewTemplate.accentColor, borderColor: previewTemplate.accentColor, fontWeight: 800 }}
              >
                <span>Use This Template &amp; Start Creation</span>
                <ArrowRight style={{ width: '15px', height: '15px' }} />
              </Link>

              <button 
                onClick={() => setPreviewTemplate(null)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.45rem', borderRadius: '50%' }}
                title="Close Preview"
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>

          {/* Printable A4 Resume Sample Preview Sheet */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`printable-resume-paper ${previewTemplate.styleClass}`}
            style={{
              width: '100%',
              maxWidth: '850px',
              minHeight: '1050px',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '8px',
              padding: '3rem',
              boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
              position: 'relative',
              fontFamily: previewTemplate.layout === 'classic-editorial' ? 'var(--font-serif)' : 'var(--font-sans)',
              lineHeight: 1.55,
              fontSize: '0.94rem',
              marginBottom: '3rem'
            }}
          >
            {/* Resume Header with Top-Right Photo Section */}
            <div style={{
              borderBottom: `2.5px solid ${previewTemplate.accentColor}`,
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1.5rem'
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.25rem' }}>
                  {previewTemplate.sampleData?.fullName || 'Full Candidate Name'}
                </h1>
                <div style={{ fontSize: '1rem', color: previewTemplate.accentColor, fontWeight: 700, marginBottom: '0.65rem' }}>
                  {previewTemplate.sampleData?.headline || previewTemplate.collegeCourse}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.84rem', color: '#475569' }}>
                  <span>📍 {previewTemplate.sampleData?.location || 'New Delhi, India'}</span>
                  <span>✉️ {previewTemplate.sampleData?.email || 'candidate@college.edu'}</span>
                  <span>📞 {previewTemplate.sampleData?.phone || '+91 98765 43210'}</span>
                </div>
              </div>

              {/* Top-Right Corner Photo Section & Seal */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '95px',
                  height: '115px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `2px solid ${previewTemplate.accentColor}`,
                  background: '#f1f5f9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {previewTemplate.sampleData?.photoUrl ? (
                    <img 
                      src={previewTemplate.sampleData.photoUrl} 
                      alt={previewTemplate.sampleData?.fullName || 'Candidate'} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `${previewTemplate.accentColor}12` }}>
                      <User style={{ width: '30px', height: '30px', color: previewTemplate.accentColor }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', marginTop: '0.2rem' }}>Photo Slot</span>
                    </div>
                  )}
                </div>
                <div style={{
                  border: `1.5px solid ${previewTemplate.accentColor}`,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: previewTemplate.accentColor,
                  marginTop: '0.35rem',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {previewTemplate.cornerBadge || 'VERIFIED'}
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: previewTemplate.accentColor, letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                Professional Profile &amp; Research Focus
              </h4>
              <p style={{ color: '#334155', lineHeight: 1.65 }}>
                {previewTemplate.sampleData?.summary || previewTemplate.description}
              </p>
            </div>

            {/* Education Box */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: previewTemplate.accentColor, letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                Academic Degree &amp; Relevant Coursework
              </h4>
              {previewTemplate.sampleData?.education?.map((edu, idx) => (
                <div key={idx} style={{ background: '#f8fafc', borderLeft: `3px solid ${previewTemplate.accentColor}`, padding: '0.75rem 1rem', borderRadius: '0 6px 6px 0', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                    <span>{edu.degree}</span>
                    <span>{edu.period}</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600 }}>{edu.institution} &bull; {edu.gpa}</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.35rem' }}><strong>Coursework:</strong> {edu.coursework}</div>
                </div>
              ))}
            </div>

            {/* Experience / Projects Box */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: previewTemplate.accentColor, letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                Experience &amp; Specialized Capstones
              </h4>
              {previewTemplate.sampleData?.experience?.slice(0, 2).map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                    <span>{exp.role} @ {exp.company}</span>
                    <span style={{ color: '#64748b', fontSize: '0.84rem' }}>{exp.period}</span>
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem', color: '#334155', fontSize: '0.88rem' }}>
                    {exp.bullets?.map((b, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills Pills Box */}
            {previewTemplate.sampleData?.showSkills !== false && (
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: previewTemplate.accentColor, letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
                  {previewTemplate.sampleData?.skillsHeading || 'Technical & Functional Skills'}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {Object.values(previewTemplate.sampleData?.skills || {}).flat().slice(0, 10).map((sk, idx) => (
                    <span key={idx} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
