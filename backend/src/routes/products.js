const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  createProduct,
  listProducts,
  listByStore,
  getProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant
} = require('../controllers/productController');
const { cache } = require('../middleware/cache');

const router = express.Router();

// List products for current user's store
router.get(
  '/',
  auth,
  rbac([ROLES.MERCHANT, ROLES.ADMIN]),
  cache((req) => `store:products:user:${req.user?.id || 'unknown'}:storeId:${req.query.storeId || 'default'}:dashboard`, 60),
  listProducts
);

// Create product
router.post('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), createProduct);

// Get products by store ID
router.get(
  '/store/:storeId',
  auth,
  cache((req) => `store:products:storeId:${req.params.storeId}:dashboard`, 60),
  listByStore
);

// Get, update, delete specific product
router.get('/:id', auth, getProduct);
router.put('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateProduct);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteProduct);

// Variants
router.post('/:id/variants', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), addVariant);
router.put('/variants/:variantId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateVariant);
router.delete('/variants/:variantId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteVariant);

module.exports = router;
