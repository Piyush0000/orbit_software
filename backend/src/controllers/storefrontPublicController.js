const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Public Storefront API Controller
 * These endpoints are publicly accessible (no auth required)
 * Used by merchant websites to fetch their store data dynamically
 */

/**
 * GET /api/storefront/public/:subdomain/info
 * Get store basic information (name, logo, description, contact)
 */
exports.getStoreInfo = async (req, res) => {
  try {
    const { subdomain } = req.params;

    const store = await prisma.store.findUnique({
      where: { subdomain },
      select: {
        id: true,
        name: true,
        subdomain: true,
        customDomain: true,
        description: true,
        logo: true,
        category: true,
        categoryConfig: {
          select: {
            category: true,
            config: true
          }
        },
        isActive: true,
        createdAt: true,
        settings: {
          select: {
            currency: true,
            timezone: true,
            seoTitle: true,
            seoDescription: true,
            socialImage: true,
            contactEmail: true,
            contactPhone: true,
          }
        },
        theme: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: true,
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: 'Store not found' 
      });
    }

    if (!store.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Store is not active' 
      });
    }

    res.json({ 
      success: true, 
      data: store 
    });
  } catch (error) {
    console.error('Error fetching store info:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch store information',
      error: error.message 
    });
  }
};

/**
 * GET /api/storefront/public/:subdomain/customization
 * Get website customization (branding, colors, hero section, etc.)
 */
exports.getStoreCustomization = async (req, res) => {
  try {
    const { subdomain } = req.params;

    const store = await prisma.store.findUnique({
      where: { subdomain },
      select: {
        id: true,
        isActive: true,
        websiteCustomization: true
      }
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: 'Store not found' 
      });
    }

    if (!store.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Store is not active' 
      });
    }

    // Return customization or default values
    const customization = store.websiteCustomization || {
      logo: null,
      favicon: null,
      brandColors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#ff6b6b'
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter'
      },
      heroSection: {
        title: 'Welcome to Our Store',
        subtitle: 'Discover amazing products',
        backgroundImage: null
      },
      aboutSection: {
        title: 'About Us',
        content: 'We are passionate about bringing you the best products.'
      },
      contactInfo: {
        email: null,
        phone: null,
        address: null
      },
      socialLinks: {
        facebook: null,
        instagram: null,
        twitter: null
      }
    };

    res.json({ 
      success: true, 
      data: customization 
    });
  } catch (error) {
    console.error('Error fetching store customization:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch store customization',
      error: error.message 
    });
  }
};

/**
 * GET /api/storefront/public/:subdomain/products
 * Get all active products for a store
 * Query params: category, search, limit, offset
 */
exports.getStoreProducts = async (req, res) => {
  try {
    const { subdomain } = req.params;
    const { category, search, limit = 50, offset = 0 } = req.query;

    // First, verify store exists and is active
    const store = await prisma.store.findUnique({
      where: { subdomain },
      select: { id: true, isActive: true }
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: 'Store not found' 
      });
    }

    if (!store.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Store is not active' 
      });
    }

    // Build query filters
    const where = {
      storeId: store.id,
      isActive: true
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Fetch products
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        compareAtPrice: true,
        sku: true,
        stock: true,
        images: true,
        category: true,
        tags: true,
        customFields: true,
        isFeatured: true,
        isActive: true,
        createdAt: true,
        variants: {
          select: {
            id: true,
            name: true,
            sku: true,
            price: true,
            stock: true,
            options: true
          }
        }
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: { createdAt: 'desc' }
    });

    // Get total count for pagination
    const total = await prisma.product.count({ where });

    res.json({ 
      success: true, 
      data: {
        products,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: (parseInt(offset) + parseInt(limit)) < total
        }
      }
    });
  } catch (error) {
    console.error('Error fetching store products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
};

/**
 * GET /api/storefront/public/:subdomain/products/:productId
 * Get single product details
 */
exports.getStoreProduct = async (req, res) => {
  try {
    const { subdomain, productId } = req.params;

    // Verify store exists and is active
    const store = await prisma.store.findUnique({
      where: { subdomain },
      select: { id: true, isActive: true }
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: 'Store not found' 
      });
    }

    if (!store.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Store is not active' 
      });
    }

    // Fetch product
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId: store.id,
        isActive: true
      },
      include: {
        variants: true
      }
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
};

/**
 * GET /api/storefront/public/:subdomain/categories
 * Get unique product categories for a store
 */
exports.getStoreCategories = async (req, res) => {
  try {
    const { subdomain } = req.params;

    // Verify store exists and is active
    const store = await prisma.store.findUnique({
      where: { subdomain },
      select: { id: true, isActive: true }
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: 'Store not found' 
      });
    }

    if (!store.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Store is not active' 
      });
    }

    // Get unique categories from products
    const products = await prisma.product.findMany({
      where: {
        storeId: store.id,
        isActive: true
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    const categories = products
      .map(p => p.category)
      .filter(Boolean); // Remove null/undefined

    res.json({ 
      success: true, 
      data: categories 
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch categories',
      error: error.message 
    });
  }
};

/**
 * GET /api/storefront/public/:subdomain/theme
 * Get store theme configuration
 */
exports.getStoreTheme = async (req, res) => {
  try {
    const { subdomain } = req.params;

    const store = await prisma.store.findUnique({
      where: { subdomain },
      select: {
        id: true,
        isActive: true,
        theme: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: true,
            description: true,
            thumbnail: true,
            version: true,
            config: true,
            previewUrl: true
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        message: 'Store not found' 
      });
    }

    if (!store.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Store is not active' 
      });
    }

    res.json({ 
      success: true, 
      data: store.theme 
    });
  } catch (error) {
    console.error('Error fetching store theme:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch store theme',
      error: error.message 
    });
  }
};
