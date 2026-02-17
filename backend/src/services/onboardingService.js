const { prisma } = require('../config/database');
const { ONBOARDING_STATUS, ONBOARDING_STEP_STATUS } = require('../config/constants');

const STEP_KEYS = [
  'BRAND_BASICS',
  'BUSINESS_DETAILS',
  'STOREFRONT_PREFERENCES',
  'MARKETING_INTENT',
  'CONFIRMATION'
];

const STEP_FIELD_REQUIREMENTS = {
  BRAND_BASICS: ['brandName', 'brandCategory'],
  BUSINESS_DETAILS: [
    'businessLegalName',
    'businessType',
    'industry',
    'supportEmail',
    'supportPhone'
  ],
  STOREFRONT_PREFERENCES: [
    'storeName',
    'preferredTheme',
    'primaryBrandColor',
    'logoUrl'
  ],
  MARKETING_INTENT: [
    'willRunMetaAds',
    'monthlyAdBudget',
    'targetMarkets',
    'productType'
  ],
  CONFIRMATION: ['acceptTerms']
};

const isEmptyValue = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'boolean') return false;
  return false;
};

const getMissingFieldsForStep = (stepKey, stepData) => {
  const required = STEP_FIELD_REQUIREMENTS[stepKey] || [];
  const data = stepData || {};
  return required.filter((field) => isEmptyValue(data[field]));
};

const getCompletionPercent = (stepDataByKey) => {
  const totalSteps = STEP_KEYS.length;
  const completedSteps = STEP_KEYS.filter((key) => {
    const missing = getMissingFieldsForStep(key, stepDataByKey?.[key]);
    return missing.length === 0;
  }).length;
  return Math.round((completedSteps / totalSteps) * 100);
};

const getStepIndex = (stepKey) => STEP_KEYS.indexOf(stepKey) + 1;

const ensureStoreForUser = async (userId, brandName) => {
  const existing = await prisma.store.findFirst({ where: { userId } });
  if (existing) return existing;
  if (!brandName) return null;

  const baseSlug = String(brandName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
  let slug = baseSlug || `brand-${Date.now()}`;
  let suffix = 1;

  while (await prisma.store.findUnique({ where: { subdomain: slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return prisma.store.create({
    data: {
      name: brandName,
      subdomain: slug,
      userId,
      onboardingStatus: ONBOARDING_STATUS.IN_PROGRESS,
      onboardingStartedAt: new Date(),
      lastOnboardingActivityAt: new Date()
    }
  });
};

const upsertOnboarding = async ({ storeId, stepKey, data, isCompleteStep }) => {
  const existing = await prisma.brandOnboarding.findUnique({ where: { storeId } });
  const stepData = {
    ...(existing?.stepData || {}),
    [stepKey]: data
  };
  const completionPercent = getCompletionPercent(stepData);
  const stepIndex = getStepIndex(stepKey);
  const currentStep = isCompleteStep
    ? Math.max(existing?.currentStep || 1, stepIndex)
    : existing?.currentStep || stepIndex;
  const status =
    completionPercent === 100 ? ONBOARDING_STATUS.COMPLETED : ONBOARDING_STATUS.IN_PROGRESS;

  const onboarding = await prisma.brandOnboarding.upsert({
    where: { storeId },
    update: {
      status,
      currentStep,
      completionPercent,
      stepData,
      lastStepSavedAt: new Date(),
      ...(status === ONBOARDING_STATUS.COMPLETED && { completedAt: new Date() })
    },
    create: {
      storeId,
      status,
      currentStep,
      completionPercent,
      stepData,
      startedAt: new Date(),
      lastStepSavedAt: new Date(),
      ...(status === ONBOARDING_STATUS.COMPLETED && { completedAt: new Date() })
    }
  });

  await prisma.brandOnboardingStep.upsert({
    where: { storeId_stepKey: { storeId, stepKey } },
    update: {
      status: isCompleteStep ? ONBOARDING_STEP_STATUS.COMPLETED : ONBOARDING_STEP_STATUS.PENDING,
      completedAt: isCompleteStep ? new Date() : null
    },
    create: {
      storeId,
      stepKey,
      status: isCompleteStep ? ONBOARDING_STEP_STATUS.COMPLETED : ONBOARDING_STEP_STATUS.PENDING,
      completedAt: isCompleteStep ? new Date() : null
    }
  });

  return onboarding;
};

const updateStoreFromStep = async ({ storeId, stepKey, data }) => {
  if (stepKey === 'BRAND_BASICS') {
    await prisma.store.update({
      where: { id: storeId },
      data: {
        name: data.brandName,
        lastOnboardingActivityAt: new Date(),
        onboardingStatus: ONBOARDING_STATUS.IN_PROGRESS,
        onboardingStartedAt: new Date()
      }
    });
  }

  if (stepKey === 'BUSINESS_DETAILS') {
    await prisma.storeSettings.upsert({
      where: { storeId },
      update: {
        contactEmail: data.supportEmail,
        contactPhone: data.supportPhone
      },
      create: {
        storeId,
        contactEmail: data.supportEmail,
        contactPhone: data.supportPhone
      }
    });
  }

  if (stepKey === 'STOREFRONT_PREFERENCES') {
    await prisma.store.update({
      where: { id: storeId },
      data: {
        name: data.storeName,
        customDomain: data.domain || null,
        logo: data.logoUrl || null,
        lastOnboardingActivityAt: new Date()
      }
    });
  }
};

const getMissingFields = (stepDataByKey) =>
  STEP_KEYS.reduce((acc, key) => {
    acc[key] = getMissingFieldsForStep(key, stepDataByKey?.[key]);
    return acc;
  }, {});

module.exports = {
  STEP_KEYS,
  STEP_FIELD_REQUIREMENTS,
  getMissingFieldsForStep,
  getCompletionPercent,
  getStepIndex,
  ensureStoreForUser,
  upsertOnboarding,
  updateStoreFromStep,
  getMissingFields
};
