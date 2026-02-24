const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const logisticsController = require('../controllers/logisticsController');

const router = express.Router();

// Destructure with safety
router.get('/:storeId/couriers', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getCouriers);
router.post('/:storeId/track', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.trackShipment);
router.post('/:storeId/summary', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getSummary);
router.post('/:storeId/configure', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.configureProvider);
router.get('/:storeId/status', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getProviderStatus);
router.post('/:storeId/create-order', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.createOrder);
router.get('/:storeId/test', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.testConnection);

module.exports = router;