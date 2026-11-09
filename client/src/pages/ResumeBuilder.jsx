import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  RESUME_TEMPLATES, 
  RESUME_CATEGORIES, 
  getResumeById 
} from '../data/resumesData';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  Sparkles, 
  Edit3, 
  Eye, 
  Check, 
  Plus, 
  Trash2, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Globe, 
  ShieldCheck, 
  QrCode, 
  Copy,
  ChevronRight,
  User,
  Share2,
  Camera,
  Upload,
  X,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadResumeAsPdf } from '../utils/resumeExporter';
import { api } from '../services/api';
import AdBanner from '../components/common/AdBanner';

export default function ResumeBuilder() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTemplateId = templateId || searchParams.get('template') || 'cs-ai-engineer';
  const [currentTemplate, setCurrentTemplate] = useState(getResumeById(initialTemplateId));
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
  const [editorSection, setEditorSection] = useState('personal'); // 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'certifications'
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  
  // Template Gallery & Preview Modal State
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [previewingTemplate, setPreviewingTemplate] = useState(null);
  const [modalCategory, setModalCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Photo Input Ref & Upload state
  const photoInputRef = useRef(null);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);

  // Resume editable state
  const [resumeData, setResumeData] = useState(() => {
    const tpl = getResumeById(initialTemplateId);
    const data = JSON.parse(JSON.stringify(tpl.sampleData));
    if (!data.skillsHeading) data.skillsHeading = 'Technical & Functional Skills';
    if (data.showSkills === undefined) data.showSkills = true;
    if (data.showPhoto === undefined) data.showPhoto = true;
    if (data.photoSize === undefined) data.photoSize = 85;
    if (data.photoAlign === undefined) data.photoAlign = 'right';
    if (data.photoShape === undefined) data.photoShape = 'rounded';
    if (!data.customColors) {
      data.customColors = {
        headingColor: '',
        textColor: '',
        subtextColor: '',
        cardBgColor: '',
        cardBorderColor: '',
        accentColor: ''
      };
    }
    return data;
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const printRef = useRef(null);

  // Sync template if param changes
  useEffect(() => {
    if (templateId) {
      const tpl = getResumeById(templateId);
      setCurrentTemplate(tpl);
    }
  }, [templateId]);

  const handleSelectTemplate = (tpl) => {
    setCurrentTemplate(tpl);
    const data = JSON.parse(JSON.stringify(tpl.sampleData));
    if (!data.skillsHeading) data.skillsHeading = 'Technical & Functional Skills';
    if (data.showSkills === undefined) data.showSkills = true;
    if (data.showPhoto === undefined) data.showPhoto = true;
    // Retain user's custom photo and styling preferences
    if (resumeData.photoUrl) {
      data.photoUrl = resumeData.photoUrl;
      data.showPhoto = resumeData.showPhoto;
    }
    if (resumeData.photoSize) data.photoSize = resumeData.photoSize;
    if (resumeData.photoAlign) data.photoAlign = resumeData.photoAlign;
    if (resumeData.photoShape) data.photoShape = resumeData.photoShape;
    if (resumeData.customColors) data.customColors = resumeData.customColors;
    setResumeData(data);
    navigate(`/resume-builder/${tpl.id}`, { replace: true });
  };

  const handleLoadSampleData = () => {
    if (window.confirm('Reset this resume with the curated college course sample data?')) {
      const data = JSON.parse(JSON.stringify(currentTemplate.sampleData));
      if (!data.skillsHeading) data.skillsHeading = 'Technical & Functional Skills';
      if (data.showSkills === undefined) data.showSkills = true;
      if (data.showPhoto === undefined) data.showPhoto = true;
      setResumeData(data);
    }
  };

  // Photo Upload Handler with base64 instant preview & server upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Instant local base64 display for live preview & offline print/HTML export
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setResumeData(prev => ({
          ...prev,
          photoUrl: event.target.result,
          showPhoto: true
        }));
      }
    };
    reader.readAsDataURL(file);

    // 2. Concurrently upload to server storage if API is active
    setIsPhotoUploading(true);
    api.uploadImage(file).then(res => {
      if (res?.url) {
        setResumeData(prev => ({
          ...prev,
          photoUrl: res.url,
          showPhoto: true
        }));
      }
    }).catch(err => {
      console.warn('Backend image upload fallback to base64 data URL:', err);
    }).finally(() => {
      setIsPhotoUploading(false);
    });
  };

  const handleRemovePhoto = (e) => {
    if (e) e.stopPropagation();
    setResumeData(prev => ({
      ...prev,
      photoUrl: ''
    }));
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  // Skills helpers: rename category heading, update skills items, remove category, add category
  const handleRenameSkillCategory = (oldKey, newKey) => {
    if (!newKey || oldKey === newKey) return;
    setResumeData(prev => {
      const updated = {};
      for (const [k, v] of Object.entries(prev.skills || {})) {
        if (k === oldKey) {
          updated[newKey] = v;
        } else {
          updated[k] = v;
        }
      }
      return { ...prev, skills: updated };
    });
  };

  const handleUpdateSkillItems = (key, commaSeparated) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...(prev.skills || {}),
        [key]: commaSeparated.split(',').map(s => s.trim()).filter(Boolean)
      }
    }));
  };

  const handleRemoveSkillCategory = (key) => {
    setResumeData(prev => {
      const updated = { ...(prev.skills || {}) };
      delete updated[key];
      return { ...prev, skills: updated };
    });
  };

  const handleAddSkillCategory = (defaultName = 'Technical Skills') => {
    setResumeData(prev => {
      const skills = { ...(prev.skills || {}) };
      let name = defaultName;
      let counter = 1;
      while (skills[name]) {
        name = `${defaultName} ${++counter}`;
      }
      skills[name] = defaultName.toLowerCase().includes('technical') 
        ? ['Core Architecture', 'System Design', 'Tools'] 
        : ['Communication', 'Leadership', 'Problem Solving'];
      return {
        ...prev,
        showSkills: true,
        skills
      };
    });
  };

  const handlePrint = () => {
    confetti({ particleCount: 50, spread: 60 });
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      confetti({ particleCount: 65, spread: 60 });
      await downloadResumeAsPdf(resumeData, currentTemplate, printRef.current);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Generating PDF via browser print dialogue...');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleSharePortfolioLink = () => {
    const portfolioUrl = resumeData.portfolioSlug 
      ? `${window.location.origin}/p/${resumeData.portfolioSlug}`
      : window.location.origin;
    navigator.clipboard.writeText(portfolioUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Education helpers
  const handleAddEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        { degree: 'Degree Name', institution: 'University / Institute', period: '2022 - 2026', gpa: '9.0 / 10.0 CGPA', coursework: 'Core Discipline Subjects' }
      ]
    }));
  };
  const handleRemoveEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Experience helpers
  const handleAddExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        { role: 'Role / Designation', company: 'Organization Name', period: '2025 - Present', location: 'City, Country', bullets: ['Engineered key deliverables with measurable impact.'] }
      ]
    }));
  };
  const handleRemoveExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // Project helpers
  const handleAddProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        { title: 'New Capstone Project', techStack: ['Tool A', 'Tool B'], link: '', bullets: ['Description of innovation and metrics.'] }
      ]
    }));
  };
  const handleRemoveProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const filteredTemplates = activeCategory === 'all' 
    ? RESUME_TEMPLATES 
    : RESUME_TEMPLATES.filter(t => t.category === activeCategory);

  // Active theme and color styling tokens
  const activeAccent = resumeData.customColors?.accentColor || currentTemplate.accentColor;
  const headingColor = resumeData.customColors?.headingColor || activeAccent;
  const textColor = resumeData.customColors?.textColor || '#0f172a';
  const subtextColor = resumeData.customColors?.subtextColor || '#475569';
  const cardBgColor = resumeData.customColors?.cardBgColor || '#f8fafc';
  const cardBorderColor = resumeData.customColors?.cardBorderColor || '#e2e8f0';

  const photoRadius = resumeData.photoShape === 'circle' ? '50%' : resumeData.photoShape === 'square' ? '0px' : '8px';
  const photoSize = Number(resumeData.photoSize) || 85;
  const photoHeight = Math.round(photoSize * 1.18);
  const photoAlign = resumeData.photoAlign || 'right';

  const renderCandidatePhoto = (extraStyle = {}) => {
    if (resumeData.showPhoto === false) return null;
    return (
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem', ...extraStyle }}>
        <input 
          type="file" 
          ref={photoInputRef}
          onChange={handlePhotoUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {resumeData.photoUrl ? (
          <div 
            onClick={() => photoInputRef.current?.click()}
            style={{
              position: 'relative',
              width: `${photoSize}px`,
              height: `${photoHeight}px`,
              borderRadius: photoRadius,
              overflow: 'hidden',
              border: `2.5px solid ${activeAccent}`,
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              background: cardBgColor
            }}
            title="Click to change candidate photo"
          >
            <img 
              src={resumeData.photoUrl} 
              alt={resumeData.fullName || 'Candidate Portrait'} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              className="no-print photo-hover-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                gap: '0.25rem'
              }}
            >
              <Camera style={{ width: '16px', height: '16px' }} />
              <span>Change</span>
            </div>
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="no-print"
              title="Remove Photo"
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.9)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X style={{ width: '12px', height: '12px' }} />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => photoInputRef.current?.click()}
            className="no-print"
            style={{
              width: `${photoSize}px`,
              height: `${photoHeight}px`,
              borderRadius: photoRadius,
              border: `2px dashed ${activeAccent}`,
              background: `${activeAccent}0a`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '0.5rem',
              textAlign: 'center',
              transition: 'all 0.2s ease'
            }}
            title="Click to upload candidate photo"
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: `${activeAccent}18`,
              color: activeAccent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.35rem'
            }}>
              <Camera style={{ width: '16px', height: '16px' }} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: headingColor, lineHeight: 1.2 }}>
              Upload Photo
            </span>
            <span style={{ fontSize: '0.62rem', color: subtextColor, marginTop: '0.15rem' }}>
              {photoSize}x{photoHeight}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderCornerBadge = () => (
    <div style={{
      border: `1.5px solid ${activeAccent}`,
      borderRadius: '6px',
      padding: '0.22rem 0.5rem',
      fontSize: '0.62rem',
      fontWeight: 800,
      color: activeAccent,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: 'rgba(255,255,255,0.95)',
      whiteSpace: 'nowrap'
    }}>
      <ShieldCheck style={{ width: '11px', height: '11px' }} />
      <span>{currentTemplate.cornerBadge || 'VERIFIED // FOLIOVERSE'}</span>
    </div>
  );

  const renderContactDetails = (isVertical = false) => (
    <div style={{
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      flexWrap: isVertical ? 'nowrap' : 'wrap',
      gap: isVertical ? '0.45rem' : '0.85rem',
      fontSize: '0.82rem',
      color: subtextColor
    }}>
      {resumeData.email && <span style={{ wordBreak: 'break-all' }}>✉ {resumeData.email}</span>}
      {resumeData.phone && <span>☎ {resumeData.phone}</span>}
      {resumeData.location && <span>📍 {resumeData.location}</span>}
      {resumeData.linkedin && (
        <a href={resumeData.linkedin} target="_blank" rel="noreferrer" style={{ color: activeAccent, textDecoration: 'none' }}>
          🔗 LinkedIn
        </a>
      )}
      {resumeData.github && (
        <a href={resumeData.github} target="_blank" rel="noreferrer" style={{ color: activeAccent, textDecoration: 'none' }}>
          💻 GitHub
        </a>
      )}
    </div>
  );

  const renderSummarySection = (title = 'Professional Profile & Core Strengths') => {
    if (!resumeData.summary) return null;
    return (
      <div style={{ marginBottom: '0.6rem' }}>
        <h2 style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: headingColor,
          borderBottom: `1.5px solid ${cardBorderColor}`,
          paddingBottom: '0.2rem',
          marginBottom: '0.35rem'
        }}>
          {title}
        </h2>
        <p style={{ color: textColor, lineHeight: 1.38, textAlign: 'justify', fontSize: '0.82rem', margin: 0 }}>
          {resumeData.summary}
        </p>
      </div>
    );
  };

  const renderEducationSection = () => {
    if (!resumeData.education?.length) return null;
    return (
      <div style={{ marginBottom: '0.6rem' }}>
        <h2 style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: headingColor,
          borderBottom: `1.5px solid ${cardBorderColor}`,
          paddingBottom: '0.2rem',
          marginBottom: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <GraduationCap style={{ width: '13px', height: '13px', color: activeAccent }} /> Education &amp; Academic Honors
        </h2>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: idx === resumeData.education.length - 1 ? 0 : '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '0.88rem', color: textColor }}>{edu.degree}</strong>
              <span style={{ fontSize: '0.76rem', color: subtextColor, fontWeight: 600 }}>{edu.period}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: subtextColor, fontSize: '0.8rem' }}>
              <span>{edu.institution}</span>
              {edu.gpa && <span style={{ fontWeight: 700, color: activeAccent }}>{edu.gpa}</span>}
            </div>
            {edu.coursework && (
              <div style={{ fontSize: '0.75rem', color: subtextColor, marginTop: '0.1rem', lineHeight: 1.3 }}>
                <strong>Coursework:</strong> {edu.coursework}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderExperienceSection = () => {
    if (!resumeData.experience?.length) return null;
    return (
      <div style={{ marginBottom: '0.6rem' }}>
        <h2 style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: headingColor,
          borderBottom: `1.5px solid ${cardBorderColor}`,
          paddingBottom: '0.2rem',
          marginBottom: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Briefcase style={{ width: '13px', height: '13px', color: activeAccent }} /> Professional Experience &amp; Internships
        </h2>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: idx === resumeData.experience.length - 1 ? 0 : '0.45rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '0.88rem', color: textColor }}>{exp.role}</strong>
              <span style={{ fontSize: '0.76rem', color: subtextColor, fontWeight: 600 }}>{exp.period}</span>
            </div>
            <div style={{ color: activeAccent, fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.15rem' }}>
              {exp.company} {exp.location && `• ${exp.location}`}
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: textColor, fontSize: '0.79rem', lineHeight: 1.35 }}>
              {(exp.bullets || []).map((b, i) => (
                <li key={i} style={{ marginBottom: '0.15rem' }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderProjectsSection = () => {
    if (!resumeData.projects?.length) return null;
    return (
      <div style={{ marginBottom: '0.6rem' }}>
        <h2 style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: headingColor,
          borderBottom: `1.5px solid ${cardBorderColor}`,
          paddingBottom: '0.2rem',
          marginBottom: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Code style={{ width: '13px', height: '13px', color: activeAccent }} /> Key Technical &amp; Capstone Projects
        </h2>
        {resumeData.projects.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: idx === resumeData.projects.length - 1 ? 0 : '0.42rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: textColor }}>
                {proj.title}
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noreferrer" style={{ marginLeft: '0.4rem', fontSize: '0.74rem', color: activeAccent, textDecoration: 'none' }}>
                    [Live Link]
                  </a>
                )}
              </span>
              {proj.techStack && (
                <span style={{ fontSize: '0.74rem', color: subtextColor, fontStyle: 'italic' }}>
                  {(Array.isArray(proj.techStack) ? proj.techStack : [proj.techStack]).join(', ')}
                </span>
              )}
            </div>
            <ul style={{ margin: '0.1rem 0 0', paddingLeft: '1.1rem', color: textColor, fontSize: '0.79rem', lineHeight: 1.35 }}>
              {(proj.bullets || []).map((b, i) => (
                <li key={i} style={{ marginBottom: '0.12rem' }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderSkillsSection = (inSidebar = false) => {
    if (resumeData.showSkills === false || !resumeData.skills || Object.keys(resumeData.skills).length === 0) return null;
    return (
      <div style={{ marginBottom: '0.55rem' }}>
        <h2 style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: headingColor,
          borderBottom: `1.5px solid ${cardBorderColor}`,
          paddingBottom: '0.2rem',
          marginBottom: '0.35rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Sparkles style={{ width: '13px', height: '13px', color: activeAccent }} />
          {resumeData.skillsHeading || 'Technical & Functional Skills'}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: inSidebar ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.35rem',
          fontSize: '0.78rem'
        }}>
          {Object.entries(resumeData.skills).map(([key, val]) => {
            const categoryTitle = key.replace(/([A-Z])/g, ' $1').trim();
            const itemsText = Array.isArray(val) ? val.join(', ') : val;
            if (!itemsText) return null;
            return (
              <div key={key} style={{ background: cardBgColor, border: `1px solid ${cardBorderColor}`, padding: '0.35rem 0.55rem', borderRadius: '5px' }}>
                <strong style={{ color: headingColor, textTransform: 'capitalize', display: 'block', marginBottom: '0.15rem', fontSize: '0.76rem' }}>
                  {categoryTitle}:
                </strong>
                <span style={{ color: textColor, fontSize: '0.76rem', lineHeight: 1.3 }}>
                  {itemsText}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCertificationsSection = (inSidebar = false) => {
    if (!resumeData.certifications?.length && !resumeData.honors?.length) return null;
    return (
      <div style={{ marginBottom: '0.55rem' }}>
        <h2 style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: headingColor,
          borderBottom: `1.5px solid ${cardBorderColor}`,
          paddingBottom: '0.2rem',
          marginBottom: '0.35rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Award style={{ width: '13px', height: '13px', color: activeAccent }} /> Certifications &amp; Distinctions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: inSidebar ? '1fr' : '1fr 1fr',
          gap: '0.3rem',
          fontSize: '0.76rem'
        }}>
          {resumeData.certifications?.map((c, i) => (
            <div key={i} style={{ color: textColor, display: 'flex', alignItems: 'baseline', gap: '0.25rem', lineHeight: 1.3 }}>
              <span style={{ color: activeAccent }}>✦</span>
              <span>{c}</span>
            </div>
          ))}
          {resumeData.honors?.map((h, i) => (
            <div key={i} style={{ color: textColor, display: 'flex', alignItems: 'baseline', gap: '0.25rem', lineHeight: 1.3 }}>
              <span style={{ color: '#d97706' }}>★</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVerificationFooter = () => (
    <div style={{
      marginTop: '0.65rem',
      borderTop: `1px solid ${cardBorderColor}`,
      paddingTop: '0.45rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.68rem',
      color: subtextColor
    }}>
      <div>
        <div><strong>FOLIOVERSE VERIFICATION ID:</strong> FV-{currentTemplate.id.toUpperCase()}-2026-9X2</div>
        <div style={{ fontSize: '0.64rem' }}>Encrypted candidate credential • Generated on FolioVerse Platform</div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        border: `1px solid ${cardBorderColor}`,
        padding: '0.25rem 0.5rem',
        borderRadius: '5px',
        background: cardBgColor
      }}>
        <QrCode style={{ width: '22px', height: '22px', color: activeAccent }} />
        <div>
          <div style={{ fontWeight: 800, color: headingColor, fontSize: '0.66rem' }}>SCAN FOR LIVE PORTFOLIO</div>
          <div style={{ color: activeAccent, fontSize: '0.62rem' }}>
            {resumeData.portfolioSlug ? `/p/${resumeData.portfolioSlug}` : 'folioview.me'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Application Bar */}
      <header className="no-print resume-builder-header" style={{
        background: '#0d1322',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        zIndex: 50,
        position: 'sticky',
        top: 0
      }}>
        {/* Left: Brand & Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/dashboard" className="btn btn-outline btn-sm" title="Back to Dashboard">
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>FolioVerse Resume Architect</span>
              <span className="badge badge-signature" style={{ fontSize: '0.72rem' }}>20 Elite Templates</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Active Template: <strong style={{ color: currentTemplate.accentColor }}>{currentTemplate.name}</strong> ({currentTemplate.collegeCourse})
            </div>
          </div>
        </div>

        {/* Center: View Switcher (Desktop/Tablet) */}
        <div style={{ display: 'flex', background: 'rgba(2, 6, 23, 0.6)', borderRadius: '8px', padding: '0.2rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button 
            onClick={() => setActiveTab('editor')}
            className={`btn btn-sm ${activeTab === 'editor' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.35rem 0.85rem' }}
          >
            <Edit3 style={{ width: '14px', height: '14px' }} />
            <span>Live Editor</span>
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`btn btn-sm ${activeTab === 'preview' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.35rem 0.85rem' }}
          >
            <Eye style={{ width: '14px', height: '14px' }} />
            <span>Full A4 Preview</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button 
            onClick={() => setIsExploreModalOpen(true)}
            className="btn btn-secondary btn-sm interactive-hover-btn"
            style={{ background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.4)', color: '#c084fc', fontWeight: 700 }}
            title="Browse all 21+ college course templates with live preview"
          >
            <Sparkles style={{ width: '14px', height: '14px', color: '#c084fc' }} />
            <span>All Templates &amp; Preview</span>
          </button>

          <button 
            onClick={handleLoadSampleData}
            className="btn btn-outline btn-sm"
            title="Reset to Course Default Content"
          >
            Reset Sample
          </button>

          <button 
            onClick={handleSharePortfolioLink}
            className="btn btn-secondary btn-sm"
            title="Share FolioVerse Link"
          >
            {copiedLink ? <Check style={{ width: '14px', height: '14px', color: '#10b981' }} /> : <Share2 style={{ width: '14px', height: '14px' }} />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <button 
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="btn btn-primary btn-sm interactive-hover-btn"
            style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              borderColor: '#10b981', 
              fontWeight: 800,
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1.1rem',
              opacity: isExportingPdf ? 0.7 : 1,
              cursor: isExportingPdf ? 'wait' : 'pointer'
            }}
            title="Download your complete ATS-compliant resume as an A4 PDF file"
          >
            <Download style={{ width: '15px', height: '15px' }} />
            <span>{isExportingPdf ? 'Generating A4 PDF...' : 'Download Resume (PDF)'}</span>
          </button>
        </div>
      </header>

      {/* Template Category Selector Ribbon */}
      <div className="no-print" style={{
        background: '#090d16',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '0.65rem 1.5rem',
        overflowX: 'auto',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', marginRight: '0.5rem' }}>
          College Courses:
        </span>
        {RESUME_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn btn-sm ${activeCategory === cat.id ? 'btn-secondary' : 'btn-outline'}`}
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
              borderRadius: '9999px',
              borderColor: activeCategory === cat.id ? currentTemplate.accentColor : 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>{cat.icon || '🎓'}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Quick Template Switcher Cards */}
      <div className="no-print" style={{
        background: '#0c111d',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.75rem 1.5rem',
        overflowX: 'auto',
        display: 'flex',
        gap: '0.75rem'
      }}>
        {filteredTemplates.map(tpl => {
          const isSelected = tpl.id === currentTemplate.id;
          return (
            <button
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              style={{
                flex: '0 0 auto',
                background: isSelected ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? `2px solid ${tpl.accentColor}` : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0.5rem 0.85rem',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: tpl.accentColor }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{tpl.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tpl.collegeCourse}
                </div>
              </div>
              {isSelected && <Check style={{ width: '14px', height: '14px', color: tpl.accentColor, marginLeft: '0.25rem' }} />}
            </button>
          );
        })}
      </div>

      {/* Main Split Layout: Left Editor / Right Preview */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        
        {/* LEFT COLUMN: EDIT CONTROLS */}
        {(activeTab === 'editor' || window.innerWidth > 1024) && (
          <aside className="no-print" style={{
            width: activeTab === 'editor' && window.innerWidth <= 1024 ? '100%' : '440px',
            background: '#0d1322',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}>
            
            {/* Section Selector Sub-tabs */}
            <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#090d16' }}>
              {[
                { id: 'styling', label: 'Theme & Colors 🎨', icon: Palette },
                { id: 'personal', label: 'Personal', icon: User },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'skills', label: 'Skills & Tools', icon: Sparkles },
                { id: 'certifications', label: 'Honors', icon: Award }
              ].map(sec => {
                const Icon = sec.icon;
                const isCurrent = editorSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setEditorSection(sec.id)}
                    style={{
                      flex: '1 0 auto',
                      padding: '0.75rem 0.9rem',
                      background: isCurrent ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: 'none',
                      borderBottom: isCurrent ? `2px solid ${currentTemplate.accentColor}` : '2px solid transparent',
                      color: isCurrent ? '#fff' : '#94a3b8',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon style={{ width: '13px', height: '13px', color: isCurrent ? currentTemplate.accentColor : '#64748b' }} />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Fields Container */}
            <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto' }}>

              {/* Dedicated Ad Section for Resume Builder */}
              <AdBanner slot="resume-builder" format="horizontal" style={{ margin: '0 0 1.25rem 0' }} />

              {/* SECTION: THEME, COLORS & PHOTO CUSTOMIZER BOX */}
              {editorSection === 'styling' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Palette style={{ width: '16px', height: '16px', color: currentTemplate.accentColor }} />
                      <span>Theme, Colors &amp; Box Styling Studio</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setResumeData(prev => ({
                        ...prev,
                        customColors: {
                          headingColor: '',
                          textColor: '',
                          subtextColor: '',
                          cardBgColor: '',
                          cardBorderColor: '',
                          accentColor: ''
                        }
                      }))}
                      className="btn btn-outline btn-xs"
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    >
                      Reset Defaults
                    </button>
                  </div>

                  {/* Photo Sizing, Alignment & Shape Box */}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Camera style={{ width: '14px', height: '14px', color: currentTemplate.accentColor }} />
                      <span>Candidate Photo Sizing &amp; Alignment</span>
                    </h4>

                    {/* Size Slider */}
                    <div style={{ marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                        <span>Photo Size</span>
                        <strong style={{ color: '#fff' }}>{resumeData.photoSize || 105}px</strong>
                      </div>
                      <input 
                        type="range" 
                        min="65" 
                        max="160" 
                        value={resumeData.photoSize || 105}
                        onChange={(e) => setResumeData(prev => ({ ...prev, photoSize: Number(e.target.value) }))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: currentTemplate.accentColor }}
                      />
                    </div>

                    {/* Alignment Options */}
                    <div style={{ marginBottom: '0.85rem' }}>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Photo Alignment Position</div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {[
                          { id: 'left', label: 'Left', icon: AlignLeft },
                          { id: 'center', label: 'Center', icon: AlignCenter },
                          { id: 'right', label: 'Right', icon: AlignRight }
                        ].map(al => (
                          <button
                            key={al.id}
                            type="button"
                            onClick={() => setResumeData(prev => ({ ...prev, photoAlign: al.id }))}
                            className={`btn btn-xs ${resumeData.photoAlign === al.id ? 'btn-primary' : 'btn-outline'}`}
                            style={{ flex: 1, padding: '0.35rem 0.5rem', fontSize: '0.74rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                          >
                            <al.icon style={{ width: '12px', height: '12px' }} />
                            <span>{al.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Shape Options */}
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Photo Shape</div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {[
                          { id: 'rounded', label: 'Rounded' },
                          { id: 'circle', label: 'Circular' },
                          { id: 'square', label: 'Square' }
                        ].map(sh => (
                          <button
                            key={sh.id}
                            type="button"
                            onClick={() => setResumeData(prev => ({ ...prev, photoShape: sh.id }))}
                            className={`btn btn-xs ${resumeData.photoShape === sh.id ? 'btn-primary' : 'btn-outline'}`}
                            style={{ flex: 1, padding: '0.35rem 0.5rem', fontSize: '0.74rem' }}
                          >
                            {sh.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* One-Click Quick Color Palettes */}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                      One-Click Color Presets
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem' }}>
                      {[
                        { name: 'Emerald Pro', accent: '#10b981', heading: '#065f46', text: '#0f172a', card: '#f0fdf4', border: '#bbf7d0' },
                        { name: 'Sapphire Tech', accent: '#2563eb', heading: '#1e3a8a', text: '#0f172a', card: '#eff6ff', border: '#bfdbfe' },
                        { name: 'Obsidian Gold', accent: '#d97706', heading: '#78350f', text: '#1e293b', card: '#fefce8', border: '#fef08a' },
                        { name: 'Executive Navy', accent: '#334155', heading: '#0f172a', text: '#334155', card: '#f8fafc', border: '#cbd5e1' },
                        { name: 'Crimson Luxe', accent: '#e11d48', heading: '#881337', text: '#0f172a', card: '#fff1f2', border: '#fecdd3' },
                        { name: 'Violet Future', accent: '#8b5cf6', heading: '#4c1d95', text: '#0f172a', card: '#f5f3ff', border: '#ddd6fe' }
                      ].map(pal => (
                        <button
                          key={pal.name}
                          type="button"
                          onClick={() => setResumeData(prev => ({
                            ...prev,
                            customColors: {
                              accentColor: pal.accent,
                              headingColor: pal.heading,
                              textColor: pal.text,
                              cardBgColor: pal.card,
                              cardBorderColor: pal.border
                            }
                          }))}
                          className="btn btn-outline btn-xs"
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.4rem 0.35rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            borderColor: 'rgba(255,255,255,0.15)',
                            background: 'rgba(0,0,0,0.2)'
                          }}
                        >
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: pal.accent, flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pal.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual Color Pickers Box */}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', margin: 0 }}>
                      Field Colors &amp; Box Backgrounds
                    </h4>

                    {/* Heading Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Heading Text Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Section headers, candidate name</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={resumeData.customColors?.headingColor || currentTemplate.accentColor}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), headingColor: e.target.value } }))}
                          style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={resumeData.customColors?.headingColor || ''}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), headingColor: e.target.value } }))}
                          placeholder="#0f172a"
                          style={{ width: '75px', padding: '0.2rem 0.4rem', fontSize: '0.74rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* Body Text Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Body Text Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Summary, bullets, role descriptions</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={resumeData.customColors?.textColor || '#0f172a'}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), textColor: e.target.value } }))}
                          style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={resumeData.customColors?.textColor || ''}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), textColor: e.target.value } }))}
                          placeholder="#0f172a"
                          style={{ width: '75px', padding: '0.2rem 0.4rem', fontSize: '0.74rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* Subtitle / Meta Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Subtitle / Meta Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dates, company &amp; institutions</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={resumeData.customColors?.subtextColor || '#64748b'}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), subtextColor: e.target.value } }))}
                          style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={resumeData.customColors?.subtextColor || ''}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), subtextColor: e.target.value } }))}
                          placeholder="#64748b"
                          style={{ width: '75px', padding: '0.2rem 0.4rem', fontSize: '0.74rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* Box / Card Background Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Card / Box Background</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Skills boxes, sidebars &amp; panels</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={resumeData.customColors?.cardBgColor || '#f8fafc'}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), cardBgColor: e.target.value } }))}
                          style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={resumeData.customColors?.cardBgColor || ''}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), cardBgColor: e.target.value } }))}
                          placeholder="#f8fafc"
                          style={{ width: '75px', padding: '0.2rem 0.4rem', fontSize: '0.74rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* Card Border Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Card Border Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dividers, card outlines &amp; seals</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={resumeData.customColors?.cardBorderColor || '#e2e8f0'}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), cardBorderColor: e.target.value } }))}
                          style={{ width: '30px', height: '30px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={resumeData.customColors?.cardBorderColor || ''}
                          onChange={(e) => setResumeData(prev => ({ ...prev, customColors: { ...(prev.customColors || {}), cardBorderColor: e.target.value } }))}
                          placeholder="#e2e8f0"
                          style={{ width: '75px', padding: '0.2rem 0.4rem', fontSize: '0.74rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              )}
              
              {/* SECTION: PERSONAL DETAILS */}
              {editorSection === 'personal' && (
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#fff' }}>
                    Candidate Identity &amp; Contact
                  </h3>

                  {/* Candidate Photo Uploader Card */}
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                        <Camera style={{ width: '14px', height: '14px', color: currentTemplate.accentColor }} />
                        <span>Candidate Photo (Top-Right Corner)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: resumeData.showPhoto !== false ? '#34d399' : '#94a3b8', cursor: 'pointer' }}>
                        <input 
                          type="checkbox"
                          checked={resumeData.showPhoto !== false}
                          onChange={(e) => setResumeData({ ...resumeData, showPhoto: e.target.checked })}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>Show on Resume</span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '65px',
                        height: '75px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: `2px solid ${currentTemplate.accentColor}`,
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {resumeData.photoUrl ? (
                          <img 
                            src={resumeData.photoUrl} 
                            alt="Candidate Portrait" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <User style={{ width: '28px', height: '28px', color: '#64748b' }} />
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="btn btn-sm btn-outline"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderColor: currentTemplate.accentColor, color: '#fff' }}
                          >
                            <Upload style={{ width: '13px', height: '13px', color: currentTemplate.accentColor }} />
                            <span>Upload Image</span>
                          </button>

                          {resumeData.photoUrl && (
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="btn btn-sm btn-outline"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                            >
                              <Trash2 style={{ width: '13px', height: '13px' }} />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          placeholder="Or paste image URL (https://...)"
                          value={resumeData.photoUrl || ''}
                          onChange={(e) => setResumeData({ ...resumeData, photoUrl: e.target.value, showPhoto: true })}
                          className="form-input"
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                        />
                      </div>
                    </div>

                    {/* Resizing & Alignment Controls inside Personal Tab */}
                    <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                        <span>Photo Size: <strong style={{ color: '#fff' }}>{resumeData.photoSize || 105}px</strong></span>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          {['left', 'center', 'right'].map(al => (
                            <button
                              key={al}
                              type="button"
                              onClick={() => setResumeData(prev => ({ ...prev, photoAlign: al }))}
                              className={`btn btn-xs ${resumeData.photoAlign === al ? 'btn-primary' : 'btn-outline'}`}
                              style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem', textTransform: 'capitalize' }}
                            >
                              {al}
                            </button>
                          ))}
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="65" 
                        max="160" 
                        value={resumeData.photoSize || 105}
                        onChange={(e) => setResumeData(prev => ({ ...prev, photoSize: Number(e.target.value) }))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: currentTemplate.accentColor }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      value={resumeData.fullName || ''}
                      onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Role / Headline</label>
                    <input 
                      type="text" 
                      value={resumeData.headline || ''}
                      onChange={(e) => setResumeData({ ...resumeData, headline: e.target.value })}
                      className="form-input" 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        value={resumeData.email || ''}
                        onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input 
                        type="text" 
                        value={resumeData.phone || ''}
                        onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input 
                        type="text" 
                        value={resumeData.location || ''}
                        onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Live Portfolio Slug</label>
                      <input 
                        type="text" 
                        value={resumeData.portfolioSlug || ''}
                        onChange={(e) => setResumeData({ ...resumeData, portfolioSlug: e.target.value })}
                        className="form-input" 
                        placeholder="e.g. alex-portfolio"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">LinkedIn URL</label>
                      <input 
                        type="url" 
                        value={resumeData.linkedin || ''}
                        onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GitHub / Portfolio URL</label>
                      <input 
                        type="url" 
                        value={resumeData.github || resumeData.website || ''}
                        onChange={(e) => setResumeData({ ...resumeData, github: e.target.value, website: e.target.value })}
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Professional Summary &amp; ATS Keywords</label>
                    <textarea 
                      value={resumeData.summary || ''}
                      onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      className="form-textarea" 
                      rows={5}
                    />
                  </div>
                </div>
              )}

              {/* SECTION: EDUCATION */}
              {editorSection === 'education' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Education &amp; Coursework</h3>
                    <button onClick={handleAddEducation} className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.75rem' }}>
                      <Plus style={{ width: '13px', height: '13px' }} /> Add Degree
                    </button>
                  </div>

                  {resumeData.education?.map((edu, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: currentTemplate.accentColor, fontWeight: 700 }}>Degree #{idx + 1}</span>
                        <button onClick={() => handleRemoveEducation(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Degree Title</label>
                        <input 
                          type="text" 
                          value={edu.degree || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[idx].degree = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">University / College</label>
                        <input 
                          type="text" 
                          value={edu.institution || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[idx].institution = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div className="form-group">
                          <label className="form-label">Period / Graduation Year</label>
                          <input 
                            type="text" 
                            value={edu.period || ''}
                            onChange={(e) => {
                              const updated = [...resumeData.education];
                              updated[idx].period = e.target.value;
                              setResumeData({ ...resumeData, education: updated });
                            }}
                            className="form-input" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">GPA / CGPA / Honors</label>
                          <input 
                            type="text" 
                            value={edu.gpa || ''}
                            onChange={(e) => {
                              const updated = [...resumeData.education];
                              updated[idx].gpa = e.target.value;
                              setResumeData({ ...resumeData, education: updated });
                            }}
                            className="form-input" 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Relevant Coursework</label>
                        <textarea 
                          value={edu.coursework || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[idx].coursework = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                          className="form-textarea" 
                          rows={2}
                          placeholder="e.g. Operating Systems, Data Structures, Machine Learning"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION: EXPERIENCE */}
              {editorSection === 'experience' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Experience &amp; Internships</h3>
                    <button onClick={handleAddExperience} className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.75rem' }}>
                      <Plus style={{ width: '13px', height: '13px' }} /> Add Position
                    </button>
                  </div>

                  {resumeData.experience?.map((exp, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: currentTemplate.accentColor, fontWeight: 700 }}>Position #{idx + 1}</span>
                        <button onClick={() => handleRemoveExperience(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Role / Designation</label>
                        <input 
                          type="text" 
                          value={exp.role || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[idx].role = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Company / Lab</label>
                        <input 
                          type="text" 
                          value={exp.company || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[idx].company = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div className="form-group">
                          <label className="form-label">Period</label>
                          <input 
                            type="text" 
                            value={exp.period || ''}
                            onChange={(e) => {
                              const updated = [...resumeData.experience];
                              updated[idx].period = e.target.value;
                              setResumeData({ ...resumeData, experience: updated });
                            }}
                            className="form-input" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Location</label>
                          <input 
                            type="text" 
                            value={exp.location || ''}
                            onChange={(e) => {
                              const updated = [...resumeData.experience];
                              updated[idx].location = e.target.value;
                              setResumeData({ ...resumeData, experience: updated });
                            }}
                            className="form-input" 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Key Deliverables &amp; Metric Impact (1 per line)</label>
                        <textarea 
                          value={(exp.bullets || []).join('\n')}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[idx].bullets = e.target.value.split('\n').filter(Boolean);
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                          className="form-textarea" 
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION: PROJECTS */}
              {editorSection === 'projects' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Projects &amp; Capstones</h3>
                    <button onClick={handleAddProject} className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.75rem' }}>
                      <Plus style={{ width: '13px', height: '13px' }} /> Add Project
                    </button>
                  </div>

                  {resumeData.projects?.map((proj, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: currentTemplate.accentColor, fontWeight: 700 }}>Project #{idx + 1}</span>
                        <button onClick={() => handleRemoveProject(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Project Title</label>
                        <input 
                          type="text" 
                          value={proj.title || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.projects];
                            updated[idx].title = e.target.value;
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Tech Stack (comma separated)</label>
                        <input 
                          type="text" 
                          value={(proj.techStack || []).join(', ')}
                          onChange={(e) => {
                            const updated = [...resumeData.projects];
                            updated[idx].techStack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Live Link / Repo URL</label>
                        <input 
                          type="url" 
                          value={proj.link || ''}
                          onChange={(e) => {
                            const updated = [...resumeData.projects];
                            updated[idx].link = e.target.value;
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Key Highlights (1 per line)</label>
                        <textarea 
                          value={(proj.bullets || []).join('\n')}
                          onChange={(e) => {
                            const updated = [...resumeData.projects];
                            updated[idx].bullets = e.target.value.split('\n').filter(Boolean);
                            setResumeData({ ...resumeData, projects: updated });
                          }}
                          className="form-textarea" 
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION: SKILLS */}
              {editorSection === 'skills' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                        Technical &amp; Functional Skills
                      </h3>
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                        Optional section &bull; Editable headings
                      </span>
                    </div>

                    {/* Toggle: Include or Exclude skills section */}
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: resumeData.showSkills !== false ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${resumeData.showSkills !== false ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                      padding: '0.3rem 0.65rem',
                      borderRadius: '20px',
                      color: resumeData.showSkills !== false ? '#34d399' : '#94a3b8'
                    }}>
                      <input 
                        type="checkbox"
                        checked={resumeData.showSkills !== false}
                        onChange={(e) => setResumeData({ ...resumeData, showSkills: e.target.checked })}
                        style={{ cursor: 'pointer' }}
                      />
                      <span>{resumeData.showSkills !== false ? 'Included' : 'Hidden'}</span>
                    </label>
                  </div>

                  {resumeData.showSkills === false ? (
                    <div style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px dashed rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '1.75rem',
                      textAlign: 'center',
                      margin: '1rem 0'
                    }}>
                      <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>🛠️</div>
                      <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                        Skills Section is Hidden
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', maxWidth: '320px', margin: '0 auto 1.25rem' }}>
                        This section is not required. If you want to include technical and functional skills, you can enable it below anytime.
                      </p>
                      <button
                        type="button"
                        onClick={() => setResumeData({ ...resumeData, showSkills: true })}
                        className="btn btn-primary btn-sm"
                        style={{ background: currentTemplate.accentColor, borderColor: currentTemplate.accentColor, fontWeight: 700 }}
                      >
                        <Plus style={{ width: '13px', height: '13px' }} />
                        <span>Add Technical &amp; Functional Skills</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Editable Section Heading */}
                      <div className="form-group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '0.85rem', marginBottom: '1.25rem' }}>
                        <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Section Heading (Editable)</span>
                          <span style={{ fontSize: '0.72rem', color: currentTemplate.accentColor }}>Appears on Resume</span>
                        </label>
                        <input 
                          type="text"
                          value={resumeData.skillsHeading || 'Technical & Functional Skills'}
                          onChange={(e) => setResumeData({ ...resumeData, skillsHeading: e.target.value })}
                          className="form-input"
                          placeholder="e.g. Technical & Functional Skills"
                        />
                        
                        {/* Preset Quick Selection Buttons */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                          {[
                            'Technical & Functional Skills',
                            'Technical Skills',
                            'Functional Skills',
                            'Core Competencies',
                            'Domain Skills & Tools'
                          ].map(preset => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setResumeData({ ...resumeData, skillsHeading: preset })}
                              style={{
                                background: (resumeData.skillsHeading || 'Technical & Functional Skills') === preset ? currentTemplate.accentColor + '30' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${(resumeData.skillsHeading || 'Technical & Functional Skills') === preset ? currentTemplate.accentColor : 'rgba(255,255,255,0.1)'}`,
                                color: (resumeData.skillsHeading || 'Technical & Functional Skills') === preset ? '#fff' : '#94a3b8',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                cursor: 'pointer'
                              }}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Category Management Bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Skill Categories
                        </span>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button
                            type="button"
                            onClick={() => handleAddSkillCategory('Technical Skills')}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                            title="Add Technical Skills category"
                          >
                            + Technical
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddSkillCategory('Functional Skills')}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                            title="Add Functional Skills category"
                          >
                            + Functional
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddSkillCategory('Category')}
                            className="btn btn-primary btn-sm"
                            style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem', background: currentTemplate.accentColor, borderColor: currentTemplate.accentColor }}
                          >
                            <Plus style={{ width: '11px', height: '11px' }} /> Add
                          </button>
                        </div>
                      </div>

                      {/* Categories List */}
                      {(!resumeData.skills || Object.keys(resumeData.skills).length === 0) ? (
                        <div style={{ textAlign: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                          <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.65rem' }}>No skill categories added yet.</p>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button
                              type="button"
                              onClick={() => handleAddSkillCategory('Technical Skills')}
                              className="btn btn-primary btn-sm"
                              style={{ background: currentTemplate.accentColor, fontSize: '0.78rem' }}
                            >
                              + Add Technical Skills
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddSkillCategory('Functional Skills')}
                              className="btn btn-outline btn-sm"
                              style={{ fontSize: '0.78rem' }}
                            >
                              + Add Functional Skills
                            </button>
                          </div>
                        </div>
                      ) : (
                        Object.entries(resumeData.skills || {}).map(([categoryKey, items], idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem', marginBottom: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, marginRight: '0.5rem' }}>
                                <label className="form-label" style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                                  Heading:
                                </label>
                                <input
                                  type="text"
                                  value={categoryKey}
                                  onChange={(e) => handleRenameSkillCategory(categoryKey, e.target.value)}
                                  className="form-input"
                                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.82rem', fontWeight: 700, color: currentTemplate.accentColor }}
                                  placeholder="e.g. Technical Skills"
                                />
                              </div>
                              <button 
                                type="button"
                                onClick={() => handleRemoveSkillCategory(categoryKey)} 
                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}
                                title="Delete this skill category"
                              >
                                <Trash2 style={{ width: '14px', height: '14px' }} />
                              </button>
                            </div>

                            <div>
                              <label className="form-label" style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                Skills (comma separated)
                              </label>
                              <input 
                                type="text" 
                                value={Array.isArray(items) ? items.join(', ') : (items || '')}
                                onChange={(e) => handleUpdateSkillItems(categoryKey, e.target.value)}
                                className="form-input" 
                                placeholder="e.g. React, Node.js, Cloud Architecture"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: CERTIFICATIONS & HONORS */}
              {editorSection === 'certifications' && (
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#fff' }}>
                    Certifications, Honors &amp; Publications
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Certifications (1 per line)</label>
                    <textarea 
                      value={(resumeData.certifications || []).join('\n')}
                      onChange={(e) => setResumeData({ ...resumeData, certifications: e.target.value.split('\n').filter(Boolean) })}
                      className="form-textarea" 
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Academic Honors &amp; Awards (1 per line)</label>
                    <textarea 
                      value={(resumeData.honors || []).join('\n')}
                      onChange={(e) => setResumeData({ ...resumeData, honors: e.target.value.split('\n').filter(Boolean) })}
                      className="form-textarea" 
                      rows={4}
                    />
                  </div>
                </div>
              )}

            </div>
          </aside>
        )}

        {/* RIGHT COLUMN: REAL-TIME A4 PREVIEW */}
        <main style={{
          flex: 1,
          background: '#040711',
          overflowX: 'auto',
          overflowY: 'auto',
          maxWidth: '100vw',
          padding: '1.5rem 0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          boxSizing: 'border-box'
        }}>
          
          {/* Printable A4 Resume Canvas */}
          <div 
            ref={printRef}
            id="printable-resume-paper"
            className={`printable-resume-paper ${currentTemplate.styleClass}`}
            style={{
              width: '100%',
              maxWidth: '794px',
              minHeight: '1123px',
              maxHeight: '1123px',
              background: '#ffffff',
              color: '#0f172a',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(0, 0, 0, 0.08)',
              borderRadius: '4px',
              position: 'relative',
              padding: '1.25rem 1.6rem',
              fontFamily: currentTemplate.layout === 'classic-editorial' ? 'var(--font-serif)' : 'var(--font-sans)',
              lineHeight: 1.35,
              fontSize: '0.84rem',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >

            {/* Top Academic Ribbon */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '140px',
              height: '3.5px',
              background: activeAccent
            }} />

            {/* LAYOUT A: SIDEBAR-LEFT */}
            {currentTemplate.layout === 'sidebar-left' ? (
              <div className="resume-split-row" style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch' }}>
                {/* Left Column / Sidebar (30% width) */}
                <aside style={{
                  width: '30%',
                  flexShrink: 0,
                  background: cardBgColor,
                  borderRight: `1.5px solid ${cardBorderColor}`,
                  margin: '-1.25rem 0 -1.25rem -1.6rem',
                  padding: '1.25rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: photoAlign === 'right' ? 'flex-end' : (photoAlign === 'center' ? 'center' : 'flex-start'), gap: '0.45rem' }}>
                    {renderCandidatePhoto()}
                    {renderCornerBadge()}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: headingColor, borderBottom: `1.5px solid ${cardBorderColor}`, paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>
                      Contact &amp; Profiles
                    </h4>
                    {renderContactDetails(true)}
                  </div>
                  {renderSkillsSection(true)}
                  {renderCertificationsSection(true)}
                </aside>

                {/* Right Column / Main Content (70% width) */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ borderBottom: `1.5px solid ${cardBorderColor}`, paddingBottom: '0.55rem', marginBottom: '0.65rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: headingColor, lineHeight: 1.1, marginBottom: '0.15rem' }}>
                      {resumeData.fullName}
                    </h1>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: activeAccent }}>
                      {resumeData.headline}
                    </div>
                  </div>
                  {renderSummarySection()}
                  {renderExperienceSection()}
                  {renderProjectsSection()}
                  {renderEducationSection()}
                  {renderVerificationFooter()}
                </div>
              </div>
            ) :

            /* LAYOUT B: SIDEBAR-RIGHT */
            currentTemplate.layout === 'sidebar-right' ? (
              <div className="resume-split-row" style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch' }}>
                {/* Left Column / Main Content (70% width) */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ borderBottom: `1.5px solid ${cardBorderColor}`, paddingBottom: '0.55rem', marginBottom: '0.65rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: headingColor, lineHeight: 1.1, marginBottom: '0.15rem' }}>
                      {resumeData.fullName}
                    </h1>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: activeAccent }}>
                      {resumeData.headline}
                    </div>
                  </div>
                  {renderSummarySection()}
                  {renderExperienceSection()}
                  {renderProjectsSection()}
                  {renderVerificationFooter()}
                </div>

                {/* Right Column / Sidebar (30% width) */}
                <aside style={{
                  width: '30%',
                  flexShrink: 0,
                  background: cardBgColor,
                  borderLeft: `1.5px solid ${cardBorderColor}`,
                  margin: '-1.25rem -1.6rem -1.25rem 0',
                  padding: '1.25rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: photoAlign === 'left' ? 'flex-start' : (photoAlign === 'center' ? 'center' : 'flex-end'), gap: '0.45rem' }}>
                    {renderCandidatePhoto()}
                    {renderCornerBadge()}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: headingColor, borderBottom: `1.5px solid ${cardBorderColor}`, paddingBottom: '0.2rem', marginBottom: '0.35rem' }}>
                      Contact &amp; Profiles
                    </h4>
                    {renderContactDetails(true)}
                  </div>
                  {renderEducationSection()}
                  {renderSkillsSection(true)}
                  {renderCertificationsSection(true)}
                </aside>
              </div>
            ) :

            /* LAYOUT C: MINIMAL-CENTERED */
            currentTemplate.layout === 'minimal-centered' ? (
              <div>
                <div style={{ textAlign: 'center', borderBottom: `1.5px solid ${activeAccent}30`, paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.45rem' }}>
                    {renderCandidatePhoto()}
                  </div>
                  <div style={{ marginBottom: '0.25rem' }}>
                    {renderCornerBadge()}
                  </div>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: headingColor, lineHeight: 1.15, marginBottom: '0.2rem' }}>
                    {resumeData.fullName}
                  </h1>
                  <div style={{ fontSize: '0.92rem', fontStyle: 'italic', fontWeight: 600, color: activeAccent, marginBottom: '0.45rem' }}>
                    {resumeData.headline}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {renderContactDetails(false)}
                  </div>
                </div>
                {renderSummarySection()}
                {renderExperienceSection()}
                {renderProjectsSection()}
                {renderEducationSection()}
                {renderSkillsSection(false)}
                {renderCertificationsSection(false)}
                {renderVerificationFooter()}
              </div>
            ) :

            /* LAYOUT D: TWO-COLUMN-SPLIT / EXECUTIVE-SPLIT / CLINICAL-TWO-COL */
            (currentTemplate.layout === 'two-column-split' || currentTemplate.layout === 'executive-split' || currentTemplate.layout === 'clinical-two-col') ? (
              <div>
                <div style={{
                  borderBottom: `1.5px solid ${activeAccent}30`,
                  paddingBottom: '0.65rem',
                  marginBottom: '0.65rem',
                  display: 'flex',
                  flexDirection: photoAlign === 'center' ? 'column' : (photoAlign === 'left' ? 'row-reverse' : 'row'),
                  justifyContent: 'space-between',
                  alignItems: photoAlign === 'center' ? 'center' : 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1, minWidth: 0, textAlign: photoAlign === 'center' ? 'center' : 'left' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: headingColor, lineHeight: 1.1, marginBottom: '0.15rem' }}>
                      {resumeData.fullName}
                    </h1>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: activeAccent, marginBottom: '0.35rem' }}>
                      {resumeData.headline}
                    </div>
                    <div style={{ display: 'flex', justifyContent: photoAlign === 'center' ? 'center' : 'flex-start' }}>
                      {renderContactDetails(false)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    {renderCandidatePhoto()}
                    {renderCornerBadge()}
                  </div>
                </div>

                <div className="resume-grid-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
                  <div>
                    {renderSummarySection()}
                    {renderExperienceSection()}
                  </div>
                  <div>
                    {renderEducationSection()}
                    {renderProjectsSection()}
                    {renderSkillsSection(false)}
                    {renderCertificationsSection(false)}
                  </div>
                </div>
                {renderVerificationFooter()}
              </div>
            ) :

            /* LAYOUT E: BENTO-GRID / AGRI-BENTO / CLASSIC-GRID */
            (currentTemplate.layout === 'bento-grid' || currentTemplate.layout === 'agri-bento' || currentTemplate.layout === 'classic-grid') ? (
              <div>
                <div style={{
                  background: cardBgColor,
                  border: `1px solid ${cardBorderColor}`,
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  marginBottom: '0.65rem',
                  display: 'flex',
                  flexDirection: photoAlign === 'center' ? 'column' : (photoAlign === 'left' ? 'row-reverse' : 'row'),
                  justifyContent: 'space-between',
                  alignItems: photoAlign === 'center' ? 'center' : 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1, minWidth: 0, textAlign: photoAlign === 'center' ? 'center' : 'left' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: headingColor, lineHeight: 1.1, marginBottom: '0.15rem' }}>
                      {resumeData.fullName}
                    </h1>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: activeAccent, marginBottom: '0.35rem' }}>
                      {resumeData.headline}
                    </div>
                    <div style={{ display: 'flex', justifyContent: photoAlign === 'center' ? 'center' : 'flex-start' }}>
                      {renderContactDetails(false)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    {renderCandidatePhoto()}
                    {renderCornerBadge()}
                  </div>
                </div>

                {renderSummarySection()}
                <div className="resume-grid-two-col" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.15rem', marginBottom: '0.5rem' }}>
                  <div>
                    {renderExperienceSection()}
                    {renderProjectsSection()}
                  </div>
                  <div>
                    {renderEducationSection()}
                    {renderSkillsSection(false)}
                    {renderCertificationsSection(false)}
                  </div>
                </div>
                {renderVerificationFooter()}
              </div>
            ) :

            /* LAYOUT F: TIMELINE-EDITORIAL / EDITORIAL-WARM / CLASSIC-EDITORIAL */
            (currentTemplate.layout === 'timeline-editorial' || currentTemplate.layout === 'editorial-warm' || currentTemplate.layout === 'classic-editorial') ? (
              <div>
                <div style={{
                  borderBottom: `2px solid ${activeAccent}`,
                  paddingBottom: '0.65rem',
                  marginBottom: '0.65rem',
                  display: 'flex',
                  flexDirection: photoAlign === 'center' ? 'column' : (photoAlign === 'left' ? 'row-reverse' : 'row'),
                  justifyContent: 'space-between',
                  alignItems: photoAlign === 'center' ? 'center' : 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1, minWidth: 0, textAlign: photoAlign === 'center' ? 'center' : 'left' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: headingColor, lineHeight: 1.1, marginBottom: '0.15rem' }}>
                      {resumeData.fullName}
                    </h1>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: activeAccent, marginBottom: '0.35rem' }}>
                      {resumeData.headline}
                    </div>
                    <div style={{ display: 'flex', justifyContent: photoAlign === 'center' ? 'center' : 'flex-start' }}>
                      {renderContactDetails(false)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    {renderCandidatePhoto()}
                    {renderCornerBadge()}
                  </div>
                </div>
                {renderSummarySection()}
                <div style={{ borderLeft: `2px solid ${activeAccent}40`, paddingLeft: '0.85rem', marginBottom: '0.6rem' }}>
                  {renderExperienceSection()}
                  {renderEducationSection()}
                </div>
                {renderProjectsSection()}
                {renderSkillsSection(false)}
                {renderCertificationsSection(false)}
                {renderVerificationFooter()}
              </div>
            ) :

            /* LAYOUT G: STANDARD / METRICS-COMPACT / ASYMMETRIC / DEFAULT */
            (
              <div>
                <div style={{
                  borderBottom: `1.5px solid ${activeAccent}30`,
                  paddingBottom: '0.65rem',
                  marginBottom: '0.65rem',
                  display: 'flex',
                  flexDirection: photoAlign === 'center' ? 'column' : (photoAlign === 'left' ? 'row-reverse' : 'row'),
                  justifyContent: 'space-between',
                  alignItems: photoAlign === 'center' ? 'center' : 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1, minWidth: 0, textAlign: photoAlign === 'center' ? 'center' : 'left' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: headingColor, lineHeight: 1.1, marginBottom: '0.15rem' }}>
                      {resumeData.fullName}
                    </h1>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: activeAccent, marginBottom: '0.35rem' }}>
                      {resumeData.headline}
                    </div>
                    <div style={{ display: 'flex', justifyContent: photoAlign === 'center' ? 'center' : 'flex-start' }}>
                      {renderContactDetails(false)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    {renderCandidatePhoto()}
                    {renderCornerBadge()}
                  </div>
                </div>
                {renderSummarySection()}
                {renderEducationSection()}
                {renderExperienceSection()}
                {renderProjectsSection()}
                {renderSkillsSection(false)}
                {renderCertificationsSection(false)}
                {renderVerificationFooter()}
              </div>
            )}
          </div>
        </main>

      </div>

      {/* ============================================================
          EXPLORE ALL COURSE TEMPLATES MODAL WITH CATEGORIES & PREVIEW
          ============================================================ */}
      {isExploreModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(5, 8, 14, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '1080px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            borderRadius: '24px',
            position: 'relative',
            background: '#0d1322',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setIsExploreModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-signature" style={{ marginBottom: '0.65rem' }}>
                🎓 Specialized College Disciplines
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                Explore College Course Resume Templates
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Every discipline features tailored boxes, course emojis, credential seals, and industry-standard coursework.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {RESUME_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setModalCategory(cat.id)}
                  className={`btn btn-sm ${modalCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    padding: '0.35rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>{cat.icon || '🎓'}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Grid of Course Templates */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
              {RESUME_TEMPLATES.filter(t => modalCategory === 'all' || t.category === modalCategory).map(tpl => (
                <div 
                  key={tpl.id}
                  className="interactive-hover-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1.5px solid ${currentTemplate.id === tpl.id ? tpl.accentColor : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: tpl.accentColor }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: tpl.accentColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {tpl.cornerBadge || 'VERIFIED'}
                    </span>
                    <span style={{ fontSize: '1.1rem' }}>
                      {(tpl.emojis || ['🎓'])[0]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
                    {tpl.name}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: tpl.accentColor, fontWeight: 600, marginBottom: '0.75rem' }}>
                    {tpl.collegeCourse}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                    {tpl.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button 
                      onClick={() => setPreviewingTemplate(tpl)}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <Eye style={{ width: '14px', height: '14px' }} />
                      <span>Live Preview</span>
                    </button>
                    <button 
                      onClick={() => {
                        handleSelectTemplate(tpl);
                        setIsExploreModalOpen(false);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, background: tpl.accentColor, border: 'none', fontWeight: 700 }}
                    >
                      <span>Use Template</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ============================================================
          LIVE RESUME TEMPLATE PREVIEW MODAL
          ============================================================ */}
      {previewingTemplate && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(5, 8, 14, 0.92)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          {/* Modal Header Bar */}
          <div style={{
            maxWidth: '880px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            background: '#0d1322',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>
                {previewingTemplate.name}
              </h3>
              <p style={{ color: previewingTemplate.accentColor, fontSize: '0.85rem', fontWeight: 600 }}>
                {previewingTemplate.collegeCourse}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                onClick={() => {
                  handleSelectTemplate(previewingTemplate);
                  setPreviewingTemplate(null);
                  setIsExploreModalOpen(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ background: previewingTemplate.accentColor, border: 'none', fontWeight: 700 }}
              >
                Use This Template &rarr;
              </button>
              <button 
                onClick={() => setPreviewingTemplate(null)}
                className="btn btn-outline btn-sm"
              >
                Close Preview
              </button>
            </div>
          </div>

          {/* Full High-Res Preview Canvas */}
          <div style={{
            maxWidth: '850px',
            width: '100%',
            background: '#ffffff',
            color: '#0f172a',
            padding: '2.5rem',
            borderRadius: '8px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
            marginBottom: '3rem',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: previewingTemplate.accentColor }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `2px solid ${previewingTemplate.accentColor}30`, paddingBottom: '1.25rem', marginBottom: '1.25rem', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  {previewingTemplate.sampleData.fullName}
                </h1>
                <div style={{ color: previewingTemplate.accentColor, fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {previewingTemplate.sampleData.headline}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>✉ {previewingTemplate.sampleData.email}</span>
                  <span>☎ {previewingTemplate.sampleData.phone}</span>
                  <span>📍 {previewingTemplate.sampleData.location}</span>
                </div>
              </div>

              {/* Top-Right Photo Section & Seal */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '95px',
                  height: '115px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `2px solid ${previewingTemplate.accentColor}`,
                  background: '#f1f5f9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {previewingTemplate.sampleData.photoUrl ? (
                    <img 
                      src={previewingTemplate.sampleData.photoUrl} 
                      alt={previewingTemplate.sampleData.fullName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `${previewingTemplate.accentColor}12` }}>
                      <User style={{ width: '30px', height: '30px', color: previewingTemplate.accentColor }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', marginTop: '0.2rem' }}>Photo Slot</span>
                    </div>
                  )}
                </div>
                <div style={{
                  border: `1.5px solid ${previewingTemplate.accentColor}`,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: previewingTemplate.accentColor,
                  marginTop: '0.35rem',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {previewingTemplate.cornerBadge || 'VERIFIED // FOLIOVERSE'}
                </div>
              </div>
            </div>

            {/* Preview Summary */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: previewingTemplate.accentColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                {(previewingTemplate.emojis || ['🎯'])[0]} Professional Profile
              </h4>
              <p style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {previewingTemplate.sampleData.summary}
              </p>
            </div>

            {/* Preview Education */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: previewingTemplate.accentColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                {(previewingTemplate.emojis || ['🎓'])[1] || '🎓'} Education &amp; Coursework
              </h4>
              {previewingTemplate.sampleData.education?.map((ed, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.94rem' }}>
                    <span>{ed.degree}</span>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{ed.period}</span>
                  </div>
                  <div style={{ color: '#334155', fontSize: '0.86rem' }}>{ed.institution} &bull; <strong style={{ color: previewingTemplate.accentColor }}>{ed.gpa}</strong></div>
                  {ed.coursework && <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>Coursework: {ed.coursework}</div>}
                </div>
              ))}
            </div>

            {/* Preview Projects in Box Format */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: previewingTemplate.accentColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.65rem' }}>
                {(previewingTemplate.emojis || ['🚀'])[2] || '🚀'} Key Capstones &amp; Projects
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {previewingTemplate.sampleData.projects?.map((pr, i) => (
                  <div key={i} style={{ background: previewingTemplate.accentColor + '08', border: `1px solid ${previewingTemplate.accentColor}30`, borderRadius: '6px', padding: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                      <span>{pr.title}</span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                        {(Array.isArray(pr.techStack) ? pr.techStack : [pr.techStack]).join(', ')}
                      </span>
                    </div>
                    <ul style={{ paddingLeft: '1.2rem', color: '#334155', fontSize: '0.84rem', margin: 0 }}>
                      {pr.bullets?.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Skills */}
            {previewingTemplate.sampleData?.showSkills !== false && (
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: previewingTemplate.accentColor, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                  {(previewingTemplate.emojis || ['🛠️'])[3] || '🛠️'} {previewingTemplate.sampleData?.skillsHeading || 'Discipline Skills Matrix'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', fontSize: '0.84rem' }}>
                  {Object.entries(previewingTemplate.sampleData.skills || {}).map(([k, v]) => (
                    <div key={k} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      <strong style={{ color: '#0f172a', textTransform: 'capitalize', display: 'block', marginBottom: '0.2rem' }}>{k.replace(/([A-Z])/g, ' $1')}:</strong>
                      <span style={{ color: '#475569' }}>{Array.isArray(v) ? v.join(', ') : v}</span>
                    </div>
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
