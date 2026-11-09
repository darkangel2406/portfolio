/**
 * FolioVerse Typography & Text Styling System
 * Provides multi-font styles, weights, transforms, colors, and curated typography pairings.
 */

export const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter (Clean Modern Sans)', family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", preview: 'Ag Clean' },
  { id: 'Playfair Display', name: 'Playfair (Editorial Serif)', family: "'Playfair Display', Georgia, serif", preview: 'Ag Luxury' },
  { id: 'Cinzel', name: 'Cinzel (Classical Roman)', family: "'Cinzel', serif", preview: 'AG HERITAGE' },
  { id: 'JetBrains Mono', name: 'JetBrains (Tech Monospace)', family: "'JetBrains Mono', 'Fira Code', monospace", preview: '01 Code' },
  { id: 'Space Grotesk', name: 'Space Grotesk (Futuristic)', family: "'Space Grotesk', sans-serif", preview: 'Ag Cyber' },
  { id: 'Outfit', name: 'Outfit (Bold Geometric)', family: "'Outfit', sans-serif", preview: 'Ag Minimal' },
  { id: 'Plus Jakarta Sans', name: 'Jakarta (Executive Clean)', family: "'Plus Jakarta Sans', sans-serif", preview: 'Ag Global' },
  { id: 'Caveat', name: 'Caveat (Artistic Script)', family: "'Caveat', cursive", preview: 'Ag Creative' },
];

export const FONT_WEIGHTS = [
  { id: '400', label: 'Regular (400)' },
  { id: '500', label: 'Medium (500)' },
  { id: '600', label: 'Semi-Bold (600)' },
  { id: '700', label: 'Bold (700)' },
  { id: '800', label: 'Black (800)' },
];

export const FONT_STYLES = [
  { id: 'normal', label: 'Normal' },
  { id: 'italic', label: 'Italic' },
];

export const TEXT_TRANSFORMS = [
  { id: 'none', label: 'Standard' },
  { id: 'uppercase', label: 'UPPERCASE' },
  { id: 'capitalize', label: 'Title Case' },
];

export const CUSTOMIZABLE_TEXT_FIELDS = [
  { 
    id: 'name', 
    label: 'Full Name / Main Title', 
    desc: 'Hero heading, book cover title, or author name', 
    fontKey: 'nameFont', 
    colorKey: 'nameColor', 
    weightKey: 'nameWeight', 
    styleKey: 'nameStyle', 
    transformKey: 'nameTransform',
    defaultColor: '#ffffff', 
    defaultFont: 'Inter',
    defaultWeight: '800'
  },
  { 
    id: 'headline', 
    label: 'Professional Headline / Subtitle', 
    desc: 'Subtitle, role tagline, or career status', 
    fontKey: 'headlineFont', 
    colorKey: 'headlineColor', 
    weightKey: 'headlineWeight', 
    styleKey: 'headlineStyle', 
    transformKey: 'headlineTransform',
    defaultColor: '#93c5fd', 
    defaultFont: 'Plus Jakarta Sans',
    defaultWeight: '600'
  },
  { 
    id: 'bio', 
    label: 'Biography / About Me Text', 
    desc: 'About text, prologue quote, and personal bio', 
    fontKey: 'bioFont', 
    colorKey: 'bioColor', 
    weightKey: 'bioWeight', 
    styleKey: 'bioStyle', 
    transformKey: 'bioTransform',
    defaultColor: '#cbd5e1', 
    defaultFont: 'Inter',
    defaultWeight: '400'
  },
  { 
    id: 'sectionTitle', 
    label: 'Section Headings', 
    desc: 'Category headers (Projects, Stack, Journey, Contact)', 
    fontKey: 'sectionTitleFont', 
    colorKey: 'sectionTitleColor', 
    weightKey: 'sectionTitleWeight', 
    styleKey: 'sectionTitleStyle', 
    transformKey: 'sectionTitleTransform',
    defaultColor: '#ffffff', 
    defaultFont: 'Inter',
    defaultWeight: '800'
  },
  { 
    id: 'cardTitle', 
    label: 'Card & Project Titles', 
    desc: 'Project names, company roles, degrees, skill titles', 
    fontKey: 'cardTitleFont', 
    colorKey: 'cardTitleColor', 
    weightKey: 'cardTitleWeight', 
    styleKey: 'cardTitleStyle', 
    transformKey: 'cardTitleTransform',
    defaultColor: '#ffffff', 
    defaultFont: 'Inter',
    defaultWeight: '700'
  },
  { 
    id: 'body', 
    label: 'Body & Description Paragraphs', 
    desc: 'Project descriptions, experience summaries, bullet points', 
    fontKey: 'bodyFont', 
    colorKey: 'bodyTextColor', 
    weightKey: 'bodyWeight', 
    styleKey: 'bodyStyle', 
    transformKey: 'bodyTransform',
    defaultColor: '#94a3b8', 
    defaultFont: 'Inter',
    defaultWeight: '400'
  },
];

