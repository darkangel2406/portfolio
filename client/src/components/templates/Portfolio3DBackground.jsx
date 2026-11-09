import React, { useEffect, useRef } from 'react';

/**
 * FolioVerse Category-Specific Antigravity Physics Engine (All Categories 2-11)
 * 
 * 2. Developer & Tech: Monospace code tags (<div>, { ; }, =>), terminal pills, commit nodes, silicon chip wafers, magnetic web & repel
 * 3. Student & Fresher: Mortarboard caps, diplomas, sticky notes, paper airplanes, bouncy zero-g, airplane glide, sticky note 3D flip
 * 4. UI/UX & Design: Bezier anchor handles, wireframe bounding boxes, color palette swatches, multi-layered parallax, vector stretch, light reflex
 * 5. Freelance & Brand: Metallic brand seals, foil business cards, invoice badges, luxury tags, weighted float, 3D tilt sheen, impact ripple
 * 6. Photography & Arts: Camera lens apertures, 35mm film negatives, polaroids, prism shards, bokeh depth of field, prism dispersion, polaroid inspect
 * 7. Business & Corp: 3D bar chart pillars, trendline nodes, frosted stock tickers, chrome spheres, data wave equalizer, gyroscope sphere
 * 8. Content Creator: Play buttons, sound wave ribbons, timeline scrubbers, engagement badges (❤️, 🔥), audio wave reactivity, reaction burst
 * 9. Cyber & Systems: Server blades, cryptographic polyhedrons, circuit PCB traces, zero-g grid snap, decryption pulse, EMP repel
 * 10. Services & Studio: Drafting compass, scale rulers, architectural blocks, modular grid cubes, magnetic assembly, measure ruler
 * 11. Modern & Experimental: Liquid chrome blobs (Metaballs), non-Euclidean toruses, iridescent membranes, blob fusion, spatial distortion
 */
