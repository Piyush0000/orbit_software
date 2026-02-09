const { Prisma } = require('@prisma/client');
const { prisma } = require('../config/database');
const { invalidateStoreProducts } = require('../services/cacheService');

const listProducts = async (req, res, next) => {
  try {
    const { storeId } = req.query;
    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }
    const products = await prisma.product.findMany({
      where: { storeId },
      include: { variants: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

const updateProductStock = async (req, res, next) => {
  try {
    const stock = Number(req.body.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({ message: 'Invalid stock value' });
    }
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { stock }
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
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const updateVariantStock = async (req, res, next) => {
  try {
    const stock = Number(req.body.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({ message: 'Invalid stock value' });
    }
    const variant = await prisma.productVariant.update({
      where: { id: req.params.variantId },
      data: { stock }
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

module.exports = {
  listProducts,
  updateProductStock,
  updateVariantStock
};
