# ORBIT360 Upfront Templates Integration Guide

## 🎯 Project Overview

**Objective**: Integrate 4 Upfront template repositories into ORBIT360 platform with category-based organization, remove all dummy data, connect to backend APIs, and enable merchants to edit their websites from their Orbit-360 dashboard in real-time.

**Expected Outcome**: Fully automated multi-tenant e-commerce platform where:
- Admin assigns category-specific templates to merchants
- Merchants control their website content from Orbit-360 dashboard
- All changes sync in real-time to their public website
- Zero manual configuration required

---

## 📚 Required Reading (MUST READ FIRST)

Before starting implementation, read these documents in order:

1. **`MULTI_TENANT_PROVISIONING_PLAN.md`** - Understand the overall architecture
2. **`TECHNICAL_IMPLEMENTATION_GUIDE.md`** - Learn the data flow
3. **`PROVISIONING_IMPLEMENTATION_SUMMARY.md`** - Review what's already built
4. **`COMPLETE_MERCHANT_JOURNEY_GUIDE.md`** - Understand the user journey

---

## 📦 Template Repositories

### Repository Links:
1. **orbit_front_others** - `https://github.com/Piyush0000/orbit_front_others.git`
2. **orbit-cosmetics-upfront** - `https://github.com/Piyush0000/orbit-cosmetics-upfront.git`
3. **orbit_front_all** - `https://github.com/Piyush0000/orbit_front_all.git`
4. **orbit_upfront** - `https://github.com/Piyush0000/orbit_upfront.git`

### Category Mapping Strategy:
Analyze each repository and categorize templates into:
- **Clothing** - Fashion, apparel, accessories
- **Electronics** - Tech products, gadgets
- **Toy Store** - Kids products, toys, games
- **Footwear** - Shoes, sneakers, boots
- **Food & Beverage** - Restaurants, cafes, food delivery
- **Cosmetics** - Beauty products, skincare
- **Perfume** - Fragrances, luxury scents
- **Jewellery/Accessories** - Jewelry, watches, accessories

---

## 🚀 Unified Storefront Solution (NEW)

To avoid running each template manually, we use the **Orbit Storefront Hub**. This is a single Next.js application that intelligently serves the correct theme for every merchant.

### 🔌 The Orbit API Bridge
Every template has been injected with a standard `lib/orbit-api.ts`. This file connects the template's UI to the merchant's real product catalog.

### 🌍 The Storefront Hub
Located at `templates/orbit_storefront_hub`, this app is the only thing you need to run. It handles routing for all 13 categories.

**How to run everything at once:**
1. Start Backend: `cd backend && npm run dev` (Port 5000)
2. Start Admin: `cd orbit_admin && npm run dev` (Port 3001)
3. Start Storefront Hub: `cd templates/orbit_storefront_hub && npm run dev` (Port 3000)

---

## 🏗️ Implementation Phases

## PHASE 1: Repository Analysis & Setup

### Step 1.1: Clone All Repositories
```bash
cd d:\orbit
mkdir templates
cd templates

# Clone all repositories
git clone https://github.com/Piyush0000/orbit_front_others.git
git clone https://github.com/Piyush0000/orbit-cosmetics-upfront.git
git clone https://github.com/Piyush0000/orbit_front_all.git
git clone https://github.com/Piyush0000/orbit_upfront.git
```

### Step 1.2: Analyze Each Repository
For each repository, document:
- Technology stack (React/Next.js/HTML/Vue)
- Current dummy data structure
- Component architecture
- Styling approach (CSS/Tailwind/Styled Components)
- Number of unique templates/themes
- Which category each template best fits

**Create analysis document**: `TEMPLATE_ANALYSIS.md`

