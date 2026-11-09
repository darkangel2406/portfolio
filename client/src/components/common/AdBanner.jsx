import React from 'react';

/**
 * Reusable Advertisement & Sponsor Container
 * -------------------------------------------------------------
 * You can place your Google AdSense code, affiliate banners, or custom ad network scripts
 * inside this container. To activate your ad:
 * 1. Replace the inner placeholder with your <ins className="adsbygoogle" ...> or script tag.
 * 2. Keep or adjust the data-ad-slot attribute.
 */
export default function AdBanner({ 
  slot = 'default-banner', 
  format = 'horizontal', 
  className = '',
  style = {} 
}) {
  return (
    <div 
      className={`folioverse-ad-container ${className}`}
      style={{
        width: '100%',
        maxWidth: format === 'square' ? '336px' : '980px',
        margin: '1.5rem auto',
        padding: '0.5rem',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {/* ============================================================
          AD SECTION START (Paste your AdSense / Ad script inside this div)
          ============================================================ */}
      <div 
        id={`ad-section-${slot}`}
        data-ad-slot={slot}
        data-ad-format={format}
        className="folioverse-ad-box"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: format === 'square' ? '280px' : '90px',
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px dashed rgba(99, 102, 241, 0.35)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0.85rem 1rem',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Subtle Ad Badge & Placement Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.35rem'
        }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.2rem 0.55rem',
            borderRadius: '4px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a5b4fc'
          }}>
            Ad Section
          </span>
          <span style={{
            fontSize: '0.72rem',
            color: '#64748b'
          }}>
            Slot: {slot}
          </span>
        </div>

        <p style={{
          fontSize: '0.82rem',
          color: '#94a3b8',
          margin: 0,
          lineHeight: 1.4
        }}>
          Reserved Ad Space &bull; Paste your Google AdSense or banner script here
        </p>

        {/* Future ad snippet target container */}
        <div 
          className="folioverse-ad-content-slot"
          style={{ width: '100%', height: '100%' }}
        >
          {/* USER AD CODE WILL RENDER HERE */}
        </div>
      </div>
      {/* ============================================================
          AD SECTION END
          ============================================================ */}
    </div>
  );
}