export const TYPOGRAPHY_PRESETS = [
  {
    name: 'Modern Minimalist',
    desc: 'Clean & high-converting',
    icon: '⚡',
    nameFont: 'Inter',
    nameWeight: '800',
    nameStyle: 'normal',
    nameTransform: 'none',
    headlineFont: 'Plus Jakarta Sans',
    headlineWeight: '600',
    headlineStyle: 'normal',
    headlineTransform: 'none',
    sectionTitleFont: 'Inter',
    sectionTitleWeight: '700',
    sectionTitleStyle: 'normal',
    sectionTitleTransform: 'none',
    cardTitleFont: 'Inter',
    cardTitleWeight: '700',
    bodyFont: 'Inter',
    bodyWeight: '400',
    nameColor: '#ffffff',
    headlineColor: '#93c5fd',
    sectionTitleColor: '#38bdf8',
    cardTitleColor: '#ffffff',
    bodyTextColor: '#cbd5e1'
  },
  {
    name: 'Luxury Editorial',
    desc: 'Fashion, art & high aesthetic',
    icon: '✨',
    nameFont: 'Playfair Display',
    nameWeight: '700',
    nameStyle: 'italic',
    nameTransform: 'none',
    headlineFont: 'Outfit',
    headlineWeight: '500',
    headlineStyle: 'normal',
    headlineTransform: 'none',
    sectionTitleFont: 'Playfair Display',
    sectionTitleWeight: '700',
    sectionTitleStyle: 'normal',
    sectionTitleTransform: 'none',
    cardTitleFont: 'Playfair Display',
    cardTitleWeight: '700',
    bodyFont: 'Plus Jakarta Sans',
    bodyWeight: '400',
    nameColor: '#fef3c7',
    headlineColor: '#d4af37',
    sectionTitleColor: '#fef3c7',
    cardTitleColor: '#fde68a',
    bodyTextColor: '#e2e8f0'
  },
  {
    name: 'Cyber & Dev Terminal',
    desc: 'Tech stack & systems engineer',
    icon: '💻',
    nameFont: 'JetBrains Mono',
    nameWeight: '700',
    nameStyle: 'normal',
    nameTransform: 'uppercase',
    headlineFont: 'Space Grotesk',
    headlineWeight: '600',
    headlineStyle: 'normal',
    headlineTransform: 'none',
    sectionTitleFont: 'JetBrains Mono',
    sectionTitleWeight: '700',
    sectionTitleStyle: 'normal',
    sectionTitleTransform: 'none',
    cardTitleFont: 'JetBrains Mono',
    cardTitleWeight: '700',
    bodyFont: 'JetBrains Mono',
    bodyWeight: '400',
    nameColor: '#00ffcc',
    headlineColor: '#6ee7b7',
    sectionTitleColor: '#00ffcc',
    cardTitleColor: '#a7f3d0',
    bodyTextColor: '#cbd5e1'
  },
  {
    name: 'Classical Heritage Book',
    desc: 'Scholarly codex & author biography',
    icon: '📖',
    nameFont: 'Cinzel',
    nameWeight: '800',
    nameStyle: 'normal',
    nameTransform: 'uppercase',
    headlineFont: 'Playfair Display',
    headlineWeight: '600',
    headlineStyle: 'italic',
    headlineTransform: 'none',
    sectionTitleFont: 'Cinzel',
    sectionTitleWeight: '700',
    sectionTitleStyle: 'normal',
    sectionTitleTransform: 'none',
    cardTitleFont: 'Cinzel',
    cardTitleWeight: '700',
    bodyFont: 'Playfair Display',
    bodyWeight: '400',
    nameColor: '#ffffff',
    headlineColor: '#fcd34d',
    sectionTitleColor: '#fde68a',
    cardTitleColor: '#ffffff',
    bodyTextColor: '#e2e8f0'
  },
  {
    name: 'Artistic Creator Studio',
    desc: 'Bold branding & kinetic design',
    icon: '🎨',
    nameFont: 'Outfit',
    nameWeight: '800',
    nameStyle: 'normal',
    nameTransform: 'none',
    headlineFont: 'Caveat',
    headlineWeight: '700',
    headlineStyle: 'normal',
    headlineTransform: 'none',
    sectionTitleFont: 'Outfit',
    sectionTitleWeight: '800',
    sectionTitleStyle: 'normal',
    sectionTitleTransform: 'none',
    cardTitleFont: 'Outfit',
    cardTitleWeight: '700',
    bodyFont: 'Inter',
    bodyWeight: '400',
    nameColor: '#f43f5e',
    headlineColor: '#fda4af',
    sectionTitleColor: '#fb7185',
    cardTitleColor: '#ffffff',
    bodyTextColor: '#f1f5f9'
  }
];

