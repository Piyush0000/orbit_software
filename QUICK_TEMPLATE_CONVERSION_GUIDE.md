# 🚀 QUICK REFERENCE: Complete Remaining 8 Templates

## ⚡ SUPER FAST CHECKLIST (Per Template)

### 1️⃣ Find the Component (30 seconds)
```bash
cd templates/[TEMPLATE_NAME]
grep -r "featuredProducts.*=.*\[" src/ . 2>/dev/null | head -5
```

### 2️⃣ Copy-Paste This Code (2 minutes)

**File**: `src/components/FeaturedProducts.tsx` OR `components/FeaturedProducts.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, type Product } from '@/lib/products-api';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const featured = products.filter(p => p.isFeatured && p.isActive).slice(0, 3);
        setFeaturedProducts(featured.length > 0 ? featured : products.filter(p => p.isActive).slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p>Loading featured products...</p>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.images[0] || '/placeholder.jpg'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition" 
                />
              </div>
              <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-lg line-through text-gray-500">₹{product.compareAtPrice.toFixed(2)}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 3️⃣ Adapt Styling (1 minute)

Keep the original template's className and style attributes. Just replace:
- `product.image` → `product.images[0]`
- `product.price` (string) → `₹{product.price.toFixed(2)}`
- `product.originalPrice` → `product.compareAtPrice`
- `product.badge` → `product.isFeatured ? 'Featured' : null`

### 4️⃣ Test (1 minute)
```bash
npm run dev -- -p [PORT]
# Open http://localhost:[PORT]
```

---

## 📋 REMAINING TEMPLATES QUICK LIST

| # | Template | Port | Path Structure |
|---|----------|------|----------------|
| 6 | FOOTWEAR UPFRONT | 3008 | `src/` |
| 7 | perfume-upfront | 3009 | TBD |
| 8 | perfume-upfront-theme2 | 3015 | TBD |
| 9 | perfume-upfront-theme3 | 3016 | TBD |
| 10 | beauty-personal-care-upfront | 3010 | TBD |
| 11 | furniture-upfront | 3011 | TBD |
| 12 | toy upfront 3 | 3012 | TBD |
| 13 | toys upfront | 3013 | TBD |

---

## 🎯 FIELD MAPPING CHEAT SHEET

| Old Dummy Field | New API Field |
|----------------|---------------|
| `product.image` | `product.images[0]` |
| `product.price` (string like "₹4,149") | `₹{product.price.toFixed(2)}` (number) |
| `product.originalPrice` | `product.compareAtPrice` |
| `product.badge` | `product.isFeatured` (boolean) |
| `product.id` | `product.id` ✅ same |
| `product.name` | `product.name` ✅ same |

---

## ⚠️ COMMON MISTAKES TO AVOID

1. ❌ Don't forget to import `Link` from `next/link`
2. ❌ Don't use `product.image` - use `product.images[0]`
3. ❌ Don't format price as string - use `.toFixed(2)`
4. ❌ Don't check `product.badge` - check `product.isFeatured`
5. ❌ Don't link to `/products/${product.id}` - use `product.slug`

---

## ✅ VERIFICATION CHECKLIST

Before moving to next template:
- [ ] Products appear on the page
- [ ] No console errors
- [ ] Images load correctly
- [ ] Prices show with ₹ symbol
- [ ] Links work (click a product)
- [ ] Template runs on correct port

---

## 🎉 YOU'RE ALMOST DONE!

**5 down, 8 to go!** 

Each template takes ~5 minutes. You'll be done in under an hour! 🚀

---

**Pro Tip**: Keep this file open in a split screen while converting templates for quick reference.
