const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const logisticsController = require('../controllers/logisticsController');

const router = express.Router();

// ─── Provider Setup ────────────────────────────────────────────────────────────
router.get('/:storeId/status',    auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getProviderStatus);
router.post('/:storeId/configure', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.configureProvider);
router.get('/:storeId/test',      auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.testConnection);

// ─── Couriers ──────────────────────────────────────────────────────────────────
router.get('/:storeId/couriers',  auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getCouriers);

// ─── Orders ────────────────────────────────────────────────────────────────────
router.post('/:storeId/create-order',   auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.createOrder);
router.post('/:storeId/cancel-order',   auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.cancelOrder);
router.post('/:storeId/register-pickup', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.registerPickup);
router.post('/:storeId/reattempt',      auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.reattemptOrder);

// ─── Tracking ──────────────────────────────────────────────────────────────────
router.post('/:storeId/track',   auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.trackShipment);
router.post('/:storeId/summary', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getSummary);
router.post('/:storeId/label',   auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.getShippingLabel);

// ─── Tools ─────────────────────────────────────────────────────────────────────
router.post('/:storeId/rate',    auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.calculateRate);
router.post('/:storeId/pincode', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.checkPincodeServiceability);

// ─── Warehouses ────────────────────────────────────────────────────────────────
router.post('/:storeId/warehouse',      auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.addWarehouse);
router.put('/:storeId/warehouse',       auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), logisticsController.updateWarehouse);

module.exports = router;