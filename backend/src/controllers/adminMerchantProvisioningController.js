const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');
const { getDefaultCategoryConfig, normalizeCategory } = require('../utils/categoryConfigs');

// Helper to get upfront port dynamically from theme or category
const getUpfrontPort = async (themeSlug, category) => {
  try {
    const theme = await prisma.theme.findUnique({
      where: { slug: themeSlug },
      select: { config: true }
    });
    
    if (theme?.config && typeof theme.config === 'object' && theme.config.port) {
      return theme.config.port;
    }

    // Fallback to CATEGORY_UPFRONT_PORTS if theme config is missing
    const CATEGORY_UPFRONT_PORTS = {
      'toys': 3023,
      'fashion': 3014,
      'electronics': 3011,
      'food': 3017,
      'footwear': 3004,
      'perfume': 3020,
      'beauty': 3008,
      'jewellery': 3005
    };
    const normalizedCategory = normalizeCategory(category);
    return CATEGORY_UPFRONT_PORTS[normalizedCategory] || 3004;
  } catch (err) {
    console.error('Error fetching theme port:', err);
    return 3004;
  }
};

/**
 * Create a new merchant with credentials, store, and website
 * POST /api/admin/provision
 * Body: { merchantName, email, password, category, theme, subdomain, customDomain?, planId? }
 */
