const { Prisma } = require('@prisma/client');
const { prisma } = require('../config/database');
const { invalidateStoreProducts } = require('../services/cacheService');
const { ensureStoreExists } = require('../services/storeService');

const normalizeProductPayload = (payload = {}) => {
  const data = { ...payload };
  if (data.image && !data.images) {
    data.images = [data.image];
  }
  if (typeof data.images === 'string') {
    data.images = [data.images];
  }
  if (!Array.isArray(data.images)) {
    data.images = [];
  }
  if (!Array.isArray(data.tags)) {
    data.tags = [];
  }
  delete data.image;
  delete data.status;
  delete data.slug;
  return data;
};

const coerceProductNumbers = (data = {}) => {
  const normalized = { ...data };

  if (normalized.price !== undefined) {
    const price = Number(normalized.price);
    if (Number.isNaN(price)) {
      return { error: 'Invalid price value' };
    }
    normalized.price = new Prisma.Decimal(price);
  }

  if (normalized.compareAtPrice !== undefined && normalized.compareAtPrice !== null && normalized.compareAtPrice !== '') {
    const compareAtPrice = Number(normalized.compareAtPrice);
    if (Number.isNaN(compareAtPrice)) {
      return { error: 'Invalid compareAtPrice value' };
    }
    normalized.compareAtPrice = new Prisma.Decimal(compareAtPrice);
  }

  if (normalized.stock !== undefined) {
    const stock = Number(normalized.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      return { error: 'Invalid stock value' };
    }
    normalized.stock = stock;
  }

  return { data: normalized };
};

const createProduct = async (req, res, next) => {
  try {
    const store = await ensureStoreExists(req.user);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    if (!req.body?.name) {
      return res.status(400).json({ message: 'Product name is required' });
    }
    if (req.body?.price === undefined || req.body?.price === null || req.body?.price === '') {
      return res.status(400).json({ message: 'Product price is required' });
    }

    const base = normalizeProductPayload(req.body);
    const coerced = coerceProductNumbers(base);
    if (coerced.error) {
      return res.status(400).json({ message: coerced.error });
    }

    const data = {
      ...coerced.data,
      storeId: store.id
    };
    
    const product = await prisma.product.create({ data });
    await invalidateStoreProducts({
      storeId: store.id,
      subdomain: store.subdomain,
      userId: store.userId || req.user?.id
    });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

const listProducts = async (req, res, next) => {
  try {
    const store = await ensureStoreExists(req.user);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const products = await prisma.product.findMany({
      where: { storeId: store.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

const listByStore = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { storeId: req.params.storeId },
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

const updateProduct = async (req, res, next) => {
  try {
    const normalized = normalizeProductPayload(req.body);
    const coerced = coerceProductNumbers(normalized);
    if (coerced.error) {
      return res.status(400).json({ message: coerced.error });
    }
    const data = coerced.data;
    const product = await prisma.product.update({ where: { id: req.params.id }, data });
    const store = await prisma.store.findUnique({
      where: { id: product.storeId },
      select: { subdomain: true, userId: true }
    });
    await invalidateStoreProducts({
      storeId: product.storeId,
      subdomain: store?.subdomain,
      userId: store?.userId
    });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });
    const store = await prisma.store.findUnique({
      where: { id: product.storeId },
      select: { subdomain: true, userId: true }
    });
    await invalidateStoreProducts({
      storeId: product.storeId,
      subdomain: store?.subdomain,
      userId: store?.userId
    });
    res.json({ message: 'Product disabled' });
  } catch (err) {
    next(err);
  }
};

const addVariant = async (req, res, next) => {
  try {
    const variant = await prisma.productVariant.create({
      data: { ...req.body, productId: req.params.id }
    });
    const product = await prisma.product.findUnique({
      where: { id: variant.productId },
      select: { storeId: true }
    });
    if (product?.storeId) {
      const store = await prisma.store.findUnique({
        where: { id: product.storeId },
        select: { subdomain: true, userId: true }
      });
      await invalidateStoreProducts({
        storeId: product.storeId,
        subdomain: store?.subdomain,
        userId: store?.userId
      });
    }
    res.status(201).json({ variant });
  } catch (err) {
    next(err);
  }
};

const updateVariant = async (req, res, next) => {
  try {
    const variant = await prisma.productVariant.update({
      where: { id: req.params.variantId },
      data: req.body
    });
    const product = await prisma.product.findUnique({
      where: { id: variant.productId },
      select: { storeId: true }
    });
    if (product?.storeId) {
      const store = await prisma.store.findUnique({
        where: { id: product.storeId },
        select: { subdomain: true, userId: true }
      });
      await invalidateStoreProducts({
        storeId: product.storeId,
        subdomain: store?.subdomain,
        userId: store?.userId
      });
    }
    res.json({ variant });
  } catch (err) {
    next(err);
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    const existing = await prisma.productVariant.findUnique({
      where: { id: req.params.variantId },
      select: { productId: true }
    });
    await prisma.productVariant.delete({ where: { id: req.params.variantId } });
    if (existing?.productId) {
      const product = await prisma.product.findUnique({
        where: { id: existing.productId },
        select: { storeId: true }
      });
      if (product?.storeId) {
        const store = await prisma.store.findUnique({
          where: { id: product.storeId },
          select: { subdomain: true, userId: true }
        });
        await invalidateStoreProducts({
          storeId: product.storeId,
          subdomain: store?.subdomain,
          userId: store?.userId
        });
      }
    }
    res.json({ message: 'Variant removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  listProducts,
  listByStore,
  getProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant
};
