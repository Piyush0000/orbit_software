const { prisma } = require('../config/database');

/**
 * Ensures a store exists for the given user.
 * If a store exists, it returns it.
 * If not, it creates a new default store and returns it.
 * 
 * @param {Object} user - The user object from req.user
 * @returns {Promise<Object>} The store object
 */
const ensureStoreExists = async (user) => {
  if (!user || !user.id) {
    throw new Error('User is required to ensure store exists');
  }

  // 1. Check if store already exists
  let store = await prisma.store.findFirst({
    where: { userId: user.id }
  });

  // 2. If store exists, return it
  if (store) {
    return store;
  }

  // 3. If no store, create one with default values
  const timestamp = Date.now().toString(36);
  const identifier = user.email ? user.email.split('@')[0] : 'store';
  // Sanitize identifier for subdomain (alphanumeric only)
  const safeId = identifier.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  const subdomain = `${safeId}-${timestamp}`;
  const storeName = user.fullName ? `${user.fullName}'s Store` : 'My New Store';

  console.log(`[StoreService] Auto-provisioning store for user ${user.id} (${user.email})...`);

  try {
    store = await prisma.store.create({
      data: {
        userId: user.id,
        name: storeName,
        subdomain: subdomain,
        description: 'Welcome to your new store!',
        isActive: true,
        // status: 'ACTIVE', // Removed as it is not in the schema
        onboardingStatus: 'COMPLETED',
        category: 'Electronics',
        // Initialize with default theme if applicable
        theme: 'orbit_upfront' 
      }
    });

    // Optionally init settings or empty customization here if needed, 
    // but controllers often handle that lazily. 
    // For robustness, we could init StoreSettings here too.
    await prisma.storeSettings.create({
      data: {
        storeId: store.id,
        currency: 'USD',
        language: 'en'
      }
    });

    console.log(`[StoreService] Successfully created store: ${store.id} (${store.subdomain})`);
    return store;

  } catch (error) {
    console.error(`[StoreService] Failed to auto-create store:`, error);
    throw error;
  }
};

/**
 * Gets a store by ID, or throws if not found/unauthorized (optional strict mode)
 */
const getStoreById = async (storeId) => {
  return await prisma.store.findUnique({
    where: { id: storeId }
  });
};

module.exports = {
  ensureStoreExists,
  getStoreById
};
