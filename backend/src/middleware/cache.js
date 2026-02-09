const { safeGet, safeSet } = require('../services/cacheService');

const cache = (keyBuilder, ttlSeconds = 60) => async (req, res, next) => {
  try {
    const key = keyBuilder(req);
    const cached = await safeGet(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      safeSet(key, JSON.stringify(body), ttlSeconds).catch(() => {});
      return originalJson(body);
    };
    return next();
  } catch (err) {
    return next();
  }
};

module.exports = { cache };
