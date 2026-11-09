import jwt from 'jsonwebtoken';
import { storage } from '../db/storage.js';

const JWT_SECRET = process.env.JWT_SECRET || 'folioview-super-secret-student-key-2025';

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      // Guest creator mode (user account requirement removed for now)
      req.user = {
        id: 'guest-creator',
        email: 'creator@folioview.local',
        name: 'Portfolio Creator',
        isPremium: true
      };
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = storage.findUserById(decoded.userId);

    if (!user) {
      req.user = {
        id: 'guest-creator',
        email: 'creator@folioview.local',
        name: 'Portfolio Creator',
        isPremium: true
      };
      return next();
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: Boolean(user.isPremium)
    };

    next();
  } catch (err) {
    // If token expired/invalid, seamlessly fallback to guest creator
    req.user = {
      id: 'guest-creator',
      email: 'creator@folioview.local',
      name: 'Portfolio Creator',
      isPremium: true
    };
    return next();
  }
};

export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = storage.findUserById(decoded.userId);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          isPremium: Boolean(user.isPremium)
        };
      }
    }
  } catch {
    // Continue unauthenticated
  }
  next();
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
