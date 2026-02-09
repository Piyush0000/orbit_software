# 🚀 EXECUTE: Unified Storefront Hub - Option A Implementation

## CONTEXT
You are implementing a **Unified Storefront Hub** for the Orbit360 multi-tenant e-commerce platform. The Hub is a single Next.js application that dynamically serves ALL merchant storefronts by:
1. Detecting subdomains (e.g., `toys.localhost:3000`)
2. Fetching merchant data from the backend API
3. Dynamically loading and rendering the correct visual template
4. Injecting merchant-specific data into templates

## CURRENT STATE

### ✅ What's Working:
- **Backend API**: `http://localhost:5000/api/storefront/resolve?domain=toys.orbit360.com` returns merchant data
- **Middleware**: Correctly extracts subdomains and rewrites URLs to `/storefront/[subdomain]`
- **Store Resolution**: Diagnostic page shows merchant info (id, subdomain, theme)
- **Database**: Merchant "orbit-testing" exists with subdomain "toys" and theme "electronics-upfront"

### ❌ What's Broken:
- Storefront pages show diagnostic info instead of actual merchant website
- No dynamic theme rendering system exists
- Templates in `d:\orbit\templates\orbit_front_others\` are not connected to Hub

### 📁 Key File Locations:
- **Hub**: `d:\orbit\templates\orbit_storefront_hub\`
- **Toys Template**: `d:\orbit\templates\orbit_front_others\toy upfront 2\`
- **Fashion Template**: `d:\orbit\templates\orbit_front_others\fashion_upfront\`
- **Backend**: `d:\orbit\backend\`

## YOUR MISSION

Implement a **complete, working Unified Storefront Hub** that renders merchant websites dynamically. When a user visits `http://toys.localhost:3000`, they should see the FULL toys template with merchant-specific branding and products.

## IMPLEMENTATION STEPS

### STEP 1: Configure TypeScript Path Aliases

**File**: `d:\orbit\templates\orbit_storefront_hub\tsconfig.json`

