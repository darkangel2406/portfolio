import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', requireAuth, authController.getMe);
router.post('/change-password', requireAuth, authController.changePassword);
router.delete('/account', requireAuth, authController.deleteAccount);
router.get('/export-data', requireAuth, authController.exportData);

export default router;
