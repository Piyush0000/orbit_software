const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  registerStore,
  createStore,
  listStores,
  getStore,
  updateStore,
  deleteStore,
  getSettings,
  updateSettings,
  storeAnalytics,
  getActivityLogs,
  getCustomers,
  getSections
} = require('../controllers/storeController');
const { withValidation } = require('../middleware/validation');

const router = express.Router();

// Public route for merchant registration (no auth required)
router.post(
  '/register',
  withValidation([
    body('name').notEmpty().withMessage('Business name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('category').notEmpty().withMessage('Category is required')
  ]),
  registerStore
);

// Route to get sections data for Visual Editor
router.get('/:id/sections', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getSections);

router.post(
  '/',
  auth,
  rbac([ROLES.MERCHANT, ROLES.ADMIN]),
  withValidation([body('name').notEmpty(), body('subdomain').notEmpty()]),
  createStore
);
router.get('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), listStores);
router.get('/:id', auth, getStore);
router.put('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateStore);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteStore);
router.get('/:id/analytics', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), storeAnalytics);
router.get('/:id/activity', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getActivityLogs);
router.get('/:id/customers', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), getCustomers);
router.get('/:id/settings', auth, getSettings);
router.put('/:id/settings', auth, updateSettings);

module.exports = router;
