# 🛰️ Orbit 360: Storefront API Integration Guide

This guide is for **Upfront Frontend Developers** building themes for the Orbit 360 ecosystem. Your theme must be **100% data-driven** to ensure it works across all 30,000+ potential merchants in the system.

---

## 1. The Multi-Tenant Handshake
Orbit 360 uses **Subdomain Discovery** to identify the merchant. Your frontend must extract the subdomain from the URL and use it as the `storefront_id` for all API calls.

**Logic Proof:**
- `alpha.orbit360.store` → Subdomain: `alpha`
- `custom-domain.com` → Subdomain: `custom-domain` (or full domain resolution)

### API Base URL
`https://api.orbit360.shop/api/storefront/public`

---

## 2. Core Integration Endpoints

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/:subdomain/info` | `GET` | Store metadata (Name, Logo, Favicon, Description). |
| `/:subdomain/customization`| `GET` | **Dynamic Engine**: Brand colors, Hero text, Typography. |
| `/:subdomain/sections` | `GET` | **Layout Engine**: Homepage sections (Products, Banners). |
| `/:subdomain/products` | `GET` | Fetches catalog (Supports `?category`, `?search`, `?limit`). |
| `/:subdomain/orders` | `POST`| Checkout processing for this merchant. |

---

## 3. Implementing the "Chameleon" (Dynamic Theming)

Do not hardcode colors. Your theme must inject CSS variables globally based on the `/customization` response.

### 🎨 Theme Wrapper Logic (React Example)
```tsx
const { customization } = useStore();

useEffect(() => {
  if (customization?.brandColors) {
    const { primary, secondary, accent } = customization.brandColors;
    const root = document.documentElement;
    root.style.setProperty('--orbit-primary', primary || '#000000');
    root.style.setProperty('--orbit-accent', accent || '#ff6b6b');
  }
}, [customization]);
```

---

## 4. Components Checklist (Scale & Sync Ready)

### ✅ The "Self-Healing" Footer
Merchants may not provide all social links. Use conditional rendering; never show empty space or dead icons.
```tsx
{social.instagram && (
  <a href={social.instagram} className="icon-insta">...</a>
)}
```

### ✅ The "Featured" Section
The Home page is dynamic. Fetch the `/sections` data and map over the `productSections` array.
- If `section.type === 'featured'`, render your Featured Component.
- Pass the `section.products` directly to the grid.

### ✅ Empty State Handling
If `/products` returns an empty array:
- Do **not** show an error.
- Show a "Coming Soon" or "Collection is Empty" placeholder.

---

## 5. Live-Sync (Editor Mode)
When a merchant edits their site in the Admin dashboard, an `iframe` post-message is sent. Your `StoreProvider` must listen for this to show changes without a page refresh.

```javascript
window.addEventListener('message', (e) => {
  if (e.data?.type === 'ORBIT_CUSTOMIZATION_UPDATE') {
    // Immediate state update for the frontend
    updateStoreData(e.data.data); 
  }
});
```

---

## 🚨 API Design Rules
1. **Never** hardcode an API Key. Authorization is handled via the domain whitelist on the backend.
2. **Always** use `?limit=12` for grids to prevent performance bottlenecks.
3. **Always** use `https://` for images; the backend provides Cloudinary-optimized URLs.

**Documentation Status**: 🟢 Ready for Distribution
**Backend Compatibility**: Neon DB + Redis Cache Active
