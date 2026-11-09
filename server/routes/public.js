import express from 'express';
import * as publicController from '../controllers/publicController.js';

const router = express.Router();

router.get('/portfolios/:slug', publicController.getPublicPortfolio);

export default router;
