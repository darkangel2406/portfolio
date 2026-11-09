import React, { useState, useEffect, useRef } from 'react';
import { PageFlip } from 'page-flip';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  List,
  Sparkles,
  Download,
  RotateCcw,
  Feather,
  Compass,
  Scroll,
  Flame,
  Layout,
  CornerDownRight,
  Bookmark
} from 'lucide-react';
import { Github } from '../common/Icons';
import { resolveImageUrl, handleImageError } from '../../utils/imageUtils';
import { getFieldTextStyle, getContrastSafeColor } from '../../data/typographyData';

// Authentic Multi-Layer Acoustic Paper Turn Sound Synthesis via Web Audio API
export const playAuthenticBookPageTurnSound = (isMuted) => {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Layer 1: Dry friction sweep (fibrous paper edge sliding across opposing sheet)
    const frictionLen = 0.22;
    const bufferSize = ctx.sampleRate * frictionLen;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / (ctx.sampleRate * 0.045);
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t);
    }
    const frictionSrc = ctx.createBufferSource();
    frictionSrc.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1900, now);
    bandpass.frequency.exponentialRampToValueAtTime(460, now + frictionLen);
    bandpass.Q.setValueAtTime(2.2, now);

    const frictionGain = ctx.createGain();
    frictionGain.gain.setValueAtTime(0.28, now);
    frictionGain.gain.exponentialRampToValueAtTime(0.001, now + frictionLen);

    frictionSrc.connect(bandpass);
    bandpass.connect(frictionGain);
    frictionGain.connect(ctx.destination);
    frictionSrc.start(now);

    // Layer 2: Air whoosh / body resonance as physical leaf arcs through 3D space
    const whooshLen = 0.28;
    const whooshBuffer = ctx.createBuffer(1, ctx.sampleRate * whooshLen, ctx.sampleRate);
    const whooshData = whooshBuffer.getChannelData(0);
    for (let i = 0; i < whooshData.length; i++) {
      whooshData[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / whooshData.length);
    }
    const whooshSrc = ctx.createBufferSource();
    whooshSrc.buffer = whooshBuffer;

    const whooshFilter = ctx.createBiquadFilter();
    whooshFilter.type = 'lowpass';
    whooshFilter.frequency.setValueAtTime(340, now + 0.02);
    whooshFilter.frequency.exponentialRampToValueAtTime(140, now + whooshLen);

    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0.2, now + 0.02);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + whooshLen);

    whooshSrc.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    whooshSrc.start(now + 0.015);

    // Layer 3: Paper landing slap / settle tap when sheet meets the opposite page
    const tapLen = 0.09;
    const tapBuffer = ctx.createBuffer(1, ctx.sampleRate * tapLen, ctx.sampleRate);
    const tapData = tapBuffer.getChannelData(0);
    for (let i = 0; i < tapData.length; i++) {
      tapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }
    const tapSrc = ctx.createBufferSource();
    tapSrc.buffer = tapBuffer;

    const tapFilter = ctx.createBiquadFilter();
    tapFilter.type = 'highpass';
    tapFilter.frequency.value = 850;

    const tapGain = ctx.createGain();
    tapGain.gain.setValueAtTime(0.12, now + 0.22);
    tapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22 + tapLen);

    tapSrc.connect(tapFilter);
    tapFilter.connect(tapGain);
    tapGain.connect(ctx.destination);
    tapSrc.start(now + 0.21);

  } catch {
    // Audio fallback gracefully handled
  }
};

