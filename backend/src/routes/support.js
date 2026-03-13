const express = require('express');
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const { withValidation } = require('../middleware/validation');
const {
  createTicket,
  listTickets,
  getTicket,
  submitFeedback,
  requestCall,
  respond
} = require('../controllers/supportController');

const router = express.Router();

// All support routes require authentication
router.use(auth);

router.post(
  '/tickets',
  withValidation([
    body('storeId').notEmpty().withMessage('storeId is required'),
    body('subject').notEmpty().withMessage('subject is required'),
    body('message').notEmpty().withMessage('message is required')
  ]),
  createTicket
);

router.get('/tickets', listTickets);
router.get('/tickets/:id', getTicket);
router.post(
  '/tickets/:id/respond',
  withValidation([
    body('storeId').notEmpty().withMessage('storeId is required'),
    body('message').notEmpty().withMessage('message is required')
  ]),
  respond
);

router.post(
  '/feedback',
  withValidation([
    body('storeId').notEmpty().withMessage('storeId is required'),
    body('feedback').notEmpty().withMessage('feedback is required')
  ]),
  submitFeedback
);

router.post(
  '/call-request',
  withValidation([
    body('storeId').notEmpty().withMessage('storeId is required'),
    body('phone').notEmpty().withMessage('phone is required')
  ]),
  requestCall
);

module.exports = router;
