import html2pdf from 'html2pdf.js';

/**
 * FolioVerse Standalone ATS Resume Generator
 * Generates 100% self-contained, responsive, ATS-optimized, and print-ready HTML resumes
 * for all 31+ college degree streams, layouts, and alignment styles.
 */

export function generateStandaloneResumeHtml(resumeData, template) {
  const tpl = template || {};
  const data = resumeData || {};

  const name = data.fullName || 'Candidate Name';
  const headline = data.headline || tpl.collegeCourse || 'Professional Degree Candidate';
  const email = data.email || '';
  const phone = data.phone || '';
  const location = data.location || '';
  const website = data.website || '';
  const linkedin = data.linkedin || '';
  const github = data.github || '';
  const summary = data.summary || data.bio || '';
  const photoUrl = data.photoUrl || '';
  const showPhoto = data.showPhoto !== false;
  const showSkills = data.showSkills !== false;
  const skillsHeading = data.skillsHeading || 'Technical & Functional Skills';
  
  const customColors = data.customColors || {};
  const accentColor = customColors.accentColor || tpl.accentColor || '#10b981';
  const headingColor = customColors.headingColor || '#0f172a';
  const textColor = customColors.textColor || '#0f172a';
  const subtextColor = customColors.subtextColor || '#475569';
  const cardBgColor = customColors.cardBgColor || '#f8fafc';
  const borderColor = customColors.cardBorderColor || '#e2e8f0';

  const photoSize = Number(data.photoSize) || 85;
  const photoHeight = Math.round(photoSize * 1.18);
  const photoAlign = data.photoAlign || 'right';
  const photoShape = data.photoShape || 'rounded';
  const photoRadius = photoShape === 'circle' ? '50%' : (photoShape === 'square' ? '0px' : '8px');

  const layout = tpl.layout || 'bento-grid';
  const collegeCourse = tpl.collegeCourse || 'College Degree';
  const cornerBadge = tpl.cornerBadge || 'Verified Degree Candidate';

  const education = data.education || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills || {};
  const certifications = data.certifications || [];
  const honors = data.honors || [];

  const esc = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  const isTerminal = layout.includes('terminal') || layout.includes('hud');
  const isClassic = layout.includes('classic') || layout.includes('editorial');
  const fontFamily = isTerminal
    ? "'JetBrains Mono', 'Fira Code', monospace"
    : (isClassic ? "'Playfair Display', Georgia, serif" : "'Inter', -apple-system, sans-serif");

  // Reusable sub-renderers for HTML output
  const renderPhotoHtml = () => {
    if (!showPhoto || !photoUrl) return '';
    return `
      <div class="candidate-photo-wrapper">
        <img src="${esc(photoUrl)}" alt="${esc(name)}" style="width: ${photoSize}px; height: ${photoHeight}px; object-fit: cover; border-radius: ${photoRadius}; border: 2.5px solid var(--accent); box-shadow: 0 4px 14px rgba(0,0,0,0.12);" />
      </div>
    `;
  };

  const renderContactHtml = (isVertical = false) => `
    <div class="contact-row" style="${isVertical ? 'flex-direction: column; gap: 0.45rem;' : ''}">
      ${email ? `<span>✉ ${esc(email)}</span>` : ''}
      ${phone ? `<span>☎ ${esc(phone)}</span>` : ''}
      ${location ? `<span>📍 ${esc(location)}</span>` : ''}
      ${website ? `<span>🌐 ${esc(website)}</span>` : ''}
      ${linkedin ? `<span>🔗 <a href="${esc(linkedin)}" target="_blank" style="color: var(--accent); text-decoration: none;">LinkedIn</a></span>` : ''}
      ${github ? `<span>💻 <a href="${esc(github)}" target="_blank" style="color: var(--accent); text-decoration: none;">GitHub</a></span>` : ''}
    </div>
  `;

  const renderSummaryHtml = () => {
    if (!summary) return '';
    return `
      <section class="resume-section">
        <h2 class="section-heading">Professional Objective &amp; Summary</h2>
        <p class="summary-text">${esc(summary)}</p>
      </section>
    `;
  };

  const renderEducationHtml = () => {
    if (!education || education.length === 0) return '';
    return `
      <section class="resume-section">
        <h2 class="section-heading">Academic Credentials &amp; Honors</h2>
        ${education.map(ed => `
          <div style="margin-bottom: 0.85rem;">
            <div class="edu-item">
              <div>
                <span class="edu-degree">${esc(ed.degree)}</span>
                <div class="edu-school">${esc(ed.institution || ed.school)}</div>
              </div>
              <div style="text-align: right;">
                <span class="edu-year">${esc(ed.period || ed.year)}</span>
                ${ed.gpa || ed.grade ? `<div class="gpa-pill">CGPA: ${esc(ed.gpa || ed.grade)}</div>` : ''}
              </div>
            </div>
            ${ed.coursework ? `
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
                <strong>Key Coursework:</strong> ${esc(ed.coursework)}
              </p>
            ` : ''}
          </div>
        `).join('')}
      </section>
    `;
  };

  const renderExperienceHtml = () => {
    if (!experience || experience.length === 0) return '';
    return `
      <section class="resume-section">
        <h2 class="section-heading">Internships &amp; Practical Experience</h2>
        ${experience.map(exp => `
          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
              <strong style="font-size: 1rem; color: var(--heading);">${esc(exp.role || exp.title)}</strong>
              <span style="font-size: 0.82rem; color: var(--accent); font-weight: 700;">${esc(exp.period)}</span>
            </div>
            <div style="font-size: 0.88rem; color: var(--accent); font-weight: 600; margin-bottom: 0.3rem;">${esc(exp.company || exp.organization)} ${exp.location ? `&bull; ${esc(exp.location)}` : ''}</div>
            ${exp.description ? `<p style="font-size: 0.88rem; color: var(--text); line-height: 1.55; margin-bottom: 0.3rem;">${esc(exp.description)}</p>` : ''}
            ${exp.bullets && exp.bullets.length > 0 ? `
              <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.85rem; color: var(--text);">
                ${exp.bullets.map(b => `<li style="margin-bottom: 0.2rem;">${esc(b)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
    `;
  };

  const renderProjectsHtml = () => {
    if (!projects || projects.length === 0) return '';
    return `
      <section class="resume-section">
        <h2 class="section-heading">Capstone Works &amp; Technical Projects</h2>
        <div class="bento-grid">
          ${projects.map(p => `
            <div class="bento-item">
              <strong>${esc(p.title)}</strong>
              ${p.description ? `<p>${esc(p.description)}</p>` : ''}
              ${p.bullets && p.bullets.length > 0 ? `
                <ul style="margin: 0.3rem 0; padding-left: 1.15rem; font-size: 0.82rem; color: var(--text);">
                  ${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
                </ul>
              ` : ''}
              ${p.techStack ? `
                <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--accent); font-weight: 700;">
                  ${(Array.isArray(p.techStack) ? p.techStack : [p.techStack]).map(t => esc(t)).join(' &bull; ')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  };

  const renderSkillsHtml = () => {
    if (!showSkills || !skills || (typeof skills === 'object' && Object.keys(skills).length === 0)) return '';
    return `
      <section class="resume-section">
        <h2 class="section-heading">${esc(skillsHeading)}</h2>
        ${Array.isArray(skills) ? `
          <div class="skills-cluster">
            ${skills.map(s => {
              const skillName = typeof s === 'string' ? s : (s.name || '');
              return `<span class="skill-pill">${esc(skillName)}</span>`;
            }).join('')}
          </div>
        ` : `
          <div class="bento-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.65rem;">
            ${Object.entries(skills).map(([catKey, items]) => {
              const catTitle = catKey.replace(/([A-Z])/g, ' $1').trim();
              const itemsStr = Array.isArray(items) ? items.join(', ') : String(items);
              if (!itemsStr) return '';
              return `
                <div class="bento-item" style="padding: 0.65rem 0.85rem;">
                  <strong style="text-transform: capitalize; font-size: 0.84rem; color: var(--heading); margin-bottom: 0.2rem;">${esc(catTitle)}:</strong>
                  <p style="color: var(--text); font-size: 0.82rem;">${esc(itemsStr)}</p>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </section>
    `;
  };

  const renderCertificationsHtml = () => {
    if ((!certifications || certifications.length === 0) && (!honors || honors.length === 0)) return '';
    return `
      <section class="resume-section">
        <h2 class="section-heading">Verified Credentials &amp; Distinctions</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.65rem;">
          ${certifications.map(c => `
            <div style="background: var(--card-bg); border: 1px solid var(--border); padding: 0.65rem 0.85rem; border-radius: 6px; font-size: 0.84rem;">
              <strong style="color: var(--heading);">${esc(typeof c === 'string' ? c : c.name)}</strong>
              ${typeof c === 'object' && (c.issuer || c.date) ? `<div style="color: var(--text-muted); font-size: 0.78rem;">${esc(c.issuer || '')} ${c.date ? `&bull; ${esc(c.date)}` : ''}</div>` : ''}
            </div>
          `).join('')}
          ${honors.map(h => `
            <div style="background: var(--card-bg); border: 1px solid var(--border); padding: 0.65rem 0.85rem; border-radius: 6px; font-size: 0.84rem;">
              <strong style="color: #d97706;">★ ${esc(typeof h === 'string' ? h : h.name)}</strong>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(name)} — ${esc(collegeCourse)} Resume</title>
  <meta name="description" content="Resume for ${esc(name)} — ${esc(headline)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: ${accentColor};
      --bg: #f8fafc;
      --card-bg: ${cardBgColor};
      --border: ${borderColor};
      --heading: ${headingColor};
      --text: ${textColor};
      --text-muted: ${subtextColor};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0b0f19;
      color: var(--text);
      font-family: ${fontFamily};
      line-height: 1.55;
      padding: 2.5rem 1rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Print / PDF Controls Bar */
    .top-actions-bar {
      width: 100%;
      max-width: 860px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      color: #94a3b8;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
    }
    .btn-action {
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s;
    }
    .btn-action:hover { opacity: 0.9; transform: translateY(-1px); }

    /* The Standard A4 Resume Paper Sheet (Strictly 1 Page) */
    .resume-sheet {
      width: 100%;
      max-width: 794px;
      min-height: 1123px;
      max-height: 1123px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.08);
      padding: 1.25rem 1.6rem;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      line-height: 1.35;
      font-size: 0.84rem;
      page-break-after: avoid;
    }

    /* Corner Degree Badge */
    .degree-ribbon {
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid var(--accent);
      color: var(--accent);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      font-size: 0.72rem;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    header.resume-header {
      border-bottom: 1.5px solid var(--border);
      padding-bottom: 0.65rem;
      margin-bottom: 0.65rem;
    }
    h1.candidate-name {
      font-size: 1.75rem;
      font-weight: 900;
      color: var(--heading);
      letter-spacing: -0.02em;
      margin-bottom: 0.15rem;
      line-height: 1.1;
    }
    p.candidate-headline {
      font-size: 0.92rem;
      color: var(--accent);
      font-weight: 700;
      margin-bottom: 0.35rem;
    }
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    .contact-row span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* Section Styles */
    section.resume-section {
      margin-bottom: 0.6rem;
    }
    h2.section-heading {
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--heading);
      font-weight: 800;
      border-bottom: 1.5px solid var(--border);
      padding-bottom: 0.2rem;
      margin-bottom: 0.35rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    h2.section-heading::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      background: var(--accent);
    }

    .summary-text {
      font-size: 0.92rem;
      color: var(--text);
      line-height: 1.65;
      text-align: justify;
    }

    /* Bento Box Grid */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }
    .bento-item {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1rem;
    }
    .bento-item strong {
      display: block;
      color: var(--heading);
      font-size: 0.98rem;
      margin-bottom: 0.25rem;
    }
    .bento-item p {
      font-size: 0.86rem;
      color: var(--text);
      line-height: 1.55;
    }

    /* Education Item */
    .edu-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      margin-bottom: 0.4rem;
    }
    .edu-degree { font-size: 1.02rem; font-weight: 800; color: var(--heading); }
    .edu-school { font-size: 0.9rem; color: var(--text); font-weight: 600; }
    .edu-year { font-size: 0.84rem; color: var(--accent); font-weight: 700; }
    .gpa-pill {
      display: inline-block;
      background: rgba(16, 185, 129, 0.12);
      color: #059669;
      padding: 0.15rem 0.55rem;
      border-radius: 4px;
      font-size: 0.78rem;
      font-weight: 700;
      margin-top: 0.25rem;
    }

    /* Skill Tags */
    .skills-cluster {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill-pill {
      background: var(--card-bg);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.3rem 0.75rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    /* Print Styles */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .top-actions-bar { display: none !important; }
      .resume-sheet {
        box-shadow: none !important;
        border-radius: 0 !important;
        padding: 1.5cm !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body>

  <!-- Controls Bar (Hidden during Print) -->
  <div class="top-actions-bar">
    <div>
      📄 FolioVerse ATS Resume &bull; <strong>${esc(collegeCourse)}</strong>
    </div>
    <div style="display: flex; gap: 0.75rem;">
      <button class="btn-action" onclick="window.print()">
        🖨️ Print / Save as PDF
      </button>
    </div>
  </div>

  <!-- A4 Resume Sheet -->
  <main class="resume-sheet">
    
    <div class="degree-ribbon">
      <span>🎓</span>
      <span>${esc(cornerBadge)}</span>
    </div>

    ${layout === 'sidebar-left' ? `
      <!-- SIDEBAR-LEFT LAYOUT -->
      <div style="display: flex; gap: 2rem; align-items: stretch;">
        <aside style="width: 32%; flex-shrink: 0; background: var(--card-bg); border-right: 2px solid var(--border); margin: -3rem 0 -3rem -3rem; padding: 3rem 1.5rem;">
          <div style="margin-bottom: 1.5rem; text-align: ${photoAlign === 'right' ? 'right' : (photoAlign === 'center' ? 'center' : 'left')};">
            ${renderPhotoHtml()}
          </div>
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--heading); border-bottom: 1.5px solid var(--border); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">Contact</h4>
            ${renderContactHtml(true)}
          </div>
          ${renderSkillsHtml()}
          ${renderCertificationsHtml()}
        </aside>
        <div style="flex: 1; min-width: 0;">
          <header class="resume-header" style="border-bottom: 2px solid var(--border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h1 class="candidate-name">${esc(name)}</h1>
            <p class="candidate-headline">${esc(headline)}</p>
          </header>
          ${renderSummaryHtml()}
          ${renderExperienceHtml()}
          ${renderProjectsHtml()}
          ${renderEducationHtml()}
        </div>
      </div>
    ` : layout === 'sidebar-right' ? `
      <!-- SIDEBAR-RIGHT LAYOUT -->
      <div style="display: flex; gap: 2rem; align-items: stretch;">
        <div style="flex: 1; min-width: 0;">
          <header class="resume-header" style="border-bottom: 2px solid var(--border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h1 class="candidate-name">${esc(name)}</h1>
            <p class="candidate-headline">${esc(headline)}</p>
          </header>
          ${renderSummaryHtml()}
          ${renderExperienceHtml()}
          ${renderProjectsHtml()}
        </div>
        <aside style="width: 32%; flex-shrink: 0; background: var(--card-bg); border-left: 2px solid var(--border); margin: -3rem -3rem -3rem 0; padding: 3rem 1.5rem;">
          <div style="margin-bottom: 1.5rem; text-align: ${photoAlign === 'left' ? 'left' : (photoAlign === 'center' ? 'center' : 'right')};">
            ${renderPhotoHtml()}
          </div>
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--heading); border-bottom: 1.5px solid var(--border); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">Contact</h4>
            ${renderContactHtml(true)}
          </div>
          ${renderEducationHtml()}
          ${renderSkillsHtml()}
          ${renderCertificationsHtml()}
        </aside>
      </div>
    ` : layout === 'minimal-centered' ? `
      <!-- MINIMAL-CENTERED LAYOUT -->
      <div style="text-align: center; border-bottom: 2px solid var(--border); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: center; margin-bottom: 0.75rem;">
          ${renderPhotoHtml()}
        </div>
        <h1 class="candidate-name" style="letter-spacing: 0.06em; text-transform: uppercase;">${esc(name)}</h1>
        <p class="candidate-headline" style="font-style: italic;">${esc(headline)}</p>
        <div style="display: flex; justify-content: center; margin-top: 0.5rem;">
          ${renderContactHtml(false)}
        </div>
      </div>
      ${renderSummaryHtml()}
      ${renderExperienceHtml()}
      ${renderProjectsHtml()}
      ${renderEducationHtml()}
      ${renderSkillsHtml()}
      ${renderCertificationsHtml()}
    ` : (layout === 'two-column-split' || layout === 'executive-split' || layout === 'clinical-two-col') ? `
      <!-- TWO-COLUMN-SPLIT LAYOUT -->
      <header class="resume-header" style="display: flex; flex-direction: ${photoAlign === 'center' ? 'column' : (photoAlign === 'left' ? 'row-reverse' : 'row')}; justify-content: space-between; align-items: ${photoAlign === 'center' ? 'center' : 'flex-start'}; gap: 1.5rem;">
        <div style="flex: 1; text-align: ${photoAlign === 'center' ? 'center' : 'left'};">
          <h1 class="candidate-name">${esc(name)}</h1>
          <p class="candidate-headline">${esc(headline)}</p>
          ${renderContactHtml(false)}
        </div>
        ${renderPhotoHtml()}
      </header>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.75rem; align-items: start;">
        <div>
          ${renderSummaryHtml()}
          ${renderExperienceHtml()}
        </div>
        <div>
          ${renderEducationHtml()}
          ${renderProjectsHtml()}
          ${renderSkillsHtml()}
          ${renderCertificationsHtml()}
        </div>
      </div>
    ` : `
      <!-- STANDARD / BENTO / TIMELINE / DEFAULT LAYOUT -->
      <header class="resume-header" style="display: flex; flex-direction: ${photoAlign === 'center' ? 'column' : (photoAlign === 'left' ? 'row-reverse' : 'row')}; justify-content: space-between; align-items: ${photoAlign === 'center' ? 'center' : 'flex-start'}; gap: 1.5rem;">
        <div style="flex: 1; text-align: ${photoAlign === 'center' ? 'center' : 'left'};">
          <h1 class="candidate-name">${esc(name)}</h1>
          <p class="candidate-headline">${esc(headline)}</p>
          ${renderContactHtml(false)}
        </div>
        ${renderPhotoHtml()}
      </header>
      ${renderSummaryHtml()}
      ${renderEducationHtml()}
      ${renderExperienceHtml()}
      ${renderProjectsHtml()}
      ${renderSkillsHtml()}
      ${renderCertificationsHtml()}
    `}

  </main>

</body>
</html>`;
}

/**
 * Triggers instant browser download of the ATS Resume PDF file (A4 format)
 */
export async function downloadResumeAsPdf(resumeData, template, targetElement = null) {
  const rawName = resumeData?.fullName || template?.collegeCourse || 'resume';
  const cleanFilename = rawName.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-') + '-resume.pdf';

  // Locate the resume DOM element to capture
  let element = targetElement;
  if (!element) {
    element = document.getElementById('printable-resume-paper') || document.querySelector('.printable-resume-paper');
  }

  // Hide any interactive overlays before capturing (e.g. photo change button, remove icons)
  const noPrintEls = element ? element.querySelectorAll('.no-print, .photo-hover-overlay') : [];
  noPrintEls.forEach(el => { el.style.visibility = 'hidden'; });

  // A4 PDF Options
  const opt = {
    margin: [0, 0, 0, 0],
    filename: cleanFilename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2.2, // Ultra-sharp 300+ DPI retina rendering
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
      scrollY: 0
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    if (element) {
      await html2pdf().set(opt).from(element).save();
    } else {
      // Offscreen A4 container fallback
      const htmlContent = generateStandaloneResumeHtml(resumeData, template);
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '794px';
      container.style.minHeight = '1123px';
      container.style.maxHeight = '1123px';
      container.style.overflow = 'hidden';
      container.style.boxSizing = 'border-box';
      container.style.background = '#ffffff';
      container.innerHTML = htmlContent;
      document.body.appendChild(container);

      try {
        const sheet = container.querySelector('.resume-sheet') || container;
        await html2pdf().set(opt).from(sheet).save();
      } finally {
        document.body.removeChild(container);
      }
    }
    return cleanFilename;
  } catch (error) {
    console.error('PDF export failed with html2pdf, falling back to print dialog:', error);
    window.print();
    return cleanFilename;
  } finally {
    // Restore any hidden interactive overlays
    noPrintEls.forEach(el => { el.style.visibility = ''; });
  }
}

/**
 * Triggers instant browser download of the ATS Resume HTML file
 */
export function downloadResumeAsHtml(resumeData, template) {
  const htmlContent = generateStandaloneResumeHtml(resumeData, template);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const rawName = resumeData?.fullName || template?.collegeCourse || 'resume';
  const cleanFilename = rawName.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-') + '-resume.html';

  const link = document.createElement('a');
  link.href = url;
  link.download = cleanFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return cleanFilename;
}