### Step 1.3: Categorize Templates
Create a mapping file: `templates/CATEGORY_MAPPING.json`
```json
{
  "clothing": {
    "templates": [
      {
        "id": "clothing-modern",
        "name": "Modern Fashion Store",
        "repository": "orbit_front_all",
        "path": "/templates/fashion-modern",
        "preview": "/previews/clothing-modern.png"
      }
    ]
  },
  "electronics": {
    "templates": [...]
  },
  "toystore": {
    "templates": [...]
  },
  "footwear": {
    "templates": [...]
  },
  "food_beverage": {
    "templates": [...]
  },
  "cosmetics": {
    "templates": [...]
  },
  "perfume": {
    "templates": [...]
  },
  "jewellery": {
    "templates": [...]
  }
}
```

---

## PHASE 2: Database Schema Updates

### Step 2.1: Update Theme Model
Add category support to the Theme model:

**File**: `backend/prisma/schema.prisma`

```prisma
model Theme {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  category    ThemeCategory
  description String?
  thumbnail   String?
  previewUrl  String?
  repository  String?  // Git repository URL
  version     String
  isActive    Boolean  @default(true)
  config      Json?    // Theme-specific configuration
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  stores      Store[]
}

enum ThemeCategory {
  CLOTHING
  ELECTRONICS
  TOYSTORE
  FOOTWEAR
  FOOD_BEVERAGE
  COSMETICS
  PERFUME
  JEWELLERY
}
```

### Step 2.2: Add Website Customization Model
Track merchant website customizations:

