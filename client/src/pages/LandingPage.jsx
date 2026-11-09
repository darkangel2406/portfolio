import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookEngine from '../components/book/BookEngine';
import CategoryModal from '../components/modals/CategoryModal';
import AdBanner from '../components/common/AdBanner';
import { TEMPLATES, CATEGORIES } from '../data/templatesData';
import { RESUME_TEMPLATES, RESUME_CATEGORIES } from '../data/resumesData';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Check,
  Layers,
  Cpu,
  Smartphone,
  ShieldCheck,
  Zap,
  Lock,
  Globe,
  HelpCircle,
  Eye,
  Crown,
  FileText,
  GraduationCap,
  Download,
  Briefcase,
  Code,
  Palette,
  Compass,
  LayoutDashboard
} from 'lucide-react';

// Sample demonstration portfolio for live interactive 3D book on dashboard
const SAMPLE_BOOK_PORTFOLIO = {
  title: 'Master Works & Journal',
  templateId: 'open-book',
  themeConfig: { bookCoverTheme: 'leather', accentColor: '#3b82f6' },
  profile: {
    fullName: 'Alex River',
    headline: 'Senior Full Stack & AI Systems Engineer',
    bio: 'Architecting high-throughput distributed applications, intuitive developer tooling, and modern interactive digital experiences.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Bengaluru, India',
    email: 'alex@example.com',
    phone: '+91 98765 43210',
    resumeUrl: 'https://example.com/resume.pdf',
    statusBadge: 'Open to Opportunities'
  },
  skills: [
    { name: 'React / Next.js', category: 'Frontend', level: 'Expert' },
    { name: 'Node.js / Express', category: 'Backend', level: 'Expert' },
    { name: 'TypeScript', category: 'Languages', level: 'Advanced' },
    { name: 'PostgreSQL / SQLite', category: 'Database', level: 'Advanced' },
    { name: '3D CSS & Canvas', category: 'Graphics', level: 'Expert' },
    { name: 'Docker / Cloud', category: 'DevOps', level: 'Intermediate' }
  ],
  projects: [
    {
      title: 'Quantum Analytics Engine',
      description: 'Real-time WebSocket streaming telemetry and interactive canvas analytics dashboard with 60fps renders.',
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
      grade: '8.9 CGPA'
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

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const featuredTemplates = TEMPLATES.filter(t =>
    ['open-book', 'neon-dev', 'campus-launch', 'minimal-engineer', 'flipfolio', 'retro-future'].includes(t.id)
  );

  const faqs = [
    {
      q: 'What is the signature 3D Book Portfolio?',
      a: 'Unlike traditional flat web pages, our Book Engine renders your portfolio as an interactive 3D digital book with realistic leather bindings, dual-page desktop spreads, synthesized audio page turns, table of contents jumps, and touch-ready mobile reader mode.'
    },
    {
      q: 'How does the Standalone Portfolio Download work?',
      a: 'When you click "Download Portfolio", FolioVerse compiles your complete portfolio into a single, 100% self-contained .html file directly into your computer’s Downloads folder. You can double-click this file to open it in Chrome, Edge, Safari, or Firefox, and it renders and interacts exactly like any live website with zero hosting fees.'
    },
    {
      q: 'What college course templates are included in Resume Builder?',
      a: 'We offer 21+ discipline-specific templates with course emojis, tailored box layouts, and verified seals — including B.Sc/M.Sc Agriculture (Agri), Computer Science & AI, Mechanical & Robotics, Healthcare & Pre-Med, Business & MBA, Law, Design, and more.'
    },
    {
      q: 'Can I switch templates without losing my data?',
      a: 'Yes! Both the Portfolio Creator and Resume Builder use unified schemas, meaning you can switch between visual styles, boxes, and color palettes at any time without losing any work.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent' }}>

      {/* ============================================================
          CLEAN & SOFT CREATIVE PORTALS HUB HERO
          ============================================================ */}
      <section style={{
        position: 'relative',
        padding: '3rem 0 2.5rem',
        textAlign: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(99, 102, 241, 0.14)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            fontSize: 'clamp(0.75rem, 3.2vw, 0.92rem)',
            fontWeight: 700,
            color: '#c084fc',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            <Sparkles style={{ width: '15px', height: '15px', flexShrink: 0 }} />
            <span>Interactive 3D Portfolio &amp; College Resume Studio</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 5.5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            maxWidth: '1020px',
            margin: '0 auto 1.25rem',
            letterSpacing: '-0.03em',
            wordBreak: 'break-word'
          }}>
            Craft Extraordinary <span className="text-gradient">Portfolios &amp; Resumes</span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 3.2vw, 1.18rem)',
            color: 'var(--text-muted)',
            maxWidth: '780px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Experience physical 3D book page flips with authentic acoustic rustle, switch across <strong>5 interactive animation backgrounds</strong>, and build ATS-optimized resumes tailored to your college degree.
          </p>

          {/* Dedicated Ad Section 1: Hero Ad Slot */}
          <AdBanner slot="landing-hero" format="horizontal" />

          {/* DUAL CREATION GATEWAY CARDS (CLEAN, FAST & SOFT) */}
          <div
            className="creation-gateway-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.75rem',
              maxWidth: '980px',
              margin: '2rem auto 2.5rem'
            }}
          >

            {/* PORTFOLIO CREATION CARD */}
            <div
              className="glass-panel interactive-hover-card gateway-card"
              style={{
                background: 'rgba(15, 23, 42, 0.72)',
                border: '2px solid rgba(99, 102, 241, 0.28)',
                borderRadius: '20px',
                padding: '1.75rem 1.4rem',
                textAlign: 'left',
                position: 'relative',
                boxShadow: 'var(--shadow-md)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.45)',
                  flexShrink: 0
                }}>
                  <BookOpen style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 4.5vw, 1.65rem)',
                    fontWeight: 800,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '0.2rem',
                    flexWrap: 'wrap'
                  }}>
                    <span>Portfolio Creation</span>
                    <span style={{ fontSize: '1.3rem' }}>🎨</span>
                  </h2>
                  <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 600 }}>
                    55 Designer Templates &bull; 3D Interactive Books
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                55 distinctive templates with 3D physical book page turns, 5 interactive animated canvas backgrounds, bento grid box alignments, and instant download to your computer.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                <span className="badge badge-signature" style={{ fontSize: '0.75rem' }}>📖 3D Page Flip</span>
                <span className="badge badge-free" style={{ fontSize: '0.75rem' }}>🕸️ 5 Animated BGs</span>
                <span className="badge badge-signature" style={{ fontSize: '0.75rem' }}>💾 HTML Download</span>
              </div>

              {/* START CREATION BUTTON: Direct entry to templates selection, 3D preview & downloads */}
              <Link
                to="/templates"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.8rem 1.2rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.45)',
                  boxSizing: 'border-box'
                }}
              >
                <span>Start Creation</span>
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </Link>
            </div>

            {/* RESUME CREATION CARD */}
            <div
              className="glass-panel interactive-hover-card gateway-card"
              style={{
                background: 'rgba(15, 23, 42, 0.72)',
                border: '2px solid rgba(16, 185, 129, 0.28)',
                borderRadius: '20px',
                padding: '1.75rem 1.4rem',
                textAlign: 'left',
                position: 'relative',
                boxShadow: 'var(--shadow-md)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.45)',
                  flexShrink: 0
                }}>
                  <FileText style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 4.5vw, 1.65rem)',
                    fontWeight: 800,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '0.2rem',
                    flexWrap: 'wrap'
                  }}>
                    <span>Resume Creation</span>
                    <span style={{ fontSize: '1.3rem' }}>📄</span>
                  </h2>
                  <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                    21+ Degree Streams &bull; ATS Optimized Formatting
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                21+ specialized college course templates with custom emojis and boxed layouts — featuring Agriculture 🌾, CS 💻, Engineering ⚙️, Medical 🩺, MBA 💼, and Law ⚖️.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
                <span className="badge badge-free" style={{ fontSize: '0.75rem', borderColor: '#10b981', color: '#34d399' }}>🌾 Agri Course</span>
                <span className="badge badge-free" style={{ fontSize: '0.75rem' }}>🎓 Verified Seals</span>
                <span className="badge badge-free" style={{ fontSize: '0.75rem' }}>⚡ ATS Scorer</span>
              </div>

              {/* START CREATION BUTTON: Direct entry to resume templates gallery with interactive preview */}
              <Link
                to="/resume-templates"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderColor: '#10b981',
                  padding: '0.8rem 1.2rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.45)',
                  boxSizing: 'border-box'
                }}
              >
                <span>Start Creation</span>
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </Link>
            </div>

          </div>

          {/* Quick Universal Filter Trigger */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="btn btn-secondary btn-lg interactive-hover-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Sparkles style={{ width: '18px', height: '18px', color: '#c084fc' }} />
              <span>Explore All Categories Across Both Portals</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS THREE SIMPLE STEPS
          ============================================================ */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-signature" style={{ marginBottom: '0.75rem' }}>Effortless Creation</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              How FolioVerse Works
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              From initial discipline selection to complete standalone downloads.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '1.25rem', fontWeight: 800, fontSize: '1.2rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Select Your Path</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Choose Portfolio Creator for interactive 3D books &amp; multi-page web portfolios, or Resume Builder for college degree-specific resumes.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', marginBottom: '1.25rem', fontWeight: 800, fontSize: '1.2rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Customize Live</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Add your career milestones, projects, coursework, and skills with real-time responsive split preview and audio paper feedback.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '1.25rem', fontWeight: 800, fontSize: '1.2rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Download Standalone</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Click Download Portfolio to save a standalone HTML website into your computer’s Downloads that opens directly in any browser!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Dedicated Ad Section 2: Pre-FAQ Mid Banner */}
      <section style={{ padding: '1rem 0' }}>
        <div className="container">
          <AdBanner slot="landing-footer" format="horizontal" />
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: '4rem 0 6rem', background: 'rgba(15, 23, 42, 0.3)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-free" style={{ marginBottom: '0.75rem' }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800 }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-panel"
                style={{ borderRadius: '14px', overflow: 'hidden' }}
              >
                <div
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  style={{
                    padding: '1.1rem 1.35rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)',
                    color: '#fff',
                    gap: '0.75rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: '#818cf8', transform: activeFaq === index ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
                </div>
                {activeFaq === index && (
                  <div style={{ padding: '0 1.35rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SELECTION MODAL */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />

    </div>
  );
}
