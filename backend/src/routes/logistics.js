const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  getCouriers,
  trackShipment,
  getSummary,
  configureProvider,
  getProviderStatus,
  createOrder,
  testConnection
} = require('../controllers/logisticsController');

const router = express.Router();

router.get('/:storeId/couriers', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getCouriers);
router.post('/:storeId/track', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), trackShipment);
router.post('/:storeId/summary', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getSummary);
router.post('/:storeId/configure', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), configureProvider);
router.get('/:storeId/status', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getProviderStatus);
router.post('/:storeId/create-order', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), createOrder);
router.get('/:storeId/test', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), testConnection);

module.exports = router;