import React, { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getTemplateById } from '../data/templatesData';
import TemplateRenderer from '../components/templates/TemplateRenderer';
import { useAuth } from '../context/AuthContext';
import { downloadPortfolioAsHtml } from '../utils/portfolioExporter';
import AdBanner from '../components/common/AdBanner';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ArrowLeft, 
  Check, 
  Crown, 
  Lock, 
  Sparkles,
  Download,
  Edit3,
  X,
  Plus,
  Trash2,
  RotateCcw,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Mail,
  ArrowRight
} from 'lucide-react';

const SAMPLE_PREVIEW_PORTFOLIO = {
  title: 'Alex River — Selected Portfolio & Works',
  templateId: 'open-book',
  themeConfig: { bookCoverTheme: 'leather', accentColor: '#3b82f6' },
  profile: {
    fullName: 'Alex River',
    headline: 'Senior Full Stack & AI Systems Engineer',
    bio: 'Passionate about crafting resilient web architectures, elegant user experiences, and high-performance interactive digital tools.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Bengaluru, India',
    email: 'alex.river@example.com',
    phone: '+91 98765 43210',
    website: 'https://alexriver.dev',
    resumeUrl: 'https://example.com/resume.pdf',
    statusBadge: 'Open to Opportunities'
  },
  skills: [
    { name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
    { name: 'Node.js / Express', category: 'Backend', level: 'Expert' },
    { name: 'TypeScript', category: 'Languages', level: 'Advanced' },
    { name: 'PostgreSQL / SQLite', category: 'Database', level: 'Advanced' },
    { name: 'Tailwind / Modern CSS', category: 'Frontend', level: 'Expert' },
    { name: 'Docker / Cloud', category: 'DevOps', level: 'Intermediate' }
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
  }
};

export default function TemplatePreview() {
  const { templateId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [isEditModalOpen, setIsEditModalOpen] = useState(() => searchParams.get('edit') === 'true');
  const [editTab, setEditTab] = useState('profile'); // profile, skills, projects, experience, contact

  const template = getTemplateById(templateId);

  // If accessed with ?edit=true, automatically redirect straight to the full Studio Editor page
  React.useEffect(() => {
    if (searchParams.get('edit') === 'true' && template?.id) {
      navigate(`/editor/new?template=${template.id}`, { replace: true });
    }
  }, [searchParams, template, navigate]);

  const [portfolioData, setPortfolioData] = useState(() => ({
    ...SAMPLE_PREVIEW_PORTFOLIO,
    title: `${SAMPLE_PREVIEW_PORTFOLIO.profile.fullName} — ${template.name}`,
    templateId: template.id,
    themeConfig: {
      ...SAMPLE_PREVIEW_PORTFOLIO.themeConfig,
      accentColor: template.accentColor || '#3b82f6'
    }
  }));

  const handleProfileChange = (field, val) => {
    setPortfolioData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: val
      }
    }));
  };

  const handleSocialChange = (platform, val) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: val
      }
    }));
  };

  const handleAddSkill = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: 'New Skill', category: 'General', level: 'Intermediate' }]
    }));
  };

  const handleSkillChange = (idx, field, val) => {
    setPortfolioData(prev => {
      const updated = [...prev.skills];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, skills: updated };
    });
  };

  const handleRemoveSkill = (idx) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx)
    }));
  };

  const handleAddProject = () => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: 'New Featured Project',
          description: 'A brief description of key challenges, achievements, and technology stack.',
          techStack: ['React', 'Node.js'],
          liveUrl: 'https://example.com',
          githubUrl: 'https://github.com'
        }
      ]
    }));
  };

  const handleProjectChange = (idx, field, val) => {
    setPortfolioData(prev => {
      const updated = [...prev.projects];
      if (field === 'techStack') {
        updated[idx] = { ...updated[idx], techStack: typeof val === 'string' ? val.split(',').map(s => s.trim()) : val };
      } else {
        updated[idx] = { ...updated[idx], [field]: val };
      }
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProject = (idx) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const handleResetData = () => {
    setPortfolioData({
      ...SAMPLE_PREVIEW_PORTFOLIO,
      title: `Alex River — ${template.name}`,
      templateId: template.id
    });
  };

  const handleUseTemplate = () => {
    navigate(`/editor/new?template=${template.id}`, {
      state: { customData: portfolioData }
    });
  };

  const getViewportWidth = () => {
    switch (deviceMode) {
      case 'mobile': return '390px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#07090e', overflow: 'hidden' }}>
      
      {/* Top Preview Control Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.65rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        zIndex: 50
      }}>
        {/* Left: Back & Template Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/templates" className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.6rem' }} title="Back to Templates Gallery">
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 800 }}>{template.name}</h2>
              {template.isPremium ? (
                <span className="badge badge-premium">
                  <Crown style={{ width: '11px', height: '11px' }} /> Premium
                </span>
              ) : (
                <span className="badge badge-free">Free</span>
              )}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{template.categoryName}</span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(2, 6, 23, 0.6)',
          borderRadius: '8px',
          padding: '0.2rem',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button 
            onClick={() => setDeviceMode('desktop')} 
            className={`btn btn-sm ${deviceMode === 'desktop' ? 'btn-secondary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.3rem 0.65rem' }}
            title="Desktop Mode (Full)"
          >
            <Monitor style={{ width: '14px', height: '14px' }} />
            <span>Desktop</span>
          </button>
          <button 
            onClick={() => setDeviceMode('tablet')} 
            className={`btn btn-sm ${deviceMode === 'tablet' ? 'btn-secondary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.3rem 0.65rem' }}
            title="Tablet Mode (768px)"
          >
            <Tablet style={{ width: '14px', height: '14px' }} />
            <span>Tablet</span>
          </button>
          <button 
            onClick={() => setDeviceMode('mobile')} 
            className={`btn btn-sm ${deviceMode === 'mobile' ? 'btn-secondary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.3rem 0.65rem' }}
            title="Mobile Mode (390px)"
          >
            <Smartphone style={{ width: '14px', height: '14px' }} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* PRIMARY: Enter / Edit Data Button - Navigates directly to full Studio Editor webpage */}
          <button 
            onClick={handleUseTemplate}
            className="btn btn-primary btn-sm interactive-hover-btn"
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              border: 'none',
              color: '#fff',
              fontWeight: 800,
              padding: '0.45rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
            }}
            title="Open full studio editor to enter your profile, projects, and style your portfolio"
          >
            <Edit3 style={{ width: '14px', height: '14px', color: '#fff' }} />
            <span>Customize in Studio Editor</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>

          <button 
            onClick={() => {
              downloadPortfolioAsHtml({
                ...portfolioData,
                title: `${portfolioData.profile?.fullName || template.name} Portfolio`,
                templateId: template.id
              });
            }} 
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', borderColor: '#38bdf8', color: '#38bdf8' }}
            title="Download Standalone HTML (Runs 100% Offline)"
          >
            <Download style={{ width: '14px', height: '14px' }} />
            <span>Download HTML</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Simulator */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: deviceMode === 'desktop' ? '0' : '2rem 1rem',
        background: '#04060a'
      }}>
        <div style={{
          width: getViewportWidth(),
          maxWidth: '100%',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          background: (template?.category === 'book' || ['open-book', 'openbook', 'vintage-journal', 'the-biography', 'mystic-pages', 'flipfolio'].includes(template?.id)) 
            ? 'radial-gradient(ellipse at 50% 40%, #1e1b18 0%, #111116 65%, #08080c 100%)' 
            : '#090d16',
          borderRadius: deviceMode === 'desktop' ? '0' : '16px',
          overflow: 'auto',
          boxShadow: deviceMode === 'desktop' ? 'none' : '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: deviceMode === 'desktop' ? 'none' : '8px solid #1e293b'
        }}>
          {/* Actual live rendering of the selected template with interactive data */}
          <TemplateRenderer 
            templateId={template.id} 
            portfolio={portfolioData}
            isPreview={true} 
          />
        </div>
      </div>

      {/* ============================================================
          INTERACTIVE "ENTER YOUR DATA" DRAWER / MODAL
          Allows user to enter their data to make their portfolio live
          ============================================================ */}
      {isEditModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(2, 6, 23, 0.78)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              height: '100%',
              background: 'rgba(15, 23, 42, 0.98)',
              borderLeft: '1.5px solid rgba(99, 102, 241, 0.35)',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Drawer Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.6)'
            }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Edit3 style={{ width: '18px', height: '18px', color: '#818cf8' }} />
                  <span>Enter Your Data</span>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  Live changes will update this template preview instantly
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  onClick={handleResetData}
                  className="btn btn-outline btn-xs"
                  title="Reset to default sample"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <RotateCcw style={{ width: '12px', height: '12px' }} />
                  <span>Reset</span>
                </button>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-secondary btn-xs"
                  style={{ borderRadius: '50%', padding: '0.4rem' }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>

            {/* Dedicated Ad Section inside Preview Drawer */}
            <AdBanner slot="template-preview" format="horizontal" style={{ margin: '0.75rem 1rem' }} />

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              padding: '0.5rem 1rem',
              gap: '0.35rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(2, 6, 23, 0.4)',
              overflowX: 'auto'
            }}>
              {[
                { id: 'profile', name: 'Profile', icon: <User style={{ width: '13px', height: '13px' }} /> },
                { id: 'skills', name: 'Skills', icon: <Code style={{ width: '13px', height: '13px' }} /> },
                { id: 'projects', name: 'Projects', icon: <Sparkles style={{ width: '13px', height: '13px' }} /> },
                { id: 'experience', name: 'Journey', icon: <Briefcase style={{ width: '13px', height: '13px' }} /> },
                { id: 'contact', name: 'Contact', icon: <Mail style={{ width: '13px', height: '13px' }} /> }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setEditTab(t.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: editTab === t.id ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                    color: editTab === t.id ? '#a5b4fc' : '#94a3b8',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {t.icon}
                  <span>{t.name}</span>
                </button>
              ))}
            </div>

            {/* Drawer Body Form */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* TAB 1: Profile */}
              {editTab === 'profile' && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={portfolioData.profile.fullName || ''} 
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      className="form-input"
                      placeholder="e.g. Sarah Connor"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Role / Professional Headline</label>
                    <input 
                      type="text" 
                      value={portfolioData.profile.headline || ''} 
                      onChange={(e) => handleProfileChange('headline', e.target.value)}
                      className="form-input"
                      placeholder="e.g. Lead Cloud Architect & Full Stack Developer"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Professional Bio / Intro</label>
                    <textarea 
                      rows={4}
                      value={portfolioData.profile.bio || ''} 
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="form-textarea"
                      placeholder="Tell visitors about your background, expertise, and what drives your work..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Avatar / Profile Photo URL</label>
                    <input 
                      type="text" 
                      value={portfolioData.profile.avatarUrl || ''} 
                      onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                      className="form-input"
                      placeholder="https://..."
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.84rem' }}>Location</label>
                      <input 
                        type="text" 
                        value={portfolioData.profile.location || ''} 
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        className="form-input"
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.84rem' }}>Status Badge</label>
                      <input 
                        type="text" 
                        value={portfolioData.profile.statusBadge || ''} 
                        onChange={(e) => handleProfileChange('statusBadge', e.target.value)}
                        className="form-input"
                        placeholder="e.g. Available for Hire"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: Skills */}
              {editTab === 'skills' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Proficiencies List ({portfolioData.skills.length})</span>
                    <button onClick={handleAddSkill} className="btn btn-secondary btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Plus style={{ width: '13px', height: '13px' }} /> Add Skill
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {portfolioData.skills.map((s, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.75rem', display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          value={s.name} 
                          onChange={(e) => handleSkillChange(i, 'name', e.target.value)}
                          className="form-input"
                          style={{ flex: 1.5, padding: '0.4rem 0.65rem', fontSize: '0.84rem' }}
                          placeholder="Skill name"
                        />
                        <input 
                          type="text" 
                          value={s.level} 
                          onChange={(e) => handleSkillChange(i, 'level', e.target.value)}
                          className="form-input"
                          style={{ flex: 1, padding: '0.4rem 0.65rem', fontSize: '0.84rem' }}
                          placeholder="Level"
                        />
                        <button 
                          onClick={() => handleRemoveSkill(i)} 
                          className="btn btn-outline btn-xs"
                          style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', padding: '0.45rem' }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* TAB 3: Projects */}
              {editTab === 'projects' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Featured Projects ({portfolioData.projects.length})</span>
                    <button onClick={handleAddProject} className="btn btn-secondary btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Plus style={{ width: '13px', height: '13px' }} /> Add Project
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {portfolioData.projects.map((proj, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 800 }}>PROJECT #{i + 1}</span>
                          <button onClick={() => handleRemoveProject(i)} className="btn btn-outline btn-xs" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', padding: '0.3rem 0.5rem' }}>
                            <Trash2 style={{ width: '13px', height: '13px' }} /> Remove
                          </button>
                        </div>

                        <input 
                          type="text" 
                          value={proj.title} 
                          onChange={(e) => handleProjectChange(i, 'title', e.target.value)}
                          className="form-input"
                          style={{ fontSize: '0.9rem', fontWeight: 700 }}
                          placeholder="Project Title"
                        />

                        <textarea 
                          rows={2}
                          value={proj.description} 
                          onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
                          className="form-textarea"
                          style={{ fontSize: '0.84rem' }}
                          placeholder="Project description & key features"
                        />

                        <input 
                          type="text" 
                          value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack} 
                          onChange={(e) => handleProjectChange(i, 'techStack', e.target.value)}
                          className="form-input"
                          style={{ fontSize: '0.84rem' }}
                          placeholder="Tech Stack (comma separated, e.g. React, Node, AWS)"
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <input 
                            type="text" 
                            value={proj.liveUrl || ''} 
                            onChange={(e) => handleProjectChange(i, 'liveUrl', e.target.value)}
                            className="form-input"
                            style={{ fontSize: '0.82rem' }}
                            placeholder="Live Demo URL"
                          />
                          <input 
                            type="text" 
                            value={proj.githubUrl || ''} 
                            onChange={(e) => handleProjectChange(i, 'githubUrl', e.target.value)}
                            className="form-input"
                            style={{ fontSize: '0.82rem' }}
                            placeholder="GitHub Repository URL"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* TAB 4: Journey & Experience */}
              {editTab === 'experience' && (
                <>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Career Journey</h4>
                  {portfolioData.experience.map((exp, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <input 
                        type="text" 
                        value={exp.role} 
                        onChange={(e) => {
                          const updated = [...portfolioData.experience];
                          updated[i] = { ...updated[i], role: e.target.value };
                          setPortfolioData(prev => ({ ...prev, experience: updated }));
                        }}
                        className="form-input"
                        placeholder="Job Role / Position"
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.65rem' }}>
                        <input 
                          type="text" 
                          value={exp.company} 
                          onChange={(e) => {
                            const updated = [...portfolioData.experience];
                            updated[i] = { ...updated[i], company: e.target.value };
                            setPortfolioData(prev => ({ ...prev, experience: updated }));
                          }}
                          className="form-input"
                          placeholder="Company"
                        />
                        <input 
                          type="text" 
                          value={exp.period} 
                          onChange={(e) => {
                            const updated = [...portfolioData.experience];
                            updated[i] = { ...updated[i], period: e.target.value };
                            setPortfolioData(prev => ({ ...prev, experience: updated }));
                          }}
                          className="form-input"
                          placeholder="e.g. 2023 - Present"
                        />
                      </div>
                      <textarea 
                        rows={2}
                        value={exp.description} 
                        onChange={(e) => {
                          const updated = [...portfolioData.experience];
                          updated[i] = { ...updated[i], description: e.target.value };
                          setPortfolioData(prev => ({ ...prev, experience: updated }));
                        }}
                        className="form-textarea"
                        placeholder="Accomplishments & scope"
                      />
                    </div>
                  ))}

                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginTop: '1rem' }}>Education</h4>
                  {portfolioData.education.map((edu, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <input 
                        type="text" 
                        value={edu.degree} 
                        onChange={(e) => {
                          const updated = [...portfolioData.education];
                          updated[i] = { ...updated[i], degree: e.target.value };
                          setPortfolioData(prev => ({ ...prev, education: updated }));
                        }}
                        className="form-input"
                        placeholder="Degree / Program"
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.65rem' }}>
                        <input 
                          type="text" 
                          value={edu.school} 
                          onChange={(e) => {
                            const updated = [...portfolioData.education];
                            updated[i] = { ...updated[i], school: e.target.value };
                            setPortfolioData(prev => ({ ...prev, education: updated }));
                          }}
                          className="form-input"
                          placeholder="University / College"
                        />
                        <input 
                          type="text" 
                          value={edu.year} 
                          onChange={(e) => {
                            const updated = [...portfolioData.education];
                            updated[i] = { ...updated[i], year: e.target.value };
                            setPortfolioData(prev => ({ ...prev, education: updated }));
                          }}
                          className="form-input"
                          placeholder="Year / Period"
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* TAB 5: Contact & Social */}
              {editTab === 'contact' && (
                <>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={portfolioData.profile.email || ''} 
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="form-input"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Phone Number</label>
                    <input 
                      type="text" 
                      value={portfolioData.profile.phone || ''} 
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Website / Blog URL</label>
                    <input 
                      type="text" 
                      value={portfolioData.profile.website || ''} 
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      className="form-input"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>Resume PDF Link</label>
                    <input 
                      type="text" 
                      value={portfolioData.profile.resumeUrl || ''} 
                      onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
                      className="form-input"
                      placeholder="https://.../resume.pdf"
                    />
                  </div>

                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.5rem' }}>Social Networks</h4>
                  
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>GitHub Profile</label>
                    <input 
                      type="text" 
                      value={portfolioData.socialLinks.github || ''} 
                      onChange={(e) => handleSocialChange('github', e.target.value)}
                      className="form-input"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.84rem' }}>LinkedIn Profile</label>
                    <input 
                      type="text" 
                      value={portfolioData.socialLinks.linkedin || ''} 
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="form-input"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 23, 42, 0.95)',
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'space-between'
            }}>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Close &amp; Preview
              </button>

              <button 
                onClick={handleUseTemplate}
                className="btn btn-primary btn-sm"
                style={{ flex: 1.5, fontWeight: 800 }}
              >
                <span>Save &amp; Open Studio</span>
                <ArrowRight style={{ width: '14px', height: '14px' }} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
