//Chromatic Halo
/**
 * FolioVerse Standalone Portfolio Website Generator
 * Generates 100% self-contained, responsive, beautifully styled HTML
 * that opens directly in any browser (Chrome, Edge, Safari, Firefox) from local downloads.
 * 
 * Embedded with:
 * - Real Avian Bird Flocking & Wing Flap Physics + Multi-Colored Volumetric Fog for Design & UI/UX
 * - Silicon Circuits, Binary Streams & Logic Nodes for Developer Templates
 * - Real 3D StPageFlip Physical Page Turning Book Engine for Book Templates
 * - Multi-Page Sticky Navigation with Smooth Scrolling & Section Jumps
 * - High Contrast Custom Text & Box Colors
 * - 100% Offline Self-Contained Scripting (Zero external runtime dependencies)
 */

import { getTemplateById } from '../data/templatesData.js';
import { resolveFontFamily, getBoxContrastingTheme, getContrastSafeColor } from '../data/typographyData.js';

export function resolveExportImageUrl(url) {
  if (!url) return '';
  const clean = String(url).trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:') || clean.startsWith('blob:')) {
    return clean;
  }
  const origin = (typeof window !== 'undefined' && window.location && window.location.origin) 
    ? window.location.origin 
    : 'http://localhost:5000';
  if (clean.startsWith('/')) {
    return origin + clean;
  }
  return origin + '/uploads/' + clean;
}

