const { prisma } = require('../config/database');
const { ONBOARDING_STATUS, ONBOARDING_STEP_STATUS } = require('../config/constants');

const listBrands = async ({ isActive } = {}) => {
  const where = {};
  if (typeof isActive === 'boolean') {
    where.isActive = isActive;
  }
  return prisma.store.findMany({
    where,
    include: {
      user: true,
      onboarding: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

const getBrandById = async (storeId) =>
  prisma.store.findUnique({
    where: { id: storeId },
    include: {
      user: true,
      onboarding: true,
      onboardingSteps: { orderBy: { updatedAt: 'desc' } },
      activityLogs: { orderBy: { createdAt: 'desc' }, take: 50 }
    }
  });

const logBrandActivity = async ({ storeId, adminId, action, metadata }) =>
  prisma.brandActivityLog.create({
    data: {
      storeId,
      adminId,
      actorType: 'ADMIN',
      action,
      metadata
    }
  });

const updateBrandStatus = async ({ storeId, isActive, reason, adminId }) => {
  const updated = await prisma.store.update({
    where: { id: storeId },
    data: {
      isActive,
      suspendedAt: isActive ? null : new Date(),
      suspendedReason: isActive ? null : reason || null
    }
  });
  await logBrandActivity({
    storeId,
    adminId,
    action: isActive ? 'BRAND_REACTIVATED' : 'BRAND_SUSPENDED',
    metadata: { reason: reason || null }
  });
  return updated;
};

const refreshOnboardingStatus = async (storeId) => {
  const [steps, store] = await Promise.all([
    prisma.brandOnboardingStep.findMany({ where: { storeId } }),
    prisma.store.findUnique({ where: { id: storeId }, select: { onboardingStartedAt: true } })
  ]);
  const now = new Date();
  if (steps.length === 0) {
    return prisma.store.update({
      where: { id: storeId },
      data: {
        onboardingStatus: ONBOARDING_STATUS.NOT_STARTED,
        onboardingStartedAt: null,
        onboardingCompletedAt: null,
        lastOnboardingActivityAt: now
      }
    });
  }

  const completedCount = steps.filter((step) => step.status === ONBOARDING_STEP_STATUS.COMPLETED).length;
  const isCompleted = completedCount === steps.length;
  const startedAt = store?.onboardingStartedAt || now;

  return prisma.store.update({
    where: { id: storeId },
    data: {
      onboardingStatus: isCompleted ? ONBOARDING_STATUS.COMPLETED : ONBOARDING_STATUS.IN_PROGRESS,
      onboardingStartedAt: startedAt,
      onboardingCompletedAt: isCompleted ? now : null,
      lastOnboardingActivityAt: now
    }
  });
};

const upsertOnboardingStep = async ({ storeId, stepKey, status }) => {
  const now = new Date();
  const updated = await prisma.brandOnboardingStep.upsert({
    where: { storeId_stepKey: { storeId, stepKey } },
    update: {
      status,
      completedAt: status === ONBOARDING_STEP_STATUS.COMPLETED ? now : null
    },
    create: {
      storeId,
      stepKey,
      status,
      completedAt: status === ONBOARDING_STEP_STATUS.COMPLETED ? now : null
    }
  });
  await prisma.store.update({
    where: { id: storeId },
    data: {
      onboardingStartedAt: now,
      lastOnboardingActivityAt: now,
      onboardingStatus: ONBOARDING_STATUS.IN_PROGRESS
    }
  });
  await refreshOnboardingStatus(storeId);
  return updated;
};

const getOnboardingStatus = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: { onboardingSteps: true }
  });
  if (!store) return null;
  const incompleteSteps = store.onboardingSteps.filter(
    (step) => step.status !== ONBOARDING_STEP_STATUS.COMPLETED
  );
  return { store, incompleteSteps };
};

const listInactiveOnboarding = async ({ inactivityDays }) => {
  const cutoff = new Date(Date.now() - inactivityDays * 24 * 60 * 60 * 1000);
  return prisma.store.findMany({
    where: {
      onboardingStatus: { not: ONBOARDING_STATUS.COMPLETED },
      OR: [
        { lastOnboardingActivityAt: { lt: cutoff } },
        { lastOnboardingActivityAt: null }
      ]
    },
    include: { user: true },
    orderBy: { lastOnboardingActivityAt: 'asc' }
  });
};

module.exports = {
  listBrands,
  getBrandById,
  updateBrandStatus,
  upsertOnboardingStep,
  getOnboardingStatus,
  listInactiveOnboarding,
  logBrandActivity
};
