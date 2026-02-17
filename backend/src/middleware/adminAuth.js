const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { prisma } = require('../config/database');

const adminAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, env.jwt.secret);
    if (!decoded || !decoded.adminId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const admin = await prisma.admin.findUnique({ where: { id: decoded.adminId } });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Admin not active or not found' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = adminAuth;
