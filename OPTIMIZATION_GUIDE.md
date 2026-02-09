# Scalability & Optimization Roadmap (Orbit-360)

This guide summarizes current bottlenecks and a phased optimization plan to support 30+ live websites and 6,000+ daily users without API crashes or database bottlenecks. It is intentionally implementation-ready, but **does not apply changes yet**.

## 1) Codebase Analysis (Backend + Next.js)

### Backend (Express + Prisma) – Heavy/Hot Routes
High-frequency, data-heavy endpoints that will scale poorly without caching/indexing:

- **Website customization (dashboard + storefront)**
  - `GET /api/website` → `backend/src/controllers/websiteCustomizationController.js`
  - `PUT /api/website` → same controller, frequently called on every save
  - `GET /api/storefront/public/:subdomain/customization` → `backend/src/controllers/storefrontPublicController.js`
  - `GET /api/public/stores/:subdomain/customization` → `backend/src/controllers/publicController.js`

- **Product listings (dashboard + storefront)**
  - `GET /api/products` → `backend/src/controllers/productController.js` (store-wide product list)
  - `GET /api/storefront/public/:subdomain/products` → `backend/src/controllers/storefrontPublicController.js` (public store list, includes pagination + count)
  - `GET /api/public/stores/:subdomain/products` → `backend/src/controllers/publicController.js`
  - `GET /api/storefront/:subdomain/products` → `backend/src/controllers/storefrontController.js`

**Why these are heavy**
- Product endpoints fetch lists, with filters and pagination, and sometimes include `variants`.
- Customization endpoints are read-heavy and called frequently on page loads and editor saves.

### Frontend (Next.js Dashboard)
High traffic or frequently refreshing pages:

- **Website customization editor**
  - `Orbit-360/app/dashboard/website/page.tsx`
  - Uses `/api/website` to load + update settings (multiple fields).
- **Content Editor**
  - `Orbit-360/app/dashboard/content-editor/page.tsx`
  - Loads `/api/website` and saves large structured payloads.
- **Product list pages**
  - `Orbit-360/app/dashboard/products/page.tsx`
  - `Orbit-360/app/sales/products/page.tsx`
  - Both call `/api/products` and re-render frequently.

## 2) Optimization Strategy

### A) Redis Caching (read-heavy endpoints)
**Targets:**
- `GET /api/website`
- `GET /api/products`
- `GET /api/storefront/public/:subdomain/customization`
- `GET /api/storefront/public/:subdomain/products`
- `GET /api/public/stores/:subdomain/products`

**Cache keys**
- Customization: `store:customization:{storeId}` and `store:customization:{subdomain}`
- Products list: `store:products:{storeId}:v1:{category}:{search}:{limit}:{offset}`
- Invalidate on `PUT /api/website` and product create/update/delete.

**TTL guidance**
- Customization: 5–10 minutes (short TTL to allow fast editing changes)
- Products: 1–5 minutes (short TTL but still reduces load)

### B) DB Indexing (Prisma)
Add indexes for the fields used in `where` and `orderBy`. These are safe and deterministic for scaling.

**Primary candidates from current queries**
- `Store.subdomain` (already `@unique`)
- `Store.userId` (used to resolve store from user)
- `Product.storeId`
- `Product.isActive`
- `Product.createdAt`
- `Product.category`
- `Product.name` (for search)
- `WebsiteCustomization.storeId` (already `@unique`)

### C) Next.js ISR (Storefront Hub)
Convert public storefront pages to Incremental Static Regeneration (ISR) where possible. This reduces repeated calls for the same store.

**Targets (Hub)**
- `templates/orbit_storefront_hub/app/storefront/[subdomain]/[...path]/page.tsx`
- `templates/orbit_storefront_hub/app/_storefront/[subdomain]/[...path]/page.tsx`

**Strategy**
- Use `export const revalidate = 60` on storefront pages.
- For `fetch`, set `next: { revalidate: 60 }`.
- Keep personalization and cart client-side, and only statically render store + theme + base content.

### D) Rate Limiting
Protect public and dashboard routes without blocking healthy traffic.

**Recommended policy**
- Public storefront API: 60–120 req/min per IP
- Authenticated dashboard API: 300 req/min per user token/IP
- Burst protection: short-term 10–20 req/sec

**Express config snippet**
```js
// backend/src/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false
});

const dashboardLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { publicLimiter, dashboardLimiter };
```

**Usage**
```js
const { publicLimiter, dashboardLimiter } = require('./middleware/rateLimit');
app.use('/api/storefront/public', publicLimiter);
app.use('/api/products', dashboardLimiter);
app.use('/api/website', dashboardLimiter);
```

