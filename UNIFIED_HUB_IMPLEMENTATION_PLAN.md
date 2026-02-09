# Unified Storefront Hub - Complete Implementation Plan

## 🎯 Objective
Create a single Next.js application (Storefront Hub) that dynamically serves ALL merchant storefronts by:
1. Detecting the subdomain (e.g., `toys.localhost:3000`)
2. Fetching merchant data from the backend API
3. Loading and rendering the correct visual template based on the merchant's assigned theme
4. Injecting merchant-specific data (products, branding, content) into the template

## 📋 Current Status

### ✅ What's Working:
- Backend API correctly resolves stores by subdomain (`/api/storefront/resolve?domain=toys.orbit360.com`)
- Middleware correctly extracts subdomains and rewrites URLs
- Store resolution page displays merchant info (name, subdomain, theme)

### ❌ What's Missing:
- Theme templates are NOT being rendered (only showing diagnostic page)
- No dynamic import system for loading theme components
- Templates in `d:\orbit\templates\orbit_front_others\` are not connected to the Hub

## 🏗️ Implementation Strategy

### Phase 1: Create Symlink-Based Theme System
Instead of copying files, create symbolic links from the Hub to the original template folders.

**Why?** This allows the Hub to directly import components from templates without duplicating code.

### Phase 2: Build Dynamic Theme Loader
Create a system that:
1. Maps theme slugs (from database) to template folders
2. Dynamically imports the correct template's page component
3. Wraps it with necessary providers and passes merchant data

### Phase 3: Update Storefront Pages
Replace the diagnostic pages with actual theme rendering logic.

## 📝 Detailed Implementation Steps

### Step 1: Create Theme Mapping Configuration

**File**: `d:\orbit\templates\orbit_storefront_hub\config\theme-map.json`

```json
{
  "toys": {
    "name": "Toys Store",
    "templatePath": "../orbit_front_others/toy upfront 2",
    "entryComponent": "app/page.tsx",
    "layoutComponent": "app/layout.tsx"
  },
  "electronics-upfront": {
    "name": "Electronics Store", 
    "templatePath": "../orbit_front_others/toy upfront 2",
    "entryComponent": "app/page.tsx",
    "layoutComponent": "app/layout.tsx"
  },
  "fashion-upfront": {
    "name": "Fashion Store",
    "templatePath": "../orbit_front_others/fashion_upfront",
    "entryComponent": "app/page.tsx",
    "layoutComponent": "app/layout.tsx"
  }
}
```

### Step 2: Create Theme Loader Utility

**File**: `d:\orbit\templates\orbit_storefront_hub\lib\theme-loader.ts`

```typescript
import themeMap from '@/config/theme-map.json';
import path from 'path';

export interface ThemeMetadata {
  name: string;
  templatePath: string;
  entryComponent: string;
  layoutComponent: string;
}

export function getThemeMetadata(themeSlug: string): ThemeMetadata | null {
  return themeMap[themeSlug as keyof typeof themeMap] || null;
}

export function getThemeComponentPath(themeSlug: string): string | null {
  const metadata = getThemeMetadata(themeSlug);
  if (!metadata) return null;
  
  return path.join(metadata.templatePath, metadata.entryComponent);
}
```

### Step 3: Create Merchant Data Provider

**File**: `d:\orbit\templates\orbit_storefront_hub\lib\merchant-api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_ORBIT_API_URL || 'http://localhost:5000';

export interface MerchantStore {
  id: string;
  name: string;
  subdomain: string;
  theme: string;
  customization: any;
  category: string;
}

export async function fetchMerchantBySubdomain(subdomain: string): Promise<MerchantStore | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/storefront/resolve?domain=${subdomain}.orbit360.com`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.success ? data.store : null;
  } catch (error) {
    console.error('Failed to fetch merchant:', error);
    return null;
  }
}

export async function fetchMerchantProducts(subdomain: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/public/stores/${subdomain}/products`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
```

### Step 4: Update Storefront Page to Render Themes

**File**: `d:\orbit\templates\orbit_storefront_hub\app\storefront\[subdomain]\page.tsx`

```typescript
import { notFound } from 'next/navigation';
import { fetchMerchantBySubdomain } from '@/lib/merchant-api';
import ThemeRenderer from '@/components/ThemeRenderer';

export default async function StorefrontPage({ 
  params 
}: { 
  params: { subdomain: string } 
}) {
  const { subdomain } = params;
  const merchant = await fetchMerchantBySubdomain(subdomain);

  if (!merchant) {
    return notFound();
  }

  return <ThemeRenderer merchant={merchant} />;
}
```

### Step 5: Create Theme Renderer Component

**File**: `d:\orbit\templates\orbit_storefront_hub\components\ThemeRenderer.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { MerchantStore } from '@/lib/merchant-api';

// Import all possible theme components
import ToysTheme from '@/app/storefront/themes/toys/page';
import FashionTheme from '@/app/storefront/themes/fashion/page';

const THEME_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'toys': ToysTheme,
  'electronics-upfront': ToysTheme, // Fallback to toys for now
  'fashion-upfront': FashionTheme,
};

export default function ThemeRenderer({ merchant }: { merchant: MerchantStore }) {
  const ThemeComponent = THEME_COMPONENTS[merchant.theme] || THEME_COMPONENTS['toys'];
  
  return (
    <div data-merchant-id={merchant.id} data-theme={merchant.theme}>
      <ThemeComponent merchant={merchant} />
    </div>
  );
}
```

### Step 6: Create Wrapper Theme Components

**File**: `d:\orbit\templates\orbit_storefront_hub\app\storefront\themes\toys\page.tsx`

```typescript
'use client';