```prisma
model WebsiteCustomization {
  id              String   @id @default(uuid())
  storeId         String   @unique
  store           Store    @relation(fields: [storeId], references: [id])
  
  // Branding
  logo            String?
  favicon         String?
  brandColors     Json?    // { primary, secondary, accent }
  typography      Json?    // { headingFont, bodyFont }
  
  // Content
  heroSection     Json?    // { title, subtitle, image, cta }
  aboutSection    Json?
  contactInfo     Json?
  
  // Layout
  headerStyle     String?  // modern, classic, minimal
  footerContent   Json?
  
  // SEO
  metaTitle       String?
  metaDescription String?
  keywords        String[]
  
  // Social
  socialLinks     Json?    // { facebook, instagram, twitter }
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Step 2.3: Run Migration
```bash
cd backend
npx prisma migrate dev --name add_theme_categories_and_customization
npx prisma generate
```

---

## PHASE 3: Seed Themes Database

### Step 3.1: Create Theme Seeder
**File**: `backend/seed-themes.js`

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const themes = [
  // Clothing
  {
    name: "Modern Fashion Store",
    slug: "clothing-modern",
    category: "CLOTHING",
    description: "Contemporary fashion e-commerce template",
    thumbnail: "/themes/clothing-modern/preview.png",
    repository: "orbit_front_all",
    version: "1.0.0",
    config: {
      features: ["product-grid", "quick-view", "size-guide"],
      colors: { primary: "#000000", secondary: "#FFFFFF" }
    }
  },
  {
    name: "Boutique Fashion",
    slug: "clothing-boutique",
    category: "CLOTHING",
    description: "Elegant boutique style template",
    thumbnail: "/themes/clothing-boutique/preview.png",
    repository: "orbit_upfront",
    version: "1.0.0",
    config: {
      features: ["lookbook", "style-guide", "collections"],
      colors: { primary: "#D4AF37", secondary: "#2C2C2C" }
    }
  },
  
  // Electronics
  {
    name: "Tech Store Pro",
    slug: "electronics-pro",
    category: "ELECTRONICS",
    description: "Modern electronics store template",
    thumbnail: "/themes/electronics-pro/preview.png",
    repository: "orbit_front_others",
    version: "1.0.0",
    config: {
      features: ["specs-comparison", "tech-reviews", "warranty-info"],
      colors: { primary: "#0066CC", secondary: "#333333" }
    }
  },
  
  // Cosmetics
  {
    name: "Beauty Luxe",
    slug: "cosmetics-luxe",
    category: "COSMETICS",
    description: "Luxury cosmetics store template",
    thumbnail: "/themes/cosmetics-luxe/preview.png",
    repository: "orbit-cosmetics-upfront",
    version: "1.0.0",
    config: {
      features: ["ingredient-list", "skin-type-filter", "beauty-tips"],
      colors: { primary: "#FF69B4", secondary: "#FFFFFF" }
    }
  },
  
  // Toy Store
  {
    name: "Kids Wonderland",
    slug: "toystore-wonderland",
    category: "TOYSTORE",
    description: "Colorful toy store template",
    thumbnail: "/themes/toystore-wonderland/preview.png",
    repository: "orbit_front_all",
    version: "1.0.0",
    config: {
      features: ["age-filter", "educational-toys", "gift-guide"],
      colors: { primary: "#FF6B6B", secondary: "#4ECDC4" }
    }
  },
  
  // Footwear
  {
    name: "Shoe Gallery",
    slug: "footwear-gallery",
    category: "FOOTWEAR",
    description: "Premium footwear store template",
    thumbnail: "/themes/footwear-gallery/preview.png",
    repository: "orbit_upfront",
    version: "1.0.0",
    config: {
      features: ["size-chart", "360-view", "material-info"],
      colors: { primary: "#8B4513", secondary: "#F5F5DC" }
    }
  },
  
  // Food & Beverage
  {
    name: "Restaurant Deluxe",
    slug: "food-deluxe",
    category: "FOOD_BEVERAGE",
    description: "Restaurant and cafe template",
    thumbnail: "/themes/food-deluxe/preview.png",
    repository: "orbit_front_others",
    version: "1.0.0",
    config: {
      features: ["menu-builder", "reservations", "delivery-tracking"],
      colors: { primary: "#FF4500", secondary: "#FFD700" }
    }
  },
  
  // Perfume
  {
    name: "Fragrance Elite",
    slug: "perfume-elite",
    category: "PERFUME",
    description: "Luxury perfume store template",
    thumbnail: "/themes/perfume-elite/preview.png",
    repository: "orbit-cosmetics-upfront",
    version: "1.0.0",
    config: {
      features: ["scent-finder", "fragrance-notes", "gift-sets"],
      colors: { primary: "#4B0082", secondary: "#FFD700" }
    }
  },
  
  // Jewellery
  {
    name: "Jewel Showcase",
    slug: "jewellery-showcase",
    category: "JEWELLERY",
    description: "Elegant jewellery store template",
    thumbnail: "/themes/jewellery-showcase/preview.png",
    repository: "orbit_front_all",
    version: "1.0.0",
    config: {
      features: ["virtual-try-on", "certification", "custom-design"],
      colors: { primary: "#FFD700", secondary: "#000000" }
    }
  }
];

async function seedThemes() {
  console.log('🌱 Seeding themes...');
  
  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: theme,
      create: theme
    });
    console.log(`✅ Created/Updated: ${theme.name}`);
  }
  
  console.log('✨ Theme seeding complete!');
  await prisma.$disconnect();
}

seedThemes().catch(console.error);
```

### Step 3.2: Run Seeder
```bash
cd backend
node seed-themes.js
```

---

## PHASE 4: Admin Panel - Theme Management

### Step 4.1: Create Theme Management Page
**File**: `orbit_admin/src/app/dashboard/themes/page.tsx`

```tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getThemes } from "@/lib/admin-api"

const CATEGORIES = [
  { value: "CLOTHING", label: "Clothing" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "TOYSTORE", label: "Toy Store" },
  { value: "FOOTWEAR", label: "Footwear" },
  { value: "FOOD_BEVERAGE", label: "Food & Beverage" },
  { value: "COSMETICS", label: "Cosmetics" },
  { value: "PERFUME", label: "Perfume" },
  { value: "JEWELLERY", label: "Jewellery/Accessories" }
]

export default function ThemesPage() {
  const [themes, setThemes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      const data = await getThemes()
      setThemes(data.themes)
    } catch (error) {
      console.error("Failed to load themes:", error)
    } finally {
      setLoading(false)
    }
  }

  const themesByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat.value] = themes.filter(t => t.category === cat.value)
    return acc
  }, {})

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Website Templates</h2>
        <p className="text-muted-foreground">
          Manage category-specific templates for merchant websites
        </p>
      </div>

      <Tabs defaultValue="CLOTHING" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map(cat => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map(cat => (
          <TabsContent key={cat.value} value={cat.value} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {themesByCategory[cat.value]?.map(theme => (
                <Card key={theme.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {theme.thumbnail && (
                      <img 
                        src={theme.thumbnail} 
                        alt={theme.name}
                        className="object-cover w-full h-full"
                      />
                    )}
                    <Badge className="absolute top-2 right-2">
                      {theme.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{theme.name}</CardTitle>
                    <CardDescription>{theme.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        v{theme.version}
                      </span>
                      <Button size="sm" variant="outline">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
```

### Step 4.2: Update Admin API
**File**: `orbit_admin/src/lib/admin-api.ts`

Add these functions:
```typescript
export const getThemes = (category?: string) => {
  const params = category ? `?category=${category}` : '';
  return adminRequest<{ themes: Theme[] }>(`/api/admin/themes${params}`);
};

export const getThemesByCategory = () =>
  adminRequest<{ categories: Record<string, Theme[]> }>('/api/admin/themes/by-category');
```

---

## PHASE 5: Backend API Endpoints

### Step 5.1: Theme Controller
**File**: `backend/src/controllers/themeController.js`

```javascript
const { prisma } = require('../config/database');

// Get all themes (with optional category filter)
exports.getThemes = async (req, res, next) => {
  try {
    const { category } = req.query;
    
    const where = {};
    if (category) {
      where.category = category;
    }
    
    const themes = await prisma.theme.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });
    
    res.json({ themes });
  } catch (error) {
    next(error);
  }
};

// Get themes grouped by category
exports.getThemesByCategory = async (req, res, next) => {
  try {
    const themes = await prisma.theme.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    
    const categories = themes.reduce((acc, theme) => {
      if (!acc[theme.category]) {
        acc[theme.category] = [];
      }
      acc[theme.category].push(theme);
      return acc;
    }, {});
    
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

// Get single theme
exports.getTheme = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const theme = await prisma.theme.findUnique({
      where: { id }
    });
    
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    
    res.json({ theme });
  } catch (error) {
    next(error);
  }
};
```

### Step 5.2: Website Customization Controller
**File**: `backend/src/controllers/websiteCustomizationController.js`

```javascript
const { prisma } = require('../config/database');

// Get customization for a store
exports.getCustomization = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    
    let customization = await prisma.websiteCustomization.findUnique({
      where: { storeId }
    });
    
    // Create default if doesn't exist
    if (!customization) {
      customization = await prisma.websiteCustomization.create({
        data: {
          storeId,
          brandColors: { primary: '#000000', secondary: '#FFFFFF', accent: '#FF6B6B' },
          typography: { headingFont: 'Inter', bodyFont: 'Inter' }
        }
      });
    }
    
    res.json({ customization });
  } catch (error) {
    next(error);
  }
};

// Update customization
exports.updateCustomization = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const updateData = req.body;
    
    const customization = await prisma.websiteCustomization.upsert({
      where: { storeId },
      update: updateData,
      create: {
        storeId,
        ...updateData
      }
    });
    
    // Broadcast update via WebSocket (to be implemented)
    // websocketService.broadcast(storeId, 'CUSTOMIZATION_UPDATE', customization);
    
    res.json({ customization });
  } catch (error) {
    next(error);
  }
};
```

### Step 5.3: Public API for Websites
**File**: `backend/src/controllers/publicController.js`

