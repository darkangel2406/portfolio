import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Sparkles, Edit3, X, ThumbsUp, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SatisfactionModal({ isOpen, onClose, portfolio, onEditAgain }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!isOpen || !portfolio) return null;

  const publicUrl = `${window.location.origin}/p/${portfolio.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSatisfaction = (rating) => {
    setFeedback(rating);
    if (rating === 'love') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
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
        maxWidth: '560px',
        width: '100%',
        padding: '2.5rem',
        borderRadius: '24px',
        position: 'relative',
        background: '#0d1322',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        textAlign: 'center'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <Sparkles style={{ width: '32px', height: '32px' }} />
        </div>

        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Your Portfolio is Live!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
          Anyone with this link can now view your professional portfolio without logging in.
        </p>

        {/* Public URL Box */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.88rem', color: '#818cf8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {publicUrl}
          </span>
          <button onClick={handleCopy} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
            {copied ? <Check style={{ width: '14px', height: '14px', color: '#10b981' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Satisfaction Survey */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1.25rem', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.75rem' }}>
            How do you like your new portfolio?
          </h4>
          {feedback ? (
            <div style={{ color: '#10b981', fontSize: '0.88rem', fontWeight: 600 }}>
              🎉 Thank you for your feedback! You can edit or change templates anytime.
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button onClick={() => handleSatisfaction('love')} className="btn btn-outline btn-sm">
                <Heart style={{ width: '14px', height: '14px', color: '#ec4899' }} />
                <span>Looks Amazing!</span>
              </button>
              <button onClick={() => { handleSatisfaction('tweak'); onEditAgain(); }} className="btn btn-outline btn-sm">
                <Edit3 style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
                <span>Needs a Tweak</span>
              </button>
            </div>
          )}
        </div>

        {/* Primary Next Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onEditAgain} className="btn btn-secondary" style={{ flex: 1 }}>
            <Edit3 style={{ width: '15px', height: '15px' }} />
            <span>Continue Editing</span>
          </button>
          <a href={publicUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
            <ExternalLink style={{ width: '15px', height: '15px' }} />
            <span>View Live Website</span>
          </a>
        </div>

      </div>
    </div>
  );
}