export function generateStandalonePortfolioHtml(portfolio) {
  const p = portfolio || {};
  const title = p.title || 'My Professional Portfolio';
  const profile = p.profile || {};
  const rawSkills = p.skills || [];
  const skills = Array.isArray(rawSkills) ? rawSkills : Object.values(rawSkills).flat();
  const projects = Array.isArray(p.projects) ? p.projects : [];
  const experience = Array.isArray(p.experience) ? p.experience : [];
  const education = Array.isArray(p.education) ? p.education : [];
  const certifications = Array.isArray(p.certifications) ? p.certifications : [];
  const socialLinks = p.socialLinks || {};
  const templateId = (p.templateId || 'open-book').toLowerCase();
  const template = getTemplateById(templateId);
  const category = template?.category || (['open-book', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(templateId) ? 'book' : 'modern');

  const themeConfig = p.themeConfig || {};
  const isLightCategory = category === 'student' || template?.bgType === 'light';
  const defaultBg = isLightCategory ? '#ffffff' : 'rgba(15, 23, 42, 0.88)';
  const boxTheme = getBoxContrastingTheme(themeConfig, defaultBg);
  const accentColor = themeConfig.bgAnimationColor || themeConfig.accentColor || template?.accentColor || '#6366f1';
  const headingColor = boxTheme.headingColor;
  const textColor = boxTheme.textColor;
  const subtextColor = boxTheme.subtextColor;
  const cardBgColor = boxTheme.cardBg;
  const cardBorderColor = boxTheme.cardBorderColor || boxTheme.cardBorder;
  const isPremium = Boolean(p.isPremium || themeConfig.isPremium);

  // Background Studio configuration
  const bgType = themeConfig.bgType || 'animation';
  const bgStyle = themeConfig.bgStyle || 'template';
  const bgColor = themeConfig.bgColor || '#080b14';
  const bgImage = themeConfig.bgImage || '';
  const bgDimmer = typeof themeConfig.bgDimmer === 'number' ? themeConfig.bgDimmer : 0.65;
  const bgOpacity = typeof themeConfig.bgOpacity === 'number' ? themeConfig.bgOpacity : 0.65;
  const isBookTemplate = category === 'book' || 
    template?.category === 'book' || 
    template?.layoutType === 'book-3d' || 
    ['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(templateId);
  // For book templates, image uploads & background animations are completely disabled to maintain pure physical 3D book focus
  const isCustomBg = isBookTemplate ? (bgType === 'color' && bgColor) : (bgType === 'color' || bgType === 'image');
  const showAnimation = isBookTemplate ? false : (!isCustomBg && bgStyle !== 'none');

  const esc = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  if (isBookTemplate) {
    return generate3DBookHtml({
      title,
      profile,
      skills,
      projects,
      experience,
      education,
      certifications,
      socialLinks,
      templateId,
      themeConfig,
      accentColor,
      headingColor,
      textColor,
      subtextColor,
      cardBgColor,
      cardBorderColor,
      isPremium,
      bgType,
      bgStyle,
      bgColor,
      bgImage,
      bgDimmer,
      bgOpacity,
      showAnimation,
      esc
    });
  }

  return generateWebsiteHtml({
    title,
    profile,
    skills,
    projects,
    experience,
    education,
    certifications,
    socialLinks,
    templateId,
    category,
    themeConfig,
    accentColor,
    headingColor,
    textColor,
    subtextColor,
    cardBgColor,
    cardBorderColor,
    isPremium,
    bgType,
    bgStyle,
    bgColor,
    bgImage,
    bgDimmer,
    bgOpacity,
    showAnimation,
    esc
  });
}

/**
 * Synthesizes zero-asset interactive Web Audio button & link feedback sounds for exported portfolios.
 * Timbres: 'nav' click, 'link' harmonic chime, 'chapter' marimba tap, 'action' punchy pop, 'util' micro-tick.
 */
function getAcousticButtonSoundScript() {
  return `
  <!-- Acoustic Button & Link Interaction Sounds System -->
  <script>
    (function() {
      var audioCtx = null;
      function getAudioCtx() {
        if (!audioCtx) {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (AC) audioCtx = new AC();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume().catch(function() {});
        }
        return audioCtx;
      }

      function playSound(type) {
        try {
          var ctx = getAudioCtx();
          if (!ctx) return;
          var now = ctx.currentTime;

          if (type === 'nav') {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            var filter = ctx.createBiquadFilter();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(680, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.038);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2400, now);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
          } else if (type === 'link') {
            var osc1 = ctx.createOscillator();
            var osc2 = ctx.createOscillator();
            var gainL = ctx.createGain();
            osc1.type = 'sine';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(1174.66, now);
            osc2.frequency.setValueAtTime(1760.00, now);
            gainL.gain.setValueAtTime(0.09, now);
            gainL.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc1.connect(gainL);
            osc2.connect(gainL);
            gainL.connect(ctx.destination);
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.19);
            osc2.stop(now + 0.19);
          } else if (type === 'chapter') {
            var oscC = ctx.createOscillator();
            var filterC = ctx.createBiquadFilter();
            var gainC = ctx.createGain();
            oscC.type = 'sine';
            oscC.frequency.setValueAtTime(540, now);
            oscC.frequency.exponentialRampToValueAtTime(220, now + 0.065);
            filterC.type = 'bandpass';
            filterC.frequency.setValueAtTime(460, now);
            filterC.Q.setValueAtTime(3.0, now);
            gainC.gain.setValueAtTime(0.18, now);
            gainC.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
            oscC.connect(filterC);
            filterC.connect(gainC);
            gainC.connect(ctx.destination);
            oscC.start(now);
            oscC.stop(now + 0.075);
          } else if (type === 'action') {
            var oscA = ctx.createOscillator();
            var gainA = ctx.createGain();
            oscA.type = 'sine';
            oscA.frequency.setValueAtTime(380, now);
            oscA.frequency.exponentialRampToValueAtTime(840, now + 0.045);
            gainA.gain.setValueAtTime(0.16, now);
            gainA.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
            oscA.connect(gainA);
            gainA.connect(ctx.destination);
            oscA.start(now);
            oscA.stop(now + 0.08);
          } else {
            var oscU = ctx.createOscillator();
            var gainU = ctx.createGain();
            oscU.type = 'triangle';
            oscU.frequency.setValueAtTime(1200, now);
            oscU.frequency.exponentialRampToValueAtTime(300, now + 0.022);
            gainU.gain.setValueAtTime(0.1, now);
            gainU.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
            oscU.connect(gainU);
            gainU.connect(ctx.destination);
            oscU.start(now);
            oscU.stop(now + 0.025);
          }
        } catch (e) {}
      }

      document.addEventListener('click', function(e) {
        var el = e.target.closest('button, a, [role="button"], [data-jump-page], input[type="button"], input[type="submit"]');
        if (!el) return;
        if (el.hasAttribute('data-jump-page') || el.classList.contains('tab') || el.getAttribute('role') === 'tab') {
          playSound('chapter');
        } else if (
          (el.id && (el.id.indexOf('prev') !== -1 || el.id.indexOf('next') !== -1)) ||
          el.classList.contains('book-stage-nav-btn') ||
          (el.title && (el.title.toLowerCase().indexOf('turn') !== -1 || el.title.toLowerCase().indexOf('page') !== -1))
        ) {
          playSound('nav');
        } else if (el.tagName === 'A' || el.getAttribute('href') || (el.className && el.className.indexOf('link') !== -1)) {
          playSound('link');
        } else if (el.classList.contains('btn-primary') || (el.innerText && el.innerText.toLowerCase().indexOf('download') !== -1)) {
          playSound('action');
        } else {
          playSound('util');
        }
      }, true);
    })();
  </script>`;
}

/**
 * 60 FPS Category Material Antigravity Animation Script for Downloaded Standalone Portfolios
 * Supports all 10 categories with authentic physics and interactive cursor reactivity
 */
function getCategoryAnimationScript(category, accentColor, bgStyle = 'template') {
  if (bgStyle === 'none') return '';

  const styleMap = {
    template: (category || 'design').toLowerCase(),
    developer: 'developer',
    circuits: 'developer',
    student: 'student',
    net: 'student',
    design: 'design',
    birds: 'birds',
    freelance: 'freelance',
    creative: 'creative',
    waves: 'creative',
    business: 'business',
    creator: 'creator',
    cybersecurity: 'cybersecurity',
    cyber: 'cybersecurity',
    services: 'services',
    studio: 'services',
    aurora: 'aurora',
    nebula: 'aurora',
    modern: 'modern',
    halo: 'halo'
  };

  const catStr = String(category || '').toLowerCase();
  const isBookCat = catStr === 'book' || ['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(catStr);
  if (isBookCat) return '';

  const targetCat = (bgStyle && bgStyle !== 'template' && styleMap[bgStyle])
    ? styleMap[bgStyle]
    : (catStr || 'design');

  return `
    ${targetCat === 'birds' ? `
      <!-- Weather Time Controls: Exclusively for Real Birds & Clouds animation -->
      <div id="birds-weather-bar" style="position: fixed; bottom: 68px; right: 16px; z-index: 99999; display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: rgba(15, 23, 42, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 9999px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45); user-select: none;">
        <button id="btn-sun-time" onclick="window.setWeatherOverride('sun')" style="display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; border: 1px solid transparent; background: rgba(255, 255, 255, 0.08); color: #fff; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.25s ease;" title="Switch to Sun Time (Serene Blue Sky & Radiant Sun)">
          <span style="font-size: 1rem;">☀️</span>
          <span>Sun Time</span>
        </button>
        <button id="btn-rain-time" onclick="window.setWeatherOverride('rain')" style="display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; border: 1px solid transparent; background: rgba(255, 255, 255, 0.08); color: #fff; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.25s ease;" title="Switch to Rain Time (Storm Sky, Broad Lightning, Thunder & Bird Bone Explosions)">
          <span style="font-size: 1rem;">🌧️</span>
          <span>Rain Time</span>
        </button>
      </div>
      <script>
        let activeWeatherOverride = null;
        window.setWeatherOverride = function(mode) {
          if (activeWeatherOverride === mode) {
            activeWeatherOverride = null;
          } else {
            activeWeatherOverride = mode;
          }
          var bSun = document.getElementById('btn-sun-time');
          var bRain = document.getElementById('btn-rain-time');
          if (bSun) {
            bSun.style.background = activeWeatherOverride === 'sun' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'rgba(255, 255, 255, 0.08)';
            bSun.style.borderColor = activeWeatherOverride === 'sun' ? '#f59e0b' : 'transparent';
            bSun.style.boxShadow = activeWeatherOverride === 'sun' ? '0 0 16px rgba(245, 158, 11, 0.6)' : 'none';
          }
          if (bRain) {
            bRain.style.background = activeWeatherOverride === 'rain' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'rgba(255, 255, 255, 0.08)';
            bRain.style.borderColor = activeWeatherOverride === 'rain' ? '#38bdf8' : 'transparent';
            bRain.style.boxShadow = activeWeatherOverride === 'rain' ? '0 0 16px rgba(56, 189, 248, 0.6)' : 'none';
          }
          window.dispatchEvent(new CustomEvent('birds_weather_override', { detail: { mode: activeWeatherOverride } }));
        };
      <\/script>
    ` : ''}
    <script>
      (function() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let mouse = { 
          x: width / 2, 
          y: height / 2, 
          targetX: width / 2, 
          targetY: height / 2, 
          vx: 0, 
          vy: 0, 
          speed: 0, 
          isDown: false, 
          lastClickTime: 0 
        };
        let lastMouseX = mouse.x, lastMouseY = mouse.y;
        let scrollY = window.scrollY || 0;
        let scrollVelocity = 0, lastScrollY = scrollY;
        const catKey = '` + targetCat + `';
        const accent = '` + (accentColor || '#6366f1') + `';

        window.addEventListener('resize', () => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
          mouse.targetX = e.clientX;
          mouse.targetY = e.clientY;
        }, { passive: true });

        window.addEventListener('mousedown', () => {
          mouse.isDown = true;
          mouse.lastClickTime = performance.now();
        });

        window.addEventListener('mouseup', () => {
          mouse.isDown = false;
        });

        window.addEventListener('scroll', () => {
          const cy = window.scrollY || 0;
          scrollVelocity = cy - lastScrollY;
          lastScrollY = cy;
          scrollY = cy;
        }, { passive: true });

        let renderFrame;

        // =========================================================================
        // 2. DEVELOPER & TECH
        // =========================================================================
        if (catKey === 'developer') {
          const codeTags = ['<div>', '{ ; }', '=>', 'async/await', '</>', 'const arr = []', '0x7F', 'git commit', '200 OK', 'ARM64', 'λ => x*2', 'npm i', 'SELECT *', 'try/catch'];
          const items = [];
          const numItems = Math.min(26, Math.max(14, Math.floor(width / 70)));

          for (let i = 0; i < numItems; i++) {
            const isCommit = i % 5 === 0;
            const isChip = i % 7 === 0;
            items.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.4,
              vy: (Math.random() - 0.5) * 0.4,
              text: codeTags[i % codeTags.length],
              type: isCommit ? 'commit' : (isChip ? 'chip' : 'tag'),
              pulse: Math.random() * Math.PI * 2,
              pulseSpeed: 0.02 + Math.random() * 0.03
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
            mouse.vx = mouse.x - lastMouseX;
            mouse.vy = mouse.y - lastMouseY;
            mouse.speed = Math.hypot(mouse.vx, mouse.vy);
            lastMouseX = mouse.x; lastMouseY = mouse.y;

            // Silicon Circuit Grid
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.06)';
            ctx.lineWidth = 1;
            const gridStep = 80;
            for (let x = 0; x < width; x += gridStep) {
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = 0; y < height; y += gridStep) {
              ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            // Magnetic Web Connections
            for (let i = 0; i < items.length; i++) {
              for (let j = i + 1; j < items.length; j++) {
                const dx = items[i].x - items[j].x;
                const dy = items[i].y - items[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < 150) {
                  const alpha = (1 - dist / 150) * 0.35;
                  ctx.strokeStyle = 'rgba(0, 255, 204, ' + alpha + ')';
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(items[i].x, items[i].y);
                  ctx.lineTo(items[j].x, items[j].y);
                  ctx.stroke();
                }
              }
            }

            // Render Items
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              item.pulse += item.pulseSpeed;

              const mdx = item.x - mouse.x;
              const mdy = item.y - mouse.y;
              const mdist = Math.hypot(mdx, mdy);

              if (mdist < 180) {
                const force = mouse.speed > 5 ? 6 : (1 - mdist / 180) * 3;
                item.vx += (mdx / mdist) * force;
                item.vy += (mdy / mdist) * force;
                ctx.strokeStyle = 'rgba(99, 102, 241, ' + ((1 - mdist / 180) * 0.6) + ')';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(item.x, item.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
              }

              item.vx *= 0.94;
              item.vy *= 0.94;
              item.x += item.vx + (Math.sin(time * 0.001 + i) * 0.35);
              item.y += item.vy + (Math.cos(time * 0.001 + i) * 0.35);

              if (item.x < -60) item.x = width + 60;
              if (item.x > width + 60) item.x = -60;
              if (item.y < -40) item.y = height + 40;
              if (item.y > height + 40) item.y = -40;

              ctx.save();
              ctx.translate(item.x, item.y);
              const glow = Math.sin(item.pulse) * 0.2 + 0.8;

              if (item.type === 'commit') {
                ctx.fillStyle = '#06b6d4';
                ctx.beginPath();
                ctx.arc(0, 0, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.font = '10px monospace';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText('main~' + (i % 9), 12, 4);
              } else if (item.type === 'chip') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
                ctx.strokeStyle = accent;
                ctx.lineWidth = 1.5;
                ctx.strokeRect(-16, -16, 32, 32);
                ctx.fillRect(-16, -16, 32, 32);
                ctx.fillStyle = '#00ffcc';
                ctx.fillRect(-8, -8, 16, 16);
              } else {
                ctx.font = '12px monospace';
                const textWidth = ctx.measureText(item.text).width;
                const boxW = textWidth + 20;
                const boxH = 24;

                ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
                ctx.strokeStyle = mdist < 180 ? '#00ffcc' : 'rgba(0, 255, 204, 0.4)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 6);
                else ctx.rect(-boxW / 2, -boxH / 2, boxW, boxH);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = mdist < 180 ? '#ffffff' : '#00ffcc';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.text, 0, 0);
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 3. STUDENT & FRESHER
        // =========================================================================
        else if (catKey === 'student') {
          const studentItems = [];
          const numStudents = Math.min(22, Math.max(12, Math.floor(width / 80)));
          const types = ['airplane', 'cap', 'scroll', 'sticky', 'mug'];

          for (let i = 0; i < numStudents; i++) {
            studentItems.push({
              x: Math.random() * width,
              y: Math.random() * height,
              type: types[i % types.length],
              vx: (Math.random() - 0.5) * 0.6,
              vy: (Math.random() - 0.5) * 0.6,
              angle: Math.random() * Math.PI * 2,
              rotSpeed: (Math.random() - 0.5) * 0.02,
              bobPhase: Math.random() * Math.PI * 2,
              scale: 0.8 + Math.random() * 0.4,
              stickyFlip: 0,
              stickyFlipping: false
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
            mouse.vx = mouse.x - lastMouseX;
            mouse.vy = mouse.y - lastMouseY;
            lastMouseX = mouse.x; lastMouseY = mouse.y;

            for (let i = 0; i < studentItems.length; i++) {
              const item = studentItems[i];
              item.bobPhase += 0.03;
              item.angle += item.rotSpeed;

              const dx = item.x - mouse.x;
              const dy = item.y - mouse.y;
              const dist = Math.hypot(dx, dy);

              if (item.type === 'airplane' && dist < 160) {
                const heading = Math.atan2(mouse.vy || -1, mouse.vx || 1);
                item.angle = heading;
                item.vx += Math.cos(heading) * 0.8;
                item.vy += Math.sin(heading) * 0.8;
              }

              if (item.type === 'sticky') {
                if (dist < 120 && !item.stickyFlipping) item.stickyFlipping = true;
                if (item.stickyFlipping) {
                  item.stickyFlip += 0.15;
                  if (item.stickyFlip > Math.PI * 2) {
                    item.stickyFlip = 0;
                    item.stickyFlipping = false;
                  }
                }
              }

              item.vx *= 0.96;
              item.vy *= 0.96;
              item.x += item.vx + Math.sin(item.bobPhase) * 0.4;
              item.y += item.vy + Math.cos(item.bobPhase) * 0.4;

              if (item.x < -60) item.x = width + 60;
              if (item.x > width + 60) item.x = -60;
              if (item.y < -60) item.y = height + 60;
              if (item.y > height + 60) item.y = -60;

              ctx.save();
              ctx.translate(item.x, item.y);
              ctx.rotate(item.angle);
              ctx.scale(item.scale, item.scale);

              if (item.type === 'airplane') {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(18, 0); ctx.lineTo(-14, -10); ctx.lineTo(-6, 0); ctx.closePath();
                ctx.fill(); ctx.stroke();
                ctx.fillStyle = 'rgba(224, 242, 254, 0.8)';
                ctx.beginPath();
                ctx.moveTo(18, 0); ctx.lineTo(-14, 10); ctx.lineTo(-6, 0); ctx.closePath();
                ctx.fill(); ctx.stroke();
              } else if (item.type === 'cap') {
                ctx.fillStyle = '#1e1b4b';
                ctx.strokeStyle = '#818cf8';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, -12); ctx.lineTo(18, 0); ctx.lineTo(0, 12); ctx.lineTo(-18, 0); ctx.closePath();
                ctx.fill(); ctx.stroke();
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(12, 12); ctx.stroke();
              } else if (item.type === 'sticky') {
                const flipScale = Math.cos(item.stickyFlip);
                ctx.scale(1, Math.abs(flipScale));
                ctx.fillStyle = flipScale >= 0 ? '#fef08a' : '#a7f3d0';
                ctx.fillRect(-16, -16, 32, 32);
                ctx.strokeStyle = 'rgba(0,0,0,0.15)';
                ctx.strokeRect(-16, -16, 32, 32);
                if (flipScale < 0) {
                  ctx.font = '8px sans-serif';
                  ctx.fillStyle = '#065f46';
                  ctx.textAlign = 'center';
                  ctx.fillText('WINNER', 0, 3);
                }
              } else if (item.type === 'scroll') {
                ctx.fillStyle = '#fef3c7';
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-14, -7, 28, 14, 4);
                else ctx.rect(-14, -7, 28, 14);
                ctx.fill(); ctx.stroke();
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(-3, -7, 6, 14);
              } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 1.5;
                ctx.fillRect(-8, -8, 16, 16);
                ctx.beginPath();
                ctx.arc(10, 0, 5, -Math.PI / 2, Math.PI / 2);
                ctx.stroke();
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 4. UI/UX & DESIGN
        // =========================================================================
        else if (catKey === 'design') {
          const swatches = [
            ['#6366f1', '#a855f7', '#ec4899'],
            ['#06b6d4', '#3b82f6', '#1d4ed8'],
            ['#10b981', '#14b8a6', '#0284c7'],
            ['#f59e0b', '#ef4444', '#f43f5e']
          ];
          const designItems = [];
          const numDesign = Math.min(20, Math.max(10, Math.floor(width / 85)));

          for (let i = 0; i < numDesign; i++) {
            designItems.push({
              origX: Math.random() * width,
              origY: Math.random() * height,
              z: (i % 3) + 1,
              type: i % 4 === 0 ? 'swatch' : (i % 4 === 1 ? 'card' : (i % 4 === 2 ? 'box' : 'bezier')),
              swatchColors: swatches[i % swatches.length],
              w: i % 4 === 1 ? 95 : 65,
              h: i % 4 === 1 ? 55 : 45,
              stretchX: 0,
              stretchY: 0
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            for (let i = 0; i < designItems.length; i++) {
              const item = designItems[i];
              const parallaxFactor = item.z === 1 ? 0.04 : (item.z === 2 ? 0.02 : 0.008);

              const curX = item.origX + (mouse.x - width / 2) * parallaxFactor + Math.sin(time * 0.001 + i) * 12 + item.stretchX;
              const curY = item.origY + (mouse.y - height / 2) * parallaxFactor + Math.cos(time * 0.001 + i) * 12 + item.stretchY;

              const dx = mouse.x - curX;
              const dy = mouse.y - curY;
              const dist = Math.hypot(dx, dy);

              if (dist < 150) {
                item.stretchX = (dx / dist) * Math.min(35, 150 - dist) * 0.4;
                item.stretchY = (dy / dist) * Math.min(35, 150 - dist) * 0.4;
              } else {
                item.stretchX *= 0.88;
                item.stretchY *= 0.88;
              }

              ctx.save();
              ctx.translate(curX, curY);

              const lightAngle = Math.atan2(mouse.y - curY, mouse.x - curX);
              const specular = Math.max(0.1, 1 - dist / 300);

              if (item.type === 'swatch') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.15 * specular) + ')';
                ctx.lineWidth = 1;
                if (ctx.roundRect) ctx.roundRect(-item.w / 2, -item.h / 2, item.w, item.h, 8);
                else ctx.rect(-item.w / 2, -item.h / 2, item.w, item.h);
                ctx.fill(); ctx.stroke();
                for (let c = 0; c < 3; c++) {
                  ctx.fillStyle = item.swatchColors[c];
                  ctx.beginPath();
                  ctx.arc(-item.w / 2 + 16 + c * 18, 0, 6, 0, Math.PI * 2);
                  ctx.fill();
                }
              } else if (item.type === 'bezier') {
                ctx.strokeStyle = '#c084fc';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(-25, 0); ctx.lineTo(25, 0); ctx.stroke();
                ctx.fillStyle = '#a855f7';
                ctx.beginPath(); ctx.arc(-25, 0, 3.5, 0, Math.PI * 2); ctx.arc(25, 0, 3.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#6366f1';
                ctx.fillRect(-4, -4, 8, 8); ctx.strokeRect(-4, -4, 8, 8);
              } else if (item.type === 'card') {
                const grad = ctx.createLinearGradient(-item.w / 2, -item.h / 2, item.w / 2, item.h / 2);
                grad.addColorStop(0, 'rgba(255, 255, 255, ' + (0.18 * specular) + ')');
                grad.addColorStop(1, 'rgba(15, 23, 42, 0.7)');
                ctx.fillStyle = grad;
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-item.w / 2, -item.h / 2, item.w, item.h, 10);
                else ctx.rect(-item.w / 2, -item.h / 2, item.w, item.h);
                ctx.fill(); ctx.stroke();
                ctx.font = '9px sans-serif';
                ctx.fillStyle = '#cbd5e1';
                ctx.fillText('❖ Component / UI', -item.w / 2 + 10, -item.h / 2 + 16);
              } else {
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(-item.w / 2, -item.h / 2, item.w, item.h);
                ctx.fillStyle = '#38bdf8';
                [[-item.w/2, -item.h/2], [item.w/2, -item.h/2], [-item.w/2, item.h/2], [item.w/2, item.h/2]].forEach(([hx, hy]) => {
                  ctx.fillRect(hx - 2.5, hy - 2.5, 5, 5);
                });
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 5. FREELANCE & BRAND
        // =========================================================================
        else if (catKey === 'freelance') {
          const cards = [];
          const ripples = [];
          const numCards = Math.min(18, Math.max(9, Math.floor(width / 85)));

          const freelanceTypes = ['contract', 'timeTracker', 'rating', 'taskSprint', 'invoice', 'seal', 'card'];

          for (let i = 0; i < numCards; i++) {
            const type = freelanceTypes[i % freelanceTypes.length];
            let w = 110;
            let h = 65;
            if (type === 'contract') { w = 125; h = 72; }
            else if (type === 'timeTracker') { w = 115; h = 55; }
            else if (type === 'rating') { w = 115; h = 50; }
            else if (type === 'taskSprint') { w = 120; h = 52; }
            else if (type === 'invoice') { w = 115; h = 58; }
            else if (type === 'seal') { w = 55; h = 55; }
            else { w = 110; h = 65; }

            cards.push({
              x: Math.random() * width,
              y: Math.random() * height,
              w,
              h,
              type,
              rotX: 0,
              rotY: 0,
              vx: 0,
              vy: 0,
              inertia: 0.96
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            if (mouse.isDown && performance.now() - mouse.lastClickTime < 100) {
              ripples.push({ x: mouse.x, y: mouse.y, radius: 10, alpha: 0.6 });
              mouse.lastClickTime = 0;
            }

            for (let r = ripples.length - 1; r >= 0; r--) {
              const rp = ripples[r];
              rp.radius += 3.5;
              rp.alpha *= 0.94;
              ctx.strokeStyle = 'rgba(217, 119, 6, ' + rp.alpha + ')';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
              ctx.stroke();
              if (rp.alpha < 0.02) ripples.splice(r, 1);
            }

            for (let i = 0; i < cards.length; i++) {
              const c = cards[i];
              const dx = mouse.x - c.x;
              const dy = mouse.y - c.y;
              const targetRotY = (dx / width) * 0.5;
              const targetRotX = -(dy / height) * 0.5;
              c.rotY += (targetRotY - c.rotY) * 0.06;
              c.rotX += (targetRotX - c.rotX) * 0.06;

              c.x += Math.sin(time * 0.0008 + i) * 0.35;
              c.y += Math.cos(time * 0.0008 + i) * 0.35;

              ctx.save();
              ctx.translate(c.x, c.y);

              if (c.type === 'contract') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.55)';
                ctx.lineWidth = 1.4;
                if (ctx.roundRect) ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
                else ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.fill(); ctx.stroke();

                ctx.font = 'bold 8px monospace';
                ctx.fillStyle = '#818cf8';
                ctx.fillText('✓ CLIENT AGREEMENT', -c.w / 2 + 8, -c.h / 2 + 16);
                ctx.fillStyle = '#cbd5e1';
                ctx.font = '7.5px sans-serif';
                ctx.fillText('Scope: Web Architecture', -c.w / 2 + 8, -c.h / 2 + 30);
                ctx.fillStyle = '#34d399';
                ctx.font = 'bold 7.5px monospace';
                ctx.fillText('STATUS: MILESTONE SIGNED', -c.w / 2 + 8, -c.h / 2 + 45);
              } else if (c.type === 'timeTracker') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
                ctx.lineWidth = 1.4;
                if (ctx.roundRect) ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
                else ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.fill(); ctx.stroke();

                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(-c.w / 2 + 12, -c.h / 2 + 16, 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.font = 'bold 8.5px monospace';
                ctx.fillStyle = '#f87171';
                ctx.fillText('04:30:15 • TRACKING', -c.w / 2 + 20, -c.h / 2 + 19);
                ctx.font = '8px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText('$125/hr  Billable Work', -c.w / 2 + 10, -c.h / 2 + 36);
              } else if (c.type === 'rating') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
                ctx.lineWidth = 1.4;
                if (ctx.roundRect) ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
                else ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.fill(); ctx.stroke();

                ctx.font = 'bold 9px sans-serif';
                ctx.fillStyle = '#fbbf24';
                ctx.fillText('★★★★★ 5.0', -c.w / 2 + 10, -c.h / 2 + 18);
                ctx.font = '7.5px sans-serif';
                ctx.fillStyle = '#cbd5e1';
                ctx.fillText('48 Verified Clients', -c.w / 2 + 10, -c.h / 2 + 34);
              } else if (c.type === 'taskSprint') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
                ctx.lineWidth = 1.4;
                if (ctx.roundRect) ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
                else ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.fill(); ctx.stroke();

                ctx.font = 'bold 8px monospace';
                ctx.fillStyle = '#34d399';
                ctx.fillText('⚡ SPRINT: DELIVER MVP', -c.w / 2 + 8, -c.h / 2 + 17);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(-c.w / 2 + 8, -c.h / 2 + 26, c.w - 16, 5);
                ctx.fillStyle = '#10b981';
                ctx.fillRect(-c.w / 2 + 8, -c.h / 2 + 26, (c.w - 16) * 0.85, 5);
              } else if (c.type === 'seal') {
                ctx.beginPath();
                ctx.arc(0, 0, 24, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(217, 119, 6, 0.15)';
                ctx.fill();
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.font = '7px sans-serif';
                ctx.fillStyle = '#fbbf24';
                ctx.textAlign = 'center';
                ctx.fillText('★ VERIFIED ★', 0, 3);
              } else if (c.type === 'invoice') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
                ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
                ctx.lineWidth = 1.2;
                if (ctx.roundRect) ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 6);
                else ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.fill(); ctx.stroke();
                ctx.font = '8px monospace';
                ctx.fillStyle = '#34d399';
                ctx.fillText('INVOICE #082', -c.w / 2 + 8, -c.h / 2 + 16);
                ctx.fillStyle = '#ffffff';
                ctx.fillText('$4,850.00 [PAID]', -c.w / 2 + 8, -c.h / 2 + 30);
              } else {
                const foilGradient = ctx.createLinearGradient(-c.w / 2 + c.rotY * 40, -c.h / 2 + c.rotX * 40, c.w / 2, c.h / 2);
                foilGradient.addColorStop(0, 'rgba(217, 119, 6, 0.3)');
                foilGradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.7)');
                foilGradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)');
                ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
                ctx.strokeStyle = foilGradient;
                ctx.lineWidth = 1.8;
                if (ctx.roundRect) ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
                else ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.fill(); ctx.stroke();
                ctx.font = 'bold 12px serif';
                ctx.fillStyle = '#fbbf24';
                ctx.fillText('FOLIO STUDIO', -c.w / 2 + 12, 4);
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 6. PHOTOGRAPHY & ARTS
        // =========================================================================
        else if (catKey === 'creative') {
          const artItems = [];
          const dustParticles = [];
          const numArts = Math.min(18, Math.max(10, Math.floor(width / 85)));

          const artTypes = ['camera', 'polaroid', 'prism', 'film', 'aperture'];

          for (let i = 0; i < numArts; i++) {
            artItems.push({
              x: Math.random() * width,
              y: Math.random() * height,
              type: artTypes[i % artTypes.length],
              angle: (Math.random() - 0.5) * 0.35,
              targetAngle: (Math.random() - 0.5) * 0.35,
              scale: 0.9 + Math.random() * 0.3
            });
          }

          for (let d = 0; d < 25; d++) {
            dustParticles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: Math.random() * 2 + 0.8,
              vy: -(Math.random() * 0.4 + 0.15),
              opacity: Math.random() * 0.25 + 0.08
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            for (let d = 0; d < dustParticles.length; d++) {
              const dp = dustParticles[d];
              dp.y += dp.vy;
              dp.x += Math.sin(time * 0.001 + d) * 0.3;
              if (dp.y < 0) { dp.y = height; dp.x = Math.random() * width; }
              ctx.fillStyle = 'rgba(251, 191, 36, ' + dp.opacity + ')';
              ctx.beginPath();
              ctx.arc(dp.x, dp.y, dp.size, 0, Math.PI * 2);
              ctx.fill();
            }

            for (let i = 0; i < artItems.length; i++) {
              const item = artItems[i];
              const dx = item.x - mouse.x;
              const dy = item.y - mouse.y;
              const dist = Math.hypot(dx, dy);

              if (item.type === 'polaroid') {
                if (dist < 130) item.angle += (0 - item.angle) * 0.15;
                else item.angle += (item.targetAngle - item.angle) * 0.05;
              }

              item.y += Math.sin(time * 0.001 + i) * 0.4;

              ctx.save();
              ctx.translate(item.x, item.y);
              ctx.rotate(item.angle);
              ctx.scale(item.scale, item.scale);

              if (item.type === 'camera') {
                const cw = 68;
                const ch = 44;

                ctx.fillStyle = '#1c1917';
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 1.4;
                if (ctx.roundRect) ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 6);
                else ctx.rect(-cw / 2, -ch / 2, cw, ch);
                ctx.fill(); ctx.stroke();

                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(-cw / 2, -ch / 2, cw, 12);
                ctx.strokeStyle = '#cbd5e1';
                ctx.strokeRect(-cw / 2, -ch / 2, cw, 12);

                ctx.fillStyle = '#475569';
                ctx.fillRect(-12, -ch / 2 - 6, 24, 7);
                ctx.strokeStyle = '#94a3b8';
                ctx.strokeRect(-12, -ch / 2 - 6, 24, 7);

                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(-6, -ch / 2 - 3, 12, 4);

                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(cw / 2 - 16, -ch / 2 - 4, 8, 4);

                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(-cw / 2 + 10, -ch / 2 + 20, 3.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#0f172a';
                ctx.beginPath(); ctx.arc(0, 4, 17, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();

                const lensGrad = ctx.createLinearGradient(-12, -8, 12, 16);
                lensGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
                lensGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.85)');
                lensGrad.addColorStop(1, 'rgba(168, 85, 247, 0.35)');
                ctx.fillStyle = lensGrad;
                ctx.beginPath(); ctx.arc(0, 4, 12, 0, Math.PI * 2); ctx.fill();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
                ctx.lineWidth = 1;
                for (let a = 0; a < 6; a++) {
                  const aAngle = a * (Math.PI / 3) + time * 0.001;
                  ctx.beginPath();
                  ctx.moveTo(Math.cos(aAngle) * 11, 4 + Math.sin(aAngle) * 11);
                  ctx.lineTo(Math.cos(aAngle + 0.6) * 4, 4 + Math.sin(aAngle + 0.6) * 4);
                  ctx.stroke();
                }

                if (dist < 110 || (Math.floor(time * 0.002 + i) % 7 === 0 && Math.sin(time * 0.01) > 0.88)) {
                  const flashGlow = ctx.createRadialGradient(0, 4, 2, 0, 4, 42);
                  flashGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
                  flashGlow.addColorStop(0.35, 'rgba(251, 191, 36, 0.45)');
                  flashGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');
                  ctx.fillStyle = flashGlow;
                  ctx.beginPath(); ctx.arc(0, 4, 42, 0, Math.PI * 2); ctx.fill();
                }
              } else if (item.type === 'polaroid') {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-25, -35, 50, 62);
                ctx.fillStyle = dist < 130 ? 'rgba(99, 102, 241, 0.4)' : '#1e1b2e';
                ctx.fillRect(-21, -31, 42, 42);
                ctx.font = '6px cursive';
                ctx.fillStyle = '#475569';
                ctx.fillText('Frame #0' + (i % 9), -18, 20);
              } else if (item.type === 'prism') {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(18, 16); ctx.lineTo(-18, 16); ctx.closePath(); ctx.stroke();
                if (dist < 180) {
                  const rainbow = ctx.createLinearGradient(0, 0, 70, 30);
                  rainbow.addColorStop(0, 'rgba(239, 68, 68, 0.7)');
                  rainbow.addColorStop(0.2, 'rgba(245, 158, 11, 0.7)');
                  rainbow.addColorStop(0.4, 'rgba(234, 179, 8, 0.7)');
                  rainbow.addColorStop(0.6, 'rgba(34, 197, 94, 0.7)');
                  rainbow.addColorStop(0.8, 'rgba(56, 189, 248, 0.7)');
                  rainbow.addColorStop(1, 'rgba(168, 85, 247, 0.7)');
                  ctx.strokeStyle = rainbow;
                  ctx.lineWidth = 3;
                  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(80, 25); ctx.stroke();
                }
              } else if (item.type === 'film') {
                ctx.fillStyle = 'rgba(20, 20, 25, 0.85)';
                ctx.strokeStyle = '#64748b';
                ctx.lineWidth = 1;
                ctx.fillRect(-35, -14, 70, 28);
                ctx.strokeRect(-35, -14, 70, 28);
                ctx.fillStyle = '#08080c';
                for (let s = -30; s <= 30; s += 10) {
                  ctx.fillRect(s - 2, -12, 4, 4);
                  ctx.fillRect(s - 2, 8, 4, 4);
                }
              } else {
                ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.stroke();
                for (let a = 0; a < 6; a++) {
                  ctx.beginPath();
                  ctx.moveTo(Math.cos(a * (Math.PI / 3)) * 18, Math.sin(a * (Math.PI / 3)) * 18);
                  ctx.lineTo(Math.cos(a * (Math.PI / 3) + 0.8) * 8, Math.sin(a * (Math.PI / 3) + 0.8) * 8);
                  ctx.stroke();
                }
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 7. BUSINESS & CORP
        // =========================================================================
        else if (catKey === 'business') {
          const numBars = 32;
          const bars = [];
          for (let i = 0; i < numBars; i++) {
            bars.push({ height: 35 + Math.random() * 50, baseHeight: 35 + Math.random() * 50 });
          }
          const tickers = ['+32.4% ▲', 'NASDAQ 100', 'ARR $1.4M', 'EBITDA 94%', 'SERIES B'];

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            const barWidth = width / numBars;
            for (let i = 0; i < numBars; i++) {
              const b = bars[i];
              const barX = i * barWidth;
              const distToMouse = Math.abs(mouse.x - barX);

              if (distToMouse < 220) {
                const boost = (1 - distToMouse / 220) * 80;
                b.height += (b.baseHeight + boost - b.height) * 0.15;
              } else {
                b.height += (b.baseHeight + Math.sin(time * 0.003 + i * 0.3) * 15 - b.height) * 0.05;
              }

              const grad = ctx.createLinearGradient(barX, height, barX, height - b.height);
              grad.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
              grad.addColorStop(1, 'rgba(16, 185, 129, 0.45)');
              ctx.fillStyle = grad;
              ctx.fillRect(barX + 3, height - b.height, barWidth - 6, b.height);
              ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
              ctx.lineWidth = 1;
              ctx.strokeRect(barX + 3, height - b.height, barWidth - 6, b.height);
            }

            // Gyroscope Ring
            const cx = width / 2;
            const cy = height * 0.38;
            const gyroAngleX = (mouse.y - cy) * 0.003;
            const gyroAngleY = (mouse.x - cx) * 0.003;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, 70, Math.max(0.1, Math.abs(70 * Math.cos(gyroAngleX + time * 0.002))), gyroAngleY, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
            ctx.beginPath();
            ctx.ellipse(0, 0, 60, Math.max(0.1, Math.abs(60 * Math.sin(gyroAngleY + time * 0.002))), gyroAngleX, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#60a5fa';
            ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
            ctx.restore();

            ctx.font = '11px monospace';
            for (let t = 0; t < tickers.length; t++) {
              const tx = (t * (width / tickers.length)) + 40;
              const ty = 90 + Math.sin(time * 0.0015 + t) * 12;
              ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
              ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
              if (ctx.roundRect) ctx.roundRect(tx - 35, ty - 12, 70, 24, 6);
              else ctx.rect(tx - 35, ty - 12, 70, 24);
              ctx.fill(); ctx.stroke();
              ctx.fillStyle = '#34d399';
              ctx.textAlign = 'center';
              ctx.fillText(tickers[t], tx, ty + 4);
            }
          };
        }

        // =========================================================================
        // 8. CONTENT CREATOR
        // =========================================================================
        else if (catKey === 'creator') {
          const creatorItems = [];
          const bursts = [];
          const numCreators = Math.min(22, Math.max(12, Math.floor(width / 75)));

          const creatorTypes = ['pen', 'notes', 'sticky', 'timeline', 'play', 'badge', 'mic'];
          const badges = ['🔥 1.4M', '❤️ 250k', '🚀 #1 TREND', '💡 100k', '⚡ VIRAL'];

          for (let i = 0; i < numCreators; i++) {
            creatorItems.push({
              x: Math.random() * width,
              y: Math.random() * height,
              type: creatorTypes[i % creatorTypes.length],
              badgeText: badges[i % badges.length],
              vx: (Math.random() - 0.5) * 0.75,
              vy: (Math.random() - 0.5) * 0.75,
              scale: 0.9 + Math.random() * 0.25,
              vibePhase: Math.random() * Math.PI * 2,
              rot: (Math.random() - 0.5) * 0.35
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.12;
            mouse.y += (mouse.targetY - mouse.y) * 0.12;

            // Audio Frequency Ribbon
            ctx.strokeStyle = '#ec4899';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            const ribbonMidY = height * 0.55;
            for (let x = 0; x < width; x += 15) {
              const distToMouse = Math.abs(x - mouse.x);
              const compressFactor = distToMouse < 180 ? (1 - distToMouse / 180) * 55 : 15;
              const waveY = ribbonMidY + Math.sin(time * 0.005 + x * 0.02) * compressFactor;
              if (x === 0) ctx.moveTo(x, waveY);
              else ctx.lineTo(x, waveY);
            }
            ctx.stroke();

            // Reaction Particles
            for (let b = bursts.length - 1; b >= 0; b--) {
              const pt = bursts[b];
              pt.x += pt.vx; pt.y += pt.vy; pt.alpha *= 0.92;
              ctx.fillStyle = pt.color;
              ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
              if (pt.alpha < 0.04) bursts.splice(b, 1);
            }

            for (let i = 0; i < creatorItems.length; i++) {
              const item = creatorItems[i];
              item.vibePhase += 0.08;
              const dx = item.x - mouse.x;
              const dy = item.y - mouse.y;
              const dist = Math.hypot(dx, dy);

              if (dist < 60 && Math.random() < 0.25) {
                for (let k = 0; k < 4; k++) {
                  bursts.push({
                    x: item.x, y: item.y,
                    vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5,
                    size: Math.random() * 3 + 2,
                    color: Math.random() < 0.5 ? '#f43f5e' : '#f59e0b',
                    alpha: 1
                  });
                }
              }

              item.x += item.vx;
              item.y += item.vy + Math.sin(item.vibePhase) * 0.45;

              if (item.x < -50) item.x = width + 50;
              if (item.x > width + 50) item.x = -50;
              if (item.y < -50) item.y = height + 50;
              if (item.y > height + 50) item.y = -50;

              ctx.save();
              ctx.translate(item.x, item.y);
              ctx.rotate(item.rot);
              ctx.scale(item.scale, item.scale);

              if (item.type === 'pen') {
                ctx.save();
                ctx.rotate(-0.55);
                ctx.fillStyle = '#1e293b';
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 1.2;
                if (ctx.roundRect) ctx.roundRect(-4, -24, 8, 36, 3);
                else ctx.rect(-4, -24, 8, 36);
                ctx.fill(); ctx.stroke();

                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(-4, -14, 8, 3);
                ctx.fillRect(-2, -22, 2, 14);

                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(-3, 12); ctx.lineTo(3, 12); ctx.lineTo(0, 20); ctx.closePath();
                ctx.fill();

                ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(0, 20);
                ctx.quadraticCurveTo(8, 28, 14 + Math.sin(time * 0.005) * 6, 32);
                ctx.stroke();
                ctx.restore();
              } else if (item.type === 'notes') {
                const nw = 54; const nh = 62;
                ctx.fillStyle = '#fef3c7';
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 1.2;
                if (ctx.roundRect) ctx.roundRect(-nw / 2, -nh / 2, nw, nh, 5);
                else ctx.rect(-nw / 2, -nh / 2, nw, nh);
                ctx.fill(); ctx.stroke();

                ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(-nw / 2 + 10, -nh / 2 + 4);
                ctx.lineTo(-nw / 2 + 10, nh / 2 - 4);
                ctx.stroke();

                ctx.font = 'bold 6.5px monospace';
                ctx.fillStyle = '#b45309';
                ctx.fillText('SCRIPT 🎬', -nw / 2 + 14, -nh / 2 + 12);

                ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
                ctx.lineWidth = 0.6;
                ctx.fillStyle = '#475569';
                for (let line = 0; line < 4; line++) {
                  const ly = -nh / 2 + 20 + line * 9;
                  ctx.beginPath();
                  ctx.moveTo(-nw / 2 + 12, ly);
                  ctx.lineTo(nw / 2 - 6, ly);
                  ctx.stroke();
                  ctx.fillRect(-nw / 2 + 14, ly - 4, (nw - 24) * (0.6 + (line % 2) * 0.3), 2);
                }
              } else if (item.type === 'sticky') {
                const sw = 44; const sh = 44;
                ctx.fillStyle = '#fef08a';
                ctx.strokeStyle = 'rgba(202, 138, 4, 0.5)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-sw / 2, -sh / 2);
                ctx.lineTo(sw / 2, -sh / 2);
                ctx.lineTo(sw / 2, sh / 2 - 8);
                ctx.lineTo(sw / 2 - 8, sh / 2);
                ctx.lineTo(-sw / 2, sh / 2);
                ctx.closePath();
                ctx.fill(); ctx.stroke();

                ctx.fillStyle = '#fde047';
                ctx.beginPath();
                ctx.moveTo(sw / 2 - 8, sh / 2);
                ctx.lineTo(sw / 2, sh / 2 - 8);
                ctx.lineTo(sw / 2 - 8, sh / 2 - 8);
                ctx.closePath();
                ctx.fill();

                ctx.font = 'bold 7.5px sans-serif';
                ctx.fillStyle = '#854d0e';
                ctx.textAlign = 'center';
                ctx.fillText('IDEAS 💡', 0, -4);
                ctx.font = '6px sans-serif';
                ctx.fillStyle = '#a16207';
                ctx.fillText('Hook: 0-3s', 0, 7);
                ctx.textAlign = 'start';
              } else if (item.type === 'timeline') {
                const tw = 76; const th = 26;
                ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
                ctx.lineWidth = 1.2;
                if (ctx.roundRect) ctx.roundRect(-tw / 2, -th / 2, tw, th, 5);
                else ctx.rect(-tw / 2, -th / 2, tw, th);
                ctx.fill(); ctx.stroke();

                ctx.fillStyle = '#ec4899';
                ctx.fillRect(-tw / 2 + 5, -th / 2 + 5, 20, 16);
                ctx.fillStyle = '#6366f1';
                ctx.fillRect(-tw / 2 + 27, -th / 2 + 5, 24, 16);
                ctx.fillStyle = '#10b981';
                ctx.fillRect(-tw / 2 + 53, -th / 2 + 5, 18, 16);

                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-tw / 2 + 38, -th / 2 + 3);
                ctx.lineTo(-tw / 2 + 38, th / 2 - 3);
                ctx.stroke();
              } else if (item.type === 'play') {
                ctx.fillStyle = '#f43f5e';
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-18, -14, 36, 28, 8);
                else ctx.rect(-18, -14, 36, 28);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.moveTo(-4, -6); ctx.lineTo(6, 0); ctx.lineTo(-4, 6); ctx.closePath(); ctx.fill();
              } else if (item.type === 'badge') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
                ctx.strokeStyle = '#ec4899';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-26, -12, 52, 24, 12);
                else ctx.rect(-26, -12, 52, 24);
                ctx.fill(); ctx.stroke();
                ctx.font = 'bold 8.5px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.fillText(item.badgeText, 0, 3);
                ctx.textAlign = 'start';
              } else {
                ctx.fillStyle = '#94a3b8';
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(-8, -14, 16, 28, 8);
                else ctx.rect(-8, -14, 16, 28);
                ctx.fill();
                ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1; ctx.stroke();
                ctx.strokeStyle = '#334155'; ctx.lineWidth = 0.8;
                for (let g = -10; g <= 6; g += 4) {
                  ctx.beginPath(); ctx.moveTo(-6, g); ctx.lineTo(6, g); ctx.stroke();
                }
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 9. CYBER & SYSTEMS
        // =========================================================================
        else if (catKey === 'cybersecurity') {
          const cyberNodes = [];
          const numNodes = Math.min(22, Math.max(12, Math.floor(width / 75)));

          for (let i = 0; i < numNodes; i++) {
            cyberNodes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              type: i % 3 === 0 ? 'poly' : (i % 3 === 1 ? 'padlock' : 'hex'),
              glitching: false,
              angle: 0
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;

            ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)';
            ctx.lineWidth = 1;
            const cyberGrid = 60;
            for (let x = 0; x < width; x += cyberGrid) {
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }

            for (let i = 0; i < cyberNodes.length; i++) {
              const node = cyberNodes[i];
              node.angle += 0.02;

              const dx = node.x - mouse.x;
              const dy = node.y - mouse.y;
              const dist = Math.hypot(dx, dy);

              node.glitching = dist < 140;

              if (dist < 100) {
                node.x += (dx / dist) * 4;
                node.y += (dy / dist) * 4;
              }

              ctx.save();
              ctx.translate(node.x, node.y);

              if (node.glitching) {
                ctx.font = '10px monospace';
                ctx.fillStyle = '#22c55e';
                ctx.fillText(Math.random() < 0.5 ? '101100' : '011010', -18, 0);
              } else if (node.type === 'padlock') {
                ctx.strokeStyle = '#22c55e';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(0, -8, 8, Math.PI, 0); ctx.stroke();
                ctx.strokeRect(-12, -8, 24, 18);
                ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
                ctx.fillRect(-12, -8, 24, 18);
              } else if (node.type === 'poly') {
                ctx.rotate(node.angle);
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                for (let p = 0; p < 6; p++) {
                  const px = Math.cos(p * (Math.PI / 3)) * 14;
                  const py = Math.sin(p * (Math.PI / 3)) * 14;
                  if (p === 0) ctx.moveTo(px, py);
                  else ctx.lineTo(px, py);
                }
                ctx.closePath(); ctx.stroke();
              } else {
                ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(-8, -8, 16, 16);
                ctx.fillStyle = '#22c55e';
                ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
              }
              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 10. SERVICES & STUDIO
        // =========================================================================
        else if (catKey === 'services') {
          const cubes = [];
          const numCubes = Math.min(24, Math.max(12, Math.floor(width / 75)));

          for (let i = 0; i < numCubes; i++) {
            cubes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              origX: Math.random() * width,
              origY: Math.random() * height
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            for (let i = 0; i < cubes.length; i++) {
              const cube = cubes[i];
              if (mouse.isDown) {
                const targetX = mouse.x + ((i % 5) - 2) * 26;
                const targetY = mouse.y + (Math.floor(i / 5) - 2) * 26;
                cube.x += (targetX - cube.x) * 0.12;
                cube.y += (targetY - cube.y) * 0.12;
              } else {
                cube.x += (cube.origX - cube.x) * 0.02 + Math.sin(time * 0.001 + i) * 0.3;
                cube.y += (cube.origY - cube.y) * 0.02 + Math.cos(time * 0.001 + i) * 0.3;
              }

              ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
              ctx.strokeStyle = '#94a3b8';
              ctx.lineWidth = 1.2;
              ctx.fillRect(cube.x - 12, cube.y - 12, 24, 24);
              ctx.strokeRect(cube.x - 12, cube.y - 12, 24, 24);
            }

            const rulerX = width * 0.2;
            const rulerY = height * 0.75;
            const measureDist = Math.hypot(mouse.x - rulerX, mouse.y - rulerY) * 0.05;

            ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath(); ctx.moveTo(rulerX, rulerY); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            ctx.setLineDash([]);

            ctx.font = '10px monospace';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText(measureDist.toFixed(1) + ' cm', (rulerX + mouse.x) / 2 + 10, (rulerY + mouse.y) / 2);
          };
        }

        // =========================================================================
        // DEEP NEBULA (Cosmic Nebula with Stars, Shooting Stars & Luminous Moon)
        // =========================================================================
        else if (catKey === 'aurora') {
          const numStars = Math.min(130, Math.floor((width * height) / 10000));
          const stars = [];
          const starColors = ['#ffffff', '#f8fafc', '#e0f2fe', '#bae6fd', '#fed7aa', '#fbcfe8', '#c084fc'];

          for (let i = 0; i < numStars; i++) {
            const isBright = i % 8 === 0;
            stars.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.25,
              vy: (Math.random() - 0.5) * 0.25,
              radius: isBright ? Math.random() * 2.2 + 1.6 : Math.random() * 1.3 + 0.6,
              pulse: Math.random() * Math.PI * 2,
              pulseSpeed: 0.02 + Math.random() * 0.04,
              color: starColors[i % starColors.length],
              isBright: isBright
            });
          }

          const shootingStars = [];
          const maybeSpawnShootingStar = () => {
            if (shootingStars.length < 2 && Math.random() < 0.015) {
              shootingStars.push({
                x: Math.random() * width * 0.8 + width * 0.1,
                y: Math.random() * height * 0.4,
                length: Math.random() * 90 + 60,
                speed: Math.random() * 10 + 14,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                alpha: 1,
                life: 1
              });
            }
          };

          let time = 0;

          renderFrame = function() {
            ctx.clearRect(0, 0, width, height);

            time += 0.012;
            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            scrollVelocity *= 0.9;
            const scrollOffset = scrollVelocity * 0.1;

            const nebCenter1X = width * 0.35 + (mouse.x - width * 0.5) * 0.12;
            const nebCenter1Y = height * 0.45 + (mouse.y - height * 0.5) * 0.12;
            const nebGrad1 = ctx.createRadialGradient(nebCenter1X, nebCenter1Y, 40, nebCenter1X, nebCenter1Y, Math.max(width, height) * 0.65);
            nebGrad1.addColorStop(0, 'rgba(79, 70, 229, 0.22)');
            nebGrad1.addColorStop(0.4, 'rgba(147, 51, 234, 0.12)');
            nebGrad1.addColorStop(0.75, 'rgba(236, 72, 153, 0.04)');
            nebGrad1.addColorStop(1, 'transparent');
            ctx.fillStyle = nebGrad1;
            ctx.fillRect(0, 0, width, height);

            const nebCenter2X = width * 0.72 - (mouse.x - width * 0.5) * 0.08;
            const nebCenter2Y = height * 0.35 - (mouse.y - height * 0.5) * 0.08;
            const nebGrad2 = ctx.createRadialGradient(nebCenter2X, nebCenter2Y, 30, nebCenter2X, nebCenter2Y, Math.max(width, height) * 0.5);
            nebGrad2.addColorStop(0, 'rgba(14, 165, 233, 0.18)');
            nebGrad2.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
            nebGrad2.addColorStop(1, 'transparent');
            ctx.fillStyle = nebGrad2;
            ctx.fillRect(0, 0, width, height);

            // Moon with halo, body, craters and shadow
            const moonBaseX = width * 0.82;
            const moonBaseY = Math.min(height * 0.22, 180);
            const moonX = moonBaseX + (mouse.x - width * 0.5) * 0.035;
            const moonY = moonBaseY + (mouse.y - height * 0.5) * 0.035 + Math.sin(time * 0.5) * 4;
            const moonRadius = Math.min(width * 0.055, 48);

            ctx.save();
            const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.8, moonX, moonY, moonRadius * 3.4);
            moonGlow.addColorStop(0, 'rgba(224, 242, 254, 0.35)');
            moonGlow.addColorStop(0.3, 'rgba(186, 230, 253, 0.18)');
            moonGlow.addColorStop(0.65, 'rgba(147, 197, 253, 0.06)');
            moonGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = moonGlow;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius * 3.4, 0, Math.PI * 2);
            ctx.fill();

            const moonBodyGrad = ctx.createRadialGradient(
              moonX - moonRadius * 0.35, 
              moonY - moonRadius * 0.35, 
              moonRadius * 0.1, 
              moonX, 
              moonY, 
              moonRadius
            );
            moonBodyGrad.addColorStop(0, '#ffffff');
            moonBodyGrad.addColorStop(0.55, '#f1f5f9');
            moonBodyGrad.addColorStop(0.85, '#cbd5e1');
            moonBodyGrad.addColorStop(1, '#94a3b8');

            ctx.fillStyle = moonBodyGrad;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.fill();

            // Craters
            ctx.fillStyle = 'rgba(100, 116, 139, 0.18)';
            ctx.beginPath(); ctx.arc(moonX - moonRadius * 0.25, moonY - moonRadius * 0.1, moonRadius * 0.22, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(moonX + moonRadius * 0.18, moonY - moonRadius * 0.3, moonRadius * 0.16, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(moonX + moonRadius * 0.1, moonY + moonRadius * 0.28, moonRadius * 0.26, 0, Math.PI * 2); ctx.fill();

            // Shadow
            const shadowGrad = ctx.createRadialGradient(
              moonX + moonRadius * 0.65, 
              moonY - moonRadius * 0.35, 
              moonRadius * 0.2, 
              moonX + moonRadius * 0.5, 
              moonY, 
              moonRadius * 1.05
            );
            shadowGrad.addColorStop(0, 'rgba(4, 5, 13, 0.78)');
            shadowGrad.addColorStop(0.7, 'rgba(6, 7, 17, 0.65)');
            shadowGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = shadowGrad;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius + 1, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Stars
            for (let i = 0; i < stars.length; i++) {
              const s = stars[i];
              s.pulse += s.pulseSpeed;

              const dx = s.x - mouse.x;
              const dy = s.y - mouse.y;
              const dist = Math.hypot(dx, dy);
              if (dist < 140 && dist > 0) {
                const force = (1 - dist / 140) * 1.8;
                s.vx += (dx / dist) * force;
                s.vy += (dy / dist) * force;
              }

              s.vx *= 0.95;
              s.vy *= 0.95;
              s.x += s.vx;
              s.y += s.vy - scrollOffset * 0.15;

              if (s.x < -20) s.x = width + 20;
              if (s.x > width + 20) s.x = -20;
              if (s.y < -20) s.y = height + 20;
              if (s.y > height + 20) s.y = -20;

              const twinkle = (Math.sin(s.pulse) + 1) / 2;
              const alpha = 0.35 + twinkle * 0.65;
              const curRadius = s.radius * (0.8 + twinkle * 0.4);

              if (s.isBright) {
                const starHalo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, curRadius * 4);
                starHalo.addColorStop(0, 'rgba(255, 255, 255, ' + (alpha * 0.6) + ')');
                starHalo.addColorStop(0.5, 'rgba(186, 230, 253, ' + (alpha * 0.2) + ')');
                starHalo.addColorStop(1, 'transparent');
                ctx.fillStyle = starHalo;
                ctx.beginPath();
                ctx.arc(s.x, s.y, curRadius * 4, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * 0.75) + ')';
                ctx.lineWidth = 0.8;
                const spikeLen = curRadius * 3.5;
                ctx.beginPath();
                ctx.moveTo(s.x - spikeLen, s.y); ctx.lineTo(s.x + spikeLen, s.y);
                ctx.moveTo(s.x, s.y - spikeLen); ctx.lineTo(s.x, s.y + spikeLen);
                ctx.stroke();
              }

              ctx.beginPath();
              ctx.arc(s.x, s.y, curRadius, 0, Math.PI * 2);
              ctx.fillStyle = s.color;
              ctx.globalAlpha = alpha;
              ctx.fill();
            }
            ctx.globalAlpha = 1;

            // Shooting stars
            maybeSpawnShootingStar();
            for (let m = shootingStars.length - 1; m >= 0; m--) {
              const met = shootingStars[m];
              met.x += Math.cos(met.angle) * met.speed;
              met.y += Math.sin(met.angle) * met.speed;
              met.life -= 0.025;

              if (met.life <= 0 || met.x > width + 100 || met.y > height + 100) {
                shootingStars.splice(m, 1);
                continue;
              }

              const tailX = met.x - Math.cos(met.angle) * met.length * met.life;
              const tailY = met.y - Math.sin(met.angle) * met.length * met.life;

              const meteorGrad = ctx.createLinearGradient(tailX, tailY, met.x, met.y);
              meteorGrad.addColorStop(0, 'transparent');
              meteorGrad.addColorStop(0.7, 'rgba(186, 230, 253, ' + (met.life * 0.6) + ')');
              meteorGrad.addColorStop(1, 'rgba(255, 255, 255, ' + met.life + ')');

              ctx.strokeStyle = meteorGrad;
              ctx.lineWidth = 1.8;
              ctx.beginPath();
              ctx.moveTo(tailX, tailY);
              ctx.lineTo(met.x, met.y);
              ctx.stroke();

              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(met.x, met.y, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          };
        }

        // =========================================================================
        // REAL BIRDS & CLOUDS (1-min Gentle Blue Sky -> 5-min Light Black Sky Rain -> Radiant Sun in Left Upper Corner)
        // =========================================================================
        else if (catKey === 'birds') {
          const startTime = performance.now();

          let forcedWeatherPhase = null;
          window.addEventListener('birds_weather_override', function(e) {
            forcedWeatherPhase = (e.detail && e.detail.mode) ? e.detail.mode : null;
          });

          // Weather Cycle Constants (Seconds)
          const T_SUNNY_1 = 60;   // 1 minute (60s) serene gentle blue sky
          const T_DARKEN = 6;     // 6s cinematic darkening
          const T_RAIN = 60;      // 1 minute (60s) light black sky with rain, broad lightning & thunder
          const T_CLEAR = 6;      // 6s cinematic clearing
          const T_SUNNY_2 = 120;  // 2 minutes radiant sunny sky with glowing sun on upper left corner
          const CYCLE_TOTAL = T_SUNNY_1 + T_DARKEN + T_RAIN + T_CLEAR + T_SUNNY_2;

          const lerpColor = function(c1, c2, factor) {
            const f = Math.max(0, Math.min(1, factor));
            const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
            const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
            const r = Math.round(r1 + (r2 - r1) * f);
            const g = Math.round(g1 + (g2 - g1) * f);
            const b = Math.round(b1 + (b2 - b1) * f);
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
          };

          const clouds = [];
          const numClouds = Math.min(12, Math.max(7, Math.floor(width / 150)));
          for (let i = 0; i < numClouds; i++) {
            const scale = 0.65 + Math.random() * 0.75;
            const x = (i / numClouds) * (width + 300) - 150 + (Math.random() - 0.5) * 80;
            const y = Math.random() * (height * 0.6) + 20;
            const speed = 0.2 + Math.random() * 0.35;
            const opacity = 0.78 + Math.random() * 0.2;
            
            const puffOffsets = [
              { ox: -70 * scale, oy: 15 * scale, r: 48 * scale },
              { ox: -40 * scale, oy: -15 * scale, r: 62 * scale },
              { ox: -5 * scale, oy: -32 * scale, r: 76 * scale },
              { ox: 38 * scale, oy: -20 * scale, r: 66 * scale },
              { ox: 75 * scale, oy: 12 * scale, r: 52 * scale },
              { ox: 20 * scale, oy: 18 * scale, r: 56 * scale },
              { ox: -25 * scale, oy: 18 * scale, r: 54 * scale },
              { ox: -50 * scale, oy: 5 * scale, r: 50 * scale }
            ];

            clouds.push({
              x: x,
              y: y,
              origY: y,
              scale: scale,
              speed: speed,
              opacity: opacity,
              puffs: puffOffsets,
              phase: Math.random() * Math.PI * 2,
              phaseSpeed: 0.005 + Math.random() * 0.004,
              vx: 0,
              vy: 0
            });
          }

          const birds = [];
          const numBirds = Math.min(10, Math.max(6, Math.floor(width / 160)));
          for (let i = 0; i < numBirds; i++) {
            const z = Math.random() * 320 + 20;
            const scale = 0.52 + (1 - z / 340) * 0.72;
            birds.push({
              x: Math.random() * (width + 300) - 150,
              y: Math.random() * (height * 0.7) + 30,
              z: z,
              scale: scale,
              vx: (Math.random() * 1.5 + 1.3) * (0.8 + scale * 0.3),
              vy: (Math.random() - 0.5) * 0.4,
              bank: 0,
              wingPhase: Math.random() * Math.PI * 2,
              wingSpeed: 0.16 + Math.random() * 0.06,
              flapAmplitude: 24 + Math.random() * 8,
              glideTimer: 0,
              glideDuration: 0,
              isGliding: false,
              color: z < 150 ? 'rgba(15, 23, 42, 0.95)' : 'rgba(30, 41, 59, 0.85)',
              bellyColor: z < 150 ? 'rgba(71, 85, 105, 0.9)' : 'rgba(100, 116, 139, 0.82)'
            });
          }

          // Realistic Falling Rain Droplets System
          const rainDrops = [];
          const numRain = Math.min(220, Math.max(120, Math.floor(width / 6.5)));
          for (let i = 0; i < numRain; i++) {
            rainDrops.push({
              x: Math.random() * (width + 300) - 150,
              y: Math.random() * height,
              len: 18 + Math.random() * 24,
              speed: 16 + Math.random() * 12,
              wind: -2.8,
              thickness: 0.9 + Math.random() * 0.9,
              alpha: 0.35 + Math.random() * 0.45
            });
          }

          let weatherAudioCtx = null;
          let rainGainNode = null;

          function initWeatherAudio() {
            if (weatherAudioCtx) {
              if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
              return;
            }
            try {
              const AC = window.AudioContext || window.webkitAudioContext;
              if (!AC) return;
              weatherAudioCtx = new AC();
              const bSize = weatherAudioCtx.sampleRate * 2.5;
              const nBuf = weatherAudioCtx.createBuffer(1, bSize, weatherAudioCtx.sampleRate);
              const out = nBuf.getChannelData(0);
              let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
              for (let i = 0; i < bSize; i++) {
                const w = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + w * 0.0555;
                b1 = 0.99332 * b1 + w * 0.0750;
                b2 = 0.96900 * b2 + w * 0.1538;
                b3 = 0.86650 * b3 + w * 0.3104;
                b4 = 0.55000 * b4 + w * 0.5329;
                b5 = -0.7616 * b5 - w * 0.0168;
                out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.06;
                b6 = w * 0.1159;
              }
              const src = weatherAudioCtx.createBufferSource();
              src.buffer = nBuf;
              src.loop = true;
              const filter = weatherAudioCtx.createBiquadFilter();
              filter.type = 'lowpass';
              filter.frequency.setValueAtTime(1250, weatherAudioCtx.currentTime);
              rainGainNode = weatherAudioCtx.createGain();
              rainGainNode.gain.setValueAtTime(0, weatherAudioCtx.currentTime);
              src.connect(filter);
              filter.connect(rainGainNode);
              rainGainNode.connect(weatherAudioCtx.destination);
              src.start();
            } catch (e) {}
          }

          // REALISTIC, SCARY LIGHTNING & THUNDER (Idimuzhakkam)
          // 1. Initial "CRACK! / SNAP!" — High-pitched sharp tear like wooden beams splitting instantly
          // 2. Rolling Rumble (Idimuzhakkam) — "RUMBLE... BOOM... THUN-THUN-THUN-RRRRR..." ground-shaking roll
          function playThunderSound() {
            if (!weatherAudioCtx) return;
            try {
              if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
              const now = weatherAudioCtx.currentTime;

              // 1. "CRACK! / SNAP!" — High-pitched splitting wood tear (< 0.5ms attack, dual resonant filter at 2400Hz, Q=4.5)
              const snapLen = 0.12;
              const snapBuffer = weatherAudioCtx.createBuffer(1, Math.floor(weatherAudioCtx.sampleRate * snapLen), weatherAudioCtx.sampleRate);
              const snapData = snapBuffer.getChannelData(0);
              for (let i = 0; i < snapData.length; i++) {
                const t = i / (weatherAudioCtx.sampleRate * 0.008);
                snapData[i] = (Math.random() * 2 - 1) * Math.exp(-t) * (1 + 0.45 * Math.sin(i * 0.09));
              }
              const snapSrc = weatherAudioCtx.createBufferSource();
              snapSrc.buffer = snapBuffer;

              const snapFilterA = weatherAudioCtx.createBiquadFilter();
              snapFilterA.type = 'bandpass';
              snapFilterA.frequency.setValueAtTime(2400, now);
              snapFilterA.Q.setValueAtTime(4.5, now);

              const snapFilterB = weatherAudioCtx.createBiquadFilter();
              snapFilterB.type = 'peaking';
              snapFilterB.frequency.setValueAtTime(2400, now);
              snapFilterB.Q.setValueAtTime(4.5, now);
              snapFilterB.gain.setValueAtTime(12, now);

              const snapGain = weatherAudioCtx.createGain();
              snapGain.gain.setValueAtTime(0, now);
              snapGain.gain.linearRampToValueAtTime(1.0, now + 0.0004); // < 0.5ms attack
              snapGain.gain.exponentialRampToValueAtTime(0.001, now + snapLen);

              snapSrc.connect(snapFilterA);
              snapFilterA.connect(snapFilterB);
              snapFilterB.connect(snapGain);
              snapGain.connect(weatherAudioCtx.destination);
              snapSrc.start(now);

              // 2. "BOOM!" — Massive initial shockwave detonation (155Hz -> 28Hz, 3.5ms peak)
              const boomOsc = weatherAudioCtx.createOscillator();
              boomOsc.type = 'sawtooth';
              boomOsc.frequency.setValueAtTime(155, now);
              boomOsc.frequency.exponentialRampToValueAtTime(28, now + 0.42);

              const boomFilter = weatherAudioCtx.createBiquadFilter();
              boomFilter.type = 'lowpass';
              boomFilter.frequency.setValueAtTime(300, now);
              boomFilter.frequency.exponentialRampToValueAtTime(40, now + 2.0);
              boomFilter.Q.setValueAtTime(3.8, now);

              const boomGain = weatherAudioCtx.createGain();
              boomGain.gain.setValueAtTime(0, now);
              boomGain.gain.linearRampToValueAtTime(1.0, now + 0.0035); // 3.5ms peak
              boomGain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

              boomOsc.connect(boomFilter);
              boomFilter.connect(boomGain);
              boomGain.connect(weatherAudioCtx.destination);
              boomOsc.start(now);
              boomOsc.stop(now + 2.7);

              // 3. "THUN-THUN-THUN" — Staggered rolling shockwave bounces across the sky
              const thunDelays = [0.24, 0.58, 0.98];
              const thunFreqs = [95, 76, 58];
              thunDelays.forEach(function(delay, idx) {
                const thunOsc = weatherAudioCtx.createOscillator();
                thunOsc.type = 'triangle';
                thunOsc.frequency.setValueAtTime(thunFreqs[idx], now + delay);
                thunOsc.frequency.exponentialRampToValueAtTime(30, now + delay + 0.45);

                const thunFilt = weatherAudioCtx.createBiquadFilter();
                thunFilt.type = 'lowpass';
                thunFilt.frequency.setValueAtTime(120, now + delay);
                thunFilt.Q.setValueAtTime(2.8, now + delay);

                const thunG = weatherAudioCtx.createGain();
                thunG.gain.setValueAtTime(0, now + delay);
                thunG.gain.linearRampToValueAtTime(0.68 / (idx + 1), now + delay + 0.04);
                thunG.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.65);

                thunOsc.connect(thunFilt);
                thunFilt.connect(thunG);
                thunG.connect(weatherAudioCtx.destination);
                thunOsc.start(now + delay);
                thunOsc.stop(now + delay + 0.7);
              });

              // 4. "RRRRR..." — Deep endless ground-shaking rolling rumble (Idimuzhakkam)
              const rumbleLen = 4.4;
              const rumbleBuffer = weatherAudioCtx.createBuffer(1, Math.floor(weatherAudioCtx.sampleRate * rumbleLen), weatherAudioCtx.sampleRate);
              const rData = rumbleBuffer.getChannelData(0);
              let b0 = 0, b1 = 0, b2 = 0;
              for (let i = 0; i < rData.length; i++) {
                const w = Math.random() * 2 - 1;
                b0 = 0.993 * b0 + w * 0.055;
                b1 = 0.986 * b1 + w * 0.085;
                b2 = 0.962 * b2 + w * 0.125;
                const t = i / weatherAudioCtx.sampleRate;
                const undulation = 0.8 + 0.35 * Math.sin(t * 6.5) + 0.2 * Math.sin(t * 13.0);
                rData[i] = (b0 + b1 + b2) * undulation * Math.exp(-t * 0.55) * 0.75;
              }
              const rumbleSrc = weatherAudioCtx.createBufferSource();
              rumbleSrc.buffer = rumbleBuffer;

              const rumbleFilter = weatherAudioCtx.createBiquadFilter();
              rumbleFilter.type = 'lowpass';
              rumbleFilter.frequency.setValueAtTime(180, now + 0.05);
              rumbleFilter.frequency.exponentialRampToValueAtTime(34, now + rumbleLen);

              const rumbleGain = weatherAudioCtx.createGain();
              rumbleGain.gain.setValueAtTime(0.85, now + 0.05);
              rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + rumbleLen);

              rumbleSrc.connect(rumbleFilter);
              rumbleFilter.connect(rumbleGain);
              rumbleGain.connect(weatherAudioCtx.destination);
              rumbleSrc.start(now + 0.02);
            } catch (e) {}
          }

          // NATURAL MORNING BIRDS SOUND (Paravai Oli: Kaalai Kural & Fluttering)
          function playAmbientBirdCall() {
            if (!weatherAudioCtx) return;
            try {
              if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
              const now = weatherAudioCtx.currentTime;
              const motif = Math.floor(Math.random() * 3);

              if (motif === 0) {
                // Motif 1: "Chirp, chirp!" (Two crisp morning chirps)
                const chirpTimes = [0, 0.12];
                chirpTimes.forEach(function(tOffset, idx) {
                  const osc = weatherAudioCtx.createOscillator();
                  osc.type = 'sine';
                  const baseF = idx === 0 ? 3200 : 3500;
                  osc.frequency.setValueAtTime(baseF, now + tOffset);
                  osc.frequency.exponentialRampToValueAtTime(baseF * 1.45, now + tOffset + 0.035);
                  osc.frequency.exponentialRampToValueAtTime(baseF * 0.95, now + tOffset + 0.08);

                  const gain = weatherAudioCtx.createGain();
                  gain.gain.setValueAtTime(0, now + tOffset);
                  gain.gain.linearRampToValueAtTime(0.18, now + tOffset + 0.015);
                  gain.gain.exponentialRampToValueAtTime(0.001, now + tOffset + 0.09);

                  osc.connect(gain);
                  gain.connect(weatherAudioCtx.destination);
                  osc.start(now + tOffset);
                  osc.stop(now + tOffset + 0.1);
                });
              } else if (motif === 1) {
                // Motif 2: "Twit-twoo!" (Bright rising twit + gentle falling twoo)
                const twitOsc = weatherAudioCtx.createOscillator();
                twitOsc.type = 'sine';
                twitOsc.frequency.setValueAtTime(2600, now);
                twitOsc.frequency.exponentialRampToValueAtTime(4000, now + 0.07);
                const twitGain = weatherAudioCtx.createGain();
                twitGain.gain.setValueAtTime(0, now);
                twitGain.gain.linearRampToValueAtTime(0.16, now + 0.015);
                twitGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                twitOsc.connect(twitGain);
                twitGain.connect(weatherAudioCtx.destination);
                twitOsc.start(now);
                twitOsc.stop(now + 0.1);

                const twooOsc = weatherAudioCtx.createOscillator();
                twooOsc.type = 'sine';
                twooOsc.frequency.setValueAtTime(3700, now + 0.14);
                twooOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.32);
                const twooGain = weatherAudioCtx.createGain();
                twooGain.gain.setValueAtTime(0, now + 0.14);
                twooGain.gain.linearRampToValueAtTime(0.19, now + 0.18);
                twooGain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
                twooOsc.connect(twooGain);
                twooGain.connect(weatherAudioCtx.destination);
                twooOsc.start(now + 0.14);
                twooOsc.stop(now + 0.35);
              } else {
                // Motif 3: "Trill-ill-ill... Flap-flap-flap!" (Whistling trill + soft feather flutter)
                const trillOsc = weatherAudioCtx.createOscillator();
                trillOsc.type = 'sine';
                trillOsc.frequency.setValueAtTime(3300, now);
                const trillVibrato = weatherAudioCtx.createOscillator();
                trillVibrato.frequency.setValueAtTime(24, now);
                const trillVibratoGain = weatherAudioCtx.createGain();
                trillVibratoGain.gain.setValueAtTime(280, now);
                trillVibrato.connect(trillOsc.frequency);

                const trillGain = weatherAudioCtx.createGain();
                trillGain.gain.setValueAtTime(0, now);
                trillGain.gain.linearRampToValueAtTime(0.17, now + 0.03);
                trillGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

                trillVibrato.start(now);
                trillOsc.connect(trillGain);
                trillGain.connect(weatherAudioCtx.destination);
                trillOsc.start(now);
                trillVibrato.stop(now + 0.32);
                trillOsc.stop(now + 0.32);

                [0.08, 0.16, 0.24].forEach(function(fOffset) {
                  const flapLen = 0.05;
                  const flapBuf = weatherAudioCtx.createBuffer(1, Math.floor(weatherAudioCtx.sampleRate * flapLen), weatherAudioCtx.sampleRate);
                  const flapData = flapBuf.getChannelData(0);
                  for (let i = 0; i < flapData.length; i++) {
                    flapData[i] = (Math.random() * 2 - 1) * Math.sin((i / flapData.length) * Math.PI);
                  }
                  const flapSrc = weatherAudioCtx.createBufferSource();
                  flapSrc.buffer = flapBuf;
                  const flapFilter = weatherAudioCtx.createBiquadFilter();
                  flapFilter.type = 'lowpass';
                  flapFilter.frequency.setValueAtTime(480, now + fOffset);
                  const flapGain = weatherAudioCtx.createGain();
                  flapGain.gain.setValueAtTime(0.09, now + fOffset);
                  flapGain.gain.exponentialRampToValueAtTime(0.001, now + fOffset + flapLen);
                  flapSrc.connect(flapFilter);
                  flapFilter.connect(flapGain);
                  flapGain.connect(weatherAudioCtx.destination);
                  flapSrc.start(now + fOffset);
                });
              }
            } catch (e) {}
          }

          // DISTRESSED AVIAN SCREECH & PANICKED SQUAWK WHEN BIRD IS STRUCK BY LIGHTNING
          function playBirdHitSound() {
            if (!weatherAudioCtx) return;
            try {
              if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
              const now = weatherAudioCtx.currentTime;

              const chirpOsc = weatherAudioCtx.createOscillator();
              chirpOsc.type = 'sawtooth';
              chirpOsc.frequency.setValueAtTime(3400, now);
              chirpOsc.frequency.exponentialRampToValueAtTime(4200, now + 0.04);
              chirpOsc.frequency.exponentialRampToValueAtTime(1350, now + 0.22);

              const vibrato = weatherAudioCtx.createOscillator();
              vibrato.frequency.setValueAtTime(110, now);
              const vibratoGain = weatherAudioCtx.createGain();
              vibratoGain.gain.setValueAtTime(390, now);
              vibratoGain.gain.exponentialRampToValueAtTime(40, now + 0.22);
              vibrato.connect(chirpOsc.frequency);

              const birdFilter = weatherAudioCtx.createBiquadFilter();
              birdFilter.type = 'bandpass';
              birdFilter.frequency.setValueAtTime(2800, now);
              birdFilter.Q.setValueAtTime(3.0, now);

              const chirpGain = weatherAudioCtx.createGain();
              chirpGain.gain.setValueAtTime(0, now);
              chirpGain.gain.linearRampToValueAtTime(0.65, now + 0.012);
              chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

              vibrato.start(now);
              chirpOsc.connect(birdFilter);
              birdFilter.connect(chirpGain);
              chirpGain.connect(weatherAudioCtx.destination);
              chirpOsc.start(now);

              vibrato.stop(now + 0.26);
              chirpOsc.stop(now + 0.26);

              const squawkOsc = weatherAudioCtx.createOscillator();
              squawkOsc.type = 'sine';
              squawkOsc.frequency.setValueAtTime(2600, now + 0.02);
              squawkOsc.frequency.exponentialRampToValueAtTime(1150, now + 0.19);

              const squawkGain = weatherAudioCtx.createGain();
              squawkGain.gain.setValueAtTime(0, now);
              squawkGain.gain.setValueAtTime(0.45, now + 0.02);
              squawkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

              squawkOsc.connect(squawkGain);
              squawkGain.connect(weatherAudioCtx.destination);
              squawkOsc.start(now + 0.02);
              squawkOsc.stop(now + 0.23);
            } catch (e) {}
          }

          window.addEventListener('click', initWeatherAudio, { once: true });
          window.addEventListener('keydown', initWeatherAudio, { once: true });

          function playBirdExplosionSound() {
            if (!weatherAudioCtx) return;
            try {
              if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
              const now = weatherAudioCtx.currentTime;

              // Electric Arc Zap
              const zapOsc = weatherAudioCtx.createOscillator();
              zapOsc.type = 'sawtooth';
              zapOsc.frequency.setValueAtTime(1800, now);
              zapOsc.frequency.exponentialRampToValueAtTime(120, now + 0.15);
              const zapGain = weatherAudioCtx.createGain();
              zapGain.gain.setValueAtTime(0.35, now);
              zapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
              zapOsc.connect(zapGain);
              zapGain.connect(weatherAudioCtx.destination);
              zapOsc.start(now);
              zapOsc.stop(now + 0.17);

              // Skull Detonation Pop / Blast
              const popOsc = weatherAudioCtx.createOscillator();
              popOsc.type = 'triangle';
              popOsc.frequency.setValueAtTime(320, now);
              popOsc.frequency.exponentialRampToValueAtTime(45, now + 0.2);
              const popGain = weatherAudioCtx.createGain();
              popGain.gain.setValueAtTime(0.45, now);
              popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
              popOsc.connect(popGain);
              popGain.connect(weatherAudioCtx.destination);
              popOsc.start(now);
              popOsc.stop(now + 0.22);
            } catch (e) {}
          }

          const skullExplosions = [];

          function triggerBirdSkullExplosion(b) {
            b.isDead = true;
            b.deadTimer = 0;

            const birdScale = b.scale;
            const originX = b.x;
            const originY = b.y;

            playBirdHitSound();
            playBirdExplosionSound();

            const shards = [];
            // 1. Skull bone plates
            for (let s = 0; s < 7; s++) {
              const angle = (s / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
              const speed = 4.5 + Math.random() * 9.5;
              shards.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed + b.vx * 0.5,
                vy: Math.sin(angle) * speed - 2.5,
                size: (3.5 + Math.random() * 4.5) * birdScale,
                boneType: 'skull',
                color: '#f8fafc',
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - 0.5) * 0.45
              });
            }

            // 2. Wing bone rods tumbling across display
            for (let w = 0; w < 8; w++) {
              const wAngle = Math.random() * Math.PI * 2;
              const wSpeed = 7.0 + Math.random() * 14.0;
              shards.push({
                x: originX,
                y: originY,
                vx: Math.cos(wAngle) * wSpeed + (Math.random() - 0.5) * 6,
                vy: Math.sin(wAngle) * wSpeed - (Math.random() * 8 + 4),
                boneLen: (16 + Math.random() * 18) * birdScale,
                boneThick: (3 + Math.random() * 2) * birdScale,
                boneType: 'wing_bone',
                color: '#f1f5f9',
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - 0.5) * 0.55
              });
            }

            // 3. Ribcage splinters
            for (let r = 0; r < 14; r++) {
              const rAngle = Math.random() * Math.PI * 2;
              const rSpeed = 5.0 + Math.random() * 11.0;
              shards.push({
                x: originX,
                y: originY,
                vx: Math.cos(rAngle) * rSpeed,
                vy: Math.sin(rAngle) * rSpeed - 3.0,
                size: (2.5 + Math.random() * 3.5) * birdScale,
                boneType: 'rib',
                color: '#e2e8f0',
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - 0.5) * 0.6
              });
            }

            const sparks = [];
            for (let p = 0; p < 36; p++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 4.0 + Math.random() * 16.0;
              sparks.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2.0,
                size: (1.5 + Math.random() * 3.5) * birdScale,
                color: Math.random() < 0.4 ? '#38bdf8' : (Math.random() < 0.7 ? '#fbbf24' : '#ef4444'),
                alpha: 1.0
              });
            }

            skullExplosions.push({
              x: originX,
              y: originY,
              shockwaveRadius: 4,
              shockwaveAlpha: 0.95,
              shards: shards,
              sparks: sparks,
              life: 0
            });
          }

          let lightningFlash = 0;
          let lightningBolt = null;
          let nextLightningTime = Math.random() * 200 + 120;
          let nextBirdCallTime = 90;
          let time = 0;

          renderFrame = function() {
            time += 1;
            const now = performance.now();
            const elapsed = ((now - startTime) / 1000) % CYCLE_TOTAL;

            let darkFactor = 0;
            let rainFactor = 0;
            let sunFactor = 0.85;

            if (forcedWeatherPhase === 'sun') {
              darkFactor = 0;
              rainFactor = 0;
              sunFactor = 1.0;
            } else if (forcedWeatherPhase === 'rain') {
              darkFactor = 1.0;
              rainFactor = 1.0;
              sunFactor = 0.0;
            } else if (elapsed < T_SUNNY_1) {
              darkFactor = 0;
              rainFactor = 0;
              sunFactor = 0.85;
            } else if (elapsed < T_SUNNY_1 + T_DARKEN) {
              const p = (elapsed - T_SUNNY_1) / T_DARKEN;
              darkFactor = p;
              rainFactor = p * p;
              sunFactor = Math.max(0, 0.85 * (1 - p));
            } else if (elapsed < T_SUNNY_1 + T_DARKEN + T_RAIN) {
              darkFactor = 1.0;
              rainFactor = 1.0;
              sunFactor = 0.0;
            } else if (elapsed < T_SUNNY_1 + T_DARKEN + T_RAIN + T_CLEAR) {
              const p = (elapsed - (T_SUNNY_1 + T_DARKEN + T_RAIN)) / T_CLEAR;
              darkFactor = 1.0 - p;
              rainFactor = Math.max(0, 1.0 - p * 1.5);
              sunFactor = p;
            } else {
              darkFactor = 0;
              rainFactor = 0;
              sunFactor = 1.0;
            }

            ctx.clearRect(0, 0, width, height);

            // 1. Dynamic Atmospheric Sky Gradient (Gentle Blue <-> Light Black)
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
            skyGrad.addColorStop(0, lerpColor('#1e40af', '#090d16', darkFactor));
            skyGrad.addColorStop(0.25, lerpColor('#2563eb', '#111827', darkFactor));
            skyGrad.addColorStop(0.6, lerpColor('#60a5fa', '#1e293b', darkFactor));
            skyGrad.addColorStop(0.85, lerpColor('#93c5fd', '#273549', darkFactor));
            skyGrad.addColorStop(1, lerpColor('#dbeafe', '#334155', darkFactor));
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height);

            // 2. Real Glowing Radiant Sun on Left Side Up Corner
            if (sunFactor > 0.01) {
              const sunX = Math.max(90, width * 0.12);
              const sunY = Math.max(80, height * 0.14);
              const sunRadius = 38;

              // Radiant Atmospheric Corona / Warm Halo
              const corona = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 5.2);
              corona.addColorStop(0, 'rgba(255, 250, 205, ' + (0.48 * sunFactor) + ')');
              corona.addColorStop(0.28, 'rgba(254, 215, 102, ' + (0.3 * sunFactor) + ')');
              corona.addColorStop(0.65, 'rgba(251, 191, 36, ' + (0.12 * sunFactor) + ')');
              corona.addColorStop(1, 'rgba(251, 191, 36, 0)');
              ctx.fillStyle = corona;
              ctx.beginPath();
              ctx.arc(sunX, sunY, sunRadius * 5.2, 0, Math.PI * 2);
              ctx.fill();

              // Rotating Golden Solar Sunbeams
              ctx.save();
              ctx.translate(sunX, sunY);
              ctx.rotate(time * 0.002);
              const numRays = 12;
              for (let r = 0; r < numRays; r++) {
                ctx.rotate((Math.PI * 2) / numRays);
                const rayLen = sunRadius * (2.8 + Math.sin(time * 0.035 + r) * 0.5);
                const rayGrad = ctx.createLinearGradient(0, 0, rayLen, 0);
                rayGrad.addColorStop(0, 'rgba(254, 240, 138, ' + (0.35 * sunFactor) + ')');
                rayGrad.addColorStop(0.5, 'rgba(251, 191, 36, ' + (0.15 * sunFactor) + ')');
                rayGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
                ctx.fillStyle = rayGrad;
                ctx.beginPath();
                ctx.moveTo(0, -3.5);
                ctx.lineTo(rayLen, 0);
                ctx.lineTo(0, 3.5);
                ctx.closePath();
                ctx.fill();
              }
              ctx.restore();

              // Inner Radiant Solar Disc
              const disc = ctx.createRadialGradient(sunX - sunRadius * 0.2, sunY - sunRadius * 0.2, 0, sunX, sunY, sunRadius);
              disc.addColorStop(0, 'rgba(255, 255, 255, ' + (0.98 * sunFactor) + ')');
              disc.addColorStop(0.35, 'rgba(255, 250, 210, ' + (0.95 * sunFactor) + ')');
              disc.addColorStop(0.7, 'rgba(254, 215, 102, ' + (0.85 * sunFactor) + ')');
              disc.addColorStop(0.92, 'rgba(251, 146, 60, ' + (0.55 * sunFactor) + ')');
              disc.addColorStop(1, 'rgba(245, 158, 11, ' + (0.15 * sunFactor) + ')');
              ctx.fillStyle = disc;
              ctx.beginPath();
              ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
              ctx.fill();

              // Subtle Cinematic Lens Flare Streak
              if (sunFactor > 0.3) {
                const flareGrad = ctx.createLinearGradient(sunX - 30, sunY - 30, sunX + 340, sunY + 290);
                flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                flareGrad.addColorStop(0.18, 'rgba(254, 240, 138, ' + (0.18 * sunFactor) + ')');
                flareGrad.addColorStop(0.4, 'rgba(147, 197, 253, ' + (0.12 * sunFactor) + ')');
                flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = flareGrad;
                ctx.beginPath();
                ctx.ellipse(sunX + 150, sunY + 130, 200, 28, Math.PI / 4.4, 0, Math.PI * 2);
                ctx.fill();
              }
            }

            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;
            mouse.vx = mouse.x - lastMouseX;
            mouse.vy = mouse.y - lastMouseY;
            lastMouseX = mouse.x;
            lastMouseY = mouse.y;

            // 3. Volumetric Clouds with Dynamic Weather Adaptation
            const cr = Math.round(255 * (1 - darkFactor) + 55 * darkFactor);
            const cg = Math.round(255 * (1 - darkFactor) + 65 * darkFactor);
            const cb = Math.round(255 * (1 - darkFactor) + 85 * darkFactor);
            const cDarkR = Math.round(224 * (1 - darkFactor) + 30 * darkFactor);
            const cDarkG = Math.round(242 * (1 - darkFactor) + 41 * darkFactor);
            const cDarkB = Math.round(254 * (1 - darkFactor) + 59 * darkFactor);

            for (let i = 0; i < clouds.length; i++) {
              const c = clouds[i];
              c.phase += c.phaseSpeed;
              c.x += c.speed + c.vx;
              c.y = c.origY + Math.sin(c.phase) * 6 + c.vy;

              const cdx = (c.x + 30) - mouse.x;
              const cdy = c.y - mouse.y;
              const cdist = Math.hypot(cdx, cdy);
              if (cdist < 240) {
                const push = (1 - cdist / 240) * 1.8;
                c.vx += (cdx / cdist) * push + mouse.vx * 0.04;
                c.vy += (cdy / cdist) * push * 0.3;
              }
              c.vx *= 0.95;
              c.vy *= 0.95;

              if (c.x > width + 250) {
                c.x = -250;
                c.origY = Math.random() * (height * 0.6) + 20;
                c.y = c.origY;
              }

              ctx.save();
              for (let j = 0; j < c.puffs.length; j++) {
                const p = c.puffs[j];
                const px = c.x + p.ox;
                const py = c.y + p.oy;
                const pr = p.r;

                const grad = ctx.createRadialGradient(px - pr * 0.2, py - pr * 0.25, pr * 0.08, px, py, pr);
                grad.addColorStop(0, 'rgba(' + cr + ', ' + cg + ', ' + cb + ', ' + c.opacity + ')');
                grad.addColorStop(0.45, 'rgba(' + Math.round(cr * 0.95) + ', ' + Math.round(cg * 0.95) + ', ' + Math.round(cb * 0.98) + ', ' + (c.opacity * 0.92) + ')');
                grad.addColorStop(0.75, 'rgba(' + cDarkR + ', ' + cDarkG + ', ' + cDarkB + ', ' + (c.opacity * 0.6) + ')');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(px, py, pr, 0, Math.PI * 2);
                ctx.fill();

                // Internal cloud illumination from lightning flash
                if (lightningFlash > 0.04) {
                  var flashAlpha = Math.min(0.65, lightningFlash * 0.58 * rainFactor);
                  var flashGrad = ctx.createRadialGradient(px, py, pr * 0.1, px, py, pr);
                  flashGrad.addColorStop(0, 'rgba(255, 255, 255, ' + flashAlpha + ')');
                  flashGrad.addColorStop(0.55, 'rgba(224, 242, 254, ' + (flashAlpha * 0.45) + ')');
                  flashGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                  ctx.fillStyle = flashGrad;
                  ctx.beginPath();
                  ctx.arc(px, py, pr, 0, Math.PI * 2);
                  ctx.fill();
                }
              }
              ctx.restore();
            }

            // 4. Realistic Slanted Rain Streaks, Ground Mist & Broad Lightning
            if (rainFactor > 0.02) {
              nextBirdCallTime = 120;
              if (rainGainNode && weatherAudioCtx) {
                try {
                  rainGainNode.gain.setTargetAtTime(0.22 * rainFactor, weatherAudioCtx.currentTime, 0.2);
                } catch (e) {}
              }

              if (rainFactor > 0.25) {
                nextLightningTime--;
                if (nextLightningTime <= 0) {
                  lightningFlash = 1.0;
                  var boltStartX = width * 0.15 + Math.random() * (width * 0.7);
                  var boltStartY = Math.random() * 30;
                  var segments = [{ x: boltStartX, y: boltStartY }];
                  var cx = boltStartX, cy = boltStartY;
                  var boltEndY = height * (0.45 + Math.random() * 0.38);
                  var branches = [];
                  var crawlers = [];

                  // Main trunk with dramatic zig-zag breadth
                  while (cy < boltEndY) {
                    cy += 14 + Math.random() * 22;
                    cx += (Math.random() - 0.5) * 85;
                    segments.push({ x: cx, y: cy });

                    // Wide lateral branches spanning 150px - 450px sideways across the sky
                    if (Math.random() < 0.38) {
                      var dir = Math.random() < 0.5 ? -1 : 1;
                      var bLen = 4 + Math.floor(Math.random() * 6);
                      var bx = cx, by = cy;
                      var bSegs = [{ x: bx, y: by }];
                      for (var s = 0; s < bLen; s++) {
                        by += 10 + Math.random() * 18;
                        bx += dir * (26 + Math.random() * 42) + (Math.random() - 0.3) * 20;
                        bSegs.push({ x: bx, y: by });

                        if (s === 2 && Math.random() < 0.65) {
                          var sx = bx, sy = by;
                          var subSegs = [{ x: sx, y: sy }];
                          for (var ss = 0; ss < 3; ss++) {
                            sy += 8 + Math.random() * 14;
                            sx += dir * (18 + Math.random() * 30);
                            subSegs.push({ x: sx, y: sy });
                          }
                          branches.push(subSegs);
                        }
                      }
                      branches.push(bSegs);
                    }
                  }

                  // Cloud-to-cloud horizontal crawler sheet lightning across the sky breadth
                  if (Math.random() < 0.85) {
                    var crawlDir = Math.random() < 0.5 ? -1 : 1;
                    var crx = boltStartX;
                    var cry = boltStartY + Math.random() * 35;
                    var crawlSegs = [{ x: crx, y: cry }];
                    var crawlSteps = 8 + Math.floor(Math.random() * 7);
                    for (var c = 0; c < crawlSteps; c++) {
                      crx += crawlDir * (32 + Math.random() * 52);
                      cry += (Math.random() - 0.45) * 24;
                      crawlSegs.push({ x: crx, y: cry });
                    }
                    crawlers.push(crawlSegs);
                  }

                  // 1 or 2 live birds actively struck by lightning on each bolt!
              const liveBirds = birds.filter(function(b) { return !b.isDead && b.x > 80 && b.x < width - 80 && b.y > 60 && b.y < height * 0.72; });
              const targetBirds = liveBirds.slice(0, Math.min(2, Math.floor(Math.random() * 2) + 1));

              targetBirds.forEach(function(tb) {
                const connSeg = segments[Math.min(segments.length - 1, Math.floor(Math.random() * 4) + 1)];
                const directArc = [
                  { x: connSeg.x, y: connSeg.y },
                  { x: (connSeg.x + tb.x) * 0.5 + (Math.random() - 0.5) * 35, y: (connSeg.y + tb.y) * 0.5 + (Math.random() - 0.5) * 35 },
                  { x: tb.x + (Math.random() - 0.5) * 8, y: tb.y + (Math.random() - 0.5) * 8 },
                  { x: tb.x, y: tb.y }
                ];
                branches.push(directArc);
              });

              lightningBolt = { main: segments, branches: branches, crawlers: crawlers, alpha: 1.0 };
              playThunderSound();
              nextLightningTime = Math.random() * 220 + 130;
                }
              }

              ctx.save();
              for (let i = 0; i < rainDrops.length; i++) {
                const d = rainDrops[i];
                d.x += d.wind;
                d.y += d.speed;
                if (d.y > height + 25) {
                  d.y = -35;
                  d.x = Math.random() * (width + 300) - 150;
                }
                ctx.strokeStyle = 'rgba(186, 230, 253, ' + (d.alpha * rainFactor) + ')';
                ctx.lineWidth = d.thickness;
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x + d.wind * (d.len / d.speed) * 3, d.y + d.len);
                ctx.stroke();
              }

              const mistGrad = ctx.createLinearGradient(0, height - 140, 0, height);
              mistGrad.addColorStop(0, 'rgba(148, 163, 184, 0)');
              mistGrad.addColorStop(1, 'rgba(148, 163, 184, ' + (0.22 * rainFactor) + ')');
              ctx.fillStyle = mistGrad;
              ctx.fillRect(0, height - 140, width, 140);

              // Render Broad, Brilliant Electric Lightning Bolt (Tri-Layer Corona + Arc + Core)
              if (lightningBolt && lightningBolt.alpha > 0.01) {
                ctx.save();

                var traceLightningPaths = function() {
                  ctx.beginPath();
                  ctx.moveTo(lightningBolt.main[0].x, lightningBolt.main[0].y);
                  for (var s = 1; s < lightningBolt.main.length; s++) {
                    ctx.lineTo(lightningBolt.main[s].x, lightningBolt.main[s].y);
                  }
                  for (var b = 0; b < lightningBolt.branches.length; b++) {
                    var br = lightningBolt.branches[b];
                    ctx.moveTo(br[0].x, br[0].y);
                    for (var s = 1; s < br.length; s++) {
                      ctx.lineTo(br[s].x, br[s].y);
                    }
                  }
                  if (lightningBolt.crawlers) {
                    for (var c = 0; c < lightningBolt.crawlers.length; c++) {
                      var cr = lightningBolt.crawlers[c];
                      ctx.moveTo(cr[0].x, cr[0].y);
                      for (var s = 1; s < cr.length; s++) {
                        ctx.lineTo(cr[s].x, cr[s].y);
                      }
                    }
                  }
                };

                // Layer 1: Wide Electric Cyan Glow Corona
                ctx.strokeStyle = 'rgba(56, 189, 248, ' + (lightningBolt.alpha * 0.65 * rainFactor) + ')';
                ctx.lineWidth = 15;
                ctx.shadowColor = '#38bdf8';
                ctx.shadowBlur = 34;
                traceLightningPaths();
                ctx.stroke();

                // Layer 2: Vivid High-Voltage Electric Beam
                ctx.strokeStyle = 'rgba(191, 219, 254, ' + (lightningBolt.alpha * 0.95 * rainFactor) + ')';
                ctx.lineWidth = 5.5;
                ctx.shadowColor = '#93c5fd';
                ctx.shadowBlur = 18;
                traceLightningPaths();
                ctx.stroke();

                // Layer 3: Blinding White-Hot Center Core
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + (lightningBolt.alpha * rainFactor) + ')';
                ctx.lineWidth = 2.2;
                ctx.shadowBlur = 0;
                traceLightningPaths();
                ctx.stroke();

                ctx.restore();
                lightningBolt.alpha *= 0.82;
              }

              // Full Atmospheric Dramatic Lightning Flash (Strobe Decay)
              if (lightningFlash > 0.01) {
                ctx.fillStyle = 'rgba(240, 249, 255, ' + (lightningFlash * 0.72 * rainFactor) + ')';
                ctx.fillRect(0, 0, width, height);
                lightningFlash *= 0.82;
              }

              ctx.restore();
            } else {
              if (rainGainNode && weatherAudioCtx) {
                try {
                  rainGainNode.gain.setTargetAtTime(0, weatherAudioCtx.currentTime, 0.4);
                } catch (e) {}
              }
              // Ambient natural morning bird calls during clear skies
              nextBirdCallTime--;
              if (nextBirdCallTime <= 0) {
                playAmbientBirdCall();
                nextBirdCallTime = Math.floor(Math.random() * 200 + 160);
              }
            }

            // 5. Render Real Flying Avian Birds (Aerodynamic Contour, Notched Tail, Slotted Wingtips & Plumage)
            for (let i = 0; i < birds.length; i++) {
              const b = birds[i];
              if (b.isGliding) {
                b.glideTimer++;
                if (b.glideTimer > b.glideDuration) {
                  b.isGliding = false;
                  b.glideTimer = 0;
                }
              } else {
                b.wingPhase += b.wingSpeed * (1 + rainFactor * 0.25);
                if (b.wingPhase > Math.PI * 10 && Math.random() < (0.035 * (1 - rainFactor * 0.5))) {
                  b.isGliding = true;
                  b.glideTimer = 0;
                  b.glideDuration = Math.random() * 85 + 45;
                }
              }

              const mdist = Math.hypot(b.x - mouse.x, b.y - mouse.y);
              if (mdist < 190) {
                const evadeAngle = Math.atan2(b.y - mouse.y, b.x - mouse.x);
                b.vx += Math.cos(evadeAngle) * 0.24;
                b.vy += Math.sin(evadeAngle) * 0.24;
                b.wingPhase += b.wingSpeed * 1.5;
                b.bank = (b.vy / (Math.abs(b.vx) + 0.1)) * 0.5;
              } else {
                b.vy += Math.sin(time * 0.02 + i) * 0.025;
                b.vy += rainFactor * 0.04;
                b.vy *= 0.98;
                b.bank *= 0.96;
              }

              b.x += b.vx;
              b.y += b.vy - (scrollVelocity * 0.03);

              if (b.x > width + 100) {
                b.x = -100;
                b.y = Math.random() * (height * 0.7) + 30;
              }

              const wingDeflection = b.isGliding ? 2.5 : Math.sin(b.wingPhase) * b.flapAmplitude;
              const wingFlex = b.isGliding ? 0.95 : Math.cos(b.wingPhase) * 0.25;
              const birdScale = b.scale;
              const birdLen = 26 * birdScale;
              const wingSpan = 30 * birdScale;

              ctx.save();
              ctx.translate(b.x, b.y);
              ctx.rotate(Math.atan2(b.vy, b.vx) + b.bank);

              // 1. Aerodynamic Fanned Tail with realistic rectrices (tail feather notches)
              const tailSpread = b.isGliding ? 1.3 : (0.8 + Math.abs(b.bank) * 0.8);
              ctx.beginPath();
              ctx.moveTo(-birdLen * 0.45, 0);
              ctx.lineTo(-birdLen * 0.95, -5.5 * birdScale * tailSpread);
              ctx.lineTo(-birdLen * 0.82, 0); // Center tail fork notch
              ctx.lineTo(-birdLen * 0.95, 5.5 * birdScale * tailSpread);
              ctx.closePath();
              ctx.fillStyle = b.color;
              ctx.fill();

              // Tail feather separation lines
              ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
              ctx.lineWidth = 0.8 * birdScale;
              ctx.beginPath();
              ctx.moveTo(-birdLen * 0.45, 0);
              ctx.lineTo(-birdLen * 0.9, -2.8 * birdScale * tailSpread);
              ctx.moveTo(-birdLen * 0.45, 0);
              ctx.lineTo(-birdLen * 0.9, 2.8 * birdScale * tailSpread);
              ctx.stroke();

              // 2. Realistic Avian Fuselage (Beak, Crown, Throat, Breast, Belly)
              ctx.beginPath();
              ctx.moveTo(birdLen * 0.85, 0); // Beak tip
              ctx.quadraticCurveTo(birdLen * 0.58, -3.2 * birdScale, birdLen * 0.32, -3.8 * birdScale); // Crown
              ctx.quadraticCurveTo(0, -3.4 * birdScale, -birdLen * 0.48, 0); // Back
              ctx.quadraticCurveTo(0, 4.0 * birdScale, birdLen * 0.38, 3.0 * birdScale); // Breast & Belly
              ctx.quadraticCurveTo(birdLen * 0.65, 1.8 * birdScale, birdLen * 0.85, 0); // Throat to beak
              ctx.closePath();

              // 3D Contoured Feather Shading (Dorsal dark, ventral soft light)
              const bodyGrad = ctx.createLinearGradient(0, -4 * birdScale, 0, 4 * birdScale);
              bodyGrad.addColorStop(0, b.color);
              bodyGrad.addColorStop(1, b.bellyColor || 'rgba(71, 85, 105, 0.9)');
              ctx.fillStyle = bodyGrad;
              ctx.fill();

              // Tiny glint on the head/eye
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.beginPath();
              ctx.arc(birdLen * 0.52, -1.2 * birdScale, 0.9 * birdScale, 0, Math.PI * 2);
              ctx.fill();

              // 3. Articulated Realistic Wings with Separated Primary Flight Feathers
              // Left Wing
              ctx.beginPath();
              ctx.moveTo(birdLen * 0.15, -2 * birdScale);
              const wristX1 = -wingSpan * 0.1;
              const wristY1 = -wingSpan * 0.65 + wingDeflection * 0.45;
              ctx.quadraticCurveTo(wingSpan * 0.15, -wingSpan * 0.35 + wingDeflection * 0.2, wristX1, wristY1);

              const tipX1 = -wingSpan * 0.75 + wingFlex * 5;
              const tipY1 = -wingSpan * 0.95 + wingDeflection;

              // 4 individual spread primary flight feather fingers at wingtip
              ctx.lineTo(tipX1, tipY1);
              ctx.lineTo(tipX1 + 4 * birdScale, tipY1 + 4 * birdScale);
              ctx.lineTo(tipX1 - 2 * birdScale, tipY1 + 3 * birdScale);
              ctx.lineTo(tipX1 + 2 * birdScale, tipY1 + 7 * birdScale);
              ctx.lineTo(tipX1 - 4 * birdScale, tipY1 + 6 * birdScale);
              ctx.lineTo(tipX1, tipY1 + 10 * birdScale);

              ctx.quadraticCurveTo(-wingSpan * 0.3, -wingSpan * 0.35 + wingDeflection * 0.25, -birdLen * 0.25, -1 * birdScale);
              ctx.closePath();

              const wingGrad1 = ctx.createLinearGradient(wristX1, wristY1, tipX1, tipY1);
              wingGrad1.addColorStop(0, b.color);
              wingGrad1.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
              ctx.fillStyle = wingGrad1;
              ctx.fill();

              // Right Wing
              ctx.beginPath();
              ctx.moveTo(birdLen * 0.15, 2 * birdScale);
              const wristX2 = -wingSpan * 0.1;
              const wristY2 = wingSpan * 0.65 - wingDeflection * 0.45;
              ctx.quadraticCurveTo(wingSpan * 0.15, wingSpan * 0.35 - wingDeflection * 0.2, wristX2, wristY2);

              const tipX2 = -wingSpan * 0.75 + wingFlex * 5;
              const tipY2 = wingSpan * 0.95 - wingDeflection;

              // 4 spread primary flight feather fingers
              ctx.lineTo(tipX2, tipY2);
              ctx.lineTo(tipX2 + 4 * birdScale, tipY2 - 4 * birdScale);
              ctx.lineTo(tipX2 - 2 * birdScale, tipY2 - 3 * birdScale);
              ctx.lineTo(tipX2 + 2 * birdScale, tipY2 - 7 * birdScale);
              ctx.lineTo(tipX2 - 4 * birdScale, tipY2 - 6 * birdScale);
              ctx.lineTo(tipX2, tipY2 - 10 * birdScale);

              ctx.quadraticCurveTo(-wingSpan * 0.3, wingSpan * 0.35 - wingDeflection * 0.25, -birdLen * 0.25, 1 * birdScale);
              ctx.closePath();

              const wingGrad2 = ctx.createLinearGradient(wristX2, wristY2, tipX2, tipY2);
              wingGrad2.addColorStop(0, b.color);
              wingGrad2.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
              ctx.fillStyle = wingGrad2;
              ctx.fill();

              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 10. CHROMATIC HALO: Luminous Chromatic Aurora Plasma & Gyro Rings
        // =========================================================================
        else if (catKey === 'halo') {
          let t = 0;

          renderFrame = function(time) {
            ctx.fillStyle = '#06050e';
            ctx.fillRect(0, 0, width, height);

            t += 0.012;

            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            const centerX = mouse.x * 0.25 + (width / 2) * 0.75;
            const centerY = mouse.y * 0.25 + (height / 2) * 0.75;

            // Blob 1: Violet/Pink
            const b1X = centerX + Math.cos(t * 0.8) * 100;
            const b1Y = centerY + Math.sin(t * 0.9) * 80;
            const g1 = ctx.createRadialGradient(b1X, b1Y, 10, b1X, b1Y, Math.min(width, height) * 0.6);
            g1.addColorStop(0, 'rgba(168, 85, 247, 0.32)');
            g1.addColorStop(0.5, 'rgba(236, 72, 153, 0.15)');
            g1.addColorStop(1, 'transparent');
            ctx.fillStyle = g1;
            ctx.fillRect(0, 0, width, height);

            // Blob 2: Cyan/Blue
            const b2X = centerX + Math.sin(t * 0.7) * 120;
            const b2Y = centerY + Math.cos(t * 0.6) * 90;
            const g2 = ctx.createRadialGradient(b2X, b2Y, 15, b2X, b2Y, Math.min(width, height) * 0.55);
            g2.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
            g2.addColorStop(0.5, 'rgba(59, 130, 246, 0.12)');
            g2.addColorStop(1, 'transparent');
            ctx.fillStyle = g2;
            ctx.fillRect(0, 0, width, height);

            // Gyro Rings
            for (let r = 0; r < 3; r++) {
              const radiusX = (120 + r * 60) * (1 + Math.sin(t + r) * 0.06);
              const radiusY = (60 + r * 30) * (1 + Math.cos(t + r) * 0.06);
              const rot = t * (0.25 + r * 0.1);

              ctx.save();
              ctx.translate(centerX, centerY);
              ctx.rotate(rot);

              ctx.beginPath();
              ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
              ctx.lineWidth = 1.4;
              ctx.strokeStyle = r % 2 === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(236, 72, 153, 0.35)';
              ctx.stroke();

              ctx.restore();
            }
          };
        }

        // =========================================================================
        // 11. MODERN & EXPERIMENTAL (Default)
        // =========================================================================
        else {
          const blobs = [];
          const numBlobs = Math.min(16, Math.max(8, Math.floor(width / 95)));

          for (let i = 0; i < numBlobs; i++) {
            blobs.push({
              x: Math.random() * width,
              y: Math.random() * height,
              baseRadius: 25 + Math.random() * 20,
              radius: 25 + Math.random() * 20,
              phase: Math.random() * Math.PI * 2,
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
              colorHue: Math.random() * 360
            });
          }

          renderFrame = function(time) {
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            for (let i = 0; i < blobs.length; i++) {
              const b = blobs[i];
              b.phase += 0.02;

              const dx = mouse.x - b.x;
              const dy = mouse.y - b.y;
              const dist = Math.hypot(dx, dy);

              if (dist < 200) {
                b.x += (dx / dist) * 2.5;
                b.y += (dy / dist) * 2.5;
                b.radius = b.baseRadius * (1 + (1 - dist / 200) * 0.6);
              } else {
                b.radius += (b.baseRadius - b.radius) * 0.05;
                b.x += b.vx;
                b.y += b.vy;
              }

              if (b.x < -40) b.x = width + 40;
              if (b.x > width + 40) b.x = -40;
              if (b.y < -40) b.y = height + 40;
              if (b.y > height + 40) b.y = -40;

              const grad = ctx.createRadialGradient(b.x - b.radius * 0.3, b.y - b.radius * 0.3, 0, b.x, b.y, b.radius);
              grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
              grad.addColorStop(0.3, 'hsla(' + (b.colorHue + time * 0.02) + ', 80%, 65%, 0.6)');
              grad.addColorStop(1, 'rgba(15, 23, 42, 0)');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
              ctx.fill();

              if (i % 3 === 0) {
                ctx.strokeStyle = 'hsla(' + b.colorHue + ', 90%, 70%, 0.4)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.ellipse(b.x, b.y, b.radius * 1.4, b.radius * 0.5, b.phase, 0, Math.PI * 2);
                ctx.stroke();
              }
            }
          };
        }

        let animId;
        const loop = (time) => {
          renderFrame(time);
          animId = requestAnimationFrame(loop);
        };
        animId = requestAnimationFrame(loop);
      })();
    </script>
  `;
}

/**
 * Generates identical standalone HTML for website portfolio templates
 */
function generateWebsiteHtml({
  title,
  profile,
  skills,
  projects,
  experience,
  education,
  certifications,
  socialLinks,
  templateId,
  category,
  themeConfig = {},
  accentColor,
  headingColor,
  textColor,
  subtextColor,
  cardBgColor,
  cardBorderColor,
  isPremium,
  bgType = 'animation',
  bgStyle = 'template',
  bgColor = '#080b14',
  bgImage = '',
  bgDimmer = 0.65,
  bgOpacity = 0.65,
  showAnimation = true,
  esc
}) {
  const templateKey = (templateId || '').toLowerCase();
  const isDev = category === 'developer' || templateKey === 'neon-dev' || templateId === 'terminal-pro';
  const isTerminal = isDev;
  const isStudent = category === 'student';
  const isDesign = category === 'design';
  const isCreative = category === 'creative';
  const isFreelance = category === 'freelance';
  const isBusiness = category === 'business';
  const isCreator = category === 'creator';
  const isCyber = category === 'cybersecurity';
  const isServices = category === 'services';
  const isLight = isStudent;
  const fontFamily = isTerminal 
    ? "'JetBrains Mono', 'Fira Code', monospace" 
    : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

  // Multi-font and text color customization with 100% WCAG contrast-safe visibility against card background
  const nameFont = resolveFontFamily(themeConfig?.nameFont, fontFamily);
  const nameColor = getContrastSafeColor(themeConfig?.nameColor || headingColor, cardBgColor, true);
  const nameWeight = themeConfig?.nameWeight || '800';
  const nameStyle = themeConfig?.nameStyle || 'normal';
  const nameTransform = themeConfig?.nameTransform || 'none';

  const headlineFont = resolveFontFamily(themeConfig?.headlineFont, fontFamily);
  const headlineColor = getContrastSafeColor(themeConfig?.headlineColor || subtextColor, cardBgColor, false);
  const headlineWeight = themeConfig?.headlineWeight || '600';
  const headlineStyle = themeConfig?.headlineStyle || 'normal';
  const headlineTransform = themeConfig?.headlineTransform || 'none';

  const bioFont = resolveFontFamily(themeConfig?.bioFont, fontFamily);
  const bioColor = getContrastSafeColor(themeConfig?.bioColor || textColor, cardBgColor, false);
  const bioWeight = themeConfig?.bioWeight || '400';
  const bioStyle = themeConfig?.bioStyle || 'normal';

  const sectionTitleFont = resolveFontFamily(themeConfig?.sectionTitleFont, fontFamily);
  const sectionTitleColor = getContrastSafeColor(themeConfig?.sectionTitleColor || headingColor, cardBgColor, true);
  const sectionTitleWeight = themeConfig?.sectionTitleWeight || '800';
  const sectionTitleTransform = themeConfig?.sectionTitleTransform || 'none';

  const cardTitleFont = resolveFontFamily(themeConfig?.cardTitleFont, fontFamily);
  const cardTitleColor = getContrastSafeColor(themeConfig?.cardTitleColor || headingColor, cardBgColor, true);
  const cardTitleWeight = themeConfig?.cardTitleWeight || '700';

  const bodyFont = resolveFontFamily(themeConfig?.bodyFont, fontFamily);
  const bodyTextColor = getContrastSafeColor(themeConfig?.bodyTextColor || textColor, cardBgColor, false);
  const bodyWeight = themeConfig?.bodyWeight || '400';

  const cardBorderWidth = themeConfig?.cardBorderWidth || '1px';
  const cardBorderRadius = themeConfig?.cardBorderRadius || (isLight ? '12px' : (isTerminal ? '8px' : '18px'));
  const cardShadow = themeConfig?.cardShadow || '0 8px 32px rgba(0,0,0,0.35)';

  const brandTitle = isDev
    ? `> DEV_OS // ${esc(profile.fullName || 'ENGINEER')}`
    : (isStudent 
        ? `🎓 ${esc(profile.fullName || 'Graduate')}`
        : (isDesign
            ? `DESIGN CRAFT // ${esc(profile.fullName || 'PRODUCT DESIGNER')}`
            : (isCreative
                ? `📷 APERTURE // ${esc(profile.fullName || 'VISUAL ARTIST')}`
                : (isFreelance
                    ? `💼 SOLOPRENEUR // ${esc(profile.fullName || 'CONSULTANT')}`
                    : (isBusiness
                        ? `📈 VENTURE // ${esc(profile.fullName || 'EXECUTIVE')}`
                        : (isCreator
                            ? `🎬 CREATOR // ${esc(profile.fullName || 'PRODUCER')}`
                            : (isCyber
                                ? `🛡️ SEC_OPS // ${esc(profile.fullName || 'ARCHITECT')}`
                                : (isServices
                                    ? `📐 PRACTICE // ${esc(profile.fullName || 'STUDIO')}`
                                    : `⚡ ${esc(profile.fullName || title)}`))))))));

  const page1Label = isDev ? '01: sys://init' : (isStudent ? '01: Academic Overview' : (isDesign ? '01: Philosophy' : (isCreative ? '01: Artist & Lens' : (isFreelance ? '01: Agency Profile' : (isBusiness ? '01: Executive Profile' : (isCreator ? '01: Channel & Bio' : (isCyber ? '01: Security Clearance' : (isServices ? '01: Practice Brief' : '01: Overview'))))))));
  const page2Label = isDev ? '02: repos://view' : (isStudent ? '02: Capstones & Projects' : (isDesign ? '02: Bento Works' : (isCreative ? '02: Visual Gallery' : (isFreelance ? '02: Client Deliverables' : (isBusiness ? '02: Strategic Ventures' : (isCreator ? '02: Produced Media' : (isCyber ? '02: Audited Systems' : (isServices ? '02: Built Works' : '02: Works & Stack'))))))));
  const page3Label = isDev ? '03: logs://contact' : (isStudent ? '03: Placement & Contact' : (isDesign ? '03: Process & Collab' : (isCreative ? '03: Exhibitions & Bookings' : (isFreelance ? '03: Retainers & Contracts' : (isBusiness ? '03: Advisory & Board' : (isCreator ? '03: Sponsorships' : (isCyber ? '03: Incident Ops' : (isServices ? '03: Commission Inquiries' : '03: Journey & Inquiries'))))))));

  let rawStatus = profile.statusBadge;
  if (!rawStatus) {
    if (isDev) rawStatus = '● DEV_BUILD // ONLINE';
    else if (isStudent) rawStatus = '🎓 Graduate Portfolio • Verified Candidate';
    else if (isDesign) rawStatus = '🎨 UI/UX ARCHITECT // AVAILABLE';
    else if (isCreative) rawStatus = '📷 VISUAL ARTIST // BOOKINGS OPEN';
    else if (isFreelance) rawStatus = '💼 VERIFIED CONTRACTOR // TAKING CLIENTS';
    else if (isBusiness) rawStatus = '📈 EXECUTIVE ADVISOR // OPEN TO BOARDS';
    else if (isCreator) rawStatus = '🎬 DIGITAL CREATOR // SUBSCRIBED';
    else if (isCyber) rawStatus = '🛡️ SECURITY CLEARANCE // LEVEL 4';
    else if (isServices) rawStatus = '📐 STUDIO PRINCIPAL // ACCEPTING BRIEFS';
    else rawStatus = 'VERIFIED CREATOR // AVAILABLE';
  }
  const statusBadge = esc(rawStatus);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(profile.fullName || title)} — Portfolio</title>
  <meta name="description" content="${esc(profile.bio || profile.headline || 'Professional Portfolio')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Cinzel:wght@600;700;800&family=Fira+Code:wght@400;600&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --heading: ${headingColor};
      --text: ${textColor};
      --subtext: ${subtextColor};
      --card-bg: ${cardBgColor};
      --card-border: ${cardBorderColor};
      --card-border-width: ${cardBorderWidth};
      --card-radius: ${cardBorderRadius};
      --card-shadow: ${cardShadow};

      --name-font: ${nameFont};
      --name-color: ${nameColor};
      --name-weight: ${nameWeight};
      --name-style: ${nameStyle};
      --name-transform: ${nameTransform};

      --headline-font: ${headlineFont};
      --headline-color: ${headlineColor};
      --headline-weight: ${headlineWeight};
      --headline-style: ${headlineStyle};
      --headline-transform: ${headlineTransform};

      --bio-font: ${bioFont};
      --bio-color: ${bioColor};
      --bio-weight: ${bioWeight};
      --bio-style: ${bioStyle};

      --section-title-font: ${sectionTitleFont};
      --section-title-color: ${sectionTitleColor};
      --section-title-weight: ${sectionTitleWeight};
      --section-title-transform: ${sectionTitleTransform};

      --card-title-font: ${cardTitleFont};
      --card-title-color: ${cardTitleColor};
      --card-title-weight: ${cardTitleWeight};

      --body-font: ${bodyFont};
      --body-color: ${bodyTextColor};
      --body-weight: ${bodyWeight};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${bgType === 'color' ? bgColor : (isLight ? '#f8fafc' : '#080b14')};
      ${bgType === 'image' && bgImage ? `background-image: url('${esc(resolveExportImageUrl(bgImage))}'); background-size: cover; background-position: center; background-attachment: fixed;` : ''}
      color: var(--text);
      font-family: ${fontFamily};
      line-height: 1.6;
      overflow-x: hidden;
      min-height: 100vh;
      position: relative;
    }


    #bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: ${bgOpacity};
    }

    .main-wrapper {
      position: relative;
      z-index: 10;
      max-width: 1020px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 5rem;
    }

    /* Multi-Page Sticky Navigation Bar */
    .sticky-nav {
      position: sticky;
      top: 1rem;
      z-index: 50;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem 1.25rem;
      margin-bottom: 2.5rem;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: ${isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(15, 23, 42, 0.92)'};
      border: 1px solid var(--card-border);
      border-radius: 14px;
      box-shadow: ${isLight ? '0 10px 30px rgba(0,0,0,0.06)' : '0 10px 30px rgba(0,0,0,0.4)'};
      flex-wrap: wrap;
      gap: 0.85rem;
    }
    .brand-title {
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: -0.02em;
      color: var(--heading);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-btn-group {
      display: flex;
      gap: 0.4rem;
      background: ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.3)'};
      padding: 0.25rem;
      border-radius: 10px;
    }
    .nav-btn {
      background: transparent;
      color: ${isLight ? '#475569' : '#94a3b8'};
      border: none;
      font-size: 0.82rem;
      font-weight: 700;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    .nav-btn:hover, .nav-btn.active {
      background: var(--accent);
      color: #fff;
    }

    /* Section Styles */
    .portfolio-section {
      margin-bottom: 3rem;
    }
    .glass-card {
      background: var(--card-bg);
      border: var(--card-border-width) solid var(--card-border);
      border-radius: var(--card-radius);
      padding: 2rem;
      box-shadow: var(--card-shadow);
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .glass-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 40px rgba(0,0,0,0.5);
    }

    h1.hero-title {
      font-family: var(--name-font) !important;
      color: var(--name-color) !important;
      font-weight: var(--name-weight) !important;
      font-style: var(--name-style) !important;
      text-transform: var(--name-transform) !important;
      font-size: clamp(2.2rem, 5vw, 3.2rem);
      line-height: 1.15;
      margin-bottom: 0.5rem;
    }
    p.hero-headline {
      font-family: var(--headline-font) !important;
      color: var(--headline-color) !important;
      font-weight: var(--headline-weight) !important;
      font-style: var(--headline-style) !important;
      text-transform: var(--headline-transform) !important;
      font-size: 1.15rem;
      margin-bottom: 1rem;
    }
    p.hero-bio {
      font-family: var(--bio-font) !important;
      color: var(--bio-color) !important;
      font-weight: var(--bio-weight) !important;
      font-style: var(--bio-style) !important;
      font-size: 0.98rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .section-title {
      font-family: var(--section-title-font) !important;
      color: var(--section-title-color) !important;
      font-weight: var(--section-title-weight) !important;
      text-transform: var(--section-title-transform) !important;
    }
    .card-title {
      font-family: var(--card-title-font) !important;
      color: var(--card-title-color) !important;
      font-weight: var(--card-title-weight) !important;
    }
    .body-desc {
      font-family: var(--body-font) !important;
      color: var(--body-color) !important;
      font-weight: var(--body-weight) !important;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 700;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid var(--accent);
      color: var(--accent);
      margin-bottom: 0.75rem;
    }

    /* Section Divider Step Badge */
    .page-divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 3rem 0;
    }
    .divider-line {
      flex: 1;
      height: 1px;
      background: var(--card-border);
    }
    .divider-badge {
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
    }

    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .skill-cluster {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .skill-pill {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--heading);
      padding: 0.4rem 0.9rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    @media (max-width: 600px) {
      .main-wrapper { padding: 1.25rem 0.75rem 4rem; }
      .sticky-nav { padding: 0.65rem 0.85rem; flex-direction: column; align-items: stretch; gap: 0.5rem; }
      .nav-btn-group { justify-content: center; width: 100%; flex-wrap: wrap; }
      .glass-card { padding: 1.25rem 1rem; }
      .hero-title { font-size: 1.85rem !important; }
    }
    @media (max-width: 360px) {
      .main-wrapper { padding: 1rem 0.5rem 3rem; }
      .glass-card { padding: 1rem 0.75rem; }
      .hero-title { font-size: 1.55rem !important; }
      .nav-btn { font-size: 0.75rem; padding: 0.3rem 0.55rem; }
    }
  </style>
</head>
<body>

  ${bgType === 'image' && bgImage ? `
    <div style="position: fixed; inset: 0; background: rgba(0, 0, 0, ${bgDimmer}); z-index: 0; pointer-events: none;"></div>
  ` : ''}

  ${showAnimation ? `
    <!-- Dynamic 60 FPS Category Background Canvas -->
    <canvas id="bg-canvas"></canvas>
  ` : ''}

  <div class="main-wrapper">

    <!-- Multi-Page Sticky Navigation Bar -->
    <nav class="sticky-nav">
      <div class="brand-title">
        <span>${brandTitle}</span>
      </div>
      <div class="nav-btn-group">
        <a href="#page-1" class="nav-btn active">${page1Label}</a>
        <a href="#page-2" class="nav-btn">${page2Label}</a>
        <a href="#page-3" class="nav-btn">${page3Label}</a>
      </div>
    </nav>

    <!-- PAGE 1: OVERVIEW & PERSONA -->
    <section id="page-1" class="portfolio-section">
      ${isDev ? `
        <div class="glass-card" style="padding: 1rem 1.5rem; margin-bottom: 2rem; border-color: var(--accent);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
            <span style="width: 10px; height: 10px; border-radius: 50%; background: #eab308; display: inline-block;"></span>
            <span style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e; display: inline-block;"></span>
            <span style="font-size: 0.78rem; color: #64748b; margin-left: 0.5rem;">kernel://dev-runtime-v4.2</span>
          </div>
          <div style="color: var(--accent); font-size: 1.05rem; font-weight: 700;">
            $ query --persona --capabilities --full --scrollable
          </div>
        </div>
      ` : ''}

      <div class="glass-card">
        <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center;">
          ${profile.avatarUrl ? `
            <img src="${esc(resolveExportImageUrl(profile.avatarUrl))}" alt="${esc(profile.fullName)}" style="width: 120px; height: 120px; border-radius: 20px; object-fit: cover; border: 2.5px solid var(--accent); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" />
          ` : `
            <div style="width: 110px; height: 110px; border-radius: 20px; background: rgba(99, 102, 241, 0.2); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
              ${isDev ? '&gt;_' : (isStudent ? '🎓' : (isCreative ? '📷' : '🚀'))}
            </div>
          `}
          <div style="flex: 1; min-width: min(100%, 250px);">
            <div class="badge">${statusBadge}</div>
            ${isDesign ? `<div class="badge" style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: #fff; border: none; margin-bottom: 0.75rem;">✦ Figma to Production Engine</div>` : ''}
            <h1 class="hero-title">${esc(profile.fullName || 'Creator')}</h1>
            <p class="hero-headline">${esc(profile.headline || 'Software & Experience Architect')}</p>
            <p class="hero-bio">${esc(profile.bio || '')}</p>
            <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
              <a href="#page-2" style="background: var(--accent); color: #fff; padding: 0.55rem 1.25rem; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.88rem;">
                Explore Works &darr;
              </a>
              ${profile.email ? `
                <a href="mailto:${esc(profile.email)}" style="background: rgba(255,255,255,0.06); border: 1px solid var(--card-border); color: var(--text); padding: 0.55rem 1.25rem; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.88rem;">
                  Email Directly
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>

      ${isStudent && education && education.length > 0 ? `
        <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${educationList.map(edu => `
            <div class="glass-card" style="padding: 1.25rem; border-left: 3px solid var(--accent);">
              <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent); margin-bottom: 0.25rem;">🎓 ACADEMIC DEGREE</div>
              <strong class="card-title" style="font-size: 1.1rem; display: block; margin-bottom: 0.2rem;">${esc(edu.degree || edu.fieldOfStudy || 'Degree')}</strong>
              <div style="font-size: 0.88rem; color: var(--subtext); margin-bottom: 0.5rem;">${esc(edu.school || edu.institution || '')} (${esc(edu.year || edu.period || '')})</div>
              ${edu.cgpa ? `<span style="font-size: 0.78rem; background: rgba(99, 102, 241, 0.15); color: var(--accent); padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 700;">CGPA: ${esc(edu.cgpa)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </section>

    <!-- PAGE BREAK DIVIDER 01 -> 02 -->
    <div class="page-divider">
      <div class="divider-line"></div>
      <span class="divider-badge">${page2Label.toUpperCase()}</span>
      <div class="divider-line"></div>
    </div>

    <!-- PAGE 2: WORKS & STACK -->
    <section id="page-2" class="portfolio-section">
      <h2 class="section-title" style="font-size: 1.6rem; margin-bottom: 1.25rem;">
        ${isDev 
          ? '$ git status --branch production // Repositories &amp; Shipped Projects' 
          : (isStudent 
              ? 'Capstone Projects &amp; Coursework Labs' 
              : (isDesign 
                  ? 'Product Design Case Studies &amp; Bento Works' 
                  : (isCreative 
                      ? 'Curated Photographic Gallery &amp; Visual Stories' 
                      : (isFreelance 
                          ? 'Client Deliverables &amp; Retainer Works' 
                          : 'Key Projects &amp; Selected Works'))))}
      </h2>
      <div class="grid-cards" style="margin-bottom: 2.5rem;">
        ${projects.map(proj => `
          <div class="glass-card">
            ${proj.imageUrl ? `
              <img src="${esc(resolveExportImageUrl(proj.imageUrl))}" alt="${esc(proj.title)}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;" />
            ` : ''}
            <h3 class="card-title" style="font-size: 1.25rem; margin-bottom: 0.4rem;">${esc(proj.title)}</h3>
            <p class="body-desc" style="font-size: 0.88rem; margin-bottom: 1rem; line-height: 1.6;">${esc(proj.description || '')}</p>
            ${proj.techStack ? `
              <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem;">
                ${(Array.isArray(proj.techStack) ? proj.techStack : [proj.techStack]).map(t => `
                  <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.15); color: var(--accent); padding: 0.2rem 0.55rem; border-radius: 4px;">${esc(t)}</span>
                `).join('')}
              </div>
            ` : ''}
            ${proj.liveUrl ? `
              <a href="${esc(proj.liveUrl)}" target="_blank" style="color: var(--accent); font-weight: 700; font-size: 0.85rem; text-decoration: none;">
                Live Project &rarr;
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <h3 style="font-size: 1.3rem; color: var(--heading); font-weight: 800; margin-bottom: 1rem;">
        ${isDev 
          ? '$ npm list --depth=0 // Core Tech Stack &amp; Runtimes' 
          : (isStudent 
              ? 'Coursework Competencies &amp; Technical Skills' 
              : 'Core Competencies &amp; Skills')}
      </h3>
      <div class="skill-cluster">
        ${skills.map(s => `
          <div class="skill-pill">
            ${esc(s.name || s)}
          </div>
        `).join('')}
      </div>
    </section>

    <!-- PAGE BREAK DIVIDER 02 -> 03 -->
    <div class="page-divider">
      <div class="divider-line"></div>
      <span class="divider-badge">${page3Label.toUpperCase()}</span>
      <div class="divider-line"></div>
    </div>

    <!-- PAGE 3: JOURNEY & INQUIRIES -->
    <section id="page-3" class="portfolio-section">
      ${experience && experience.length > 0 ? `
        <h2 class="section-title" style="font-size: 1.6rem; margin-bottom: 1.25rem;">
          ${isStudent ? 'Internships &amp; Practical Experience' : 'Professional Experience &amp; Milestones'}
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem;">
          ${experienceList.map(exp => `
            <div class="glass-card" style="border-left: 3px solid var(--accent);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
                <strong class="card-title" style="font-size: 1.1rem;">${esc(exp.role || exp.title)}</strong>
                <span style="font-size: 0.82rem; color: var(--accent); font-weight: 700;">${esc(exp.period || '')}</span>
              </div>
              <div style="color: var(--accent); font-size: 0.88rem; font-weight: 600; margin-bottom: 0.5rem;">
                ${esc(exp.company || exp.organization)}
              </div>
              <p class="body-desc" style="font-size: 0.88rem; line-height: 1.6;">${esc(exp.description || '')}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education && education.length > 0 ? `
        <h2 class="section-title" style="font-size: 1.6rem; margin-bottom: 1.25rem;">
          Academic Qualifications &amp; Degrees
        </h2>
        <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem;">
          ${education.map(edu => `
            <div class="glass-card" style="border-left: 3px solid var(--accent); padding: 1.25rem 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
                <strong class="card-title" style="font-size: 1.05rem;">${esc(edu.degree || edu.fieldOfStudy || 'Degree')}</strong>
                <span style="font-size: 0.82rem; color: var(--accent); font-weight: 700;">${esc(edu.year || edu.period || '')}</span>
              </div>
              <div style="color: var(--subtext); font-size: 0.88rem; font-weight: 600; margin-bottom: 0.35rem;">
                ${esc(edu.school || edu.institution || '')}
              </div>
              ${edu.cgpa ? `<span style="font-size: 0.78rem; background: rgba(99, 102, 241, 0.12); color: var(--accent); padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 700;">CGPA: ${esc(edu.cgpa)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <h2 class="section-title" style="font-size: 1.6rem; margin-bottom: 1.25rem;">
          Verified Credentials &amp; Certifications
        </h2>
        <div class="glass-card" style="margin-bottom: 2.5rem;">
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${certifications.map(c => `
              <div style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.95rem;">
                <span style="color: var(--accent); font-weight: 800;">✓</span>
                <span><strong class="card-title">${esc(c.name || c.title)}</strong> ${c.issuer ? `— ${esc(c.issuer)}` : ''} ${c.date ? `(${esc(c.date)})` : ''}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="glass-card" style="text-align: center; padding: 3rem 1.5rem;">
        <h3 class="section-title" style="font-size: 1.7rem; margin-bottom: 0.5rem;">
          ${isStudent ? 'Placement Inquiries &amp; Opportunities' : "Let's Build Something Exceptional"}
        </h3>
        <p style="color: var(--subtext); margin-bottom: 1.5rem; font-size: 0.95rem;">
          ${isStudent ? 'Open to full-time engineering roles, graduate traineeships, and technical internships.' : 'Available for collaborations, contracts, and architecture advisory.'}
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          ${profile.email ? `
            <a href="mailto:${esc(profile.email)}" style="background: var(--accent); color: #fff; padding: 0.65rem 1.75rem; border-radius: 8px; font-weight: 800; text-decoration: none;">
              ✉ ${isStudent ? 'Contact Candidate' : 'Dispatch Inquiry'} (${esc(profile.email)})
            </a>
          ` : ''}
        </div>
      </div>
    </section>

  </div>

  <!-- Injected 60 FPS Category Material Script -->
  ${showAnimation && bgStyle !== 'none' ? getCategoryAnimationScript(category, accentColor, bgStyle) : ''}

  <!-- Injected Acoustic Button & Interaction Sounds System -->
  ${getAcousticButtonSoundScript()}

</body>
</html>`;
}

/**
 * Generates 100% self-contained 3D page-turning book HTML with realistic paper curl
 */
function generate3DBookHtml({
  title,
  profile,
  skills,
  projects,
  experience,
  education,
  certifications,
  socialLinks,
  templateId,
  themeConfig = {},
  accentColor,
  headingColor,
  textColor,
  subtextColor,
  cardBgColor,
  cardBorderColor,
  isPremium,
  bgType = 'animation',
  bgStyle = 'template',
  bgColor = '#101118',
  bgImage = '',
  bgDimmer = 0.65,
  bgOpacity = 0.65,
  showAnimation = true,
  esc
}) {
  const isDarkBook = templateId === 'mystic-pages' || templateId === 'the-biography';
  const rawSkills = skills || [];
  const skillList = Array.isArray(rawSkills) ? rawSkills : Object.values(rawSkills).flat();
  const projectList = Array.isArray(projects) ? projects : [];
  const experienceList = Array.isArray(experience) ? experience : [];
  const educationList = Array.isArray(education) ? education : [];
  const certList = Array.isArray(certifications) ? certifications : [];

  let bookStyleClass = 'book-style-openbook';
  let coverThemeClass = 'cover-theme-leather';
  let bookVibeTitle = 'Heritage Edition';
  let emblemSvg = `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;

  if (templateId === 'vintage-journal') {
    bookStyleClass = 'book-style-vintage';
    coverThemeClass = 'cover-theme-vintage';
    emblemSvg = `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`;
    bookVibeTitle = 'Explorer’s Codex • 1898';
  } else if (templateId === 'the-biography') {
    bookStyleClass = 'book-style-biography';
    coverThemeClass = 'cover-theme-biography';
    emblemSvg = `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>`;
    bookVibeTitle = 'Executive Monograph';
  } else if (templateId === 'mystic-pages') {
    bookStyleClass = 'book-style-mystic';
    coverThemeClass = 'cover-theme-mystic';
    emblemSvg = `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
    bookVibeTitle = 'Celestial Grimoire';
  } else if (templateId === 'flipfolio') {
    bookStyleClass = 'book-style-flipfolio';
    coverThemeClass = 'cover-theme-flipfolio';
    emblemSvg = `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`;
    bookVibeTitle = 'Architectural Lookbook';
  }

  const pageLeafBg = isDarkBook ? '#0b1120' : (templateId === 'vintage-journal' ? '#f7eedb' : (templateId === 'flipfolio' ? '#ffffff' : '#faf7f0'));
  const effectiveCardBg = cardBgColor || (isDarkBook ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.035)');
  const effectiveCardBorder = cardBorderColor 
    ? (cardBorderColor.includes(' ') ? cardBorderColor : `1px solid ${cardBorderColor}`) 
    : (isDarkBook ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)');
  const cardRadius = themeConfig?.cardRadius || (templateId === 'flipfolio' ? '2px' : '8px');
  const cardShadow = themeConfig?.cardShadow || 'none';

  const defaultPageHeading = isDarkBook ? '#e2e8f0' : (templateId === 'vintage-journal' ? '#382414' : '#0f172a');
  const defaultPageText = isDarkBook ? '#e2e8f0' : (templateId === 'vintage-journal' ? '#382414' : '#0f172a');
  const defaultPageSubtext = isDarkBook ? '#94a3b8' : (templateId === 'vintage-journal' ? '#78350f' : '#64748b');

  const nameFont = resolveFontFamily(themeConfig?.nameFont, "'Cinzel', serif");
  const nameColor = getContrastSafeColor(themeConfig?.nameColor || headingColor, pageLeafBg, true, defaultPageHeading);
  const pageNameColor = nameColor;
  const nameWeight = themeConfig?.nameWeight || '800';
  const nameStyle = themeConfig?.nameStyle || 'normal';
  const nameTransform = themeConfig?.nameTransform || 'none';

  const headlineFont = resolveFontFamily(themeConfig?.headlineFont, "'Playfair Display', Georgia, serif");
  const headlineColor = getContrastSafeColor(themeConfig?.headlineColor || subtextColor, pageLeafBg, false, defaultPageSubtext);
  const pageHeadlineColor = headlineColor;
  const headlineWeight = themeConfig?.headlineWeight || '600';
  const headlineStyle = themeConfig?.headlineStyle || 'normal';
  const headlineTransform = themeConfig?.headlineTransform || 'none';

  const bioFont = resolveFontFamily(themeConfig?.bioFont, "'Playfair Display', Georgia, serif");
  const bioColor = getContrastSafeColor(themeConfig?.bioColor || textColor, pageLeafBg, false, defaultPageText);
  const pageBioColor = bioColor;
  const bioWeight = themeConfig?.bioWeight || '400';
  const bioStyle = themeConfig?.bioStyle || 'italic';

  const sectionTitleFont = resolveFontFamily(themeConfig?.sectionTitleFont, "'Cinzel', serif");
  const sectionTitleColor = getContrastSafeColor(themeConfig?.sectionTitleColor || headingColor, pageLeafBg, true, defaultPageHeading);
  const pageSectionTitleColor = sectionTitleColor;
  const sectionTitleWeight = themeConfig?.sectionTitleWeight || '800';

  const cardTitleFont = resolveFontFamily(themeConfig?.cardTitleFont, "'Playfair Display', Georgia, serif");
  const cardTitleSafeColor = getContrastSafeColor(themeConfig?.cardTitleColor || headingColor, effectiveCardBg, true);
  const cardTitleWeight = themeConfig?.cardTitleWeight || '700';

  const bodyFont = resolveFontFamily(themeConfig?.bodyFont, "'Inter', sans-serif");
  const cardBodySafeColor = getContrastSafeColor(themeConfig?.bodyTextColor || textColor, effectiveCardBg, false);
  const pageBodyTextColor = getContrastSafeColor(themeConfig?.bodyTextColor || textColor, pageLeafBg, false, defaultPageText);
  const pageRoleColor = getContrastSafeColor(themeConfig?.cardTitleColor || headingColor, pageLeafBg, true, defaultPageHeading);
  const pageSubtextColor = getContrastSafeColor(themeConfig?.subtextColor || subtextColor, pageLeafBg, false, defaultPageSubtext);
  const pageTextColor = getContrastSafeColor(themeConfig?.textColor || textColor, pageLeafBg, false, defaultPageText);
  const bodyWeight = themeConfig?.bodyWeight || '400';

  const isLightCategory = !isDarkBook;
  const isCustomBg = bgType === 'color' || bgType === 'image';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(profile.fullName || title)} — 3D Physical Turning Book Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
  <!-- StPageFlip 3D Engine for Physical Paper Turning -->
  <script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"></script>
  <style>
    :root {
      --accent: ${accentColor};
      --heading: ${headingColor};
      --text: ${textColor};
      --subtext: ${subtextColor};
      --card-bg: ${effectiveCardBg};
      --card-border: ${effectiveCardBorder};
      --card-radius: ${cardRadius};
      --card-shadow: ${cardShadow};

      --name-font: ${nameFont};
      --name-color: ${nameColor};
      --name-weight: ${nameWeight};
      --name-style: ${nameStyle};
      --name-transform: ${nameTransform};

      --headline-font: ${headlineFont};
      --headline-color: ${headlineColor};
      --headline-weight: ${headlineWeight};
      --headline-style: ${headlineStyle};
      --headline-transform: ${headlineTransform};

      --bio-font: ${bioFont};
      --bio-color: ${bioColor};
      --bio-weight: ${bioWeight};
      --bio-style: ${bioStyle};

      --section-title-font: ${sectionTitleFont};
      --section-title-color: ${sectionTitleColor};
      --section-title-weight: ${sectionTitleWeight};

      --card-title-font: ${cardTitleFont};
      --card-title-color: ${cardTitleSafeColor};
      --card-title-weight: ${cardTitleWeight};

      --body-font: ${bodyFont};
      --body-color: ${pageBodyTextColor};
      --body-weight: ${bodyWeight};

      --font-book: ${nameFont};
      --font-serif: ${headlineFont};
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${bgType === 'color' && bgColor ? bgColor : 'radial-gradient(ellipse at 50% 40%, #1e1b18 0%, #121217 65%, #08080c 100%)'};
      color: ${isDarkBook ? '#e2e8f0' : '#1e293b'};
      font-family: var(--font-serif);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0;
      overflow-x: hidden;
      position: relative;
    }


    /* 3D Viewport Wrapper - Full Website Immersive Dimension */
    .book-viewport-wrapper {
      position: relative;
      z-index: 10;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 1.5rem 1rem 1.25rem;
    }

    .physical-book-stage {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      flex: 1;
      padding: 0.5rem;
      min-height: 0;
    }

    /* Flanking Floating Stage Navigation Buttons */
    .book-stage-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 40;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .book-stage-nav-btn:hover:not(:disabled) {
      background: var(--accent);
      border-color: var(--accent);
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8);
    }
    .book-stage-nav-btn:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
    .book-nav-prev { left: 16px; }
    .book-nav-next { right: 16px; }

    /* The 3D Book Chassis & Stack Layering */
    .st-book-chassis {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 98vw;
      filter: drop-shadow(0 30px 65px rgba(0, 0, 0, 0.75)) drop-shadow(0 12px 28px rgba(0, 0, 0, 0.5));
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .st-book-container {
      position: relative;
      z-index: 5;
      border-radius: 6px;
      overflow: visible;
    }

    /* Stacked Paper Edges Simulation */
    .book-paper-stack-left {
      position: absolute;
      top: 14px;
      bottom: 14px;
      left: -9px;
      width: 10px;
      background: repeating-linear-gradient(to bottom, #f4ebd8, #f4ebd8 1.5px, #cfbc93 1.5px, #cfbc93 3px);
      border-radius: 4px 0 0 4px;
      box-shadow: -3px 0 6px rgba(0, 0, 0, 0.4);
      z-index: 2;
      pointer-events: none;
    }
    .book-paper-stack-right {
      position: absolute;
      top: 14px;
      bottom: 14px;
      right: -9px;
      width: 10px;
      background: repeating-linear-gradient(to bottom, #f4ebd8, #f4ebd8 1.5px, #cfbc93 1.5px, #cfbc93 3px);
      border-radius: 0 4px 4px 0;
      box-shadow: 3px 0 6px rgba(0, 0, 0, 0.4);
      z-index: 2;
      pointer-events: none;
    }
    .book-paper-stack-bottom {
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: -8px;
      height: 9px;
      background: repeating-linear-gradient(to right, #f4ebd8, #f4ebd8 2px, #cfbc93 2px, #cfbc93 3.5px);
      border-radius: 0 0 4px 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.45);
      z-index: 2;
      pointer-events: none;
    }

    .book-style-biography .book-paper-stack-left,
    .book-style-biography .book-paper-stack-right,
    .book-style-mystic .book-paper-stack-left,
    .book-style-mystic .book-paper-stack-right {
      background: repeating-linear-gradient(to bottom, #242d3d, #242d3d 1.5px, #0f172a 1.5px, #0f172a 3px);
    }
    .book-style-biography .book-paper-stack-bottom,
    .book-style-mystic .book-paper-stack-bottom {
      background: repeating-linear-gradient(to right, #242d3d, #242d3d 2px, #0f172a 2px, #0f172a 3.5px);
    }

    /* Central Spine Hinge Highlight */
    .book-center-spine-highlight {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 28px;
      transform: translateX(-50%);
      background: linear-gradient(to right, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.05) 45%, rgba(255, 255, 255, 0.08) 50%, rgba(0, 0, 0, 0.05) 55%, rgba(0, 0, 0, 0.28) 100%);
      pointer-events: none;
      z-index: 25;
    }

    /* Base Page Sheets */
    .st-page {
      background-color: ${pageLeafBg};
      color: ${pageTextColor};
      overflow: hidden;
      box-sizing: border-box;
      width: 460px;
      height: 590px;
    }

    .st-page-inner {
      width: 100%;
      height: 100%;
      padding: 1.5rem 1.6rem;
      overflow-y: auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .st-page-inner::-webkit-scrollbar { width: 5px; }
    .st-page-inner::-webkit-scrollbar-track { background: transparent; }
    .st-page-inner::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.15); border-radius: 4px; }

    /* Shading gradients */
    .book-style-openbook .book-page-left {
      background-image: linear-gradient(to right, #f4eee3 0%, #faf7f2 12%, #faf7f2 92%, #e5dcce 100%);
    }
    .book-style-openbook .book-page-right {
      background-image: linear-gradient(to left, #f4eee3 0%, #faf7f2 12%, #faf7f2 92%, #e5dcce 100%);
    }
    .book-style-vintage .st-page:not([data-density="hard"]) {
      background-color: #f7eedb;
      color: #382414;
      background-image: radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.04) 0%, transparent 80%);
    }
    .book-style-vintage .book-page-left { border-right: 1px dashed rgba(120, 53, 15, 0.3); }
    .book-style-vintage .book-page-right { border-left: 1px dashed rgba(120, 53, 15, 0.2); }

    .book-style-biography .st-page:not([data-density="hard"]) { background-color: #0b1120; color: #e2e8f0; }
    .book-style-biography .book-page-left { border-right: 1px solid rgba(148, 163, 184, 0.2); }
    .book-style-biography .book-page-right { border-left: 1px solid rgba(148, 163, 184, 0.15); }

    .book-style-mystic .st-page:not([data-density="hard"]) {
      background-color: #0d091e;
      color: #e0e7ff;
      background-image: radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 60%);
    }
    .book-style-mystic .book-page-left { border-right: 1px solid rgba(139, 92, 246, 0.3); }
    .book-style-mystic .book-page-right { border-left: 1px solid rgba(139, 92, 246, 0.2); }

    .book-style-flipfolio .st-page:not([data-density="hard"]) { background-color: #ffffff; color: #0f172a; font-family: var(--font-sans); }
    .book-style-flipfolio .book-page-left { border-right: 2px solid #e5e7eb; }
    .book-style-flipfolio .book-page-right { border-left: 2px solid #e5e7eb; }

    /* Crease & Spine Shadow */
    .book-gutter-shadow {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 40px;
      pointer-events: none;
      z-index: 5;
    }
    .book-page-left .book-gutter-shadow {
      right: 0;
      background: linear-gradient(to left, rgba(0, 0, 0, 0.14), transparent);
    }
    .book-page-right .book-gutter-shadow {
      left: 0;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.14), transparent);
    }
    .book-style-biography .book-page-left .book-gutter-shadow,
    .book-style-mystic .book-page-left .book-gutter-shadow {
      background: linear-gradient(to left, rgba(0, 0, 0, 0.45), transparent);
    }
    .book-style-biography .book-page-right .book-gutter-shadow,
    .book-style-mystic .book-page-right .book-gutter-shadow {
      background: linear-gradient(to right, rgba(0, 0, 0, 0.45), transparent);
    }

    /* Folio Headers & Footers */
    .page-folio-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 0.4rem;
      margin-bottom: 1.15rem;
      font-size: 0.74rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      opacity: 0.75;
    }
    .book-style-biography .page-folio-header,
    .book-style-mystic .page-folio-header {
      border-bottom-color: rgba(255, 255, 255, 0.14);
    }

    .page-folio-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      padding-top: 0.75rem;
      margin-top: auto;
      font-size: 0.78rem;
    }
    .book-style-biography .page-folio-footer,
    .book-style-mystic .page-folio-footer {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
    .book-page-num {
      font-weight: 600;
      font-size: 0.8rem;
    }

    /* HARDCOVER STYLING */
    .page-cover-front,
    .page-cover-back {
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.6);
    }

    .cover-spine-crease {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 18px;
      width: 18px;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(255, 255, 255, 0.09) 50%, rgba(0, 0, 0, 0.35));
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      pointer-events: none;
    }

    .cover-ornate-frame {
      border: 2px solid rgba(255, 255, 255, 0.32);
      padding: 2.25rem 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 380px;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(6px);
      text-align: center;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 16px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 2;
    }

    .cover-emblem-wrapper {
      margin: 0 auto 0.75rem;
      display: flex;
      justify-content: center;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
    }

    .cover-vibe-tag {
      font-size: 0.76rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      opacity: 0.85;
      margin-bottom: 0.45rem;
    }

    .cover-book-title {
      font-family: var(--font-book);
      font-size: 2rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1.15;
      margin-bottom: 0.6rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    }

    .cover-golden-divider {
      width: 75px;
      height: 2px;
      background: currentColor;
      margin: 0.6rem auto 1rem;
      opacity: 0.65;
    }

    .cover-author-name {
      font-family: var(--font-serif);
      font-size: 1.2rem;
      font-style: italic;
      opacity: 0.95;
      margin-bottom: 0.2rem;
    }

    .cover-author-headline {
      font-size: 0.8rem;
      opacity: 0.8;
      margin-bottom: 1.25rem;
    }

    .cover-open-cue {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.38);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cover-open-cue:hover {
      background: rgba(255, 255, 255, 0.28);
      transform: translateY(-1px) scale(1.02);
    }

    /* Distinct Cover Themes */
    .cover-theme-leather {
      background: radial-gradient(circle at 30% 30%, #5d4037 0%, #3e2723 60%, #1a120b 100%);
      border: 4px solid #b8860b;
      color: #fef3c7;
    }
    .cover-theme-vintage {
      background: radial-gradient(circle at 40% 40%, #78350f 0%, #451a03 70%, #1f1006 100%);
      border: 4px double #d97706;
      color: #fef3c7;
    }
    .cover-theme-biography {
      background: radial-gradient(circle at 30% 30%, #1e293b 0%, #0f172a 65%, #020617 100%);
      border: 4px solid #94a3b8;
      color: #f8fafc;
    }
    .cover-theme-mystic {
      background: radial-gradient(circle at 50% 50%, #2e1065 0%, #0f0728 60%, #05020c 100%);
      border: 4px solid #c084fc;
      box-shadow: 0 0 35px rgba(168, 85, 247, 0.4);
      color: #e0e7ff;
    }
    .cover-theme-flipfolio {
      background: radial-gradient(circle at 30% 30%, #064e3b 0%, #022c22 65%, #011612 100%);
      border: 4px solid #10b981;
      color: #ecfdf5;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      font-family: var(--font-sans);
    }
    .btn-sm { padding: 0.35rem 0.75rem; font-size: 0.82rem; }
    .btn-xs { padding: 0.25rem 0.55rem; font-size: 0.74rem; border-radius: 4px; }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.12);
      color: #f8fafc;
      border-color: rgba(255, 255, 255, 0.2);
    }
    .btn-secondary:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.22);
    }
    .btn-primary {
      background: var(--accent);
      color: #fff;
    }
    .btn-outline {
      background: transparent;
      border-color: rgba(255, 255, 255, 0.25);
      color: #e2e8f0;
    }
    .btn-outline:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
    }
    .btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .book-stage-nav-btn { display: none; }
      .st-book-chassis {
        width: 100% !important;
        max-width: 440px !important;
        height: auto !important;
      }
      .st-book-container {
        width: 100% !important;
        max-width: 440px !important;
      }
      .book-paper-stack-left, .book-center-spine-highlight { display: none !important; }
      .st-page { width: 100% !important; }
    }
  </style>
</head>
<body>

  <!-- Physical 3D Book Viewport -->
  <div class="book-viewport-wrapper ${bookStyleClass}">

    <div class="physical-book-stage">

      <!-- Flanking Stage Navigation Buttons (Desktop) -->
      <button class="book-stage-nav-btn book-nav-prev" onclick="turnBook(-1)" id="stage-prev-btn" title="Turn Page Backward">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <button class="book-stage-nav-btn book-nav-next" onclick="turnBook(1)" id="stage-next-btn" title="Turn Page Forward">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <!-- 3D Book Chassis with Realistic Paper Stack Edges -->
      <div class="st-book-chassis">
        <div class="book-paper-stack-left"></div>
        <div class="book-paper-stack-right"></div>
        <div class="book-paper-stack-bottom"></div>
        <div class="book-center-spine-highlight"></div>

        <!-- StPageFlip Mount Container -->
        <div id="book-container" class="st-book-container">

          <!-- ================= SHEET 0: FRONT HARDCOVER ================= -->
          <div class="st-page ${coverThemeClass}" data-density="hard">
            <div class="st-page-inner page-cover-front">
              <div class="cover-spine-crease"></div>
              <div class="cover-ornate-frame">
                <div class="cover-emblem-wrapper">
                  ${emblemSvg}
                </div>
                <div class="cover-vibe-tag">${bookVibeTitle}</div>
                <h1 class="cover-book-title" style="color: ${nameColor}; font-family: var(--name-font); font-weight: var(--name-weight); font-style: var(--name-style); text-transform: var(--name-transform);">
                  ${esc(profile.fullName || title)}
                </h1>
                <div class="cover-golden-divider"></div>
                <p class="cover-author-name" style="color: ${headlineColor}; font-family: var(--headline-font); font-style: var(--headline-style);">
                  ${esc(profile.fullName || 'Alex River')}
                </p>
                <p class="cover-author-headline" style="color: ${headlineColor}; font-family: var(--headline-font);">
                  ${esc(profile.headline || 'Full Stack & Software Architect')}
                </p>
                <div class="cover-open-cue" data-jump-page="1" onclick="jumpToPage(1)">
                  <span>Grab corner or click to open</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 1: PROLOGUE & FOLIO (CHAPTER I) ================= -->
          <div class="st-page book-page-left" data-density="soft">
            <div class="st-page-inner">
              <div class="book-gutter-shadow"></div>

              <div class="page-folio-header">
                <span>${templateId === 'vintage-journal' ? '⚜ CODEX FOLIO NO. 01' : templateId === 'mystic-pages' ? '✦ ARCANA I: ORIGINS ✦' : 'PROLOGUE & FOLIO'}</span>
                <span>CHAPTER I</span>
              </div>

              <div style="display: flex; alignItems: center; gap: 1rem; margin-bottom: 1.25rem;">
                ${profile.avatarUrl ? `
                  <img src="${esc(resolveExportImageUrl(profile.avatarUrl))}" alt="${esc(profile.fullName || 'Author')}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid ${accentColor}; flex-shrink: 0;" />
                ` : `
                  <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.3rem; color: ${pageTextColor}; flex-shrink: 0;">
                    ${esc(profile.fullName ? profile.fullName.charAt(0) : 'P')}
                  </div>
                `}
                <div>
                  <h2 style="font-size: 1.5rem; line-height: 1.15; color: ${pageNameColor}; font-family: var(--name-font); font-weight: var(--name-weight); font-style: var(--name-style);">
                    ${esc(profile.fullName || 'Alex River')}
                  </h2>
                  <p style="font-size: 0.86rem; margin-top: 0.2rem; color: ${pageHeadlineColor}; font-family: var(--headline-font); font-weight: var(--headline-weight);">
                    ${esc(profile.headline || 'Full Stack & Software Architect')}
                  </p>
                </div>
              </div>

              <div style="margin-bottom: 1.25rem; font-size: 0.9rem; line-height: 1.65; border-left: 3.5px solid ${accentColor}; padding: 0.65rem 0.85rem; background: ${isDarkBook ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}; border-radius: 0 6px 6px 0; color: ${pageBioColor}; font-family: var(--bio-font); font-weight: var(--bio-weight); font-style: var(--bio-style);">
                "${esc(profile.bio || 'Passionate about crafting resilient web architectures, elegant user experiences, and high-performance interactive digital tools.')}"
              </div>

              <!-- Interactive Table of Contents -->
              <div style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; box-shadow: ${cardShadow}; padding: 0.9rem 1rem; margin-top: 0.5rem;">
                <h4 style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.45rem; color: ${pageTextColor};">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                  Table of Contents
                </h4>
                <ul style="list-style: none; font-size: 0.84rem; display: flex; flex-direction: column; gap: 0.4rem; padding: 0; margin: 0;">
                  <li data-jump-page="1" onclick="jumpToPage(1)" style="cursor: pointer; display: flex; justify-content: space-between; padding: 0.3rem 0.45rem; border-radius: 4px; color: ${pageTextColor};">
                    <span>Chapter I: Biography &amp; Stack 💻</span> <strong style="color: ${accentColor};">p. 2-3</strong>
                  </li>
                  <li data-jump-page="3" onclick="jumpToPage(3)" style="cursor: pointer; display: flex; justify-content: space-between; padding: 0.3rem 0.45rem; border-radius: 4px; color: ${pageTextColor};">
                    <span>Chapter II: Featured Works 🚀</span> <strong style="color: ${accentColor};">p. 4-5</strong>
                  </li>
                  <li data-jump-page="5" onclick="jumpToPage(5)" style="cursor: pointer; display: flex; justify-content: space-between; padding: 0.3rem 0.45rem; border-radius: 4px; color: ${pageTextColor};">
                    <span>Chapter III: Credentials &amp; Contact 📜</span> <strong style="color: ${accentColor};">p. 6-7</strong>
                  </li>
                </ul>
              </div>

              <div class="page-folio-footer">
                <span data-jump-page="0" onclick="jumpToPage(0)" style="cursor: pointer; color: ${accentColor}; font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Close Cover
                </span>
                <span class="book-page-num" style="color: ${pageSubtextColor};">Page 2 of 8</span>
                <span style="font-size: 0.74rem; opacity: 0.7; color: ${pageSubtextColor};">Grab corner ⤴</span>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 2: TECHNICAL PROFICIENCIES (CHAPTER I) ================= -->
          <div class="st-page book-page-right" data-density="soft">
            <div class="st-page-inner">
              <div class="book-gutter-shadow"></div>

              <div class="page-folio-header">
                <span>TECHNICAL PROFICIENCIES</span>
                <span>CHAPTER I</span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.85rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: ${pageSectionTitleColor}; font-weight: 800;">
                  ${templateId === 'vintage-journal' ? 'Artisan Disciplines ⚜' : 'Core Proficiencies ⚡'}
                </h3>
              </div>

              <p style="font-size: 0.86rem; color: ${pageSubtextColor}; margin-bottom: 1rem;">
                Mastered frameworks, modern architectures, tools, and paradigms:
              </p>

              <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.25rem;">
                ${skillList.map(skill => `
                  <span style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; color: ${pageTextColor}; padding: 0.35rem 0.65rem; font-size: 0.82rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: ${accentColor};"></span>
                    <strong style="color: ${pageTextColor};">${esc(skill.name || skill)}</strong>
                    ${skill.level ? `<span style="color: ${pageSubtextColor}; opacity: 0.85;">• ${esc(skill.level)}</span>` : ''}
                  </span>
                `).join('')}
              </div>

              <div style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; color: ${pageTextColor}; padding: 0.85rem; font-size: 0.85rem; margin-bottom: 1rem;">
                <strong style="color: ${accentColor};">✨ Specialization:</strong> Full-stack applications, interactive 3D perspective engines, and performant REST microservices.
              </div>

              <div class="page-folio-footer">
                <span></span>
                <span class="book-page-num" style="color: ${pageSubtextColor};">Page 3 of 8</span>
                <span data-jump-page="3" onclick="jumpToPage(3)" style="cursor: pointer; color: ${accentColor}; font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  Next: Projects →
                </span>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 3: FEATURED WORKS (CHAPTER II) ================= -->
          <div class="st-page book-page-left" data-density="soft">
            <div class="st-page-inner">
              <div class="book-gutter-shadow"></div>

              <div class="page-folio-header">
                <span>FEATURED WORKS</span>
                <span>CHAPTER II</span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <h3 style="font-size: 1.35rem; color: ${pageSectionTitleColor}; font-family: var(--section-title-font); font-weight: var(--section-title-weight);">
                  ${templateId === 'vintage-journal' ? 'Inventions & Works 📜' : 'Selected Projects 🚀'}
                </h3>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.9rem;">
                ${projectList.slice(0, 3).map(proj => `
                  <div style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; box-shadow: ${cardShadow}; padding: 0.85rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem;">
                      <h4 style="font-size: 0.96rem; color: ${cardTitleSafeColor}; font-family: var(--card-title-font); font-weight: var(--card-title-weight);">${esc(proj.title)}</h4>
                      <div style="display: flex; gap: 0.5rem;">
                        ${proj.githubUrl ? `
                          <a href="${esc(proj.githubUrl)}" target="_blank" rel="noreferrer" style="color: ${pageSubtextColor};" title="View Source">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                          </a>
                        ` : ''}
                        ${proj.liveUrl ? `
                          <a href="${esc(proj.liveUrl)}" target="_blank" rel="noreferrer" style="color: ${accentColor};" title="Live Preview">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                          </a>
                        ` : ''}
                      </div>
                    </div>
                    <p style="font-size: 0.8rem; line-height: 1.45; margin-bottom: 0.45rem; color: ${cardBodySafeColor}; font-family: var(--body-font); font-weight: var(--body-weight);">
                      ${esc(proj.description || '')}
                    </p>
                    ${proj.techStack ? `
                      <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                        ${(Array.isArray(proj.techStack) ? proj.techStack : proj.techStack.split(',')).map(t => `
                          <span style="background: ${isDarkBook ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; color: ${cardBodySafeColor}; padding: 0.12rem 0.4rem; border-radius: 3px; font-size: 0.7rem; font-family: var(--font-sans);">
                            ${esc(t.trim())}
                          </span>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

              <div class="page-folio-footer">
                <span data-jump-page="1" onclick="jumpToPage(1)" style="cursor: pointer; color: ${accentColor}; font-weight: 600;">
                  ← Prev (p. 2-3)
                </span>
                <span class="book-page-num" style="color: ${pageSubtextColor};">Page 4 of 8</span>
                <span style="font-size: 0.74rem; opacity: 0.7; color: ${pageSubtextColor};">Grab corner ⤴</span>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 4: WORK EXPERIENCE (CHAPTER II) ================= -->
          <div class="st-page book-page-right" data-density="soft">
            <div class="st-page-inner">
              <div class="book-gutter-shadow"></div>

              <div class="page-folio-header">
                <span>CAREER MILESTONES</span>
                <span>CHAPTER II</span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <h3 style="font-size: 1.35rem; color: ${pageSectionTitleColor}; font-family: var(--section-title-font); font-weight: var(--section-title-weight);">
                  ${templateId === 'the-biography' ? 'Executive Milestones' : 'Work Experience 💼'}
                </h3>
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${experience.map(exp => `
                  <div style="border-left: 2.5px solid ${accentColor}; padding-left: 0.85rem; position: relative;">
                    <div style="position: absolute; left: -5px; top: 4px; width: 7px; height: 7px; border-radius: 50%; background: ${accentColor};"></div>
                    <h4 style="font-size: 0.94rem; color: ${pageRoleColor}; font-family: var(--card-title-font); font-weight: var(--card-title-weight);">${esc(exp.role || exp.title)}</h4>
                    <div style="font-size: 0.8rem; color: ${pageSubtextColor}; margin-bottom: 0.3rem;">
                      <strong>${esc(exp.company || '')}</strong> • <span>${esc(exp.period || '')}</span>
                    </div>
                    <p style="font-size: 0.8rem; line-height: 1.45; color: ${pageBodyTextColor}; font-family: var(--body-font); font-weight: var(--body-weight);">
                      ${esc(exp.description || '')}
                    </p>
                  </div>
                `).join('')}
              </div>

              <div class="page-folio-footer">
                <span></span>
                <span class="book-page-num" style="color: ${pageSubtextColor};">Page 5 of 8</span>
                <span data-jump-page="5" onclick="jumpToPage(5)" style="cursor: pointer; color: ${accentColor}; font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  Next: Credentials →
                </span>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 5: EDUCATION & CERTIFICATIONS (CHAPTER III) ================= -->
          <div class="st-page book-page-left" data-density="soft">
            <div class="st-page-inner">
              <div class="book-gutter-shadow"></div>

              <div class="page-folio-header">
                <span>CREDENTIALS &amp; ACADEMIA</span>
                <span>CHAPTER III</span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                <h3 style="font-size: 1.35rem; color: ${pageSectionTitleColor}; font-family: var(--section-title-font); font-weight: var(--section-title-weight);">
                  Education &amp; Honors 🎓
                </h3>
              </div>

              <div style="margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
                ${education.map(edu => `
                  <div style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; box-shadow: ${cardShadow}; padding: 0.75rem;">
                    <h4 style="font-size: 0.9rem; color: ${cardTitleSafeColor}; font-family: var(--card-title-font); font-weight: var(--card-title-weight);">${esc(edu.degree)}</h4>
                    <div style="font-size: 0.78rem; color: ${pageSubtextColor};">${esc(edu.school)} • ${esc(edu.year)}</div>
                    ${edu.grade ? `<div style="font-size: 0.76rem; color: ${accentColor}; font-weight: 600; margin-top: 0.15rem;">Score: ${esc(edu.grade)}</div>` : ''}
                  </div>
                `).join('')}
              </div>

              <div style="display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.6rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                <h4 style="font-size: 1rem; color: ${cardTitleSafeColor}; font-family: var(--card-title-font); font-weight: var(--card-title-weight);">Professional Certifications</h4>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8rem; color: ${pageSubtextColor};">
                ${certList.map(cert => `
                  <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted rgba(0,0,0,0.1); padding-bottom: 0.2rem;">
                    <span>• ${esc(cert.name || cert)}</span>
                    <span style="opacity: 0.7;">${esc(cert.issuer || '')}</span>
                  </div>
                `).join('')}
              </div>

              <div class="page-folio-footer">
                <span data-jump-page="3" onclick="jumpToPage(3)" style="cursor: pointer; color: ${accentColor}; font-weight: 600;">
                  ← Prev (p. 4-5)
                </span>
                <span class="book-page-num" style="color: ${pageSubtextColor};">Page 6 of 8</span>
                <span style="font-size: 0.74rem; opacity: 0.7; color: ${pageSubtextColor};">Grab corner ⤴</span>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 6: LETTERS & INQUIRIES (EPILOGUE) ================= -->
          <div class="st-page book-page-right" data-density="soft">
            <div class="st-page-inner">
              <div class="book-gutter-shadow"></div>

              <div class="page-folio-header">
                <span>LETTERS &amp; INQUIRIES</span>
                <span>EPILOGUE</span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <h3 style="font-size: 1.35rem; color: ${pageSectionTitleColor}; font-family: var(--section-title-font); font-weight: var(--section-title-weight);">
                  ${templateId === 'vintage-journal' ? 'Epilogue & Letters ✉' : 'Get In Touch ✉'}
                </h3>
              </div>

              <p style="font-size: 0.85rem; margin-bottom: 1rem; line-height: 1.55; color: ${pageBodyTextColor}; font-family: var(--body-font); font-weight: var(--body-weight);">
                I welcome discussions on full-stack architecture, software engineering, and innovative partnerships.
              </p>

              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; font-size: 0.85rem;">
                ${profile.email ? `
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <a href="mailto:${esc(profile.email)}" style="font-weight: 600; color: ${pageTextColor}; text-decoration: none;">
                      ${esc(profile.email)}
                    </a>
                  </div>
                ` : ''}
                ${profile.phone ? `
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: ${pageSubtextColor};">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>${esc(profile.phone)}</span>
                  </div>
                ` : ''}
                ${profile.location ? `
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: ${pageSubtextColor};">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>${esc(profile.location)}</span>
                  </div>
                ` : ''}
              </div>

              <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem;">
                ${socialLinks.github ? `
                  <a href="${esc(socialLinks.github)}" target="_blank" rel="noreferrer" class="btn btn-secondary btn-xs" style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; color: ${pageTextColor};">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub
                  </a>
                ` : ''}
                ${socialLinks.linkedin ? `
                  <a href="${esc(socialLinks.linkedin)}" target="_blank" rel="noreferrer" class="btn btn-secondary btn-xs" style="background: ${effectiveCardBg}; border: ${effectiveCardBorder}; border-radius: ${cardRadius}; color: ${pageTextColor};">
                    LinkedIn
                  </a>
                ` : ''}
              </div>

              ${profile.resumeUrl ? `
                <a href="${esc(resolveExportImageUrl(profile.resumeUrl))}" target="_blank" rel="noreferrer" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; margin-bottom: 0.5rem;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Download Resume
                </a>
              ` : `
                <button data-jump-page="1" onclick="jumpToPage(1)" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; border-color: ${accentColor}; color: ${pageTextColor}; margin-bottom: 0.5rem;">
                  Return to Chapter I
                </button>
              `}

              <div class="page-folio-footer">
                <span></span>
                <span class="book-page-num" style="color: ${pageSubtextColor};">Page 7 of 8</span>
                <span data-jump-page="7" onclick="jumpToPage(7)" style="cursor: pointer; color: ${accentColor}; font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  Back Cover 📖 →
                </span>
              </div>
            </div>
          </div>

          <!-- ================= SHEET 7: BACK HARDCOVER ================= -->
          <div class="st-page ${coverThemeClass}" data-density="hard">
            <div class="st-page-inner page-cover-back">
              <div class="cover-spine-crease" style="left: auto; right: 16px;"></div>
              
              <div class="cover-ornate-frame" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.85rem; opacity: 0.9; color: currentColor;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <h3 style="font-family: var(--font-book); letter-spacing: 0.14em; font-size: 1.4rem; text-transform: uppercase; margin-bottom: 0.4rem;">
                  FOLIOVERSE
                </h3>
                <p style="font-family: var(--font-serif); font-style: italic; opacity: 0.8; font-size: 0.88rem; max-width: 80%; margin: 0 auto 1.5rem;">
                  Crafted with interactive 3D digital book technology. Bound with physical curvature &amp; dynamic paper physics.
                </p>
                <div class="cover-golden-divider" style="width: 60px; margin: 0.5rem auto 1.5rem;"></div>

                <div style="display: flex; gap: 0.65rem;">
                  <button data-jump-page="5" onclick="jumpToPage(5)" class="btn btn-outline btn-xs" style="color: inherit; border-color: currentColor;">
                    ← Prev (p. 6-7)
                  </button>
                  <button data-jump-page="0" onclick="jumpToPage(0)" class="btn btn-primary btn-xs" style="background: ${accentColor}; border-color: ${accentColor};">
                    Reopen Cover
                  </button>
                </div>

                <div style="margin-top: 2rem; font-size: 0.72rem; opacity: 0.65; letter-spacing: 0.1em;">
                  Anno MMXXVI • Edition Authentica
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

  <!-- Physical StPageFlip Interactive Engine Initialization & Audio Synthesis -->
  <script>
    let isMuted = false;
    let pageFlipInstance = null;
    const totalPages = 8;
    let currentPageIndex = 0;

    // Authentic Multi-Layer Acoustic Paper Turn Sound Synthesis via Web Audio API
    function playAuthenticBookPageTurnSound() {
      if (isMuted) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Layer 1: Dry friction sweep
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

        // Layer 2: Air whoosh / body resonance
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

        // Layer 3: Paper landing slap / settle tap
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
      } catch (e) {}
    }

    function updateIndicator(page) {
      currentPageIndex = page;
      const stagePrev = document.getElementById('stage-prev-btn');
      const stageNext = document.getElementById('stage-next-btn');

      if (stagePrev) stagePrev.disabled = page === 0;
      if (stageNext) stageNext.disabled = page >= totalPages - 1;
    }

    function toggleMute() {
      isMuted = !isMuted;
    }

    function jumpToPage(num) {
      if (pageFlipInstance) {
        pageFlipInstance.flip(num, 'bottom');
      }
    }

    function turnBook(dir) {
      if (pageFlipInstance) {
        if (dir > 0) pageFlipInstance.flipNext('bottom');
        else pageFlipInstance.flipPrev('bottom');
      }
    }

    // Keyboard Arrow Keys Navigation
    window.addEventListener('keydown', function(e) {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight') turnBook(1);
      else if (e.key === 'ArrowLeft') turnBook(-1);
    });

    // Initialize PageFlip on DOM Ready
    window.addEventListener('load', function() {
      const container = document.getElementById('book-container');
      if (!container) return;

      const PageFlipClass = (window.St && window.St.PageFlip) || window.PageFlip;
      if (PageFlipClass) {
        try {
          function calculateDimensions() {
            const isM = window.innerWidth <= 768;
            let bw, bh;
            if (isM) {
              bw = Math.min(window.innerWidth - 28, 440);
              bh = Math.min(Math.round(bw * 1.36), window.innerHeight - 50);
            } else {
              // Full website dimension - gracefully scales to fill the viewport
              const availW = Math.min(window.innerWidth - 72, 1560);
              const availH = Math.min(window.innerHeight - 60, 960);
              let spreadW = Math.min(availW, availH * (920 / 590));
              spreadW = Math.max(760, spreadW);
              bw = Math.round(spreadW / 2);
              bh = Math.round(bw * (590 / 460));
            }
            return { bw, bh, isM };
          }

          const dims = calculateDimensions();
          let baseWidth = dims.bw;
          let baseHeight = dims.bh;
          const isMobile = dims.isM;

          container.style.width = isMobile ? (baseWidth + 'px') : (baseWidth * 2 + 'px');
          container.style.height = baseHeight + 'px';

          pageFlipInstance = new PageFlipClass(container, {
            width: baseWidth,
            height: baseHeight,
            size: 'fixed',
            minWidth: isMobile ? 260 : 360,
            maxWidth: isMobile ? 480 : 820,
            minHeight: isMobile ? 360 : 480,
            maxHeight: isMobile ? 660 : 1060,
            maxShadowOpacity: ${isDarkBook ? 0.75 : 0.6},
            showCover: true,
            mobileScrollSupport: true,
            useMouseEvents: true,
            clickEventForward: true,
            usePortrait: isMobile,
            startPage: 0,
            drawShadow: true,
            flippingTime: 750,
            showPageCorners: true,
            disableFlipByClick: false,
          });

          pageFlipInstance.loadFromHTML(document.querySelectorAll('.st-page'));

          let resizeTimer;
          window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
              const d = calculateDimensions();
              container.style.width = d.isM ? (d.bw + 'px') : (d.bw * 2 + 'px');
              container.style.height = d.bh + 'px';
              if (pageFlipInstance && typeof pageFlipInstance.update === 'function') {
                pageFlipInstance.update();
              }
            }, 120);
          });

          pageFlipInstance.on('flip', function(e) {
            const page = typeof e.data === 'number' ? e.data : e;
            updateIndicator(page);
            playAuthenticBookPageTurnSound();
          });

          pageFlipInstance.on('changeState', function(e) {
            if (e.data === 'user_fold') {
              playAuthenticBookPageTurnSound();
            }
          });

          // Delegated click handler for page-internal chapter jumps
          container.addEventListener('click', function(e) {
            const jumpTarget = e.target.closest('[data-jump-page]');
            if (jumpTarget && pageFlipInstance) {
              const targetPage = parseInt(jumpTarget.getAttribute('data-jump-page'), 10);
              if (!isNaN(targetPage)) {
                pageFlipInstance.flip(targetPage, 'bottom');
              }
            }
          });

          updateIndicator(0);
        } catch (err) {
          console.warn('PageFlip init error:', err);
        }
      }
    });
  </script>

  <!-- Injected Acoustic Button & Interaction Sounds System -->
  ${getAcousticButtonSoundScript()}

</body>
</html>`;
}

/**
 * Triggers instant browser download of the Portfolio HTML file
 */
export function downloadPortfolioAsHtml(portfolio) {
  const htmlContent = generateStandalonePortfolioHtml(portfolio);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const rawTitle = portfolio?.title || portfolio?.profile?.fullName || 'portfolio';
  const cleanFilename = rawTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-') + '-portfolio.html';

  const link = document.createElement('a');
  link.href = url;
  link.download = cleanFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return cleanFilename;
}