```javascript
const { prisma } = require('../config/database');

// Get store data by subdomain (for public websites)
exports.getStoreBySubdomain = async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    
    const store = await prisma.store.findFirst({
      where: { subdomain },
      include: {
        theme: true,
        plan: true,
        deployment: true,
        user: {
          select: { email: true, fullName: true }
        }
      }
    });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

// Get products for a store (public)
exports.getStoreProducts = async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    
    const store = await prisma.store.findFirst({
      where: { subdomain }
    });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    const products = await prisma.product.findMany({
      where: { 
        storeId: store.id,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

// Get website customization (public)
exports.getStoreCustomization = async (req, res, next) => {
  try {
    const { subdomain } = req.params;
    
    const store = await prisma.store.findFirst({
      where: { subdomain }
    });
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    const customization = await prisma.websiteCustomization.findUnique({
      where: { storeId: store.id }
    });
    
    res.json({ customization });
  } catch (error) {
    next(error);
  }
};
```

### Step 5.4: Add Routes
**File**: `backend/src/routes/themes.js`

```javascript
const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', adminAuth, themeController.getThemes);
router.get('/by-category', adminAuth, themeController.getThemesByCategory);
router.get('/:id', adminAuth, themeController.getTheme);

module.exports = router;
```

**File**: `backend/src/routes/public.js`

```javascript
const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Public routes (no auth required)
router.get('/stores/:subdomain', publicController.getStoreBySubdomain);
router.get('/stores/:subdomain/products', publicController.getStoreProducts);
router.get('/stores/:subdomain/customization', publicController.getStoreCustomization);

module.exports = router;
```

**File**: `backend/src/server.js` (add routes)

```javascript
// Add these lines
const themeRoutes = require('./routes/themes');
const publicRoutes = require('./routes/public');

app.use('/api/admin/themes', themeRoutes);
app.use('/api/public', publicRoutes);
```

---

## PHASE 6: Remove Dummy Data from Templates

### Step 6.1: Template Conversion Strategy

For each template repository, follow this process:

**A. Identify Dummy Data Locations**
- Search for hardcoded product arrays
- Find static text content
- Locate hardcoded images
- Identify color/styling constants

**B. Create Data Fetching Layer**

**File**: `templates/[template-name]/src/lib/api.js`

```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getStoreData(subdomain) {
  const res = await fetch(`${API_BASE}/api/public/stores/${subdomain}`);
  if (!res.ok) throw new Error('Store not found');
  return res.json();
}

export async function getProducts(subdomain) {
  const res = await fetch(`${API_BASE}/api/public/stores/${subdomain}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getCustomization(subdomain) {
  const res = await fetch(`${API_BASE}/api/public/stores/${subdomain}/customization`);
  if (!res.ok) return { customization: null };
  return res.json();
}
```

**C. Update Components to Use Real Data**

Example conversion:

**BEFORE** (Dummy Data):
```jsx
const products = [
  { id: 1, name: "Product 1", price: 99.99, image: "/dummy.jpg" },
  { id: 2, name: "Product 2", price: 149.99, image: "/dummy2.jpg" }
];

