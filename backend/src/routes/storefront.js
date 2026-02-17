const express = require('express');
const {
  getStoreBySubdomain,
  getProducts,
  getProduct,
  checkout,
  getLayout,
  getStoreByDomain
} = require('../controllers/storefrontController');

const router = express.Router();

// Domain resolution (supports both subdomain and custom domain)
router.get('/resolve', getStoreByDomain);

// Legacy subdomain routes
router.get('/:subdomain', getStoreBySubdomain);
router.get('/:subdomain/products', getProducts);
router.get('/:subdomain/products/:id', getProduct);
router.post('/:subdomain/checkout', checkout);
router.get('/:subdomain/layout', getLayout);

module.exports = router;