export const resolveFontFamily = (fontId, fallback = 'inherit') => {
  if (!fontId) return fallback;
  const match = FONT_OPTIONS.find(f => f.id.toLowerCase() === fontId.toLowerCase());
  return match ? match.family : (fontId.includes(',') ? fontId : `'${fontId}', sans-serif`);
};

/**
 * Calculates relative luminance (0.0 to 1.0) of any CSS color string (Hex, RGB, RGBA, Linear Gradient)
 */
export const getLuminance = (colorStr) => {
  if (!colorStr) return 0.08;
  const str = String(colorStr).trim();

  // If gradient, extract the first hex or rgb stop
  if (str.includes('gradient')) {
    const hexMatch = str.match(/#[0-9a-fA-F]{3,8}/);
    if (hexMatch) return getLuminance(hexMatch[0]);
    const rgbMatch = str.match(/rgba?\([^)]+\)/);
    if (rgbMatch) return getLuminance(rgbMatch[0]);
    return 0.1;
  }

  let r = 15, g = 23, b = 42;
  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length >= 6) {
      r = parseInt(hex.substring(0, 2), 16) || 0;
      g = parseInt(hex.substring(2, 4), 16) || 0;
      b = parseInt(hex.substring(4, 6), 16) || 0;
    }
  } else if (str.startsWith('rgb')) {
    const match = str.match(/\d+/g);
    if (match && match.length >= 3) {
      r = parseInt(match[0], 10) || 0;
      g = parseInt(match[1], 10) || 0;
      b = parseInt(match[2], 10) || 0;
    }
  } else if (str === 'white') {
    return 1.0;
  } else if (str === 'black') {
    return 0.0;
  }

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

/**
 * Evaluates contrast against the box background color and guarantees high readability.
 * If user color lacks contrast (e.g. white on white box or dark on dark box), it adapts safely.
 */
export const getContrastSafeColor = (desiredColor, boxBg = '#0f172a', isHeading = false, customDefault = null) => {
  const bgL = getLuminance(boxBg);
  const isBgLight = bgL > 0.45;
  const defaultSafe = customDefault || (isBgLight 
    ? (isHeading ? '#0f172a' : '#334155') 
    : (isHeading ? '#ffffff' : '#cbd5e1'));

  if (!desiredColor) return defaultSafe;

  const colorL = getLuminance(desiredColor);
  const contrastRatio = (Math.max(bgL, colorL) + 0.05) / (Math.min(bgL, colorL) + 0.05);

  // Only fallback if contrast is critically low and virtually invisible (e.g. black on black or white on white)
  if (contrastRatio < 1.35) {
    return defaultSafe;
  }

  return desiredColor;
};

/**
 * Derives a full suite of high-contrast box text and border styling based on the active box background.
 */
export const getBoxContrastingTheme = (themeConfig = {}, defaultBoxBg = 'rgba(15, 23, 42, 0.85)') => {
  const tc = themeConfig || {};
  const effectiveBoxBg = tc.cardBgColor || (tc.bgType === 'color' && tc.bgColor ? tc.bgColor : defaultBoxBg);
  const isLight = getLuminance(effectiveBoxBg) > 0.45;

  const rawBorder = tc.cardBorderColor || (isLight ? 'rgba(15, 23, 42, 0.14)' : 'rgba(255, 255, 255, 0.12)');
  // Ensure valid CSS border string with width and style (e.g. '1px solid #334155')
  const cardBorder = rawBorder.includes(' ') ? rawBorder : `1px solid ${rawBorder}`;
  const cardBorderColor = rawBorder.includes(' ') ? rawBorder.split(' ').pop() : rawBorder;

  return {
    isLight,
    cardBg: tc.cardBgColor || (isLight ? '#ffffff' : (tc.bgType === 'color' ? 'rgba(15, 23, 42, 0.75)' : defaultBoxBg)),
    cardBorder,
    cardBorderColor,
    headingColor: getContrastSafeColor(tc.headingColor, effectiveBoxBg, true),
    textColor: getContrastSafeColor(tc.textColor, effectiveBoxBg, false),
    subtextColor: getContrastSafeColor(tc.subtextColor, effectiveBoxBg, false, isLight ? '#475569' : '#94a3b8'),
    mutedColor: isLight ? '#64748b' : '#94a3b8',
    badgeBg: isLight ? 'rgba(15, 23, 42, 0.07)' : 'rgba(255, 255, 255, 0.08)',
    badgeColor: isLight ? '#0f172a' : '#f8fafc',
    badgeText: isLight ? '#0f172a' : '#f8fafc',
    textShadow: isLight ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.5)'
  };
};

