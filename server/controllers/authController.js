import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Portfolio } from '../models/Portfolio.js';
import { Transaction } from '../models/Transaction.js';
import { generateToken } from '../middleware/auth.js';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = User.create({
      email,
      passwordHash,
      name: name || email.split('@')[0],
      isPremium: false
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isPremium: newUser.isPremium
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: Boolean(user.isPremium)
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: Boolean(user.isPremium),
      createdAt: user.createdAt
    }
  });
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const user = User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    User.update(user.id, { passwordHash });

    res.json({ message: 'Password updated successfully!' });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = (req, res) => {
  const success = User.delete(req.user.id);
  if (!success) {
    return res.status(404).json({ error: 'User account not found.' });
  }
  res.json({ message: 'Account and associated portfolios permanently deleted.' });
};

export const exportData = (req, res) => {
  const user = User.findById(req.user.id);
  const portfolios = Portfolio.findByUserId(req.user.id);
  const transactions = Transaction.findByUserId(req.user.id);

  const exportPayload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isPremium: user.isPremium,
      createdAt: user.createdAt
    },
    portfolios,
    transactions,
    exportedAt: new Date().toISOString()
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="folioview-data-${user.id}.json"`);
  res.json(exportPayload);
};
