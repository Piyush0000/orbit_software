---
description: Shopify-Like Merchant Onboarding and Management Flow
---

# 🚀 Shopify-Like Merchant Flow

This workflow describes the complete lifecycle of a merchant on the Orbit platform, from admin activation to website customization and product management.

## 1. 🛡️ Admin Activation
The process starts when an administrator activates a merchant account.

1. **Access Admin Panel**: Navigate to the Orbit Admin Dashboard (typically `http://localhost:3001`).
2. **Review Pending Merchants**: Navigate to `Dashboard` -> `Merchants`.
3. **Trigger Activation**: Click the **Activate Orbit Store** button on a merchant card.
4. **Configure Deployment**:
    - **Theme**: Select a pre-built theme (e.g., "Electronics Upfront - Modern").
    - **Plan**: Select a subscription plan (Starter, Pro, Enterprise).
    - **Subdomain**: Set the merchant's unique subdomain (e.g., `awesome-tech.orbit360.shop`).
5. **Provision**: Click **Provision Store Front**.
    - // turbo
    - The system will automatically create the database records, initialize the merchant workspace, and set up the storefront theme.

## 2. 🏪 Merchant Dashboard (Management)
Once activated, the merchant receives access to their dedicated dashboard (typically `http://localhost:3003`).

### 🎨 Website Customization
1. Navigate to `Dashboard` -> `Website`.
2. **Store Info**: Update store name and category.
3. **Branding**: Upload a logo, set primary/secondary brand colors, and choose typography.
4. **Hero Section**: Customize the main banner title, subtitle, and CTA button.
5. **Product Sections**: Configure how products appear on the homepage (Grid vs. Slider).

### 📦 Product Management
1. Navigate to `Dashboard` -> `Products`.
2. **Add Product**: Click **Add Product** and fill in:
    - Name, Price, Category.
    - Stock quantity.
    - Product images (URL or upload).
3. **Inventory**: Track stock levels (In Stock, Low Stock, Out of Stock).

### 📊 Analytics & Orders
1. **Overview**: View revenue charts and recent activity on the main Dashboard.
2. **Orders**: Manage customer orders and tracking status.

## 3. 🌐 Live Storefront
The storefront is dynamically rendered based on the merchant's configuration.

1. **Access Storefront**: Visit `http://subdomain.localhost:3000` or `http://subdomain.orbit360.shop`.
2. **Theme Rendering**: The `ThemeRenderer` component in `storefront_hub_clean` detects the `subdomain`, fetches the merchant's theme choice and customization data, and renders the specific "Upfront" theme.

---

## 🛠️ Technical Verification
To ensure the flow is working:
1. **Check Backend Logs**: Ensure `provisioningService.js` completes all 7 steps without errors.
2. **Database Verification**: Check `Store`, `WebsiteCustomization`, and `Product` tables in Prisma.
3. **API Integrity**: Verify `GET /api/storefront/public/:subdomain/customization` returns the correct data.
