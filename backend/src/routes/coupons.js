const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  listCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} = require('../controllers/couponController');

const router = express.Router();

router.get('/',       auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), listCoupons);
router.post('/',      auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), createCoupon);
router.patch('/:id',  auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), updateCoupon);
router.delete('/:id', auth, rbac([ROLES.MERCHANT, ROLES.ADMIN]), deleteCoupon);

// Public — called from storefront checkout (no auth needed)
router.post('/validate', validateCoupon);

module.exports = router;
