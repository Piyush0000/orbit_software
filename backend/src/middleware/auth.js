const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { prisma } = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      console.warn(`[Auth] No token provided for ${req.method} ${req.originalUrl}`);
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const decoded = jwt.verify(token, env.jwt.secret);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) {
      console.warn(`[Auth] User not found or inactive: ${decoded.id}`);
      return res.status(401).json({ message: 'User not active or not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      console.warn(`[Auth] Invalid/Expired token: ${err.message}`);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Auth Middleware Error:', err);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, env.jwt.secret);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not active or not found' });
    }
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Admin Auth Error:', err);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

module.exports = auth;
module.exports.authenticateAdmin = authenticateAdmin;
