const { prisma } = require('../config/database');

// GET /api/coupons?storeId=xxx
const listCoupons = async (req, res, next) => {
  try {
    const { storeId } = req.query;
    if (!storeId) return res.status(400).json({ message: 'storeId required' });

    const coupons = await prisma.coupon.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(coupons);
  } catch (err) { next(err); }
};

// POST /api/coupons
const createCoupon = async (req, res, next) => {
  try {
    const { code, type, value, storeId, minOrderValue, maxUses, expiresAt } = req.body;

    if (!code || !type || !value || !storeId)
      return res.status(400).json({ message: 'code, type, value, storeId are required' });

    // Check uniqueness per store
    const existing = await prisma.coupon.findFirst({ where: { code: code.toUpperCase(), storeId } });
    if (existing) return res.status(409).json({ message: `Coupon code "${code}" already exists` });

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type,
        value: parseFloat(value),
        storeId,
        minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true,
        usedCount: 0,
      },
    });
    res.status(201).json(coupon);
  } catch (err) { next(err); }
};

// PATCH /api/coupons/:id
const updateCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive, maxUses, expiresAt } = req.body;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        ...(isActive !== undefined ? { isActive } : {}),
        ...(maxUses !== undefined ? { maxUses } : {}),
        ...(expiresAt !== undefined ? { expiresAt: expiresAt ? new Date(expiresAt) : null } : {}),
      },
    });
    res.json(coupon);
  } catch (err) { next(err); }
};

// DELETE /api/coupons/:id
const deleteCoupon = async (req, res, next) => {
  try {
    await prisma.coupon.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { next(err); }
};

// POST /api/coupons/validate  (called from storefront checkout)
const validateCoupon = async (req, res, next) => {
  try {
    const { code, storeId, orderTotal } = req.body;

    const coupon = await prisma.coupon.findFirst({
      where: { code: code.toUpperCase(), storeId, isActive: true },
    });

    if (!coupon) return res.status(404).json({ valid: false, message: 'Coupon not found' });
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())
      return res.status(400).json({ valid: false, message: 'Coupon has expired' });
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses)
      return res.status(400).json({ valid: false, message: 'Coupon usage limit reached' });
    if (coupon.minOrderValue && orderTotal < coupon.minOrderValue)
      return res.status(400).json({ valid: false, message: `Minimum order value ₹${coupon.minOrderValue} required` });

    const discount = coupon.type === 'PERCENTAGE'
      ? (orderTotal * coupon.value) / 100
      : coupon.value;

    res.json({ valid: true, coupon, discount: Math.min(discount, orderTotal) });
  } catch (err) { next(err); }
};

module.exports = { listCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon };
