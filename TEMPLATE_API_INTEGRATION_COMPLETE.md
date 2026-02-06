# ✅ TEMPLATE API INTEGRATION - IN PROGRESS

## 🎯 Status: API Files Copied to All 11 Templates!

All templates now have the necessary API integration files:
- ✅ `lib/storefront-api.ts` (or `src/lib/storefront-api.ts`)
- ✅ `lib/products-api.ts` (or `src/lib/products-api.ts`)
- ✅ `context/StoreContext.tsx` (or `src/contexts/StoreContext.tsx`)
- ✅ `.env.local` with API configuration

---

## 📋 Templates Updated (Files Copied)

| # | Template | API Files | .env.local | Structure |
|---|----------|-----------|------------|-----------|
| 1 | Fashion (Main) | ✅ | ✅ | lib/ |
| 2 | Fashion (Variant 2) | ✅ | ✅ | lib/ |
| 3 | Electronics | ✅ | ✅ | src/lib/ |
| 4 | Footwear | ✅ | ✅ | src/lib/ |
| 5 | Perfume (Theme 1) | ✅ | ✅ | lib/ |
| 6 | Perfume (Theme 2) | ✅ | ✅ | lib/ |
| 7 | Perfume (Theme 3) | ✅ | ✅ | lib/ |
| 8 | Beauty & Personal Care | ✅ | ✅ | lib/ |
| 9 | Furniture & Home | ✅ | ✅ | lib/ |
| 10 | Toys (Variant 2) | ✅ | ✅ | lib/ |
| 11 | Toys (Variant 3) | ✅ | ✅ | lib/ |

---

## 🔧 Next Steps for Each Template

For each template, you need to:

### **1. Update app/layout.tsx (or src/app/layout.tsx)**

Add the `StoreProvider` wrapper:

```typescript
'use client';

import { StoreProvider } from '@/context/StoreContext'; // or '@/contexts/StoreContext' for src/ structure

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

### **2. Update Product Pages/Components**

Replace dummy data imports with API calls:

**Before (Dummy Data):**
```typescript
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**After (Real API):**
```typescript
import { getProducts } from '@/lib/products-api';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### **3. Update Header/Footer Components**

Use the store context for branding:

**Before (Static):**
```typescript
export function Header() {
  return (
    <header>
      <h1>My Store</h1>
    </header>
  );
}
```

**After (Dynamic):**
```typescript
'use client';

import { useStore } from '@/context/StoreContext';

export function Header() {
  const { store, loading } = useStore();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <header>
      <h1>{store?.name || 'My Store'}</h1>
    </header>
  );
}
```

### **4. Delete Dummy Data Files**

Remove these files if they exist:
- `data/products.ts` or `src/data/products.ts`
- `lib/data.ts` or `src/lib/data.ts`
- Any other static product arrays

---

## ⚡ Quick Status Check

**Run this to see which templates still have dummy data:**

```powershell
cd D:\orbit\templates
Get-ChildItem -Recurse -Include "products.ts","data.ts" | Where-Object {$_.FullName -like "*\data\*"} | Select-Object FullName
```

---

## 🚀 Testing Each Template

After updating a template:

```bash
cd templates/[template-path]
npm run dev -- -p [PORT]
```

**Check:**
1. ✅ Products load from database (not hardcoded)
2. ✅ Store name shows from database
3. ✅ Changes in Orbit-360 appear immediately
4. ✅ No console errors

---

## 📊 Integration Progress

- [x] Copy API files to all templates
- [x] Create .env.local for all templates
- [ ] Update Fashion (Main) components
- [ ] Update Fashion (Variant 2) components
- [ ] Update Electronics components
- [ ] Update Footwear components
- [ ] Update Perfume (Theme 1) components
- [ ] Update Perfume (Theme 2) components
- [ ] Update Perfume (Theme 3) components
- [ ] Update Beauty components
- [ ] Update Furniture components
- [ ] Update Toys (Variant 2) components
- [ ] Update Toys (Variant 3) components

**Status:** 2/13 steps complete (15%)

---

## 💡 Automated Approach (Recommended)

I can create scripts to automatically:
1. Update layout.tsx files
2. Replace dummy data imports
3. Update Header/Footer components
4. Delete dummy data files

**This would make all templates production-ready much faster!**

---

## ⚠️ Important Notes

1. **Each template has different structure:**
   - Some use `lib/`, others use `src/lib/`
   - Component paths vary
   - Need to adapt for each template

2. **Test after each change:**
   - Run template locally
   - Check database connection
   - Verify products load

3. **Keep toy upfront 2 as reference:**
   - Already fully integrated
   - Copy its patterns

---

## 🎯 Current State

**Working Templates (2/13):**
- ✅ Toys (toy upfront 2) - Port 3004
- ✅ Food & Beverage - Port 3007

**API Files Ready (11/13):**
- ✅ All 11 remaining templates have API files
- ⚠️ But components still use dummy data
- ⚠️ Need to update components to use API

**What's Left:**
- Update layout.tsx (11 templates)
- Update product components (11 templates)
- Update header/footer (11 templates)
- Delete dummy data (11 templates)
- Test (11 templates)

---

## 🚀 Next Actions

**Option A: Manual Update (Detailed)**
- I provide step-by-step guide for each template
- You can see exactly what changes
- Takes longer but educational

**Option B: Automated Scripts (Fast)**
- I create scripts to update all templates
- Runs automatically
- Faster but less visibility

**Option C: Hybrid (Recommended)**
- I update 1-2 templates manually as examples
- Then create scripts for the rest
- Best of both worlds

**What do you prefer?**

---

**✅ Phase 1 Complete: API Files Copied!**  
**⏳ Phase 2 Pending: Component Integration**

Ready to proceed! 🚀