export default function Portfolio3DBackground({ 
  isPremium = false, 
  accentColor = '#6366f1', 
  category = 'design',
  bgStyle = 'template',
  opacity = 1.0,
  enabled = true,
  hasCustomBg = false
}) {
  const canvasRef = useRef(null);

  const catLower = String(category || '').toLowerCase();
  const isBook = catLower === 'book' || ['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(catLower);

  if (!enabled || bgStyle === 'none' || isBook) {
    return null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

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
    let scrollY = window.scrollY || 0;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    let lastMouseX = mouse.x;
    let lastMouseY = mouse.y;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseDown = () => {
      mouse.isDown = true;
      mouse.lastClickTime = performance.now();
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      scrollVelocity = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollY = currentY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

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
    if (isBook) return;

    const catKey = (bgStyle && bgStyle !== 'template' && styleMap[bgStyle])
      ? styleMap[bgStyle]
      : (category || 'design').toLowerCase();
    const accent = accentColor || '#6366f1';

    let renderFrame;

    // =========================================================================
    // 2. DEVELOPER & TECH
    // Objects: Monospace code tags (<div>, { ; }, =>), terminal pills, commit nodes, silicon wafer chips, binary shards
    // Physics: Isometric float, neon edge-glow pulse
    // Interactions: Cursor Magnetic Web (constellation connections), Repel Field on fast mouse movement
    // =========================================================================
    if (catKey === 'developer') {
      const codeTags = ['<div>', '{ ; }', '=>', 'async/await', '</>', 'const arr = []', '0x7F', 'git commit -m', '200 OK', 'ARM64', 'λ => x*2', 'npm i', 'SELECT *', 'try/catch'];
      const items = [];
      const numItems = Math.min(26, Math.max(14, Math.floor(width / 70)));

      for (let i = 0; i < numItems; i++) {
        const isCommit = i % 5 === 0;
        const isChip = i % 7 === 0;
        items.push({
          x: Math.random() * width,
          y: Math.random() * height,
          origX: Math.random() * width,
          origY: Math.random() * height,
          z: Math.random() * 250 + 20,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          text: codeTags[i % codeTags.length],
          type: isCommit ? 'commit' : (isChip ? 'chip' : 'tag'),
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          width: 70,
          height: 26,
          isRepelled: false
        });
      }

      renderFrame = function(time) {
        ctx.clearRect(0, 0, width, height);

        // Update mouse speed
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
        mouse.vx = mouse.x - lastMouseX;
        mouse.vy = mouse.y - lastMouseY;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);
        lastMouseX = mouse.x;
        lastMouseY = mouse.y;

        // Subtle Silicon Circuit Grid in Background
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.06)';
        ctx.lineWidth = 1;
        const gridStep = 80;
        for (let x = 0; x < width; x += gridStep) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridStep) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Magnetic Web Connections between nearby code tags
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const dx = items[i].x - items[j].x;
            const dy = items[i].y - items[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              const alpha = (1 - dist / 150) * 0.35;
              ctx.strokeStyle = `rgba(0, 255, 204, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(items[i].x, items[i].y);
              ctx.lineTo(items[j].x, items[j].y);
              ctx.stroke();

              // Pulsing data packet along connection line
              const midX = (items[i].x + items[j].x) / 2 + Math.sin(time * 0.003 + i) * 10;
              const midY = (items[i].y + items[j].y) / 2 + Math.cos(time * 0.003 + j) * 10;
              ctx.fillStyle = 'rgba(99, 102, 241, 0.7)';
              ctx.beginPath();
              ctx.arc(midX, midY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Render Developer Objects
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          item.pulse += item.pulseSpeed;

          // Distance from cursor
          const mdx = item.x - mouse.x;
          const mdy = item.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          // User Interaction: Repel Field on fast mouse speed or close proximity
          if (mdist < 180) {
            const force = mouse.speed > 5 ? 6 : (1 - mdist / 180) * 3;
            item.vx += (mdx / mdist) * force;
            item.vy += (mdy / mdist) * force;
            // Cursor magnetic line to nearby tag
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - mdist / 180) * 0.6})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(item.x, item.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }

          // Gentle friction and drift return
          item.vx *= 0.94;
          item.vy *= 0.94;
          item.x += item.vx + (Math.sin(time * 0.001 + i) * 0.35);
          item.y += item.vy + (Math.cos(time * 0.001 + i) * 0.35);

          // Wrap edges
          if (item.x < -60) item.x = width + 60;
          if (item.x > width + 60) item.x = -60;
          if (item.y < -40) item.y = height + 40;
          if (item.y > height + 40) item.y = -40;

          ctx.save();
          ctx.translate(item.x, item.y);

          const glow = Math.sin(item.pulse) * 0.2 + 0.8;

          if (item.type === 'commit') {
            // GitHub Commit Node
            ctx.fillStyle = '#06b6d4';
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 10 * glow;
            ctx.beginPath();
            ctx.arc(0, 0, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;
            // Branch indicator
            ctx.font = '10px var(--font-mono, monospace)';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('main~' + (i % 9), 12, 4);
          } else if (item.type === 'chip') {
            // Silicon Wafer Chip
            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = accent;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = accent;
            ctx.shadowBlur = 8 * glow;
            ctx.strokeRect(-16, -16, 32, 32);
            ctx.fillRect(-16, -16, 32, 32);
            ctx.shadowBlur = 0;
            // Internal micro-bus lines
            ctx.fillStyle = '#00ffcc';
            ctx.fillRect(-8, -8, 16, 16);
          } else {
            // Monospace Tag / Terminal Pill Badge
            ctx.font = '12px var(--font-mono, monospace)';
            const textWidth = ctx.measureText(item.text).width;
            const padX = 10, padY = 6;
            const boxW = textWidth + padX * 2;
            const boxH = 24;

            // Glass pill background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
            ctx.strokeStyle = mdist < 180 ? '#00ffcc' : 'rgba(0, 255, 204, 0.4)';
            ctx.lineWidth = 1.2;
            ctx.shadowColor = '#00ffcc';
            ctx.shadowBlur = (mdist < 180 ? 12 : 5) * glow;
            ctx.beginPath();
            ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 6);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Syntax-highlighted text
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
    // Objects: Mortarboard caps, diplomas/scrolls, sticky notes, paper airplanes, highlighters, coffee mugs
    // Physics: Playful bouncy zero-gravity, light tilt and bobbing motion
    // Interactions: Paper Airplane Toss (glides in cursor heading direction), Sticky Note Pop (3D flip reveal)
    // =========================================================================
    else if (catKey === 'student') {
      const achievements = ['Dean’s List 🌟', 'Top 1% GPA 🎓', 'AI Hackathon 🏆', 'Published Paper 📜', '1st Class Honors 🏅', 'CS Major 💻'];
      const studentItems = [];
      const numStudents = Math.min(22, Math.max(12, Math.floor(width / 80)));

      for (let i = 0; i < numStudents; i++) {
        const typeIndex = i % 5;
        const types = ['airplane', 'cap', 'scroll', 'sticky', 'mug'];
        studentItems.push({
          x: Math.random() * width,
          y: Math.random() * height,
          type: types[typeIndex],
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          bobPhase: Math.random() * Math.PI * 2,
          scale: 0.8 + Math.random() * 0.4,
          stickyFlip: 0,
          stickyFlipping: false,
          achievement: achievements[i % achievements.length],
          flightSpeed: 2
        });
      }

      renderFrame = function(time) {
        ctx.clearRect(0, 0, width, height);

        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
        mouse.vx = mouse.x - lastMouseX;
        mouse.vy = mouse.y - lastMouseY;
        lastMouseX = mouse.x;
        lastMouseY = mouse.y;

        for (let i = 0; i < studentItems.length; i++) {
          const item = studentItems[i];
          item.bobPhase += 0.03;
          item.angle += item.rotSpeed;

          const dx = item.x - mouse.x;
          const dy = item.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Interaction 1: Paper Airplane Toss
          if (item.type === 'airplane') {
            if (dist < 160) {
              // Align with cursor velocity heading and toss!
              const heading = Math.atan2(mouse.vy || -1, mouse.vx || 1);
              item.angle = heading;
              item.vx += Math.cos(heading) * 0.8;
              item.vy += Math.sin(heading) * 0.8;
            }
          }

          // Interaction 2: Sticky Note Pop / 3D Flip
          if (item.type === 'sticky') {
            if (dist < 120 && !item.stickyFlipping) {
              item.stickyFlipping = true;
            }
            if (item.stickyFlipping) {
              item.stickyFlip += 0.15;
              if (item.stickyFlip > Math.PI * 2) {
                item.stickyFlip = 0;
                item.stickyFlipping = false;
              }
            }
          }

          // Normal bouncy zero-g motion
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
            // Folded Paper Airplane
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(18, 0);
            ctx.lineTo(-14, -10);
            ctx.lineTo(-6, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = 'rgba(224, 242, 254, 0.8)';
            ctx.beginPath();
            ctx.moveTo(18, 0);
            ctx.lineTo(-14, 10);
            ctx.lineTo(-6, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else if (item.type === 'cap') {
            // Degree Mortarboard Cap
            ctx.fillStyle = '#1e1b4b';
            ctx.strokeStyle = '#818cf8';
            ctx.lineWidth = 1.5;
            // Diamond top
            ctx.beginPath();
            ctx.moveTo(0, -12);
            ctx.lineTo(18, 0);
            ctx.lineTo(0, 12);
            ctx.lineTo(-18, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Tassel
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(12, 12);
            ctx.stroke();
          } else if (item.type === 'sticky') {
            // Sticky Note with 3D Flip
            const flipScale = Math.cos(item.stickyFlip);
            ctx.scale(1, Math.abs(flipScale));
            ctx.fillStyle = flipScale >= 0 ? '#fef08a' : '#a7f3d0';
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 1;
            ctx.fillRect(-16, -16, 32, 32);
            ctx.strokeRect(-16, -16, 32, 32);

            // Revealed skill/achievement badge on flip
            if (flipScale < 0) {
              ctx.font = '8px var(--font-sans, sans-serif)';
              ctx.fillStyle = '#065f46';
              ctx.textAlign = 'center';
              ctx.fillText('WINNER', 0, 3);
            }
          } else if (item.type === 'scroll') {
            // Diploma / Scroll
            ctx.fillStyle = '#fef3c7';
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(-14, -7, 28, 14, 4);
            ctx.fill();
            ctx.stroke();
            // Red ribbon
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(-3, -7, 6, 14);
          } else {
            // Coffee Mug
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.fillRect(-8, -8, 16, 16);
            // Handle
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
    // Objects: Bezier anchor handles with tangent arms, wireframe bounding boxes, color palette swatches, Figma component cards, frosted glass layers
    // Physics: Multi-layered parallax depth; objects move in different Z-index speeds
    // Interactions: Vector Stretch (rubber-band spring effect with cursor), Dynamic Light Reflex
    // =========================================================================
    else if (catKey === 'design') {
      const handles = [];
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
          x: Math.random() * width,
          y: Math.random() * height,
          origX: Math.random() * width,
          origY: Math.random() * height,
          z: (i % 3) + 1, // 1: foreground, 2: mid, 3: deep background
          type: i % 4 === 0 ? 'swatch' : (i % 4 === 1 ? 'card' : (i % 4 === 2 ? 'box' : 'bezier')),
          swatchColors: swatches[i % swatches.length],
          w: i % 4 === 1 ? 95 : 65,
          h: i % 4 === 1 ? 55 : 45,
          vx: 0,
          vy: 0,
          stretchX: 0,
          stretchY: 0
        });
      }

      renderFrame = function(time) {
        ctx.clearRect(0, 0, width, height);

        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Render Parallax Layers
        for (let i = 0; i < designItems.length; i++) {
          const item = designItems[i];
          const parallaxFactor = item.z === 1 ? 0.04 : (item.z === 2 ? 0.02 : 0.008);

          // Calculate interactive vector stretch with cursor
          const dx = mouse.x - item.x;
          const dy = mouse.y - item.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 150) {
            // Rubber-band elastic stretch
            item.stretchX = (dx / dist) * Math.min(35, 150 - dist) * 0.4;
            item.stretchY = (dy / dist) * Math.min(35, 150 - dist) * 0.4;
          } else {
            // Spring return
            item.stretchX *= 0.88;
            item.stretchY *= 0.88;
          }

          const curX = item.origX + (mouse.x - width / 2) * parallaxFactor + Math.sin(time * 0.001 + i) * 12 + item.stretchX;
          const curY = item.origY + (mouse.y - height / 2) * parallaxFactor + Math.cos(time * 0.001 + i) * 12 + item.stretchY;
          item.x = curX;
          item.y = curY;

          ctx.save();
          ctx.translate(curX, curY);

          // Interaction 2: Dynamic Light Reflex on glass layers based on mouse angle
          const lightAngle = Math.atan2(mouse.y - curY, mouse.x - curX);
          const specular = Math.max(0.1, 1 - dist / 300);

          if (item.type === 'swatch') {
            // Color Palette Swatch Card
            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * specular})`;
            ctx.lineWidth = 1;
            ctx.roundRect(-item.w / 2, -item.h / 2, item.w, item.h, 8);
            ctx.fill();
            ctx.stroke();

            // 3 Color dots
            for (let c = 0; c < 3; c++) {
              ctx.fillStyle = item.swatchColors[c];
              ctx.beginPath();
              ctx.arc(-item.w / 2 + 16 + c * 18, 0, 6, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (item.type === 'bezier') {
            // Bezier Curve Anchor Handle with Tangent Arms
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 1.5;
            // Tangent line
            ctx.beginPath();
            ctx.moveTo(-25, 0);
            ctx.lineTo(25, 0);
            ctx.stroke();
            // Tangent circles
            ctx.fillStyle = '#a855f7';
            ctx.beginPath();
            ctx.arc(-25, 0, 3.5, 0, Math.PI * 2);
            ctx.arc(25, 0, 3.5, 0, Math.PI * 2);
            ctx.fill();
            // Center Anchor Point Square
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#6366f1';
            ctx.fillRect(-4, -4, 8, 8);
            ctx.strokeRect(-4, -4, 8, 8);
          } else if (item.type === 'card') {
            // Figma-style Component Card with Specular Sheen
            const grad = ctx.createLinearGradient(
              -item.w / 2 + Math.cos(lightAngle) * 20, 
              -item.h / 2 + Math.sin(lightAngle) * 20, 
              item.w / 2, 
              item.h / 2
            );
            grad.addColorStop(0, `rgba(255, 255, 255, ${0.18 * specular})`);
            grad.addColorStop(1, 'rgba(15, 23, 42, 0.7)');

            ctx.fillStyle = grad;
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-item.w / 2, -item.h / 2, item.w, item.h, 10);
            ctx.fill();
            ctx.stroke();

            // Component label
            ctx.font = '9px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#cbd5e1';
            ctx.fillText('❖ Component / UI', -item.w / 2 + 10, -item.h / 2 + 16);
          } else {
            // Wireframe Bounding Box with 4 Corner Resize Handles
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-item.w / 2, -item.h / 2, item.w, item.h);

            // 4 Corner handles
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
    // Objects: Brand seals/stamps, metallic foil business cards, invoice badges, luxury packaging tags, fountain pens
    // Physics: Elegant, weighted float (slow acceleration, high inertia)
    // Interactions: 3D Tilt & Holographic Sheen (shimmers towards cursor), Impact Ripple
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

        mouse.x += (mouse.targetX - mouse.x) * 0.05; // Weighted slow inertia
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Emit ripple on click or scroll
        if (mouse.isDown && performance.now() - mouse.lastClickTime < 100) {
          ripples.push({ x: mouse.x, y: mouse.y, radius: 10, alpha: 0.6 });
          mouse.lastClickTime = 0;
        }

        // Draw Ripples
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rp = ripples[r];
          rp.radius += 3.5;
          rp.alpha *= 0.94;
          ctx.strokeStyle = `rgba(217, 119, 6, ${rp.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
          ctx.stroke();
          if (rp.alpha < 0.02) ripples.splice(r, 1);
        }

        for (let i = 0; i < cards.length; i++) {
          const c = cards[i];

          // 3D Tilt calculation towards mouse
          const dx = mouse.x - c.x;
          const dy = mouse.y - c.y;
          const targetRotY = (dx / width) * 0.5;
          const targetRotX = -(dy / height) * 0.5;
          c.rotY += (targetRotY - c.rotY) * 0.06;
          c.rotX += (targetRotX - c.rotX) * 0.06;

          // Heavy slow inertia movement
          c.x += Math.sin(time * 0.0008 + i) * 0.35;
          c.y += Math.cos(time * 0.0008 + i) * 0.35;

          ctx.save();
          ctx.translate(c.x, c.y);

          if (c.type === 'contract') {
            // Signed Client Agreement / Contract with checkmark stamp
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.55)';
            ctx.lineWidth = 1.4;
            ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
            ctx.fill();
            ctx.stroke();

            ctx.font = 'bold 8px var(--font-mono, monospace)';
            ctx.fillStyle = '#818cf8';
            ctx.fillText('✓ CLIENT AGREEMENT', -c.w / 2 + 8, -c.h / 2 + 16);
            ctx.fillStyle = '#cbd5e1';
            ctx.font = '7.5px var(--font-sans, sans-serif)';
            ctx.fillText('Scope: Web Architecture', -c.w / 2 + 8, -c.h / 2 + 30);
            ctx.fillStyle = '#34d399';
            ctx.font = 'bold 7.5px var(--font-mono, monospace)';
            ctx.fillText('STATUS: MILESTONE SIGNED', -c.w / 2 + 8, -c.h / 2 + 45);
          } else if (c.type === 'timeTracker') {
            // Live Billable Hours Card
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
            ctx.lineWidth = 1.4;
            ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
            ctx.fill();
            ctx.stroke();

            // Pulsing red recording dot
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(-c.w / 2 + 12, -c.h / 2 + 16, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = 'bold 8.5px var(--font-mono, monospace)';
            ctx.fillStyle = '#f87171';
            ctx.fillText('04:30:15 • TRACKING', -c.w / 2 + 20, -c.h / 2 + 19);
            ctx.font = '8px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('$125/hr  Billable Work', -c.w / 2 + 10, -c.h / 2 + 36);
          } else if (c.type === 'rating') {
            // 5-Star Client Review Pill
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
            ctx.lineWidth = 1.4;
            ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
            ctx.fill();
            ctx.stroke();

            ctx.font = 'bold 9px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText('★★★★★ 5.0', -c.w / 2 + 10, -c.h / 2 + 18);
            ctx.font = '7.5px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#cbd5e1';
            ctx.fillText('48 Verified Clients', -c.w / 2 + 10, -c.h / 2 + 34);
          } else if (c.type === 'taskSprint') {
            // Kanban Task Card
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
            ctx.lineWidth = 1.4;
            ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
            ctx.fill();
            ctx.stroke();

            ctx.font = 'bold 8px var(--font-mono, monospace)';
            ctx.fillStyle = '#34d399';
            ctx.fillText('⚡ SPRINT: DELIVER MVP', -c.w / 2 + 8, -c.h / 2 + 17);
            // Mini progress bar
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(-c.w / 2 + 8, -c.h / 2 + 26, c.w - 16, 5);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(-c.w / 2 + 8, -c.h / 2 + 26, (c.w - 16) * 0.85, 5);
          } else if (c.type === 'seal') {
            // Metallic Gold Brand Seal with Stamped Ring
            ctx.beginPath();
            ctx.arc(0, 0, 24, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(217, 119, 6, 0.15)';
            ctx.fill();
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Inner star stamp
            ctx.beginPath();
            ctx.arc(0, 0, 18, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.font = '7px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#fbbf24';
            ctx.textAlign = 'center';
            ctx.fillText('★ VERIFIED ★', 0, 3);
          } else if (c.type === 'invoice') {
            // Invoice Tag Badge
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
            ctx.lineWidth = 1.2;
            ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 6);
            ctx.fill();
            ctx.stroke();

            ctx.font = '8px var(--font-mono, monospace)';
            ctx.fillStyle = '#34d399';
            ctx.fillText('INVOICE #082', -c.w / 2 + 8, -c.h / 2 + 16);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('$4,850.00 [PAID]', -c.w / 2 + 8, -c.h / 2 + 30);
          } else {
            // Holographic Foil Business Card
            const foilGradient = ctx.createLinearGradient(
              -c.w / 2 + c.rotY * 40, 
              -c.h / 2 + c.rotX * 40, 
              c.w / 2, 
              c.h / 2
            );
            foilGradient.addColorStop(0, 'rgba(217, 119, 6, 0.3)');
            foilGradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.7)');
            foilGradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)');

            ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
            ctx.strokeStyle = foilGradient;
            ctx.lineWidth = 1.8;
            ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 8);
            ctx.fill();
            ctx.stroke();

            // Brand monogram
            ctx.font = 'bold 12px var(--font-display, serif)';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText('FOLIO STUDIO', -c.w / 2 + 12, 4);
          }

          ctx.restore();
        }
      };
    }

    // =========================================================================
    // 6. PHOTOGRAPHY & ARTS
    // Objects: Original Vintage Cameras, Camera lens aperture blades, 35mm film negatives, polaroids, prism crystal shards
    // Physics: Dreamy fluid float with vintage film dust drift and old camera shutter flash
    // Interactions: Prism Dispersion (light streaks), Polaroid Inspect, Vintage Shutter Flash Glint
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
          z: (i % 3) + 1,
          targetAngle: (Math.random() - 0.5) * 0.35,
          scale: 0.9 + Math.random() * 0.3,
          blur: (i % 3) * 2
        });
      }

      // Vintage film dust & sepia grain drift for nostalgic retro camera atmosphere
      for (let d = 0; d < 28; d++) {
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

        // Draw Floating Vintage Film Dust / Sepia Grain Drift
        for (let d = 0; d < dustParticles.length; d++) {
          const dp = dustParticles[d];
          dp.y += dp.vy;
          dp.x += Math.sin(time * 0.001 + d) * 0.3;
          if (dp.y < 0) { dp.y = height; dp.x = Math.random() * width; }
          ctx.fillStyle = `rgba(251, 191, 36, ${dp.opacity})`;
          ctx.beginPath();
          ctx.arc(dp.x, dp.y, dp.size, 0, Math.PI * 2);
          ctx.fill();
        }

        for (let i = 0; i < artItems.length; i++) {
          const item = artItems[i];
          const dx = item.x - mouse.x;
          const dy = item.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Interaction 2: Polaroid Inspect (Straightens and un-blurs when hovered)
          if (item.type === 'polaroid') {
            if (dist < 130) {
              item.angle += (0 - item.angle) * 0.15;
            } else {
              item.angle += (item.targetAngle - item.angle) * 0.05;
            }
          }

          item.y += Math.sin(time * 0.001 + i) * 0.4;

          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.angle);
          ctx.scale(item.scale, item.scale);

          if (item.type === 'camera') {
            // Authentic Vintage / SLR Camera Body with Lens & Flash
            const cw = 68;
            const ch = 44;

            // Camera main body (dark vintage leatherette with rounded edges)
            ctx.fillStyle = '#1c1917';
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1.4;
            ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 6);
            ctx.fill();
            ctx.stroke();

            // Silver Chrome Top Deck
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(-cw / 2, -ch / 2, cw, 12);
            ctx.strokeStyle = '#cbd5e1';
            ctx.strokeRect(-cw / 2, -ch / 2, cw, 12);

            // Top Viewfinder prism housing
            ctx.fillStyle = '#475569';
            ctx.fillRect(-12, -ch / 2 - 6, 24, 7);
            ctx.strokeStyle = '#94a3b8';
            ctx.strokeRect(-12, -ch / 2 - 6, 24, 7);

            // Viewfinder glass window (cyan glint)
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(-6, -ch / 2 - 3, 12, 4);

            // Shutter release button
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(cw / 2 - 16, -ch / 2 - 4, 8, 4);

            // Red dot rangefinder badge (Leica style)
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(-cw / 2 + 10, -ch / 2 + 20, 3.5, 0, Math.PI * 2);
            ctx.fill();

            // Concentric Camera Lens barrel
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(0, 4, 17, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Optic glass reflection gradient
            const lensGrad = ctx.createLinearGradient(-12, -8, 12, 16);
            lensGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
            lensGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.85)');
            lensGrad.addColorStop(1, 'rgba(168, 85, 247, 0.35)');
            ctx.fillStyle = lensGrad;
            ctx.beginPath();
            ctx.arc(0, 4, 12, 0, Math.PI * 2);
            ctx.fill();

            // Internal aperture blades
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 1;
            for (let a = 0; a < 6; a++) {
              const aAngle = a * (Math.PI / 3) + time * 0.001;
              ctx.beginPath();
              ctx.moveTo(Math.cos(aAngle) * 11, 4 + Math.sin(aAngle) * 11);
              ctx.lineTo(Math.cos(aAngle + 0.6) * 4, 4 + Math.sin(aAngle + 0.6) * 4);
              ctx.stroke();
            }

            // Interactive Vintage Shutter Flash Glint on hover or interval
            if (dist < 110 || (Math.floor(time * 0.002 + i) % 7 === 0 && Math.sin(time * 0.01) > 0.88)) {
              const flashGlow = ctx.createRadialGradient(0, 4, 2, 0, 4, 42);
              flashGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
              flashGlow.addColorStop(0.35, 'rgba(251, 191, 36, 0.45)');
              flashGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');
              ctx.fillStyle = flashGlow;
              ctx.beginPath();
              ctx.arc(0, 4, 42, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (item.type === 'polaroid') {
            // Polaroid Frame
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0,0,0,0.4)';
            ctx.shadowBlur = 12;
            ctx.fillRect(-25, -35, 50, 62);
            ctx.shadowBlur = 0;
            // Photo window
            ctx.fillStyle = dist < 130 ? 'rgba(99, 102, 241, 0.4)' : '#1e1b2e';
            ctx.fillRect(-21, -31, 42, 42);
            // Label
            ctx.font = '6px cursive';
            ctx.fillStyle = '#475569';
            ctx.fillText('Frame #0' + (i % 9), -18, 20);
          } else if (item.type === 'prism') {
            // Crystal Prism Shard with Rainbow Dispersion
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, -22);
            ctx.lineTo(18, 16);
            ctx.lineTo(-18, 16);
            ctx.closePath();
            ctx.stroke();

            // Interaction 1: Prism Dispersion Caustics
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
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(80, 25);
              ctx.stroke();
            }
          } else if (item.type === 'film') {
            // 35mm Film Negative Strip
            ctx.fillStyle = 'rgba(20, 20, 25, 0.85)';
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1;
            ctx.fillRect(-35, -14, 70, 28);
            ctx.strokeRect(-35, -14, 70, 28);
            // Sprocket holes
            ctx.fillStyle = '#08080c';
            for (let s = -30; s <= 30; s += 10) {
              ctx.fillRect(s - 2, -12, 4, 4);
              ctx.fillRect(s - 2, 8, 4, 4);
            }
          } else {
            // Camera Lens Aperture Blades
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, 18, 0, Math.PI * 2);
            ctx.stroke();
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
    // Objects: Dynamic 3D bar chart pillars, upward trendlines, frosted stock tickers, chrome spheres
    // Physics: High-precision, controlled rigid float, stable oscillation
    // Interactions: Data Wave Equalizer (cursor sweep changes bar heights), Gyroscope Sphere Orbit
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

        // Interaction 1: Data Wave Equalizer across floating chart bars
        const barWidth = width / numBars;
        for (let i = 0; i < numBars; i++) {
          const b = bars[i];
          const barX = i * barWidth;
          const distToMouse = Math.abs(mouse.x - barX);

          if (distToMouse < 220) {
            // Equalizer wave boost
            const boost = (1 - distToMouse / 220) * 80;
            b.height += (b.baseHeight + boost - b.height) * 0.15;
          } else {
            b.height += (b.baseHeight + Math.sin(time * 0.003 + i * 0.3) * 15 - b.height) * 0.05;
          }

          // 3D Glass Bar Pillar
          const grad = ctx.createLinearGradient(barX, height, barX, height - b.height);
          grad.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
          grad.addColorStop(1, 'rgba(16, 185, 129, 0.45)');

          ctx.fillStyle = grad;
          ctx.fillRect(barX + 3, height - b.height, barWidth - 6, b.height);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
          ctx.lineWidth = 1;
          ctx.strokeRect(barX + 3, height - b.height, barWidth - 6, b.height);
        }

        // Interaction 2: Central Gyroscopic Sphere Orbit synchronized to cursor
        const cx = width / 2;
        const cy = height * 0.38;
        const gyroAngleX = (mouse.y - cy) * 0.003;
        const gyroAngleY = (mouse.x - cx) * 0.003;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
        ctx.lineWidth = 1.5;

        // 3 Gyroscope rings
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, Math.max(0.1, Math.abs(70 * Math.cos(gyroAngleX + time * 0.002))), gyroAngleY, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 60, Math.max(0.1, Math.abs(60 * Math.sin(gyroAngleY + time * 0.002))), gyroAngleX, 0, Math.PI * 2);
        ctx.stroke();

        // Central metallic core
        ctx.fillStyle = '#60a5fa';
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();

        // Floating Stock Tickers
        ctx.font = '11px var(--font-mono, monospace)';
        for (let t = 0; t < tickers.length; t++) {
          const tx = (t * (width / tickers.length)) + 40;
          const ty = 90 + Math.sin(time * 0.0015 + t) * 12;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
          ctx.roundRect(tx - 35, ty - 12, 70, 24, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#34d399';
          ctx.textAlign = 'center';
          ctx.fillText(tickers[t], tx, ty + 4);
        }
      };
    }

    // =========================================================================
    // 8. CONTENT CREATOR
    // Objects: Writing Stylus / Fountain Pens, Lined Script Notes, Brainstorm Sticky Notes, Video Timelines, Play buttons, Microphones, Engagement badges
    // Physics: High energy floating rhythm with live ink trails and sound-reactive vibration
    // Interactions: Audio Wave Reactivity (cursor drag compresses/expands), Reaction Burst micro-confetti
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

        // Draw Interactive Audio Frequency Ribbon at Center
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;
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
        ctx.shadowBlur = 0;

        // Render Bursts
        for (let b = bursts.length - 1; b >= 0; b--) {
          const pt = bursts[b];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.alpha *= 0.92;
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
          if (pt.alpha < 0.04) bursts.splice(b, 1);
        }

        // Render Creator Floating Items
        for (let i = 0; i < creatorItems.length; i++) {
          const item = creatorItems[i];
          item.vibePhase += 0.08;

          const dx = item.x - mouse.x;
          const dy = item.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Interaction: Reaction Burst on hover
          if (dist < 60 && Math.random() < 0.25) {
            for (let k = 0; k < 4; k++) {
              bursts.push({
                x: item.x,
                y: item.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
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
            // Sleek Creative Stylus / Fountain Pen with metallic nib & ink stroke
            ctx.save();
            ctx.rotate(-0.55);

            // Pen barrel
            ctx.fillStyle = '#1e293b';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.2;
            ctx.roundRect(-4, -24, 8, 36, 3);
            ctx.fill();
            ctx.stroke();

            // Gold accent clip & band
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(-4, -14, 8, 3);
            ctx.fillRect(-2, -22, 2, 14);

            // Metallic nib
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(-3, 12);
            ctx.lineTo(3, 12);
            ctx.lineTo(0, 20);
            ctx.closePath();
            ctx.fill();

            // Nib slit
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, 14);
            ctx.lineTo(0, 19);
            ctx.stroke();

            // Dynamic ink trail
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(0, 20);
            ctx.quadraticCurveTo(8, 28, 14 + Math.sin(time * 0.005) * 6, 32);
            ctx.stroke();

            ctx.restore();
          } else if (item.type === 'notes') {
            // Lined Script Notepad / Storyboard card
            const nw = 54;
            const nh = 62;

            ctx.fillStyle = '#fef3c7';
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.2;
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 8;
            ctx.roundRect(-nw / 2, -nh / 2, nw, nh, 5);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Red margin line
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(-nw / 2 + 10, -nh / 2 + 4);
            ctx.lineTo(-nw / 2 + 10, nh / 2 - 4);
            ctx.stroke();

            // Header badge
            ctx.font = 'bold 6.5px var(--font-mono, monospace)';
            ctx.fillStyle = '#b45309';
            ctx.fillText('SCRIPT 🎬', -nw / 2 + 14, -nh / 2 + 12);

            // Blue horizontal ruled lines with simulated handwritten text
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
            ctx.lineWidth = 0.6;
            ctx.fillStyle = '#475569';
            for (let line = 0; line < 4; line++) {
              const ly = -nh / 2 + 20 + line * 9;
              ctx.beginPath();
              ctx.moveTo(-nw / 2 + 12, ly);
              ctx.lineTo(nw / 2 - 6, ly);
              ctx.stroke();

              // Scribble text
              ctx.fillRect(-nw / 2 + 14, ly - 4, (nw - 24) * (0.6 + (line % 2) * 0.3), 2);
            }
          } else if (item.type === 'sticky') {
            // Brainstorm Post-it Sticky Note with folded corner
            const sw = 44;
            const sh = 44;

            ctx.fillStyle = '#fef08a';
            ctx.strokeStyle = 'rgba(202, 138, 4, 0.5)';
            ctx.lineWidth = 1;
            ctx.shadowColor = 'rgba(0,0,0,0.25)';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(-sw / 2, -sh / 2);
            ctx.lineTo(sw / 2, -sh / 2);
            ctx.lineTo(sw / 2, sh / 2 - 8);
            ctx.lineTo(sw / 2 - 8, sh / 2);
            ctx.lineTo(-sw / 2, sh / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Folded corner triangle
            ctx.fillStyle = '#fde047';
            ctx.beginPath();
            ctx.moveTo(sw / 2 - 8, sh / 2);
            ctx.lineTo(sw / 2, sh / 2 - 8);
            ctx.lineTo(sw / 2 - 8, sh / 2 - 8);
            ctx.closePath();
            ctx.fill();

            ctx.font = 'bold 7.5px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#854d0e';
            ctx.textAlign = 'center';
            ctx.fillText('IDEAS 💡', 0, -4);
            ctx.font = '6px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#a16207';
            ctx.fillText('Hook: 0-3s', 0, 7);
            ctx.textAlign = 'start';
          } else if (item.type === 'timeline') {
            // Video Editor Timeline Scrubber
            const tw = 76;
            const th = 26;

            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.lineWidth = 1.2;
            ctx.roundRect(-tw / 2, -th / 2, tw, th, 5);
            ctx.fill();
            ctx.stroke();

            // Colored media clip blocks
            ctx.fillStyle = '#ec4899';
            ctx.fillRect(-tw / 2 + 5, -th / 2 + 5, 20, 16);
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(-tw / 2 + 27, -th / 2 + 5, 24, 16);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(-tw / 2 + 53, -th / 2 + 5, 18, 16);

            // Red vertical playhead line
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-tw / 2 + 38, -th / 2 + 3);
            ctx.lineTo(-tw / 2 + 38, th / 2 - 3);
            ctx.stroke();
          } else if (item.type === 'play') {
            // Neon Play Button Badge
            ctx.fillStyle = '#f43f5e';
            ctx.shadowColor = '#f43f5e';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.roundRect(-18, -14, 36, 28, 8);
            ctx.fill();
            ctx.shadowBlur = 0;
            // Play triangle
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(-4, -6);
            ctx.lineTo(6, 0);
            ctx.lineTo(-4, 6);
            ctx.closePath();
            ctx.fill();
          } else if (item.type === 'badge') {
            // Engagement Pill (❤️ 100k, 🔥 1.4M)
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = '#ec4899';
            ctx.lineWidth = 1.2;
            ctx.roundRect(-26, -12, 52, 24, 9999);
            ctx.fill();
            ctx.stroke();

            ctx.font = 'bold 8.5px var(--font-sans, sans-serif)';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(item.badgeText, 0, 3);
            ctx.textAlign = 'start';
          } else {
            // Condenser Mic Head
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.roundRect(-8, -14, 16, 28, 8);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Grille pattern
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 0.8;
            for (let g = -10; g <= 6; g += 4) {
              ctx.beginPath();
              ctx.moveTo(-6, g);
              ctx.lineTo(6, g);
              ctx.stroke();
            }
          }

          ctx.restore();
        }
      };
    }

    // =========================================================================
    // 9. CYBER & SYSTEMS
    // Objects: Server rack blades, wireframe polyhedrons, circuit PCB traces, hex nodes, floating padlock wireframes
    // Physics: Zero-gravity grid snap, sudden glitch micro-shifts, dark cyber aesthetic
    // Interactions: Decryption Pulse (glitch-reveal binary streams), Electromagnetic Repel (EMP emitter)
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
          glitchTimer: 0,
          angle: 0
        });
      }

      renderFrame = function(time) {
        ctx.clearRect(0, 0, width, height);

        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;

        // Cyber Grid Snapped Lines
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)';
        ctx.lineWidth = 1;
        const cyberGrid = 60;
        for (let x = 0; x < width; x += cyberGrid) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Render Cyber Objects
        for (let i = 0; i < cyberNodes.length; i++) {
          const node = cyberNodes[i];
          node.angle += 0.02;

          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          // Interaction 1: Decryption Pulse on hover
          if (dist < 140) {
            node.glitching = true;
          } else {
            node.glitching = false;
          }

          // Interaction 2: EMP Repel perimeter
          if (dist < 100) {
            node.x += (dx / dist) * 4;
            node.y += (dy / dist) * 4;
          }

          ctx.save();
          ctx.translate(node.x, node.y);

          if (node.glitching) {
            // Streaming Matrix Decryption Binary
            ctx.font = '10px var(--font-mono, monospace)';
            ctx.fillStyle = '#22c55e';
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 8;
            ctx.fillText(Math.random() < 0.5 ? '101100' : '011010', -18, 0);
            ctx.shadowBlur = 0;
          } else if (node.type === 'padlock') {
            // Wireframe Security Padlock
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 1.5;
            // Shackle
            ctx.beginPath();
            ctx.arc(0, -8, 8, Math.PI, 0);
            ctx.stroke();
            // Body
            ctx.strokeRect(-12, -8, 24, 18);
            ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
            ctx.fillRect(-12, -8, 24, 18);
          } else if (node.type === 'poly') {
            // Wireframe Cryptographic Polyhedron
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
            ctx.closePath();
            ctx.stroke();
            // Internal cross diagonals
            ctx.beginPath();
            ctx.moveTo(-14, 0); ctx.lineTo(14, 0);
            ctx.stroke();
          } else {
            // Hex Key Node
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-8, -8, 16, 16);
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      };
    }

    // =========================================================================
    // 10. SERVICES & STUDIO
    // Objects: Drafting compass, scale rulers, architectural blocks, modular grid cubes
    // Physics: Structured tactile medium buoyancy, floating in high-viscosity space
    // Interactions: Magnetic Assembly (click-and-hold attracts and builds structure), Measure Ruler (dynamic metrics)
    // =========================================================================
    else if (catKey === 'services') {
      const cubes = [];
      const numCubes = Math.min(24, Math.max(12, Math.floor(width / 75)));

      for (let i = 0; i < numCubes; i++) {
        cubes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          origX: Math.random() * width,
          origY: Math.random() * height,
          size: 24,
          vx: 0,
          vy: 0
        });
      }

      renderFrame = function(time) {
        ctx.clearRect(0, 0, width, height);

        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Interaction 1: Magnetic Assembly on click-and-hold
        for (let i = 0; i < cubes.length; i++) {
          const cube = cubes[i];
          if (mouse.isDown) {
            // Attract toward mouse and snap into modular grid
            const targetX = mouse.x + ((i % 5) - 2) * 26;
            const targetY = mouse.y + (Math.floor(i / 5) - 2) * 26;
            cube.x += (targetX - cube.x) * 0.12;
            cube.y += (targetY - cube.y) * 0.12;
          } else {
            // Drift apart gracefully
            cube.x += (cube.origX - cube.x) * 0.02 + Math.sin(time * 0.001 + i) * 0.3;
            cube.y += (cube.origY - cube.y) * 0.02 + Math.cos(time * 0.001 + i) * 0.3;
          }

          // Draw Modular Grid Cube
          ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.2;
          ctx.fillRect(cube.x - 12, cube.y - 12, 24, 24);
          ctx.strokeRect(cube.x - 12, cube.y - 12, 24, 24);
        }

        // Interaction 2: Floating Measure Ruler with dynamic metric reading to cursor
        const rulerX = width * 0.2;
        const rulerY = height * 0.75;
        const measureDist = Math.hypot(mouse.x - rulerX, mouse.y - rulerY) * 0.05;

        ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(rulerX, rulerY);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Metric label
        ctx.font = '10px var(--font-mono, monospace)';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`${measureDist.toFixed(1)} cm`, (rulerX + mouse.x) / 2 + 10, (rulerY + mouse.y) / 2);

        // Drafting Compass Vector
        ctx.save();
        ctx.translate(rulerX, rulerY);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-15, 25);
        ctx.lineTo(0, 0);
        ctx.lineTo(15, 25);
        ctx.stroke();
        ctx.restore();
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
          isBright
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

        // Subtle Maria (Crater Shadows)
        ctx.fillStyle = 'rgba(100, 116, 139, 0.18)';
        ctx.beginPath();
        ctx.arc(moonX - moonRadius * 0.25, moonY - moonRadius * 0.1, moonRadius * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX + moonRadius * 0.18, moonY - moonRadius * 0.3, moonRadius * 0.16, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX + moonRadius * 0.1, moonY + moonRadius * 0.28, moonRadius * 0.26, 0, Math.PI * 2);
        ctx.fill();

        // Luminous Crescent Shadow
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

        // 3. TWINKLING STARS
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
            starHalo.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`);
            starHalo.addColorStop(0.5, `rgba(186, 230, 253, ${alpha * 0.2})`);
            starHalo.addColorStop(1, 'transparent');
            ctx.fillStyle = starHalo;
            ctx.beginPath();
            ctx.arc(s.x, s.y, curRadius * 4, 0, Math.PI * 2);
            ctx.fill();

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

          ctx.beginPath();
          ctx.arc(s.x, s.y, curRadius, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // 4. METEORS / SHOOTING STARS
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
      const handleWeatherOverride = (e) => {
        forcedWeatherPhase = e.detail?.mode || null;
      };
      window.addEventListener('birds_weather_override', handleWeatherOverride);

      // Weather Cycle Constants (Seconds)
      const T_SUNNY_1 = 60;   // 1 minute (60s) serene gentle blue sky
      const T_DARKEN = 6;     // 6s cinematic darkening
      const T_RAIN = 60;      // 1 minute (60s) light black sky with rain, broad lightning & thunder
      const T_CLEAR = 6;      // 6s cinematic clearing
      const T_SUNNY_2 = 120;  // 2 minutes radiant sunny sky with glowing sun on upper left corner
      const CYCLE_TOTAL = T_SUNNY_1 + T_DARKEN + T_RAIN + T_CLEAR + T_SUNNY_2;

      const lerpColor = (c1, c2, factor) => {
        const f = Math.max(0, Math.min(1, factor));
        const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
        const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
        const r = Math.round(r1 + (r2 - r1) * f);
        const g = Math.round(g1 + (g2 - g1) * f);
        const b = Math.round(b1 + (b2 - b1) * f);
        return `rgb(${r}, ${g}, ${b})`;
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

      // Realistic Rain Streaks System
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

      let lightningFlash = 0;
      let lightningBolt = null;
      let nextLightningTime = Math.random() * 200 + 120;
      let nextBirdCallTime = 90;
      let time = 0;
      const skullExplosions = [];

      let weatherAudioCtx = null;
      let rainGainNode = null;

      const initWeatherAudio = () => {
        if (weatherAudioCtx) {
          if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
          return;
        }
        try {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return;
          weatherAudioCtx = new AC();

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
        } catch (e) {}
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
      const playAmbientBirdCall = () => {
        if (!weatherAudioCtx) return;
        try {
          if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
          const now = weatherAudioCtx.currentTime;
          const motif = Math.floor(Math.random() * 3);

          if (motif === 0) {
            // "Chirp, chirp!"
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
            // "Twit-twoo!"
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
            // "Trill-ill-ill... Flap-flap-flap!"
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
      };

      const playBirdExplosionSound = () => {
        if (!weatherAudioCtx) return;
        try {
          if (weatherAudioCtx.state === 'suspended') weatherAudioCtx.resume();
          const now = weatherAudioCtx.currentTime;

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

      const triggerBirdSkullExplosion = (b) => {
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
      };

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

        // 4. Realistic Slanted Rain Streaks, Ground Mist & Broad Lightning
        if (rainFactor > 0.02) {
          nextBirdCallTime = 120; // Birds seek shelter during rain
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

              // 1 or 2 Birds must touch lightning on each flash!
              const liveBirds = birds.filter(b => !b.isDead && b.x > 80 && b.x < width - 80 && b.y > 60 && b.y < height * 0.72);
              const targetBirds = liveBirds.slice(0, Math.min(2, Math.floor(Math.random() * 2) + 1));

              targetBirds.forEach(tb => {
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
            ctx.strokeStyle = `rgba(186, 230, 253, ${d.alpha * rainFactor})`;
            ctx.lineWidth = d.thickness;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.wind * (d.len / d.speed) * 3, d.y + d.len);
            ctx.stroke();
          }

          const mistGrad = ctx.createLinearGradient(0, height - 140, 0, height);
          mistGrad.addColorStop(0, 'rgba(148, 163, 184, 0)');
          mistGrad.addColorStop(1, `rgba(148, 163, 184, ${0.22 * rainFactor})`);
          ctx.fillStyle = mistGrad;
          ctx.fillRect(0, height - 140, width, 140);

          // Render Broad, Brilliant Electric Lightning Bolt (Tri-Layer Corona + Arc + Core)
          if (lightningBolt && lightningBolt.alpha > 0.01) {
            ctx.save();

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
    // 11. MODERN & EXPERIMENTAL
    // Objects: Liquid chrome blobs (Metaballs), non-Euclidean toruses, iridescent membranes
    // Physics: Fluid dynamics mixed with low gravity, soft body deformation
    // Interactions: Liquid Blob Fusion (gravitational mass merge), Spatial Distortion
    // =========================================================================
    else {
      const blobs = [];
      const numBlobs = Math.min(16, Math.max(8, Math.floor(width / 95)));

      for (let i = 0; i < numBlobs; i++) {
        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          origX: Math.random() * width,
          origY: Math.random() * height,
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

          // Interaction 1: Liquid Blob Fusion (Gravitational Attraction towards cursor)
          if (dist < 200) {
            b.x += (dx / dist) * 2.5;
            b.y += (dy / dist) * 2.5;
            b.radius = b.baseRadius * (1 + (1 - dist / 200) * 0.6); // Expands like merging metaball!
          } else {
            b.radius += (b.baseRadius - b.radius) * 0.05;
            b.x += b.vx;
            b.y += b.vy;
          }

          if (b.x < -40) b.x = width + 40;
          if (b.x > width + 40) b.x = -40;
          if (b.y < -40) b.y = height + 40;
          if (b.y > height + 40) b.y = -40;

          // Render Liquid Chrome Blob with Specular Shimmer
          const grad = ctx.createRadialGradient(b.x - b.radius * 0.3, b.y - b.radius * 0.3, 0, b.x, b.y, b.radius);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
          grad.addColorStop(0.3, `hsla(${b.colorHue + time * 0.02}, 80%, 65%, 0.6)`);
          grad.addColorStop(1, 'rgba(15, 23, 42, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();

          // Non-Euclidean Torus Ring
          if (i % 3 === 0) {
            ctx.strokeStyle = `hsla(${b.colorHue}, 90%, 70%, 0.4)`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(b.x, b.y, b.radius * 1.4, b.radius * 0.5, b.phase, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      };
    }

    // -------------------------------------------------------------------------
    // Main 60 FPS Animation Loop
    // -------------------------------------------------------------------------
    const loop = (time) => {
      renderFrame(time);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [category, accentColor, isPremium, bgStyle]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
          opacity: typeof opacity === 'number' ? opacity : 0.65,
          transition: 'opacity 0.4s ease'
        }}
      />
      {/* Contrast scrim for clear text readability only on default template backgrounds */}
      {!hasCustomBg && (
        <div 
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 20%, rgba(8, 11, 20, 0.4) 0%, rgba(4, 7, 14, 0.75) 100%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
}