const createMerchant = async (req, res, next) => {
  try {
    const {
      merchantName,
      email,
      password,
      category,
      theme,
      subdomain,
      customDomain,
      planId,
      categoryConfig
    } = req.body;

    // Validation
    if (!merchantName || !email || !password || !category || !theme || !subdomain) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: merchantName, email, password, category, theme, subdomain'
      });
    }

    const normalizedCategory = normalizeCategory(category);
    const resolvedCategoryConfig = categoryConfig || getDefaultCategoryConfig(normalizedCategory);

    // Check if email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Check if user already has a store
      const existingUserStore = await prisma.store.findFirst({
        where: { userId: existingUser.id }
      });

      if (existingUserStore) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already has a store provisioned.'
        });
      }
      
      console.log(`Found existing pending user ${existingUser.id} for email ${email}. Provisioning store for them.`);
    }

    // Check if subdomain already exists
    const existingStore = await prisma.store.findUnique({
      where: { subdomain }
    });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: 'Subdomain already exists'
      });
    }

    console.log(`Starting merchant creation for ${merchantName} (${theme})...`);

    // Ensure theme exists (creating it if needed)
    let themeRecord = await prisma.theme.findUnique({
      where: { slug: theme }
    });

    if (!themeRecord) {
      console.log(`Theme ${theme} not found, creating it...`);
      if (!prisma.theme) throw new Error('prisma.theme is undefined! Please run npx prisma generate.');
      themeRecord = await prisma.theme.create({
        data: {
          slug: theme,
          name: theme.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          isActive: true,
          version: '1.0.0'
        }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create merchant in transaction with increased timeout for production
    const result = await prisma.$transaction(async (tx) => {
      console.log('Transaction started. Available models on tx:', Object.keys(tx).filter(k=>!k.startsWith('$')));
      
      const models = ['user', 'store', 'websiteCustomization', 'brandOnboarding', 'merchantProvisioning', 'merchantCredentials', 'storeSettings', 'storeCategoryConfig'];
      for (const m of models) {
        if (!tx[m]) {
          console.error(`ERROR: Model tx.${m} is undefined!`);
          throw new Error(`Prisma model '${m}' not found in client. Please run npx prisma generate.`);
        }
      }

      // 1. Get or Create User
      let user;
      if (existingUser) {
        console.log('1. Updating existing user...');
        user = await tx.user.update({
          where: { id: existingUser.id },
          data: {
            password: hashedPassword, // Reset password to what admin specified
            fullName: merchantName,
            role: 'MERCHANT',
            emailVerified: true,
            isActive: true
          }
        });
      } else {
        console.log('1. Creating user...');
        user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            fullName: merchantName,
            role: 'MERCHANT',
            emailVerified: true,
            isActive: true
          }
        });
      }

      // 2. Create Store
      console.log('2. Creating store...');
      const store = await tx.store.create({
        data: {
          userId: user.id,
          name: merchantName,
          subdomain,
          customDomain: customDomain || null,
          description: `${merchantName} - ${category} store`,
          theme: theme,
          themeId: themeRecord.id,
          category: normalizedCategory,
          planId: planId || null,
          isActive: true,
          provisioningStatus: 'COMPLETED',
          onboardingStatus: 'IN_PROGRESS'
        }
      });

      // 3. Create WebsiteCustomization
      console.log('3. Creating website customization...');
      await tx.websiteCustomization.create({
        data: {
          storeId: store.id,
          logo: null,
          favicon: null,
          brandColors: {
            primary: '#6366f1',
            secondary: '#ec4899',
            accent: '#8b5cf6'
          },
          typography: {
            fontFamily: 'Inter',
            headingFont: 'Inter',
            bodyFont: 'Inter'
          },
          heroSection: {
            title: `Welcome to ${merchantName}`,
            subtitle: `Discover amazing ${normalizedCategory} products`,
            backgroundImage: null,
            ctaText: 'Shop Now',
            ctaLink: '/shop'
          },
          aboutSection: {
            title: `About ${merchantName}`,
            content: `${merchantName} is your trusted source for quality ${normalizedCategory} products.`,
            image: null
          },
          contactInfo: {
            email: email,
            phone: '',
            address: ''
          },
          headerStyle: 'modern',
          footerContent: {
            copyright: `© ${new Date().getFullYear()} ${merchantName}. All rights reserved.`,
            links: []
          },
          metaTitle: merchantName,
          metaDescription: `Shop at ${merchantName} for quality ${normalizedCategory} products`,
          keywords: [normalizedCategory, 'store', 'products', 'shop'],
          socialLinks: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: ''
          }
        }
      });

      // 4. Create Store Category Config
      console.log('4. Creating category config...');
      await tx.storeCategoryConfig.create({
        data: {
          storeId: store.id,
          category: normalizedCategory,
          config: resolvedCategoryConfig
        }
      });

      // 5. Create BrandOnboarding
      console.log('4. Creating brand onboarding...');
      await tx.brandOnboarding.create({
        data: {
          storeId: store.id,
          status: 'IN_PROGRESS',
          currentStep: 1,
          completionPercent: 10,
          startedAt: new Date()
        }
      });

      // 6. Create MerchantProvisioning
      console.log('5. Creating merchant provisioning...');
      await tx.merchantProvisioning.create({
        data: {
          storeId: store.id,
          status: 'COMPLETED',
          workspaceCreated: true,
          dashboardCreated: true,
          websiteDeployed: true,
          dataInitialized: true,
          credentialsSent: false,
          currentStep: 'COMPLETED',
          completionPercent: 100,
          startedAt: new Date(),
          completedAt: new Date()
        }
      });

      // 7. Store Merchant Credentials (for admin view)
      console.log('6. Creating merchant credentials...');
      await tx.merchantCredentials.create({
        data: {
          userId: user.id,
          storeId: store.id,
          email: email,
          temporaryPassword: password, // Store plaintext for admin view
          mustChangePassword: false, // Admin sets the password, so no need to force change
          createdByAdminId: req.admin?.id || null
        }
      });

      // 8. Create StoreSettings
      console.log('7. Creating store settings...');
      await tx.storeSettings.create({
        data: {
          storeId: store.id,
          currency: 'USD',
          timezone: 'UTC',
          contactEmail: email,
          contactPhone: '',
          shippingMethods: {},
          paymentMethods: {}
        }
      });

      return { user, store };
    }, {
      maxWait: 5000,
      timeout: 30000
    });

    res.status(201).json({
      success: true,
      message: 'Merchant created successfully',
      merchant: {
        id: result.user.id,
        name: merchantName,
        email: email,
        password: password, // Return for admin to see
        storeId: result.store.id,
        storeName: result.store.name,
        subdomain: subdomain,
        customDomain: customDomain || null,
        theme: theme,
        category: normalizedCategory,
        dashboardUrl: process.env.NODE_ENV === 'production' 
          ? `https://orbit-software-merchant.vercel.app/login?email=${encodeURIComponent(email)}`
          : `http://localhost:3003/login?email=${encodeURIComponent(email)}`,
        storefrontUrl: customDomain 
          ? `https://${customDomain}` 
          : `https://${subdomain}.orbit360.shop`, // Default production pattern
        upfrontTemplateUrl: `https://${theme}.orbit360.shop`,
        createdAt: result.user.createdAt
      }
    });


  } catch (error) {
    console.error('Create merchant error:', error);
    next(error);
  }
};

/**
 * List all merchant credentials
 * GET /api/admin/merchant-credentials
 */
