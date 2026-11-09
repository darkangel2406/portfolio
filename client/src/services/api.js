/**
 * FolioVerse Unified API Client
 */

const API_BASE = '/api';

export const getAuthToken = () => {
  return localStorage.getItem('folioview_token');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('folioview_token', token);
  } else {
    localStorage.removeItem('folioview_token');
  }
};

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => request('/auth/me'),
  changePassword: (payload) => request('/auth/change-password', { method: 'POST', body: JSON.stringify(payload) }),
  deleteAccount: () => request('/auth/account', { method: 'DELETE' }),

  // Portfolios
  getPortfolios: () => request('/portfolios'),
  getPortfolio: (id) => request(`/portfolios/${id}`),
  createPortfolio: (payload) => request('/portfolios', { method: 'POST', body: JSON.stringify(payload) }),
  updatePortfolio: (id, payload) => request(`/portfolios/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  duplicatePortfolio: (id) => request(`/portfolios/${id}/duplicate`, { method: 'POST' }),
  deletePortfolio: (id) => request(`/portfolios/${id}`, { method: 'DELETE' }),
  publishPortfolio: (id) => request(`/portfolios/${id}/publish`, { method: 'POST' }),
  unpublishPortfolio: (id) => request(`/portfolios/${id}/unpublish`, { method: 'POST' }),

  // Public Portfolio Lookup
  getPublicPortfolio: (slug) => request(`/public/portfolios/${slug}`),

  // Premium & Entitlements
  getPremiumStatus: () => request('/premium/status'),
  createPaymentOrder: () => request('/premium/create-order', { method: 'POST' }),
  verifyPayment: (payload) => request('/premium/verify-payment', { method: 'POST', body: JSON.stringify(payload) }),

  // Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/upload', {
      method: 'POST',
      body: formData
    });
  }
};
