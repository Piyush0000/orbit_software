const express = require('express');
const rateLimit = require('express-rate-limit');
const env = require('../config/env');
const {
  getAdAccounts,
  getCampaigns,
  createCampaign,
  pauseCampaign,
  resumeCampaign,
  getInsights,
  getCreatives,
  getCreativeInsights,
  getCreativePreview,
  getStatus
} = require('../controllers/metaController');
const { metaAuth } = require('../middleware/metaAuth');

const router = express.Router();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
});

const optionalMetaAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const headerToken = header.startsWith('Bearer ') ? header.slice(7) : null;
  const queryToken = req.query.token;
  const token = headerToken || queryToken;
  if (!token) return next();
  return metaAuth(req, res, next);
};

if (env.meta.publicAccessToken) {
  router.use(optionalMetaAuth, limiter);
} else {
  router.use(metaAuth, limiter);
}

router.get('/status', getStatus);
router.get('/ad-accounts', getAdAccounts);
router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);
router.patch('/campaigns/:id/pause', pauseCampaign);
router.patch('/campaigns/:id/resume', resumeCampaign);
router.get('/insights', getInsights);
router.get('/creatives', getCreatives);
router.get('/creatives/insights', getCreativeInsights);
router.get('/creatives/preview', getCreativePreview);

module.exports = router;