### E) Asset Pipeline (CDN)
Move large images to a CDN to reduce backend load and improve TTFB:
- **Cloudinary** or **S3 + CloudFront** for all uploaded assets
- Store only CDN URLs in `WebsiteCustomization` (hero images, banners)
- Add an upload service in backend and a front-end uploader

**Recommended path**
1. Create `POST /api/uploads` that returns `{ url }`.
2. Store CDN URL in customization fields (hero image, banners).
3. Use Next.js `Image` with `remotePatterns`.
4. Add purge/transform rules (resize, webp, avif).

### F) Debouncing (Content Editor)
The Content Editor currently sends full payloads. Add debounce to reduce API spikes:

**High-frequency fields in `Orbit-360/app/dashboard/content-editor/page.tsx`**
- Hero title/subtitle/buttonText/buttonLink/backgroundImage
- Features list edits
- CTA buttons edits
- Nav links edits
- Announcement bar text
- About section title/content/image
- Newsletter title/description/buttonText

Optional: Debounce saves on `Orbit-360/app/dashboard/website/page.tsx` as well, especially hero, typography, and SEO inputs.

## 3) Action Plan (Snippets + Implementation Notes)

### A) Prisma Indexes (schema changes)
**Add indexes to match hot queries.**

```prisma
model Store {
  id        String   @id @default(uuid())
  userId    String
  subdomain String   @unique
  customDomain String? @unique
  // ...

  @@index([userId])
}

model Product {
  id        String   @id @default(uuid())
  storeId   String
  isActive  Boolean @default(true)
  category  String?
  name      String
  createdAt DateTime @default(now())
  // ...

  @@index([storeId])
  @@index([storeId, isActive])
  @@index([storeId, category])
  @@index([storeId, createdAt])
  @@index([name])
}

model ProductVariant {
  id        String   @id @default(uuid())
  productId String
  // ...

  @@index([productId])
}
```

Notes:
- `@@index([storeId, isActive, createdAt])` is also valid if you want a single composite index for the common list query.
- Text search on `name` is better with DB full-text indexing later, but `@@index([name])` is a low-effort start.

### B) Redis Cache Middleware (Express)
**Use a middleware to wrap public GET endpoints.** This is safe and can be applied in `backend/src/server.js` or specific route files.

```js
// backend/src/middleware/cache.js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const cache = (keyBuilder, ttlSeconds = 60) => async (req, res, next) => {
  try {
    const key = keyBuilder(req);
    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      redis.set(key, JSON.stringify(body), 'EX', ttlSeconds);
      return originalJson(body);
    };
    next();
  } catch (err) {
    next();
  }
};

module.exports = { cache };
```

**Usage**
```js
const { cache } = require('../middleware/cache');

router.get(
  '/:subdomain/products',
  cache((req) => `store:products:${req.params.subdomain}:${req.query.category || 'all'}:${req.query.search || 'all'}:${req.query.limit || 50}:${req.query.offset || 0}`, 120),
  getStoreProducts
);

router.get(
  '/:subdomain/customization',
  cache((req) => `store:customization:${req.params.subdomain}`, 300),
  getStoreCustomization
);
```

### C) Debounce Utility (Frontend)
Use a stable hook-based debounce for saves in Content Editor.

```ts
// Orbit-360/lib/useDebouncedCallback.ts
import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delayMs: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delayMs);
    },
    [callback, delayMs]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounced;
}
```

**Apply to content editor**
- Call `debouncedSave(payload)` inside field update handlers.
- Keep a manual “Save” button for explicit commits.

### D) ISR Example (Hub Page)
```ts
// templates/orbit_storefront_hub/app/storefront/[subdomain]/[...path]/page.tsx
export const revalidate = 60;

async function getStoreData(domain: string) {
  const API_URL = process.env.NEXT_PUBLIC_ORBIT_API_URL || 'http://localhost:5000';
  const res = await fetch(`${API_URL}/api/storefront/resolve?domain=${domain}`, {
    next: { revalidate: 60 }
  });
  return res.ok ? res.json() : null;
}
```

## 4) Implementation Order (Recommended)
1. **DB indexing** (safe, low-risk, high impact)
2. **Redis caching** for customization + product lists
3. **Debounce editor saves** to reduce PUT bursts
4. **ISR** for storefront hub pages
5. **CDN migration** for assets

## 5) Risk Controls
- Cache invalidation for product changes and customization saves
- Rate limit high-traffic public endpoints
- Monitor query latency (Prisma logs + Postgres slow query logs)

---

If you want, I can proceed with step-by-step implementation (starting with schema indexes + Redis cache middleware), but per your request I have only created this plan document.
