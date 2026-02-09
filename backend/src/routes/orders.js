const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  createOrder,
  listOrders,
  getOrder,
  updateStatus,
  updateFulfillment,
  cancelOrder,
  lookupOrder
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder); // storefront can create order without auth
router.post('/lookup', lookupOrder); // public order lookup (requires orderNumber + email)
router.get('/store/:storeId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), listOrders);
router.get('/:id', auth, getOrder);
router.put('/:id/status', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateStatus);
router.put('/:id/fulfillment', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateFulfillment);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), cancelOrder);

module.exports = router;
