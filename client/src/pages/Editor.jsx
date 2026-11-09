import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TEMPLATES, getTemplateById } from '../data/templatesData';
import TemplateRenderer from '../components/templates/TemplateRenderer';
import SatisfactionModal from '../components/modals/SatisfactionModal';
import confetti from 'canvas-confetti';
import { downloadPortfolioAsHtml } from '../utils/portfolioExporter';
import AdBanner from '../components/common/AdBanner';
import TemplateThumbnail from '../components/common/TemplateThumbnail';
import { 
  ArrowLeft, 
  Save, 
  Globe, 
  Eye, 
  Layers, 
  User, 
  Palette, 
  Code, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Share2, 
  Plus, 
  Trash2, 
  Upload, 
  Download,
  ExternalLink, 
  Check, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Crown, 
  RotateCcw,
  Copy,
  Type
} from 'lucide-react';
import { 
  FONT_OPTIONS, 
  FONT_WEIGHTS, 
  FONT_STYLES, 
  TEXT_TRANSFORMS, 
  TYPOGRAPHY_PRESETS, 
  CUSTOMIZABLE_TEXT_FIELDS, 
  resolveFontFamily, 
  getFieldTextStyle,
  getLuminance,
  getContrastSafeColor
} from '../data/typographyData';

const INITIAL_PORTFOLIO_STATE = {
  title: 'My Professional Portfolio',
  slug: 'my-portfolio',
  templateId: 'open-book',
  status: 'draft',
  themeConfig: {
    accentColor: '#3b82f6',
    bookCoverTheme: 'leather',
    mode: 'dark'
  },
  profile: {
    fullName: 'Alex River',
    headline: 'Senior Full Stack & AI Systems Developer',
    bio: 'Passionate about crafting resilient web architectures, elegant user experiences, and high-performance interactive digital tools.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Bengaluru, India',
    email: 'alex@example.com',
    phone: '+91 98765 43210',
    website: 'https://example.com',
    resumeUrl: '',
    statusBadge: 'Open to Opportunities'
  },
  sections: [
    { id: 'bio', title: 'Biography', enabled: true, order: 0 },
    { id: 'skills', title: 'Skills & Stack', enabled: true, order: 1 },
    { id: 'projects', title: 'Projects', enabled: true, order: 2 },
    { id: 'experience', title: 'Experience', enabled: true, order: 3 },
    { id: 'education', title: 'Education', enabled: true, order: 4 },
    { id: 'contact', title: 'Contact', enabled: true, order: 5 }
  ],
  skills: [
    { name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
    { name: 'Node.js / Express', category: 'Backend', level: 'Expert' },
    { name: 'TypeScript', category: 'Languages', level: 'Advanced' },
    { name: 'PostgreSQL / SQLite', category: 'Database', level: 'Advanced' },
    { name: 'Tailwind / Modern CSS', category: 'Frontend', level: 'Expert' }
  ],
  projects: [
    {
      title: 'Quantum Analytics Engine',
      description: 'High-throughput event streaming analytics dashboard with real-time WebSocket telemetry and 60fps renders.',
      techStack: ['React', 'Node.js', 'Canvas'],
      liveUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/example/analytics'
    },
    {
      title: 'HyperUI Design Tokens',
      description: 'Accessible, component-driven design system with dark mode tokens and fluid animations.',
      techStack: ['TypeScript', 'CSS Modules'],
      liveUrl: 'https://example.com/hyperui',
      githubUrl: 'https://github.com/example/hyperui'
    }
  ],
  experience: [
    {
      role: 'Lead Systems Architect',
      company: 'Nexus Innovations',
      period: '2023 - Present',
      description: 'Scaled microservices to 10M+ daily events. Spearheaded frontend component modernization and reduced LCP by 45%.'
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science',
      school: 'Apex Institute of Technology',
      year: '2020 - 2024',
      grade: '8.9 CGPA',
      coursework: 'Data Structures, Distributed Systems, Cloud Architecture'
    }
  ],
  certifications: [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2024' }
  ],
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com'
  },
  seo: {
    metaTitle: 'Alex River — Professional Portfolio',
    metaDescription: 'Explore my professional portfolio, interactive projects, and work experience.'
  }
};

