const { prisma } = require('../config/database');
const { ONBOARDING_STATUS, ROLES } = require('../config/constants');
const { signUserToken } = require('../middleware/metaAuth');
const crypto = require('crypto');
const {
  STEP_KEYS,
  getMissingFieldsForStep,
  getMissingFields,
  getStepIndex,
  ensureStoreForUser,
  upsertOnboarding,
  updateStoreFromStep
} = require('../services/onboardingService');

const getOptions = async (_req, res) => {
  res.json({
    categories: ['Apparel', 'Beauty', 'Electronics', 'Home', 'Wellness', 'Other'],
    businessTypes: ['Individual', 'Company'],
    industries: ['Retail', 'Services', 'Manufacturing', 'Technology', 'Other'],
    countries: ['IN'],
    themes: ['Orbit Classic', 'Orbit Modern', 'Orbit Bold']
  });
};

const createGuestSession = async (_req, res, next) => {
  try {
    const email = `guest-${crypto.randomUUID()}@onboarding.local`;
    const user = await prisma.user.create({
      data: {
        email,
        password: crypto.randomBytes(24).toString('hex'),
        fullName: 'Guest Brand',
        role: ROLES.MERCHANT,
        isActive: true,
        emailVerified: false
      }
    });
    const token = signUserToken(user);
    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
};

const getOnboarding = async (req, res, next) => {
  try {
    const store = await prisma.store.findFirst({
      where: { userId: req.user.id },
      include: { onboarding: true, onboardingSteps: true }
    });
    if (!store) {
      return res.json({
        status: ONBOARDING_STATUS.NOT_STARTED,
        currentStep: 1,
        completionPercent: 0,
        stepData: {},
        steps: []
      });
    }

    const onboarding = store.onboarding;
    const stepData = onboarding?.stepData || {};

    res.json({
      store: {
        id: store.id,
        name: store.name,
        subdomain: store.subdomain,
        customDomain: store.customDomain,
        onboardingStatus: store.onboardingStatus
      },
      onboarding: onboarding
        ? {
            status: onboarding.status,
            currentStep: onboarding.currentStep,
            completionPercent: onboarding.completionPercent,
            stepData,
            startedAt: onboarding.startedAt,
            completedAt: onboarding.completedAt,
            lastStepSavedAt: onboarding.lastStepSavedAt
          }
        : {
            status: store.onboardingStatus,
            currentStep: 1,
            completionPercent: 0,
            stepData: {}
          },
      steps: store.onboardingSteps || [],
      missingFields: getMissingFields(stepData)
    });
  } catch (err) {
    next(err);
  }
};

const updateStep = async (req, res, next) => {
  try {
    const stepKey = req.params.stepKey;
    if (!STEP_KEYS.includes(stepKey)) {
      return res.status(400).json({ message: 'Invalid step' });
    }

    const data = req.body?.data || {};
    const allowPartial = req.body?.partial === true;
    const missing = getMissingFieldsForStep(stepKey, data);
    if (missing.length && !allowPartial) {
      return res.status(400).json({ message: 'Missing required fields', missing });
    }

    let store = await prisma.store.findFirst({ where: { userId: req.user.id } });
    if (!store) {
      if (stepKey !== 'BRAND_BASICS') {
        return res.status(400).json({ message: 'Start onboarding with brand basics' });
      }
      if (!data.brandName) {
        return res.status(400).json({ message: 'brandName required to start onboarding' });
      }
      store = await ensureStoreForUser(req.user.id, data.brandName);
    }

    const onboarding = await prisma.brandOnboarding.findUnique({
      where: { storeId: store.id }
    });
    const stepIndex = getStepIndex(stepKey);
    const currentStep = onboarding?.currentStep || 1;
    if (stepIndex > currentStep + 1) {
      return res.status(400).json({ message: 'Complete previous steps first' });
    }

    const isCompleteStep = missing.length === 0;
    if (isCompleteStep) {
      await updateStoreFromStep({ storeId: store.id, stepKey, data });
    }
    const updated = await upsertOnboarding({
      storeId: store.id,
      stepKey,
      data,
      isCompleteStep
    });

    res.json({
      onboarding: {
        status: updated.status,
        currentStep: updated.currentStep,
        completionPercent: updated.completionPercent,
        stepData: updated.stepData,
        lastStepSavedAt: updated.lastStepSavedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

const submitOnboarding = async (req, res, next) => {
  try {
    const store = await prisma.store.findFirst({ where: { userId: req.user.id } });
    if (!store) {
      return res.status(400).json({ message: 'No store found for user' });
    }
    const onboarding = await prisma.brandOnboarding.findUnique({
      where: { storeId: store.id }
    });
    if (!onboarding) {
      return res.status(400).json({ message: 'Onboarding not started' });
    }

    const missing = getMissingFields(onboarding.stepData || {});
    const hasMissing = Object.values(missing).some((fields) => fields.length > 0);
    if (hasMissing) {
      return res.status(400).json({ message: 'Onboarding incomplete', missingFields: missing });
    }

    const updated = await prisma.brandOnboarding.update({
      where: { storeId: store.id },
      data: {
        status: ONBOARDING_STATUS.COMPLETED,
        completionPercent: 100,
        completedAt: new Date()
      }
    });

    await prisma.store.update({
      where: { id: store.id },
      data: {
        isActive: true,
        onboardingStatus: ONBOARDING_STATUS.COMPLETED,
        onboardingCompletedAt: new Date()
      }
    });

    res.json({ onboarding: updated });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOptions,
  createGuestSession,
  getOnboarding,
  updateStep,
  submitOnboarding
};
