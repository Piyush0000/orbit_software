const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const stripe = require('stripe');

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
        categoryConfig: true,
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
        themeTemplate: {
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
/**
 * GET /api/storefront/public/resolve?domain=:domain
 * Resolve store by domain/subdomain for storefront hub
 */
exports.resolveStoreByDomain = async (req, res) => {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({ 
        success: false, 
        message: 'Domain parameter is required' 
      });
    }
    
    // Handle subdomain format (e.g., "more.localhost:3000" or "more.orbit.com")
    const subdomain = domain.split('.')[0].toLowerCase();
    
    const store = await prisma.store.findUnique({
      where: { subdomain },
      include: {
        websiteCustomization: true,
        settings: true,
        themeTemplate: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: true
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

    // Sanitize payment methods to only include enabled ones and their public keys
    const paymentMethods = store.settings?.paymentMethods || {};
    const enabledGateways = {};
    Object.keys(paymentMethods).forEach(key => {
      if (paymentMethods[key].enabled) {
        enabledGateways[key] = {
          enabled: true,
          keyId: paymentMethods[key].keyId // Only public key
        };
      }
    });
    
    res.json({
      success: true,
      store: {
        id: store.id,
        name: store.name,
        subdomain: store.subdomain,
        customDomain: store.customDomain,
        theme: store.themeTemplate?.slug || store.theme || 'general',
        customization: store.websiteCustomization,
        category: store.category,
        description: store.description,
        enabledGateways
      }
    });
  } catch (error) {
    console.error('Error resolving store by domain:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to resolve store',
      error: error.message 
    });
  }
};

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

/**
 * POST /api/storefront/public/:subdomain/orders
 * Create a new order and initialize payment gateway if needed
 */
exports.createPublicOrder = async (req, res) => {
  try {
    const { subdomain } = req.params;
    const { items, customer, total, paymentMethod } = req.body;

    const store = await prisma.store.findUnique({
      where: { subdomain },
      include: { settings: true }
    });

    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });

    // Validate payment method
    const paymentConfigs = store.settings?.paymentMethods || {};
    const gatewayConfig = paymentConfigs[paymentMethod];

    if (paymentMethod !== 'cod' && (!gatewayConfig || !gatewayConfig.enabled)) {
      return res.status(400).json({ success: false, message: `Payment method ${paymentMethod} is not enabled` });
    }

    // Verify items and calculate real total from database to prevent price manipulation
    let calculatedTotal = 0;
    const itemsWithPrices = await Promise.all(items.map(async (item) => {
      const dbProduct = await prisma.product.findUnique({
        where: { id: item.id }
      });
      if (!dbProduct) throw new Error(`Product ${item.name} no longer available`);
      
      const price = Number(dbProduct.price);
      calculatedTotal += price * item.quantity;
      
      return {
        productId: dbProduct.id,
        name: dbProduct.name,
        quantity: item.quantity,
        price: price
      };
    }));

    // Add estimated tax (18% GST typical for India, adjust as needed)
    const tax = calculatedTotal * 0.18;
    const finalTotal = calculatedTotal + tax;

    // Initialize payment if not COD
    let paymentData = {};
    if (paymentMethod === 'razorpay') {
      const instance = new Razorpay({
        key_id: gatewayConfig.keyId,
        key_secret: gatewayConfig.keySecret,
      });

      const order = await instance.orders.create({
        amount: Math.round(finalTotal * 100), // convert to paisa
        currency: store.settings?.currency || 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      paymentData = {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: gatewayConfig.keyId,
        storeName: store.name // Pass real store name for UI
      };
    } else if (paymentMethod === 'stripe') {
      const stripeInstance = stripe(gatewayConfig.keySecret);
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: itemsWithPrices.map(item => ({
          price_data: {
            currency: store.settings?.currency?.toLowerCase() || 'usd',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });
      paymentData = { sessionId: session.id, url: session.url };
    }

    // Create order in database
    const newOrder = await prisma.order.create({
      data: {
        storeId: store.id,
        orderNumber: `ORD-${Date.now()}`,
        customerName: `${customer.firstName} ${customer.lastName}`,
        customerEmail: customer.email,
        shippingAddress: customer,
        billingAddress: customer,
        subtotal: calculatedTotal,
        tax: tax,
        shipping: 0,
        total: finalTotal,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: itemsWithPrices
        }
      }
    });

    res.json({
      success: true,
      orderId: newOrder.id,
      ...paymentData
    });

  } catch (error) {
    console.error('Error creating public order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/storefront/public/:subdomain/orders/verify
 * Verify payment signature
 */
exports.verifyPublicPayment = async (req, res) => {
  try {
    const { subdomain } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, sessionId } = req.body;

    const store = await prisma.store.findUnique({
      where: { subdomain },
      include: { settings: true }
    });

    if (!store) throw new Error('Store not found');

    // Handle Stripe Verification
    if (sessionId) {
      const gatewayConfig = store.settings?.paymentMethods?.stripe;
      if (!gatewayConfig) throw new Error('Stripe config not found');
      
      const stripeInstance = stripe(gatewayConfig.keySecret);
      const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status === 'paid') {
        const updatedOrder = await prisma.order.update({
          where: { id: orderId || session.client_reference_id },
          data: { paymentStatus: 'PAID', status: 'CONFIRMED' }
        });
        return res.json({ success: true, message: "Stripe payment verified", order: updatedOrder });
      } else {
        return res.status(400).json({ success: false, message: "Payment not completed" });
      }
    }

    // Handle Razorpay Verification
    const gatewayConfig = store.settings?.paymentMethods?.razorpay;
    if (!gatewayConfig) throw new Error('Razorpay config not found');

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", gatewayConfig.keySecret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'PAID', status: 'CONFIRMED' }
      });
      return res.json({ success: true, message: "Razorpay payment verified" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Razorpay signature" });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/storefront/public/:subdomain/sections
 * Get products for homepage sections based on customization
 */
exports.getStoreSections = async (req, res) => {
  try {
    const { subdomain } = req.params;

    const store = await prisma.store.findUnique({
      where: { subdomain },
      include: {
        websiteCustomization: true
      }
    });

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const sections = store.websiteCustomization?.productSections || [];
    const sectionsData = {};

    // Process each section to fetch its specific products
    for (const section of sections) {
      let queryWhere = {
        storeId: store.id,
        isActive: true
      };

      // Apply category filter if specified
      if (section.category) {
        queryWhere.category = section.category;
      }

      // Apply type-based filters
      if (section.type === 'featured') {
        queryWhere.isFeatured = true;
      }

      const products = await prisma.product.findMany({
        where: queryWhere,
        take: section.limit || 8,
        orderBy: { createdAt: 'desc' },
        include: {
          variants: true
        }
      });

      sectionsData[section.id || section.title] = {
        ...section,
        products
      };
    }

    res.json({
      success: true,
      data: sectionsData
    });

  } catch (error) {
    console.error('Error fetching homepage products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch homepage products' });
  }
};
