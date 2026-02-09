const { prisma } = require('../config/database');
const { invalidateStoreCustomization } = require('../services/cacheService');

const resolveStoreId = async (req) => {
  if (req.params.storeId) return req.params.storeId;
  if (!req.user?.id) return null;
  const store = await prisma.store.findFirst({
    where: { userId: req.user.id },
    select: { id: true }
  });
  return store?.id || null;
};

// Get customization for a store
const getCustomization = async (req, res, next) => {
  try {
    const storeId = await resolveStoreId(req);
    if (!storeId) {
      return res.status(404).json({ message: 'Store not found' });
    }

    let customization = await prisma.websiteCustomization.findUnique({
      where: { storeId }
    });

    if (!customization) {
      customization = await prisma.websiteCustomization.create({
        data: {
          storeId,
          brandColors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FF6B6B' },
          typography: { headingFont: 'Inter', bodyFont: 'Inter' }
        }
      });
    }

    res.json({ customization });
  } catch (error) {
    next(error);
  }
};

// Update customization
const updateCustomization = async (req, res, next) => {
  try {
    const storeId = await resolveStoreId(req);
    if (!storeId) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const updateData = req.body;
    const createData = {
      storeId,
      keywords: Array.isArray(updateData.keywords) ? updateData.keywords : [],
      ...updateData
    };
    const customization = await prisma.websiteCustomization.upsert({
      where: { storeId },
      update: updateData,
      create: createData
    });

    // Invalidate Cache
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { subdomain: true, userId: true }
    });
    
    await invalidateStoreCustomization({
      storeId,
      subdomain: store?.subdomain,
      userId: store?.userId || req.user?.id
    });

    res.json({ customization });
  } catch (error) {
    console.error('Update Customization Error:', error);
    next(error);
  }
};

module.exports = { getCustomization, updateCustomization };