/**
 * Resolves full inline style object for a specific text field based on themeConfig and box background
 */
export const getFieldTextStyle = (themeConfig = {}, fieldType = 'body', fallbacks = {}, boxBg = null) => {
  const tc = themeConfig || {};
  const effectiveBoxBg = boxBg || tc.cardBgColor || (tc.bgType === 'color' && tc.bgColor ? tc.bgColor : '#0f172a');
  const isBgLight = getLuminance(effectiveBoxBg) > 0.45;

  const defaultHeading = isBgLight ? '#0f172a' : '#ffffff';
  const defaultSubtext = isBgLight ? '#475569' : '#cbd5e1';
  const defaultBody = isBgLight ? '#334155' : '#cbd5e1';
  const defaultBio = isBgLight ? '#334155' : '#94a3b8';

  switch (fieldType) {
    case 'name': {
      const rawColor = tc.nameColor || tc.headingColor || fallbacks.color || defaultHeading;
      return {
        color: getContrastSafeColor(rawColor, effectiveBoxBg, true),
        fontFamily: resolveFontFamily(tc.nameFont, fallbacks.fontFamily || 'inherit'),
        fontWeight: tc.nameWeight || fallbacks.fontWeight || 800,
        fontStyle: tc.nameStyle || fallbacks.fontStyle || 'normal',
        textTransform: tc.nameTransform || fallbacks.textTransform || 'none',
        textShadow: isBgLight ? 'none' : '0 2px 8px rgba(0,0,0,0.5)'
      };
    }

    case 'headline': {
      const rawColor = tc.headlineColor || tc.subtextColor || fallbacks.color || defaultSubtext;
      return {
        color: getContrastSafeColor(rawColor, effectiveBoxBg, false),
        fontFamily: resolveFontFamily(tc.headlineFont, fallbacks.fontFamily || 'inherit'),
        fontWeight: tc.headlineWeight || fallbacks.fontWeight || 600,
        fontStyle: tc.headlineStyle || fallbacks.fontStyle || 'normal',
        textTransform: tc.headlineTransform || fallbacks.textTransform || 'none'
      };
    }

    case 'bio': {
      const rawColor = tc.bioColor || tc.textColor || fallbacks.color || defaultBio;
      return {
        color: getContrastSafeColor(rawColor, effectiveBoxBg, false),
        fontFamily: resolveFontFamily(tc.bioFont, fallbacks.fontFamily || 'inherit'),
        fontWeight: tc.bioWeight || fallbacks.fontWeight || 400,
        fontStyle: tc.bioStyle || fallbacks.fontStyle || 'normal'
      };
    }

    case 'sectionTitle': {
      const rawColor = tc.sectionTitleColor || tc.headingColor || fallbacks.color || defaultHeading;
      return {
        color: getContrastSafeColor(rawColor, effectiveBoxBg, true),
        fontFamily: resolveFontFamily(tc.sectionTitleFont, fallbacks.fontFamily || 'inherit'),
        fontWeight: tc.sectionTitleWeight || fallbacks.fontWeight || 800,
        fontStyle: tc.sectionTitleStyle || fallbacks.fontStyle || 'normal',
        textTransform: tc.sectionTitleTransform || fallbacks.textTransform || 'none'
      };
    }

    case 'cardTitle': {
      const rawColor = tc.cardTitleColor || tc.headingColor || fallbacks.color || defaultHeading;
      return {
        color: getContrastSafeColor(rawColor, effectiveBoxBg, true),
        fontFamily: resolveFontFamily(tc.cardTitleFont, fallbacks.fontFamily || 'inherit'),
        fontWeight: tc.cardTitleWeight || fallbacks.fontWeight || 700,
        fontStyle: tc.cardTitleStyle || fallbacks.fontStyle || 'normal'
      };
    }

    case 'body':
    default: {
      const rawColor = tc.bodyTextColor || tc.textColor || fallbacks.color || defaultBody;
      return {
        color: getContrastSafeColor(rawColor, effectiveBoxBg, false),
        fontFamily: resolveFontFamily(tc.bodyFont, fallbacks.fontFamily || 'inherit'),
        fontWeight: tc.bodyWeight || fallbacks.fontWeight || 400,
        fontStyle: tc.bodyStyle || fallbacks.fontStyle || 'normal'
      };
    }
  }
};
