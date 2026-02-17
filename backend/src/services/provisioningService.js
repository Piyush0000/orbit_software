const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const emailService = require('./emailService');

const prisma = new PrismaClient();

/**
 * Main Provisioning Orchestrator
 * Handles the complete merchant provisioning workflow
 */
class ProvisioningService {
  /**
   * Provision a new merchant with all required resources
   * @param {string} storeId - Store ID to provision
   * @param {Object} config - Provisioning configuration
   * @returns {Promise<Object>} Provisioning result
   */
  async provisionMerchant(storeId, config) {
    const {
      themeId,
      planId,
      domain,
      subdomain,
      category,
      integrations = {}
    } = config;

    let provisioning = null;

    try {
      // 1. Create provisioning record
      provisioning = await prisma.merchantProvisioning.create({
        data: {
          storeId,
          status: 'IN_PROGRESS',
          currentStep: 'INITIALIZING',
          startedAt: new Date()
        }
      });

      console.log(`[Provisioning] Started for store: ${storeId}`);

      // 2. Update store with theme, plan, and category
      await this.updateStoreConfig(storeId, { themeId, planId, category, subdomain, customDomain: domain });
      await this.updateProvisioningProgress(provisioning.id, 'STORE_CONFIGURED', 10);

      // 3. Create workspace
      const workspace = await this.createWorkspace(storeId);
      await this.updateProvisioningProgress(provisioning.id, 'WORKSPACE_CREATED', 25, { workspaceCreated: true });

      // 4. Create dashboard instance
      const dashboard = await this.createDashboard(storeId, workspace.merchantId);
      await this.updateProvisioningProgress(provisioning.id, 'DASHBOARD_CREATED', 40, { dashboardCreated: true });

      // 5. Deploy website
      const website = await this.deployWebsite(storeId, themeId, subdomain, domain);
      await this.updateProvisioningProgress(provisioning.id, 'WEBSITE_DEPLOYED', 60, { websiteDeployed: true });

      // 5.5 Create initial theme customization
      await this.createInitialCustomization(storeId, themeId);
      await this.updateProvisioningProgress(provisioning.id, 'CUSTOMIZATION_CREATED', 70, { customizationCreated: true });

      // 6. Initialize default data
      await this.initializeDefaultData(storeId, category);
      await this.updateProvisioningProgress(provisioning.id, 'DATA_INITIALIZED', 80, { dataInitialized: true });

      // 7. Send credentials
      const store = await prisma.store.findUnique({
        where: { id: storeId },
        include: { user: true }
      });
      
      await this.sendCredentials(store, workspace, dashboard, website);
      await this.updateProvisioningProgress(provisioning.id, 'CREDENTIALS_SENT', 95, { credentialsSent: true });

      // 8. Mark as completed
      await prisma.merchantProvisioning.update({
        where: { id: provisioning.id },
        data: {
          status: 'COMPLETED',
          currentStep: 'COMPLETED',
          completionPercent: 100,
          completedAt: new Date()
        }
      });

      // 9. Update store status
      await prisma.store.update({
        where: { id: storeId },
        data: {
          provisioningStatus: 'COMPLETED',
          isActive: true
        }
      });

      console.log(`[Provisioning] Completed successfully for store: ${storeId}`);

      return {
        success: true,
        storeId,
        merchantId: workspace.merchantId,
        dashboardUrl: dashboard.url,
        websiteUrl: website.url,
        message: 'Merchant provisioned successfully'
      };

    } catch (error) {
      console.error(`[Provisioning] Error for store ${storeId}:`, error);

      // Rollback on error
      if (provisioning) {
        await prisma.merchantProvisioning.update({
          where: { id: provisioning.id },
          data: {
            status: 'FAILED',
            errorLog: {
              message: error.message,
              stack: error.stack,
              timestamp: new Date()
            }
          }
        });
      }

      await prisma.store.update({
        where: { id: storeId },
        data: { provisioningStatus: 'FAILED' }
      });

      throw error;
    }
  }

