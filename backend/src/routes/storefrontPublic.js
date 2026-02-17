const express = require('express');
const {
  getStoreInfo,
  getStoreCustomization,
  getStoreProducts,
  getStoreProduct,
  getStoreCategories,
  getStoreTheme,
  resolveStoreByDomain,
  getStoreSections,
  createPublicOrder,
  verifyPublicPayment
} = require('../controllers/storefrontPublicController');
const { cache } = require('../middleware/cache');

const router = express.Router();

/**
 * Public Storefront API Routes
 * No authentication required - these are public-facing endpoints
 * Used by merchant websites to fetch their store data dynamically
 */

// Store information
router.get('/:subdomain/info', getStoreInfo);

// Website customization (branding, colors, hero section, etc.)
router.get(
  '/:subdomain/customization',
  cache((req) => `store:customization:subdomain:${req.params.subdomain}`, 300),
  getStoreCustomization
);

// Products
router.get(
  '/:subdomain/products',
  cache(
    (req) =>
      `store:products:subdomain:${req.params.subdomain}:category:${req.query.category || 'all'}:search:${req.query.search || 'all'}:limit:${req.query.limit || 50}:offset:${req.query.offset || 0}`,
    120
  ),
  getStoreProducts
);
router.get('/:subdomain/products/:productId', getStoreProduct);

// Categories
router.get('/:subdomain/categories', getStoreCategories);

// Theme configuration
router.get('/:subdomain/theme', getStoreTheme);

// Homepage sections
router.get('/:subdomain/sections', getStoreSections);

// Domain resolution for storefront hub
router.get('/resolve', resolveStoreByDomain);

// Orders & Payments
router.post('/:subdomain/orders', createPublicOrder);
router.post('/:subdomain/orders/verify', verifyPublicPayment);

module.exports = router;
