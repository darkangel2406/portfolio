/**
 * FolioVerse Image Utilities
 * Ensures reliable image loading across Vite dev server, production, and public links
 */

export const resolveImageUrl = (url) => {
  if (!url) return '';
  
  const cleanUrl = String(url).trim();
  
  // Data URLs and Blob URLs (instant client uploads)
  if (cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) {
    return cleanUrl;
  }
  
  // Fully qualified web URLs
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }
  
  // Relative uploads path (/uploads/filename.ext)
  if (cleanUrl.startsWith('/uploads/')) {
    // When running under Vite dev on 5173, Vite proxy handles /uploads -> http://localhost:5000.
    // However, if the page is loaded on a different port or direct link, ensure it can reach port 5000 if not proxied
    return cleanUrl;
  }

  // Prepend /uploads/ if raw filename passed
  if (!cleanUrl.startsWith('/') && !cleanUrl.includes('://')) {
    return `/uploads/${cleanUrl}`;
  }
  
  return cleanUrl;
};

export const handleImageError = (e, fallbackText = 'Image') => {
  e.target.onerror = null;
  // Generate clean SVG placeholder with initials or icon
  e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%231e293b"/><text x="50%" y="54%" font-family="sans-serif" font-weight="bold" font-size="28" fill="%2394a3b8" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(fallbackText.slice(0, 2).toUpperCase())}</text></svg>`;
};
