const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');

const metaAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const headerToken = header.startsWith('Bearer ') ? header.slice(7) : null;
    const queryToken = req.query.token;
    const token = headerToken || queryToken;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, env.jwt.secret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const signUserToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, env.jwt.secret, { expiresIn: env.jwt.expire });

module.exports = { metaAuth, signUserToken };