import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';

// These will be imported from the actual template via Next.js module resolution
import Hero from '@/templates/toys/components/home/Hero';
import CategoryGrid from '@/templates/toys/components/home/CategoryGrid';
import TrendingToys from '@/templates/toys/components/home/TrendingToys';
import GiftSection from '@/templates/toys/components/home/GiftSection';
import TrustedBadges from '@/templates/toys/components/home/TrustedBadges';
import Newsletter from '@/templates/toys/components/home/Newsletter';
import Header from '@/templates/toys/components/layout/Header';
import Footer from '@/templates/toys/components/layout/Footer';
import { WishlistProvider } from '@/templates/toys/context/WishlistContext';
import { CartProvider } from '@/templates/toys/context/CartContext';
import { StoreProvider } from '@/templates/toys/context/StoreContext';

export default function ToysTheme({ merchant }: { merchant: MerchantStore }) {
  // Inject merchant data into environment for template to consume
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <StoreProvider>
      <WishlistProvider>
        <CartProvider>
          <Header />
          <main className="flex-grow">
            <div className="flex flex-col gap-0">
              <div className="bg-white"><Hero /></div>
              <div className="bg-orange-50/50"><TrustedBadges /></div>
              <div className="bg-white"><CategoryGrid /></div>
              <div className="bg-blue-50/30"><TrendingToys /></div>
              <div className="bg-pink-50/30"><GiftSection /></div>
              <Newsletter />
            </div>
          </main>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </StoreProvider>
  );
}
```

### Step 7: Configure TypeScript Path Aliases

**File**: `d:\orbit\templates\orbit_storefront_hub\tsconfig.json`

Add path mappings to resolve template imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/templates/toys/*": ["../orbit_front_others/toy upfront 2/*"],
      "@/templates/fashion/*": ["../orbit_front_others/fashion_upfront/*"]
    }
  }
}
```

### Step 8: Update Template's Storefront API

**File**: `d:\orbit\templates\orbit_front_others\toy upfront 2\lib\storefront-api.ts`

Modify to read from injected merchant data:

```typescript
export async function getStoreData(): Promise<StoreData | null> {
  // First check if running in Hub (merchant data injected)
  if (typeof window !== 'undefined' && (window as any).__MERCHANT_DATA__) {
    return (window as any).__MERCHANT_DATA__;
  }
  
  // Fallback to API call (for standalone mode)
  try {
    const response = await fetch(
      `${API_URL}/api/public/stores/${STORE_SUBDOMAIN}`,
      { cache: 'no-store' }
    );
    // ... rest of existing code
  }
}
```

### Step 9: Copy Required CSS/Assets

**Commands to run:**

```powershell
# Copy globals.css from toys template
Copy-Item "d:\orbit\templates\orbit_front_others\toy upfront 2\app\globals.css" "d:\orbit\templates\orbit_storefront_hub\app\themes-globals.css"

# Copy public assets
Copy-Item "d:\orbit\templates\orbit_front_others\toy upfront 2\public\*" "d:\orbit\templates\orbit_storefront_hub\public\" -Recurse
```

### Step 10: Install Dependencies

```powershell
cd d:\orbit\templates\orbit_storefront_hub
npm install
```

### Step 11: Restart Hub

```powershell
# Stop current dev server (Ctrl+C)
# Then restart:
npm run dev
```

## 🧪 Testing Checklist

After implementation:

1. ✅ Visit `http://localhost:3000` - Should show Hub landing page
2. ✅ Visit `http://toys.localhost:3000` - Should render full toys template
3. ✅ Check merchant name appears correctly in header
4. ✅ Verify products load from API
5. ✅ Test cart/wishlist functionality
6. ✅ Check branding colors are applied

## 🚨 Alternative Simpler Approach

If the above is too complex, use this **IMMEDIATE WORKING SOLUTION**:

### Quick Fix: Direct Template Proxy

Instead of importing components, create an iframe-based proxy:

**File**: `d:\orbit\templates\orbit_storefront_hub\app\storefront\[subdomain]\page.tsx`

```typescript
import { fetchMerchantBySubdomain } from '@/lib/merchant-api';
import { notFound } from 'next/navigation';

export default async function StorefrontPage({ params }: { params: { subdomain: string } }) {
  const merchant = await fetchMerchantBySubdomain(params.subdomain);
  if (!merchant) return notFound();

  // Map theme to port (from REAL_TEMPLATES_MAP.json)
  const THEME_PORTS: Record<string, number> = {
    'toys': 3004,
    'electronics-upfront': 3004,
    'fashion-upfront': 3005,
  };

  const port = THEME_PORTS[merchant.theme] || 3004;

  return (
    <div className="w-full h-screen">
      <iframe 
        src={`http://localhost:${port}?merchant=${merchant.subdomain}`}
        className="w-full h-full border-0"
        title={merchant.name}
      />
    </div>
  );
}
```

Then start the individual templates on their ports as before.

## 🎯 Recommended Path Forward

**Option A (Recommended)**: Implement Steps 1-11 for true unified hub
**Option B (Quick Win)**: Use iframe proxy approach and start templates individually

Which approach would you like me to implement?