export default function ProductGrid() {
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**AFTER** (Real Data):
```jsx
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';

export default function ProductGrid({ subdomain }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts(subdomain)
      .then(data => setProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subdomain]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**D. Apply Dynamic Styling**

```jsx
import { useEffect, useState } from 'react';
import { getCustomization } from '@/lib/api';

export default function StoreLayout({ subdomain, children }) {
  const [customization, setCustomization] = useState(null);

  useEffect(() => {
    getCustomization(subdomain)
      .then(data => setCustomization(data.customization))
      .catch(console.error);
  }, [subdomain]);

  const colors = customization?.brandColors || {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#FF6B6B'
  };

  return (
    <div style={{
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-accent': colors.accent
    }}>
      {children}
    </div>
  );
}
```

### Step 6.2: Create Conversion Checklist

For EACH template, complete this checklist:

- [ ] Clone repository to `d:\orbit\templates\[template-name]`
- [ ] Install dependencies (`npm install`)
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:5000`
- [ ] Create `src/lib/api.js` with data fetching functions
- [ ] Replace all dummy product arrays with API calls
- [ ] Replace hardcoded store name/logo with dynamic data
- [ ] Replace hardcoded colors with customization API
- [ ] Update hero section to use dynamic content
- [ ] Update about section to use dynamic content
- [ ] Update contact info to use dynamic data
- [ ] Add loading states for all async data
- [ ] Add error handling for failed API calls
- [ ] Test with real backend data
- [ ] Create preview screenshots
- [ ] Document any template-specific features

---

## PHASE 7: Merchant Dashboard - Website Editor

### Step 7.1: Create Website Customization Page
**File**: `Orbit-360/src/app/dashboard/website/page.tsx`

```tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function WebsiteCustomizationPage() {
  const [customization, setCustomization] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Fetch current customization
    fetch('/api/website/customization')
      .then(res => res.json())
      .then(data => setCustomization(data.customization))
  }, [])

  const handleSave = async (section, data) => {
    setSaving(true)
    try {
      await fetch('/api/website/customization', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [section]: data })
      })
      alert('Changes saved successfully!')
    } catch (error) {
      alert('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Website Customization</h2>
        <p className="text-muted-foreground">
          Customize your public website appearance and content
        </p>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>Logo, colors, and typography</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Logo URL</Label>
                <Input 
                  placeholder="https://example.com/logo.png"
                  defaultValue={customization?.logo}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <Input 
                    type="color"
                    defaultValue={customization?.brandColors?.primary}
                  />
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <Input 
                    type="color"
                    defaultValue={customization?.brandColors?.secondary}
                  />
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <Input 
                    type="color"
                    defaultValue={customization?.brandColors?.accent}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('branding', {})}>
                Save Branding
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Content</CardTitle>
              <CardDescription>Hero section, about, and contact info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Hero Title</Label>
                <Input 
                  placeholder="Welcome to our store"
                  defaultValue={customization?.heroSection?.title}
                />
              </div>
              
              <div>
                <Label>Hero Subtitle</Label>
                <Textarea 
                  placeholder="Discover amazing products..."
                  defaultValue={customization?.heroSection?.subtitle}
                />
              </div>

              <div>
                <Label>About Section</Label>
                <Textarea 
                  rows={6}
                  placeholder="Tell your story..."
                  defaultValue={customization?.aboutSection}
                />
              </div>

              <Button onClick={() => handleSave('content', {})}>
                Save Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>Header, footer, and page structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Header Style</Label>
                <select className="w-full border rounded p-2">
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              <Button onClick={() => handleSave('layout', {})}>
                Save Layout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Meta tags and search optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Meta Title</Label>
                <Input 
                  placeholder="Your Store Name - Best Products"
                  defaultValue={customization?.metaTitle}
                />
              </div>
              
              <div>
                <Label>Meta Description</Label>
                <Textarea 
                  placeholder="Shop the best products at great prices..."
                  defaultValue={customization?.metaDescription}
                />
              </div>

              <Button onClick={() => handleSave('seo', {})}>
                Save SEO Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

---

## PHASE 8: Real-Time Sync (WebSocket)

### Step 8.1: WebSocket Server
**File**: `backend/src/websocket/server.js`

```javascript
const WebSocket = require('ws');

class WebSocketService {
  constructor() {
    this.wss = null;
    this.connections = new Map(); // storeId -> Set of WebSocket connections
  }

  initialize(server) {
    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', (ws, req) => {
      const url = new URL(req.url, 'http://localhost');
      const storeId = url.searchParams.get('storeId');

      if (!storeId) {
        ws.close();
        return;
      }

      // Add connection to store's connection set
      if (!this.connections.has(storeId)) {
        this.connections.set(storeId, new Set());
      }
      this.connections.get(storeId).add(ws);

      console.log(`WebSocket connected for store: ${storeId}`);

      ws.on('close', () => {
        const storeConnections = this.connections.get(storeId);
        if (storeConnections) {
          storeConnections.delete(ws);
          if (storeConnections.size === 0) {
            this.connections.delete(storeId);
          }
        }
        console.log(`WebSocket disconnected for store: ${storeId}`);
      });
    });
  }

  // Broadcast to all connections for a specific store
  broadcast(storeId, eventType, data) {
    const storeConnections = this.connections.get(storeId);
    if (!storeConnections) return;

    const message = JSON.stringify({
      type: eventType,
      data,
      timestamp: new Date().toISOString()
    });

    storeConnections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });

    console.log(`Broadcast ${eventType} to ${storeConnections.size} clients for store ${storeId}`);
  }
}

