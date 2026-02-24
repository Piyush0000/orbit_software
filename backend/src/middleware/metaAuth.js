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
    
    if (decoded.id) {
      const mongoose = require('mongoose');
      let user = null;
      
      // Try finding by ObjectId if it's valid
      if (mongoose.Types.ObjectId.isValid(decoded.id)) {
        user = await User.findById(decoded.id);
      }
      
      // Fallback to email if not found by ID or ID wasn't a valid ObjectId
      if (!user && decoded.email) {
        const lowerEmail = decoded.email.toLowerCase();
        user = await User.findOne({ email: lowerEmail });
        
        // If still not found, create a placeholder record in Mongoose to store Meta data
        // This is safe because the JWT has already been verified
        if (!user) {
          user = new User({
            email: lowerEmail,
            passwordHash: 'LINKED_FROM_POSTGRES' // Placeholder
          });
          await user.save();
        }
      }
      
      if (!user) return res.status(401).json({ message: 'User not found' });
      req.user = user;
    } else {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    
    next();
  } catch (err) {
    console.error(' [META AUTH ERROR] ', err.message);
    return res.status(401).json({ 
      message: 'Invalid or expired token',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

const signUserToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, env.jwt.secret, { expiresIn: env.jwt.expire });

module.exports = { metaAuth, signUserToken };
