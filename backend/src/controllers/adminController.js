const { prisma } = require('../config/database');
const Template = require('../models/mongoose/Template');

const listUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { isActive: req.body.isActive }
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

const listStores = async (req, res, next) => {
  try {
    const stores = await prisma.store.findMany();
    res.json({ stores });
  } catch (err) {
    next(err);
  }
};

const getStore = async (req, res, next) => {
  try {
    const store = await prisma.store.findUnique({ where: { id: req.params.id } });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const updateStoreStatus = async (req, res, next) => {
  try {
    const store = await prisma.store.update({
      where: { id: req.params.id },
      data: { isActive: req.body.isActive }
    });
    res.json({ store });
  } catch (err) {
    next(err);
  }
};

const platformAnalytics = async (req, res, next) => {
  try {
    const [userCount, storeCount, orderStats] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        _count: { _all: true }
      })
    ]);
    res.json({
      users: userCount,
      stores: storeCount,
      orders: orderStats._count._all,
      revenue: orderStats._sum.total || 0
    });
  } catch (err) {
    next(err);
  }
};

const createTemplate = async (req, res, next) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json({ template });
  } catch (err) {
    next(err);
  }
};

const updateTemplate = async (req, res, next) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ template });
  } catch (err) {
    next(err);
  }
};

const deleteTemplate = async (req, res, next) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (err) {
    next(err);
  }
};

const getLogs = async (_req, res) => {
  res.json({ logs: [] });
};

module.exports = {
  listUsers,
  getUser,
  updateUserStatus,
  deleteUser,
  listStores,
  getStore,
  updateStoreStatus,
  platformAnalytics,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getLogs
};
