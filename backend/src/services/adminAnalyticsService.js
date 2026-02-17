const { prisma } = require('../config/database');
const { getStoreAnalytics } = require('./analyticsService');

const getPlatformMetrics = async () => {
  const [storeCount, activeStoreCount, merchantCount, orderStats] = await Promise.all([
    prisma.store.count(),
    prisma.store.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: 'MERCHANT' } }),
    prisma.order.aggregate({
      _sum: { total: true },
      _count: { _all: true },
      _avg: { total: true }
    })
  ]);

  return {
    stores: storeCount,
    activeStores: activeStoreCount,
    merchants: merchantCount,
    orders: orderStats._count._all,
    revenue: orderStats._sum.total || 0,
    averageOrderValue: orderStats._avg.total || 0
  };
};

const getBrandMetrics = async (storeId) => getStoreAnalytics(storeId);

const getOnboardingFunnelMetrics = async () => {
  const [statusCounts, stepCounts, totalStores] = await Promise.all([
    prisma.store.groupBy({
      by: ['onboardingStatus'],
      _count: { _all: true }
    }),
    prisma.brandOnboardingStep.groupBy({
      by: ['stepKey', 'status'],
      _count: { _all: true }
    }),
    prisma.store.count()
  ]);

  const statusSummary = statusCounts.reduce((acc, item) => {
    acc[item.onboardingStatus] = item._count._all;
    return acc;
  }, {});

  const stepSummary = stepCounts.reduce((acc, item) => {
    if (!acc[item.stepKey]) acc[item.stepKey] = {};
    acc[item.stepKey][item.status] = item._count._all;
    return acc;
  }, {});

  return {
    totalStores,
    statusSummary,
    stepSummary
  };
};

const listPlatformAggregates = async ({ periodType, start, end }) => {
  const where = {};
  if (periodType) where.periodType = periodType;
  if (start || end) {
    where.periodStart = {};
    if (start) where.periodStart.gte = start;
    if (end) where.periodStart.lte = end;
  }
  return prisma.platformAnalyticsAggregate.findMany({
    where,
    orderBy: { periodStart: 'desc' }
  });
};

module.exports = {
  getPlatformMetrics,
  getBrandMetrics,
  getOnboardingFunnelMetrics,
  listPlatformAggregates
};
