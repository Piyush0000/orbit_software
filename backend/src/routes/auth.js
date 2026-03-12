const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail
} = require('../controllers/authController');
const passport = require('../services/passportService');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const auth = require('../middleware/auth');
const { withValidation } = require('../middleware/validation');

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Generate JWT for the frontend
  const token = jwt.sign(
    { id: req.user.id, role: req.user.role, email: req.user.email },
    env.jwt.secret,
    { expiresIn: env.jwt.expire }
  );
  
  // Redirect back to frontend with token
  res.redirect(`${env.frontendUrl}/login-success?token=${token}&user=${encodeURIComponent(JSON.stringify({
    id: req.user.id,
    email: req.user.email,
    fullName: req.user.fullName,
    role: req.user.role
  }))}`);
});

router.post(
  '/register',
  withValidation([body('email').isEmail(), body('password').isLength({ min: 6 }), body('fullName').notEmpty()]),
  register
);
router.post('/login', withValidation([body('email').isEmail(), body('password').notEmpty()]), login);
router.post('/logout', auth, logout);
router.post('/forgot-password', withValidation([body('email').isEmail()]), forgotPassword);
router.post('/reset-password', withValidation([body('token').notEmpty(), body('password').isLength({ min: 6 })]), resetPassword);
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
