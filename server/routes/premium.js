import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as premiumController from '../controllers/premiumController.js';

const router = express.Router();

router.get('/status', requireAuth, premiumController.getStatus);
router.post('/create-order', requireAuth, premiumController.createOrder);
router.post('/verify-payment', requireAuth, premiumController.verifyPayment);

export default router;
