const {
  getPlatformMetrics,
  getBrandMetrics,
  getOnboardingFunnelMetrics,
  listPlatformAggregates
} = require('../services/adminAnalyticsService');

const platformMetrics = async (_req, res, next) => {
  try {
    const metrics = await getPlatformMetrics();
    res.json({ metrics });
  } catch (err) {
    next(err);
  }
};

const brandMetrics = async (req, res, next) => {
  try {
    const metrics = await getBrandMetrics(req.params.id);
    res.json({ metrics });
  } catch (err) {
    next(err);
  }
};

const onboardingFunnel = async (_req, res, next) => {
  try {
    const metrics = await getOnboardingFunnelMetrics();
    res.json({ metrics });
  } catch (err) {
    next(err);
  }
};

const platformAggregates = async (req, res, next) => {
  try {
    const { periodType, start, end } = req.query;
    const aggregates = await listPlatformAggregates({
      periodType,
      start: start ? new Date(start) : undefined,
      end: end ? new Date(end) : undefined
    });
    res.json({ aggregates });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  platformMetrics,
  brandMetrics,
  onboardingFunnel,
  platformAggregates
};
