const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  getCustomization,
  updateCustomization
} = require('../controllers/websiteCustomizationController');
const { cache } = require('../middleware/cache');

const router = express.Router();

router.get(
  '/',
  auth,
  rbac([ROLES.MERCHANT, ROLES.ADMIN]),
  cache((req) => `store:customization:user:${req.user?.id || 'unknown'}`, 300),
  getCustomization
);
router.put('/', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateCustomization);
router.get(
  '/:storeId',
  auth,
  rbac([ROLES.MERCHANT, ROLES.ADMIN]),
  cache((req) => `store:customization:storeId:${req.params.storeId}`, 300),
  getCustomization
);
router.put('/:storeId', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateCustomization);

module.exports = router;
