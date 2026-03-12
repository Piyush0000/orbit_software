const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { prisma } = require('../config/database');

const metaAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const headerToken = header.startsWith('Bearer ') ? header.slice(7) : null;
    const queryToken = req.query.token;
    const token = headerToken || queryToken;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, env.jwt.secret);
    
    // Support both 'id' (from Google/email login) and 'userId' (historical)
    const userId = decoded.id || decoded.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Meta Auth Middleware Error:', err);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

const signUserToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, env.jwt.secret, { expiresIn: env.jwt.expire });

module.exports = { metaAuth, signUserToken };
