const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');
const { getStoreAnalytics } = require('../services/analyticsService');
const { ensureStoreExists, seedDummyProducts } = require('../services/storeService');

const generateTempPassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i += 1) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Register a new store (public merchant onboarding)
const registerStore = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      category,
      address,
      city,
      country,
      ownerFirstName,
      ownerLastName,
    } = req.body;

    // Validate required fields
    if (!name || !email || !category) {
      return res.status(400).json({
        success: false,
        message: 'Business name, email, and category are required'
      });
    }

    // Generate subdomain from business name
    const subdomain = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if subdomain already exists
    const existingStore = await prisma.store.findUnique({
      where: { subdomain }
    });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: 'A store with this name already exists. Please choose a different name.'
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please use a different email or login.'
      });
    }

    // Create a temporary user for the store owner
    const tempPassword = generateTempPassword();
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
    const tempUser = await prisma.user.create({
      data: {
        email,
        password: hashedTempPassword,
        fullName: `${ownerFirstName || ''} ${ownerLastName || ''}`.trim() || 'Merchant',
        role: 'MERCHANT',
      }
    });

    // Create the store
    const store = await prisma.store.create({
      data: {
        userId: tempUser.id,
        name,
        subdomain,
        description: category ? `${category} store` : '',
        onboardingStatus: 'NOT_STARTED',
        provisioningStatus: 'PENDING',
      }
    });

    // Initialize onboarding record
    await prisma.brandOnboarding.create({
      data: {
        storeId: store.id,
        status: 'NOT_STARTED',
        currentStep: 1,
        completionPercent: 0,
      }
    });

    // Store credentials for admin view
    await prisma.merchantCredentials.create({
      data: {
        userId: tempUser.id,
        storeId: store.id,
        email,
        temporaryPassword: tempPassword,
        mustChangePassword: true,
        createdByAdminId: null
      }
    });

    // Seed dummy products so the user has content on their storefront immediately
    await seedDummyProducts(store.id, category);

    res.status(201).json({
      success: true,
      message: 'Store registered successfully. Awaiting admin approval.',
      store: {
        id: store.id,
        name: store.name,
        subdomain: store.subdomain,
      }
    });

  } catch (error) {
    console.error('Store registration error:', error);
    next(error);
  }
};

const createStore = async (req, res, next) => {
  try {
    const { name, subdomain, customDomain, description, logo } = req.body;
    const store = await prisma.store.create({
      data: {
        name,
        subdomain,
        customDomain,
        description,
        logo,
        userId: req.user.id
      }
    });
    
    // Seed dummy products
    await seedDummyProducts(store.id, 'Electronics'); // Fallback category
    
    res.status(201).json({ store });
  } catch (err) {
    next(err);
  }
};

const listStores = async (req, res, next) => {
  try {
    // Ensure at least one store exists for this user
    await ensureStoreExists(req.user);
    
    // Then list all stores
    const stores = await prisma.store.findMany({ where: { userId: req.user.id } });
    res.json({ stores });
  } catch (err) {
    next(err);
  }
};

const getStore = async (req, res, next) => {
  try {
    const store = await prisma.store.findUnique({ where: { id: req.params.id } });
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const { name, description, logo, customDomain, isActive, category, theme } = req.body;
    const store = await prisma.store.update({
      where: { id: req.params.id },
      data: { name, description, logo, customDomain, isActive, category, theme }
    });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    await prisma.store.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    res.json({ message: 'Store disabled' });
  } catch (err) {
    next(err);
  }
};

const getSettings = async (req, res, next) => {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { storeId: req.params.id }
    });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const data = req.body;
    const settings = await prisma.storeSettings.upsert({
      where: { storeId: req.params.id },
      update: data,
      create: { ...data, storeId: req.params.id }
    });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

const storeAnalytics = async (req, res, next) => {
  try {
    const metrics = await getStoreAnalytics(req.params.id);
    res.json({ metrics });
  } catch (err) {
    next(err);
  }
};

