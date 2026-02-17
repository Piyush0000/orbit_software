const { prisma } = require('../config/database');

// Get store data by subdomain (for public websites)
const getStoreBySubdomain = async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    const store = await prisma.store.findFirst({
      where: { subdomain, isActive: true },
      include: {
        themeTemplate: true,
        plan: true,
        deployment: true,
        categoryConfig: true,
        websiteCustomization: true, // Include customization
        user: { select: { email: true, fullName: true } }
      }
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Rename websiteCustomization to customization for cleaner API
    const { websiteCustomization, ...storeData } = store;
    const response = {
      ...storeData,
      customization: websiteCustomization,
      categoryConfig: store.categoryConfig?.config || null
    };

    res.json({ store: response });
  } catch (error) {
    next(error);
  }
};

// Get products for a store (public)
const getStoreProducts = async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    const store = await prisma.store.findFirst({
      where: { subdomain }
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const products = await prisma.product.findMany({
      where: { storeId: store.id, isActive: true },
      include: { variants: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ products });
  } catch (error) {
    next(error);
  }
};

// Get website customization (public)
const getStoreCustomization = async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    const store = await prisma.store.findFirst({
      where: { subdomain }
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const customization = await prisma.websiteCustomization.findUnique({
      where: { storeId: store.id }
    });

    res.json({ customization });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStoreBySubdomain, getStoreProducts, getStoreCustomization };