function InlineTypographyControl({
  title = 'Field',
  fontKey,
  colorKey,
  weightKey,
  styleKey,
  transformKey,
  themeConfig = {},
  onChange,
  defaultColor = '#ffffff'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentColor = themeConfig[colorKey] || defaultColor;
  const currentFont = themeConfig[fontKey] || 'Inter';
  const currentWeight = themeConfig[weightKey] || '600';
  const currentStyle = themeConfig[styleKey] || 'normal';
  const currentTransform = themeConfig[transformKey] || 'none';

  return (
    <div style={{ margin: '0.4rem 0 0.75rem' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: isOpen ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
          border: isOpen ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.12)',
          color: isOpen ? '#c7d2fe' : '#94a3b8',
          borderRadius: '6px',
          padding: '0.22rem 0.55rem',
          fontSize: '0.73rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        title={`Customize font family and color for ${title}`}
      >
        <span 
          style={{ 
            width: '9px', 
            height: '9px', 
            borderRadius: '50%', 
            background: currentColor, 
            display: 'inline-block', 
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: `0 0 6px ${currentColor}60`
          }} 
        />
        <Type style={{ width: '12px', height: '12px', color: currentColor }} />
        <span>Style {title} (Font &amp; Color)</span>
        <span style={{ fontSize: '0.62rem', opacity: 0.7 }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{
          marginTop: '0.4rem',
          padding: '0.75rem 0.85rem',
          background: '#070b13',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.45)'
        }}>
          {/* Row 1: Font Family & Text Color */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.55rem' }}>
            <div>
              <label style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem', fontWeight: 600 }}>
                Font Family
              </label>
              <select
                value={currentFont}
                onChange={(e) => onChange(fontKey, e.target.value)}
                className="form-select"
                style={{ fontSize: '0.76rem', padding: '0.3rem 0.45rem', background: '#0b101b' }}
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem', fontWeight: 600 }}>
                Text Color
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <input 
                  type="color" 
                  value={currentColor.startsWith('#') ? currentColor : defaultColor}
                  onChange={(e) => onChange(colorKey, e.target.value)}
                  style={{ width: '28px', height: '28px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                />
                <input 
                  type="text" 
                  value={themeConfig[colorKey] || ''}
                  onChange={(e) => onChange(colorKey, e.target.value)}
                  placeholder={defaultColor}
                  style={{ width: '100%', minWidth: '60px', padding: '0.25rem 0.35rem', fontSize: '0.74rem', background: '#0b101b', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Weight, Italic & Transform */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 110px' }}>
              <label style={{ fontSize: '0.66rem', color: '#94a3b8', display: 'block', marginBottom: '0.15rem' }}>Weight</label>
              <select
                value={currentWeight}
                onChange={(e) => onChange(weightKey, e.target.value)}
                className="form-select"
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.35rem', background: '#0b101b' }}
              >
                {FONT_WEIGHTS.map(w => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.66rem', color: '#94a3b8', display: 'block', marginBottom: '0.15rem' }}>Style</label>
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                <button
                  type="button"
                  onClick={() => onChange(styleKey, 'normal')}
                  style={{
                    padding: '0.2rem 0.45rem',
                    fontSize: '0.7rem',
                    background: currentStyle === 'normal' ? '#4f46e5' : '#1e293b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Norm
                </button>
                <button
                  type="button"
                  onClick={() => onChange(styleKey, 'italic')}
                  style={{
                    padding: '0.2rem 0.45rem',
                    fontSize: '0.7rem',
                    fontStyle: 'italic',
                    background: currentStyle === 'italic' ? '#4f46e5' : '#1e293b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Italic
                </button>
              </div>
            </div>

            {transformKey && (
              <div>
                <label style={{ fontSize: '0.66rem', color: '#94a3b8', display: 'block', marginBottom: '0.15rem' }}>Transform</label>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  <button
                    type="button"
                    onClick={() => onChange(transformKey, 'none')}
                    style={{
                      padding: '0.2rem 0.4rem',
                      fontSize: '0.7rem',
                      background: currentTransform === 'none' ? '#4f46e5' : '#1e293b',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Aa
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(transformKey, 'uppercase')}
                    style={{
                      padding: '0.2rem 0.4rem',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      background: currentTransform === 'uppercase' ? '#4f46e5' : '#1e293b',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    AA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const safeHex = (val, fallback = '#3b82f6') => {
  if (!val || typeof val !== 'string') return fallback;
  if (/^#[0-9a-fA-F]{6}$/.test(val)) return val;
  if (/^#[0-9a-fA-F]{8}$/.test(val)) return val.slice(0, 7);
  if (/^#[0-9a-fA-F]{3}$/.test(val)) return '#' + val[1] + val[1] + val[2] + val[2] + val[3] + val[3];
  return fallback;
};

export default function Editor() {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isPremium } = useAuth();

  const isNew = !id || id === 'new';
  const initialTemplateParam = searchParams.get('template') || 'open-book';

  const [portfolio, setPortfolio] = useState(() => {
    if (location.state?.customData) {
      return {
        ...INITIAL_PORTFOLIO_STATE,
        ...location.state.customData,
        templateId: initialTemplateParam || location.state.customData.templateId || 'open-book'
      };
    }
    return {
      ...INITIAL_PORTFOLIO_STATE,
      templateId: initialTemplateParam
    };
  });
  
  const [activeTab, setActiveTab] = useState('profile'); // profile, theme, projects, skills, experience, education, social, seo
  const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop, tablet, mobile
  const [mobileViewMode, setMobileViewMode] = useState('editor'); // editor, preview
  const [isMobileScreen, setIsMobileScreen] = useState(() => typeof window !== 'undefined' && window.innerWidth < 900);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved'); // 'Saved', 'Unsaved Changes', 'Saving...'
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSatisfactionModalOpen, setIsSatisfactionModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [bgUploading, setBgUploading] = useState(false);
  const [activeTypoField, setActiveTypoField] = useState('name');

  // Background Studio Custom Gradient Builder states
  const [bgTabSubMode, setBgTabSubMode] = useState('solid'); // 'solid' | 'gradient'
  const [customGrad1, setCustomGrad1] = useState('#090d16');
  const [customGrad2, setCustomGrad2] = useState('#312e81');
  const [customGradAngle, setCustomGradAngle] = useState(135);

  const currentTemplate = getTemplateById(portfolio.templateId);
  const isBookType = currentTemplate?.category === 'book' || ['open-book', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(portfolio.templateId);

  useEffect(() => {
    if (isBookType && activeTab === 'background') {
      setActiveTab('theme');
    }
  }, [isBookType, activeTab]);

  useEffect(() => {
    const handleScreenResize = () => {
      setIsMobileScreen(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleScreenResize);
    return () => window.removeEventListener('resize', handleScreenResize);
  }, []);

  // Load existing portfolio if editing
  useEffect(() => {
    if (!isNew && id) {
      loadPortfolio(id);
    }
  }, [id, isNew]);

  const loadPortfolio = async (portfolioId) => {
    try {
      setSaving(true);
      const res = await api.getPortfolio(portfolioId);
      if (res.portfolio) {
        setPortfolio(res.portfolio);
        setSaveStatus('Saved');
      }
    } catch (err) {
      console.error('Error loading portfolio:', err.message);
      navigate('/dashboard');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setSaveStatus('Unsaved Changes');
    if (section) {
      setPortfolio(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setPortfolio(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async (statusOverride = null) => {
    try {
      setSaving(true);
      setSaveStatus('Saving...');

      const payload = {
        ...portfolio,
        status: statusOverride || portfolio.status
      };

      if (isNew) {
        const res = await api.createPortfolio(payload);
        setPortfolio(res.portfolio);
        setSaveStatus('Saved');
        navigate(`/editor/${res.portfolio.id}`, { replace: true });
      } else {
        const res = await api.updatePortfolio(id, payload);
        setPortfolio(res.portfolio);
        setSaveStatus('Saved');
      }
    } catch (err) {
      alert(`Save failed: ${err.message}`);
      setSaveStatus('Save Error');
    } finally {
      setSaving(false);
    }
  };

  const [downloadSuccessModal, setDownloadSuccessModal] = useState(false);
  const [downloadedFilename, setDownloadedFilename] = useState('');

  const handleDownloadPortfolio = async () => {
    try {
      setSaving(true);
      // Auto-save changes
      await handleSave(portfolio.status);
      const filename = downloadPortfolioAsHtml(portfolio);
      setDownloadedFilename(filename);
      setDownloadSuccessModal(true);
      confetti({ particleCount: 90, spread: 70 });
    } catch (err) {
      alert(`Download notice: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    const newStatus = portfolio.status === 'published' ? 'draft' : 'published';
    await handleSave(newStatus);
    if (newStatus === 'published') {
      confetti({ particleCount: 80, spread: 60 });
      setIsSatisfactionModalOpen(true);
    }
  };

  const copyPublicUrl = () => {
    const url = `${window.location.origin}/p/${portfolio.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Image Upload handler with instant local preview + background server upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Instant local base64 display for real-time live preview without latency
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleFieldChange('profile', 'avatarUrl', event.target.result);
      }
    };
    reader.readAsDataURL(file);

    // 2. Concurrently upload to server storage
    setImageUploading(true);
    api.uploadImage(file).then(res => {
      if (res.url) {
        handleFieldChange('profile', 'avatarUrl', res.url);
      }
    }).catch(err => {
      console.warn('Image upload background save notice:', err.message);
    }).finally(() => {
      setImageUploading(false);
      e.target.value = '';
    });
  };

  // Background Image Upload handler for custom wallpaper
  const handleBgImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Instant local base64 display for real-time live preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPortfolio(prev => ({
          ...prev,
          themeConfig: {
            ...prev.themeConfig,
            bgType: 'image',
            bgImage: event.target.result
          }
        }));
        setSaveStatus('Unsaved Changes');
      }
    };
    reader.readAsDataURL(file);

    // 2. Concurrently upload to server storage
    setBgUploading(true);
    api.uploadImage(file).then(res => {
      if (res.url) {
        setPortfolio(prev => ({
          ...prev,
          themeConfig: {
            ...prev.themeConfig,
            bgType: 'image',
            bgImage: res.url
          }
        }));
      }
    }).catch(err => {
      console.warn('Background image upload notice:', err.message);
    }).finally(() => {
      setBgUploading(false);
      e.target.value = '';
    });
  };

  // Project Image Upload handler
  const handleProjectImageUpload = (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const updated = [...portfolio.projects];
        updated[idx].imageUrl = event.target.result;
        setPortfolio({ ...portfolio, projects: updated });
        setSaveStatus('Unsaved Changes');
      }
    };
    reader.readAsDataURL(file);

    api.uploadImage(file).then(res => {
      if (res.url) {
        const updated = [...portfolio.projects];
        updated[idx].imageUrl = res.url;
        setPortfolio({ ...portfolio, projects: updated });
        setSaveStatus('Unsaved Changes');
      }
    }).catch(err => {
      console.warn('Project image upload notice:', err.message);
    }).finally(() => {
      e.target.value = '';
    });
  };

  // Switch template handler (Preserves all portfolio data!)
  const handleSelectTemplate = (selectedTpl) => {
    setPortfolio(prev => ({
      ...prev,
      templateId: selectedTpl.id
    }));
    setSaveStatus('Unsaved Changes');
    setIsTemplateModalOpen(false);
  };

  // Skill Add / Remove
  const handleAddSkill = () => {
    setPortfolio(prev => ({
      ...prev,
      skills: [...(prev.skills || []), { name: 'New Skill', category: 'General', level: 'Intermediate' }]
    }));
    setSaveStatus('Unsaved Changes');
  };
  const handleRemoveSkill = (idx) => {
    setPortfolio(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx)
    }));
    setSaveStatus('Unsaved Changes');
  };

  // Project Add / Remove
  const handleAddProject = () => {
    setPortfolio(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        { title: 'New Project', description: 'Describe your accomplishments and architecture.', techStack: ['React', 'Node.js'], liveUrl: '', githubUrl: '' }
      ]
    }));
    setSaveStatus('Unsaved Changes');
  };
  const handleRemoveProject = (idx) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
    setSaveStatus('Unsaved Changes');
  };

  // Experience Add / Remove
  const handleAddExperience = () => {
    setPortfolio(prev => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        { role: 'Software Engineer', company: 'Tech Corp', period: '2023 - Present', description: 'Built core features and optimized system latency.' }
      ]
    }));
    setSaveStatus('Unsaved Changes');
  };
  const handleRemoveExperience = (idx) => {
    setPortfolio(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
    setSaveStatus('Unsaved Changes');
  };

  // Education Add / Remove
  const handleAddEducation = () => {
    setPortfolio(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        { degree: 'B.Tech in Computer Science', school: 'University Name', year: '2024', grade: '9.0 CGPA' }
      ]
    }));
    setSaveStatus('Unsaved Changes');
  };
  const handleRemoveEducation = (idx) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
    setSaveStatus('Unsaved Changes');
  };

  // Certifications Add / Remove
  const handleAddCertification = () => {
    setPortfolio(prev => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        { name: 'Certified Specialist', issuer: 'Certifying Body', date: new Date().getFullYear().toString() }
      ]
    }));
    setSaveStatus('Unsaved Changes');
  };
  const handleRemoveCertification = (idx) => {
    setPortfolio(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== idx)
    }));
    setSaveStatus('Unsaved Changes');
  };

  const GRADIENT_PRESETS = [
    { name: 'Cosmic Twilight', gradient: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #312e81 100%)', accent: '#c084fc' },
    { name: 'Deep Ocean', gradient: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #0369a1 100%)', accent: '#38bdf8' },
    { name: 'Emerald Aurora', gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #059669 100%)', accent: '#34d399' },
    { name: 'Midnight Sunset', gradient: 'linear-gradient(135deg, #18051a 0%, #3b0764 50%, #c026d3 100%)', accent: '#f97316' },
    { name: 'Cyberpunk Neon', gradient: 'linear-gradient(135deg, #030712 0%, #1e1b4b 45%, #ec4899 100%)', accent: '#00ffcc' },
    { name: 'Royal Amethyst', gradient: 'linear-gradient(135deg, #0f0728 0%, #2e1065 50%, #6b21a8 100%)', accent: '#a855f7' },
    { name: 'Obsidian Gold', gradient: 'linear-gradient(135deg, #14100c 0%, #291c0e 50%, #d97706 100%)', accent: '#f59e0b' },
    { name: 'Clean Light', gradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', accent: '#2563eb' },
    { name: 'Rose Gold', gradient: 'linear-gradient(135deg, #1c0a14 0%, #4a044e 50%, #f43f5e 100%)', accent: '#f43f5e' },
    { name: 'Titanium Frost', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #475569 100%)', accent: '#60a5fa' }
  ];

  const SOLID_PRESETS = [
    { name: 'Pitch Black', hex: '#000000', accent: '#6366f1' },
    { name: 'Dark Slate', hex: '#090d16', accent: '#818cf8' },
    { name: 'Midnight Navy', hex: '#030712', accent: '#38bdf8' },
    { name: 'Obsidian', hex: '#18120c', accent: '#f59e0b' },
    { name: 'Deep Emerald', hex: '#04120e', accent: '#10b981' },
    { name: 'Cyber Violet', hex: '#0b0416', accent: '#c084fc' },
    { name: 'Pure White', hex: '#ffffff', accent: '#2563eb' },
    { name: 'Warm Parchment', hex: '#fbf8f2', accent: '#d97706' },
    { name: 'Crimson Wine', hex: '#1a0509', accent: '#f43f5e' },
    { name: 'Royal Sapphire', hex: '#051026', accent: '#38bdf8' },
    { name: 'Deep Teal', hex: '#04181a', accent: '#00ffcc' },
    { name: 'Charcoal', hex: '#18181b', accent: '#a1a1aa' }
  ];

  const ANIMATION_STYLES = [
    { id: 'template', name: 'Default Template Physics', icon: '✨', desc: 'Auto-adapts to template domain' },
    { id: 'birds', name: 'Real Birds & Clouds', icon: '🕊️', desc: 'Gentle blue sky, real white clouds & soaring birds' },
    { id: 'halo', name: 'Chromatic Halo', icon: '🔮', desc: 'Luminous aurora plasma & concentric chromatic gyro rings' },
    { id: 'aurora', name: 'Deep Nebula', icon: '🌌', desc: 'Stars, shooting stars & luminous moon' },
    { id: 'developer', name: 'Developer & Tech', icon: '💻', desc: 'Monospace code tags, silicon wafer & magnetic web' },
    { id: 'student', name: 'Student & Fresher', icon: '🎓', desc: 'Mortarboards, diplomas, sticky notes & paper planes' },
    { id: 'design', name: 'UI/UX & Design', icon: '🎨', desc: 'Bezier curve handles, wireframes, swatches & Figma cards' },
    { id: 'freelance', name: 'Freelance & Brand', icon: '💼', desc: 'Metallic brand seals, luxury foil cards & 3D tilt' },
    { id: 'creative', name: 'Photography & Arts', icon: '📷', desc: 'Camera apertures, 35mm film negatives & prism caustics' },
    { id: 'business', name: 'Business & Corp', icon: '📈', desc: '3D bar chart pillars, stock tickers & gyroscope' },
    { id: 'creator', name: 'Content Creator', icon: '🎬', desc: 'Play buttons, sound waves, audio ribbon & bursts' },
    { id: 'cybersecurity', name: 'Cyber & Systems', icon: '🛡️', desc: 'Server racks, crypto polyhedrons & circuit traces' },
    { id: 'services', name: 'Services & Studio', icon: '📐', desc: 'Drafting compass, scale rulers & modular cubes' },
    { id: 'modern', name: 'Modern & Experimental', icon: '🫧', desc: 'Liquid chrome metaballs & geometric toruses' }
  ];

  const handleSelectAnimationStyle = (styleKey) => {
    setPortfolio(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        bgType: 'animation',
        bgStyle: styleKey,
        keepAnimation: true
      }
    }));
    setSaveStatus('Unsaved Changes');
  };

  const getAccentColorForBg = (colorOrGrad) => {
    if (!colorOrGrad) return '#6366f1';
    const str = String(colorOrGrad).toLowerCase();

    // Presets & named tones
    if (str.includes('1e1b4b') || str.includes('twilight') || str.includes('312e81')) return '#c084fc';
    if (str.includes('0369a1') || str.includes('ocean') || str.includes('051026')) return '#38bdf8';
    if (str.includes('059669') || str.includes('emerald') || str.includes('04120e') || str.includes('04181a')) return '#10b981';
    if (str.includes('sunset') || str.includes('c026d3') || str.includes('3b0764')) return '#f97316';
    if (str.includes('cyber') || str.includes('ec4899')) return '#00ffcc';
    if (str.includes('amethyst') || str.includes('6b21a8') || str.includes('2e1065')) return '#a855f7';
    if (str.includes('d97706') || str.includes('gold') || str.includes('obsidian') || str.includes('18120c')) return '#f59e0b';
    if (str.includes('f8fafc') || str.includes('ffffff') || str.includes('fbf8f2')) return '#2563eb';
    if (str.includes('rose') || str.includes('f43f5e') || str.includes('1a0509') || str.includes('crimson')) return '#f43f5e';
    if (str.includes('titanium') || str.includes('1e293b')) return '#60a5fa';

    // Hex extraction
    const hexMatch = str.match(/#[0-9a-f]{3,8}/);
    if (hexMatch) {
      const hex = hexMatch[0];
      const l = getLuminance(hex);
      if (l < 0.15) {
        if (hex.startsWith('#0') || hex.startsWith('#1')) return '#38bdf8';
        return '#818cf8';
      }
      return hex;
    }
    return '#6366f1';
  };

  const handleApplySolidColor = (hex, explicitAccent) => {
    const animAccent = explicitAccent || getAccentColorForBg(hex);
    const isLight = getLuminance(hex) > 0.45;

    setPortfolio(prev => {
      const prevTc = prev.themeConfig || {};
      const updatedTc = {
        ...prevTc,
        bgType: 'color',
        bgColor: hex,
        accentColor: animAccent,
        bgAnimationColor: animAccent
      };

      // Guarantee every text field in the portfolio remains 100% visible from box background
      if (isLight) {
        updatedTc.headingColor = '#0f172a';
        updatedTc.textColor = '#334155';
        updatedTc.subtextColor = '#475569';
        updatedTc.cardBgColor = '#ffffff';
        updatedTc.cardBorderColor = 'rgba(15, 23, 42, 0.14)';
      } else if (prevTc.cardBgColor === '#ffffff') {
        // Reset to dark-mode card defaults if returning from white mode
        updatedTc.headingColor = '#ffffff';
        updatedTc.textColor = '#cbd5e1';
        updatedTc.subtextColor = '#94a3b8';
        updatedTc.cardBgColor = 'rgba(15, 23, 42, 0.85)';
        updatedTc.cardBorderColor = 'rgba(255, 255, 255, 0.12)';
      }

      return {
        ...prev,
        themeConfig: updatedTc
      };
    });
    setSaveStatus('Unsaved Changes');
  };

  const handleApplyGradient = (gradientStr, explicitAccent) => {
    const animAccent = explicitAccent || getAccentColorForBg(gradientStr);
    const isLight = getLuminance(gradientStr) > 0.45;

    setPortfolio(prev => {
      const prevTc = prev.themeConfig || {};
      const updatedTc = {
        ...prevTc,
        bgType: 'color',
        bgColor: gradientStr,
        accentColor: animAccent,
        bgAnimationColor: animAccent
      };

      if (isLight) {
        updatedTc.headingColor = '#0f172a';
        updatedTc.textColor = '#334155';
        updatedTc.subtextColor = '#475569';
        updatedTc.cardBgColor = '#ffffff';
        updatedTc.cardBorderColor = 'rgba(15, 23, 42, 0.14)';
      }

      return {
        ...prev,
        themeConfig: updatedTc
      };
    });
    setSaveStatus('Unsaved Changes');
  };

  const handleApplyCustomGradient = () => {
    const grad = `linear-gradient(${customGradAngle}deg, ${customGrad1} 0%, ${customGrad2} 100%)`;
    handleApplyGradient(grad, customGrad1);
  };

  const renderBackgroundStudioContent = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1.5px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '12px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Layers style={{ width: '18px', height: '18px', color: '#38bdf8' }} />
          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Background Studio &amp; Animations
          </h4>
        </div>
        <span className="badge badge-signature" style={{ fontSize: '0.7rem' }}>
          {portfolio.themeConfig?.bgType === 'color' ? 'Custom Color / Gradient' : portfolio.themeConfig?.bgType === 'image' ? 'Custom Image' : 'Interactive Animation'}
        </span>
      </div>

      <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        Choose interactive 60FPS physics animations (including Real Birds &amp; Fog) or remove animations and supply your own solid color, luxury gradient, or wallpaper image.
      </p>

      {/* 3 Main Mode Selection Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem', marginBottom: '1.25rem' }}>
        {[
          { id: 'animation', label: '3D Animation', icon: '🕊️' },
          { id: 'color', label: 'Color & Gradient', icon: '🎨' },
          { id: 'image', label: 'Custom Image', icon: '🖼️' }
        ].map(mode => {
          const isSelected = (portfolio.themeConfig?.bgType || 'animation') === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                if (mode.id === 'color') {
                  const defaultCol = portfolio.themeConfig?.bgColor || '#090d16';
                  handleApplySolidColor(defaultCol);
                } else {
                  setPortfolio(prev => ({
                    ...prev,
                    themeConfig: {
                      ...prev.themeConfig,
                      bgType: mode.id
                    }
                  }));
                  setSaveStatus('Unsaved Changes');
                }
              }}
              style={{
                padding: '0.55rem 0.45rem',
                borderRadius: '8px',
                border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(0,0,0,0.3)',
                color: isSelected ? '#38bdf8' : '#cbd5e1',
                cursor: 'pointer',
                fontSize: '0.76rem',
                fontWeight: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODE 1: 3D ANIMATION CONTROLS */}
      {(portfolio.themeConfig?.bgType === 'animation' || !portfolio.themeConfig?.bgType) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>Interactive Animation Style</label>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>
                {ANIMATION_STYLES.find(a => a.id === (portfolio.themeConfig?.bgStyle || 'template'))?.name || 'Custom'}
              </span>
            </div>
            <select
              value={portfolio.themeConfig?.bgStyle || 'template'}
              onChange={(e) => handleSelectAnimationStyle(e.target.value)}
              className="form-select"
              style={{ fontSize: '0.84rem' }}
            >
              {ANIMATION_STYLES.map(anim => (
                <option key={anim.id} value={anim.id}>
                  {anim.icon} {anim.name} — {anim.desc}
                </option>
              ))}
              <option value="none">🚫 Clean Flat (No Animation)</option>
            </select>
          </div>

          {/* Quick-Click Visual Cards for 11 Animations */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.45rem' }}>
              Select Animation Preset
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.2rem' }}>
              {ANIMATION_STYLES.map(anim => {
                const isSelected = (portfolio.themeConfig?.bgStyle || 'template') === anim.id;
                return (
                  <button
                    key={anim.id}
                    type="button"
                    onClick={() => handleSelectAnimationStyle(anim.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.6rem',
                      background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(0,0,0,0.3)',
                      border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{anim.icon}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? '#38bdf8' : '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {anim.name}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {anim.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {portfolio.themeConfig?.bgStyle !== 'none' && (
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>
                  Animation Opacity (Dim to enhance content visibility)
                </label>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
                  {Math.round((portfolio.themeConfig?.bgOpacity !== undefined ? portfolio.themeConfig.bgOpacity : 0.65) * 100)}%
                </span>
              </div>
              <input 
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={portfolio.themeConfig?.bgOpacity !== undefined ? portfolio.themeConfig.bgOpacity : 0.65}
                onChange={(e) => handleFieldChange('themeConfig', 'bgOpacity', parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
                <span>Subtle / High Visibility</span>
                <span>Balanced (65%)</span>
                <span>Vivid / 100%</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: SOLID & GRADIENT COLOR CONTROLS */}
      {portfolio.themeConfig?.bgType === 'color' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Sub-Tabs: Solid vs Gradient */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              type="button"
              onClick={() => setBgTabSubMode('solid')}
              style={{
                flex: 1,
                padding: '0.4rem',
                borderRadius: '6px',
                border: 'none',
                background: bgTabSubMode === 'solid' ? '#38bdf8' : 'transparent',
                color: bgTabSubMode === 'solid' ? '#000' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              ⬛ Solid Colors
            </button>
            <button
              type="button"
              onClick={() => setBgTabSubMode('gradient')}
              style={{
                flex: 1,
                padding: '0.4rem',
                borderRadius: '6px',
                border: 'none',
                background: bgTabSubMode === 'gradient' ? 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)' : 'transparent',
                color: bgTabSubMode === 'gradient' ? '#000' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              🌈 Gradient Colors
            </button>
          </div>

          {/* SUB-PANEL 1: SOLID COLORS */}
          {bgTabSubMode === 'solid' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Custom Hex / Color Picker</label>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                  <input 
                    type="color"
                    value={portfolio.themeConfig?.bgColor?.startsWith('#') ? portfolio.themeConfig.bgColor : '#090d16'}
                    onChange={(e) => handleApplySolidColor(e.target.value)}
                    style={{ width: '38px', height: '34px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                  />
                  <input 
                    type="text"
                    value={portfolio.themeConfig?.bgColor || ''}
                    onChange={(e) => handleApplySolidColor(e.target.value)}
                    placeholder="#090d16"
                    className="form-input"
                    style={{ flex: 1, fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.45rem' }}>
                  One-Click Solid Presets (Animation Adapts to Color)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                  {SOLID_PRESETS.map(c => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => handleApplySolidColor(c.hex, c.accent)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.4rem 0.5rem',
                        background: 'rgba(0,0,0,0.3)',
                        border: portfolio.themeConfig?.bgColor === c.hex ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#e2e8f0',
                        fontSize: '0.72rem'
                      }}
                    >
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-PANEL 2: GRADIENT COLORS */}
          {bgTabSubMode === 'gradient' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.45rem' }}>
                  Curated Luxury Gradient Presets (Animation Adapts)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem' }}>
                  {GRADIENT_PRESETS.map(g => {
                    const isSelected = portfolio.themeConfig?.bgColor === g.gradient;
                    return (
                      <button
                        key={g.name}
                        type="button"
                        onClick={() => handleApplyGradient(g.gradient, g.accent)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.55rem',
                          background: 'rgba(0,0,0,0.35)',
                          border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#fff',
                          fontSize: '0.74rem',
                          textAlign: 'left',
                          boxShadow: isSelected ? '0 0 12px rgba(56, 189, 248, 0.35)' : 'none'
                        }}
                      >
                        <span style={{ width: '22px', height: '22px', borderRadius: '6px', background: g.gradient, flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>{g.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom 2-Color Gradient Generator */}
              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Custom 2-Color Gradient Builder
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Color 1</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <input 
                        type="color" 
                        value={customGrad1} 
                        onChange={(e) => setCustomGrad1(e.target.value)}
                        style={{ width: '28px', height: '28px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                      />
                      <input 
                        type="text" 
                        value={customGrad1} 
                        onChange={(e) => setCustomGrad1(e.target.value)}
                        className="form-input" 
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }} 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Color 2</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <input 
                        type="color" 
                        value={customGrad2} 
                        onChange={(e) => setCustomGrad2(e.target.value)}
                        style={{ width: '28px', height: '28px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
                      />
                      <input 
                        type="text" 
                        value={customGrad2} 
                        onChange={(e) => setCustomGrad2(e.target.value)}
                        className="form-input" 
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }} 
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Gradient Angle</label>
                    <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700 }}>{customGradAngle}°</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={customGradAngle}
                    onChange={(e) => setCustomGradAngle(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                {/* Live Preview Strip */}
                <div style={{
                  height: '32px',
                  borderRadius: '6px',
                  background: `linear-gradient(${customGradAngle}deg, ${customGrad1} 0%, ${customGrad2} 100%)`,
                  border: '1px solid rgba(255,255,255,0.2)',
                  marginBottom: '0.75rem'
                }} />

                <button
                  type="button"
                  onClick={handleApplyCustomGradient}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', background: '#38bdf8', color: '#000', fontWeight: 800, fontSize: '0.76rem' }}
                >
                  Apply Custom Gradient
                </button>
              </div>
            </div>
          )}

          {/* Optional Layered Animation */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <input 
                type="checkbox"
                checked={Boolean(portfolio.themeConfig?.keepAnimation)}
                onChange={(e) => handleFieldChange('themeConfig', 'keepAnimation', e.target.checked)}
                style={{ width: '14px', height: '14px', accentColor: '#38bdf8' }}
              />
              <span>Optional: Layer subtle 3D animation over this custom color</span>
            </label>
            {portfolio.themeConfig?.keepAnimation && (
              <div style={{ marginTop: '0.5rem' }}>
                <select
                  value={portfolio.themeConfig?.bgStyle || 'template'}
                  onChange={(e) => handleFieldChange('themeConfig', 'bgStyle', e.target.value)}
                  className="form-select"
                  style={{ fontSize: '0.78rem' }}
                >
                  {ANIMATION_STYLES.map(anim => (
                    <option key={anim.id} value={anim.id}>
                      {anim.icon} {anim.name}
                    </option>
                  ))}
                  <option value="none">🚫 Clean Flat (No Animation)</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: CUSTOM IMAGE WALLPAPER CONTROLS */}
      {portfolio.themeConfig?.bgType === 'image' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Background Image URL</label>
            <input 
              type="text"
              value={portfolio.themeConfig?.bgImage || ''}
              onChange={(e) => handleFieldChange('themeConfig', 'bgImage', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="form-input"
              style={{ fontSize: '0.82rem' }}
            />
            <div style={{ marginTop: '0.5rem' }}>
              <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
                <Upload style={{ width: '13px', height: '13px', color: '#38bdf8' }} />
                <span>{bgUploading ? 'Uploading Image...' : 'Upload PC Image File'}</span>
                <input type="file" accept="image/*" onChange={handleBgImageUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Preset Curated HD Wallpapers */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.45rem' }}>
              One-Click Wallpaper Presets
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
              {[
                { name: 'Minimal Dark 3D', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80' },
                { name: 'Cyber Grid Architecture', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80' },
                { name: 'Cosmic Starfield', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80' },
                { name: 'Fluid Silk Waves', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80' }
              ].map(wp => (
                <button
                  key={wp.name}
                  type="button"
                  onClick={() => handleFieldChange('themeConfig', 'bgImage', wp.url)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: portfolio.themeConfig?.bgImage === wp.url ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#e2e8f0',
                    fontSize: '0.72rem',
                    textAlign: 'left'
                  }}
                >
                  <img src={wp.url} alt="" style={{ width: '26px', height: '20px', borderRadius: '3px', objectFit: 'cover' }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{wp.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrim Dimmer Slider for Readability */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>
                Dark Scrim Dimmer (Guarantees 100% Readable Text)
              </label>
              <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>
                {Math.round((portfolio.themeConfig?.bgDimmer !== undefined ? portfolio.themeConfig.bgDimmer : 0.65) * 100)}%
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="0.9"
              step="0.05"
              value={portfolio.themeConfig?.bgDimmer !== undefined ? portfolio.themeConfig.bgDimmer : 0.65}
              onChange={(e) => handleFieldChange('themeConfig', 'bgDimmer', parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b', marginTop: '0.2rem' }}>
              <span>Light Scrim (0%)</span>
              <span>Optimal Contrast (65%)</span>
              <span>Deep Stealth (90%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#090d16', overflow: 'hidden' }}>
      
      {/* Top Application Bar */}
      <header className="editor-header" style={{
        background: '#0d1322',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.65rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        zIndex: 50
      }}>
        {/* Left: Back & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/dashboard" className="btn btn-outline btn-sm" title="Back to Dashboard" style={{ padding: '0.4rem 0.6rem' }}>
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
          </Link>
          <div>
            <input 
              type="text" 
              value={portfolio.title}
              onChange={(e) => handleFieldChange(null, 'title', e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.05rem',
                fontWeight: 700,
                outline: 'none',
                fontFamily: 'inherit'
              }}
              placeholder="Portfolio Title"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
              <span style={{ color: saveStatus === 'Saved' ? '#10b981' : '#f59e0b' }}>
                ● {saveStatus}
              </span>
              <span style={{ color: '#475569' }}>|</span>
              <button 
                onClick={() => setIsTemplateModalOpen(true)}
                style={{ background: 'transparent', border: 'none', color: '#818cf8', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Template: {currentTemplate.name}
              </button>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Mode OR Mobile View Switcher */}
        {isMobileScreen ? (
          <div style={{
            display: 'flex',
            background: '#151d30',
            borderRadius: '10px',
            padding: '0.2rem',
            border: '1px solid #334155'
          }}>
            <button
              onClick={() => setMobileViewMode('editor')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: mobileViewMode === 'editor' ? '#4f46e5' : 'transparent',
                color: mobileViewMode === 'editor' ? '#fff' : '#94a3b8'
              }}
            >
              ✏️ Form
            </button>
            <button
              onClick={() => setMobileViewMode('preview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: mobileViewMode === 'preview' ? '#4f46e5' : 'transparent',
                color: mobileViewMode === 'preview' ? '#fff' : '#94a3b8'
              }}
            >
              👁️ Preview
            </button>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            background: 'rgba(2, 6, 23, 0.6)',
            borderRadius: '8px',
            padding: '0.2rem',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button 
              onClick={() => setPreviewDevice('desktop')}
              className={`btn btn-sm ${previewDevice === 'desktop' ? 'btn-secondary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '0.35rem 0.65rem' }}
              title="Desktop 100%"
            >
              <Monitor style={{ width: '15px', height: '15px' }} />
            </button>
            <button 
              onClick={() => setPreviewDevice('tablet')}
              className={`btn btn-sm ${previewDevice === 'tablet' ? 'btn-secondary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '0.35rem 0.65rem' }}
              title="Tablet (768px)"
            >
              <Tablet style={{ width: '15px', height: '15px' }} />
            </button>
            <button 
              onClick={() => setPreviewDevice('mobile')}
              className={`btn btn-sm ${previewDevice === 'mobile' ? 'btn-secondary' : 'btn-outline'}`}
              style={{ border: 'none', padding: '0.35rem 0.65rem' }}
              title="Mobile (390px)"
            >
              <Smartphone style={{ width: '15px', height: '15px' }} />
            </button>
          </div>
        )}

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {portfolio.status === 'published' && (
            <button onClick={copyPublicUrl} className="btn btn-outline btn-sm" title="Copy Public URL">
              {copiedLink ? <Check style={{ width: '14px', height: '14px', color: '#10b981' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
              <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
            </button>
          )}

          <button onClick={() => handleSave()} disabled={saving} className="btn btn-secondary btn-sm">
            <Save style={{ width: '14px', height: '14px' }} />
            <span className="editor-btn-label">Save Draft</span>
          </button>

          <button 
            onClick={handleDownloadPortfolio} 
            disabled={saving} 
            className="btn btn-primary btn-sm interactive-hover-btn"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
              color: '#fff',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.95rem'
            }}
            title="Download complete standalone website into your computer's Downloads folder"
          >
            <Download style={{ width: '15px', height: '15px' }} />
            <span className="editor-btn-label-download">Download</span>
            <span className="editor-btn-label-full" style={{ display: 'none' }}> Portfolio</span>
          </button>

        </div>
      </header>

      {/* Mobile Device Alert: Switch to Desktop Site */}
      {isMobileScreen && (
        <div style={{
          background: 'linear-gradient(90deg, #1e1b4b, #312e81)',
          borderBottom: '1px solid rgba(129, 140, 248, 0.4)',
          padding: '0.45rem 1rem',
          fontSize: '0.76rem',
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          zIndex: 49
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor style={{ width: '15px', height: '15px', color: '#38bdf8', flexShrink: 0 }} />
            <span>
              <strong>Desktop Site Recommended:</strong> Tap browser menu (<strong>⋮</strong>) &rarr; enable <strong>"Desktop site"</strong> for the best full-screen 3D editing experience.
            </span>
          </div>
        </div>
      )}

      {/* Main Split Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT: Editor Controls Sidebar */}
        <div style={{
          width: isMobileScreen ? '100%' : '460px',
          maxWidth: '100%',
          borderRight: isMobileScreen ? 'none' : '1px solid #1e293b',
          background: '#0b101b',
          position: 'relative',
          zIndex: 40,
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.7)',
          display: isMobileScreen && mobileViewMode !== 'editor' ? 'none' : 'flex',
          flexDirection: 'column',
          height: '100%',
          flexShrink: 0
        }}>
          {/* Navigation Category Tabs */}
          <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid #1e293b', background: '#070b13', padding: '0.6rem 0.75rem', gap: '0.45rem', scrollbarWidth: 'none' }}>
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'theme', label: 'Theme & Colors', icon: Palette },
              ...(!isBookType ? [{ id: 'background', label: 'Background Studio', icon: Layers }] : []),
              { id: 'skills', label: 'Skills', icon: Code },
              { id: 'projects', label: 'Projects', icon: Sparkles },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'social', label: 'Social & Slug', icon: Share2 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: isActive ? '1px solid #6366f1' : '1px solid #27354f',
                    background: isActive ? '#4f46e5' : '#151d30',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    boxShadow: isActive ? '0 2px 8px rgba(79, 70, 229, 0.45)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon style={{ width: '14px', height: '14px' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: isMobileScreen ? '1rem 0.75rem' : '1.5rem', 
            background: '#0b101b',
            boxSizing: 'border-box'
          }}>
            {/* Dedicated Ad Section for Studio Editor */}
            <AdBanner slot="portfolio-editor" format="horizontal" style={{ margin: '0 0 1.25rem 0' }} />
            
            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Profile Details</h3>
                
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    value={portfolio.profile?.fullName || ''}
                    onChange={(e) => handleFieldChange('profile', 'fullName', e.target.value)}
                    className="form-input" 
                  />
                  <InlineTypographyControl 
                    title="Full Name" 
                    fontKey="nameFont" 
                    colorKey="nameColor" 
                    weightKey="nameWeight" 
                    styleKey="nameStyle" 
                    transformKey="nameTransform" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#ffffff"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Headline</label>
                  <input 
                    type="text" 
                    value={portfolio.profile?.headline || ''}
                    onChange={(e) => handleFieldChange('profile', 'headline', e.target.value)}
                    className="form-input" 
                  />
                  <InlineTypographyControl 
                    title="Headline" 
                    fontKey="headlineFont" 
                    colorKey="headlineColor" 
                    weightKey="headlineWeight" 
                    styleKey="headlineStyle" 
                    transformKey="headlineTransform" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#93c5fd"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status Badge / Availability</label>
                  <input 
                    type="text" 
                    value={portfolio.profile?.statusBadge || ''}
                    onChange={(e) => handleFieldChange('profile', 'statusBadge', e.target.value)}
                    className="form-input" 
                    placeholder="e.g. Open to Opportunities"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Biography / About Me</label>
                  <textarea 
                    value={portfolio.profile?.bio || ''}
                    onChange={(e) => handleFieldChange('profile', 'bio', e.target.value)}
                    className="form-textarea" 
                    rows={4}
                  />
                  <InlineTypographyControl 
                    title="Biography" 
                    fontKey="bioFont" 
                    colorKey="bioColor" 
                    weightKey="bioWeight" 
                    styleKey="bioStyle" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#cbd5e1"
                  />
                </div>

                {/* Avatar URL or Upload */}
                <div className="form-group">
                  <label className="form-label">Avatar / Photo URL</label>
                  <input 
                    type="text" 
                    value={portfolio.profile?.avatarUrl || ''}
                    onChange={(e) => handleFieldChange('profile', 'avatarUrl', e.target.value)}
                    className="form-input" 
                    placeholder="https://images.unsplash.com/..."
                  />
                  <div style={{ marginTop: '0.5rem' }}>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                      <Upload style={{ width: '13px', height: '13px' }} />
                      <span>{imageUploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    value={portfolio.profile?.email || ''}
                    onChange={(e) => handleFieldChange('profile', 'email', e.target.value)}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input 
                    type="text" 
                    value={portfolio.profile?.location || ''}
                    onChange={(e) => handleFieldChange('profile', 'location', e.target.value)}
                    className="form-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume Link (PDF URL)</label>
                  <input 
                    type="url" 
                    value={portfolio.profile?.resumeUrl || ''}
                    onChange={(e) => handleFieldChange('profile', 'resumeUrl', e.target.value)}
                    className="form-input" 
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>
            )}

            {/* TAB: THEME & TEMPLATE */}
            {activeTab === 'theme' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Theme &amp; Template</h3>

                <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1rem', color: '#fff' }}>Active Template</h4>
                    <span className="badge badge-signature">{currentTemplate.categoryName}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1rem' }}>
                    {currentTemplate.name}: {currentTemplate.description}
                  </p>
                  <button onClick={() => setIsTemplateModalOpen(true)} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    Switch Template (Zero Data Loss)
                  </button>
                </div>

                {/* Dedicated Custom Colors & Box Styling Box */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginTop: '1.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Palette style={{ width: '18px', height: '18px', color: portfolio.themeConfig?.accentColor || '#3b82f6' }} />
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        Colors &amp; Box Styling Studio
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPortfolio(prev => ({
                          ...prev,
                          themeConfig: {
                            ...prev.themeConfig,
                            headingColor: '',
                            textColor: '',
                            subtextColor: '',
                            cardBgColor: '',
                            cardBorderColor: '',
                            accentColor: currentTemplate.accentColor || '#3b82f6'
                          }
                        }));
                        setSaveStatus('Unsaved Changes');
                      }}
                      className="btn btn-outline btn-xs"
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                      title="Reset all colors to default template styling"
                    >
                      Reset Defaults
                    </button>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                    Customize text colors for different fields, section headings, and card box backgrounds across all templates.
                  </p>

                  {/* Quick One-Click Color Palettes */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                      One-Click Color Palettes
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem' }}>
                      {[
                        { name: 'Cyber Matrix', accent: '#00ffcc', heading: '#00ffcc', text: '#e0f2fe', subtext: '#38bdf8', card: '#05131a', border: '#00ffcc' },
                        { name: 'Obsidian Gold', accent: '#d4af37', heading: '#fef3c7', text: '#e2e8f0', subtext: '#d4af37', card: '#0f172a', border: '#d4af37' },
                        { name: 'Emerald Luxe', accent: '#10b981', heading: '#ecfdf5', text: '#cbd5e1', subtext: '#34d399', card: '#061a14', border: '#10b981' },
                        { name: 'Cosmic Violet', accent: '#8b5cf6', heading: '#f3e8ff', text: '#e2e8f0', subtext: '#c084fc', card: '#130924', border: '#8b5cf6' },
                        { name: 'Classic Slate', accent: '#3b82f6', heading: '#ffffff', text: '#cbd5e1', subtext: '#94a3b8', card: '#0f172a', border: '#334155' },
                        { name: 'Clean Light', accent: '#2563eb', heading: '#0f172a', text: '#334155', subtext: '#475569', card: '#ffffff', border: '#cbd5e1' }
                      ].map(pal => (
                        <button
                          key={pal.name}
                          type="button"
                          onClick={() => {
                            setPortfolio(prev => ({
                              ...prev,
                              themeConfig: {
                                ...prev.themeConfig,
                                accentColor: pal.accent,
                                headingColor: pal.heading,
                                textColor: pal.text,
                                subtextColor: pal.subtext,
                                cardBgColor: pal.card,
                                cardBorderColor: pal.border
                              }
                            }));
                            setSaveStatus('Unsaved Changes');
                          }}
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

                  {/* Individual Color Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    
                    {/* 1. Heading Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Heading Text Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Titles, section headers &amp; project names</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={safeHex(portfolio.themeConfig?.headingColor, '#ffffff')}
                          onChange={(e) => handleFieldChange('themeConfig', 'headingColor', e.target.value)}
                          style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={portfolio.themeConfig?.headingColor || ''}
                          onChange={(e) => handleFieldChange('themeConfig', 'headingColor', e.target.value)}
                          placeholder="#ffffff"
                          style={{ width: '80px', padding: '0.25rem 0.45rem', fontSize: '0.76rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* 2. Body Text Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Body / Content Text Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Bios, summaries, descriptions &amp; bullets</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={safeHex(portfolio.themeConfig?.textColor, '#cbd5e1')}
                          onChange={(e) => handleFieldChange('themeConfig', 'textColor', e.target.value)}
                          style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={portfolio.themeConfig?.textColor || ''}
                          onChange={(e) => handleFieldChange('themeConfig', 'textColor', e.target.value)}
                          placeholder="#cbd5e1"
                          style={{ width: '80px', padding: '0.25rem 0.45rem', fontSize: '0.76rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* 3. Subtitle / Meta Text Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Subtitle &amp; Meta Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dates, company names &amp; taglines</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={safeHex(portfolio.themeConfig?.subtextColor, '#94a3b8')}
                          onChange={(e) => handleFieldChange('themeConfig', 'subtextColor', e.target.value)}
                          style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={portfolio.themeConfig?.subtextColor || ''}
                          onChange={(e) => handleFieldChange('themeConfig', 'subtextColor', e.target.value)}
                          placeholder="#94a3b8"
                          style={{ width: '80px', padding: '0.25rem 0.45rem', fontSize: '0.76rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* 4. Box / Card Background Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Box / Card Background</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Background for project &amp; skill cards</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={safeHex(portfolio.themeConfig?.cardBgColor, '#0f172a')}
                          onChange={(e) => handleFieldChange('themeConfig', 'cardBgColor', e.target.value)}
                          style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={portfolio.themeConfig?.cardBgColor || ''}
                          onChange={(e) => handleFieldChange('themeConfig', 'cardBgColor', e.target.value)}
                          placeholder="#0f172a"
                          style={{ width: '80px', padding: '0.25rem 0.45rem', fontSize: '0.76rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* 5. Box / Card Border Color */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>Box / Card Border Color</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Borders surrounding cards &amp; containers</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input 
                          type="color" 
                          value={safeHex(portfolio.themeConfig?.cardBorderColor, '#334155')}
                          onChange={(e) => handleFieldChange('themeConfig', 'cardBorderColor', e.target.value)}
                          style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                        />
                        <input 
                          type="text" 
                          value={portfolio.themeConfig?.cardBorderColor || ''}
                          onChange={(e) => handleFieldChange('themeConfig', 'cardBorderColor', e.target.value)}
                          placeholder="#334155"
                          style={{ width: '80px', padding: '0.25rem 0.45rem', fontSize: '0.76rem', background: '#090d16', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* DEDICATED TYPOGRAPHY & TEXT STYLING STUDIO */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginTop: '1.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Type style={{ width: '18px', height: '18px', color: '#c084fc' }} />
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        Typography &amp; Text Styling Studio
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPortfolio(prev => ({
                          ...prev,
                          themeConfig: {
                            ...prev.themeConfig,
                            nameFont: '',
                            nameColor: '',
                            nameWeight: '',
                            nameStyle: '',
                            nameTransform: '',
                            headlineFont: '',
                            headlineColor: '',
                            headlineWeight: '',
                            headlineStyle: '',
                            headlineTransform: '',
                            bioFont: '',
                            bioColor: '',
                            bioWeight: '',
                            bioStyle: '',
                            sectionTitleFont: '',
                            sectionTitleColor: '',
                            sectionTitleWeight: '',
                            sectionTitleStyle: '',
                            sectionTitleTransform: '',
                            cardTitleFont: '',
                            cardTitleColor: '',
                            cardTitleWeight: '',
                            cardTitleStyle: '',
                            bodyFont: '',
                            bodyTextColor: '',
                            bodyWeight: '',
                            bodyStyle: ''
                          }
                        }));
                        setSaveStatus('Unsaved Changes');
                      }}
                      className="btn btn-outline btn-xs"
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                      title="Reset all fonts and text colors to default"
                    >
                      Reset Fonts
                    </button>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                    Customize font family, weight, style, and text color individually for every text element in your portfolio.
                  </p>

                  {/* 1-Click Curated Typography Presets */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                      Curated Font &amp; Color Pairings
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.45rem' }}>
                      {TYPOGRAPHY_PRESETS.map(preset => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setPortfolio(prev => ({
                              ...prev,
                              themeConfig: {
                                ...prev.themeConfig,
                                nameFont: preset.nameFont,
                                nameWeight: preset.nameWeight,
                                nameStyle: preset.nameStyle,
                                nameTransform: preset.nameTransform,
                                headlineFont: preset.headlineFont,
                                headlineWeight: preset.headlineWeight,
                                headlineStyle: preset.headlineStyle,
                                headlineTransform: preset.headlineTransform,
                                sectionTitleFont: preset.sectionTitleFont,
                                sectionTitleWeight: preset.sectionTitleWeight,
                                sectionTitleStyle: preset.sectionTitleStyle,
                                sectionTitleTransform: preset.sectionTitleTransform,
                                cardTitleFont: preset.cardTitleFont,
                                cardTitleWeight: preset.cardTitleWeight,
                                bodyFont: preset.bodyFont,
                                bodyWeight: preset.bodyWeight,
                                nameColor: preset.nameColor,
                                headlineColor: preset.headlineColor,
                                sectionTitleColor: preset.sectionTitleColor,
                                cardTitleColor: preset.cardTitleColor,
                                bodyTextColor: preset.bodyTextColor,
                                headingColor: preset.nameColor,
                                textColor: preset.bodyTextColor,
                                subtextColor: preset.headlineColor
                              }
                            }));
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="btn btn-outline btn-xs"
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.45rem 0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            gap: '0.15rem',
                            borderColor: 'rgba(255,255,255,0.15)',
                            background: 'rgba(0,0,0,0.25)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#fff' }}>
                            <span>{preset.icon}</span>
                            <span style={{ fontSize: '0.74rem' }}>{preset.name}</span>
                          </div>
                          <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>{preset.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field Selector Tabs */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                      Select Text Element to Customize
                    </label>
                    <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.35rem', scrollbarWidth: 'none' }}>
                      {CUSTOMIZABLE_TEXT_FIELDS.map(f => {
                        const isSelected = activeTypoField === f.id;
                        const currentColor = portfolio.themeConfig?.[f.colorKey] || f.defaultColor;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setActiveTypoField(f.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.35rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              border: isSelected ? '1px solid #a855f7' : '1px solid #1e293b',
                              background: isSelected ? '#581c87' : '#0f172a',
                              color: isSelected ? '#ffffff' : '#94a3b8',
                              cursor: 'pointer'
                            }}
                          >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentColor, display: 'inline-block' }} />
                            <span>{f.label.split('/')[0].trim()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Field Customizer Form */}
                  {(() => {
                    const currentField = CUSTOMIZABLE_TEXT_FIELDS.find(f => f.id === activeTypoField) || CUSTOMIZABLE_TEXT_FIELDS[0];
                    const tc = portfolio.themeConfig || {};
                    const selectedFont = tc[currentField.fontKey] || currentField.defaultFont;
                    const selectedColor = tc[currentField.colorKey] || currentField.defaultColor;
                    const selectedWeight = tc[currentField.weightKey] || currentField.defaultWeight;
                    const selectedStyle = tc[currentField.styleKey] || 'normal';
                    const selectedTransform = tc[currentField.transformKey] || 'none';

                    return (
                      <div style={{
                        background: '#070b13',
                        border: '1px solid #1e293b',
                        borderRadius: '10px',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>{currentField.label}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{currentField.desc}</div>
                          </div>
                          <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                            {selectedFont} ({selectedWeight})
                          </span>
                        </div>

                        {/* Controls Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                          {/* Font Family */}
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                              Font Family
                            </label>
                            <select
                              value={selectedFont}
                              onChange={(e) => handleFieldChange('themeConfig', currentField.fontKey, e.target.value)}
                              className="form-select"
                              style={{ fontSize: '0.78rem', padding: '0.35rem 0.5rem', background: '#0b101b' }}
                            >
                              {FONT_OPTIONS.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Text Color */}
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                              Text Color
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <input 
                                type="color" 
                                value={selectedColor.startsWith('#') ? selectedColor : currentField.defaultColor}
                                onChange={(e) => handleFieldChange('themeConfig', currentField.colorKey, e.target.value)}
                                style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
                              />
                              <input 
                                type="text" 
                                value={tc[currentField.colorKey] || ''}
                                onChange={(e) => handleFieldChange('themeConfig', currentField.colorKey, e.target.value)}
                                placeholder={currentField.defaultColor}
                                style={{ flex: 1, padding: '0.3rem 0.45rem', fontSize: '0.76rem', background: '#0b101b', border: '1px solid #334155', borderRadius: '4px', color: '#fff' }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Weight, Italic & Transform */}
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                          <div style={{ flex: '1 1 120px' }}>
                            <label style={{ fontSize: '0.7rem', color: '#cbd5e1', display: 'block', marginBottom: '0.2rem' }}>Font Weight</label>
                            <select
                              value={selectedWeight}
                              onChange={(e) => handleFieldChange('themeConfig', currentField.weightKey, e.target.value)}
                              className="form-select"
                              style={{ fontSize: '0.76rem', padding: '0.3rem 0.45rem', background: '#0b101b' }}
                            >
                              {FONT_WEIGHTS.map(w => (
                                <option key={w.id} value={w.id}>{w.label}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ fontSize: '0.7rem', color: '#cbd5e1', display: 'block', marginBottom: '0.2rem' }}>Style</label>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                              <button
                                type="button"
                                onClick={() => handleFieldChange('themeConfig', currentField.styleKey, 'normal')}
                                style={{
                                  padding: '0.3rem 0.55rem',
                                  fontSize: '0.74rem',
                                  background: selectedStyle === 'normal' ? '#7e22ce' : '#1e293b',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                Regular
                              </button>
                              <button
                                type="button"
                                onClick={() => handleFieldChange('themeConfig', currentField.styleKey, 'italic')}
                                style={{
                                  padding: '0.3rem 0.55rem',
                                  fontSize: '0.74rem',
                                  fontStyle: 'italic',
                                  background: selectedStyle === 'italic' ? '#7e22ce' : '#1e293b',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                Italic
                              </button>
                            </div>
                          </div>

                          {currentField.transformKey && (
                            <div>
                              <label style={{ fontSize: '0.7rem', color: '#cbd5e1', display: 'block', marginBottom: '0.2rem' }}>Letter Case</label>
                              <div style={{ display: 'flex', gap: '0.25rem' }}>
                                <button
                                  type="button"
                                  onClick={() => handleFieldChange('themeConfig', currentField.transformKey, 'none')}
                                  style={{
                                    padding: '0.3rem 0.55rem',
                                    fontSize: '0.74rem',
                                    background: selectedTransform === 'none' ? '#7e22ce' : '#1e293b',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Standard
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleFieldChange('themeConfig', currentField.transformKey, 'uppercase')}
                                  style={{
                                    padding: '0.3rem 0.55rem',
                                    fontSize: '0.74rem',
                                    textTransform: 'uppercase',
                                    background: selectedTransform === 'uppercase' ? '#7e22ce' : '#1e293b',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  UPPER
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Live Typography Preview Card */}
                        <div style={{
                          marginTop: '0.35rem',
                          padding: '0.85rem',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                            Live Typography Preview:
                          </div>
                          <div style={{
                            fontFamily: resolveFontFamily(selectedFont),
                            color: selectedColor,
                            fontWeight: selectedWeight,
                            fontStyle: selectedStyle,
                            textTransform: selectedTransform,
                            fontSize: currentField.id === 'name' ? '1.35rem' : currentField.id === 'headline' ? '1.05rem' : currentField.id === 'sectionTitle' ? '1.15rem' : '0.92rem',
                            lineHeight: 1.3
                          }}>
                            {currentField.id === 'name' ? (portfolio.profile?.fullName || 'Alex River')
                              : currentField.id === 'headline' ? (portfolio.profile?.headline || 'Senior Full Stack & AI Systems Engineer')
                              : currentField.id === 'bio' ? (portfolio.profile?.bio?.slice(0, 100) + '...' || 'Passionate about crafting resilient web architectures.')
                              : currentField.id === 'sectionTitle' ? 'Featured Case Studies & Work'
                              : currentField.id === 'cardTitle' ? 'Quantum Analytics Engine'
                              : 'High-throughput event streaming analytics dashboard with real-time telemetry.'}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Accent Color Preset */}
                <div className="form-group" style={{ marginTop: '1.25rem' }}>
                  <label className="form-label">Theme Primary Accent Color</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem', alignItems: 'center' }}>
                    {['#3b82f6', '#00ffcc', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleFieldChange('themeConfig', 'accentColor', color)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: color,
                          border: portfolio.themeConfig?.accentColor === color ? '3px solid #fff' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                    <input 
                      type="color" 
                      value={portfolio.themeConfig?.accentColor || '#3b82f6'}
                      onChange={(e) => handleFieldChange('themeConfig', 'accentColor', e.target.value)}
                      style={{ width: '32px', height: '32px', border: 'none', borderRadius: '50%', cursor: 'pointer', marginLeft: '0.5rem', background: 'transparent' }}
                      title="Custom Accent Color"
                    />
                  </div>
                </div>

                {/* Book Cover Theme (When 3D book is chosen) */}
                {['open-book', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(portfolio.templateId) && (
                  <div className="form-group" style={{ marginTop: '1.5rem' }}>
                    <label className="form-label">3D Book Cover Style</label>
                    <select 
                      value={portfolio.themeConfig?.bookCoverTheme || 'leather'}
                      onChange={(e) => handleFieldChange('themeConfig', 'bookCoverTheme', e.target.value)}
                      className="form-select"
                    >
                      <option value="leather">Warm Antique Leather (Gold Foil)</option>
                      <option value="midnight">Midnight Sapphire (Luminous)</option>
                      <option value="obsidian">Executive Obsidian Hardcover</option>
                      <option value="emerald">Royal Emerald Foil</option>
                    </select>
                  </div>
                )}

                {/* BACKGROUND STUDIO & ANIMATION PLATFORM */}
                {!isBookType && renderBackgroundStudioContent()}
              </div>
            )}

            {/* TAB: BACKGROUND DIRECT VIEW */}
            {activeTab === 'background' && !isBookType && (
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Background Studio</h3>
                {renderBackgroundStudioContent()}
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === 'skills' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Skills &amp; Technologies</h3>
                  <button onClick={handleAddSkill} className="btn btn-outline btn-sm">
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Skill
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {portfolio.skills?.map((skill, idx) => (
                    <div key={idx} style={{ background: '#151d30', border: '1px solid #334155', borderRadius: '10px', padding: '0.85rem', display: 'flex', gap: '0.65rem', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <input 
                        type="text" 
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...portfolio.skills];
                          updated[idx].name = e.target.value;
                          setPortfolio({ ...portfolio, skills: updated });
                          setSaveStatus('Unsaved Changes');
                        }}
                        className="form-input"
                        placeholder="Skill Name"
                        style={{ flex: 2 }}
                      />
                      <input 
                        type="text" 
                        value={skill.category || ''}
                        onChange={(e) => {
                          const updated = [...portfolio.skills];
                          updated[idx].category = e.target.value;
                          setPortfolio({ ...portfolio, skills: updated });
                          setSaveStatus('Unsaved Changes');
                        }}
                        className="form-input"
                        placeholder="Category"
                        style={{ flex: 1.5 }}
                      />
                      <button onClick={() => handleRemoveSkill(idx)} style={{ background: '#7f1d1d', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '0.45rem', borderRadius: '6px' }} title="Delete Skill">
                        <Trash2 style={{ width: '15px', height: '15px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Featured Projects</h3>
                  <button onClick={handleAddProject} className="btn btn-outline btn-sm">
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Project
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <InlineTypographyControl 
                    title="Project Titles" 
                    fontKey="cardTitleFont" 
                    colorKey="cardTitleColor" 
                    weightKey="cardTitleWeight" 
                    styleKey="cardTitleStyle" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#ffffff"
                  />
                  <InlineTypographyControl 
                    title="Descriptions" 
                    fontKey="bodyFont" 
                    colorKey="bodyTextColor" 
                    weightKey="bodyWeight" 
                    styleKey="bodyStyle" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#cbd5e1"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {portfolio.projects?.map((proj, idx) => (
                    <div key={idx} style={{ background: '#151d30', border: '1px solid #334155', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#93c5fd', fontWeight: 700 }}>Project #{idx + 1}</span>
                        <button onClick={() => handleRemoveProject(idx)} style={{ background: '#7f1d1d', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '0.35rem 0.5rem', borderRadius: '6px' }} title="Delete Project">
                          <Trash2 style={{ width: '15px', height: '15px' }} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Project Title</label>
                        <input 
                          type="text" 
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx].title = e.target.value;
                            setPortfolio({ ...portfolio, projects: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea 
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx].description = e.target.value;
                            setPortfolio({ ...portfolio, projects: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-textarea"
                          rows={2}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Tech Stack (comma separated)</label>
                        <input 
                          type="text" 
                          value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || '')}
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx].techStack = e.target.value.split(',').map(s => s.trim());
                            setPortfolio({ ...portfolio, projects: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-input"
                          placeholder="React, Node.js, SQLite"
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div className="form-group">
                          <label className="form-label">Live URL</label>
                          <input 
                            type="url" 
                            value={proj.liveUrl || ''}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx].liveUrl = e.target.value;
                              setPortfolio({ ...portfolio, projects: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">GitHub URL</label>
                          <input 
                            type="url" 
                            value={proj.githubUrl || ''}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx].githubUrl = e.target.value;
                              setPortfolio({ ...portfolio, projects: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '0.65rem' }}>
                        <label className="form-label">Project Screenshot / Thumbnail</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input 
                            type="text" 
                            value={proj.imageUrl || ''}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx].imageUrl = e.target.value;
                              setPortfolio({ ...portfolio, projects: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input" 
                            placeholder="https://... or upload local image"
                          />
                          <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <Upload style={{ width: '13px', height: '13px' }} />
                            <span>Upload</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleProjectImageUpload(idx, e)} 
                              style={{ display: 'none' }} 
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Experience Timeline</h3>
                  <button onClick={handleAddExperience} className="btn btn-outline btn-sm">
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Experience
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <InlineTypographyControl 
                    title="Role &amp; Titles" 
                    fontKey="cardTitleFont" 
                    colorKey="cardTitleColor" 
                    weightKey="cardTitleWeight" 
                    styleKey="cardTitleStyle" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#ffffff"
                  />
                  <InlineTypographyControl 
                    title="Summaries" 
                    fontKey="bodyFont" 
                    colorKey="bodyTextColor" 
                    weightKey="bodyWeight" 
                    styleKey="bodyStyle" 
                    themeConfig={portfolio.themeConfig || {}} 
                    onChange={(key, val) => handleFieldChange('themeConfig', key, val)}
                    defaultColor="#cbd5e1"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {portfolio.experience?.map((exp, idx) => (
                    <div key={idx} style={{ background: '#151d30', border: '1px solid #334155', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#93c5fd', fontWeight: 700 }}>Role #{idx + 1}</span>
                        <button onClick={() => handleRemoveExperience(idx)} style={{ background: '#7f1d1d', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '0.35rem 0.5rem', borderRadius: '6px' }} title="Delete Experience">
                          <Trash2 style={{ width: '15px', height: '15px' }} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Job Title / Role</label>
                        <input 
                          type="text" 
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...portfolio.experience];
                            updated[idx].role = e.target.value;
                            setPortfolio({ ...portfolio, experience: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-input"
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div className="form-group">
                          <label className="form-label">Company</label>
                          <input 
                            type="text" 
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...portfolio.experience];
                              updated[idx].company = e.target.value;
                              setPortfolio({ ...portfolio, experience: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Period</label>
                          <input 
                            type="text" 
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...portfolio.experience];
                              updated[idx].period = e.target.value;
                              setPortfolio({ ...portfolio, experience: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                            placeholder="2022 - Present"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Description &amp; Achievements</label>
                        <textarea 
                          value={exp.description}
                          onChange={(e) => {
                            const updated = [...portfolio.experience];
                            updated[idx].description = e.target.value;
                            setPortfolio({ ...portfolio, experience: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-textarea"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {activeTab === 'education' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Education &amp; Academic History</h3>
                  <button onClick={handleAddEducation} className="btn btn-outline btn-sm">
                    <Plus style={{ width: '14px', height: '14px' }} /> Add Education
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {portfolio.education?.map((edu, idx) => (
                    <div key={idx} style={{ background: '#151d30', border: '1px solid #334155', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#93c5fd', fontWeight: 700 }}>Degree #{idx + 1}</span>
                        <button onClick={() => handleRemoveEducation(idx)} style={{ background: '#7f1d1d', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '0.35rem 0.5rem', borderRadius: '6px' }} title="Delete Degree">
                          <Trash2 style={{ width: '15px', height: '15px' }} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Degree / Program</label>
                        <input 
                          type="text" 
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...portfolio.education];
                            updated[idx].degree = e.target.value;
                            setPortfolio({ ...portfolio, education: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-input"
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                        <div className="form-group">
                          <label className="form-label">Institution / College</label>
                          <input 
                            type="text" 
                            value={edu.school}
                            onChange={(e) => {
                              const updated = [...portfolio.education];
                              updated[idx].school = e.target.value;
                              setPortfolio({ ...portfolio, education: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Year / Class</label>
                          <input 
                            type="text" 
                            value={edu.year}
                            onChange={(e) => {
                              const updated = [...portfolio.education];
                              updated[idx].year = e.target.value;
                              setPortfolio({ ...portfolio, education: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">CGPA / Grade</label>
                        <input 
                          type="text" 
                          value={edu.grade || ''}
                          onChange={(e) => {
                            const updated = [...portfolio.education];
                            updated[idx].grade = e.target.value;
                            setPortfolio({ ...portfolio, education: updated });
                            setSaveStatus('Unsaved Changes');
                          }}
                          className="form-input"
                          placeholder="e.g. 9.1 CGPA"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CERTIFICATIONS & VERIFIED CREDENTIALS */}
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: 0 }}>Certifications &amp; Credentials</h3>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0.2rem 0 0' }}>Licenses, verified courses &amp; certifications for student/fresher resumes</p>
                    </div>
                    <button onClick={handleAddCertification} className="btn btn-outline btn-sm">
                      <Plus style={{ width: '14px', height: '14px' }} /> Add Certification
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(portfolio.certifications || []).map((cert, idx) => (
                      <div key={idx} style={{ background: '#151d30', border: '1px solid #334155', borderRadius: '10px', padding: '1.15rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                          <span style={{ fontSize: '0.88rem', color: '#86efac', fontWeight: 700 }}>Cert #{idx + 1}</span>
                          <button onClick={() => handleRemoveCertification(idx)} style={{ background: '#7f1d1d', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '0.3rem 0.45rem', borderRadius: '6px' }} title="Delete Certification">
                            <Trash2 style={{ width: '15px', height: '15px' }} />
                          </button>
                        </div>
                        <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                          <label className="form-label" style={{ fontSize: '0.78rem' }}>Certificate Name</label>
                          <input 
                            type="text"
                            value={cert.name || ''}
                            onChange={(e) => {
                              const updated = [...(portfolio.certifications || [])];
                              updated[idx] = { ...updated[idx], name: e.target.value };
                              setPortfolio({ ...portfolio, certifications: updated });
                              setSaveStatus('Unsaved Changes');
                            }}
                            className="form-input"
                            placeholder="e.g. AWS Certified Cloud Practitioner"
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                          <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.78rem' }}>Issuing Organization</label>
                            <input 
                              type="text"
                              value={cert.issuer || ''}
                              onChange={(e) => {
                                const updated = [...(portfolio.certifications || [])];
                                updated[idx] = { ...updated[idx], issuer: e.target.value };
                                setPortfolio({ ...portfolio, certifications: updated });
                                setSaveStatus('Unsaved Changes');
                              }}
                              className="form-input"
                              placeholder="e.g. Amazon Web Services"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.78rem' }}>Issue Date / Year</label>
                            <input 
                              type="text"
                              value={cert.date || ''}
                              onChange={(e) => {
                                const updated = [...(portfolio.certifications || [])];
                                updated[idx] = { ...updated[idx], date: e.target.value };
                                setPortfolio({ ...portfolio, certifications: updated });
                                setSaveStatus('Unsaved Changes');
                              }}
                              className="form-input"
                              placeholder="e.g. 2024"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SOCIAL */}
            {activeTab === 'social' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Social Profiles</h3>
                
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input 
                    type="url" 
                    value={portfolio.socialLinks?.github || ''}
                    onChange={(e) => handleFieldChange('socialLinks', 'github', e.target.value)}
                    className="form-input" 
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input 
                    type="url" 
                    value={portfolio.socialLinks?.linkedin || ''}
                    onChange={(e) => handleFieldChange('socialLinks', 'linkedin', e.target.value)}
                    className="form-input" 
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Twitter / X URL</label>
                  <input 
                    type="url" 
                    value={portfolio.socialLinks?.twitter || ''}
                    onChange={(e) => handleFieldChange('socialLinks', 'twitter', e.target.value)}
                    className="form-input" 
                    placeholder="https://x.com/..."
                  />
                </div>

                {/* Custom Unique Slug */}
                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Public Portfolio URL Slug</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0 0.75rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/p/</span>
                    <input 
                      type="text" 
                      value={portfolio.slug || ''}
                      onChange={(e) => handleFieldChange(null, 'slug', e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: '#fff', padding: '0.65rem 0.25rem', width: '100%', outline: 'none' }}
                      placeholder="custom-slug"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT: Live Preview Canvas */}
        <div style={{
          flex: 1,
          background: '#04060a',
          overflow: 'auto',
          display: isMobileScreen && mobileViewMode !== 'preview' ? 'none' : 'flex',
          justifyContent: 'center',
          padding: previewDevice === 'desktop' && !isMobileScreen ? '0' : '1.5rem 0.5rem',
          width: isMobileScreen ? '100%' : 'auto'
        }}>
          <div style={{
            width: isMobileScreen ? '100%' : previewDevice === 'mobile' ? '390px' : previewDevice === 'tablet' ? '768px' : '100%',
            maxWidth: '100%',
            transition: 'width 0.3s ease',
            background: '#090d16',
            borderRadius: previewDevice === 'desktop' && !isMobileScreen ? '0' : '16px',
            overflow: 'auto',
            position: 'relative',
            border: previewDevice === 'desktop' && !isMobileScreen ? 'none' : '4px solid #1e293b',
            boxShadow: previewDevice === 'desktop' && !isMobileScreen ? 'none' : '0 25px 50px rgba(0,0,0,0.8)'
          }}>
            <TemplateRenderer 
              templateId={portfolio.templateId} 
              portfolio={portfolio} 
              isPreview={true} 
            />
          </div>
        </div>

      </div>

      {/* Template Switcher Modal */}
      {isTemplateModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(5, 8, 14, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '900px',
            width: '100%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            background: '#0d1322'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Switch Template</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  All your content is preserved 100% across all 55 templates.
                </p>
              </div>
              <button onClick={() => setIsTemplateModalOpen(false)} className="btn btn-outline btn-sm">
                Close
              </button>
            </div>

            <div style={{ overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', paddingRight: '0.5rem' }}>
              {TEMPLATES.map(tpl => {
                const isCurrent = portfolio.templateId === tpl.id;

                return (
                  <div 
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    style={{
                      background: isCurrent ? '#1e1b4b' : '#151d30',
                      border: isCurrent ? '2px solid #818cf8' : '1px solid #334155',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isCurrent ? '0 0 15px rgba(99, 102, 241, 0.35)' : 'none',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <TemplateThumbnail tpl={tpl} height="120px" />
                    <div style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 700 }}>#{tpl.number}</span>
                        {isCurrent && (
                          <span style={{ fontSize: '0.7rem', background: '#4f46e5', color: '#fff', padding: '0.12rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
                            Active
                          </span>
                        )}
                      </div>
                      <h4 style={{ color: '#fff', fontSize: '0.96rem', fontWeight: 700, marginBottom: '0.2rem' }}>{tpl.name}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.3 }}>{tpl.categoryName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Satisfaction & Response Modal */}
      <SatisfactionModal 
        isOpen={isSatisfactionModalOpen}
        onClose={() => setIsSatisfactionModalOpen(false)}
        portfolio={portfolio}
        onEditAgain={() => setIsSatisfactionModalOpen(false)}
      />

      {/* Downloaded Website Notice Modal */}
      {downloadSuccessModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          background: 'rgba(5, 8, 14, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '540px',
            width: '100%',
            padding: '2.5rem',
            borderRadius: '24px',
            textAlign: 'center',
            background: '#0d1322',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#10b981'
            }}>
              <Check style={{ width: '32px', height: '32px' }} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
              Portfolio Downloaded Successfully!
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Your complete, standalone portfolio website has been saved as:
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px dashed rgba(16, 185, 129, 0.4)',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              color: '#34d399',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              wordBreak: 'break-all'
            }}>
              📥 {downloadedFilename}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
              fontSize: '0.85rem',
              color: '#cbd5e1',
              lineHeight: 1.6
            }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>🌐 How to view in your browser:</strong>
              1. Open your computer's <strong>Downloads</strong> folder.<br />
              2. Double-click <strong>{downloadedFilename}</strong>.<br />
              3. It will open in Google Chrome, Microsoft Edge, Safari, or Firefox and render <strong>just like any real online website</strong> — completely offline with zero extra setup!
            </div>

            <button 
              onClick={() => setDownloadSuccessModal(false)}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                fontWeight: 700
              }}
            >
              Great, Continue Editing
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
