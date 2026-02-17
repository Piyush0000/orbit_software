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
const auth = require('../middleware/auth');
const { withValidation } = require('../middleware/validation');

const router = express.Router();

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
