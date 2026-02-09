const { prisma } = require('../config/database');
const StoreLayout = require('../models/mongoose/StoreLayout');
const { generateOrderNumber } = require('../utils/helpers');

/**
 * Resolve store by subdomain or custom domain
 * Supports both subdomain.orbit360.com and custom domains
 */
const resolveStoreBySubdomain = async (subdomain) => {
  if (!subdomain) return null;
  if (subdomain === 'default') {
    return prisma.store.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' }
    });
  }
  return prisma.store.findFirst({
    where: { subdomain, isActive: true }
  });
};

/**
 * Resolve store by custom domain or subdomain
 * Checks custom domain first, then falls back to subdomain
 */
const resolveStoreByDomain = async (domain) => {
  if (!domain) return null;
  
  // Try custom domain first
  let store = await prisma.store.findFirst({
    where: { 
      customDomain: domain,
      isActive: true 
    },
    include: {
      themeTemplate: true,
      websiteCustomization: true,
      categoryConfig: true
    }
  });

  // If not found, try subdomain (extract subdomain from domain)
  if (!store) {
    const subdomain = domain.split('.')[0];
    store = await prisma.store.findFirst({
      where: { 
        subdomain,
        isActive: true 
      },
      include: {
        themeTemplate: true,
        websiteCustomization: true,
        categoryConfig: true
      }
    });
  }

  return store;
};

const getStoreBySubdomain = async (req, res, next) => {
  try {
    const store = await resolveStoreBySubdomain(req.params.subdomain);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const store = await resolveStoreBySubdomain(req.params.subdomain);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    const products = await prisma.product.findMany({
      where: { storeId: store.id, isActive: true },
      include: { variants: true }
    });
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { variants: true }
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const store = await resolveStoreBySubdomain(req.params.subdomain);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    const { items, ...orderData } = req.body;
    const order = await prisma.order.create({
      data: {
        ...orderData,
        storeId: store.id,
        orderNumber: generateOrderNumber(),
        items: {
          create: items?.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            variantInfo: item.variantInfo
          }))
        }
      },
      include: { items: true }
    });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

const getLayout = async (req, res, next) => {
  try {
    const store = await resolveStoreBySubdomain(req.params.subdomain);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    const layout = await StoreLayout.findOne({ storeId: store.id });
    res.json({ layout });
  } catch (err) {
    next(err);
  }
};

/**
 * Get store by domain (subdomain or custom domain)
 * GET /api/storefront/resolve?domain=example.com
 */
const getStoreByDomain = async (req, res, next) => {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({ 
        success: false,
        message: 'Domain parameter is required' 
      });
    }

    const store = await resolveStoreByDomain(domain);
    
    if (!store) {
      return res.status(404).json({ 
        success: false,
        message: 'Store not found for this domain' 
      });
    }

    res.json({ 
      success: true,
      store: {
        id: store.id,
        name: store.name,
        subdomain: store.subdomain,
        customDomain: store.customDomain,
        description: store.description,
        logo: store.logo,
        category: store.category,
        theme: store.theme,
        customization: store.websiteCustomization,
        categoryConfig: store.categoryConfig?.config || null
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  getStoreBySubdomain, 
  getProducts, 
  getProduct, 
  checkout, 
  getLayout,
  getStoreByDomain,
  resolveStoreByDomain
};
