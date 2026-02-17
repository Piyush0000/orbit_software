const provisioningService = require('../services/provisioningService');
const themeService = require('../services/themeService');
const planService = require('../services/planService');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Activate merchant and trigger provisioning
 */
exports.activateMerchant = async (req, res) => {
  try {
    const { id: storeId } = req.params;
    const { themeId, planId, domain, subdomain, category, integrations } = req.body;

    // Validate inputs
    if (!themeId) {
      return res.status(400).json({ error: 'Theme is required' });
    }

    if (!planId) {
      return res.status(400).json({ error: 'Plan is required' });
    }

    if (!subdomain && !domain) {
      return res.status(400).json({ error: 'Either subdomain or custom domain is required' });
    }

    // Check if store exists
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: { user: true }
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    // Check if already provisioned
    if (store.provisioningStatus === 'COMPLETED') {
      return res.status(400).json({ error: 'Store is already provisioned' });
    }

    // Verify theme exists
    await themeService.getThemeById(themeId);

    // Verify plan exists
    await planService.getPlanById(planId);

    // Start provisioning (async)
    const result = await provisioningService.provisionMerchant(storeId, {
      themeId,
      planId,
      domain,
      subdomain,
      category,
      integrations
    });

    res.json({
      success: true,
      message: 'Merchant activated successfully',
      data: result
    });

  } catch (error) {
    console.error('Error activating merchant:', error);
    res.status(500).json({
      error: 'Failed to activate merchant',
      message: error.message
    });
  }
};

/**
 * Get provisioning status
 */
exports.getProvisioningStatus = async (req, res) => {
  try {
    const { id: storeId } = req.params;

    const status = await provisioningService.getProvisioningStatus(storeId);

    if (!status) {
      return res.status(404).json({ error: 'Provisioning record not found' });
    }

    res.json({
      success: true,
      data: status
    });

  } catch (error) {
    console.error('Error getting provisioning status:', error);
    res.status(500).json({
      error: 'Failed to get provisioning status',
      message: error.message
    });
  }
};

/**
 * Retry failed provisioning
 */
exports.retryProvisioning = async (req, res) => {
  try {
    const { id: storeId } = req.params;

    const result = await provisioningService.retryProvisioning(storeId);

    res.json({
      success: true,
      message: 'Provisioning retry initiated',
      data: result
    });

  } catch (error) {
    console.error('Error retrying provisioning:', error);
    res.status(500).json({
      error: 'Failed to retry provisioning',
      message: error.message
    });
  }
};

/**
 * Get all themes
 */
exports.getThemes = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    const themes = await themeService.getAllThemes(activeOnly === 'true');

    res.json({
      success: true,
      data: themes
    });

  } catch (error) {
    console.error('Error getting themes:', error);
    res.status(500).json({
      error: 'Failed to get themes',
      message: error.message
    });
  }
};

/**
 * Create theme
 */
exports.createTheme = async (req, res) => {
  try {
    const theme = await themeService.createTheme(req.body);

    res.status(201).json({
      success: true,
      message: 'Theme created successfully',
      data: theme
    });

  } catch (error) {
    console.error('Error creating theme:', error);
    res.status(500).json({
      error: 'Failed to create theme',
      message: error.message
    });
  }
};

/**
 * Update theme
 */
exports.updateTheme = async (req, res) => {
  try {
    const { id } = req.params;
    const theme = await themeService.updateTheme(id, req.body);

    res.json({
      success: true,
      message: 'Theme updated successfully',
      data: theme
    });

  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(500).json({
      error: 'Failed to update theme',
      message: error.message
    });
  }
};

/**
 * Delete theme
 */
exports.deleteTheme = async (req, res) => {
  try {
    const { id } = req.params;
    await themeService.deleteTheme(id);

    res.json({
      success: true,
      message: 'Theme deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting theme:', error);
    res.status(500).json({
      error: 'Failed to delete theme',
      message: error.message
    });
  }
};

/**
 * Get all plans
 */
exports.getPlans = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    const plans = await planService.getAllPlans(activeOnly === 'true');

    res.json({
      success: true,
      data: plans
    });

  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({
      error: 'Failed to get plans',
      message: error.message
    });
  }
};

/**
 * Create plan
 */
exports.createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.body);

    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: plan
    });

  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({
      error: 'Failed to create plan',
      message: error.message
    });
  }
};

/**
 * Update plan
 */
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await planService.updatePlan(id, req.body);

    res.json({
      success: true,
      message: 'Plan updated successfully',
      data: plan
    });

  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({
      error: 'Failed to update plan',
      message: error.message
    });
  }
};

/**
 * Delete plan
 */
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await planService.deletePlan(id);

    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({
      error: 'Failed to delete plan',
      message: error.message
    });
  }
};

/**
 * Seed default themes and plans
 */
exports.seedDefaults = async (req, res) => {
  try {
    const themes = await themeService.seedDefaultThemes();
    const plans = await planService.seedDefaultPlans();

    res.json({
      success: true,
      message: 'Default themes and plans seeded successfully',
      data: {
        themes,
        plans
      }
    });

  } catch (error) {
    console.error('Error seeding defaults:', error);
    res.status(500).json({
      error: 'Failed to seed defaults',
      message: error.message
    });
  }
};
