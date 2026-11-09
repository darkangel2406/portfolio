import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as portfolioController from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', requireAuth, portfolioController.getPortfolios);
router.post('/', requireAuth, portfolioController.createPortfolio);
router.get('/:id', requireAuth, portfolioController.getPortfolioById);
router.put('/:id', requireAuth, portfolioController.updatePortfolio);
router.post('/:id/duplicate', requireAuth, portfolioController.duplicatePortfolio);
router.delete('/:id', requireAuth, portfolioController.deletePortfolio);
router.post('/:id/publish', requireAuth, portfolioController.publishPortfolio);
router.post('/:id/unpublish', requireAuth, portfolioController.unpublishPortfolio);

export default router;
