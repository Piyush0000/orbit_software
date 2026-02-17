const { prisma } = require('../config/database');

// Get all themes (with optional category filter)
const getThemes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = {};
    if (category) {
      where.category = category;
    }
    const themes = await prisma.theme.findMany({
      where,
      orderBy: [{ category: 'asc' }, { name: 'asc' }]
    });
    res.json({ themes });
  } catch (error) {
    next(error);
  }
};

// Get themes grouped by category
const getThemesByCategory = async (_req, res, next) => {
  try {
    const themes = await prisma.theme.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    const categories = themes.reduce((acc, theme) => {
      const key = theme.category || 'UNCATEGORIZED';
      if (!acc[key]) acc[key] = [];
      acc[key].push(theme);
      return acc;
    }, {});
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

// Get single theme
const getTheme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const theme = await prisma.theme.findUnique({ where: { id } });
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    res.json({ theme });
  } catch (error) {
    next(error);
  }
};

module.exports = { getThemes, getThemesByCategory, getTheme };
