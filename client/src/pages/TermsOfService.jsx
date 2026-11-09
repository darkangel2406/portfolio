import React from 'react';
import { FileCheck, Sparkles, Shield, UserCheck, AlertTriangle } from 'lucide-react';
import AdBanner from '../components/common/AdBanner';

export default function TermsOfService() {
  return (
    <div style={{ padding: '3.5rem 0 6rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '840px', padding: '0 1rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <FileCheck style={{ width: '28px', height: '28px', color: '#a855f7' }} />
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Terms of Service
          </h1>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
          Last Updated: November 2026 &bull; FolioVerse Free Platform
        </p>

        {/* Dedicated Ad Section for Terms Page */}
        <AdBanner slot="terms-service" format="horizontal" style={{ margin: '0 auto 2rem' }} />

        <div className="glass-panel" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, color: '#cbd5e1', fontSize: '0.94rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <UserCheck style={{ width: '18px', height: '18px', color: '#a855f7' }} /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or creating portfolios and resumes on FolioVerse, you agree to comply with and be legally bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Sparkles style={{ width: '18px', height: '18px', color: '#a855f7' }} /> 2. 100% Free Lifetime Access &amp; Template Usage
            </h2>
            <p>
              FolioVerse provides free lifetime access to all 55 interactive 3D portfolio templates, 31+ college stream ATS resume builders, 3D ambient animation engines, and unlimited client-side PDF/HTML exports. There are zero unlock fees, no subscription paywalls, and no hidden charges. Platform operations are sustained through non-intrusive sponsor and ad placements.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Shield style={{ width: '18px', height: '18px', color: '#a855f7' }} /> 3. Intellectual Property &amp; Content Ownership
            </h2>
            <p>
              You retain 100% full ownership and intellectual property rights over all content, biographies, work projects, code, achievements, and photographs you upload or generate. FolioVerse claims no ownership over your resume content or published portfolios.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <AlertTriangle style={{ width: '18px', height: '18px', color: '#a855f7' }} /> 4. Acceptable Conduct &amp; Prohibited Uses
            </h2>
            <p>
              You agree not to use FolioVerse to publish unlawful, defamatory, malicious, fraudulent, phishing, or infringing material. You may not attempt to reverse engineer backend infrastructure, compromise security tokens, or initiate automated DDoS attacks.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <FileCheck style={{ width: '18px', height: '18px', color: '#a855f7' }} /> 5. Limitation of Liability &amp; Disclaimers
            </h2>
            <p>
              FolioVerse and its services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive for 100% uptime and high fidelity in PDF and HTML exports, FolioVerse is not liable for data loss or indirect damages resulting from device incompatibilities or browser settings.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <FileCheck style={{ width: '18px', height: '18px', color: '#a855f7' }} /> 6. Company Ownership &amp; Support Contact
            </h2>
            <p>
              FolioVerse is developed and operated by <strong>BEZALYNXLABS</strong>. For enterprise inquiries, student degree partnerships, or customer support, contact our team at <a href="mailto:bezalynxlabs@gmail.com" style={{ color: '#c084fc', fontWeight: 600 }}>bezalynxlabs@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
