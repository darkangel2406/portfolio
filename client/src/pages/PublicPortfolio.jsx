import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import TemplateRenderer from '../components/templates/TemplateRenderer';
import { getTemplateById } from '../data/templatesData';
import { resolveImageUrl } from '../utils/imageUtils';
import { BookOpen, Sparkles, AlertCircle, Share2, Check, Download, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadPortfolioAsHtml } from '../utils/portfolioExporter';
import AdBanner from '../components/common/AdBanner';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchPublicPortfolio();
  }, [slug]);

  const fetchPublicPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getPublicPortfolio(slug);
      if (res.portfolio) {
        setPortfolio(res.portfolio);
        // Set dynamic SEO meta title
        document.title = res.portfolio.seo?.metaTitle || `${res.portfolio.title} | FolioVerse`;
      }
    } catch (err) {
      setError(err.message || 'Portfolio not found or currently in private draft mode.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        <div style={{ textAlign: 'center' }}>
          <BookOpen style={{ width: '40px', height: '40px', color: '#6366f1', margin: '0 auto 1rem', animation: 'pulse 1.5s infinite' }} />
          <p style={{ fontSize: '1.05rem' }}>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div className="glass-panel" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
          <AlertCircle style={{ width: '48px', height: '48px', color: '#f59e0b', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.75rem' }}>Portfolio Unavailable</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {error || 'This portfolio is either in private draft mode or has not been published.'}
          </p>
          <Link to="/" className="btn btn-primary">
            Visit FolioVerse
          </Link>
        </div>
      </div>
    );
  }

  const templateId = (portfolio?.templateId || 'open-book').toLowerCase();
  const template = getTemplateById(templateId);
  const category = portfolio?.category || template?.category || (['open-book', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(templateId) ? 'book' : 'modern');
  const isBookCategory = category === 'book' || 
    template?.category === 'book' || 
    template?.layoutType === 'book-3d' || 
    ['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(templateId);
  const themeConfig = portfolio?.themeConfig || {};
  const isLightCategory = category === 'student' || template?.bgType === 'light';
  const defaultBg = isBookCategory 
    ? 'radial-gradient(ellipse at 50% 40%, #1e1b18 0%, #111116 65%, #08080c 100%)' 
    : (isLightCategory ? '#f8fafc' : '#090d16');

  const bgType = themeConfig.bgType || 'animation';
  const bgColor = themeConfig.bgColor || defaultBg;
  const bgImage = themeConfig.bgImage || '';
  const bgDimmer = typeof themeConfig.bgDimmer === 'number' ? themeConfig.bgDimmer : 0.65;

  const containerBgStyle = bgType === 'color' 
    ? { background: bgColor }
    : (bgType === 'image' && bgImage
        ? { backgroundImage: `url(${resolveImageUrl(bgImage)})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
        : { background: defaultBg });

  return (
    <div style={{ minHeight: '100vh', ...containerBgStyle, position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Image Dimmer Layer */}
      {bgType === 'image' && bgImage && (
        <div style={{ position: 'fixed', inset: 0, background: `rgba(0, 0, 0, ${bgDimmer})`, zIndex: 0, pointerEvents: 'none' }} />
      )}

      {/* Top Floating Controls */}
      <div style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 100, display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
        <Link 
          to={portfolio.id ? `/editor/${portfolio.id}` : `/editor/new?template=${portfolio.templateId || 'open-book'}`}
          className="btn btn-primary btn-sm interactive-hover-btn"
          style={{ boxShadow: '0 4px 15px rgba(99, 102, 241, 0.45)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
          title="Edit this portfolio directly"
        >
          <Edit3 style={{ width: '14px', height: '14px' }} />
          <span>Edit This Portfolio</span>
        </Link>

        <button 
          onClick={() => {
            confetti({ particleCount: 60, spread: 55 });
            downloadPortfolioAsHtml(portfolio);
          }}
          className="btn btn-secondary btn-sm interactive-hover-btn"
          style={{ background: isLightCategory ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: isLightCategory ? '#0f172a' : '#fff' }}
          title="Download 100% Offline Standalone 3D Portfolio"
        >
          <Download style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
          <span>Save Offline HTML</span>
        </button>

        <button 
          onClick={handleShare}
          className="btn btn-secondary btn-sm interactive-hover-btn"
          style={{ background: isLightCategory ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', color: isLightCategory ? '#0f172a' : '#fff' }}
        >
          {copied ? <Check style={{ width: '14px', height: '14px', color: '#10b981' }} /> : <Share2 style={{ width: '14px', height: '14px' }} />}
          <span>{copied ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Render the selected template */}
      <TemplateRenderer 
        templateId={portfolio.templateId} 
        portfolio={portfolio} 
        isPreview={false} 
      />

      {/* Dedicated Ad Section for Public Portfolio */}
      <div className="container" style={{ padding: '2rem 1rem 5rem', position: 'relative', zIndex: 2 }}>
        <AdBanner slot="public-portfolio" format="horizontal" />
      </div>

      {/* Subtle Floating Bottom Badge */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: isLightCategory ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.9)',
        color: isLightCategory ? '#0f172a' : '#fff',
        backdropFilter: 'blur(12px)',
        border: isLightCategory ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0.4rem 1rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.82rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}>
        <BookOpen style={{ width: '14px', height: '14px', color: '#818cf8' }} />
        <span style={{ color: isLightCategory ? '#334155' : '#cbd5e1' }}>Built with <strong>FolioVerse</strong></span>
        <span style={{ color: isLightCategory ? '#94a3b8' : '#475569' }}>•</span>
        <Link to="/register" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>
          Create Yours Free
        </Link>
      </div>

    </div>
  );
}
