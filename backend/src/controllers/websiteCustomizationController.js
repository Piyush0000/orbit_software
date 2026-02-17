const { prisma } = require('../config/database');
const { invalidateStoreCustomization } = require('../services/cacheService');
const { ensureStoreExists } = require('../services/storeService');
const { getWebSocketService } = require('../services/globalWebSocketService');

const resolveStoreId = async (req, createIfMissing = false) => {
  // If specific store requested (e.g. by admin)
  if (req.params.storeId) return req.params.storeId;
  
  // Implicitly for current user
  if (req.user) {
    if (createIfMissing) {
      const store = await ensureStoreExists(req.user);
      return store.id;
    } else {
      const store = await prisma.store.findFirst({
        where: { userId: req.user.id },
        select: { id: true }
      });
      return store?.id || null;
    }
  }
  
  return null;
};

// Get customization for a store
const getCustomization = async (req, res, next) => {
  try {
    const storeId = await resolveStoreId(req, true);
    if (!storeId) {
      return res.status(404).json({ message: 'Store not found' });
    }

    let customization = await prisma.websiteCustomization.findUnique({
      where: { storeId }
    });

    const store = await prisma.store.findUnique({ where: { id: storeId } });

    if (!customization) {
      const isElectronics = store?.category === 'Electronics';
      
      const defaultHero = isElectronics ? {
        title: "Next-Gen Tech is Here",
        subtitle: "Upgrade your lifestyle with our premium electronics selection.",
        buttonText: "Shop Gadgets",
        backgroundImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80",
        overlayOpacity: 0.5
      } : {
        title: "Welcome to Our Store",
        subtitle: "Discover amazing products at great prices.",
        buttonText: "Shop Now",
        backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
        overlayOpacity: 0.5
      };

      const defaultFeatures = isElectronics ? [
        { title: "Fast Shipping", description: "Get your gadgets in record time.", icon: "Zap" },
        { title: "2-Year Warranty", description: "All electronics are covered.", icon: "ShieldCheck" },
        { title: "Expert Support", description: "Tech help whenever you need it.", icon: "Headphones" }
      ] : [
        { title: "Fast Shipping", description: "We ship worldwide quickly.", icon: "Truck" },
        { title: "Quality Guarantee", description: "Only the best for you.", icon: "Check" },
        { title: "24/7 Support", description: "We are here to help.", icon: "Headphones" },
      ];

      customization = await prisma.websiteCustomization.create({
        data: {
          storeId,
          brandColors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FF6B6B' },
          typography: { headingFont: 'Inter', bodyFont: 'Inter' },
          heroSection: defaultHero,
          features: defaultFeatures,
          navLinks: [
             { label: "Home", href: "/" },
             { label: "Shop", href: "/products" },
             { label: "About", href: "/about" }
          ]
        }
      });
    }

    res.json({ customization });
  } catch (error) {
    next(error);
  }
};

// Update customization
const updateCustomization = async (req, res, next) => {
  try {
    const storeId = await resolveStoreId(req, true);
    if (!storeId) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const updateData = req.body;
    
    // Process keywords for update operation - convert string to array if needed
    const processedUpdateData = {
      ...updateData,
      keywords: Array.isArray(updateData.keywords) ? updateData.keywords : 
             typeof updateData.keywords === 'string' ? updateData.keywords.split(',').map(k => k.trim()).filter(k => k) : 
             []
    };
    
    // Process keywords for create operation
    const createData = {
      storeId,
      ...processedUpdateData
    };
    
    const customization = await prisma.websiteCustomization.upsert({
      where: { storeId },
      update: processedUpdateData,
      create: createData
    });

    // Broadcast update via WebSocket if service is available
    const websocketService = getWebSocketService();
    if (websocketService && customization.productSections) {
      // Broadcast each section update
      customization.productSections.forEach(section => {
        websocketService.broadcastSectionUpdate(storeId, section.id, section);
      });
    }

    // Invalidate Cache
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { subdomain: true, userId: true }
    });
    
    await invalidateStoreCustomization({
      storeId,
      subdomain: store?.subdomain,
      userId: store?.userId || req.user?.id
    });

    res.json({ customization });
  } catch (error) {
    console.error('Update Customization Error:', error);
    next(error);
  }
};

module.exports = { getCustomization, updateCustomization };