  /**
   * Update store configuration
   */
  async updateStoreConfig(storeId, config) {
    const { themeId, planId, category, subdomain, customDomain } = config;

    await prisma.store.update({
      where: { id: storeId },
      data: {
        themeId,
        planId,
        category,
        subdomain,
        customDomain,
        provisioningStatus: 'IN_PROGRESS'
      }
    });

    console.log(`[Provisioning] Store config updated for: ${storeId}`);
  }

  /**
   * Create merchant workspace
   */
  async createWorkspace(storeId) {
    const merchantId = `merchant_${uuidv4().split('-')[0]}`;
    const tenantNamespace = `tenant_${merchantId}`;

    // Create deployment metadata
    const deployment = await prisma.deploymentMetadata.create({
      data: {
        storeId,
        merchantId,
        tenantNamespace,
        deploymentConfig: {
          createdAt: new Date(),
          environment: process.env.NODE_ENV || 'development'
        }
      }
    });

    console.log(`[Provisioning] Workspace created: ${merchantId}`);

    return {
      merchantId,
      tenantNamespace,
      deploymentId: deployment.id
    };
  }

  /**
   * Create dashboard instance for merchant
   */
  async createDashboard(storeId, merchantId) {
    // In production, this would:
    // 1. Create a subdomain or route for the dashboard
    // 2. Set up authentication tokens
    // 3. Configure dashboard access

    const dashboardUrl = `${process.env.DASHBOARD_BASE_URL || 'http://localhost:3003'}?merchant=${merchantId}`;

    await prisma.deploymentMetadata.update({
      where: { storeId },
      data: {
        dashboardUrl
      }
    });

    console.log(`[Provisioning] Dashboard created: ${dashboardUrl}`);

    return {
      url: dashboardUrl,
      merchantId
    };
  }

