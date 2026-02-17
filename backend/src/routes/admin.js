const express = require('express');
const { prisma } = require('../config/database');
const { body } = require('express-validator');
const adminAuth = require('../middleware/adminAuth');
const { adminRbac, ADMIN_ROLES } = require('../middleware/adminRbac');
const { withValidation } = require('../middleware/validation');
const {
  listUsers,
  getUser,
  updateUserStatus,
  deleteUser,
  listStores,
  getStore,
  updateStoreStatus,
  platformAnalytics,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getLogs
} = require('../controllers/adminController');
const { login, me } = require('../controllers/adminAuthController');
const {
  listAllBrands,
  getBrand,
  updateBrandActiveStatus,
  getBrandOnboarding,
  getBrandOnboardingDetails,
  updateOnboarding,
  listInactiveOnboardingBrands,
  listBrandActivity,
  provisionBrand
} = require('../controllers/adminBrandController');
const {
  platformMetrics,
  brandMetrics,
  onboardingFunnel,
  platformAggregates
} = require('../controllers/adminAnalyticsController');
const {
  createTicket,
  listAllTickets,
  getTicket,
  assign,
  updateStatus,
  respond,
  addNote,
  resolve
} = require('../controllers/adminTicketController');
const {
  createCall,
  createCommunication,
  listCommunications,
  listCalls
} = require('../controllers/adminCommunicationController');
const {
  getThemes,
  getThemesByCategory,
  getTheme
} = require('../controllers/themeController');
const {
  listPendingMerchants,
  provisionMerchant,
  updateMerchantDomain,
  getProvisioningDetails
} = require('../controllers/adminProvisioningController');
const {
  createMerchant,
  listMerchantCredentials,
  getMerchantCredentials,
  updateMerchantPassword
} = require('../controllers/adminMerchantProvisioningController');
const {
  listCategoryConfigs,
  getStoreCategoryConfig,
  updateStoreCategoryConfig
} = require('../controllers/categoryConfigController');
const {
  listOrders: listAdminOrders,
  getOrder: getAdminOrder,
  updateStatus: updateAdminOrderStatus,
  updateFulfillment: updateAdminOrderFulfillment,
  updatePaymentStatus: updateAdminPaymentStatus
} = require('../controllers/adminOrderController');
const {
  listProducts: listAdminProducts,
  updateProductStock,
  updateVariantStock
} = require('../controllers/adminProductController');

const router = express.Router();
const guard = [adminAuth, adminRbac([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.SUPPORT_ADMIN])];

router.post(
  '/auth/login',
  withValidation([body('email').isEmail(), body('password').notEmpty()]),
  login
);
router.get('/auth/me', adminAuth, me);

router.get('/users', guard, listUsers);
router.get('/users/:id', guard, getUser);
router.put('/users/:id/status', guard, updateUserStatus);
router.delete('/users/:id', guard, deleteUser);
router.get('/stores', guard, listStores);
router.get('/stores/:id', guard, getStore);
router.put('/stores/:id/status', guard, updateStoreStatus);
router.get('/analytics', guard, platformAnalytics);
router.post('/templates', guard, createTemplate);
router.put('/templates/:id', guard, updateTemplate);
router.delete('/templates/:id', guard, deleteTemplate);
router.get('/logs', guard, getLogs);

router.get('/brands', guard, listAllBrands);
router.get('/brands/:id', guard, getBrand);
router.put(
  '/brands/:id/status',
  guard,
  withValidation([body('isActive').isBoolean().toBoolean()]),
  updateBrandActiveStatus
);
router.get('/brands/:id/onboarding', guard, getBrandOnboarding);
router.get('/brands/:id/onboarding/details', guard, getBrandOnboardingDetails);
router.put(
  '/brands/:id/onboarding/steps',
  guard,
  withValidation([body('stepKey').notEmpty(), body('status').notEmpty()]),
  updateOnboarding
);
router.get('/brands/:id/activity', guard, listBrandActivity);
router.post('/brands/:id/provision', guard, provisionBrand);
router.get('/onboarding/inactive', guard, listInactiveOnboardingBrands);

