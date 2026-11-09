import { storage } from '../db/storage.js';

export class Portfolio {
  static findByUserId(userId) {
    return storage.findPortfoliosByUserId(userId);
  }

  static findById(id) {
    return storage.findPortfolioById(id);
  }

  static findBySlug(slug) {
    return storage.findPortfolioBySlug(slug);
  }

  static create(portfolioData) {
    return storage.createPortfolio(portfolioData);
  }

  static update(id, userId, updates) {
    return storage.updatePortfolio(id, userId, updates);
  }

  static duplicate(id, userId) {
    return storage.duplicatePortfolio(id, userId);
  }

  static delete(id, userId) {
    return storage.deletePortfolio(id, userId);
  }

  static incrementViews(slug) {
    return storage.incrementPortfolioViews(slug);
  }
}
