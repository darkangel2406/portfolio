import { Portfolio } from '../models/Portfolio.js';

export const getPortfolios = (req, res) => {
  const portfolios = Portfolio.findByUserId(req.user.id);
  res.json({ portfolios });
};

export const createPortfolio = (req, res, next) => {
  try {
    const portfolio = Portfolio.create({
      ...req.body,
      userId: req.user.id,
      title: req.body.title || 'My Portfolio',
      templateId: req.body.templateId || 'open-book'
    });

    res.status(201).json({
      message: 'Portfolio created successfully!',
      portfolio
    });
  } catch (err) {
    next(err);
  }
};

export const getPortfolioById = (req, res) => {
  const portfolio = Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found.' });
  }

  if (portfolio.userId !== req.user.id && req.user.id !== 'guest-creator' && portfolio.userId) {
    return res.status(403).json({ error: 'Access denied. You do not own this portfolio.' });
  }

  res.json({ portfolio });
};

export const updatePortfolio = (req, res, next) => {
  try {
    const portfolio = Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    if (portfolio.userId !== req.user.id && req.user.id !== 'guest-creator' && portfolio.userId) {
      return res.status(403).json({ error: 'Access denied. You do not own this portfolio.' });
    }

    const updates = { ...req.body };
    delete updates.id;
    delete updates.userId;
    delete updates.createdAt;
    delete updates.views;

    const updatedPortfolio = Portfolio.update(req.params.id, req.user.id, updates);

    res.json({
      message: 'Portfolio updated successfully!',
      portfolio: updatedPortfolio
    });
  } catch (err) {
    next(err);
  }
};

export const duplicatePortfolio = (req, res, next) => {
  try {
    const duplicated = Portfolio.duplicate(req.params.id, req.user.id);
    if (!duplicated) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    res.status(201).json({
      message: 'Portfolio duplicated successfully!',
      portfolio: duplicated
    });
  } catch (err) {
    next(err);
  }
};

export const deletePortfolio = (req, res, next) => {
  try {
    const success = Portfolio.delete(req.params.id, req.user.id);
    if (!success) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    res.json({ message: 'Portfolio deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

export const publishPortfolio = (req, res, next) => {
  try {
    const portfolio = Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    const updated = Portfolio.update(req.params.id, req.user.id, {
      status: 'published'
    });

    res.json({
      message: 'Portfolio published successfully! It is now live to the public.',
      portfolio: updated
    });
  } catch (err) {
    next(err);
  }
};

export const unpublishPortfolio = (req, res, next) => {
  try {
    const portfolio = Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    const updated = Portfolio.update(req.params.id, req.user.id, {
      status: 'draft'
    });

    res.json({
      message: 'Portfolio unpublished. It is now saved as a private draft.',
      portfolio: updated
    });
  } catch (err) {
    next(err);
  }
};
