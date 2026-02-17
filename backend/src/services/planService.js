const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Plan Management Service
 * Handles subscription plans and pricing
 */
class PlanService {
  /**
   * Create a new plan
   */
  async createPlan(data) {
    const {
      name,
      slug,
      description,
      price,
      billingCycle,
      features,
      productLimit,
      orderLimit,
      storageLimit,
      bandwidthLimit,
      isPopular
    } = data;

    // Check if slug already exists
    const existing = await prisma.plan.findUnique({
      where: { slug }
    });

    if (existing) {
      throw new Error(`Plan with slug '${slug}' already exists`);
    }

    const plan = await prisma.plan.create({
      data: {
        name,
        slug,
        description,
        price,
        billingCycle: billingCycle || 'monthly',
        features,
        productLimit,
        orderLimit,
        storageLimit,
        bandwidthLimit,
        isPopular: isPopular || false,
        isActive: true
      }
    });

    console.log(`[Plan] Created: ${plan.name} (${plan.slug})`);
    return plan;
  }

  /**
   * Get all plans
   */
  async getAllPlans(activeOnly = false) {
    const where = activeOnly ? { isActive: true } : {};

    const plans = await prisma.plan.findMany({
      where,
      orderBy: { price: 'asc' }
    });

    return plans;
  }

  /**
   * Get plan by ID
   */
  async getPlanById(id) {
    const plan = await prisma.plan.findUnique({
      where: { id },
      include: {
        _count: {
          select: { stores: true }
        }
      }
    });

    if (!plan) {
      throw new Error(`Plan not found: ${id}`);
    }

    return plan;
  }

  /**
   * Get plan by slug
   */
  async getPlanBySlug(slug) {
    const plan = await prisma.plan.findUnique({
      where: { slug }
    });

    if (!plan) {
      throw new Error(`Plan not found: ${slug}`);
    }

    return plan;
  }

  /**
   * Update plan
   */
  async updatePlan(id, data) {
    const {
      name,
      description,
      price,
      billingCycle,
      features,
      productLimit,
      orderLimit,
      storageLimit,
      bandwidthLimit,
      isActive,
      isPopular
    } = data;

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(billingCycle && { billingCycle }),
        ...(features && { features }),
        ...(productLimit !== undefined && { productLimit }),
        ...(orderLimit !== undefined && { orderLimit }),
        ...(storageLimit !== undefined && { storageLimit }),
        ...(bandwidthLimit !== undefined && { bandwidthLimit }),
        ...(isActive !== undefined && { isActive }),
        ...(isPopular !== undefined && { isPopular })
      }
    });

    console.log(`[Plan] Updated: ${plan.name}`);
    return plan;
  }

  /**
   * Delete plan
   */
  async deletePlan(id) {
    // Check if plan is in use
    const storeCount = await prisma.store.count({
      where: { planId: id }
    });

    if (storeCount > 0) {
      throw new Error(`Cannot delete plan. It is currently used by ${storeCount} store(s)`);
    }

    await prisma.plan.delete({
      where: { id }
    });

    console.log(`[Plan] Deleted: ${id}`);
  }

  /**
   * Toggle plan status
   */
  async togglePlanStatus(id, isActive) {
    const plan = await prisma.plan.update({
      where: { id },
      data: { isActive }
    });

    console.log(`[Plan] ${isActive ? 'Activated' : 'Deactivated'}: ${plan.name}`);
    return plan;
  }

  /**
   * Get stores by plan
   */
  async getStoresByPlan(planId) {
    const stores = await prisma.store.findMany({
      where: { planId },
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
   * Seed default plans
   */
  async seedDefaultPlans() {
    const defaultPlans = [
      {
        name: 'Starter',
        slug: 'starter',
        description: 'Perfect for new merchants getting started',
        price: 29.99,
        billingCycle: 'monthly',
        features: {
          products: 100,
          orders: 'unlimited',
          storage: '5GB',
          bandwidth: '50GB',
          support: 'Email',
          themes: 'Basic themes',
          analytics: 'Basic analytics',
          integrations: ['Payment gateways', 'Shipping providers']
        },
        productLimit: 100,
        orderLimit: null,
        storageLimit: 5120, // MB
        bandwidthLimit: 51200, // MB
        isPopular: false
      },
      {
        name: 'Professional',
        slug: 'professional',
        description: 'For growing businesses with advanced needs',
        price: 79.99,
        billingCycle: 'monthly',
        features: {
          products: 1000,
          orders: 'unlimited',
          storage: '50GB',
          bandwidth: '500GB',
          support: 'Priority email & chat',
          themes: 'All themes',
          analytics: 'Advanced analytics',
          integrations: ['All payment gateways', 'All shipping', 'Marketing tools', 'Meta Ads']
        },
        productLimit: 1000,
        orderLimit: null,
        storageLimit: 51200, // MB
        bandwidthLimit: 512000, // MB
        isPopular: true
      },
      {
        name: 'Enterprise',
        slug: 'enterprise',
        description: 'For large-scale operations requiring maximum performance',
        price: 299.99,
        billingCycle: 'monthly',
        features: {
          products: 'unlimited',
          orders: 'unlimited',
          storage: 'unlimited',
          bandwidth: 'unlimited',
          support: '24/7 phone & dedicated account manager',
          themes: 'All themes + custom development',
          analytics: 'Enterprise analytics + custom reports',
          integrations: ['Everything', 'Custom integrations', 'API access', 'White-label options']
        },
        productLimit: null,
        orderLimit: null,
        storageLimit: null,
        bandwidthLimit: null,
        isPopular: false
      }
    ];

    const created = [];

    for (const planData of defaultPlans) {
      try {
        const existing = await prisma.plan.findUnique({
          where: { slug: planData.slug }
        });

        if (!existing) {
          const plan = await this.createPlan(planData);
          created.push(plan);
        }
      } catch (error) {
        console.error(`Error seeding plan ${planData.slug}:`, error.message);
      }
    }

    console.log(`[Plan] Seeded ${created.length} default plans`);
    return created;
  }
}

module.exports = new PlanService();
