const { prisma } = require('../config/database');
const { getDefaultCategoryConfig, normalizeCategory } = require('../utils/categoryConfigs');

/**
 * List all pending merchants awaiting provisioning
 * GET /api/admin/provisioning/pending
 */
const listPendingMerchants = async (req, res, next) => {
  try {
    const pendingStores = await prisma.store.findMany({
      where: {
        provisioningStatus: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            createdAt: true
          }
        },
        onboarding: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      merchants: pendingStores
    });
  } catch (error) {
    console.error('List pending merchants error:', error);
    next(error);
  }
};

/**
 * Provision a merchant: assign theme, create website customization, activate store
 * POST /api/admin/provisioning/:storeId/provision
 * Body: { themeId, planId?, categoryConfig? }
 */
const provisionMerchant = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { themeId, planId, categoryConfig } = req.body;

    if (!themeId) {
      return res.status(400).json({
        success: false,
        message: 'themeId is required'
      });
    }

    // Verify store exists and is pending
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: { user: true }
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    if (store.provisioningStatus !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message: `Store is already ${store.provisioningStatus.toLowerCase()}`
      });
    }

    // Verify theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId }
    });

    if (!theme) {
      return res.status(404).json({
        success: false,
        message: 'Theme not found'
      });
    }

    // Provision the merchant
    const updatedStore = await prisma.$transaction(async (tx) => {
      // 1. Update store with theme and activate
      const updated = await tx.store.update({
        where: { id: storeId },
        data: {
          themeId,
          provisioningStatus: 'COMPLETED',
          onboardingStatus: 'IN_PROGRESS',
          isActive: true
        }
      });

      // 2. Create default website customization
      await tx.websiteCustomization.create({
        data: {
          storeId,
          logo: null,
          favicon: null,
          brandColors: {
            primary: theme.primaryColor || '#6366f1',
            secondary: theme.secondaryColor || '#ec4899',
            accent: '#8b5cf6'
          },
          typography: {
            fontFamily: theme.fontFamily || 'Inter',
            headingFont: theme.fontFamily || 'Inter',
            bodyFont: theme.fontFamily || 'Inter'
          },
          heroSection: {
            title: `Discover ${store.name}`,
            subtitle: 'Quality products for you',
            backgroundImage: null,
            ctaText: 'Shop Now',
            ctaLink: '/products'
          },
          aboutSection: {
            title: `About ${store.name}`,
            content: `${store.name} is committed to bringing you the best products.`,
            image: null
          },
          contactInfo: {
            email: store.user.email,
            phone: '',
            address: ''
          },
          headerStyle: 'modern',
          footerContent: {
            copyright: `© ${new Date().getFullYear()} ${store.name}. All rights reserved.`,
            links: []
          },
          metaTitle: store.name,
          metaDescription: `Shop at ${store.name} for quality products`,
          keywords: [store.category || 'store', 'products', 'shop'],
          socialLinks: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: ''
          }
        }
      });

      // 3. Create or update category config
      const normalizedCategory = normalizeCategory(store.category || '');
      const config = categoryConfig || getDefaultCategoryConfig(normalizedCategory || 'general');
      await tx.storeCategoryConfig.upsert({
        where: { storeId },
        update: {
          category: normalizedCategory || 'general',
          config
        },
        create: {
          storeId,
          category: normalizedCategory || 'general',
          config
        }
      });

      // 4. Assign plan if provided
      if (planId) {
        await tx.store.update({
          where: { id: storeId },
          data: { planId }
        });
      }

      // 5. Update onboarding status
      const existingOnboarding = await tx.brandOnboarding.findUnique({
        where: { storeId }
      });
      
      if (existingOnboarding) {
        await tx.brandOnboarding.update({
          where: { storeId },
          data: {
            status: 'IN_PROGRESS',
            currentStep: 1,
            completionPercent: 10
          }
        });
      }

      return updated;
    });

    res.json({
      success: true,
      message: 'Merchant provisioned successfully',
      store: {
        id: updatedStore.id,
        name: updatedStore.name,
        subdomain: updatedStore.subdomain,
        storefront: `https://${updatedStore.subdomain}.orbit360.com`,
        dashboard: `https://dashboard.orbit360.com/store/${updatedStore.id}`,
        themeId: updatedStore.themeId,
        provisioningStatus: updatedStore.provisioningStatus
      }
    });

  } catch (error) {
    console.error('Provision merchant error:', error);
    next(error);
  }
};

/**
 * Update merchant domain settings
 * PUT /api/admin/provisioning/:storeId/domain
 * Body: { customDomain? }
 */
const updateMerchantDomain = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { customDomain } = req.body;

    const store = await prisma.store.update({
      where: { id: storeId },
      data: { customDomain }
    });

    res.json({
      success: true,
      store: {
        id: store.id,
        subdomain: store.subdomain,
        customDomain: store.customDomain,
        storefront: customDomain || `https://${store.subdomain}.orbit360.com`
      }
    });

  } catch (error) {
    console.error('Update merchant domain error:', error);
    next(error);
  }
};

/**
 * Get provisioning details for a merchant
 * GET /api/admin/provisioning/:storeId
 */
const getProvisioningDetails = async (req, res, next) => {
  try {
    const { storeId } = req.params;

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            role: true
          }
        },
        theme: true,
        websiteCustomization: true,
        onboarding: true,
        plan: true
      }
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      store
    });

  } catch (error) {
    console.error('Get provisioning details error:', error);
    next(error);
  }
};

module.exports = {
  listPendingMerchants,
  provisionMerchant,
  updateMerchantDomain,
  getProvisioningDetails
};
