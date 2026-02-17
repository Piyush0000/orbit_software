const CATEGORY_ALIASES = {
  'fashion': 'clothing',
  'fashion/clothing': 'clothing',
  'clothing': 'clothing',
  'toystore': 'toys',
  'toys': 'toys',
  'food and beverage': 'food',
  'food': 'food',
  'electronics': 'electronics',
  'footwear': 'footwear',
  'jewellery': 'jewellery',
  'cosmetics': 'cosmetics',
  'perfume': 'perfume'
};

const normalizeCategory = (category = '') => {
  const key = category.toLowerCase().trim();
  return CATEGORY_ALIASES[key] || key;
};

const baseConfig = {
  filters: ['price', 'rating', 'availability', 'brand'],
  variants: [],
  attributes: [
    { key: 'brand', label: 'Brand', type: 'string', filterable: true },
    { key: 'features', label: 'Features', type: 'list', filterable: false },
    { key: 'badge', label: 'Badge', type: 'string', filterable: false },
    { key: 'rating', label: 'Rating', type: 'number', filterable: true },
    { key: 'reviewCount', label: 'Review Count', type: 'number', filterable: false }
  ],
  storefront: {
    showRatings: true,
    showBrands: true,
    showVariants: false
  }
};

const CATEGORY_CONFIGS = {
  clothing: {
    displayName: 'Fashion & Clothing',
    filters: ['price', 'rating', 'availability', 'brand', 'size', 'color', 'material'],
    variants: ['size', 'color'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'size', label: 'Size', type: 'list', filterable: true },
      { key: 'color', label: 'Color', type: 'list', filterable: true },
      { key: 'material', label: 'Material', type: 'string', filterable: true },
      { key: 'fit', label: 'Fit', type: 'string', filterable: false },
      { key: 'care', label: 'Care Instructions', type: 'string', filterable: false },
      { key: 'features', label: 'Features', type: 'list', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  electronics: {
    displayName: 'Electronics',
    filters: ['price', 'rating', 'availability', 'brand', 'warranty', 'storage'],
    variants: ['color', 'storage'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'warranty', label: 'Warranty', type: 'string', filterable: true },
      { key: 'storage', label: 'Storage', type: 'string', filterable: true },
      { key: 'color', label: 'Color', type: 'list', filterable: true },
      { key: 'specs', label: 'Specifications', type: 'list', filterable: false },
      { key: 'features', label: 'Features', type: 'list', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  toys: {
    displayName: 'Toy Store',
    filters: ['price', 'rating', 'availability', 'brand', 'age', 'material'],
    variants: ['color'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'age', label: 'Age Range', type: 'string', filterable: true },
      { key: 'material', label: 'Material', type: 'string', filterable: true },
      { key: 'color', label: 'Color', type: 'list', filterable: true },
      { key: 'features', label: 'Features', type: 'list', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  footwear: {
    displayName: 'Footwear',
    filters: ['price', 'rating', 'availability', 'brand', 'size', 'color', 'material'],
    variants: ['size', 'color'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'size', label: 'Size', type: 'list', filterable: true },
      { key: 'color', label: 'Color', type: 'list', filterable: true },
      { key: 'material', label: 'Material', type: 'string', filterable: true },
      { key: 'fit', label: 'Fit', type: 'string', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  jewellery: {
    displayName: 'Jewellery',
    filters: ['price', 'rating', 'availability', 'brand', 'material', 'stone'],
    variants: ['size'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'material', label: 'Material', type: 'string', filterable: true },
      { key: 'stone', label: 'Stone', type: 'string', filterable: true },
      { key: 'size', label: 'Size', type: 'string', filterable: true },
      { key: 'care', label: 'Care Instructions', type: 'string', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  food: {
    displayName: 'Food & Beverage',
    filters: ['price', 'rating', 'availability', 'brand', 'diet', 'flavor'],
    variants: ['size'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'diet', label: 'Diet Type', type: 'string', filterable: true },
      { key: 'flavor', label: 'Flavor', type: 'string', filterable: true },
      { key: 'ingredients', label: 'Ingredients', type: 'list', filterable: false },
      { key: 'expiry', label: 'Expiry', type: 'string', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  perfume: {
    displayName: 'Perfume & Fragrance',
    filters: ['price', 'rating', 'availability', 'brand', 'scent', 'size'],
    variants: ['size'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'scent', label: 'Scent Notes', type: 'string', filterable: true },
      { key: 'size', label: 'Size', type: 'string', filterable: true },
      { key: 'intensity', label: 'Intensity', type: 'string', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  },
  cosmetics: {
    displayName: 'Cosmetics & Beauty',
    filters: ['price', 'rating', 'availability', 'brand', 'shade', 'skinType'],
    variants: ['shade'],
    attributes: [
      { key: 'brand', label: 'Brand', type: 'string', filterable: true },
      { key: 'shade', label: 'Shade', type: 'string', filterable: true },
      { key: 'skinType', label: 'Skin Type', type: 'string', filterable: true },
      { key: 'ingredients', label: 'Ingredients', type: 'list', filterable: false },
      { key: 'finish', label: 'Finish', type: 'string', filterable: false }
    ],
    storefront: {
      showRatings: true,
      showBrands: true,
      showVariants: true
    }
  }
};

const getDefaultCategoryConfig = (category) => {
  const normalized = normalizeCategory(category);
  const categoryConfig = CATEGORY_CONFIGS[normalized];
  if (!categoryConfig) {
    return {
      category: normalized || 'general',
      displayName: normalized || 'General',
      ...baseConfig
    };
  }

  return {
    category: normalized,
    displayName: categoryConfig.displayName,
    filters: categoryConfig.filters || baseConfig.filters,
    variants: categoryConfig.variants || baseConfig.variants,
    attributes: categoryConfig.attributes || baseConfig.attributes,
    storefront: {
      ...baseConfig.storefront,
      ...(categoryConfig.storefront || {})
    }
  };
};

module.exports = {
  normalizeCategory,
  getDefaultCategoryConfig
};
