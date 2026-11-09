import React from 'react';
import { ShieldCheck, Lock, Globe, FileText, CheckCircle2 } from 'lucide-react';
import AdBanner from '../components/common/AdBanner';

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '3.5rem 0 6rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '840px', padding: '0 1rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <ShieldCheck style={{ width: '28px', height: '28px', color: '#10b981' }} />
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Privacy Policy
          </h1>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
          Last Updated: November 2026 &bull; FolioVerse Free Platform
        </p>

        {/* Dedicated Ad Section for Legal Pages */}
        <AdBanner slot="privacy-policy" format="horizontal" style={{ margin: '0 auto 2rem' }} />

        <div className="glass-panel" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, color: '#cbd5e1', fontSize: '0.94rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> 1. Overview &amp; Free Service Model
            </h2>
            <p>
              FolioVerse provides 100% free portfolio and college resume creation tools. We do not require credit cards, payment subscriptions, or paid unlock packages. All 55 portfolio templates, 31+ academic stream resumes, and 3D background animation engines are available freely to all registered creators. Platform operations are sustained via non-intrusive reserved ad space sections and developer sponsorships.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <FileText style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> 2. Information We Collect
            </h2>
            <p>
              When you register on FolioVerse, we collect your name and email address to authenticate your session. When creating resumes and portfolios, you voluntarily enter professional details including biography, academic coursework, GPA, work experience, capstone projects, skills, and links. All candidate photos you upload remain strictly under your control.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Globe style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> 3. Public vs Private Drafts
            </h2>
            <p>
              Portfolios in draft mode are accessible exclusively through your authenticated session. When you click &ldquo;Publish&rdquo;, your portfolio is made available at your customized unique link (e.g. <code>/p/your-slug</code>). You retain absolute authority to edit, change URLs, unpublish, or delete your portfolio anytime.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Lock style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> 4. Client-Side Exports &amp; Data Security
            </h2>
            <p>
              When you download an ATS Resume as a single-page PDF or export your Portfolio as a standalone offline HTML website, the files are compiled and packaged locally directly inside your browser. We never share, sell, or license candidate profiles to third-party recruitment agencies or data brokers.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> 5. Data Portability &amp; Account Deletion
            </h2>
            <p>
              You own all intellectual property in the content you create. You can export complete JSON backups of your portfolios from your Account Settings, or permanently delete your account and all associated portfolios at any time with a single click.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck style={{ width: '18px', height: '18px', color: '#38bdf8' }} /> 6. Company Contact &amp; Support
            </h2>
            <p>
              FolioVerse is owned and operated by <strong>BEZALYNXLABS</strong>. For any privacy inquiries, account support, or data questions, contact our support team at <a href="mailto:bezalynxlabs@gmail.com" style={{ color: '#38bdf8', fontWeight: 600 }}>bezalynxlabs@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
