const { prisma } = require('../config/database');
const { ORDER_STATUS, PAYMENT_STATUS, FULFILLMENT_STATUS } = require('../config/constants');

const listOrders = async (req, res, next) => {
  try {
    const { storeId, status, paymentStatus, fulfillmentStatus, limit = 50, offset = 0 } = req.query;
    const where = {};
    if (storeId) where.storeId = storeId;
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (fulfillmentStatus) where.fulfillmentStatus = fulfillmentStatus;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: true,
          store: { select: { id: true, name: true, subdomain: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: Number(limit),
        skip: Number(offset)
      }),
      prisma.order.count({ where })
    ]);

    res.json({
      orders,
      pagination: {
        total,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + Number(limit) < total
      }
    });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: true,
        store: { select: { id: true, name: true, subdomain: true } }
      }
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

const updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;
    if (!Object.values(PAYMENT_STATUS).includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { paymentStatus }
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listOrders,
  getOrder,
  updateStatus,
  updateFulfillment,
  updatePaymentStatus
};
