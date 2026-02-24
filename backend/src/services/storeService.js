const { prisma } = require('../config/database');

/**
 * Ensures a store exists for the given user.
 * If a store exists, it returns it.
 * If not, it creates a new default store and returns it.
 * 
 * @param {Object} user - The user object from req.user
 * @returns {Promise<Object>} The store object
 */

const seedDummyProducts = async (storeId, category) => {
  const dummyProducts = [];
  
  const cat = (category || '').toLowerCase();
  
  if (cat.includes('fragrance') || cat.includes('perfume')) {
    dummyProducts.push(
      { name: "Velvet Rose Perfume", description: "Elegant floral scent with notes of amber and rose in a luxurious bottle.", price: "49.99", compareAtPrice: "65.00", sku: "FRAG-ROSE-01", stock: 100, category: "Women's Fragrance", images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: true, storeId },
      { name: "Oud Noir Collection", description: "Deep and dark premium oud fragrance for the modern connoisseur.", price: "89.99", compareAtPrice: "120.00", sku: "FRAG-OUD-02", stock: 50, category: "Unisex Fragrance", images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: true, storeId },
      { name: "Citrus Botanical Splash", description: "Fresh and vibrant summer scent made from organic Sicilian lemons.", price: "34.99", sku: "FRAG-CIT-03", stock: 150, category: "Men's Fragrance", images: ["https://images.unsplash.com/photo-1595535373300-8822db0c7f07?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: false, storeId },
      { name: "Midnight Amber", description: "A warm, mysterious blend of amber, vanilla, and patchouli.", price: "65.00", compareAtPrice: "85.00", sku: "FRAG-AMB-04", stock: 75, category: "Unisex Fragrance", images: ["https://images.unsplash.com/photo-1627960613867-27b9ef0ca1a6?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: false, storeId }
    );
  } else if (cat.includes('jewel')) {
    dummyProducts.push(
      { name: "Diamond Solitaire Ring", description: "A stunning 1-carat diamond ring in 18k white gold.", price: "1299.00", compareAtPrice: "1500.00", sku: "JWL-R1", stock: 10, category: "Rings", images: ["https://images.unsplash.com/photo-1605100804763-247f67b454bf?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: true, storeId },
      { name: "Gold Chain Necklace", description: "Elegant everyday link chain crafted purely in 14k gold.", price: "399.00", sku: "JWL-N1", stock: 25, category: "Necklaces", images: ["https://images.unsplash.com/photo-1599643478524-fb5244585cbe?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: true, storeId },
      { name: "Pearl Drop Earrings", description: "Classic freshwater pearl earrings with silver posts.", price: "89.99", compareAtPrice: "120.00", sku: "JWL-E1", stock: 40, category: "Earrings", images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: false, storeId },
      { name: "Sapphire Tennis Bracelet", description: "Exquisite blue sapphire tennis bracelet for special occasions.", price: "650.00", compareAtPrice: "800.00", sku: "JWL-B1", stock: 5, category: "Bracelets", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: false, storeId }
    );
  } else {
    // Default/Electronics
    dummyProducts.push(
      { name: "Pro Wireless Headphones", description: "Active noise-canceling over-ear headphones with 30-hour battery life.", price: "249.99", compareAtPrice: "299.99", sku: "ELEC-WH-001", stock: 50, category: "Audio", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: true, storeId },
      { name: "Ultra-Fast Smartphone", description: "Latest flagship phone with 120Hz OLED display and an amazing camera.", price: "899.00", compareAtPrice: "999.00", sku: "ELEC-PH-002", stock: 30, category: "Smartphones", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: true, storeId },
      { name: "4K Gaming Monitor", description: "27-inch 144Hz 4K IPS monitor ideal for high-end gaming.", price: "450.00", sku: "ELEC-MN-003", stock: 45, category: "Monitors", images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: false, storeId },
      { name: "Mechanical Keyboard", description: "RGB mechanical keyboard with tactile blue switches.", price: "85.00", compareAtPrice: "110.00", sku: "ELEC-KB-005", stock: 60, category: "Accessories", images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800"], isActive: true, isFeatured: false, storeId }
    );
  }

  try {
    await prisma.product.createMany({
      data: dummyProducts
    });
    console.log(`[StoreService] Seeded ${dummyProducts.length} dummy products for store ${storeId}.`);
  } catch (error) {
    console.error(`[StoreService] Failed to seed dummy products for store ${storeId}:`, error);
  }
};
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
        currency: 'USD'
      }
    });
    
    // Seed dummy products for the store to prevent empty UI
    await seedDummyProducts(store.id, store.category);

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
  getStoreById,
  seedDummyProducts
};
