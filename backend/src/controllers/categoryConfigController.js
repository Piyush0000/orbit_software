const { prisma } = require('../config/database');
const { getDefaultCategoryConfig, normalizeCategory } = require('../utils/categoryConfigs');

const CATEGORY_LIST = [
  'clothing',
  'electronics',
  'toys',
  'footwear',
  'jewellery',
  'food',
  'perfume',
  'cosmetics'
];

const listCategoryConfigs = async (req, res, next) => {
  try {
    const configs = CATEGORY_LIST.map((category) => getDefaultCategoryConfig(category));
    res.json({ success: true, configs });
  } catch (error) {
    console.error('List category configs error:', error);
    next(error);
  }
};

const getStoreCategoryConfig = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: { categoryConfig: true }
    });

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const normalizedCategory = normalizeCategory(store.category || '');
    const fallbackConfig = getDefaultCategoryConfig(normalizedCategory || 'general');

    res.json({
      success: true,
      category: normalizedCategory || 'general',
      config: store.categoryConfig?.config || fallbackConfig
    });
  } catch (error) {
    console.error('Get store category config error:', error);
    next(error);
  }
};

const updateStoreCategoryConfig = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { category, config } = req.body;

    if (!category || !config) {
      return res.status(400).json({
        success: false,
        message: 'category and config are required'
      });
    }

    const normalizedCategory = normalizeCategory(category);
    const updated = await prisma.storeCategoryConfig.upsert({
      where: { storeId },
      update: {
        category: normalizedCategory,
        config
      },
      create: {
        storeId,
        category: normalizedCategory,
        config
      }
    });

    await prisma.store.update({
      where: { id: storeId },
      data: { category: normalizedCategory }
    });

    res.json({
      success: true,
      category: normalizedCategory,
      config: updated.config
    });
  } catch (error) {
    console.error('Update store category config error:', error);
    next(error);
  }
};

module.exports = {
  listCategoryConfigs,
  getStoreCategoryConfig,
  updateStoreCategoryConfig
};
