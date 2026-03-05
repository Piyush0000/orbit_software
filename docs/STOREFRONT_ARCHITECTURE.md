# 🚀 The Orbit 360 Storefront Flow (For Developers)

Orbit 360 is a multi-tenant SaaS platform where merchants can manage and customize their storefronts. The rendering of these storefronts is **100% dynamic and API-driven**.

We break the architecture down into 3 main areas: **The Backend**, **The Admin Editor**, and **The Live Storefront (Upfront)**.

---

### 1. The Database & Backend (The Source of Truth)
- **Database (`backend/prisma/schema.prisma`):** We use **PostgreSQL + Prisma**. Every merchant store has an entry in the `Store` table, which is hooked to a `WebsiteCustomization` table.
- **Data Structure:** The `WebsiteCustomization` table stores huge JSON objects. Instead of hardcoding HTML pages, we store things like `brandColors: { primary: "#000" }`, `heroSection: { title: "Hello", image: "..." }`, and `socialLinks`.
- **The API Endpoint (`backend/src/controllers/storefrontPublicController.js`):** The Express backend exposes a public endpoint (`/api/storefront/public/:subdomain/customization`). Any storefront frontend can hit this API, provide a store's subdomain, and get back that specific store's JSON configuration.

### 2. The Storefront / Upfront (The Live Website)
The storefronts (e.g., `all_upfront/electronics_1`) are essentially "dumb" templates built in Next.js. They don't have hardcoded content.
- **Initial Load:** When a customer visits `mystore.orbit360.com`, the Next.js app wakes up.
- **Fetching Data (`all_upfront/electronics_1/src/lib/api.ts`):** The `StorefrontAPI` looks at the URL (extracts `mystore`), reaches out to the Express Backend, and requests the JSON for `mystore`.
- **Global Context (`all_upfront/electronics_1/src/contexts/store-context.tsx`):** The JSON is injected into a global React Provider (`StoreContext`).
- **Dynamic Rendering:** Every React component (e.g., `HeroSection.tsx`, `Footer.tsx`) in the template just reads from this context.
  - For example, the Hero component says: `<h1 style={{ color: context.brandColors.primary }}>{context.heroSection.title}</h1>`.
  - If a merchant didn't configure a footer, the footer component sees it's empty in the JSON and hides itself.

### 3. The Admin Panel Editor (The Magic Live Preview)
When a merchant wants to edit their site, they go to the Admin Dashboard (Orbit 360) and open the **Storefront Editor** (`Orbit-360/app/storefront/editor/page.tsx`).
- **The Iframe:** The editor (`page.tsx`) launches an `<iframe id="preview-iframe">` holding their actual live storefront URL.
- **Local State Updates:** As the merchant types a new headline or picks a new color in the left-hand React sidebar, it updates a local `customization` React state inside the Admin Dashboard.
- **The `postMessage` Handshake (No Reloads!):** We don't want the user to click "Refresh" to see their edits. Every time the React state changes, the Admin Dashboard shoots a secure cross-origin message directly into the Iframe:
  ```javascript
  iframe.contentWindow.postMessage({ type: 'ORBIT_CUSTOMIZATION_UPDATE', data: newJson }, '*');
  ```
- **The Iframe Hears It (`all_upfront/electronics_1/src/lib/api.ts`):** The Upfront store inside the iframe has a specific Event Listener waiting for `ORBIT_CUSTOMIZATION_UPDATE`. When it hears it, it **overrides its own global `StoreContext`** with the newest JSON, forcing Next.js to re-render the screen instantly.

### 4. Publishing the Changes
When the merchant is happy with the live preview and clicks **Publish**:
1. The Admin Dashboard (`Orbit-360/app/storefront/editor/page.tsx`) sends a `PUT` request to the Backend API with the final custom JSON.
2. The Backend Controller (`backend/src/controllers/websiteCustomizationController.js`) `upsert`s the JSON into the PostgreSQL `WebsiteCustomization` table.
3. The server invalidates the Redis Cache so stale versions are destroyed.
4. From that second forward, any real-world person visiting the live site will pull down the brand new JSON from the Backend endpoint.

---

