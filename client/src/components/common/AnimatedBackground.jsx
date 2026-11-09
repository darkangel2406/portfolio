import React, { useEffect, useRef, useState } from 'react';

// Shared event name for changing background style across components
export const BG_CHANGE_EVENT = 'folioview_bg_change';

export const setGlobalBackground = (style) => {
  try {
    localStorage.setItem('folioview_bg_style', style);
    window.dispatchEvent(new CustomEvent(BG_CHANGE_EVENT, { detail: { style } }));
  } catch (e) {
    // Ignore storage issues
  }
};

export const getGlobalBackground = () => {
  try {
    const val = localStorage.getItem('folioview_bg_style');
    if (val && ['birds', 'net', 'waves', 'halo', 'aurora'].includes(val)) {
      return val;
    }
    localStorage.setItem('folioview_bg_style', 'birds');
    return 'birds';
  } catch {
    return 'birds';
  }
};

/**
 * High-Performance 60FPS Canvas Backgrounds
 * Optimized with fast distance checks, reduced draw overhead, and smooth scroll response
 */
export default function AnimatedBackground({ initialStyle }) {
  const canvasRef = useRef(null);
  const [currentStyle, setCurrentStyle] = useState(() => initialStyle || getGlobalBackground());
  const [activeWeather, setActiveWeather] = useState(null);

  useEffect(() => {
    if (initialStyle) {
      setCurrentStyle(initialStyle);
    }
  }, [initialStyle]);

  useEffect(() => {
    const handleBgChange = (e) => {
      if (e.detail && e.detail.style) {
        setCurrentStyle(e.detail.style);
      }
    };
    window.addEventListener(BG_CHANGE_EVENT, handleBgChange);
    return () => window.removeEventListener(BG_CHANGE_EVENT, handleBgChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (throttled)
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, isOver: false };

    // Scroll tracking
    let scrollY = window.scrollY || 0;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    let scrollProgress = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let mouseTicking = false;
    const handleMouseMove = (e) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          mouse.targetX = e.clientX;
          mouse.targetY = e.clientY;
          mouse.isOver = true;
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY || 0;
          const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          scrollProgress = currentY / docHeight;
          scrollVelocity = currentY - lastScrollY;
          lastScrollY = currentY;
          scrollY = currentY;
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // -------------------------------------------------------------
    // STYLE 1: 'net' (Optimized 3D Constellation Nodes)
    // -------------------------------------------------------------
    const initNet = () => {
      const count = Math.min(50, Math.floor((width * height) / 22000));
      const particles = [];
      const colors = ['#38bdf8', '#818cf8', '#c084fc'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 450 + 100,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          vz: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.8 + 1.2,
          color: colors[i % 3]
        });
      }

      return () => {
        ctx.fillStyle = '#07090e';
        ctx.fillRect(0, 0, width, height);

        scrollVelocity *= 0.9;
        const scrollBoost = scrollVelocity * 0.12;

        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const tiltX = (mouse.x - width / 2) * 0.0003 + (scrollProgress - 0.5) * 0.15;
        const tiltY = (mouse.y - height / 2) * 0.0003;
        const fov = 400;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy - scrollBoost * 0.35;
          p.z += p.vz + scrollBoost * 0.5;

          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
          if (p.y < -40) p.y = height + 40;
          if (p.y > height + 40) p.y = -40;
          if (p.z < 50) p.z = 550;
          if (p.z > 550) p.z = 50;

          const scale = fov / (fov + p.z);
          p.projX = (p.x - width / 2) * scale + width / 2 + tiltX * p.z;
          p.projY = (p.y - height / 2) * scale + height / 2 + tiltY * p.z;
          p.projScale = scale;

          ctx.beginPath();
          ctx.arc(p.projX, p.projY, p.radius * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, Math.max(0.2, scale * 1.1));
          ctx.fill();
        }

        ctx.lineWidth = 0.85;
        const maxDist = 120;
        const maxDistSq = maxDist * maxDist;

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.projX - p2.projX;
            const dy = p1.projY - p2.projY;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.32;
              ctx.beginPath();
              ctx.moveTo(p1.projX, p1.projY);
              ctx.lineTo(p2.projX, p2.projY);
              ctx.strokeStyle = '#6366f1';
              ctx.globalAlpha = alpha;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      };
    };

    // -------------------------------------------------------------
    // STYLE 2: 'waves' (Optimized Low-Poly Ocean Mesh)
    // -------------------------------------------------------------
    const initWaves = () => {
      const cols = 16;
      const rows = 11;
      let phase = 0;

      return () => {
        ctx.fillStyle = '#060b19';
        ctx.fillRect(0, 0, width, height);

        scrollVelocity *= 0.9;
        phase += 0.02 + Math.abs(scrollVelocity) * 0.002;

        const cellW = (width * 1.35) / cols;
        const cellH = (height * 0.85) / rows;
        const originX = -width * 0.18;
        const originY = height * 0.32;

        const grid = [];
        for (let r = 0; r <= rows; r++) {
          grid[r] = [];
          for (let c = 0; c <= cols; c++) {
            const x = originX + c * cellW;
            const y = originY + r * cellH;
            const wave = Math.sin(c * 0.45 + phase) * 22 + Math.cos(r * 0.5 + phase * 0.8 + scrollProgress * 3) * 18;
            const perspectiveFactor = 0.55 + (r / rows) * 0.5;
            grid[r][c] = {
              x: (x - width / 2) * perspectiveFactor + width / 2,
              y: y - wave * perspectiveFactor + (scrollProgress - 0.5) * 45,
              elevation: wave
            };
          }
        }

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p1 = grid[r][c];
            const p2 = grid[r][c + 1];
            const p3 = grid[r + 1][c];
            const p4 = grid[r + 1][c + 1];

            const avgElev = (p1.elevation + p2.elevation + p3.elevation) / 3;
            const lightness = Math.min(55, Math.max(14, 18 + avgElev * 0.7));

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = `hsl(${210 + (c / cols) * 25}, 85%, ${lightness}%)`;
            ctx.globalAlpha = 0.65;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(p2.x, p2.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = `hsl(${200 + (c / cols) * 30}, 88%, ${lightness + 2}%)`;
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      };
    };

    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // STYLE 3: 'aurora' (Deep Cosmic Nebula with Stars & Luminous Moon)
    // -------------------------------------------------------------
    const initAurora = () => {
      const numStars = Math.min(130, Math.floor((width * height) / 10000));
      const stars = [];
      const starColors = ['#ffffff', '#f8fafc', '#e0f2fe', '#bae6fd', '#fed7aa', '#fbcfe8', '#c084fc'];

      for (let i = 0; i < numStars; i++) {
        const isBright = i % 8 === 0;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          origX: Math.random() * width,
          origY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: isBright ? Math.random() * 2.2 + 1.6 : Math.random() * 1.3 + 0.6,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.04,
          color: starColors[i % starColors.length],
          isBright
        });
      }

      // Shooting Star / Meteor Particle System
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

      return () => {
        ctx.fillStyle = '#04050d';
        ctx.fillRect(0, 0, width, height);

        time += 0.012;
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        scrollVelocity *= 0.9;
        const scrollOffset = scrollVelocity * 0.1;

        // 1. Multi-layered Cosmic Nebula Clouds
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

        // 2. CELESTIAL LUMINOUS MOON WITH SOFT AURA & DETAILED SHADING
        const moonBaseX = width * 0.82;
        const moonBaseY = Math.min(height * 0.22, 180);
        // Parallax drift with mouse & subtle orbital bob
        const moonX = moonBaseX + (mouse.x - width * 0.5) * 0.035;
        const moonY = moonBaseY + (mouse.y - height * 0.5) * 0.035 + Math.sin(time * 0.5) * 4;
        const moonRadius = Math.min(width * 0.055, 48);

        ctx.save();

        // Moon Atmospheric Halo / Outer Glow
        const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.8, moonX, moonY, moonRadius * 3.4);
        moonGlow.addColorStop(0, 'rgba(224, 242, 254, 0.35)');
        moonGlow.addColorStop(0.3, 'rgba(186, 230, 253, 0.18)');
        moonGlow.addColorStop(0.65, 'rgba(147, 197, 253, 0.06)');
        moonGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = moonGlow;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius * 3.4, 0, Math.PI * 2);
        ctx.fill();

        // Moon Celestial Body Shading (Soft Luminous Silver-White Sphere)
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

        // Subtle Maria (Lunar Surface Texture & Crater Shadows)
        const craterColors = 'rgba(100, 116, 139, 0.18)';
        ctx.fillStyle = craterColors;
        // Crater 1
        ctx.beginPath();
        ctx.arc(moonX - moonRadius * 0.25, moonY - moonRadius * 0.1, moonRadius * 0.22, 0, Math.PI * 2);
        ctx.fill();
        // Crater 2
        ctx.beginPath();
        ctx.arc(moonX + moonRadius * 0.18, moonY - moonRadius * 0.3, moonRadius * 0.16, 0, Math.PI * 2);
        ctx.fill();
        // Crater 3
        ctx.beginPath();
        ctx.arc(moonX + moonRadius * 0.1, moonY + moonRadius * 0.28, moonRadius * 0.26, 0, Math.PI * 2);
        ctx.fill();

        // Luminous Crescent Shadow (Cast realistic crescent shadow)
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

        // Lunar Rim Glow
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        // 3. TWINKLING STARS & STELLAR CONSTELLATION NODES
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.pulse += s.pulseSpeed;

          // Interactive gentle repulsion if cursor sweeps near star
          if (mouse.isOver) {
            const dx = s.x - mouse.x;
            const dy = s.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 140 && dist > 0) {
              const force = (1 - dist / 140) * 1.8;
              s.vx += (dx / dist) * force;
              s.vy += (dy / dist) * force;
            }
          }

          s.vx *= 0.95;
          s.vy *= 0.95;
          s.x += s.vx;
          s.y += s.vy - scrollOffset * 0.15;

          if (s.x < -20) s.x = width + 20;
          if (s.x > width + 20) s.x = -20;
          if (s.y < -20) s.y = height + 20;
          if (s.y > height + 20) s.y = -20;

          const twinkle = (Math.sin(s.pulse) + 1) / 2; // 0 to 1
          const alpha = 0.35 + twinkle * 0.65;
          const curRadius = s.radius * (0.8 + twinkle * 0.4);

          // Star Glow Corona
          if (s.isBright) {
            const starHalo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, curRadius * 4);
            starHalo.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`);
            starHalo.addColorStop(0.5, `rgba(186, 230, 253, ${alpha * 0.2})`);
            starHalo.addColorStop(1, 'transparent');
            ctx.fillStyle = starHalo;
            ctx.beginPath();
            ctx.arc(s.x, s.y, curRadius * 4, 0, Math.PI * 2);
            ctx.fill();

            // 4-Point Diffraction Cross Spikes for prominent bright stars
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.lineWidth = 0.8;
            const spikeLen = curRadius * 3.5;
            ctx.beginPath();
            ctx.moveTo(s.x - spikeLen, s.y);
            ctx.lineTo(s.x + spikeLen, s.y);
            ctx.moveTo(s.x, s.y - spikeLen);
            ctx.lineTo(s.x, s.y + spikeLen);
            ctx.stroke();
          }

          // Star Core
          ctx.beginPath();
          ctx.arc(s.x, s.y, curRadius, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        // 4. SHOOTING STARS / METEORS
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
          meteorGrad.addColorStop(0.7, `rgba(186, 230, 253, ${met.life * 0.6})`);
          meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${met.life})`);

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(met.x, met.y);
          ctx.stroke();

          // Meteor head spark
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(met.x, met.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      };
    };

    // -------------------------------------------------------------
    // STYLE 5: 'halo' (Luminous Chromatic Aurora Plasma)
    // -------------------------------------------------------------
    const initHalo = () => {
      let t = 0;

      return () => {
        ctx.fillStyle = '#06050e';
        ctx.fillRect(0, 0, width, height);

        scrollVelocity *= 0.9;
        t += 0.012 + Math.abs(scrollVelocity) * 0.001;

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        const centerX = mouse.x * 0.25 + (width / 2) * 0.75;
        const centerY = mouse.y * 0.25 + (height / 2) * 0.75 + (scrollProgress - 0.5) * 80;

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
          const rot = t * (0.25 + r * 0.1) + scrollProgress * 1.5;

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
    };

    // -------------------------------------------------------------
    // STYLE 6: 'birds' (Real Flying Birds, Volumetric Clouds, Dynamic Weather & Radiant Sun)
    // -------------------------------------------------------------
    let weatherAudioCtx = null;
    let rainGainNode = null;
    let isWeatherAudioInitialized = false;

    const initWeatherAudio = () => {
      if (isWeatherAudioInitialized && weatherAudioCtx) {
        if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
        return;
      }
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        weatherAudioCtx = new AudioContextClass();

        // 1. Continuous Soothing Rain Patter (Filtered Pink Noise Loop)
        const bufferSize = weatherAudioCtx.sampleRate * 2.5;
        const noiseBuffer = weatherAudioCtx.createBuffer(1, bufferSize, weatherAudioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
          b6 = white * 0.115926;
        }

        const rainSource = weatherAudioCtx.createBufferSource();
        rainSource.buffer = noiseBuffer;
        rainSource.loop = true;

        const rainFilter = weatherAudioCtx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.setValueAtTime(1250, weatherAudioCtx.currentTime);

        rainGainNode = weatherAudioCtx.createGain();
        rainGainNode.gain.setValueAtTime(0, weatherAudioCtx.currentTime);

        rainSource.connect(rainFilter);
        rainFilter.connect(rainGainNode);
        rainGainNode.connect(weatherAudioCtx.destination);
        rainSource.start();

        isWeatherAudioInitialized = true;
      } catch (e) {
        console.warn('Weather audio init:', e);
      }
    };

    // REALISTIC, SCARY LIGHTNING & THUNDER (Idimuzhakkam)
    // 1. Initial "CRACK! / SNAP!" — High-pitched sharp tear like wooden beams splitting instantly
    // 2. Rolling Rumble (Idimuzhakkam) — "RUMBLE... BOOM... THUN-THUN-THUN-RRRRR..." ground-shaking roll
    const playThunderSound = () => {
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
        thunDelays.forEach((delay, idx) => {
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
    };

    // NATURAL MORNING BIRDS SOUND (Paravai Oli: Kaalai Kural & Fluttering)
    // 1. "Chirp, chirp!" — Bright, crisp, high-pitched tones bouncing rhythmically
    // 2. "Twit-twoo!" — Melodic rising & falling early morning woodland air call
    // 3. "Trill-ill-ill... Flap-flap-flap!" — Gentle whistling trill + soft feather flight rustle
    const playAmbientBirdCall = () => {
      if (!weatherAudioCtx) return;
      try {
        if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
        const now = weatherAudioCtx.currentTime;
        const motif = Math.floor(Math.random() * 3);

        if (motif === 0) {
          // Motif 1: "Chirp, chirp!" (Two crisp morning chirps)
          const chirpTimes = [0, 0.12];
          chirpTimes.forEach((tOffset, idx) => {
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

          // 3 soft wing feather flutter puffs
          [0.08, 0.16, 0.24].forEach((fOffset) => {
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
    };

    // DISTRESSED AVIAN SCREECH & PANICKED SQUAWK WHEN BIRD IS STRUCK BY LIGHTNING
    const playBirdHitSound = () => {
      if (!weatherAudioCtx) return;
      try {
        if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
        const now = weatherAudioCtx.currentTime;

        // 1. High-Pitched Panicked Avian Screech (Carrier modulated with harsh vibrato)
        const chirpOsc = weatherAudioCtx.createOscillator();
        chirpOsc.type = 'sawtooth';
        chirpOsc.frequency.setValueAtTime(3400, now);
        chirpOsc.frequency.exponentialRampToValueAtTime(4200, now + 0.04);
        chirpOsc.frequency.exponentialRampToValueAtTime(1350, now + 0.22);

        // Fast FM vibrato (110 Hz) for realistic screeching throat squawk flutter
        const vibrato = weatherAudioCtx.createOscillator();
        vibrato.frequency.setValueAtTime(110, now);
        const vibratoGain = weatherAudioCtx.createGain();
        vibratoGain.gain.setValueAtTime(390, now);
        vibratoGain.gain.exponentialRampToValueAtTime(40, now + 0.22);
        vibrato.connect(chirpOsc.frequency);

        // Vocal tract formant filter
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

        // 2. Secondary High Squawk Cry
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
    };

    const playBirdExplosionSound = () => {
      if (!weatherAudioCtx) return;
      try {
        if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
        const now = weatherAudioCtx.currentTime;

        // High voltage electric arc zap
        const zapOsc = weatherAudioCtx.createOscillator();
        zapOsc.type = 'sawtooth';
        zapOsc.frequency.setValueAtTime(1800, now);
        zapOsc.frequency.exponentialRampToValueAtTime(120, now + 0.12);

        const zapFilter = weatherAudioCtx.createBiquadFilter();
        zapFilter.type = 'bandpass';
        zapFilter.frequency.setValueAtTime(1200, now);
        zapFilter.Q.value = 2.5;

        const zapGain = weatherAudioCtx.createGain();
        zapGain.gain.setValueAtTime(0.35, now);
        zapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        zapOsc.connect(zapFilter);
        zapFilter.connect(zapGain);
        zapGain.connect(weatherAudioCtx.destination);
        zapOsc.start(now);
        zapOsc.stop(now + 0.15);

        // Skull detonation pop & blast
        const popOsc = weatherAudioCtx.createOscillator();
        popOsc.type = 'triangle';
        popOsc.frequency.setValueAtTime(280, now);
        popOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

        const popGain = weatherAudioCtx.createGain();
        popGain.gain.setValueAtTime(0.45, now);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        popOsc.connect(popGain);
        popGain.connect(weatherAudioCtx.destination);
        popOsc.start(now);
        popOsc.stop(now + 0.22);
      } catch (e) {}
    };

    window.addEventListener('click', initWeatherAudio, { once: true });
    window.addEventListener('keydown', initWeatherAudio, { once: true });

    let forcedWeatherPhase = null;

    const handleWeatherOverride = (e) => {
      forcedWeatherPhase = e.detail?.mode || null;
    };
    window.addEventListener('birds_weather_override', handleWeatherOverride);

    const initBirds = () => {
      const startTime = performance.now();
      let lightningFlash = 0;
      let lightningBolt = null;
      let nextLightningTime = Math.random() * 200 + 120;
      let nextBirdCallTime = 90;
      const skullExplosions = [];

      const triggerBirdSkullExplosion = (b) => {
        b.isDead = true;
        b.deadTimer = 0;

        const birdAngle = Math.atan2(b.vy, b.vx) + b.bank;
        const birdScale = b.scale;
        const birdLen = 26 * birdScale;
        const originX = b.x;
        const originY = b.y;

        // Play distressed bird screech & squawk followed by bone explosion & high voltage zap
        playBirdHitSound();
        playBirdExplosionSound();

        // DRAMATIC AVIAN SKELETON & BONE EXPLOSION ACROSS DISPLAY:
        // Generates Skull Plates, Wing Bone Rods (Radius/Ulna), Ribcage Splinters, and High-Voltage Sparks
        const particles = [];
        
        // 1. Cranial Skull Fragments (Angular bone plates)
        for (let s = 0; s < 7; s++) {
          const angle = (s / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
          const speed = 4.5 + Math.random() * 9.5;
          particles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed + b.vx * 0.5,
            vy: Math.sin(angle) * speed - 2.5,
            size: (3.5 + Math.random() * 4.5) * birdScale,
            boneType: 'skull',
            color: '#f8fafc',
            alpha: 1.0,
            decay: 0.012 + Math.random() * 0.016,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.45
          });
        }

        // 2. Wing Bones (Elongated Radius, Ulna & Humerus rods tumbling far across display)
        for (let w = 0; w < 8; w++) {
          const wAngle = Math.random() * Math.PI * 2;
          const wSpeed = 7.0 + Math.random() * 14.0;
          particles.push({
            x: originX,
            y: originY,
            vx: Math.cos(wAngle) * wSpeed + (Math.random() - 0.5) * 6,
            vy: Math.sin(wAngle) * wSpeed - (Math.random() * 8 + 4),
            boneLen: (16 + Math.random() * 18) * birdScale,
            boneThick: (3 + Math.random() * 2) * birdScale,
            boneType: 'wing_bone',
            color: '#f1f5f9',
            alpha: 1.0,
            decay: 0.010 + Math.random() * 0.014,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.55
          });
        }

        // 3. Ribcage & Vertebrae Splinters (Flying radial shards)
        for (let r = 0; r < 14; r++) {
          const rAngle = Math.random() * Math.PI * 2;
          const rSpeed = 5.0 + Math.random() * 11.0;
          particles.push({
            x: originX,
            y: originY,
            vx: Math.cos(rAngle) * rSpeed,
            vy: Math.sin(rAngle) * rSpeed - 3.0,
            size: (2.5 + Math.random() * 3.5) * birdScale,
            boneType: 'rib',
            color: '#e2e8f0',
            alpha: 1.0,
            decay: 0.014 + Math.random() * 0.018,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.6
          });
        }

        // 4. High-Voltage Fiery Electric Sparks & Embers
        for (let p = 0; p < 36; p++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 4.0 + Math.random() * 16.0;
          particles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2.0,
            size: (1.5 + Math.random() * 3.5) * birdScale,
            boneType: 'spark',
            color: Math.random() < 0.4 ? '#38bdf8' : (Math.random() < 0.7 ? '#fbbf24' : '#ef4444'),
            alpha: 1.0,
            decay: 0.018 + Math.random() * 0.025,
            rotation: 0,
            rotSpeed: 0
          });
        }

        skullExplosions.push({
          x: originX,
          y: originY,
          scale: birdScale,
          shockwaveRadius: 0,
          shockwaveMax: 90 * birdScale,
          alpha: 1.0,
          particles: particles,
          flashIntensity: 1.2
        });
      };

      // Weather Cycle Constants (Seconds)
      const T_SUNNY_1 = 60;   // 1 minute (60s) of serene gentle blue sky
      const T_DARKEN = 6;     // 6s smooth cinematic transition into dark stormy sky
      const T_RAIN = 60;      // 1 minute (60s) of light black sky with rain, broad lightning & thunder
      const T_CLEAR = 6;      // 6s smooth cinematic clearing into sunny sky
      const T_SUNNY_2 = 120;  // 2 minutes of radiant sunny sky with glowing sun on upper left corner
      const CYCLE_TOTAL = T_SUNNY_1 + T_DARKEN + T_RAIN + T_CLEAR + T_SUNNY_2;

      // Color interpolation helper
      const lerpColor = (c1, c2, factor) => {
        const f = Math.max(0, Math.min(1, factor));
        const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
        const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
        const r = Math.round(r1 + (r2 - r1) * f);
        const g = Math.round(g1 + (g2 - g1) * f);
        const b = Math.round(b1 + (b2 - b1) * f);
        return `rgb(${r}, ${g}, ${b})`;
      };

      // Real Multi-Lobed Volumetric Clouds
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
          x,
          y,
          origY: y,
          scale,
          speed,
          opacity,
          puffs: puffOffsets,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.004,
          vx: 0,
          vy: 0
        });
      }

      // Enhanced Population of Real Avian Birds (Flocking + Solitary)
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

      let lastMouseX = mouse.x;
      let lastMouseY = mouse.y;
      let time = 0;

      return () => {
        time += 1;
        const now = performance.now();
        const elapsed = ((now - startTime) / 1000) % CYCLE_TOTAL;

        // Determine Weather State Factors
        let darkFactor = 0;
        let rainFactor = 0;
        let sunFactor = 0.85;

        // Interactive manual override or automated smooth cycle
        if (forcedWeatherPhase === 'sun') {
          darkFactor = 0;
          rainFactor = 0;
          sunFactor = 1.0;
        } else if (forcedWeatherPhase === 'rain') {
          darkFactor = 1.0;
          rainFactor = 1.0;
          sunFactor = 0.0;
        } else if (elapsed < T_SUNNY_1) {
          // Phase 1: 1 Minute of Serene Gentle Blue Sky
          darkFactor = 0;
          rainFactor = 0;
          sunFactor = 0.85;
        } else if (elapsed < T_SUNNY_1 + T_DARKEN) {
          // Transition 1 -> 2: Sky darkens into light black, clouds build up, rain begins
          const p = (elapsed - T_SUNNY_1) / T_DARKEN;
          darkFactor = p;
          rainFactor = p * p;
          sunFactor = Math.max(0, 0.85 * (1 - p));
        } else if (elapsed < T_SUNNY_1 + T_DARKEN + T_RAIN) {
          // Phase 2: 5 Full Minutes of Light Black Sky & Rain
          darkFactor = 1.0;
          rainFactor = 1.0;
          sunFactor = 0.0;
        } else if (elapsed < T_SUNNY_1 + T_DARKEN + T_RAIN + T_CLEAR) {
          // Transition 2 -> 3: Rain clears, dark sky lifts, radiant sun emerges
          const p = (elapsed - (T_SUNNY_1 + T_DARKEN + T_RAIN)) / T_CLEAR;
          darkFactor = 1.0 - p;
          rainFactor = Math.max(0, 1.0 - p * 1.5);
          sunFactor = p;
        } else {
          // Phase 3: Radiant Normal Daylight with Real Sun in Left Upper Corner
          darkFactor = 0;
          rainFactor = 0;
          sunFactor = 1.0;
        }

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
          corona.addColorStop(0, `rgba(255, 250, 205, ${0.48 * sunFactor})`);
          corona.addColorStop(0.28, `rgba(254, 215, 102, ${0.3 * sunFactor})`);
          corona.addColorStop(0.65, `rgba(251, 191, 36, ${0.12 * sunFactor})`);
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
            rayGrad.addColorStop(0, `rgba(254, 240, 138, ${0.35 * sunFactor})`);
            rayGrad.addColorStop(0.5, `rgba(251, 191, 36, ${0.15 * sunFactor})`);
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
          disc.addColorStop(0, `rgba(255, 255, 255, ${0.98 * sunFactor})`);
          disc.addColorStop(0.35, `rgba(255, 250, 210, ${0.95 * sunFactor})`);
          disc.addColorStop(0.7, `rgba(254, 215, 102, ${0.85 * sunFactor})`);
          disc.addColorStop(0.92, `rgba(251, 146, 60, ${0.55 * sunFactor})`);
          disc.addColorStop(1, `rgba(245, 158, 11, ${0.15 * sunFactor})`);
          ctx.fillStyle = disc;
          ctx.beginPath();
          ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle Cinematic Lens Flare Streak
          if (sunFactor > 0.3) {
            const flareGrad = ctx.createLinearGradient(sunX - 30, sunY - 30, sunX + 340, sunY + 290);
            flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            flareGrad.addColorStop(0.18, `rgba(254, 240, 138, ${0.18 * sunFactor})`);
            flareGrad.addColorStop(0.4, `rgba(147, 197, 253, ${0.12 * sunFactor})`);
            flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = flareGrad;
            ctx.beginPath();
            ctx.ellipse(sunX + 150, sunY + 130, 200, 28, Math.PI / 4.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        const mouseVx = mouse.x - lastMouseX;
        const mouseVy = mouse.y - lastMouseY;
        lastMouseX = mouse.x;
        lastMouseY = mouse.y;

        // 3. Volumetric Clouds with Dynamic Weather Adaptation (White Fluffy <-> Storm Rain Clouds)
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

          // Interactive mouse air currents
          const cdx = (c.x + 30) - mouse.x;
          const cdy = c.y - mouse.y;
          const cdist = Math.hypot(cdx, cdy);
          if (cdist < 240 && mouse.isOver) {
            const push = (1 - cdist / 240) * 1.8;
            c.vx += (cdx / cdist) * push + mouseVx * 0.04;
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
            grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${c.opacity})`);
            grad.addColorStop(0.45, `rgba(${Math.round(cr * 0.95)}, ${Math.round(cg * 0.95)}, ${Math.round(cb * 0.98)}, ${c.opacity * 0.92})`);
            grad.addColorStop(0.75, `rgba(${cDarkR}, ${cDarkG}, ${cDarkB}, ${c.opacity * 0.6})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fill();

            // Internal cloud illumination from lightning flash
            if (lightningFlash > 0.04) {
              const flashAlpha = Math.min(0.65, lightningFlash * 0.58 * rainFactor);
              const flashGrad = ctx.createRadialGradient(px, py, pr * 0.1, px, py, pr);
              flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
              flashGrad.addColorStop(0.55, `rgba(224, 242, 254, ${flashAlpha * 0.45})`);
              flashGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
              ctx.fillStyle = flashGrad;
              ctx.beginPath();
              ctx.arc(px, py, pr, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        }

        // 4. Realistic Slanted Rain Streaks, Ground Mist, Broad Lightning & Thunder Sound
        if (rainFactor > 0.02) {
          nextBirdCallTime = 120; // Birds seek shelter and remain quiet during rain
          // Adjust Synthesized Rain Sound Volume smoothly
          if (rainGainNode && weatherAudioCtx) {
            try {
              rainGainNode.gain.setTargetAtTime(0.22 * rainFactor, weatherAudioCtx.currentTime, 0.2);
            } catch (e) {}
          }

          // Trigger Expansive Broad Lightning Strike during storm
          if (rainFactor > 0.25) {
            nextLightningTime--;
            if (nextLightningTime <= 0) {
              lightningFlash = 1.0;
              const boltStartX = width * 0.15 + Math.random() * (width * 0.7);
              const boltStartY = Math.random() * 30;
              const segments = [{ x: boltStartX, y: boltStartY }];
              let cx = boltStartX, cy = boltStartY;
              const boltEndY = height * (0.45 + Math.random() * 0.38);
              const branches = [];
              const crawlers = [];

              // Main trunk with dramatic zig-zag breadth
              while (cy < boltEndY) {
                cy += 14 + Math.random() * 22;
                cx += (Math.random() - 0.5) * 85;
                segments.push({ x: cx, y: cy });

                // Wide lateral branches spanning 150px - 450px sideways across the sky
                if (Math.random() < 0.38) {
                  const dir = Math.random() < 0.5 ? -1 : 1;
                  const bLen = 4 + Math.floor(Math.random() * 6);
                  let bx = cx, by = cy;
                  const bSegs = [{ x: bx, y: by }];
                  for (let s = 0; s < bLen; s++) {
                    by += 10 + Math.random() * 18;
                    bx += dir * (26 + Math.random() * 42) + (Math.random() - 0.3) * 20;
                    bSegs.push({ x: bx, y: by });

                    // Sub-branch fork
                    if (s === 2 && Math.random() < 0.65) {
                      let sx = bx, sy = by;
                      const subSegs = [{ x: sx, y: sy }];
                      for (let ss = 0; ss < 3; ss++) {
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
                const crawlDir = Math.random() < 0.5 ? -1 : 1;
                let crx = boltStartX;
                let cry = boltStartY + Math.random() * 35;
                const crawlSegs = [{ x: crx, y: cry }];
                const crawlSteps = 8 + Math.floor(Math.random() * 7);
                for (let c = 0; c < crawlSteps; c++) {
                  crx += crawlDir * (32 + Math.random() * 52);
                  cry += (Math.random() - 0.45) * 24;
                  crawlSegs.push({ x: crx, y: cry });
                }
                crawlers.push(crawlSegs);
              }

              // ONE OR TWO BIRDS MUST TOUCH THE LIGHTNING!
              const liveBirds = birds.filter(b => !b.isDead && b.x > 80 && b.x < width - 80 && b.y > 60 && b.y < height * 0.72);
              const targetBirds = liveBirds.slice(0, Math.min(2, Math.floor(Math.random() * 2) + 1));

              targetBirds.forEach(tb => {
                const connSeg = segments[Math.min(segments.length - 1, Math.floor(Math.random() * 4) + 1)];
                const directLightningBranch = [
                  { x: connSeg.x, y: connSeg.y },
                  { x: (connSeg.x + tb.x) * 0.5 + (Math.random() - 0.5) * 35, y: (connSeg.y + tb.y) * 0.5 + (Math.random() - 0.5) * 35 },
                  { x: tb.x + (Math.random() - 0.5) * 8, y: tb.y + (Math.random() - 0.5) * 8 },
                  { x: tb.x, y: tb.y }
                ];
                branches.push(directLightningBranch);
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
            ctx.strokeStyle = `rgba(186, 230, 253, ${d.alpha * rainFactor})`;
            ctx.lineWidth = d.thickness;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.wind * (d.len / d.speed) * 3, d.y + d.len);
            ctx.stroke();
          }

          // Soft low atmosphere rain mist layer
          const mistGrad = ctx.createLinearGradient(0, height - 140, 0, height);
          mistGrad.addColorStop(0, 'rgba(148, 163, 184, 0)');
          mistGrad.addColorStop(1, `rgba(148, 163, 184, ${0.22 * rainFactor})`);
          ctx.fillStyle = mistGrad;
          ctx.fillRect(0, height - 140, width, 140);

          // Render Broad, Brilliant Electric Lightning Bolt (Tri-Layer Corona + Arc + Core)
          if (lightningBolt && lightningBolt.alpha > 0.01) {
            ctx.save();

            // Trace path helper for all segments (main + wide lateral branches + crawlers)
            const traceLightningPaths = () => {
              ctx.beginPath();
              ctx.moveTo(lightningBolt.main[0].x, lightningBolt.main[0].y);
              for (let s = 1; s < lightningBolt.main.length; s++) {
                ctx.lineTo(lightningBolt.main[s].x, lightningBolt.main[s].y);
              }
              for (let b = 0; b < lightningBolt.branches.length; b++) {
                const br = lightningBolt.branches[b];
                ctx.moveTo(br[0].x, br[0].y);
                for (let s = 1; s < br.length; s++) {
                  ctx.lineTo(br[s].x, br[s].y);
                }
              }
              if (lightningBolt.crawlers) {
                for (let c = 0; c < lightningBolt.crawlers.length; c++) {
                  const cr = lightningBolt.crawlers[c];
                  ctx.moveTo(cr[0].x, cr[0].y);
                  for (let s = 1; s < cr.length; s++) {
                    ctx.lineTo(cr[s].x, cr[s].y);
                  }
                }
              }
            };

            // Layer 1: Wide Electric Cyan Glow Corona
            ctx.strokeStyle = `rgba(56, 189, 248, ${lightningBolt.alpha * 0.65 * rainFactor})`;
            ctx.lineWidth = 15;
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 34;
            traceLightningPaths();
            ctx.stroke();

            // Layer 2: Vivid High-Voltage Electric Beam
            ctx.strokeStyle = `rgba(191, 219, 254, ${lightningBolt.alpha * 0.95 * rainFactor})`;
            ctx.lineWidth = 5.5;
            ctx.shadowColor = '#93c5fd';
            ctx.shadowBlur = 18;
            traceLightningPaths();
            ctx.stroke();

            // Layer 3: Blinding White-Hot Center Core
            ctx.strokeStyle = `rgba(255, 255, 255, ${lightningBolt.alpha * rainFactor})`;
            ctx.lineWidth = 2.2;
            ctx.shadowBlur = 0;
            traceLightningPaths();
            ctx.stroke();

            // Detect lightning collision with flying birds -> Destroy & Explode Bird Skull!
            if (lightningBolt.alpha > 0.35 && rainFactor > 0.25) {
              const strikePoints = [];
              if (lightningBolt.main) {
                for (let s = 0; s < lightningBolt.main.length; s++) strikePoints.push(lightningBolt.main[s]);
              }
              if (lightningBolt.branches) {
                for (let br = 0; br < lightningBolt.branches.length; br++) {
                  const branch = lightningBolt.branches[br];
                  for (let s = 0; s < branch.length; s++) strikePoints.push(branch[s]);
                }
              }
              if (lightningBolt.crawlers) {
                for (let cr = 0; cr < lightningBolt.crawlers.length; cr++) {
                  const crawler = lightningBolt.crawlers[cr];
                  for (let s = 0; s < crawler.length; s++) strikePoints.push(crawler[s]);
                }
              }

              for (let i = 0; i < birds.length; i++) {
                const b = birds[i];
                if (b.isDead) continue;
                const hitDist = 48 * b.scale;
                for (let p = 0; p < strikePoints.length; p++) {
                  const pt = strikePoints[p];
                  const dx = b.x - pt.x;
                  const dy = b.y - pt.y;
                  if (dx * dx + dy * dy < hitDist * hitDist) {
                    triggerBirdSkullExplosion(b);
                    break;
                  }
                }
              }
            }

            ctx.restore();
            lightningBolt.alpha *= 0.82;
          }

          // Full Atmospheric Dramatic Lightning Flash (Strobe Decay)
          if (lightningFlash > 0.01) {
            ctx.fillStyle = `rgba(240, 249, 255, ${lightningFlash * 0.72 * rainFactor})`;
            ctx.fillRect(0, 0, width, height);
            lightningFlash *= 0.82;
          }

          ctx.restore();
        } else {
          // Fade out rain sound when storm clears
          if (rainGainNode && weatherAudioCtx) {
            try {
              rainGainNode.gain.setTargetAtTime(0, weatherAudioCtx.currentTime, 0.4);
            } catch (e) {}
          }

          // Gentle Morning Bird Chirping & Fluttering during serene blue sky & sun (Kaalai Kural)
          nextBirdCallTime--;
          if (nextBirdCallTime <= 0) {
            playAmbientBirdCall();
            nextBirdCallTime = Math.floor(Math.random() * 200 + 160);
          }
        }

        // 5. Render Real Flying Avian Birds (Aerodynamic Contour, Notched Tail, Slotted Wingtips & Plumage)
        for (let i = 0; i < birds.length; i++) {
          const b = birds[i];

          // If bird was struck by lightning, wait for respawn timer
          if (b.isDead) {
            b.deadTimer++;
            if (b.deadTimer > 180) {
              b.isDead = false;
              b.x = -150;
              b.y = Math.random() * (height * 0.7) + 30;
              b.vx = (Math.random() * 1.5 + 1.3) * (0.8 + b.scale * 0.3);
              b.vy = (Math.random() - 0.5) * 0.4;
            }
            continue;
          }

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
          if (mdist < 190 && mouse.isOver) {
            const evadeAngle = Math.atan2(b.y - mouse.y, b.x - mouse.x);
            b.vx += Math.cos(evadeAngle) * 0.24;
            b.vy += Math.sin(evadeAngle) * 0.24;
            b.wingPhase += b.wingSpeed * 1.5;
            b.bank = (b.vy / (Math.abs(b.vx) + 0.1)) * 0.5;
          } else {
            b.vy += Math.sin(time * 0.02 + i) * 0.025;
            // During rain, birds fly lower and ride the air currents
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

        // 6. Render & Animate Active Bird Skull Explosions (Shockwaves, Bone Fragments, Fiery Embers & Sparks)
        for (let e = skullExplosions.length - 1; e >= 0; e--) {
          const exp = skullExplosions[e];

          // Expanding Electric Cyan Shockwave Ring
          if (exp.shockwaveRadius < exp.shockwaveMax) {
            exp.shockwaveRadius += 4.5;
            const waveAlpha = Math.max(0, 1 - exp.shockwaveRadius / exp.shockwaveMax) * exp.alpha;
            ctx.save();
            ctx.strokeStyle = `rgba(56, 189, 248, ${waveAlpha})`;
            ctx.lineWidth = 2.5 * exp.scale;
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(exp.x, exp.y, exp.shockwaveRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner searing white core flash
            if (exp.flashIntensity > 0.05) {
              ctx.fillStyle = `rgba(255, 255, 255, ${exp.flashIntensity * 0.8})`;
              ctx.beginPath();
              ctx.arc(exp.x, exp.y, exp.shockwaveRadius * 0.65, 0, Math.PI * 2);
              ctx.fill();
              exp.flashIntensity *= 0.75;
            }
            ctx.restore();
          }

          // Flying particles & skull bone fragments
          for (let p = 0; p < exp.particles.length; p++) {
            const pt = exp.particles[p];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.vy += 0.16; // gravity on exploding bird bones
            pt.vx *= 0.985; // high dispersal across display
            pt.rotation += pt.rotSpeed;
            pt.alpha = Math.max(0, pt.alpha - pt.decay);

            if (pt.alpha > 0.01) {
              ctx.save();
              ctx.translate(pt.x, pt.y);
              ctx.rotate(pt.rotation);

              if (pt.boneType === 'wing_bone') {
                // Elongated tumbling wing bone rod
                ctx.fillStyle = `rgba(241, 245, 249, ${pt.alpha})`;
                ctx.beginPath();
                ctx.roundRect ? ctx.roundRect(-pt.boneLen * 0.5, -pt.boneThick * 0.5, pt.boneLen, pt.boneThick, 2)
                              : ctx.rect(-pt.boneLen * 0.5, -pt.boneThick * 0.5, pt.boneLen, pt.boneThick);
                ctx.fill();
                // Bone joint caps
                ctx.beginPath();
                ctx.arc(-pt.boneLen * 0.45, 0, pt.boneThick * 0.85, 0, Math.PI * 2);
                ctx.arc(pt.boneLen * 0.45, 0, pt.boneThick * 0.85, 0, Math.PI * 2);
                ctx.fill();
              } else if (pt.boneType === 'skull') {
                // Angular cranial skull bone fragment / shard
                ctx.fillStyle = `rgba(248, 250, 252, ${pt.alpha})`;
                ctx.beginPath();
                ctx.moveTo(-pt.size, -pt.size * 0.6);
                ctx.lineTo(pt.size * 0.85, -pt.size);
                ctx.lineTo(pt.size, pt.size * 0.7);
                ctx.lineTo(-pt.size * 0.4, pt.size);
                ctx.closePath();
                ctx.fill();
              } else if (pt.boneType === 'rib') {
                // Curved ribcage splinter shard
                ctx.strokeStyle = `rgba(226, 232, 240, ${pt.alpha})`;
                ctx.lineWidth = 2.0;
                ctx.beginPath();
                ctx.arc(0, 0, pt.size * 1.5, 0, Math.PI * 0.8);
                ctx.stroke();
              } else {
                // High-voltage electric spark / fiery ember
                ctx.fillStyle = pt.color.startsWith('#') ? pt.color : `rgba(251, 191, 36, ${pt.alpha})`;
                ctx.beginPath();
                ctx.arc(0, 0, pt.size, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }
          }

          exp.alpha -= 0.018;
          if (exp.alpha <= 0 || (exp.particles.every(p => p.alpha <= 0.02) && exp.shockwaveRadius >= exp.shockwaveMax)) {
            skullExplosions.splice(e, 1);
          }
        }
      };
    };

    let renderFrame;
    if (currentStyle === 'birds') renderFrame = initBirds();
    else if (currentStyle === 'waves') renderFrame = initWaves();
    else if (currentStyle === 'halo') renderFrame = initHalo();
    else if (currentStyle === 'aurora') renderFrame = initAurora();
    else renderFrame = initNet();

    let isRunning = true;
    const loop = () => {
      if (!isRunning) return;
      renderFrame();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (weatherAudioCtx) {
        try { weatherAudioCtx.close(); } catch (e) {}
        weatherAudioCtx = null;
      }
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('birds_weather_override', handleWeatherOverride);
    };
  }, [currentStyle]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block'
        }}
      />

      {/* Weather Time Controls: Exclusively for Real Birds & Clouds animation, positioned above Background Switcher */}
      {currentStyle === 'birds' && (
        <div 
          className="birds-weather-controls"
          style={{
            position: 'fixed',
            bottom: '68px',
            right: '16px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            background: 'rgba(15, 23, 42, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '9999px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
            userSelect: 'none'
          }}
        >
          <button
            onClick={() => {
              const newMode = activeWeather === 'sun' ? null : 'sun';
              setActiveWeather(newMode);
              window.dispatchEvent(new CustomEvent('birds_weather_override', { detail: { mode: newMode } }));
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: activeWeather === 'sun' ? '1px solid #f59e0b' : '1px solid transparent',
              background: activeWeather === 'sun' 
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                : 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: activeWeather === 'sun' ? '0 0 16px rgba(245, 158, 11, 0.6)' : 'none'
            }}
            title="Switch to Sun Time (Serene Blue Sky & Radiant Sun)"
          >
            <span style={{ fontSize: '1rem' }}>☀️</span>
            <span>Sun Time</span>
          </button>

          <button
            onClick={() => {
              const newMode = activeWeather === 'rain' ? null : 'rain';
              setActiveWeather(newMode);
              window.dispatchEvent(new CustomEvent('birds_weather_override', { detail: { mode: newMode } }));
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: activeWeather === 'rain' ? '1px solid #38bdf8' : '1px solid transparent',
              background: activeWeather === 'rain' 
                ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' 
                : 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: activeWeather === 'rain' ? '0 0 16px rgba(56, 189, 248, 0.6)' : 'none'
            }}
            title="Switch to Rain Time (Storm Sky, Broad Lightning, Thunder & Bird Bone Explosions)"
          >
            <span style={{ fontSize: '1rem' }}>🌧️</span>
            <span>Rain Time</span>
          </button>
        </div>
      )}
      {/* 
        High-Performance Scrim:
        Adaptive to daylight sky (birds) or deep cosmic dark styles to guarantee vivid visuals and silky 60 FPS interactions!
      */}
      <div 
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: currentStyle === 'birds'
            ? 'radial-gradient(circle at 50% 30%, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.22) 100%)'
            : 'radial-gradient(circle at 50% 30%, rgba(9, 13, 22, 0.6) 0%, rgba(9, 13, 22, 0.85) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'background 0.4s ease'
        }}
      />
    </>
  );
}
