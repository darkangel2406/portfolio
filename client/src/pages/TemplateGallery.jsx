import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { TEMPLATES, CATEGORIES } from '../data/templatesData';
import { useAuth } from '../context/AuthContext';
import CategoryModal from '../components/modals/CategoryModal';
import { downloadPortfolioAsHtml } from '../utils/portfolioExporter';
import AdBanner from '../components/common/AdBanner';
import TemplateThumbnail from '../components/common/TemplateThumbnail';
import { 
  Search, 
  Crown, 
  Lock, 
  Eye, 
  Sparkles, 
  Filter, 
  Check, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  GraduationCap, 
  Download, 
  Zap, 
  Star, 
  Edit3 
} from 'lucide-react';

export default function TemplateGallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // Interactive 3D Perspective Tilt state
  const [cardTilts, setCardTilts] = useState({});

  const handleCardMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilts(prev => ({
      ...prev,
      [id]: `perspective(900px) rotateY(${(x * 12).toFixed(1)}deg) rotateX(${(-y * 12).toFixed(1)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
    }));
  };

  const handleCardMouseLeave = (id) => {
    setCardTilts(prev => ({
      ...prev,
      [id]: 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0) scale3d(1, 1, 1)'
    }));
  };

  // Filter templates based on category and search query
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(tpl => {
      // Category filter
      if (selectedCategory !== 'all' && tpl.category !== selectedCategory) {
        return false;
      }
      
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tpl.name.toLowerCase().includes(q);
        const matchesDesc = tpl.description.toLowerCase().includes(q);
        const matchesCategory = tpl.categoryName.toLowerCase().includes(q);
        const matchesTags = tpl.tags?.some(tag => tag.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesCategory || matchesTags;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleUseTemplate = (tpl) => {
    navigate(`/editor/new?template=${tpl.id}`);
  };

  const handleDirectDownload = (tpl) => {
    downloadPortfolioAsHtml({
      title: `${tpl.name} Showcase`,
      templateId: tpl.id,
      themeConfig: { accentColor: tpl.accentColor || '#6366f1', isPremium: tpl.isPremium },
      profile: {
        fullName: 'Alex River',
        headline: 'Full Stack Engineer & Creative Developer',
        bio: 'Crafting resilient modern systems and responsive digital experiences.',
        avatarUrl: tpl.previewImage,
        location: 'Bengaluru, India',
        email: 'alex@example.com'
      },
      skills: [
        { name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
        { name: 'Node.js / Express', category: 'Backend', level: 'Expert' },
        { name: 'TypeScript', category: 'Languages', level: 'Advanced' },
        { name: 'PostgreSQL', category: 'Database', level: 'Advanced' }
      ],
      projects: [
        {
          title: 'Quantum Analytics Engine',
          description: 'High-throughput event streaming analytics dashboard with real-time WebSocket telemetry.',
          techStack: ['React', 'Node.js', 'Canvas'],
          liveUrl: 'https://example.com'
        },
        {
          title: 'HyperUI Design Tokens',
          description: 'Accessible, component-driven design system with dark mode tokens.',
          techStack: ['TypeScript', 'CSS Modules'],
          liveUrl: 'https://example.com'
        }
      ],
      experience: [
        {
          role: 'Lead Systems Architect',
          company: 'Nexus Innovations',
          period: '2023 - Present',
          description: 'Scaled microservices to 10M+ daily events. Spearheaded frontend component modernization.'
        }
      ]
    });
  };

  return (
    <div style={{ padding: '3.5rem 0 6rem', minHeight: '85vh', position: 'relative' }}>
      <div className="container">
        
        {/* Gallery Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-signature" style={{ marginBottom: '0.85rem' }}>
            ✨ Interactive 3D Portfolio Library
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', color: '#fff' }}>
            55 Curated Designs. <span className="text-gradient">3D Animated &amp; Elegant.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.65 }}>
            Every template features 3D perspective animations, authentic acoustic page turns, and instant download to your computer that retains all offline canvas animations!
          </p>
        </div>

        {/* Dedicated Ad Section for Templates Gallery */}
        <AdBanner slot="templates-gallery" format="horizontal" style={{ margin: '0 auto 2.5rem' }} />

        {/* Search & Access Filter Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          {/* Search Box & Category Picker */}
          <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: 'min(100%, 260px)', maxWidth: '580px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#64748b' }} />
              <input 
                type="text" 
                placeholder="Search by title, role, stack, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
            <button 
              onClick={() => setIsCategoryModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap' }}
              title="Pick by profession"
            >
              <Layers style={{ width: '14px', height: '14px' }} />
              <span>Categories</span>
            </button>
          </div>

          {/* 100% Free Templates Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '0.45rem 0.95rem', borderRadius: '12px', color: '#34d399', fontSize: '0.84rem', fontWeight: 800 }}>
            <Sparkles style={{ width: '15px', height: '15px' }} />
            <span>All 55 Templates 100% Free</span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2.5rem', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: selectedCategory === cat.id ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedCategory === cat.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                color: selectedCategory === cat.id ? '#c084fc' : 'var(--text-muted)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Template Grid with 3D Tilt Physics and Luxury Styling */}
        {filteredTemplates.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.25rem' }}>
            {filteredTemplates.map(tpl => {
              const tiltTransform = cardTilts[tpl.id] || 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0) scale3d(1, 1, 1)';

              return (
                <div 
                  key={tpl.id} 
                  onMouseMove={(e) => handleCardMouseMove(e, tpl.id)}
                  onMouseLeave={() => handleCardMouseLeave(tpl.id)}
                  className="glass-panel" 
                  style={{ 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    borderRadius: '20px',
                    transform: tiltTransform,
                    transition: 'transform 0.15s ease-out, box-shadow 0.25s, border-color 0.25s',
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(15, 23, 42, 0.72)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  
                  <TemplateThumbnail tpl={tpl} />

                  {/* Body Content */}
                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                        {tpl.categoryName}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>#{tpl.number}</span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>{tpl.name}</span>
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.35rem', flex: 1 }}>
                      {tpl.description}
                    </p>

                    {/* Features Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                      {tpl.features?.slice(0, 3).map((f, i) => (
                        <span key={i} style={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          border: '1px solid rgba(255,255,255,0.08)', 
                          padding: '0.22rem 0.55rem', 
                          borderRadius: '6px', 
                          fontSize: '0.76rem', 
                          color: '#cbd5e1',
                          fontWeight: 600
                        }}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions: Preview, Edit/Use, and Direct HTML Download */}
                    <div style={{ display: 'flex', gap: '0.65rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                      <Link to={`/templates/preview/${tpl.id}`} className="btn btn-outline btn-sm" style={{ flex: 1, padding: '0.5rem 0.75rem' }} title="Preview 3D interactive layout">
                        <Eye style={{ width: '14px', height: '14px' }} />
                        <span>Preview</span>
                      </Link>

                      <Link to={`/editor/new?template=${tpl.id}`} className="btn btn-primary btn-sm" style={{ flex: 1.4, padding: '0.5rem 0.75rem', fontWeight: 800, textDecoration: 'none' }} title="Enter your profile data & customize template in Studio Editor">
                        <Edit3 style={{ width: '14px', height: '14px' }} />
                        <span>Customize &amp; Create</span>
                      </Link>

                      {/* Instant Download Button */}
                      <button 
                        onClick={() => handleDirectDownload(tpl)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.5rem 0.65rem', borderColor: 'rgba(255,255,255,0.18)' }}
                        title="Download Standalone 3D HTML (Runs Offline with Canvas Animations)"
                      >
                        <Download style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <Filter style={{ width: '48px', height: '48px', color: '#64748b', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>No templates found</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Try clearing your search query or switching categories.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="btn btn-secondary">
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Category Explorer Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
}

