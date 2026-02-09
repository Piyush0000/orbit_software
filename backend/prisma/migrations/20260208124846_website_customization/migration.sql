-- CreateEnum
CREATE TYPE "ProvisioningStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLBACK');

-- CreateEnum
CREATE TYPE "ThemeCategory" AS ENUM ('CLOTHING', 'ELECTRONICS', 'TOYSTORE', 'FOOTWEAR', 'FOOD_BEVERAGE', 'COSMETICS', 'PERFUME', 'JEWELLERY', 'FURNITURE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT,
ADD COLUMN     "customFields" JSONB,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "category" TEXT,
ADD COLUMN     "planId" TEXT,
ADD COLUMN     "provisioningStatus" "ProvisioningStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'toys',
ADD COLUMN     "themeId" TEXT;

-- CreateTable
CREATE TABLE "BrandOnboarding" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "OnboardingStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    "stepData" JSONB,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "lastStepSavedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandOnboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ThemeCategory",
    "description" TEXT,
    "thumbnail" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "previewUrl" TEXT,
    "repository" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "billingCycle" TEXT NOT NULL DEFAULT 'monthly',
    "features" JSONB NOT NULL,
    "productLimit" INTEGER,
    "orderLimit" INTEGER,
    "storageLimit" INTEGER,
    "bandwidthLimit" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantProvisioning" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "ProvisioningStatus" NOT NULL DEFAULT 'PENDING',
    "workspaceCreated" BOOLEAN NOT NULL DEFAULT false,
    "dashboardCreated" BOOLEAN NOT NULL DEFAULT false,
    "websiteDeployed" BOOLEAN NOT NULL DEFAULT false,
    "dataInitialized" BOOLEAN NOT NULL DEFAULT false,
    "credentialsSent" BOOLEAN NOT NULL DEFAULT false,
    "currentStep" TEXT,
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    "errorLog" JSONB,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantProvisioning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeploymentMetadata" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "tenantNamespace" TEXT NOT NULL,
    "dashboardUrl" TEXT,
    "websiteUrl" TEXT,
    "databaseName" TEXT,
    "deploymentConfig" JSONB,
    "sslEnabled" BOOLEAN NOT NULL DEFAULT false,
    "dnsConfigured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeploymentMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteCustomization" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "logo" TEXT,
    "favicon" TEXT,
    "brandColors" JSONB,
    "typography" JSONB,
    "heroSection" JSONB,
    "aboutSection" JSONB,
    "contactInfo" JSONB,
    "headerStyle" TEXT,
    "footerContent" JSONB,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    "socialLinks" JSONB,
    "features" JSONB,
    "ctaButtons" JSONB,
    "navLinks" JSONB,
    "announcementBar" JSONB,
    "newsletter" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantCredentials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "temporaryPassword" TEXT NOT NULL,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,
    "lastPasswordChange" TIMESTAMP(3),
    "createdByAdminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrandOnboarding_storeId_key" ON "BrandOnboarding"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_slug_key" ON "Theme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantProvisioning_storeId_key" ON "MerchantProvisioning"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "DeploymentMetadata_storeId_key" ON "DeploymentMetadata"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "DeploymentMetadata_merchantId_key" ON "DeploymentMetadata"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "DeploymentMetadata_tenantNamespace_key" ON "DeploymentMetadata"("tenantNamespace");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteCustomization_storeId_key" ON "WebsiteCustomization"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantCredentials_userId_key" ON "MerchantCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantCredentials_storeId_key" ON "MerchantCredentials"("storeId");

-- CreateIndex
CREATE INDEX "MerchantCredentials_email_idx" ON "MerchantCredentials"("email");

-- CreateIndex
CREATE INDEX "MerchantCredentials_storeId_idx" ON "MerchantCredentials"("storeId");

-- CreateIndex
CREATE INDEX "Order_storeId_idx" ON "Order"("storeId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "Product_storeId_idx" ON "Product"("storeId");

-- CreateIndex
CREATE INDEX "Product_storeId_isActive_idx" ON "Product"("storeId", "isActive");

-- CreateIndex
CREATE INDEX "Product_storeId_category_idx" ON "Product"("storeId", "category");

-- CreateIndex
CREATE INDEX "Product_storeId_createdAt_idx" ON "Product"("storeId", "createdAt");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE INDEX "Store_userId_idx" ON "Store"("userId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandOnboarding" ADD CONSTRAINT "BrandOnboarding_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantProvisioning" ADD CONSTRAINT "MerchantProvisioning_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeploymentMetadata" ADD CONSTRAINT "DeploymentMetadata_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteCustomization" ADD CONSTRAINT "WebsiteCustomization_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
