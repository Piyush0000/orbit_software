const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/appAuthController');
const { withValidation } = require('../middleware/validation');

const router = express.Router();

router.post(
  '/signup',
  withValidation([body('email').isEmail(), body('password').isLength({ min: 6 })]),
  signup
);

router.post(
  '/login',
  withValidation([body('email').isEmail(), body('password').notEmpty()]),
  login
);

module.exports = router;
