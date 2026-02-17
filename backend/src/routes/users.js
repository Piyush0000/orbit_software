const express = require('express');
const { body } = require('express-validator');
const { getMe, updateMe, changePassword, deleteMe } = require('../controllers/userController');
const auth = require('../middleware/auth');
const { withValidation } = require('../middleware/validation');

const router = express.Router();

router.get('/me', auth, getMe);
router.put('/me', auth, withValidation([body('fullName').optional().isString()]), updateMe);
router.put(
  '/me/password',
  auth,
  withValidation([
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 })
  ]),
  changePassword
);
router.delete('/me', auth, deleteMe);

module.exports = router;
