import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import authRouter from './routes/auth.js';
import portfolioRouter from './routes/portfolios.js';
import publicRouter from './routes/public.js';
import premiumRouter from './routes/premium.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
const uploadDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Rate limiting on sensitive auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// API Routes
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/portfolios', portfolioRouter);
app.use('/api/public', publicRouter);
app.use('/api/premium', premiumRouter);
app.use('/api/upload', uploadRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'FolioVerse No-Code Portfolio API'
  });
});

// Serve frontend in production if built
const clientDist = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Centralized error handling
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
});

app.listen(PORT, () => {
  console.log(`\n✨ FolioVerse Backend API is running on http://localhost:${PORT}`);
  console.log(`📦 Database: Local atomic storage active (zero setup required)`);
  console.log(`🔒 Authentication: JWT with bcryptjs ready`);
  console.log(`💳 Premium Engine: Ready (₹200 pack for 10 premium templates)\n`);
});