### 💡 Summary TL;DR
1. **Admin** clicks a button (`Orbit-360`).
2. **Admin UI** sends a `postMessage` to the **Iframe** for a live 0-latency preview.
3. **Admin** hits "Publish" (`Orbit-360/app/storefront/editor/page.tsx`).
4. **Backend** saves the JSON to Postgres (`backend/src/controllers/websiteCustomizationController.js`).
5. Real customers visit **Upfront**, the **Upfront** asks the **Backend** for the JSON payload, and React maps that JSON into HTML instantly (`all_upfront/.../src/contexts/store-context.tsx`).

---

### 🛠️ What Developers Building New Templates Need to Do

If you are developing a new template from scratch (e.g., `all_upfront/clothing_xyz`), you **cannot** hardcode text, images, or colors. You must connect your components to the Orbit global database so that the merchant can edit their Storefront dynamically.

Since your new template folder is completely isolated, you must create 2 core files first before modifying your UI components. Follow these exact steps:

#### Step 1: Create the API Fetcher (`src/lib/api.ts`)
This file is responsible for fetching the live data from the Orbit Backend, AND it listens for live-preview updates from the Admin dashboard while the merchant is editing.

Create the file `src/lib/api.ts` and paste this exact code:

```typescript
import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/storefront/public';

class StorefrontAPI {
  // Automatically extracts the subdomain from the URL
  static get subdomain(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      if (hostname.includes('localhost') && parts.length >= 2 && parts[0] !== 'localhost') {
        return parts[0];
      } else if (parts.length > 2) {
        return parts[0];
      }
    }
    return process.env.NEXT_PUBLIC_SUBDOMAIN || 'preview';
  }

  static async getStoreCustomization() {
    try {
      const res = await fetch(`${API_BASE_URL}/${this.subdomain}/customization`);
      const data = await res.json();
      return data.success ? data.data : null;
    } catch {
      return null;
    }
  }
}

// React Hook used to pull and auto-update data
export function useStore() {
  const [customization, setCustomization] = useState<any>(null);

  // 1. Fetch initial live data on load
  useEffect(() => {
    StorefrontAPI.getStoreCustomization().then(data => data && setCustomization(data));
  }, []);

  // 2. Listen for 'postMessage' from the Admin Dashboard for instant live-preview
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ORBIT_CUSTOMIZATION_UPDATE') {
        setCustomization((prev: any) => ({ ...prev, ...e.data.data }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return { customization };
}
```

#### Step 2: Create the Global Context (`src/contexts/store-context.tsx`)
This file ensures that every component in your tree has access to the JSON without needing to prop-drill.

Create the file `src/contexts/store-context.tsx` and paste this code:

```tsx
"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useStore } from '../lib/api';

const StoreContext = createContext<any>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeData = useStore();
  return (
    <StoreContext.Provider value={storeData}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error('useStoreContext must be used within a StoreProvider');
  return context;
}
```

#### Step 3: Wrap Your App (`src/app/layout.tsx`)
Inside your root layout file, wrap the `children` in the `<StoreProvider>` you just created.

```tsx
import { StoreProvider } from "@/contexts/store-context";

export default function RootLayout({ children }) {
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

#### Step 4: Hook Up Your Components (No Hardcoding!)
Now, inside any React component (like a Hero banner, a header, or a footer), you can pull dynamic text, images, and colors directly from the merchant's settings. 

**CRITICAL:** Always provide fallback values! If a new merchant installs your theme, their database will be empty. Provide placeholder text.

```tsx
// src/components/Hero.tsx
'use client';

import { useStoreContext } from '@/contexts/store-context';

export default function Hero() {
  const { customization } = useStoreContext();

  // ❌ BAD: Hardcoded
  // const title = "Best Jewelry Here"

  // ✅ GOOD: Dynamic with fallback
  const headline = customization?.heroSection?.title || "Premium Theme Collection";
  const bgImage = customization?.heroSection?.backgroundImage || "https://placeholder.com/image.png";

  return (
    <div style={{ backgroundImage: `url(${bgImage})` }}>
      <h1>{headline}</h1>
    </div>
  );
}
```

#### Step 5: Add the Click-to-Edit Listener
When the merchant clicks a section in the Admin Panel preview iframe, the sidebar needs to automatically jump to that section's settings. Add an `onClick` that sends a message OUT to the Admin panel.

```tsx
  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent clicks
    // Tell the Admin Dashboard they clicked me!
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  return (
    <section onClick={handleSectionClick}>
      {/* component content here */}
    </section>
  );
```
