# Template API Integration Progress

## ✅ Fully Converted Templates (3/13)

### 1. templates/orbit_front_others/toy upfront 2 (Port 3007)
- ✅ StoreProvider wrapped in layout
- ✅ Products from API
- ✅ Store branding from API
- ✅ No dummy data
- **Status**: PRODUCTION READY

### 2. templates/orbit_front_all (Port 3004)
- ✅ StoreProvider wrapped in layout
- ✅ Products from API
- ✅ Store branding from API
- ✅ No dummy data
- **Status**: PRODUCTION READY

### 3. templates/orbit_front_others/fashion_upfront_2 (Port 3005)
- ✅ StoreProvider wrapped in layout (src/app/layout.tsx)
- ✅ ProductGrid using API
- ✅ FeaturedProducts converted to API
- ✅ Header using store data
- ✅ No dummy data
- **Status**: PRODUCTION READY

---

## 🔄 Templates To Convert (10/13)

### 4. templates/orbit_front_others/fashion_upfront (Port 3014)
- Structure: `app/` (root)
- ❌ Needs conversion
- **Next Steps**:
  1. Check if StoreProvider is wrapped
  2. Find components using dummy data
  3. Convert to API

### 5. templates/orbit_upfront (Port 3006)
- Structure: `src/app/`
- ❌ Needs conversion

### 6. templates/orbit_front_others/FOOTWEAR UPFRONT (Port 3008)
- Structure: `src/app/`
- ❌ Needs conversion

### 7. templates/orbit-cosmetics-upfront/perfume-upfront (Port 3009)
- Structure: TBD
- ❌ Needs conversion

### 8. templates/orbit-cosmetics-upfront/perfume-upfront-theme2 (Port 3015)
- Structure: TBD
- ❌ Needs conversion

### 9. templates/orbit-cosmetics-upfront/perfume-upfront-theme3 (Port 3016)
- Structure: TBD
- ❌ Needs conversion

### 10. templates/orbit-cosmetics-upfront/beauty-personal-care-upfront (Port 3010)
- Structure: TBD
- ❌ Needs conversion

### 11. templates/orbit-cosmetics-upfront/furniture-upfront (Port 3011)
- Structure: TBD
- ❌ Needs conversion

### 12. templates/orbit_front_others/toy upfront 3 (Port 3012)
- Structure: TBD
- ❌ Needs conversion

### 13. templates/orbit_front_others/toys upfront (Port 3013)
- Structure: TBD
- ❌ Needs conversion

---

## 📋 Conversion Checklist (Per Template)

For each template, complete these steps:

### 1. Verify API Files Exist
- [ ] `lib/products-api.ts` or `src/lib/products-api.ts`
- [ ] `lib/storefront-api.ts` or `src/lib/storefront-api.ts`
- [ ] `context/StoreContext.tsx` or `src/contexts/StoreContext.tsx`
- [ ] `.env.local` with correct subdomain

### 2. Wrap App with StoreProvider
- [ ] Edit `app/layout.tsx` or `src/app/layout.tsx`
- [ ] Import StoreProvider
- [ ] Wrap children with `<StoreProvider>`

### 3. Convert Product Listings
- [ ] Find all components displaying products
- [ ] Replace dummy imports with `getProducts()` from API
- [ ] Use `useEffect` + `useState` for client components
- [ ] Use `await getProducts()` for server components

### 4. Convert Product Detail Pages
- [ ] Update to use `getProductBySlug(slug)`
- [ ] Remove hardcoded product data

### 5. Update Header/Footer
- [ ] Use `useStore()` hook for store name/logo
- [ ] Remove hardcoded branding

### 6. Delete Dummy Data Files
- [ ] Remove `data/products.ts` or `src/data/products.ts`
- [ ] Remove `lib/data.ts` (if exists)
- [ ] Keep only `data/reviews.ts` and `data/questions.ts` (if needed)

### 7. Test
- [ ] Run `npm install`
- [ ] Run `npm run dev -- -p [PORT]`
- [ ] Verify products load from backend
- [ ] Verify store name/logo from backend
- [ ] Check console for errors

---

## 🎯 Current Focus

**Currently Converting**: fashion_upfront_2 ✅ DONE

**Next Up**: fashion_upfront (Port 3014)

---

## 📝 Notes

- Templates using `src/` structure need paths like `src/app/layout.tsx`, `src/contexts/StoreContext.tsx`
- Templates using root structure need paths like `app/layout.tsx`, `context/StoreContext.tsx`
- All API files are already copied to all templates
- All `.env.local` files are created
- Main work is converting components from dummy data to API calls

---

## 🚀 Final Goal

All 13 templates fully API-driven with:
- ✅ Real products from database
- ✅ Dynamic store branding
- ✅ Live updates from Orbit-360
- ✅ Zero hardcoded data
- ✅ Production-ready
