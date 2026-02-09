const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');
const { getStoreAnalytics } = require('../services/analyticsService');

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
    res.status(201).json({ store });
  } catch (err) {
    next(err);
  }
};

const listStores = async (req, res, next) => {
  try {
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

module.exports = {
  registerStore,
  createStore,
  listStores,
  getStore,
  updateStore,
  deleteStore,
  getSettings,
  updateSettings,
  storeAnalytics
};