router.get('/analytics/platform', guard, platformMetrics);
router.get('/analytics/brands/:id', guard, brandMetrics);
router.get('/analytics/onboarding-funnel', guard, onboardingFunnel);
router.get('/analytics/aggregates', guard, platformAggregates);

router.post(
  '/tickets/chatbot',
  guard,
  withValidation([body('storeId').notEmpty(), body('subject').notEmpty(), body('message').notEmpty()]),
  createTicket
);
router.get('/tickets', guard, listAllTickets);
router.get('/tickets/:id', guard, getTicket);
router.post(
  '/tickets/:id/assign',
  guard,
  withValidation([body('adminId').notEmpty()]),
  assign
);
router.put(
  '/tickets/:id/status',
  guard,
  withValidation([body('status').notEmpty()]),
  updateStatus
);
router.post(
  '/tickets/:id/respond',
  guard,
  withValidation([body('message').notEmpty()]),
  respond
);
router.post(
  '/tickets/:id/notes',
  guard,
  withValidation([body('note').notEmpty()]),
  addNote
);
router.post('/tickets/:id/resolve', guard, resolve);

router.get('/brands/:id/communications', guard, listCommunications);
router.post(
  '/brands/:id/communications',
  guard,
  withValidation([body('channel').notEmpty(), body('summary').notEmpty()]),
  createCommunication
);
router.get('/brands/:id/calls', guard, listCalls);
router.post(
  '/brands/:id/calls',
  guard,
  withValidation([body('channel').notEmpty(), body('notes').notEmpty()]),
  createCall
);

router.get('/themes', guard, getThemes);
router.get('/themes/by-category', guard, getThemesByCategory);
router.get('/themes/:id', guard, getTheme);

router.get('/plans', guard, async (req, res) => {
  const plans = await prisma.plan.findMany({ where: { isActive: true } });
  res.json({ plans });
});

// Category config management
router.get('/category-configs', guard, listCategoryConfigs);
router.get('/stores/:storeId/category-config', guard, getStoreCategoryConfig);
router.put(
  '/stores/:storeId/category-config',
  guard,
  withValidation([body('category').notEmpty(), body('config').notEmpty()]),
  updateStoreCategoryConfig
);

// Legacy provisioning routes (for existing stores)
router.get('/provisioning/pending', guard, listPendingMerchants);
router.get('/provisioning/:storeId', guard, getProvisioningDetails);
router.post(
  '/provisioning/:storeId/provision',
  guard,
  withValidation([body('themeId').notEmpty().withMessage('Theme ID is required')]),
  provisionMerchant
);
router.put('/provisioning/:storeId/domain', guard, updateMerchantDomain);

// New merchant provisioning routes (create from scratch)
router.post(
  '/provision',
  guard,
  withValidation([
    body('merchantName').notEmpty().withMessage('Merchant name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('category').notEmpty().withMessage('Category is required'),
    body('theme').notEmpty().withMessage('Theme is required'),
    body('subdomain').notEmpty().withMessage('Subdomain is required')
  ]),
  createMerchant
);

// Merchant credentials management
router.get('/merchant-credentials', guard, listMerchantCredentials);
router.get('/merchant-credentials/:id', guard, getMerchantCredentials);
router.put(
  '/merchant-credentials/:id/password',
  guard,
  withValidation([body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')]),
  updateMerchantPassword
);

// Admin order management
router.get('/orders', guard, listAdminOrders);
router.get('/orders/:id', guard, getAdminOrder);
router.put(
  '/orders/:id/status',
  guard,
  withValidation([body('status').notEmpty()]),
  updateAdminOrderStatus
);
router.put(
  '/orders/:id/fulfillment',
  guard,
  withValidation([body('fulfillmentStatus').notEmpty()]),
  updateAdminOrderFulfillment
);
router.put(
  '/orders/:id/payment',
  guard,
  withValidation([body('paymentStatus').notEmpty()]),
  updateAdminPaymentStatus
);

// Admin product inventory
router.get('/products', guard, listAdminProducts);
router.put(
  '/products/:id/stock',
  guard,
  withValidation([body('stock').isInt({ min: 0 })]),
  updateProductStock
);
router.put(
  '/variants/:variantId/stock',
  guard,
  withValidation([body('stock').isInt({ min: 0 })]),
  updateVariantStock
);

module.exports = router;