const getActivityLogs = async (req, res, next) => {
  try {
    const logs = await prisma.brandActivityLog.findMany({
      where: { storeId: req.params.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    });
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    
    // 1. Get registered customers from activity logs
    const registrationLogs = await prisma.brandActivityLog.findMany({
      where: {
        storeId,
        action: 'CUSTOMER_REGISTERED'
      },
      include: {
        user: true
      }
    });

    // 2. Get all orders to calculate total spend and find guest customers
    const orders = await prisma.order.findMany({
      where: { storeId }
    });

    const customersMap = new Map();

    // Add registered customers to map
    registrationLogs.forEach(log => {
      if (log.user) {
        customersMap.set(log.user.email, {
          id: log.user.id,
          name: log.user.fullName,
          email: log.user.email,
          joined: log.user.createdAt,
          status: 'active',
          orders: 0,
          totalSpent: 0
        });
      }
    });

    // Add/Update info based on orders
    orders.forEach(order => {
      if (!customersMap.has(order.customerEmail)) {
        // Guest customer
        customersMap.set(order.customerEmail, {
          id: `guest-${order.id}`,
          name: order.customerName,
          email: order.customerEmail,
          joined: order.createdAt,
          status: 'guest',
          orders: 0,
          totalSpent: 0
        });
      }

      const customer = customersMap.get(order.customerEmail);
      customer.orders += 1;
      customer.totalSpent += Number(order.total);
    });

    const customers = Array.from(customersMap.values());
    res.json({ customers });
  } catch (err) {
    next(err);
  }
};

// Get sections data for Visual Editor
const getSections = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    
    // Get the store to determine its category
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { category: true }
    });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    // Get the website customization data
    const customization = await prisma.websiteCustomization.findUnique({
      where: { storeId },
      select: { productSections: true }
    });
    
    // Get default theme configuration based on category
    // In a real implementation, you might want to get this from a separate config service
    // For now, we'll return the product sections from customization
    const sections = customization?.productSections || [];
    
    res.json({ 
      sections,
      category: store.category,
      success: true 
    });
  } catch (err) {
    console.error('Get sections error:', err);
    next(err);
  }
};

const getCustomization = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    let customization = await prisma.websiteCustomization.findUnique({
      where: { storeId }
    });

    // Bootstrap defaults if none exist yet
    if (!customization) {
      const store = await prisma.store.findUnique({ where: { id: storeId }, select: { name: true, category: true } });
      customization = await prisma.websiteCustomization.create({
        data: {
          storeId,
          brandColors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FF6B6B' },
          heroSection: { 
            title: store?.name ? `Welcome to ${store.name}` : 'Welcome to our Store',
            subtitle: 'Discover amazing products at great prices.',
            ctaText: 'Shop Now',
            ctaLink: '/shop'
          },
          footerContent: { 
            bio: 'Quality products for quality life.',
            copyright: `© ${new Date().getFullYear()} ${store?.name || 'Store'}. All rights reserved.` 
          }
        }
      });
    }

    res.json({ customization });
  } catch (err) {
    next(err);
  }
};

const updateCustomization = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    const data = req.body;
    
    // Allowed fields that can be updated
    const validFields = ['logo', 'favicon', 'brandColors', 'typography', 'heroSection', 
                         'aboutSection', 'contactInfo', 'headerStyle', 'footerContent', 
                         'metaTitle', 'metaDescription', 'keywords', 'socialLinks', 
                         'features', 'featuresSection', 'ctaButtons', 'navLinks', 
                         'announcementBar', 'newsletter', 'productSections'];

    // Recursively strip null values — Prisma rejects null for Json? fields in upsert
    const deepStripNull = (obj) => {
      if (Array.isArray(obj)) return obj.filter(v => v !== null).map(deepStripNull);
      if (obj && typeof obj === 'object') {
        return Object.fromEntries(
          Object.entries(obj)
            .filter(([, v]) => v !== null)
            .map(([k, v]) => [k, deepStripNull(v)])
        );
      }
      return obj;
    };
                         
    const rawData = {};
    for (const key of validFields) {
      if (data[key] !== undefined && data[key] !== null) {
        rawData[key] = deepStripNull(data[key]);
      }
    }
    
    const customization = await prisma.websiteCustomization.upsert({
      where: { storeId },
      update: rawData,
      create: { storeId, ...rawData }
    });
    
    res.json({ customization, success: true });
  } catch (err) {
    console.error('Update customization error:', err);
    next(err);
  }
};

module.exports = {
  registerStore,
  createStore,
  listStores,
  getStore,
  updateStore,
  deleteStore,
  getSettings,
  updateSettings,
  storeAnalytics,
  getActivityLogs,
  getCustomers,
  getSections,
  getCustomization,
  updateCustomization
};