module.exports = new WebSocketService();
```

### Step 8.2: Integrate WebSocket with Server
**File**: `backend/src/server.js`

```javascript
const http = require('http');
const websocketService = require('./websocket/server');

// ... existing express setup ...

const server = http.createServer(app);

// Initialize WebSocket
websocketService.initialize(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
});
```

### Step 8.3: Broadcast Updates
Update controllers to broadcast changes:

**File**: `backend/src/controllers/websiteCustomizationController.js`

```javascript
const websocketService = require('../websocket/server');

exports.updateCustomization = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const updateData = req.body;
    
    const customization = await prisma.websiteCustomization.upsert({
      where: { storeId },
      update: updateData,
      create: { storeId, ...updateData }
    });
    
    // Broadcast to all connected clients for this store
    websocketService.broadcast(storeId, 'CUSTOMIZATION_UPDATE', customization);
    
    res.json({ customization });
  } catch (error) {
    next(error);
  }
};
```

### Step 8.4: Client-Side WebSocket (Templates)
**File**: `templates/[template-name]/src/hooks/useWebSocket.js`

```javascript
import { useEffect, useState } from 'react';

export function useWebSocket(storeId) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:5000?storeId=${storeId}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message:', message);
      setData(message);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    return () => ws.close();
  }, [storeId]);

  return { data, connected };
}
```

**Usage in template**:
```jsx
import { useWebSocket } from '@/hooks/useWebSocket';

export default function StorePage({ storeId }) {
  const { data } = useWebSocket(storeId);

  useEffect(() => {
    if (data?.type === 'CUSTOMIZATION_UPDATE') {
      // Reload customization
      window.location.reload(); // Or update state
    }
  }, [data]);

  // ... rest of component
}
```

---

## PHASE 9: Testing & Validation

### Step 9.1: Create Test Checklist

**For Each Template**:
- [ ] Template displays with dummy data removed
- [ ] Products load from backend API
- [ ] Store info (name, logo) displays correctly
- [ ] Brand colors apply correctly
- [ ] Hero section shows custom content
- [ ] About section shows custom content
- [ ] Contact info displays correctly
- [ ] WebSocket connection establishes
- [ ] Real-time updates work (change color in dashboard, see it on website)
- [ ] Product additions appear immediately
- [ ] Mobile responsive
- [ ] Performance is acceptable (< 3s load time)

### Step 9.2: Integration Test Flow

1. **Admin activates merchant**:
   - Go to `http://localhost:3001/dashboard/merchants`
   - Click "Activate" on a merchant
   - Select category (e.g., "Electronics")
   - Select theme (e.g., "Tech Store Pro")
   - Assign subdomain (e.g., "techstore")
   - Click "Provision"

2. **Verify provisioning**:
   - Check database for `MerchantProvisioning` record
   - Check `DeploymentMetadata` created
   - Check email sent to merchant

