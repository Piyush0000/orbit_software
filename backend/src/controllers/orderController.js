const { Prisma } = require('@prisma/client');
const { prisma } = require('../config/database');
const { invalidateStoreProducts } = require('../services/cacheService');
const { generateOrderNumber } = require('../utils/helpers');
const { ORDER_STATUS, PAYMENT_STATUS, FULFILLMENT_STATUS } = require('../config/constants');

const toDecimal = (value) => {
  if (value === null || value === undefined || value === '') return new Prisma.Decimal(0);
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return new Prisma.Decimal(0);
  return new Prisma.Decimal(parsed);
};

const ensurePositiveInt = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
};

const badRequest = (message) => {
  const err = new Error(message);
  err.status = 400;
  return err;
};

const createOrder = async (req, res, next) => {
  try {
    const { items, ...orderData } = req.body;
    if (!orderData?.storeId) {
      throw badRequest('storeId is required');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw badRequest('Order items are required');
    }

    const store = await prisma.store.findUnique({
      where: { id: orderData.storeId },
      select: { id: true, isActive: true, subdomain: true, userId: true }
    });
    if (!store || !store.isActive) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const tax = toDecimal(orderData.tax || 0);
    const shipping = toDecimal(orderData.shipping || 0);

    const order = await prisma.$transaction(async (tx) => {
      let subtotal = new Prisma.Decimal(0);
      const orderItems = [];

      for (const item of items) {
        const quantity = ensurePositiveInt(item.quantity);
        if (!quantity) {
          throw badRequest('Invalid item quantity');
        }

        const product = await tx.product.findFirst({
          where: { id: item.productId, storeId: orderData.storeId, isActive: true },
          include: { variants: true }
        });

        if (!product) {
          throw badRequest('Product not found');
        }

        let unitPrice = product.price;
        let variantInfo = item.variantInfo || null;

        if (item.variantId) {
          const variant = product.variants.find((v) => v.id === item.variantId);
          if (!variant) {
            throw badRequest('Variant not found');
          }
          if (variant.stock < quantity) {
            throw badRequest('Insufficient variant stock');
          }
          unitPrice = variant.price || product.price;
          variantInfo = {
            id: variant.id,
            name: variant.name,
            sku: variant.sku,
            options: variant.options,
            ...variantInfo
          };
          await tx.productVariant.update({
            where: { id: variant.id },
            data: { stock: { decrement: quantity } }
          });
        } else {
          if (product.stock < quantity) {
            throw badRequest('Insufficient product stock');
          }
          await tx.product.update({
            where: { id: product.id },
            data: { stock: { decrement: quantity } }
          });
        }

        const lineTotal = unitPrice.mul(quantity);
        subtotal = subtotal.add(lineTotal);
        orderItems.push({
          productId: product.id,
          name: item.name || product.name,
          quantity,
          price: unitPrice,
          variantInfo
        });
      }

      const total = subtotal.add(tax).add(shipping);

      return tx.order.create({
        data: {
          ...orderData,
          subtotal,
          tax,
          shipping,
          total,
          orderNumber: generateOrderNumber(),
          items: { create: orderItems }
        },
        include: { items: true }
      });
    });

    await invalidateStoreProducts({
      storeId: store.id,
      subdomain: store.subdomain,
      userId: store.userId
    });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { storeId: req.params.storeId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true }
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!Object.values(ORDER_STATUS).includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const updateFulfillment = async (req, res, next) => {
  try {
    const { fulfillmentStatus } = req.body;
    if (!Object.values(FULFILLMENT_STATUS).includes(fulfillmentStatus)) {
      return res.status(400).json({ message: 'Invalid fulfillment status' });
    }
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { fulfillmentStatus }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: ORDER_STATUS.CANCELLED, paymentStatus: PAYMENT_STATUS.REFUNDED }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

const lookupOrder = async (req, res, next) => {
  try {
    const { orderNumber, email } = req.body;
    if (!orderNumber || !email) {
      return res.status(400).json({ message: 'orderNumber and email are required' });
    }
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true }
    });
    if (!order || order.customerEmail.toLowerCase() !== String(email).toLowerCase()) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  updateStatus,
  updateFulfillment,
  cancelOrder,
  lookupOrder
};
