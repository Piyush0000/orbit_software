const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Theme Management Service
 * Handles theme creation, configuration, and deployment
 */
class ThemeService {
  /**
   * Create a new theme
   */
  async createTheme(data) {
    const {
      name,
      slug,
      category,
      description,
      thumbnail,
      version,
      config,
      previewUrl,
      repository
    } = data;

    // Check if slug already exists
    const existing = await prisma.theme.findUnique({
      where: { slug }
    });

    if (existing) {
      throw new Error(`Theme with slug '${slug}' already exists`);
    }

    const theme = await prisma.theme.create({
      data: {
        name,
        slug,
        category,
        description,
        thumbnail,
        version: version || '1.0.0',
        config: config || {},
        previewUrl,
        repository,
        isActive: true
      }
    });

    console.log(`[Theme] Created: ${theme.name} (${theme.slug})`);
    return theme;
  }

  /**
   * Get all themes
   */
  async getAllThemes(activeOnly = false) {
    const where = activeOnly ? { isActive: true } : {};

    const themes = await prisma.theme.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return themes;
  }

  /**
   * Get theme by ID
   */
  async getThemeById(id) {
    const theme = await prisma.theme.findUnique({
      where: { id },
      include: {
        _count: {
          select: { stores: true }
        }
      }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${id}`);
    }

    return theme;
  }

  /**
   * Get theme by slug
   */
  async getThemeBySlug(slug) {
    const theme = await prisma.theme.findUnique({
      where: { slug }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${slug}`);
    }

    return theme;
  }

