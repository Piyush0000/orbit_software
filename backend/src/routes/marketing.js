const express = require('express');
const auth = require('../middleware/auth');

const {
  login: getMetaUrl,
  callback: handleMetaCallback,
  status: getMetaStatus,
  disconnect: disconnectMeta
} = require('../controllers/metaOAuthController');

const router = express.Router();

/**
 * 🛰️ ORBIT 360 - MARKETING ROUTES (Multi-Tenant Meta ONLY)
 * ------------------------------------------------------
 * Base: /api/marketing
 */

router.get('/test', (req, res) => res.json({ pulse: 'marketing ok' }));
router.get('/meta/connect', auth, getMetaUrl);
router.get('/meta/callback', handleMetaCallback);
router.get('/meta/status/:storeId', auth, getMetaStatus);
router.post('/meta/disconnect/:storeId', auth, disconnectMeta);

module.exports = router;
