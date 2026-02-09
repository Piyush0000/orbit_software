const Redis = require('ioredis');

let redisClient = null;
let redisUnavailable = false;
let redisErrorLogged = false;

const getRedis = () => {
  if (!process.env.REDIS_URL || redisUnavailable) return null;
  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      enableOfflineQueue: false,
      lazyConnect: true
    });
    redisClient.on('error', (err) => {
      if (!redisErrorLogged) {
        console.error('Redis error, disabling cache:', err?.message || err);
        redisErrorLogged = true;
      }
      redisUnavailable = true;
      try {
        redisClient?.disconnect();
      } catch (_) {
        // ignore
      }
      redisClient = null;
    });
  }
  return redisClient;
};

const safeGet = async (key) => {
  try {
    const redis = getRedis();
    if (!redis) return null;
    return await redis.get(key);
  } catch (_) {
    return null;
  }
};

const safeSet = async (key, value, ttlSeconds) => {
  try {
    const redis = getRedis();
    if (!redis) return null;
    return await redis.set(key, value, 'EX', ttlSeconds);
  } catch (_) {
    return null;
  }
};

const delKeys = async (keys) => {
  try {
    const redis = getRedis();
    if (!redis || keys.length === 0) return 0;
    return await redis.del(...keys);
  } catch (_) {
    return 0;
  }
};

const delByPattern = async (pattern) => {
  const redis = getRedis();
  if (!redis) return 0;

  let cursor = '0';
  const keysToDelete = [];

  try {
    do {
      const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = nextCursor;
      if (keys.length) keysToDelete.push(...keys);
    } while (cursor !== '0');
  } catch (_) {
    return 0;
  }

  if (keysToDelete.length === 0) return 0;
  return delKeys(keysToDelete);
};

const invalidateStoreCustomization = async ({ storeId, subdomain, userId }) => {
  if (storeId) {
    await delKeys([`store:customization:storeId:${storeId}`]);
  }
  if (subdomain) {
    await delKeys([`store:customization:subdomain:${subdomain}`]);
  }
  if (userId) {
    await delKeys([`store:customization:user:${userId}`]);
  }
};

const invalidateStoreProducts = async ({ storeId, subdomain, userId }) => {
  if (storeId) {
    await delByPattern(`store:products:storeId:${storeId}:*`);
  }
  if (subdomain) {
    await delByPattern(`store:products:subdomain:${subdomain}:*`);
  }
  if (userId) {
    await delByPattern(`store:products:user:${userId}:*`);
  }
};

module.exports = {
  getRedis,
  safeGet,
  safeSet,
  delByPattern,
  invalidateStoreCustomization,
  invalidateStoreProducts
};