  /**
   * Update theme
   */
  async updateTheme(id, data) {
    const {
      name,
      category,
      description,
      thumbnail,
      version,
      config,
      previewUrl,
      repository,
      isActive
    } = data;

    const theme = await prisma.theme.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(thumbnail && { thumbnail }),
        ...(version && { version }),
        ...(config && { config }),
        ...(previewUrl && { previewUrl }),
        ...(repository && { repository }),
        ...(isActive !== undefined && { isActive })
      }
    });

    console.log(`[Theme] Updated: ${theme.name}`);
    return theme;
  }

  /**
   * Delete theme
   */
  async deleteTheme(id) {
    // Check if theme is in use
    const storeCount = await prisma.store.count({
      where: { themeId: id }
    });

    if (storeCount > 0) {
      throw new Error(`Cannot delete theme. It is currently used by ${storeCount} store(s)`);
    }

    await prisma.theme.delete({
      where: { id }
    });

    console.log(`[Theme] Deleted: ${id}`);
  }

  /**
   * Activate/Deactivate theme
   */
  async toggleThemeStatus(id, isActive) {
    const theme = await prisma.theme.update({
      where: { id },
      data: { isActive }
    });

    console.log(`[Theme] ${isActive ? 'Activated' : 'Deactivated'}: ${theme.name}`);
    return theme;
  }

  /**
   * Get theme configuration
   */
  async getThemeConfig(themeId) {
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      select: { config: true }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    return theme.config;
  }

  /**
   * Update theme configuration
   */
  async updateThemeConfig(themeId, config) {
    const theme = await prisma.theme.update({
      where: { id: themeId },
      data: { config }
    });

    console.log(`[Theme] Config updated for: ${theme.name}`);
    return theme;
  }

  /**
   * Get stores using a theme
   */
  async getStoresByTheme(themeId) {
    const stores = await prisma.store.findMany({
      where: { themeId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      }
    });

    return stores;
  }

  /**
   * Seed default themes
   */
  async seedDefaultThemes() {
    const defaultThemes = [
      // Food & Beverage Themes
      {
        name: 'Food & Beverage Storefront 1',
        slug: 'food-beverage-1',
        category: 'FOOD_BEVERAGE',
        description: 'Modern food and beverage e-commerce theme with vibrant design',
        version: '1.0.0',
        previewUrl: '/themes/food_1/preview.png',
        repository: 'food_1',
        config: {
          colors: {
            primary: '#FF6B35',
            secondary: '#2E7D32',
            accent: '#FFD54F'
          },
          layout: 'grid',
          features: ['category-explorer', 'deals-combos', 'trust-safety', 'limited-offer']
        }
      },
      {
        name: 'Food & Beverage Storefront 2',
        slug: 'food-beverage-2',
        category: 'FOOD_BEVERAGE',
        description: 'Elegant food delivery theme with restaurant-style layout',
        version: '1.0.0',
        previewUrl: '/themes/food_2/preview.png',
        repository: 'food_2',
        config: {
          colors: {
            primary: '#D32F2F',
            secondary: '#1976D2',
            accent: '#FFA000'
          },
          layout: 'grid',
          features: ['menu-cards', 'chef-recommendations', 'quick-order']
        }
      },
      {
        name: 'Food & Beverage Storefront 3',
        slug: 'food-beverage-3',
        category: 'FOOD_BEVERAGE',
        description: 'Premium gourmet food theme with sophisticated design',
        version: '1.0.0',
        previewUrl: '/themes/food_3/preview.png',
        repository: 'food_3',
        config: {
          colors: {
            primary: '#455A64',
            secondary: '#78909C',
            accent: '#FF7043'
          },
          layout: 'grid',
          features: ['premium-featured', 'artisanal-collections', 'subscription-box']
        }
      },
      // Electronics Themes
      {
        name: 'Electronics Storefront 1',
        slug: 'electronics-1',
        category: 'ELECTRONICS',
        description: 'Tech-focused electronics theme with clean modern design',
        version: '1.0.0',
        previewUrl: '/themes/electronics_1/preview.png',
        repository: 'electronics_1',
        config: {
          colors: {
            primary: '#1976D2',
            secondary: '#0097A7',
            accent: '#FF4081'
          },
          layout: 'grid',
          features: ['tech-specs', 'comparison-tool', 'warranty-info', 'tech-support']
        }
      },
      {
        name: 'Electronics Storefront 2',
        slug: 'electronics-2',
        category: 'ELECTRONICS',
        description: 'Gaming and electronics theme with dark modern design',
        version: '1.0.0',
        previewUrl: '/themes/electronics_2/preview.png',
        repository: 'electronics_2',
        config: {
          colors: {
            primary: '#212121',
            secondary: '#FF5722',
            accent: '#7C4DFF'
          },
          layout: 'grid',
          features: ['gaming-section', 'pc-builder', 'tech-reviews', 'deals-zone']
        }
      },
      {
        name: 'Electronics Storefront 3',
        slug: 'electronics-3',
        category: 'ELECTRONICS',
        description: 'Professional electronics theme with business focus',
        version: '1.0.0',
        previewUrl: '/themes/electronics_3/preview.png',
        repository: 'electronics_3',
        config: {
          colors: {
            primary: '#37474F',
            secondary: '#00BCD4',
            accent: '#FF9800'
          },
          layout: 'grid',
          features: ['business-solutions', 'bulk-orders', 'corporate-deals', 'support-center']
        }
      },
      // Perfume Themes
      {
        name: 'Perfume Storefront',
        slug: 'perfume-1',
        category: 'PERFUME',
        description: 'Elegant perfume theme with luxurious design',
        version: '1.0.0',
        previewUrl: '/themes/perfume-upfront/preview.png',
        repository: 'perfume-upfront',
        config: {
          colors: {
            primary: '#8E24AA',
            secondary: '#FFD54F',
            accent: '#F50057'
          },
          layout: 'grid',
          features: ['scent-finder', 'gift-sets', 'luxury-collections', 'fragrance-notes']
        }
      },
      {
        name: 'Perfume Storefront Theme 2',
        slug: 'perfume-2',
        category: 'PERFUME',
        description: 'Modern perfume theme with minimalist luxury design',
        version: '1.0.0',
        previewUrl: '/themes/perfume-upfront-theme2/preview.png',
        repository: 'perfume-upfront-theme2',
        config: {
          colors: {
            primary: '#3F51B5',
            secondary: '#E91E63',
            accent: '#FF9800'
          },
          layout: 'grid',
          features: ['scent-profiles', 'personalized-recommendations', 'limited-editions']
        }
      },
      {
        name: 'Perfume Storefront Theme 3',
        slug: 'perfume-3',
        category: 'PERFUME',
        description: 'Premium fragrance theme with artistic presentation',
        version: '1.0.0',
        previewUrl: '/themes/perfume-upfront-theme3/preview.png',
        repository: 'perfume-upfront-theme3',
        config: {
          colors: {
            primary: '#455A64',
            secondary: '#FF5722',
            accent: '#7E57C2'
          },
          layout: 'grid',
          features: ['artist-collections', 'signature-scents', 'exclusive-launches', 'scent-journal']
        }
      },
      // Fashion Themes
      {
        name: 'Fashion Storefront',
        slug: 'fashion-1',
        category: 'CLOTHING',
        description: 'Trendy fashion theme with seasonal collections',
        version: '1.0.0',
        previewUrl: '/themes/fashion_upfront/preview.png',
        repository: 'fashion_upfront',
        config: {
          colors: {
            primary: '#E91E63',
            secondary: '#9C27B0',
            accent: '#FF9800'
          },
          layout: 'grid',
          features: ['trending-now', 'seasonal-collections', 'style-guide', 'look-book']
        }
      },
      {
        name: 'Fashion Storefront 2',
        slug: 'fashion-2',
        category: 'CLOTHING',
        description: 'Contemporary fashion theme with clean aesthetic',
        version: '1.0.0',
        previewUrl: '/themes/fashion_upfront_2/preview.png',
        repository: 'fashion_upfront_2',
        config: {
          colors: {
            primary: '#212121',
            secondary: '#757575',
            accent: '#FF4081'
          },
          layout: 'grid',
          features: ['new-arrivals', 'best-sellers', 'style-inspiration', 'size-guide']
        }
      },
      {
        name: 'Fashion Storefront 3',
        slug: 'fashion-3',
        category: 'CLOTHING',
        description: 'Premium fashion theme with editorial design',
        version: '1.0.0',
        previewUrl: '/themes/fashion upfront 3/preview.png',
        repository: 'fashion upfront 3',
        config: {
          colors: {
            primary: '#37474F',
            secondary: '#FF5722',
            accent: '#607D8B'
          },
          layout: 'grid',
          features: ['editorial-features', 'designer-collections', 'fashion-stories', 'exclusive-access']
        }
      },
      // Toys Themes
      {
        name: 'Toys Storefront',
        slug: 'toys-1',
        category: 'TOYSTORE',
        description: 'Fun and playful toys theme for children and families',
        version: '1.0.0',
        previewUrl: '/themes/toys upfront/preview.png',
        repository: 'toys upfront',
        config: {
          colors: {
            primary: '#FF5722',
            secondary: '#4CAF50',
            accent: '#FFC107'
          },
          layout: 'grid',
          features: ['age-groups', 'educational-toys', 'new-arrivals', 'deals-section']
        }
      },
      {
        name: 'Toys Storefront 2',
        slug: 'toys-2',
        category: 'TOYSTORE',
        description: 'Interactive toys theme with engaging design',
        version: '1.0.0',
        previewUrl: '/themes/toy upfront 2/preview.png',
        repository: 'toy upfront 2',
        config: {
          colors: {
            primary: '#2196F3',
            secondary: '#FF9800',
            accent: '#9C27B0'
          },
          layout: 'grid',
          features: ['interactive-demos', 'toy-reviews', 'parent-guides', 'safety-info']
        }
      },
      {
        name: 'Toys Storefront 3',
        slug: 'toys-3',
        category: 'TOYSTORE',
        description: 'Premium toys theme with quality-focused design',
        version: '1.0.0',
        previewUrl: '/themes/toy upfront 3/preview.png',
        repository: 'toy upfront 3',
        config: {
          colors: {
            primary: '#3F51B5',
            secondary: '#4CAF50',
            accent: '#F44336'
          },
          layout: 'grid',
          features: ['premium-brands', 'quality-assured', 'educational-value', 'parent-reviews']
        }
      },
      // Beauty Themes
      {
        name: 'Beauty & Personal Care',
        slug: 'beauty-1',
        category: 'COSMETICS',
        description: 'Gorgeous beauty theme with skincare focus',
        version: '1.0.0',
        previewUrl: '/themes/beauty-personal-care-upfront/preview.png',
        repository: 'beauty-personal-care-upfront',
        config: {
          colors: {
            primary: '#E91E63',
            secondary: '#FF9800',
            accent: '#9C27B0'
          },
          layout: 'grid',
          features: ['skincare-routine', 'beauty-tips', 'ingredient-spotlight', 'virtual-try-on']
        }
      },
      {
        name: 'Beauty Theme 2',
        slug: 'beauty-2',
        category: 'COSMETICS',
        description: 'Modern beauty theme with clean minimalist design',
        version: '1.0.0',
        previewUrl: '/themes/beauty-theme-2/preview.png',
        repository: 'beauty-theme-2',
        config: {
          colors: {
            primary: '#607D8B',
            secondary: '#FF5722',
            accent: '#4CAF50'
          },
          layout: 'grid',
          features: ['clean-beauty', 'sustainable-choices', 'expert-picks', 'beauty-quiz']
        }
      },
      {
        name: 'Beauty Theme 3',
        slug: 'beauty-3',
        category: 'COSMETICS',
        description: 'Luxury beauty theme with premium aesthetic',
        version: '1.0.0',
        previewUrl: '/themes/beauty-theme-3/preview.png',
        repository: 'beauty-theme-3',
        config: {
          colors: {
            primary: '#455A64',
            secondary: '#FFD54F',
            accent: '#7E57C2'
          },
          layout: 'grid',
          features: ['luxury-brands', 'spa-treatments', 'premium-ingredients', 'beauty-consultations']
        }
      },
      // Footwear Theme
      {
        name: 'Footwear Storefront',
        slug: 'footwear-1',
        category: 'FOOTWEAR',
        description: 'Sleek footwear theme with fashion-forward design',
        version: '1.0.0',
        previewUrl: '/themes/FOOTWEAR UPFRONT/preview.png',
        repository: 'FOOTWEAR UPFRONT',
        config: {
          colors: {
            primary: '#212121',
            secondary: '#757575',
            accent: '#FF5722'
          },
          layout: 'grid',
          features: ['trending-shoes', 'seasonal-collection', 'size-finder', 'style-guide']
        }
      },
      // Jewellery Themes
      {
        name: 'Jewellery Storefront 1',
        slug: 'jewellery-1',
        category: 'JEWELLERY',
        description: 'Luxury jewellery store with elegant design',
        version: '1.0.0',
        previewUrl: '/themes/Jewellery_Upfront/preview.png',
        repository: 'Jewellery_Upfront',
        config: {
          colors: {
            primary: '#7C2D12',
            secondary: '#FDE68A',
            accent: '#111827'
          },
          layout: 'grid',
          features: ['luxury-collections', 'gift-wrap', 'product-zoom']
        }
      },
      {
        name: 'Jewellery Storefront 2',
        slug: 'jewellery-2',
        category: 'JEWELLERY',
        description: 'Modern premium jewellery store with minimalist design',
        version: '1.0.0',
        previewUrl: '/themes/Jewellery_Upfront_2/preview.png',
        repository: 'Jewellery_Upfront_2',
        config: {
          colors: {
            primary: '#7C2D12',
            secondary: '#FDE68A',
            accent: '#111827'
          },
          layout: 'grid',
          features: ['modern-collections', 'quick-view', 'wishlist-feature']
        }
      },
      {
        name: 'Jewellery Storefront 3',
        slug: 'jewellery-3',
        category: 'JEWELLERY',
        description: 'Elite jewellery store with luxury design and dark theme',
        version: '1.0.0',
        previewUrl: '/themes/jewellery-upfront-1/preview.png',
        repository: 'jewellery-upfront-1',
        config: {
          colors: {
            primary: '#D4AF37',
            secondary: '#1A1A1A',
            accent: '#FFFFFF'
          },
          layout: 'grid',
          features: ['gift-section', 'quality-story', 'product-carousel']
        }
      }
    ];

    const created = [];

    for (const themeData of defaultThemes) {
      try {
        const existing = await prisma.theme.findUnique({
          where: { slug: themeData.slug }
        });

        if (!existing) {
          const theme = await this.createTheme(themeData);
          created.push(theme);
        }
      } catch (error) {
        console.error(`Error seeding theme ${themeData.slug}:`, error.message);
      }
    }

    console.log(`[Theme] Seeded ${created.length} default themes`);
    return created;
  }
}

module.exports = new ThemeService();
