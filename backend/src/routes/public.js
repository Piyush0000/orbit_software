const express = require('express');
const {
  getStoreBySubdomain,
  getStoreProducts,
  getStoreCustomization
} = require('../controllers/publicController');
const { cache } = require('../middleware/cache');

const router = express.Router();

// Public routes (no auth required)
router.get('/stores/:subdomain', getStoreBySubdomain);
router.get(
  '/stores/:subdomain/products',
  cache(
    (req) =>
      `store:products:subdomain:${req.params.subdomain}:category:${req.query.category || 'all'}:search:${req.query.search || 'all'}:limit:${req.query.limit || 50}:offset:${req.query.offset || 0}`,
    120
  ),
  getStoreProducts
);
router.get(
  '/stores/:subdomain/customization',
  cache((req) => `store:customization:subdomain:${req.params.subdomain}`, 300),
  getStoreCustomization
);

module.exports = router;
