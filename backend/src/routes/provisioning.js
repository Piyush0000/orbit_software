const express = require('express');
const router = express.Router();
const provisioningController = require('../controllers/provisioningController');
const { authenticateAdmin } = require('../middleware/auth');

// Merchant provisioning routes
router.post('/merchants/:id/activate', authenticateAdmin, provisioningController.activateMerchant);
router.get('/merchants/:id/provisioning-status', authenticateAdmin, provisioningController.getProvisioningStatus);
router.post('/merchants/:id/retry-provisioning', authenticateAdmin, provisioningController.retryProvisioning);

// Theme management routes
router.get('/themes', authenticateAdmin, provisioningController.getThemes);
router.post('/themes', authenticateAdmin, provisioningController.createTheme);
router.put('/themes/:id', authenticateAdmin, provisioningController.updateTheme);
router.delete('/themes/:id', authenticateAdmin, provisioningController.deleteTheme);

// Plan management routes
router.get('/plans', authenticateAdmin, provisioningController.getPlans);
router.post('/plans', authenticateAdmin, provisioningController.createPlan);
router.put('/plans/:id', authenticateAdmin, provisioningController.updatePlan);
router.delete('/plans/:id', authenticateAdmin, provisioningController.deletePlan);

// Utility routes
router.post('/seed-defaults', authenticateAdmin, provisioningController.seedDefaults);

module.exports = router;
