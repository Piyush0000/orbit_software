const express = require('express');
const rateLimit = require('express-rate-limit');
const { login, callback, status } = require('../controllers/metaOAuthController');
const { metaAuth } = require('../middleware/metaAuth');

const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
});

router.get('/login', metaAuth, limiter, login);
router.get('/callback', callback);
router.get('/status', metaAuth, status);

module.exports = router;