**Action**: Update the `compilerOptions.paths` section to include:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@/templates/toys/*": ["../orbit_front_others/toy upfront 2/*"],
      "@/templates/fashion/*": ["../orbit_front_others/fashion_upfront/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### STEP 2: Update Next.js Config for External Imports

**File**: `d:\orbit\templates\orbit_storefront_hub\next.config.ts`

**Action**: Create or update to allow imports from parent directories:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true, // Allow imports from outside the project directory
  },
  transpilePackages: [], // Add if needed for specific packages
};

export default nextConfig;
```

### STEP 3: Create Merchant API Client

**File**: `d:\orbit\templates\orbit_storefront_hub\lib\merchant-api.ts`

**Action**: Create this file with:

```typescript
const API_URL = process.env.NEXT_PUBLIC_ORBIT_API_URL || 'http://localhost:5000';

export interface MerchantStore {
  id: string;
  name: string;
  subdomain: string;
  theme: string;
  customization: {
    logo?: string | null;
    brandColors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
    heroSection?: {
      title?: string;
      subtitle?: string;
    };
    contactInfo?: {
      email?: string;
      phone?: string;
    };
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  category: string;
}

export async function fetchMerchantBySubdomain(subdomain: string): Promise<MerchantStore | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/storefront/resolve?domain=${subdomain}.orbit360.com`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      console.error('Failed to fetch merchant:', res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data.success ? data.store : null;
  } catch (error) {
    console.error('Error fetching merchant:', error);
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
    console.error('Error fetching products:', error);
    return [];
  }
}
```

### STEP 4: Create Theme Renderer Component

**File**: `d:\orbit\templates\orbit_storefront_hub\components\ThemeRenderer.tsx`

**Action**: Create this CLIENT component:

```typescript
'use client';

import { useEffect } from 'react';
import { MerchantStore } from '@/lib/merchant-api';
import dynamic from 'next/dynamic';

// Dynamically import theme components
const ToysTheme = dynamic(() => import('@/components/themes/ToysTheme'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading store...</div>
});

const THEME_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'toys': ToysTheme,
  'electronics-upfront': ToysTheme, // Fallback to toys
  'fashion-upfront': ToysTheme, // TODO: Add fashion theme
};

export default function ThemeRenderer({ merchant }: { merchant: MerchantStore }) {
  const ThemeComponent = THEME_COMPONENTS[merchant.theme] || ToysTheme;
  
  // Inject merchant data globally for template components to access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__ORBIT_MERCHANT__ = merchant;
      (window as any).__ORBIT_SUBDOMAIN__ = merchant.subdomain;
    }
  }, [merchant]);
  
  return (
    <div data-merchant-id={merchant.id} data-theme={merchant.theme}>
      <ThemeComponent merchant={merchant} />
    </div>
  );
}
```

### STEP 5: Create Toys Theme Wrapper

**File**: `d:\orbit\templates\orbit_storefront_hub\components\themes\ToysTheme.tsx`

**Action**: Create this wrapper that imports from the actual template:

```typescript
'use client';

import { MerchantStore } from '@/lib/merchant-api';
import { Nunito, Fredoka } from 'next/font/google';

// Import components from the actual toys template
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

// Import template styles
import '@/templates/toys/app/globals.css';

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export default function ToysTheme({ merchant }: { merchant: MerchantStore }) {
  return (
    <div className={`${nunito.variable} ${fredoka.variable} antialiased min-h-screen flex flex-col`}>
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
    </div>
  );
}
```

### STEP 6: Update Storefront Page

**File**: `d:\orbit\templates\orbit_storefront_hub\app\storefront\[subdomain]\page.tsx`

**Action**: Replace entire contents with:

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

### STEP 7: Update Template's Storefront API

**File**: `d:\orbit\templates\orbit_front_others\toy upfront 2\lib\storefront-api.ts`

**Action**: Modify the `getStoreData` function to check for injected data first:

Find this function (around line 81) and replace it with:

```typescript
export async function getStoreData(): Promise<StoreData | null> {
  // PRIORITY 1: Check if running in Unified Hub (merchant data injected)
  if (typeof window !== 'undefined' && (window as any).__ORBIT_MERCHANT__) {
    console.log('📦 Using injected merchant data from Hub');
    return (window as any).__ORBIT_MERCHANT__;
  }
  
  // PRIORITY 2: Check for environment variable override
  const runtimeSubdomain = typeof window !== 'undefined' 
    ? (window as any).__ORBIT_SUBDOMAIN__ 
    : null;
  
  const subdomain = runtimeSubdomain || STORE_SUBDOMAIN;
  
  // PRIORITY 3: Fetch from API (standalone mode or server-side)
  try {
    const response = await fetch(
      `${API_URL}/api/public/stores/${subdomain}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch store data:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.store || null;
  } catch (error) {
    console.error('Error fetching store data:', error);
    return null;
  }
}
```

### STEP 8: Install Missing Dependencies

**Action**: Run these commands:

```powershell
cd d:\orbit\templates\orbit_storefront_hub
npm install framer-motion canvas-confetti @types/canvas-confetti
```

### STEP 9: Copy Template Assets

**Action**: Run these commands to copy public assets:

```powershell
# Copy public folder from toys template
powershell -Command "Copy-Item -Path 'd:\orbit\templates\orbit_front_others\toy upfront 2\public\*' -Destination 'd:\orbit\templates\orbit_storefront_hub\public\' -Recurse -Force"
```

### STEP 10: Restart the Hub

**Action**: 
1. Stop the current dev server (Ctrl+C in the terminal running the hub)
2. Restart it:

```powershell
cd d:\orbit\templates\orbit_storefront_hub
npm run dev
```

### STEP 11: Test the Implementation

**Action**: Open your browser and test:

1. **Hub Landing**: `http://localhost:3000` → Should show "Orbit Storefront Hub" page
2. **Toys Store**: `http://toys.localhost:3000` → Should render FULL toys template
3. **Check Console**: Look for "📦 Using injected merchant data from Hub"
4. **Verify Data**: Merchant name should appear in header, products should load

## 🔧 TROUBLESHOOTING

### Issue: "Cannot find module '@/templates/toys/...'"

**Solution**: 
1. Verify `tsconfig.json` has correct paths
2. Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Delete `.next` folder and restart dev server

### Issue: "Module not found: Can't resolve '@/templates/toys/app/globals.css'"

**Solution**: 
1. Copy the CSS file:
```powershell
Copy-Item "d:\orbit\templates\orbit_front_others\toy upfront 2\app\globals.css" "d:\orbit\templates\orbit_storefront_hub\styles\toys-theme.css"
```
2. Update import in `ToysTheme.tsx` to: `import '@/styles/toys-theme.css';`

### Issue: Components render but styling is broken

**Solution**:
1. Ensure Tailwind CSS is configured in the Hub
2. Copy `tailwind.config.ts` from toys template to hub
3. Merge configurations if needed

### Issue: "window is not defined" errors

**Solution**: 
- Ensure `ThemeRenderer` and `ToysTheme` are marked as `'use client'`
- Check that `useEffect` is used for window access

## ✅ SUCCESS CRITERIA

You will know the implementation is successful when:

1. ✅ Visiting `http://toys.localhost:3000` shows the FULL toys website
2. ✅ Merchant name "orbit-testing" appears in the header
3. ✅ Products load from the API (even if empty)
4. ✅ Cart and wishlist buttons work
5. ✅ Styling matches the original toys template
6. ✅ No console errors related to module resolution
7. ✅ Browser console shows "📦 Using injected merchant data from Hub"

## 🎯 FINAL NOTES

- **This approach uses TypeScript path aliases** to import directly from template folders
- **No file copying required** - templates stay in their original locations
- **Templates remain standalone** - they can still run independently on their own ports
- **Scalable** - Easy to add new themes by adding path aliases and theme components

## 🚀 EXECUTE NOW

Follow steps 1-11 in order. Do not skip steps. Test after step 11.

If you encounter errors, refer to the troubleshooting section.

Good luck! 🎉