3. **Merchant logs in**:
   - Go to dashboard URL from email
   - Complete onboarding wizard
   - Add products
   - Customize website (colors, content)

4. **Verify website**:
   - Visit `http://techstore.localhost:3000` (or configured domain)
   - Verify products display
   - Verify customization applied
   - Test real-time updates

---

## PHASE 10: Deployment & Documentation

### Step 10.1: Create Deployment Guide
**File**: `TEMPLATE_DEPLOYMENT.md`

Document:
- How to add new templates
- How to update existing templates
- Environment variables required
- Build process for each template
- Hosting requirements

### Step 10.2: Create Developer Handoff Document
**File**: `DEVELOPER_HANDOFF.md`

Include:
- Architecture overview
- Database schema
- API endpoints reference
- WebSocket events reference
- Common troubleshooting
- Future enhancements

---

## 📋 Implementation Checklist

### Week 1: Setup & Analysis
- [ ] Clone all 4 repositories
- [ ] Analyze each template's structure
- [ ] Create category mapping
- [ ] Document dummy data locations
- [ ] Update database schema
- [ ] Run migrations
- [ ] Seed themes database

### Week 2: Backend Development
- [ ] Create theme controller
- [ ] Create customization controller
- [ ] Create public API endpoints
- [ ] Add WebSocket server
- [ ] Test all endpoints
- [ ] Create API documentation

### Week 3: Admin Panel
- [ ] Build theme management page
- [ ] Add category tabs
- [ ] Update merchant activation flow
- [ ] Test theme selection
- [ ] Add preview functionality

### Week 4: Template Conversion (Part 1)
- [ ] Convert 2 templates (remove dummy data)
- [ ] Add API integration
- [ ] Add WebSocket support
- [ ] Test with real backend
- [ ] Fix any issues

### Week 5: Template Conversion (Part 2)
- [ ] Convert remaining 2 templates
- [ ] Add API integration
- [ ] Add WebSocket support
- [ ] Test with real backend
- [ ] Fix any issues

### Week 6: Merchant Dashboard
- [ ] Build website customization page
- [ ] Add branding controls
- [ ] Add content editor
- [ ] Add layout options
- [ ] Add SEO settings
- [ ] Test real-time sync

### Week 7: Integration Testing
- [ ] End-to-end testing
- [ ] Performance testing
- [ ] Security testing
- [ ] Cross-browser testing
- [ ] Mobile testing

### Week 8: Polish & Deploy
- [ ] Fix all bugs
- [ ] Optimize performance
- [ ] Create documentation
- [ ] Deploy to staging
- [ ] Final testing
- [ ] Deploy to production

---

## 🚀 Quick Start Commands

```bash
# 1. Setup
cd d:\orbit
mkdir templates
cd templates
git clone https://github.com/Piyush0000/orbit_front_others.git
git clone https://github.com/Piyush0000/orbit-cosmetics-upfront.git
git clone https://github.com/Piyush0000/orbit_front_all.git
git clone https://github.com/Piyush0000/orbit_upfront.git

# 2. Backend setup
cd ../backend
npm install ws  # WebSocket library
npx prisma migrate dev --name add_theme_categories
node seed-themes.js

# 3. Start all services
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Admin Panel
cd orbit_admin
npm run dev

# Terminal 3: Merchant Dashboard
cd Orbit-360
npm run dev

# Terminal 4: Template (example)
cd templates/orbit_front_all
npm install
npm run dev
```

---

## 📞 Support & Questions

If you encounter issues:
1. Check the relevant `.md` file in the documentation
2. Review the database schema in `backend/prisma/schema.prisma`
3. Check API endpoints in `backend/src/routes/`
4. Review WebSocket events in `backend/src/websocket/server.js`

---

**Document Version**: 1.0  
**Created**: 2026-02-06  
**Status**: Ready for Implementation  
**Estimated Time**: 8 weeks (1 developer full-time)
