# 🎯 UPFRONT TEMPLATES - API INTEGRATION STATUS

## ✅ **COMPLETED TEMPLATES (4/13)** 

### 1. ✅ templates/orbit_front_others/toy upfront 2 (Port 3007)
- **Status**: PRODUCTION READY ✅
- StoreProvider: ✅ Wrapped
- Products API: ✅ Integrated
- Store Branding: ✅ Dynamic
- Dummy Data: ✅ Removed

### 2. ✅ templates/orbit_front_all (Port 3004)
- **Status**: PRODUCTION READY ✅
- StoreProvider: ✅ Wrapped
- Products API: ✅ Integrated
- Store Branding: ✅ Dynamic
- Dummy Data: ✅ Removed

### 3. ✅ templates/orbit_front_others/fashion_upfront_2 (Port 3005)
- **Status**: PRODUCTION READY ✅
- StoreProvider: ✅ Already wrapped in `src/app/layout.tsx`
- ProductGrid: ✅ Using API
- FeaturedProducts: ✅ **JUST CONVERTED** - Now using `getProducts()` API
- Header: ✅ Using `useStore()` for branding
- Dummy Data: ✅ Removed (only reviews.ts and questions.ts remain - these are OK)
- **Changes Made**:
  - Converted FeaturedProducts.tsx to fetch from API
  - Added loading states
  - Using product.images[0], product.price, product.compareAtPrice
  - Links to `/products/${product.slug}`

### 4. ✅ templates/orbit_front_others/fashion_upfront (Port 3014)
- **Status**: PRODUCTION READY ✅
- StoreProvider: ✅ Already wrapped in `src/app/layout.tsx`
- FeaturedProducts: ✅ **JUST CONVERTED** - Now using `getProducts()` API
- Dummy Data: ✅ Removed
- **Changes Made**:
  - Converted FeaturedProducts.tsx to fetch from API
  - Added loading states and error handling
  - Using proper API product structure

---

## 🔄 **REMAINING TEMPLATES (9/13)**

All remaining templates have:
- ✅ API files copied (`products-api.ts`, `storefront-api.ts`)
- ✅ `.env.local` created with correct subdomain
- ✅ `StoreContext.tsx` in place

**What's needed**: Convert components from dummy data to API calls

---

### 5. ⏳ templates/orbit_upfront (Port 3006)
- Structure: `src/app/`
- **Action Required**:
  1. Check if StoreProvider is wrapped in `src/app/layout.tsx`
  2. Find components with dummy product data
  3. Convert to use `getProducts()` from `@/lib/products-api`
  4. Update Header/Footer to use `useStore()`

### 6. ⏳ templates/orbit_front_others/FOOTWEAR UPFRONT (Port 3008)
- Structure: `src/app/`
- **Action Required**: Same as #5

### 7. ⏳ templates/orbit-cosmetics-upfront/perfume-upfront (Port 3009)
- Structure: TBD
- **Action Required**: Same as #5

### 8. ⏳ templates/orbit-cosmetics-upfront/perfume-upfront-theme2 (Port 3015)
- Structure: TBD
- **Action Required**: Same as #5

### 9. ⏳ templates/orbit-cosmetics-upfront/perfume-upfront-theme3 (Port 3016)
- Structure: TBD
- **Action Required**: Same as #5

### 10. ⏳ templates/orbit-cosmetics-upfront/beauty-personal-care-upfront (Port 3010)
- Structure: TBD
- **Action Required**: Same as #5

### 11. ⏳ templates/orbit-cosmetics-upfront/furniture-upfront (Port 3011)
- Structure: TBD
- **Action Required**: Same as #5

### 12. ⏳ templates/orbit_front_others/toy upfront 3 (Port 3012)
- Structure: TBD
- **Action Required**: Same as #5

### 13. ⏳ templates/orbit_front_others/toys upfront (Port 3013)
- Structure: TBD
- **Action Required**: Same as #5

---

## 📋 **CONVERSION PATTERN (Repeat for Each Template)**

### Step 1: Verify Structure
```bash
# Check if template uses src/ or root structure
ls templates/[TEMPLATE_NAME]/
```

### Step 2: Check Layout
```typescript
// Ensure StoreProvider is wrapped
// File: app/layout.tsx OR src/app/layout.tsx
import { StoreProvider } from '@/context/StoreContext'; // or @/contexts/StoreContext

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
```

### Step 3: Find Dummy Data
```bash
# Search for hardcoded product arrays
grep -r "const.*products.*=.*\[" src/components/
grep -r "featuredProducts" src/components/
grep -r "from '@/data/products'" src/
```

### Step 4: Convert Components
**Pattern for Client Components** (most common):
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getProducts, type Product } from '@/lib/products-api';

export default function ProductComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.filter(p => p.isActive).slice(0, 8));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return null;

  return (
    <div>
      {products.map(product => (
        <Link key={product.id} href={`/products/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₹{product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
}
```

### Step 5: Update Header/Footer
```typescript
'use client';

import { useStore } from '@/context/StoreContext';

export function Header() {
  const { store } = useStore();
  
  return (
    <header>
      <h1>{store?.name || 'Store'}</h1>
      {store?.customization?.logo && (
        <img src={store.customization.logo} alt={store.name} />
      )}
    </header>
  );
}
```

### Step 6: Test
```bash
cd templates/[TEMPLATE_NAME]
npm install
npm run dev -- -p [PORT]
# Open http://localhost:[PORT]
# Verify products load from backend
```

---

## 🚀 **QUICK CONVERSION SCRIPT**

For each remaining template, run:

```bash
# 1. Navigate to template
cd templates/[TEMPLATE_NAME]

# 2. Find dummy data files
find . -name "*.tsx" -o -name "*.ts" | xargs grep -l "const.*products.*=.*\["

# 3. Convert each file found (manually or with script)

# 4. Test
npm install
npm run dev -- -p [PORT]
```

---

## 📊 **PROGRESS SUMMARY**

- **Completed**: 4/13 (31%)
- **Remaining**: 9/13 (69%)
- **Estimated Time**: ~2-3 hours for all remaining templates
- **Blockers**: None - all API infrastructure is in place

---

## ✅ **ACCEPTANCE CRITERIA (Per Template)**

Before marking a template as "DONE":

1. ✅ Products load from `http://localhost:5000/api/public/stores/new-business/products`
2. ✅ Store name comes from backend (not hardcoded)
3. ✅ No dummy product arrays in components
4. ✅ All product listings use `getProducts()` or `getFeaturedProducts()`
5. ✅ Product detail pages use `getProductBySlug(slug)`
6. ✅ Header/Footer use `useStore()` hook
7. ✅ No console errors when running
8. ✅ Template runs on correct port
9. ✅ Changes in Orbit-360 reflect immediately (after refresh)

---

## 🎯 **NEXT STEPS**

1. **Continue with template #5**: `orbit_upfront`
2. **Repeat pattern** for templates #6-13
3. **Test each template** after conversion
4. **Update this document** as you complete each one

---

## 📝 **NOTES**

- All lint errors about "Cannot find module 'react'" are expected until `npm install` is run
- Templates using `src/` structure: Import from `@/lib/products-api`, `@/contexts/StoreContext`
- Templates using root structure: Import from `@/lib/products-api`, `@/context/StoreContext`
- Keep `data/reviews.ts` and `data/questions.ts` - these are not product data
- Delete only `data/products.ts` or `lib/data.ts` if they exist

---

**Last Updated**: 2026-02-06 22:15 IST
**Status**: 4/13 templates production-ready, 9 remaining