const listMerchantCredentials = async (req, res, next) => {
  try {
    const credentials = await prisma.merchantCredentials.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Manually fetch user and store data
    const enrichedCredentials = await Promise.all(
      credentials.map(async (cred) => {
        const user = await prisma.user.findUnique({
          where: { id: cred.userId },
          select: { id: true, fullName: true, email: true, isActive: true, createdAt: true }
        });

        const store = await prisma.store.findUnique({
          where: { id: cred.storeId },
          select: {
            id: true,
            name: true,
            subdomain: true,
            customDomain: true,
            theme: true,
            category: true,
            isActive: true,
            provisioningStatus: true,
            onboardingStatus: true,
            themeTemplate: {
              select: { name: true, slug: true }
            }
          }
        });

        // Use themeTemplate for name if available, fallback to the string theme field
        const themeName = store?.themeTemplate?.name || store?.theme || '';

        return {
          id: cred.id,
          merchantName: user?.fullName || 'Unknown',
          email: cred.email,
          password: cred.temporaryPassword,
          userId: cred.userId,
          storeId: cred.storeId,
          storeName: store?.name || 'Unknown',
          subdomain: store?.subdomain || '',
          customDomain: store?.customDomain || null,
          theme: themeName,
          category: store?.category || '',
          isActive: user?.isActive && store?.isActive,
          provisioningStatus: store?.provisioningStatus || 'UNKNOWN',
          onboardingStatus: store?.onboardingStatus || 'NOT_STARTED',
          mustChangePassword: cred.mustChangePassword,
          dashboardUrl: `http://localhost:3003/login?email=${encodeURIComponent(cred.email)}`,
          storefrontUrl: store?.customDomain 
            ? `http://${store.customDomain}` 
            : `http://${store?.subdomain}.localhost:${await getUpfrontPort(store?.theme, store?.category)}`,
          upfrontTemplateUrl: `http://localhost:${await getUpfrontPort(store?.theme, store?.category)}`,
          createdAt: cred.createdAt,
          updatedAt: cred.updatedAt
        };
      })
    );

    res.json({
      success: true,
      credentials: enrichedCredentials,
      total: enrichedCredentials.length
    });

  } catch (error) {
    console.error('List merchant credentials error:', error);
    next(error);
  }
};

/**
 * Get single merchant credentials
 * GET /api/admin/merchant-credentials/:id
 */
const getMerchantCredentials = async (req, res, next) => {
  try {
    const { id } = req.params;

    const credentials = await prisma.merchantCredentials.findUnique({
      where: { id }
    });

    if (!credentials) {
      return res.status(404).json({
        success: false,
        message: 'Credentials not found'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: credentials.userId }
    });

    const store = await prisma.store.findUnique({
      where: { id: credentials.storeId },
      include: {
        themeTemplate: true
      }
    });

    res.json({
      success: true,
      credentials: {
        id: credentials.id,
        merchantName: user?.fullName,
        email: credentials.email,
        password: credentials.temporaryPassword,
        storeName: store?.name,
        subdomain: store?.subdomain,
        theme: store?.themeTemplate?.name || store?.theme,
        category: store?.category,
        dashboardUrl: `http://localhost:3003/login?email=${encodeURIComponent(credentials.email)}`,
        storefrontUrl: store?.customDomain 
          ? `http://${store.customDomain}` 
          : `http://${store?.subdomain}.localhost:${await getUpfrontPort(store?.theme, store?.category)}`,
        upfrontTemplateUrl: `http://localhost:${await getUpfrontPort(store?.theme, store?.category)}`,
        createdAt: credentials.createdAt
      }
    });

  } catch (error) {
    console.error('Get merchant credentials error:', error);
    next(error);
  }
};

/**
 * Update merchant password
 * PUT /api/admin/merchant-credentials/:id/password
 * Body: { newPassword }
 */
const updateMerchantPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password is required'
      });
    }

    const credentials = await prisma.merchantCredentials.findUnique({
      where: { id }
    });

    if (!credentials) {
      return res.status(404).json({
        success: false,
        message: 'Credentials not found'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in transaction
    await prisma.$transaction(async (tx) => {
      // Update user password
      await tx.user.update({
        where: { id: credentials.userId },
        data: { password: hashedPassword }
      });

      // Update credentials record
      await tx.merchantCredentials.update({
        where: { id },
        data: {
          temporaryPassword: newPassword,
          lastPasswordChange: new Date()
        }
      });
    });

    res.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Update merchant password error:', error);
    next(error);
  }
};

module.exports = {
  createMerchant,
  listMerchantCredentials,
  getMerchantCredentials,
  updateMerchantPassword
};