export default function BookEngine({ portfolio, isPreview = false, themeConfig = {} }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPagesCount, setTotalPagesCount] = useState(8);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState('landscape'); // 'landscape' | 'portrait'
  const [containerWidth, setContainerWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1024);

  const bookContainerRef = useRef(null);
  const pagesSourceRef = useRef(null);
  const pageFlipRef = useRef(null);
  const isMutedRef = useRef(isMuted);
  const currentPageRef = useRef(0);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (bookContainerRef.current) {
          const w = bookContainerRef.current.parentElement?.parentElement?.clientWidth || window.innerWidth;
          setContainerWidth(w);
        }
      }, 120);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const templateId = (portfolio?.templateId || 'open-book').toLowerCase();

  // Distinct artistic theme styling and emblems
  let bookStyleClass = 'book-style-openbook';
  let coverThemeClass = 'cover-theme-leather';
  let emblemIcon = <Sparkles style={{ width: '42px', height: '42px', color: '#d4af37' }} />;
  let bookVibeTitle = 'Heritage Edition';

  if (templateId === 'vintage-journal') {
    bookStyleClass = 'book-style-vintage';
    coverThemeClass = 'cover-theme-vintage';
    emblemIcon = <Feather style={{ width: '44px', height: '44px', color: '#d97706' }} />;
    bookVibeTitle = 'Explorer’s Codex • 1898';
  } else if (templateId === 'the-biography') {
    bookStyleClass = 'book-style-biography';
    coverThemeClass = 'cover-theme-biography';
    emblemIcon = <Scroll style={{ width: '44px', height: '44px', color: '#cbd5e1' }} />;
    bookVibeTitle = 'Executive Monograph';
  } else if (templateId === 'mystic-pages') {
    bookStyleClass = 'book-style-mystic';
    coverThemeClass = 'cover-theme-mystic';
    emblemIcon = <Flame style={{ width: '44px', height: '44px', color: '#c084fc' }} />;
    bookVibeTitle = 'Celestial Grimoire';
  } else if (templateId === 'flipfolio') {
    bookStyleClass = 'book-style-flipfolio';
    coverThemeClass = 'cover-theme-flipfolio';
    emblemIcon = <Layout style={{ width: '44px', height: '44px', color: '#34d399' }} />;
    bookVibeTitle = 'Architectural Lookbook';
  }

  const profile = portfolio?.profile || {};
  const rawSkills = portfolio?.skills || [];
  const skills = Array.isArray(rawSkills) ? rawSkills : Object.values(rawSkills).flat();
  const projects = Array.isArray(portfolio?.projects) ? portfolio.projects : [];
  const experience = Array.isArray(portfolio?.experience) ? portfolio.experience : [];
  const education = Array.isArray(portfolio?.education) ? portfolio.education : [];
  const certifications = Array.isArray(portfolio?.certifications) ? portfolio.certifications : [];
  const socialLinks = portfolio?.socialLinks || {};
  const accentColor = portfolio?.themeConfig?.accentColor || themeConfig?.accentColor || '#3b82f6';
  const isDarkBook = templateId === 'mystic-pages' || templateId === 'the-biography';

  const customHeading = portfolio?.themeConfig?.headingColor;
  const customText = portfolio?.themeConfig?.textColor;
  const customSubtext = portfolio?.themeConfig?.subtextColor;
  const customCardBg = portfolio?.themeConfig?.cardBgColor;
  const customCardBorder = portfolio?.themeConfig?.cardBorderColor;

  const cardStyle = {
    background: customCardBg || (isDarkBook ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.035)'),
    border: customCardBorder ? `1px solid ${customCardBorder}` : (isDarkBook ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)'),
    borderRadius: templateId === 'flipfolio' ? '2px' : '8px',
  };

  const textColor = customText || (isDarkBook ? '#e2e8f0' : (templateId === 'vintage-journal' ? '#382414' : '#0f172a'));
  const headingColor = customHeading || textColor;
  const subtextColor = customSubtext || (isDarkBook ? '#94a3b8' : (templateId === 'vintage-journal' ? '#78350f' : '#64748b'));

  const pageLeafBg = isDarkBook ? '#0b1120' : (templateId === 'vintage-journal' ? '#f7eedb' : (templateId === 'flipfolio' ? '#ffffff' : '#faf7f0'));
  const effectiveCardBg = customCardBg || (isDarkBook ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.035)');

  // Multi-font & custom typography styles with parchment-aware contrast safety
  const nameStyle = getFieldTextStyle(portfolio?.themeConfig, 'name', { color: headingColor }, pageLeafBg);
  const headlineStyle = getFieldTextStyle(portfolio?.themeConfig, 'headline', { color: subtextColor }, pageLeafBg);
  const bioStyle = getFieldTextStyle(portfolio?.themeConfig, 'bio', { color: textColor }, pageLeafBg);
  const sectionTitleStyle = getFieldTextStyle(portfolio?.themeConfig, 'sectionTitle', { color: headingColor }, pageLeafBg);
  const cardTitleStyle = getFieldTextStyle(portfolio?.themeConfig, 'cardTitle', { color: headingColor }, effectiveCardBg);
  const cardBodyTextStyle = getFieldTextStyle(portfolio?.themeConfig, 'body', { color: textColor }, effectiveCardBg);
  const pageBodyTextStyle = getFieldTextStyle(portfolio?.themeConfig, 'body', { color: textColor }, pageLeafBg);
  const pageRoleStyle = getFieldTextStyle(portfolio?.themeConfig, 'cardTitle', { color: headingColor }, pageLeafBg);
  const pageSubtextColor = getContrastSafeColor(subtextColor, pageLeafBg, false, isDarkBook ? '#94a3b8' : '#78350f');
  const pageTextColor = getContrastSafeColor(textColor, pageLeafBg, false, isDarkBook ? '#e2e8f0' : '#0f172a');

  // Calculate container-aware full website dimensions
  const parentWidth = typeof window !== 'undefined' ? (containerWidth || window.innerWidth) : 1024;
  const parentHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
  const isMobileLayout = parentWidth <= 768;

  let baseWidth = 460;
  let baseHeight = 590;

  if (isMobileLayout) {
    baseWidth = Math.min(parentWidth - 28, 440);
    baseHeight = Math.min(Math.round(baseWidth * 1.36), parentHeight - 50);
  } else {
    // Generous full website scale
    const availW = Math.min(parentWidth - 72, 1560);
    const availH = Math.min(parentHeight - 60, 960);
    let spreadW = Math.min(availW, availH * (920 / 590));
    spreadW = Math.max(760, spreadW);
    baseWidth = Math.round(spreadW / 2);
    baseHeight = Math.round(baseWidth * (590 / 460));
  }

  // Initialize and mount StPageFlip instance
  useEffect(() => {
    let flipInstance = null;

    const timer = setTimeout(() => {
      if (!bookContainerRef.current || !pagesSourceRef.current) return;

      // Clean up previous instance
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (e) {
          console.warn('StPageFlip cleanup notice:', e);
        }
        pageFlipRef.current = null;
      }
      bookContainerRef.current.innerHTML = '';

      // Create isolated wrapper inside bookContainerRef
      const mountNode = document.createElement('div');
      mountNode.className = 'st-book-flip-root';
      bookContainerRef.current.appendChild(mountNode);

      // Clone rendered pages from React source template to preserve React DOM tree
      const sourceElements = Array.from(pagesSourceRef.current.children);
      const clonedElements = sourceElements.map(el => el.cloneNode(true));
      clonedElements.forEach(pageEl => mountNode.appendChild(pageEl));

      // Instantiate PageFlip engine with exact classic book dimensions
      flipInstance = new PageFlip(mountNode, {
        width: baseWidth,
        height: baseHeight,
        size: 'fixed',
        minWidth: isMobileLayout ? 260 : 360,
        maxWidth: isMobileLayout ? 480 : 820,
        minHeight: isMobileLayout ? 360 : 480,
        maxHeight: isMobileLayout ? 660 : 1060,
        maxShadowOpacity: isDarkBook ? 0.75 : 0.6,
        showCover: true,
        mobileScrollSupport: true,
        useMouseEvents: true,
        clickEventForward: true,
        usePortrait: isMobileLayout,
        startPage: Math.min(currentPageRef.current, clonedElements.length - 1),
        drawShadow: true,
        flippingTime: 750,
        showPageCorners: true,
        disableFlipByClick: false,
      });

      // Load pages
      if (typeof flipInstance.loadFromHTML === 'function') {
        flipInstance.loadFromHTML(clonedElements);
      } else if (typeof flipInstance.loadFromHtml === 'function') {
        flipInstance.loadFromHtml(clonedElements);
      }

      // Event handlers
      flipInstance.on('flip', (e) => {
        const pageIdx = typeof e.data === 'number' ? e.data : e;
        setCurrentPage(pageIdx);
        currentPageRef.current = pageIdx;
        playAuthenticBookPageTurnSound(isMutedRef.current);
      });

      flipInstance.on('changeState', (e) => {
        if (e.data === 'user_fold') {
          playAuthenticBookPageTurnSound(isMutedRef.current);
        }
      });

      flipInstance.on('changeOrientation', (e) => {
        if (e.data) setCurrentOrientation(e.data);
      });

      // Delegated click handler for page-internal chapter jumps
      const handleInternalClick = (e) => {
        const jumpTarget = e.target.closest('[data-jump-page]');
        if (jumpTarget && flipInstance) {
          const targetPage = parseInt(jumpTarget.getAttribute('data-jump-page'), 10);
          if (!isNaN(targetPage)) {
            flipInstance.flip(targetPage, 'bottom');
          }
        }
      };
      mountNode.addEventListener('click', handleInternalClick);

      pageFlipRef.current = flipInstance;
      setTotalPagesCount(clonedElements.length);
      setIsReady(true);
    }, 40);

    return () => {
      clearTimeout(timer);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (e) {
          // Destructor cleanup
        }
        pageFlipRef.current = null;
      }
    };
  }, [portfolio, templateId, isMobileLayout, baseWidth, baseHeight]);

  // Global Keyboard Navigation (Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight') {
        pageFlipRef.current?.flipNext('bottom');
      } else if (e.key === 'ArrowLeft') {
        pageFlipRef.current?.flipPrev('bottom');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Controls API
  const flipNext = () => pageFlipRef.current?.flipNext('bottom');
  const flipPrev = () => pageFlipRef.current?.flipPrev('bottom');
  const jumpToPage = (pageNum) => pageFlipRef.current?.flip(pageNum, 'bottom');

  return (
    <div className={`book-viewport-wrapper ${bookStyleClass}`} style={{ width: '100%', minHeight: isMobileLayout ? 'auto' : '620px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

      {/* 3D Physical Book Stage */}
      <div className="physical-book-stage">

        {/* Flanking Floating Stage Navigation Buttons for Desktop */}
        {!isMobileLayout && (
          <button
            onClick={flipPrev}
            disabled={currentPage === 0}
            className="book-stage-nav-btn book-nav-prev"
            title="Turn Page Backward (Arrow Left / Grab Left Corner)"
          >
            <ChevronLeft style={{ width: '26px', height: '26px' }} />
          </button>
        )}

        {!isMobileLayout && (
          <button
            onClick={flipNext}
            disabled={currentPage >= totalPagesCount - 1}
            className="book-stage-nav-btn book-nav-next"
            title="Turn Page Forward (Arrow Right / Grab Right Corner)"
          >
            <ChevronRight style={{ width: '26px', height: '26px' }} />
          </button>
        )}

        {/* The 3D Book Chassis & Stack Layering */}
        <div
          className={`st-book-chassis ${isMobileLayout ? 'single-page-mode' : ''}`}
          style={{
            width: isMobileLayout ? `${baseWidth}px` : `${baseWidth * 2}px`,
            height: `${baseHeight}px`,
            maxWidth: '100%'
          }}
        >
          {/* Stacked Paper Edges Simulation */}
          {!isMobileLayout && <div className="book-paper-stack-left" />}
          {!isMobileLayout && <div className="book-paper-stack-right" />}
          <div className="book-paper-stack-bottom" />

          {/* Central Spine Shading Hinge Overlay */}
          {!isMobileLayout && <div className="book-center-spine-highlight" />}

          {/* StPageFlip Interactive Mount Container */}
          <div
            ref={bookContainerRef}
            className="st-book-container"
            style={{
              width: isMobileLayout ? `${baseWidth}px` : `${baseWidth * 2}px`,
              height: `${baseHeight}px`,
              maxWidth: '100%'
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          REACT TEMPLATE SOURCE FOR THE 8 PAGES
          These are rendered by React and cloned into StPageFlip's canvas/DOM physics.
         ========================================================================= */}
      <div ref={pagesSourceRef} style={{ display: 'none' }}>

        {/* ================= PAGE 0: FRONT HARDCOVER ================= */}
        <div className={`st-page ${coverThemeClass}`} data-density="hard">
          <div className="st-page-inner page-cover-front">
            {/* Spine Fold Crease Visual */}
            <div className="cover-spine-crease" />

            <div className="cover-ornate-frame">
              <div className="cover-emblem-wrapper">
                {emblemIcon}
              </div>
              <div className="cover-vibe-tag">
                {bookVibeTitle}
              </div>
              <h1 className="cover-book-title" style={{ ...nameStyle }}>
                {portfolio?.title || 'The Portfolio Book'}
              </h1>
              <div className="cover-golden-divider" />
              <p className="cover-author-name" style={{ ...nameStyle, fontSize: '1.2rem' }}>
                {profile.fullName || 'Alex River'}
              </p>
              <p className="cover-author-headline" style={{ ...headlineStyle }}>
                {profile.headline || 'Full Stack & Software Architect'}
              </p>
              <div className="cover-open-cue" data-jump-page="1">
                <span>Grab corner or click to open</span>
                <CornerDownRight style={{ width: '14px', height: '14px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 1: BIO & TABLE OF CONTENTS ================= */}
        <div className="st-page book-page-left" data-density="soft">
          <div className="st-page-inner">
            <div className="book-gutter-shadow" />

            {/* Header Folio */}
            <div className="page-folio-header">
              <span>{templateId === 'vintage-journal' ? '⚜ CODEX FOLIO NO. 01' : templateId === 'mystic-pages' ? '✦ ARCANA I: ORIGINS ✦' : 'PROLOGUE & FOLIO'}</span>
              <span>CHAPTER I</span>
            </div>

            {/* Author Profile Heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              {profile.avatarUrl ? (
                <img
                  src={resolveImageUrl(profile.avatarUrl)}
                  alt={profile.fullName || 'Author'}
                  onError={(e) => handleImageError(e, profile.fullName)}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}`, flexShrink: 0 }}
                />
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem', color: textColor, flexShrink: 0 }}>
                  {profile.fullName ? profile.fullName.charAt(0) : 'P'}
                </div>
              )}
              <div>
                <h2 style={{ fontSize: '1.5rem', lineHeight: 1.15, ...nameStyle }}>
                  {profile.fullName || 'Alex River'}
                </h2>
                <p style={{ fontSize: '0.86rem', marginTop: '0.2rem', ...headlineStyle }}>
                  {profile.headline || 'Full Stack & Software Architect'}
                </p>
              </div>
            </div>

            {/* Bio Quote */}
            <div style={{
              marginBottom: '1.25rem',
              fontSize: '0.9rem',
              lineHeight: 1.65,
              borderLeft: `3.5px solid ${accentColor}`,
              paddingLeft: '0.85rem',
              background: isDarkBook ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              padding: '0.65rem 0.85rem',
              borderRadius: '0 6px 6px 0',
              ...bioStyle
            }}>
              "{profile.bio || 'Passionate about crafting resilient web architectures, elegant user experiences, and high-performance interactive digital tools.'}"
            </div>

            {/* Interactive Table of Contents */}
            <div className="book-toc-card" style={{ ...cardStyle, padding: '0.9rem 1rem', marginTop: '0.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: textColor }}>
                <List style={{ width: '15px', height: '15px', color: accentColor }} /> Table of Contents
              </h4>
              <ul style={{ listStyle: 'none', fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: 0, margin: 0 }}>
                <li data-jump-page="1" className="book-toc-item" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0.45rem', borderRadius: '4px', color: textColor }}>
                  <span>Chapter I: Biography &amp; Stack 💻</span> <strong style={{ color: accentColor }}>p. 2-3</strong>
                </li>
                <li data-jump-page="3" className="book-toc-item" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0.45rem', borderRadius: '4px', color: textColor }}>
                  <span>Chapter II: Featured Works 🚀</span> <strong style={{ color: accentColor }}>p. 4-5</strong>
                </li>
                <li data-jump-page="5" className="book-toc-item" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0.45rem', borderRadius: '4px', color: textColor }}>
                  <span>Chapter III: Credentials &amp; Contact 📜</span> <strong style={{ color: accentColor }}>p. 6-7</strong>
                </li>
              </ul>
            </div>

            {/* Page Footer */}
            <div className="page-folio-footer">
              <span data-jump-page="0" style={{ cursor: 'pointer', color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <BookOpen style={{ width: '12px', height: '12px' }} /> Close Cover
              </span>
              <span className="book-page-num" style={{ color: subtextColor }}>Page 2 of 8</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.7, color: subtextColor }}>Grab corner ⤴</span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 2: TECHNICAL PROFICIENCIES ================= */}
        <div className="st-page book-page-right" data-density="soft">
          <div className="st-page-inner">
            <div className="book-gutter-shadow" />

            <div className="page-folio-header">
              <span>TECHNICAL PROFICIENCIES</span>
              <span>CHAPTER I</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <Code style={{ width: '18px', height: '18px', color: accentColor }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: textColor, fontWeight: 800 }}>
                {templateId === 'vintage-journal' ? 'Artisan Disciplines ⚜' : 'Core Proficiencies ⚡'}
              </h3>
            </div>

            <p style={{ fontSize: '0.86rem', color: subtextColor, marginBottom: '1rem' }}>
              Mastered frameworks, modern architectures, tools, and paradigms:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    ...cardStyle,
                    color: textColor,
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }} />
                  <strong style={{ color: textColor }}>{typeof skill === 'object' ? skill?.name : skill}</strong>
                  {skill?.level && <span style={{ color: subtextColor, opacity: 0.85 }}>• {skill.level}</span>}
                </span>
              ))}
            </div>

            <div style={{ ...cardStyle, color: textColor, padding: '0.85rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <strong style={{ color: accentColor }}>✨ Specialization:</strong> Full-stack applications, interactive 3D perspective engines, and performant REST microservices.
            </div>

            <div className="page-folio-footer">
              <span />
              <span className="book-page-num" style={{ color: subtextColor }}>Page 3 of 8</span>
              <span data-jump-page="3" style={{ cursor: 'pointer', color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Next: Projects →
              </span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 3: FEATURED PROJECTS ================= */}
        <div className="st-page book-page-left" data-density="soft">
          <div className="st-page-inner">
            <div className="book-gutter-shadow" />

            <div className="page-folio-header">
              <span>FEATURED WORKS</span>
              <span>CHAPTER II</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles style={{ width: '18px', height: '18px', color: accentColor }} />
              <h3 style={{ fontSize: '1.35rem', ...sectionTitleStyle }}>
                {templateId === 'vintage-journal' ? 'Inventions & Works 📜' : 'Selected Projects 🚀'}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ ...cardStyle, padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                    <h4 style={{ fontSize: '0.96rem', ...cardTitleStyle }}>{proj.title}</h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ color: subtextColor }} title="View Source">
                          <Github style={{ width: '14px', height: '14px' }} />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: accentColor }} title="Live Preview">
                          <ExternalLink style={{ width: '14px', height: '14px' }} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.45, marginBottom: '0.45rem', ...cardBodyTextStyle }}>
                    {proj.description}
                  </p>
                  {proj.techStack && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {(Array.isArray(proj.techStack) ? proj.techStack : proj.techStack.split(',')).map((t, i) => (
                        <span key={i} style={{ background: isDarkBook ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: textColor, padding: '0.12rem 0.4rem', borderRadius: '3px', fontSize: '0.7rem' }}>
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="page-folio-footer">
              <span data-jump-page="1" style={{ cursor: 'pointer', color: accentColor, fontWeight: 600 }}>
                ← Prev (p. 2-3)
              </span>
              <span className="book-page-num" style={{ color: subtextColor }}>Page 4 of 8</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.7, color: subtextColor }}>Grab corner ⤴</span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 4: WORK EXPERIENCE ================= */}
        <div className="st-page book-page-right" data-density="soft">
          <div className="st-page-inner">
            <div className="book-gutter-shadow" />

            <div className="page-folio-header">
              <span>CAREER MILESTONES</span>
              <span>CHAPTER II</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Briefcase style={{ width: '18px', height: '18px', color: accentColor }} />
              <h3 style={{ fontSize: '1.35rem', ...sectionTitleStyle }}>
                {templateId === 'the-biography' ? 'Executive Milestones' : 'Work Experience 💼'}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {experience.map((exp, idx) => (
                <div key={idx} style={{ borderLeft: `2.5px solid ${accentColor}`, paddingLeft: '0.85rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '4px', width: '7px', height: '7px', borderRadius: '50%', background: accentColor }} />
                  <h4 style={{ fontSize: '0.94rem', ...pageRoleStyle }}>{exp.role}</h4>
                  <div style={{ fontSize: '0.8rem', color: pageSubtextColor, marginBottom: '0.3rem' }}>
                    <strong>{exp.company}</strong> • <span>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.45, ...pageBodyTextStyle }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="page-folio-footer">
              <span />
              <span className="book-page-num" style={{ color: subtextColor }}>Page 5 of 8</span>
              <span data-jump-page="5" style={{ cursor: 'pointer', color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Next: Credentials →
              </span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 5: EDUCATION & CERTIFICATIONS ================= */}
        <div className="st-page book-page-left" data-density="soft">
          <div className="st-page-inner">
            <div className="book-gutter-shadow" />

            <div className="page-folio-header">
              <span>CREDENTIALS &amp; ACADEMIA</span>
              <span>CHAPTER III</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <GraduationCap style={{ width: '18px', height: '18px', color: accentColor }} />
              <h3 style={{ fontSize: '1.35rem', ...sectionTitleStyle }}>
                Education &amp; Honors 🎓
              </h3>
            </div>

            <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {education.map((edu, idx) => (
                <div key={idx} style={{ ...cardStyle, padding: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', ...cardTitleStyle }}>{edu.degree}</h4>
                  <div style={{ fontSize: '0.78rem', color: subtextColor }}>{edu.school} • {edu.year}</div>
                  {edu.grade && <div style={{ fontSize: '0.76rem', color: accentColor, fontWeight: 600, marginTop: '0.15rem' }}>Score: {edu.grade}</div>}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.6rem' }}>
              <Award style={{ width: '16px', height: '16px', color: accentColor }} />
              <h4 style={{ fontSize: '1rem', ...cardTitleStyle }}>Professional Certifications</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: subtextColor }}>
              {certifications.map((cert, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(0,0,0,0.1)', paddingBottom: '0.2rem' }}>
                  <span>• {cert.name}</span>
                  <span style={{ opacity: 0.7 }}>{cert.issuer}</span>
                </div>
              ))}
            </div>

            <div className="page-folio-footer">
              <span data-jump-page="3" style={{ cursor: 'pointer', color: accentColor, fontWeight: 600 }}>
                ← Prev (p. 4-5)
              </span>
              <span className="book-page-num" style={{ color: subtextColor }}>Page 6 of 8</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.7, color: subtextColor }}>Grab corner ⤴</span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 6: CONTACT & EPILOGUE ================= */}
        <div className="st-page book-page-right" data-density="soft">
          <div className="st-page-inner">
            <div className="book-gutter-shadow" />

            <div className="page-folio-header">
              <span>LETTERS &amp; INQUIRIES</span>
              <span>EPILOGUE</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Mail style={{ width: '18px', height: '18px', color: accentColor }} />
              <h3 style={{ fontSize: '1.35rem', ...sectionTitleStyle }}>
                {templateId === 'vintage-journal' ? 'Epilogue & Letters ✉' : 'Get In Touch ✉'}
              </h3>
            </div>

            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.55, ...pageBodyTextStyle }}>
              I welcome discussions on full-stack architecture, software engineering, and innovative partnerships.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              {profile.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail style={{ width: '14px', height: '14px', color: accentColor }} />
                  <a href={`mailto:${profile.email}`} style={{ fontWeight: 600, color: pageTextColor }}>
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: pageSubtextColor }}>
                  <Phone style={{ width: '14px', height: '14px', color: accentColor }} />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: pageSubtextColor }}>
                  <MapPin style={{ width: '14px', height: '14px', color: accentColor }} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-xs" style={{ ...cardStyle }}>
                  <Github style={{ width: '12px', height: '12px' }} /> GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-xs" style={{ ...cardStyle }}>
                  LinkedIn
                </a>
              )}
            </div>

            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Download style={{ width: '13px', height: '13px' }} /> Download Resume
              </a>
            ) : (
              <button data-jump-page="1" className="btn btn-outline btn-sm" style={{ width: '100%', borderColor: accentColor, color: textColor, marginBottom: '0.5rem' }}>
                <RotateCcw style={{ width: '13px', height: '13px' }} /> Return to Chapter I
              </button>
            )}

            <div className="page-folio-footer">
              <span />
              <span className="book-page-num" style={{ color: subtextColor }}>Page 7 of 8</span>
              <span data-jump-page="7" style={{ cursor: 'pointer', color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Back Cover 📖 →
              </span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 7: BACK HARDCOVER ================= */}
        <div className={`st-page ${coverThemeClass}`} data-density="hard">
          <div className="st-page-inner page-cover-back">
            <div className="cover-spine-crease" style={{ left: 'auto', right: '16px' }} />

            <div className="cover-ornate-frame" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen style={{ width: '44px', height: '44px', marginBottom: '0.85rem', opacity: 0.9, color: 'currentColor' }} />
              <h3 style={{ fontFamily: 'var(--font-book)', letterSpacing: '0.14em', fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                FOLIOVERSE
              </h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.8, fontSize: '0.88rem', maxWidth: '80%', margin: '0 auto 1.5rem' }}>
                Crafted with interactive 3D digital book technology. Bound with physical curvature &amp; dynamic paper physics.
              </p>
              <div className="cover-golden-divider" style={{ width: '60px', margin: '0.5rem auto 1.5rem' }} />

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button data-jump-page="5" className="btn btn-outline btn-xs" style={{ color: 'inherit', borderColor: 'currentColor' }}>
                  ← Prev (p. 6-7)
                </button>
                <button data-jump-page="0" className="btn btn-primary btn-xs" style={{ background: accentColor, borderColor: accentColor }}>
                  <RotateCcw style={{ width: '12px', height: '12px' }} /> Reopen Cover
                </button>
              </div>

              <div style={{ marginTop: '2rem', fontSize: '0.72rem', opacity: 0.65, letterSpacing: '0.1em' }}>
                Anno MMXXVI • Edition Authentica
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