  /**
   * Deploy website with selected theme
   */
  async deployWebsite(storeId, themeId, subdomain, customDomain) {
    // Get theme details
    const theme = await prisma.theme.findUnique({
      where: { id: themeId }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    // In production, this would:
    // 1. Clone theme template
    // 2. Configure with merchant data
    // 3. Deploy to hosting
    // 4. Set up domain/subdomain

    const websiteUrl = customDomain || `${subdomain}.${process.env.WEBSITE_BASE_DOMAIN || 'orbit360.shop'}`;

    await prisma.deploymentMetadata.update({
      where: { storeId },
      data: {
        websiteUrl,
        deploymentConfig: {
          theme: theme.slug,
          themeVersion: theme.version,
          deployedAt: new Date()
        }
      }
    });

    console.log(`[Provisioning] Website deployed: ${websiteUrl}`);

    return {
      url: websiteUrl,
      theme: theme.slug
    };
  }

  /**
   * Create initial theme customization
   */
  async createInitialCustomization(storeId, themeId) {
    // Create default customization based on theme
    const customization = await prisma.websiteCustomization.upsert({
      where: { storeId },
      create: {
        storeId,
        themeId,
        customizationData: {
          storeName: 'New Store',
          logo: '',
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
          accentColor: '#10B981',
          heroSection: {
            title: 'Welcome to Our Store',
            subtitle: 'Premium Products',
            description: 'Discover amazing products curated just for you.',
            badge: 'New Collection',
            ctaText: 'Shop Now',
            secondaryCtaText: 'Learn More',
            imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop'
          }
        }
      },
      update: {
        themeId,
        customizationData: {
          storeName: 'New Store',
          logo: '',
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
          accentColor: '#10B981',
          heroSection: {
            title: 'Welcome to Our Store',
            subtitle: 'Premium Products',
            description: 'Discover amazing products curated just for you.',
            badge: 'New Collection',
            ctaText: 'Shop Now',
            secondaryCtaText: 'Learn More',
            imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop'
          }
        }
      }
    });

    console.log(`[Provisioning] Initial customization created for: ${storeId}`);
  }

  /**
   * Initialize default data for merchant
   */
  async initializeDefaultData(storeId, category) {
    // Create default store settings
    await prisma.storeSettings.upsert({
      where: { storeId },
      create: {
        storeId,
        currency: 'USD',
        timezone: 'UTC',
        contactEmail: '',
        contactPhone: '',
        shippingMethods: [],
        paymentMethods: []
      },
      update: {}
    });

    // Create onboarding record
    await prisma.brandOnboarding.upsert({
      where: { storeId },
      create: {
        storeId,
        status: 'NOT_STARTED',
        currentStep: 1,
        completionPercent: 0,
        stepData: {
          category,
          steps: [
            { key: 'business_info', status: 'PENDING' },
            { key: 'branding', status: 'PENDING' },
            { key: 'payment_setup', status: 'PENDING' },
            { key: 'marketing_setup', status: 'PENDING' },
            { key: 'product_upload', status: 'PENDING' },
            { key: 'website_customization', status: 'PENDING' },
            { key: 'go_live', status: 'PENDING' }
          ]
        }
      },
      update: {}
    });

    console.log(`[Provisioning] Default data initialized for: ${storeId}`);
  }

  /**
   * Send credentials and welcome email to merchant
   */
  async sendCredentials(store, workspace, dashboard, website) {
    const { user } = store;

    const emailData = {
      to: user.email,
      subject: 'Welcome to ORBIT360 - Your Store is Ready!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to ORBIT360!</h1>
          <p>Hi ${user.fullName},</p>
          <p>Great news! Your merchant account has been activated and your store is ready to go.</p>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Your Account Details</h2>
            <p><strong>Store Name:</strong> ${store.name}</p>
            <p><strong>Merchant ID:</strong> ${workspace.merchantId}</p>
            <p><strong>Dashboard URL:</strong> <a href="${dashboard.url}">${dashboard.url}</a></p>
            <p><strong>Website URL:</strong> <a href="${website.url}">${website.url}</a></p>
          </div>

          <div style="background: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Next Steps:</h3>
            <ol>
              <li>Log in to your dashboard using your existing credentials</li>
              <li>Complete the onboarding wizard to set up your store</li>
              <li>Add your products and configure payment methods</li>
              <li>Customize your website theme</li>
              <li>Go live and start selling!</li>
            </ol>
          </div>

          <p>If you have any questions, our support team is here to help.</p>
          
          <p>Best regards,<br>The ORBIT360 Team</p>
        </div>
      `
    };

    await emailService.sendEmail(emailData);

    console.log(`[Provisioning] Credentials sent to: ${user.email}`);
  }

  /**
   * Update provisioning progress
   */
  async updateProvisioningProgress(provisioningId, step, percent, updates = {}) {
    await prisma.merchantProvisioning.update({
      where: { id: provisioningId },
      data: {
        currentStep: step,
        completionPercent: percent,
        ...updates
      }
    });

    console.log(`[Provisioning] Progress: ${step} (${percent}%)`);
  }

  /**
   * Retry failed provisioning
   */
  async retryProvisioning(storeId) {
    const provisioning = await prisma.merchantProvisioning.findUnique({
      where: { storeId }
    });

    if (!provisioning) {
      throw new Error('Provisioning record not found');
    }

    if (provisioning.status !== 'FAILED') {
      throw new Error('Can only retry failed provisioning');
    }

    // Increment retry count
    await prisma.merchantProvisioning.update({
      where: { id: provisioning.id },
      data: {
        retryCount: provisioning.retryCount + 1,
        status: 'PENDING'
      }
    });

    // Get store config
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    });

    // Retry provisioning
    return this.provisionMerchant(storeId, {
      themeId: store.themeId,
      planId: store.planId,
      subdomain: store.subdomain,
      domain: store.customDomain,
      category: store.category
    });
  }

  /**
   * Get provisioning status
   */
  async getProvisioningStatus(storeId) {
    const provisioning = await prisma.merchantProvisioning.findUnique({
      where: { storeId },
      include: {
        store: {
          include: {
            theme: true,
            plan: true,
            deployment: true
          }
        }
      }
    });

    return provisioning;
  }
}

module.exports = new ProvisioningService();
