import React, { useState, useEffect } from 'react';
import BookEngine from '../book/BookEngine';
import { getTemplateById } from '../../data/templatesData';
import CategoryCornerStructures from './CategoryCornerStructures';
import Portfolio3DBackground from './Portfolio3DBackground';
import { resolveImageUrl, handleImageError } from '../../utils/imageUtils';
import { getFieldTextStyle, getBoxContrastingTheme, getContrastSafeColor } from '../../data/typographyData';
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Terminal, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  CheckCircle, 
  FileText,
  User,
  FolderGit2,
  Compass,
  Send,
  Camera,
  Shield,
  Play,
  TrendingUp,
  Cpu,
  Palette,
  Check,
  Star,
  Activity,
  Radio,
  Lock,
  Globe,
  CheckCheck
} from 'lucide-react';
import { Github } from '../common/Icons';

export default function TemplateRenderer({ templateId = 'open-book', portfolio = {}, isPreview = false }) {
  const templateKey = (templateId || 'open-book').toLowerCase();
  const template = getTemplateById(templateKey);
  const category = template?.category || (['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(templateKey) ? 'book' : 'modern');
  const isBook = category === 'book' || 
    template?.category === 'book' || 
    template?.layoutType === 'book-3d' || 
    ['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(templateKey);

  const [activePage, setActivePage] = useState(1); // Page 1: Overview, Page 2: Works & Skills, Page 3: Journey & Inquiries

  // 1. 3D Book Portfolio Engine (OpenBook, Vintage Journal, The Biography, Mystic Pages, Flipfolio)
  // Clean, realistic reading stage with zero background animation as requested
  if (isBook) {
    return (
      <div style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1e1b18 0%, #111116 65%, #08080c 100%)',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <BookEngine 
            portfolio={portfolio} 
            isPreview={isPreview} 
          />
        </div>
      </div>
    );
  }

  const profile = portfolio?.profile || {};
  const skills = portfolio?.skills || [];
  const projects = portfolio?.projects || [];
  const experience = portfolio?.experience || [];
  const education = portfolio?.education || [];
  const certifications = portfolio?.certifications || [];
  const socialLinks = portfolio?.socialLinks || {};
  // Background Studio configuration from themeConfig
  const themeConfig = portfolio?.themeConfig || {};
  const bgType = themeConfig.bgType || 'animation';
  const bgStyle = themeConfig.bgStyle || 'template';
  const bgColor = themeConfig.bgColor;
  const bgImage = themeConfig.bgImage;
  const bgDimmer = typeof themeConfig.bgDimmer === 'number' ? themeConfig.bgDimmer : 0.65;
  const bgOpacity = typeof themeConfig.bgOpacity === 'number' ? themeConfig.bgOpacity : 0.65;
  // If user chooses color or image, place that as background INSTEAD of animation
  const isCustomBg = bgType === 'color' || bgType === 'image';
  const showAnimation = !isCustomBg && bgStyle !== 'none' && themeConfig.keepAnimation !== false;

  // Active theme accent color (synced to clicked color/gradient or template default)
  const accentColor = themeConfig.bgAnimationColor || themeConfig.accentColor || template?.accentColor || '#6366f1';

  // Automatically guarantee 100% contrast & visibility across all box cards
  const isLightCategory = category === 'student' || template?.bgType === 'light';
  const defaultBoxBg = isLightCategory ? '#ffffff' : 'rgba(15, 23, 42, 0.88)';
  const boxTheme = getBoxContrastingTheme(themeConfig, defaultBoxBg);
  const effectiveBoxBg = boxTheme.cardBg;

  // Custom typography and text styling for every field guaranteed visible against box background
  const nameStyle = getFieldTextStyle(themeConfig, 'name', { color: boxTheme.headingColor }, effectiveBoxBg);
  const headlineStyle = getFieldTextStyle(themeConfig, 'headline', { color: boxTheme.subtextColor }, effectiveBoxBg);
  const bioStyle = getFieldTextStyle(themeConfig, 'bio', { color: boxTheme.textColor }, effectiveBoxBg);
  const sectionTitleStyle = getFieldTextStyle(themeConfig, 'sectionTitle', { color: boxTheme.headingColor }, effectiveBoxBg);
  const cardTitleStyle = getFieldTextStyle(themeConfig, 'cardTitle', { color: boxTheme.headingColor }, effectiveBoxBg);
  const bodyTextStyle = getFieldTextStyle(themeConfig, 'body', { color: boxTheme.textColor }, effectiveBoxBg);

  const getContainerBgStyle = (defaultBg) => {
    if (bgType === 'color' && bgColor) {
      return { background: bgColor };
    }
    if (bgType === 'image' && bgImage) {
      return {
        backgroundImage: `url(${resolveImageUrl(bgImage)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
    return { background: defaultBg };
  };

  const render3DBackground = (defaultCat, defaultAccent) => {
    if (isBook) return null;
    if (bgType === 'image' && bgImage) {
      return (
        <div style={{ position: 'fixed', inset: 0, background: `rgba(0, 0, 0, ${bgDimmer})`, zIndex: 0, pointerEvents: 'none' }} />
      );
    }
    if (bgType === 'color' || !showAnimation || bgStyle === 'none') {
      return null;
    }
    return (
      <Portfolio3DBackground 
        isPremium={template?.isPremium || portfolio?.isPremium} 
        accentColor={accentColor || defaultAccent} 
        category={defaultCat || category}
        bgStyle={bgStyle}
        opacity={bgOpacity}
        enabled={showAnimation && bgStyle !== 'none'}
        hasCustomBg={false}
      />
    );
  };

  // Smooth scroll helper for continuous 3-page websites
  const scrollToPage = (pageNumber) => {
    setActivePage(pageNumber);
    const el = document.getElementById(`page-${pageNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Universal Multi-Page Sticky Navigation Bar
  const MultiPageNav = ({ 
    brandTitle = '', 
    style = {}, 
    activeStyle = {}, 
    page1Label = '01: Overview', 
    page2Label = '02: Works & Stack', 
    page3Label = '03: Journey & Contact' 
  }) => (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.85rem 1.25rem',
      marginBottom: '2rem',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      flexWrap: 'wrap',
      gap: '0.85rem',
      ...style
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
        <span>{brandTitle || profile.fullName || portfolio?.title || 'Portfolio'}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.35rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '10px' }}>
        <button 
          onClick={() => scrollToPage(1)} 
          className="btn btn-sm interactive-hover-btn"
          style={{
            background: activePage === 1 ? (activeStyle.background || accentColor) : 'transparent',
            color: activePage === 1 ? (activeStyle.color || '#fff') : 'inherit',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            padding: '0.35rem 0.75rem'
          }}
        >
          <User style={{ width: '13px', height: '13px' }} />
          <span>{page1Label}</span>
        </button>
        <button 
          onClick={() => scrollToPage(2)} 
          className="btn btn-sm interactive-hover-btn"
          style={{
            background: activePage === 2 ? (activeStyle.background || accentColor) : 'transparent',
            color: activePage === 2 ? (activeStyle.color || '#fff') : 'inherit',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            padding: '0.35rem 0.75rem'
          }}
        >
          <FolderGit2 style={{ width: '13px', height: '13px' }} />
          <span>{page2Label}</span>
        </button>
        <button 
          onClick={() => scrollToPage(3)} 
          className="btn btn-sm interactive-hover-btn"
          style={{
            background: activePage === 3 ? (activeStyle.background || accentColor) : 'transparent',
            color: activePage === 3 ? (activeStyle.color || '#fff') : 'inherit',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            padding: '0.35rem 0.75rem'
          }}
        >
          <Compass style={{ width: '13px', height: '13px' }} />
          <span>{page3Label}</span>
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // ARCHETYPE A: DEVELOPER & SOFTWARE ENGINEER (Terminal / Monospace Cyberpunk)
  // Continuous 3-Page Scrollable Layout + HUD Corner Brackets
  // =========================================================================
  if (category === 'developer' || templateKey === 'neon-dev' || templateKey === 'terminal-pro') {
    return (
      <div style={{ ...getContainerBgStyle('rgba(5, 7, 14, 0.82)'), color: '#e2e8f0', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-mono)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('developer', accentColor)}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="developer" accentColor={accentColor} />

        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`> DEV_OS // ${profile.fullName || 'ENGINEER'}`}
            style={{ background: 'rgba(5, 7, 14, 0.92)', borderColor: `${accentColor}40`, color: accentColor }}
            activeStyle={{ background: accentColor, color: '#05070e' }}
            page1Label="01: sys://init"
            page2Label="02: repos://view"
            page3Label="03: logs://contact"
          />

          {/* PAGE 1: SYSTEM BOOT & PERSONA OVERVIEW */}
          <section id="page-1" className="portfolio-page-section">
            <div style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, borderRadius: '10px', padding: '1rem 1.5rem', marginBottom: '2.5rem', boxShadow: `0 0 25px ${accentColor}25` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '0.5rem' }}>kernel://dev-runtime-v4.2</span>
              </div>
              <div style={{ color: accentColor, fontSize: '1.05rem', fontWeight: 600 }}>
                $ query --persona --capabilities --full --scrollable
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
              {profile.avatarUrl ? (
                <img 
                  src={resolveImageUrl(profile.avatarUrl)} 
                  alt={profile.fullName || 'Engineer'} 
                  onError={(e) => handleImageError(e, profile.fullName)}
                  style={{ width: '130px', height: '130px', borderRadius: '14px', border: `2px solid ${accentColor}`, boxShadow: `0 0 20px ${accentColor}40`, objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ width: '130px', height: '130px', borderRadius: '14px', background: '#0f172a', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: accentColor }}>
                  &gt;_
                </div>
              )}
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'inline-block', background: `${accentColor}15`, color: accentColor, padding: '0.2rem 0.65rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '0.5rem', border: `1px solid ${accentColor}` }}>
                  ● {profile.statusBadge || 'SYSTEM ONLINE // OPEN FOR CONTRACTS'}
                </div>
                <h1 style={{ fontSize: '2.6rem', textShadow: `0 0 12px ${accentColor}40`, marginBottom: '0.5rem', ...nameStyle }}>
                  {profile.fullName || 'Anonymous Engineer'}
                </h1>
                <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '1.25rem', ...headlineStyle }}>
                  {profile.headline}
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', borderLeft: `3px solid ${accentColor}`, paddingLeft: '1rem', ...bioStyle }}>
                  {profile.bio}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => scrollToPage(2)} className="btn btn-sm interactive-hover-btn" style={{ background: accentColor, color: '#05070e', fontWeight: 800 }}>
                    Inspect Projects &amp; Stack &darr;
                  </button>
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm interactive-hover-btn" style={{ borderColor: accentColor, color: accentColor }}>
                      <Github style={{ width: '14px', height: '14px' }} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: accentColor, color: accentColor }}>PAGE 01 / 03: INIT &amp; PERSONA</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: accentColor, color: accentColor }}>PAGE 02 / 03: REPOS &amp; ARCHITECTURE</span>
          </div>

          {/* PAGE 2: REPOSITORIES, STACK & CODE LABS */}
          <section id="page-2" className="portfolio-page-section">
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ color: accentColor, fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code style={{ width: '20px', height: '20px' }} /> System Architecture &amp; Skill Matrix
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
                {skills.map((s, i) => (
                  <div key={i} className="interactive-hover-card" style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: boxTheme.headingColor, fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{s.name}</div>
                    <div style={{ color: accentColor, fontSize: '0.8rem' }}>{s.category || 'Engineering'} // {s.level || 'Expert'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ color: accentColor, fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles style={{ width: '20px', height: '20px' }} /> Deployed Repositories &amp; Labs
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {projects.map((p, idx) => (
                  <div key={idx} className="interactive-hover-card" style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, padding: '1.5rem', borderRadius: '8px' }}>
                    {p.imageUrl && (
                      <img 
                        src={resolveImageUrl(p.imageUrl)} 
                        alt={p.title} 
                        onError={(e) => handleImageError(e, p.title)}
                        style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', border: `1px solid ${accentColor}30` }} 
                      />
                    )}
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', ...cardTitleStyle }}>{p.title}</h4>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem', ...bodyTextStyle }}>{p.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {(Array.isArray(p.techStack) ? p.techStack : (p.techStack || '').split(',')).map((t, i) => (
                          <span key={i} style={{ fontSize: '0.75rem', background: `${accentColor}18`, color: accentColor, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: accentColor }}>
                          <ArrowUpRight style={{ width: '18px', height: '18px' }} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: accentColor, color: accentColor }}>PAGE 02 / 03: WORKS &amp; ARCHITECTURE</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: accentColor, color: accentColor }}>PAGE 03 / 03: CAREER LOGS &amp; CONTACT</span>
          </div>

          {/* PAGE 3: CAREER ROADMAP & DISPATCH TRANSMISSION */}
          <section id="page-3" className="portfolio-page-section">
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ color: accentColor, fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal style={{ width: '20px', height: '20px' }} /> Career Milestones &amp; Git Commit Log
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {experience.map((e, idx) => (
                  <div key={idx} className="interactive-hover-card" style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, borderLeft: `3px solid ${accentColor}`, padding: '1.25rem 1.5rem', borderRadius: '0 8px 8px 0' }}>
                    <div style={{ fontSize: '1.05rem', ...cardTitleStyle }}>{e.role} @ {e.company}</div>
                    <div style={{ color: accentColor, fontSize: '0.8rem', marginBottom: '0.4rem' }}>{e.period}</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, ...bodyTextStyle }}>{e.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, borderRadius: '12px', padding: '2rem' }}>
              <h3 style={{ color: accentColor, fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: '20px', height: '20px' }} /> Dispatch Transmission
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', color: boxTheme.textColor }}>
                <div><strong style={{ color: boxTheme.headingColor }}>Email:</strong> {profile.email}</div>
                <div><strong style={{ color: boxTheme.headingColor }}>Location:</strong> {profile.location}</div>
                <div><strong style={{ color: boxTheme.headingColor }}>Phone:</strong> {profile.phone}</div>
              </div>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn btn-sm interactive-hover-btn" style={{ background: accentColor, color: '#05070e', fontWeight: 800 }}>
                  <Send style={{ width: '14px', height: '14px' }} /> Open Terminal Mailer
                </a>
              )}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE B: UI/UX & PRODUCT DESIGN (Bento Grid Glassmorphism)
  // Continuous 3-Page Scrollable Layout + Figma Frame Markers
  // =========================================================================
  if (category === 'design' || templateKey === 'bento-grid' || templateKey === 'figma-to-code') {
    return (
      <div style={{ ...getContainerBgStyle('rgba(11, 15, 25, 0.82)'), color: '#f8fafc', minHeight: '100vh', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-sans)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('design', '#ec4899')}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="design" accentColor="#ec4899" />

        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`DESIGN CRAFT // ${profile.fullName || 'PRODUCT DESIGNER'}`}
            style={{ background: 'rgba(11, 15, 25, 0.9)', borderColor: 'rgba(236, 72, 153, 0.3)', color: '#fff' }}
            activeStyle={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff' }}
            page1Label="01: Philosophy"
            page2Label="02: Bento Works"
            page3Label="03: Process & Collab"
          />

          {/* PAGE 1: PHILOSOPHY & PERSONA OVERVIEW */}
          <section id="page-1" className="portfolio-page-section">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="glass-panel interactive-hover-card" style={{ padding: '2.5rem', borderRadius: '24px', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                <span className="badge" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', marginBottom: '1rem' }}>
                  ✦ Figma to Production Engine
                </span>
                <h1 style={{ fontSize: '2.8rem', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem', ...nameStyle }}>
                  {profile.fullName || 'Alex Morgan'}
                </h1>
                <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', ...headlineStyle }}>
                  {profile.headline || 'Principal Product Designer & Design Technologist'}
                </p>
                <p style={{ lineHeight: 1.7, fontSize: '0.98rem', ...bioStyle }}>
                  {profile.bio}
                </p>
              </div>

              <div className="glass-panel interactive-hover-card" style={{ padding: '2.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {profile.avatarUrl ? (
                    <img 
                      src={resolveImageUrl(profile.avatarUrl)} 
                      alt={profile.fullName || 'Designer'} 
                      onError={(e) => handleImageError(e, profile.fullName)}
                      style={{ width: '90px', height: '90px', borderRadius: '22px', objectFit: 'cover', border: '3px solid #ec4899' }} 
                    />
                  ) : (
                    <div style={{ width: '90px', height: '90px', borderRadius: '22px', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', color: '#fff' }}>
                      🎨
                    </div>
                  )}
                  <div>
                    <div style={{ color: boxTheme.mutedColor, fontSize: '0.82rem' }}>LOCATION &amp; BADGE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: boxTheme.headingColor }}>{profile.location || 'Remote Available'}</div>
                    <span className="badge badge-free" style={{ marginTop: '0.35rem' }}>{profile.statusBadge || 'Available for Q2 Projects'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => scrollToPage(2)} className="btn btn-primary btn-sm interactive-hover-btn" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', border: 'none' }}>
                    Explore Case Studies &darr;
                  </button>
                  {profile.email && (
                    <a href={`mailto:${profile.email}`} className="btn btn-outline btn-sm interactive-hover-btn">
                      Direct Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#ec4899', color: '#f472b6' }}>PAGE 01 / 03: PHILOSOPHY</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#ec4899', color: '#f472b6' }}>PAGE 02 / 03: BENTO WORKS</span>
          </div>

          {/* PAGE 2: BENTO WORKS & SKILLS */}
          <section id="page-2" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', ...sectionTitleStyle }}>
              <Palette style={{ width: '22px', height: '22px', color: '#ec4899' }} /> Curated Case Studies
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {projects.map((p, idx) => (
                <div key={idx} className="glass-panel interactive-hover-card" style={{ padding: '2rem', borderRadius: '20px', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                  {p.imageUrl && (
                    <img 
                      src={resolveImageUrl(p.imageUrl)} 
                      alt={p.title} 
                      onError={(e) => handleImageError(e, p.title)}
                      style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} 
                    />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>Product Suite #{idx + 1}</span>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#f472b6' }}>
                        <ExternalLink style={{ width: '16px', height: '16px' }} />
                      </a>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', ...cardTitleStyle }}>{p.title}</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem', ...bodyTextStyle }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(Array.isArray(p.techStack) ? p.techStack : (p.techStack || '').split(',')).map((t, i) => (
                      <span key={i} style={{ background: boxTheme.badgeBg, padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', color: boxTheme.badgeText }}>
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', ...sectionTitleStyle }}>Design Toolkit &amp; Paradigms</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {skills.map((s, i) => (
                <span key={i} className="interactive-hover-card" style={{ background: boxTheme.badgeBg, border: '1px solid rgba(236, 72, 153, 0.3)', color: boxTheme.badgeText, padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600 }}>
                  {s.name}
                </span>
              ))}
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#ec4899', color: '#f472b6' }}>PAGE 02 / 03: BENTO WORKS</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#ec4899', color: '#f472b6' }}>PAGE 03 / 03: PROCESS &amp; COLLAB</span>
          </div>

          {/* PAGE 3: PROCESS & LEADERSHIP */}
          <section id="page-3" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', ...sectionTitleStyle }}>
              <Briefcase style={{ width: '22px', height: '22px', color: '#ec4899' }} /> Experience &amp; Leadership
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {experience.map((e, idx) => (
                <div key={idx} className="glass-panel interactive-hover-card" style={{ padding: '1.75rem', borderRadius: '16px', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.2rem', ...cardTitleStyle }}>{e.role}</h4>
                    <span style={{ fontSize: '0.85rem', color: boxTheme.subtextColor }}>{e.period}</span>
                  </div>
                  <div style={{ color: '#ec4899', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.5rem' }}>{e.company}</div>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, ...bodyTextStyle }}>{e.description}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', ...cardTitleStyle }}>Let’s Build Exceptional Interfaces</h3>
              <p style={{ color: boxTheme.subtextColor, marginBottom: '1.5rem' }}>Open for design direction, UI architecture, and advisory consultations.</p>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn btn-primary interactive-hover-btn" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', border: 'none', padding: '0.75rem 2rem' }}>
                  <Send style={{ width: '16px', height: '16px' }} /> Initiate Collaboration
                </a>
              )}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE C: CREATIVE, PHOTOGRAPHY & ART GALLERY (Cinematic Luxury Serif)
  // Continuous 3-Page Scrollable Layout + Gold Filigree Corners
  // =========================================================================
  if (category === 'creative' || templateKey === 'art-director' || templateKey === 'cinematic') {
    return (
      <div style={{ ...getContainerBgStyle('rgba(10, 10, 12, 0.82)'), color: '#f5f5f7', minHeight: '100vh', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-serif)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('creative', '#d4af37')}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="creative" accentColor="#d4af37" />

        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`GALLERY // ${profile.fullName || 'CURATED'}`}
            style={{ background: 'rgba(10, 10, 12, 0.92)', borderColor: 'rgba(212, 175, 55, 0.3)', color: '#d4af37' }}
            activeStyle={{ background: '#d4af37', color: '#0a0a0c' }}
            page1Label="I. Exhibition"
            page2Label="II. Works"
            page3Label="III. Accolades"
          />

          {/* PAGE 1: EXHIBITION & PERSONA */}
          <section id="page-1" className="portfolio-page-section">
            <div style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
              <div style={{ fontSize: '0.85rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '1rem' }}>
                Curated Exhibition • Anno MMXXVI
              </div>
              <h1 style={{ fontSize: '3.5rem', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: '1.25rem', ...nameStyle }}>
                {profile.fullName || 'Art Director'}
              </h1>
              <p style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto 1.5rem', opacity: 0.9, ...headlineStyle }}>
                "{profile.headline || 'Visual Storyteller, Cinematographer & Creative Producer'}"
              </p>
              <div style={{ width: '60px', height: '1px', background: '#d4af37', margin: '1.5rem auto 2rem' }} />
              <p style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: '750px', margin: '0 auto 2.5rem', ...bioStyle }}>
                {profile.bio}
              </p>
              
              {profile.avatarUrl && (
                <div style={{ margin: '0 auto 2.5rem', width: '150px', height: '150px', borderRadius: '50%', padding: '4px', border: '1px solid #d4af37' }}>
                  <img 
                    src={resolveImageUrl(profile.avatarUrl)} 
                    alt={profile.fullName || 'Artist'} 
                    onError={(e) => handleImageError(e, profile.fullName)}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                </div>
              )}

              <button onClick={() => scrollToPage(2)} className="btn btn-outline interactive-hover-btn" style={{ borderColor: '#d4af37', color: '#d4af37', padding: '0.65rem 2rem' }}>
                View Works &amp; Accolades &darr;
              </button>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#d4af37', color: '#d4af37' }}>CHAPTER I: EXHIBITION</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#d4af37', color: '#d4af37' }}>CHAPTER II: WORKS</span>
          </div>

          {/* PAGE 2: ARTWORKS & MEDIUMS */}
          <section id="page-2" className="portfolio-page-section">
            <h2 style={{ fontSize: '2rem', letterSpacing: '0.08em', marginBottom: '2.5rem', textAlign: 'center', ...sectionTitleStyle }}>
              Selected Portfolio Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
              {projects.map((p, idx) => (
                <div key={idx} className="interactive-hover-card" style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, padding: '2rem', borderRadius: '8px' }}>
                  {p.imageUrl && (
                    <img 
                      src={resolveImageUrl(p.imageUrl)} 
                      alt={p.title} 
                      onError={(e) => handleImageError(e, p.title)}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1.25rem', border: '1px solid rgba(212, 175, 55, 0.2)' }} 
                    />
                  )}
                  <div style={{ fontSize: '0.8rem', color: '#d4af37', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>PIECE NO. 0{idx + 1}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', ...cardTitleStyle }}>{p.title}</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem', ...bodyTextStyle }}>{p.description}</p>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#d4af37', textDecoration: 'underline', fontSize: '0.85rem' }}>
                      Inspect Exhibition Archive &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', borderTop: boxTheme.cardBorder, paddingTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: boxTheme.headingColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Artistic Mediums</h3>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ background: boxTheme.badgeBg, border: '1px solid rgba(212, 175, 55, 0.4)', padding: '0.4rem 1rem', fontSize: '0.88rem', color: boxTheme.badgeText, borderRadius: '4px' }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#d4af37', color: '#d4af37' }}>CHAPTER II: WORKS</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#d4af37', color: '#d4af37' }}>CHAPTER III: ACCOLADES &amp; LETTERS</span>
          </div>

          {/* PAGE 3: ACCOLADES & CONTACT */}
          <section id="page-3" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.8rem', color: '#d4af37', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center', ...sectionTitleStyle }}>
              Career Chronology &amp; Representation
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3.5rem' }}>
              {experience.map((e, idx) => (
                <div key={idx} style={{ borderBottom: boxTheme.cardBorder, paddingBottom: '1.5rem', background: boxTheme.cardBg, padding: '1.5rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', ...cardTitleStyle }}>{e.role}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#d4af37' }}>{e.period}</span>
                  </div>
                  <div style={{ color: boxTheme.subtextColor, fontStyle: 'italic', marginBottom: '0.5rem' }}>{e.company}</div>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, ...bodyTextStyle }}>{e.description}</p>
                </div>
              ))}
            </div>

            <div style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, padding: '2.5rem', textAlign: 'center', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#d4af37', marginBottom: '0.75rem', ...cardTitleStyle }}>Private Commissions &amp; Representation</h3>
              <p style={{ color: boxTheme.subtextColor, marginBottom: '1.5rem' }}>Direct correspondence: <strong style={{ color: boxTheme.headingColor }}>{profile.email}</strong> • Location: <strong style={{ color: boxTheme.headingColor }}>{profile.location}</strong></p>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn btn-sm interactive-hover-btn" style={{ background: '#d4af37', color: '#0a0a0c', fontWeight: 800, padding: '0.65rem 2rem' }}>
                  Send Letter
                </a>
              )}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE D: STUDENT & ACADEMIC CAMPUS LAUNCH (High-Contrast Light Mode)
  // Continuous 3-Page Scrollable Layout + Enhanced Clear Dark Text Visibility
  // =========================================================================
  if (category === 'student' || templateKey === 'campus-launch' || templateKey === 'scholar-space') {
    return (
      <div className="light-template-container" style={{ ...getContainerBgStyle('rgba(248, 250, 252, 0.9)'), color: boxTheme.textColor, minHeight: '100vh', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-sans)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('student', accentColor)}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="student" accentColor={accentColor} />

        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`CAMPUS LAUNCH // ${profile.fullName || 'GRADUATE'}`}
            style={{ background: boxTheme.cardBg, borderColor: boxTheme.cardBorder, color: boxTheme.headingColor, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            activeStyle={{ background: accentColor, color: '#ffffff' }}
            page1Label="01: Academic Overview"
            page2Label="02: Capstones & Projects"
            page3Label="03: Placement Contact"
          />

          {/* PAGE 1: ACADEMIC PROFILE & DEGREE OVERVIEW */}
          <section id="page-1" className="portfolio-page-section">
            <div style={{ 
              background: themeConfig.cardBgColor || (boxTheme.isLight ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : boxTheme.cardBg), 
              border: boxTheme.cardBorder, 
              color: boxTheme.textColor, 
              borderRadius: '16px', 
              padding: '2.5rem', 
              marginBottom: '2.5rem', 
              boxShadow: `0 10px 25px -5px ${accentColor}25` 
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                {profile.avatarUrl ? (
                  <img 
                    src={resolveImageUrl(profile.avatarUrl)} 
                    alt={profile.fullName || 'Student'} 
                    onError={(e) => handleImageError(e, profile.fullName)}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', border: `3px solid ${accentColor}`, objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: `${accentColor}20`, border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: accentColor }}>
                    🎓
                  </div>
                )}
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'inline-block', background: boxTheme.badgeBg, color: accentColor, border: `1px solid ${accentColor}40`, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {profile.statusBadge || '🎓 Graduate Portfolio • Verified Candidate'}
                  </div>
                  <h1 style={{ fontSize: '2.4rem', marginBottom: '0.25rem', ...nameStyle }}>{profile.fullName || 'Graduate Student'}</h1>
                  <p style={{ fontSize: '1.05rem', maxWidth: '600px', marginBottom: '0.75rem', ...headlineStyle }}>{profile.headline}</p>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, ...bioStyle }}>{profile.bio}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {education.map((edu, idx) => (
                <div key={idx} className="interactive-hover-card" style={{ background: boxTheme.cardBg, padding: '1.5rem', borderRadius: '12px', border: boxTheme.cardBorder, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <GraduationCap style={{ width: '28px', height: '28px', color: accentColor, marginBottom: '0.75rem' }} />
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', ...cardTitleStyle }}>{edu.degree}</h3>
                  <p style={{ fontSize: '0.9rem', color: boxTheme.subtextColor, fontWeight: 600, marginBottom: '0.5rem' }}>{edu.school} • {edu.year}</p>
                  {edu.grade && (
                    <div style={{ display: 'inline-block', background: boxTheme.badgeBg, color: boxTheme.badgeText, padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, border: boxTheme.cardBorder }}>
                      CGPA: {edu.grade}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: boxTheme.cardBorder, background: boxTheme.cardBg, color: accentColor }}>PAGE 01 / 03: ACADEMIC OVERVIEW</span>
            <div className="divider-line" style={{ background: boxTheme.cardBorder }} />
            <span className="page-step-badge" style={{ borderColor: boxTheme.cardBorder, background: boxTheme.cardBg, color: accentColor }}>PAGE 02 / 03: CAPSTONES &amp; PROJECTS</span>
          </div>

          {/* PAGE 2: CAPSTONES & PROJECTS */}
          <section id="page-2" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.65rem', marginBottom: '1.5rem', ...sectionTitleStyle }}>
              Capstone Projects &amp; Coursework Labs
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {projects.map((proj, idx) => (
                <div key={idx} className="interactive-hover-card" style={{ background: boxTheme.cardBg, padding: '1.5rem', borderRadius: '12px', border: boxTheme.cardBorder, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  {proj.imageUrl && (
                    <img 
                      src={resolveImageUrl(proj.imageUrl)} 
                      alt={proj.title} 
                      onError={(e) => handleImageError(e, proj.title)}
                      style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} 
                    />
                  )}
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', ...cardTitleStyle }}>{proj.title}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', ...bodyTextStyle }}>{proj.description}</p>
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.88rem', color: accentColor, fontWeight: 700 }}>
                      Live Demo &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, borderRadius: '12px', padding: '1.5rem', marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: boxTheme.headingColor, marginBottom: '0.75rem', ...sectionTitleStyle }}>Coursework Competencies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ background: boxTheme.badgeBg, color: boxTheme.badgeText, border: boxTheme.cardBorder, padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: boxTheme.cardBorder, background: boxTheme.cardBg, color: accentColor }}>PAGE 02 / 03: CAPSTONES &amp; PROJECTS</span>
            <div className="divider-line" style={{ background: boxTheme.cardBorder }} />
            <span className="page-step-badge" style={{ borderColor: boxTheme.cardBorder, background: boxTheme.cardBg, color: accentColor }}>PAGE 03 / 03: PLACEMENT &amp; CONTACT</span>
          </div>

          {/* PAGE 3: CERTIFICATES & PLACEMENT CONTACT */}
          <section id="page-3" className="portfolio-page-section">
            {/* Optional Internships / Experience for Freshers */}
            {experience && experience.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', ...sectionTitleStyle }}>
                  <Briefcase style={{ width: '20px', height: '20px', color: accentColor }} /> Internships &amp; Work Experience
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {experience.map((e, idx) => (
                    <div key={idx} className="interactive-hover-card" style={{ background: boxTheme.cardBg, border: boxTheme.cardBorder, borderLeft: `3px solid ${accentColor}`, padding: '1.25rem 1.5rem', borderRadius: '0 10px 10px 0' }}>
                      <div style={{ fontSize: '1.05rem', ...cardTitleStyle }}>{e.role} @ {e.company}</div>
                      <div style={{ color: accentColor, fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: 600 }}>{e.period}</div>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, ...bodyTextStyle }}>{e.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '1.5rem', ...sectionTitleStyle }}>
              Verified Credentials &amp; Placement Contact
            </h2>
            <div style={{ background: boxTheme.cardBg, padding: '2rem', borderRadius: '14px', border: boxTheme.cardBorder, marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              {certifications && certifications.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: boxTheme.textColor }}>
                      <CheckCircle style={{ width: '18px', height: '18px', color: accentColor, flexShrink: 0 }} />
                      <span><strong style={{ color: boxTheme.headingColor }}>{cert.name}</strong> — {cert.issuer} ({cert.date})</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ borderTop: boxTheme.cardBorder, paddingTop: '1.5rem', color: boxTheme.textColor, fontSize: '0.95rem', lineHeight: 1.8 }}>
                <p><strong style={{ color: boxTheme.headingColor }}>Official Placement Email:</strong> {profile.email}</p>
                <p><strong style={{ color: boxTheme.headingColor }}>Contact Phone:</strong> {profile.phone}</p>
                <p><strong style={{ color: boxTheme.headingColor }}>Campus Base:</strong> {profile.location}</p>
              </div>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn btn-primary btn-sm interactive-hover-btn" style={{ background: accentColor, color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginTop: '1.25rem', fontWeight: 700 }}>
                  <Mail style={{ width: '15px', height: '15px' }} /> Contact Candidate
                </a>
              )}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE E: BUSINESS & EXECUTIVE (Slate Pinstripes & Corporate Monograph)
  // Continuous 3-Page Scrollable Layout + Executive Wax Seal
  // =========================================================================
  if (category === 'business' || templateKey === 'executive-brief' || templateKey === 'consultant-clean') {
    return (
      <div style={{ ...getContainerBgStyle('rgba(14, 19, 31, 0.82)'), color: '#f1f5f9', minHeight: '100vh', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-sans)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('business', '#d97706')}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="business" accentColor="#d97706" />

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`EXECUTIVE BRIEF // ${profile.fullName || 'LEADERSHIP'}`}
            style={{ background: 'rgba(14, 19, 31, 0.92)', borderColor: 'rgba(148, 163, 184, 0.25)', color: '#94a3b8' }}
            activeStyle={{ background: '#1e293b', color: '#f8fafc' }}
            page1Label="01: Executive Brief"
            page2Label="02: Engagements"
            page3Label="03: Advisory"
          />

          {/* PAGE 1: EXECUTIVE BRIEF */}
          <section id="page-1" className="portfolio-page-section">
            <div style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)', paddingBottom: '2.5rem', marginBottom: '2rem' }}>
              <span className="badge" style={{ background: 'rgba(217, 119, 6, 0.15)', color: '#fbbf24', border: '1px solid rgba(217, 119, 6, 0.3)', marginBottom: '1rem' }}>
                Managing Director &bull; Board Advisor
              </span>
              <h1 style={{ fontSize: '3rem', letterSpacing: '-0.02em', marginBottom: '0.75rem', ...nameStyle }}>
                {profile.fullName || 'Executive Leader'}
              </h1>
              <p style={{ fontSize: '1.25rem', maxWidth: '750px', marginBottom: '1.5rem', ...headlineStyle }}>
                {profile.headline}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, maxWidth: '800px', marginBottom: '2rem', ...bioStyle }}>
                {profile.bio}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => scrollToPage(2)} className="btn btn-primary btn-sm interactive-hover-btn" style={{ background: '#1e293b', border: '1px solid #94a3b8' }}>
                  Review Strategic Engagements &darr;
                </button>
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="btn btn-outline btn-sm interactive-hover-btn">
                    Request Consultation
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge">PAGE 01 / 03: EXECUTIVE BRIEF</span>
            <div className="divider-line" />
            <span className="page-step-badge">PAGE 02 / 03: STRATEGIC ENGAGEMENTS</span>
          </div>

          {/* PAGE 2: STRATEGIC ENGAGEMENTS */}
          <section id="page-2" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.75rem', ...sectionTitleStyle }}>
              Strategic Initiatives &amp; Ventures
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {projects.map((p, idx) => (
                <div key={idx} className="glass-panel interactive-hover-card" style={{ padding: '1.75rem', borderRadius: '8px', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                  {p.imageUrl && (
                    <img 
                      src={resolveImageUrl(p.imageUrl)} 
                      alt={p.title} 
                      onError={(e) => handleImageError(e, p.title)}
                      style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem' }} 
                    />
                  )}
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', ...cardTitleStyle }}>{p.title}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, ...bodyTextStyle }}>{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge">PAGE 02 / 03: STRATEGIC ENGAGEMENTS</span>
            <div className="divider-line" />
            <span className="page-step-badge">PAGE 03 / 03: GOVERNANCE &amp; ADVISORY</span>
          </div>

          {/* PAGE 3: GOVERNANCE & ADVISORY */}
          <section id="page-3" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.75rem', ...sectionTitleStyle }}>
              Career Milestones &amp; Advisory
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {experience.map((e, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '8px', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, ...cardTitleStyle }}>{e.role}</h4>
                    <span style={{ fontSize: '0.85rem', color: boxTheme.subtextColor }}>{e.period}</span>
                  </div>
                  <div style={{ color: '#fbbf24', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{e.company}</div>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, ...bodyTextStyle }}>{e.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE F: CYBERSECURITY & DEFENSE (Stealth Matrix Terminal)
  // Continuous 3-Page Scrollable Layout + Matrix HUD
  // =========================================================================
  if (category === 'cybersecurity' || templateKey === 'cyber-shield' || templateKey === 'zero-trust') {
    return (
      <div style={{ ...getContainerBgStyle('rgba(3, 7, 6, 0.82)'), color: '#86efac', minHeight: '100vh', padding: '3rem 1.5rem', fontFamily: 'var(--font-mono)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('cybersecurity', '#22c55e')}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="cybersecurity" accentColor="#22c55e" />

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`[SEC_OPS // ${profile.fullName || 'SECURITY_ANALYST'}]`}
            style={{ background: 'rgba(3, 7, 6, 0.92)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' }}
            activeStyle={{ background: '#22c55e', color: '#030706' }}
            page1Label="01: CLEARANCE"
            page2Label="02: CVE_AUDITS"
            page3Label="03: DISPATCH"
          />

          {/* PAGE 1: CLEARANCE OVERVIEW */}
          <section id="page-1" className="portfolio-page-section">
            <div style={{ border: boxTheme.cardBorder, background: boxTheme.cardBg, padding: '2rem', borderRadius: '6px', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.78rem', background: '#22c55e', color: '#030706', padding: '0.2rem 0.5rem', fontWeight: 800 }}>
                TOP CLEARANCE LEVEL 5
              </span>
              <h1 style={{ fontSize: '2.5rem', marginTop: '0.75rem', marginBottom: '0.5rem', ...nameStyle }}>
                {profile.fullName || 'Security Analyst'}
              </h1>
              <p style={{ fontSize: '1.05rem', marginBottom: '1rem', ...headlineStyle }}>{profile.headline}</p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, ...bioStyle }}>{profile.bio}</p>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#22c55e', color: '#22c55e' }}>PAGE 01 / 03: CLEARANCE</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#22c55e', color: '#22c55e' }}>PAGE 02 / 03: CVE AUDITS</span>
          </div>

          {/* PAGE 2: CVE AUDITS */}
          <section id="page-2" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', ...sectionTitleStyle }}>&gt; DISCLOSED_AUDITS &amp; INFRASTRUCTURE</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              {projects.map((p, idx) => (
                <div key={idx} style={{ border: boxTheme.cardBorder, background: boxTheme.cardBg, padding: '1.5rem', borderRadius: '4px' }}>
                  {p.imageUrl && (
                    <img 
                      src={resolveImageUrl(p.imageUrl)} 
                      alt={p.title} 
                      onError={(e) => handleImageError(e, p.title)}
                      style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #22c55e40' }} 
                    />
                  )}
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', ...cardTitleStyle }}>{p.title}</h3>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.6, ...bodyTextStyle }}>{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#22c55e', color: '#22c55e' }}>PAGE 02 / 03: CVE AUDITS</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#22c55e', color: '#22c55e' }}>PAGE 03 / 03: SECURE DISPATCH</span>
          </div>

          {/* PAGE 3: DISPATCH TRANSMISSION */}
          <section id="page-3" className="portfolio-page-section">
            <div style={{ border: boxTheme.cardBorder, padding: '2rem', background: boxTheme.cardBg, borderRadius: '4px' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#22c55e', marginBottom: '1rem' }}>&gt; ENCRYPTED_DISPATCH_ENDPOINT</h2>
              <p style={{ color: boxTheme.subtextColor, marginBottom: '1.5rem' }}>PGP Fingerprint verified. Direct security correspondence only.</p>
              <div style={{ color: boxTheme.textColor }}><strong style={{ color: boxTheme.headingColor }}>Email:</strong> {profile.email}</div>
              <div style={{ color: boxTheme.textColor }}><strong style={{ color: boxTheme.headingColor }}>Base:</strong> {profile.location}</div>
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE G: FREELANCE, INDIE & CREATOR (Neo-Brutalist Bold Layout)
  // Continuous 3-Page Scrollable Layout + Quirky Sticker Accents
  // =========================================================================
  if (category === 'freelance' || category === 'creator' || templateKey === 'freelancer-bold') {
    return (
      <div style={{ ...getContainerBgStyle('rgba(18, 13, 38, 0.82)'), color: '#f8fafc', minHeight: '100vh', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-sans)', position: 'relative' }}>
        
        {/* 3D Kinetic Canvas Background */}
        {render3DBackground('freelance', '#a855f7')}

        {/* Category Specific Corner Structures */}
        <CategoryCornerStructures category="freelance" accentColor="#a855f7" />

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <MultiPageNav 
            brandTitle={`STUDIO // ${profile.fullName || 'FREELANCER'}`}
            style={{ background: 'rgba(18, 13, 38, 0.92)', borderColor: 'rgba(168, 85, 247, 0.3)', color: '#c084fc' }}
            activeStyle={{ background: '#a855f7', color: '#fff' }}
            page1Label="01: Studio Pitch"
            page2Label="02: Deliverables"
            page3Label="03: Instant Quote"
          />

          {/* PAGE 1: STUDIO PITCH */}
          <section id="page-1" className="portfolio-page-section">
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', background: boxTheme.cardBg, border: boxTheme.cardBorder, marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {profile.avatarUrl ? (
                  <img 
                    src={resolveImageUrl(profile.avatarUrl)} 
                    alt={profile.fullName || 'Creator'} 
                    onError={(e) => handleImageError(e, profile.fullName)}
                    style={{ width: '100px', height: '100px', borderRadius: '20px', objectFit: 'cover', border: '3px solid #a855f7' }} 
                  />
                ) : (
                  <div style={{ width: '100px', height: '100px', borderRadius: '20px', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#fff' }}>
                    ⚡
                  </div>
                )}
                <div>
                  <span className="badge badge-signature" style={{ marginBottom: '0.5rem' }}>⚡ Available for Q2 Retainers</span>
                  <h1 style={{ fontSize: '3rem', marginBottom: '0.25rem', lineHeight: 1.1, ...nameStyle }}>{profile.fullName || 'Studio Creator'}</h1>
                  <p style={{ fontSize: '1.25rem', ...headlineStyle }}>{profile.headline}</p>
                </div>
              </div>
              <p style={{ lineHeight: 1.7, maxWidth: '750px', marginBottom: '2rem', ...bioStyle }}>{profile.bio}</p>
              <button onClick={() => scrollToPage(2)} className="btn btn-primary interactive-hover-btn" style={{ background: '#a855f7', border: 'none' }}>
                See Deliverables &amp; Packages &darr;
              </button>
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 01 -> 02 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#a855f7', color: '#c084fc' }}>PAGE 01 / 03: STUDIO PITCH</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#a855f7', color: '#c084fc' }}>PAGE 02 / 03: CLIENT DELIVERABLES</span>
          </div>

          {/* PAGE 2: CLIENT DELIVERABLES */}
          <section id="page-2" className="portfolio-page-section">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', ...sectionTitleStyle }}>Client Deliverables</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {projects.map((p, idx) => (
                <div key={idx} className="glass-panel interactive-hover-card" style={{ padding: '1.75rem', borderRadius: '16px', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
                  {p.imageUrl && (
                    <img 
                      src={resolveImageUrl(p.imageUrl)} 
                      alt={p.title} 
                      onError={(e) => handleImageError(e, p.title)}
                      style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} 
                    />
                  )}
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', ...cardTitleStyle }}>{p.title}</h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.6, ...bodyTextStyle }}>{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PAGE BREAK DIVIDER 02 -> 03 */}
          <div className="portfolio-page-divider">
            <span className="page-step-badge" style={{ borderColor: '#a855f7', color: '#c084fc' }}>PAGE 02 / 03: DELIVERABLES</span>
            <div className="divider-line" />
            <span className="page-step-badge" style={{ borderColor: '#a855f7', color: '#c084fc' }}>PAGE 03 / 03: INSTANT PROPOSAL</span>
          </div>

          {/* PAGE 3: INSTANT PROPOSAL */}
          <section id="page-3" className="portfolio-page-section">
            <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '20px', textAlign: 'center', background: boxTheme.cardBg, border: boxTheme.cardBorder }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', ...sectionTitleStyle }}>Request an Instant Proposal</h2>
              <p style={{ color: boxTheme.subtextColor, marginBottom: '1.5rem' }}>Ready to launch your product? Reach out directly to book a sprint.</p>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn btn-primary interactive-hover-btn" style={{ background: '#a855f7', border: 'none', padding: '0.75rem 2rem' }}>
                  Email Studio Directly
                </a>
              )}
            </div>
          </section>

        </div>
      </div>
    );
  }

  // =========================================================================
  // ARCHETYPE H: UNIVERSAL MODERN / EXPERIMENTAL / SERVICES
  // Continuous 3-Page Scrollable Layout for All General Portfolios
  // =========================================================================
  const cardStyleCustom = {
    background: boxTheme.cardBg,
    border: boxTheme.cardBorder,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)'
  };

  return (
    <div style={{ ...getContainerBgStyle('rgba(9, 13, 22, 0.88)'), color: boxTheme.textColor, minHeight: '100vh', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      
      {/* 3D Kinetic Canvas Background */}
      {render3DBackground(category, accentColor)}

      {/* Category Specific Corner Structures */}
      <CategoryCornerStructures category={category} accentColor={accentColor} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <MultiPageNav 
          brandTitle={profile.fullName || portfolio?.title || 'FolioVerse Portfolio'}
          style={{ background: boxTheme.cardBg, borderColor: boxTheme.cardBorder, color: boxTheme.headingColor }}
          activeStyle={{ background: accentColor, color: '#fff' }}
          page1Label="01: Overview"
          page2Label="02: Works & Stack"
          page3Label="03: Journey & Inquiries"
        />

        {/* PAGE 1: OVERVIEW & PERSONA */}
        <section id="page-1" className="portfolio-page-section">
          <div className="glass-panel" style={{ ...cardStyleCustom, padding: '3rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
              {profile.avatarUrl ? (
                <img 
                  src={resolveImageUrl(profile.avatarUrl)} 
                  alt={profile.fullName || 'Creator'} 
                  onError={(e) => handleImageError(e, profile.fullName)}
                  style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}` }} 
                />
              ) : (
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#fff' }}>
                  ✦
                </div>
              )}
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span className="badge badge-free" style={{ marginBottom: '0.5rem' }}>{profile.statusBadge || 'Available for Projects'}</span>
                <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', ...nameStyle }}>{profile.fullName || 'Creative Professional'}</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '1rem', ...headlineStyle }}>{profile.headline}</p>
                <p style={{ lineHeight: 1.7, fontSize: '0.98rem', ...bioStyle }}>{profile.bio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE BREAK DIVIDER 01 -> 02 */}
        <div className="portfolio-page-divider">
          <span className="page-step-badge" style={{ color: accentColor, borderColor: accentColor }}>PAGE 01 / 03: OVERVIEW</span>
          <div className="divider-line" />
          <span className="page-step-badge" style={{ color: accentColor, borderColor: accentColor }}>PAGE 02 / 03: WORKS &amp; STACK</span>
        </div>

        {/* PAGE 2: WORKS & STACK */}
        <section id="page-2" className="portfolio-page-section">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', ...sectionTitleStyle }}>Featured Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {projects.map((p, idx) => (
              <div key={idx} className="glass-panel interactive-hover-card" style={{ ...cardStyleCustom, padding: '2rem', borderRadius: '18px' }}>
                {p.imageUrl && (
                  <img 
                    src={resolveImageUrl(p.imageUrl)} 
                    alt={p.title} 
                    onError={(e) => handleImageError(e, p.title)}
                    style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} 
                  />
                )}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', ...cardTitleStyle }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', ...bodyTextStyle }}>{p.description}</p>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: accentColor, fontWeight: 600, fontSize: '0.88rem' }}>
                    View Live Demonstration &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', ...sectionTitleStyle }}>Technical Stack &amp; Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {skills.map((s, i) => (
              <span key={i} className="interactive-hover-card" style={{ background: boxTheme.badgeBg, border: boxTheme.cardBorder, color: boxTheme.badgeText, padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                {s.name}
              </span>
            ))}
          </div>
        </section>

        {/* PAGE BREAK DIVIDER 02 -> 03 */}
        <div className="portfolio-page-divider">
          <span className="page-step-badge" style={{ color: accentColor, borderColor: accentColor }}>PAGE 02 / 03: WORKS &amp; STACK</span>
          <div className="divider-line" />
          <span className="page-step-badge" style={{ color: accentColor, borderColor: accentColor }}>PAGE 03 / 03: JOURNEY &amp; INQUIRIES</span>
        </div>

        {/* PAGE 3: JOURNEY & INQUIRIES */}
        <section id="page-3" className="portfolio-page-section">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', ...sectionTitleStyle }}>Career Journey &amp; Milestones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {experience.map((e, idx) => (
              <div key={idx} className="glass-panel" style={{ ...cardStyleCustom, padding: '1.75rem', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.15rem', ...cardTitleStyle }}>{e.role}</h4>
                  <span style={{ fontSize: '0.85rem', color: accentColor }}>{e.period}</span>
                </div>
                <div style={{ color: boxTheme.subtextColor, fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.5rem' }}>{e.company}</div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, ...bodyTextStyle }}>{e.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ ...cardStyleCustom, padding: '2.5rem', borderRadius: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', ...sectionTitleStyle }}>Direct Correspondence</h3>
            <p style={{ color: boxTheme.subtextColor, marginBottom: '1.5rem' }}>Email: <strong style={{ color: boxTheme.headingColor }}>{profile.email}</strong> • Base: <strong style={{ color: boxTheme.headingColor }}>{profile.location}</strong></p>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="btn btn-primary interactive-hover-btn" style={{ background: accentColor, border: 'none', padding: '0.75rem 2rem' }}>
                <Send style={{ width: '16px', height: '16px' }} /> Send Direct Message
              </a>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
