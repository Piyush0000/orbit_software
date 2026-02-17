const { prisma } = require('../config/database');
const {
  listBrands,
  getBrandById,
  updateBrandStatus,
  getOnboardingStatus,
  upsertOnboardingStep,
  listInactiveOnboarding
} = require('../services/adminBrandService');
const { getMissingFields } = require('../services/onboardingService');

const listAllBrands = async (req, res, next) => {
  try {
    const isActive = req.query.isActive ? req.query.isActive === 'true' : undefined;
    const stores = await listBrands({ isActive });
    res.json({ stores });
  } catch (err) {
    next(err);
  }
};

const getBrand = async (req, res, next) => {
  try {
    const store = await getBrandById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Brand not found' });
    const stepData = store.onboarding?.stepData || {};
    const missingFields = getMissingFields(stepData);
    res.json({ store, onboarding: store.onboarding, missingFields });
  } catch (err) {
    next(err);
  }
};

const updateBrandActiveStatus = async (req, res, next) => {
  try {
    const { isActive, reason } = req.body;
    const store = await updateBrandStatus({
      storeId: req.params.id,
      isActive,
      reason,
      adminId: req.admin.id
    });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const getBrandOnboarding = async (req, res, next) => {
  try {
    const data = await getOnboardingStatus(req.params.id);
    if (!data) return res.status(404).json({ message: 'Brand not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getBrandOnboardingDetails = async (req, res, next) => {
  try {
    const store = await getBrandById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Brand not found' });
    const onboarding = store.onboarding || null;
    const stepData = onboarding?.stepData || {};
    res.json({
      store,
      onboarding,
      steps: store.onboardingSteps || [],
      missingFields: getMissingFields(stepData)
    });
  } catch (err) {
    next(err);
  }
};

const updateOnboarding = async (req, res, next) => {
  try {
    const { stepKey, status } = req.body;
    const step = await upsertOnboardingStep({
      storeId: req.params.id,
      stepKey,
      status
    });
    res.json({ step });
  } catch (err) {
    next(err);
  }
};

const listInactiveOnboardingBrands = async (req, res, next) => {
  try {
    const inactivityDays = Number(req.query.days || 7);
    const stores = await listInactiveOnboarding({ inactivityDays });
    res.json({ stores, inactivityDays });
  } catch (err) {
    next(err);
  }
};

const provisioningService = require('../services/provisioningService');

const listBrandActivity = async (req, res, next) => {
  try {
    const logs = await prisma.brandActivityLog.findMany({
      where: { storeId: req.params.id },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

const provisionBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const config = req.body;
    const result = await provisioningService.provisionMerchant(id, config);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listAllBrands,
  getBrand,
  updateBrandActiveStatus,
  getBrandOnboarding,
  getBrandOnboardingDetails,
  updateOnboarding,
  listInactiveOnboardingBrands,
  listBrandActivity,
  provisionBrand
};
