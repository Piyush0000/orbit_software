const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const env = require('../config/env');
const { sendWelcomeEmail, sendPasswordResetEmail, sendVerificationEmail } = require('../services/emailService');
const { ROLES } = require('../config/constants');

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role, email: user.email }, env.jwt.secret, {
    expiresIn: env.jwt.expire
  });

const register = async (req, res, next) => {
  try {
    const { email, password, fullName, role, storeId } = req.body;
    
    const userRole = role && Object.values(ROLES).includes(role) ? role : ROLES.CUSTOMER;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user and link to store if it's a customer registering on a storefront
    const userData = {
      email,
      password: hashed,
      fullName,
      role: userRole
    };

    if (userRole === ROLES.CUSTOMER && storeId) {
      userData.stores = {
        connect: { id: storeId }
      };
    }

    const user = await prisma.user.create({
      data: userData,
      include: {
        stores: {
          select: {
            id: true,
            name: true,
            subdomain: true
          }
        }
      }
    });


    if (userRole === ROLES.CUSTOMER && storeId) {
      await prisma.brandActivityLog.create({
        data: {
          storeId,
          userId: user.id,
          actorType: 'SYSTEM',
          action: 'CUSTOMER_REGISTERED',
          metadata: { 
            email: user.email, 
            fullName: user.fullName 
          }
        }
      });
    }

    await sendWelcomeEmail(email, fullName || 'Customer');
    
    const token = signToken(user);
    res.status(201).json({ 
      success: true,
      token, 
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        stores: user.stores
      }
    });

  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, storeId } = req.body;
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        stores: {
          select: {
            id: true,
            name: true,
            subdomain: true
          }
        }
      }
    });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    
    // Log activity if storeId is provided (Customer login on storefront)
    if (storeId) {
      await prisma.brandActivityLog.create({
        data: {
          storeId,
          userId: user.id,
          actorType: 'SYSTEM',
          action: 'CUSTOMER_LOGIN',
          metadata: { 
            email: user.email, 
            fullName: user.fullName,
            timestamp: new Date()
          }
        }
      });
    }

    const token = signToken(user);
    res.json({ 
      success: true,
      token, 
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        stores: user.stores
      }
    });

  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  try {
    const { storeId } = req.body;
    const userId = req.user?.id; // Assuming auth middleware is used or decoded from token

    if (storeId && userId) {
      await prisma.brandActivityLog.create({
        data: {
          storeId,
          userId,
          actorType: 'SYSTEM',
          action: 'CUSTOMER_LOGOUT',
          metadata: { timestamp: new Date() }
        }
      });
    }
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    res.json({ success: true, message: 'Logged out (with log error)' });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(200).json({ message: 'If account exists, email sent' });
    const token = signToken(user);
    await sendPasswordResetEmail(email, token);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, env.jwt.secret);
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed }
    });
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, env.jwt.secret);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true }
    });
    res.json({ message: 'Email verified' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail
};
