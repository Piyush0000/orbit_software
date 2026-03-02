# 🛰️ Orbit 360: Theme Developer Integration Guide

This guide explains how to make any static theme **100% dynamic** for the Orbit 360 ecosystem. By using the provided SDK, your theme will automatically handle multi-tenancy, live color branding, and real-time editor-mode syncing.

---

## 🚀 Quick Start (3 Steps)

### 1. Install the SDK
Copy the `ORBIT_ADAPTER_SDK.ts` file into your theme's `/src/lib/` or `/src/hooks/` directory.

### 2. Connect the Hook in your Layout
In your main `Layout.tsx` or `App.tsx`, import and initialize the store. This hook handles all API calls and subdomain discovery automatically.

```tsx
import { useOrbitStore } from '@/lib/orbit-adapter';

export default function RootLayout({ children }) {
  const { loading, error } = useOrbitStore(); // 👈 Activates the Engine

  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="theme-root">
      {children}
    </div>
  );
}
```

### 3. Use Dynamic Data in Components
Instead of hardcoding text or colors, pull them from the `customization` object.

```tsx
import { useOrbitStore } from '@/lib/orbit-adapter';

export default function Hero() {
  const { customization } = useOrbitStore();
  const content = customization?.heroSection;

  return (
    <section style={{ backgroundColor: 'var(--primary)' }}> 
      <h1>{content?.title || "Default Title"}</h1>
      <p>{content?.subtitle}</p>
      <button>{content?.buttonText || "Shop Now"}</button>
    </section>
  );
}
```

---

## 🎨 Styling Rules (The "Chameleon" Rule)

Do **NOT** hardcode hex colors (e.g., `#FF0000`). The SDK automatically injects global CSS variables into the `:root`. Use these variables in your Tailwind or CSS:

| Variable | Tailwind Usage | CSS Usage |
| :--- | :--- | :--- |
| `--primary` | `bg-[var(--primary)]` | `background: var(--primary);` |
| `--accent` | `text-[var(--accent)]` | `color: var(--accent);` |

---

## ⚡ The "Live-Sync" Rule (Editor Mode)

When a merchant is editing their site in the Orbit Admin Dashboard, the SDK handles the data updates in real-time. To make your components "Click-to-Edit" compatible, add a small post-message for section clicks:

```tsx
const handleSectionClick = (sectionId: string) => {
  if (window.parent !== window) {
    window.parent.postMessage({ 
      type: 'ORBIT_SECTION_CLICK', 
      sectionId 
    }, '*');
  }
};

// Usage on a wrapper:
<section onClick={() => handleSectionClick('heroSection')}>...</section>
```

---

## 📦 Dynamic Components Checklist

1.  **Footer**: Check for the existence of social links before rendering icons.
    - `{social.instagram && <a href={social.instagram}>...</a>}`
2.  **Product Grid**: Map over `sections.productSections` to render the dynamic homepage layout.
3.  **Logo**: Always use `customization?.logo` if available, otherwise fallback to your theme default.

---

**Documentation Version**: 2.0 (SDK-Powered)
**Infrastructure Support**: Neon DB + Redis Caching Enabled
