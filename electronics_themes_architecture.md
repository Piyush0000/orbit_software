# Orbit Electronics Themes: Technical Architecture Guide

This document provides an in-depth technical overview of how the three Electronics Storefront themes have been implemented within the `premade_stores` directory. This guide is designed for developers to understand the design patterns, data flow, and styling system used to build Orbit's premium storefronts.

---

## 1. Directory Structure
All theme-related code is centralized in `D:\orbit\premade_stores`.

- **`/src/components/ThemeRenderer.tsx`**: The master component that determines which theme to display.
- **`/src/lib/theme-manager.ts`**: The registry where every theme is defined with its ID, name, and category.
- **`/src/lib/api-client.ts`**: The "Bridge" that fetches real data from the Orbit Backend and normalizes it for the themes.
- **`/src/themes/electronics/`**: 
    - `CompleteElectronicsUpfront.tsx` (Modern / Theme 1)
    - `CompleteElectronicsUpfront2.tsx` (Pro / Theme 2)
    - `CompleteElectronicsUpfront3.tsx` (Store / Theme 3)
- **`/src/themes/electronics/theme-components-[1,2,3]`**: Modular sub-components (Navbar, Hero, Features, Footer) unique to each theme version.

---

## 2. Core Mechanism: The Theme Renderer
The `ThemeRenderer.tsx` is the heart of the storefront. It doesn't contain hardcoded UI; instead, it acts as a **Dynamic Loader**.

### How it works:
1. **Identification**: It looks at the `?theme=` query parameter or the subdomain.
2. **Metadata Fetch**: It calls `getThemeById(themeId)` from `theme-manager.ts` to get the theme's structure.
3. **Data Fetch**: It calls `getStorefrontConfig(subdomain)` to fetch the merchant's specific data (Logo, Colors, Products) from the database via the Backend API.
4. **Injection**: It passes the normalized metadata as props into the selected theme component.

---

## 3. Data Flow & Normalization
The backend database (PostgreSQL) uses a generic schema for all stores. However, different themes expect data in different formats. We use a **Normalization Layer** in `api-client.ts`.

### Key Normalizations:
When we fetch `websiteCustomization`, we map backend fields to the "Theme Contract":
- `cta` (Backend) $\rightarrow$ `ctaText` (Theme)
- `image` (Backend) $\rightarrow$ `imageUrl` (Theme)
- `productSections` (Backend) are converted into an object that themes can iterate over.

**Developer Tip:** If you add a new field to the Backend Admin Panel, you **must** update the normalization logic in `api-client.ts` so the theme can see it.

---

## 4. The 3 Electronics Themes: Comparative Breakdown

### Theme 1: Electronics Modern (`electronics-modern`)
- **Vibe**: Clean, minimalist, white-space heavy.
- **Tech Highlights**: Uses large typography and subtle hover scales.
- **Layout**: Centered hero with a grid of featured gadgets.

### Theme 2: Electronics Pro (`electronics-pro`)
- **Vibe**: Dark mode ready, high-performance, professional.
- **Tech Highlights**: Uses `theme-components-2`. Features a split-hero design (Text left, Image right).
- **Styling**: Heavier use of gradients and border-glows on product cards.

### Theme 3: Electronics Store (`electronics-store`)
- **Vibe**: Retail-focused, high density, commercial.
- **Tech Highlights**: Uses `theme-components-3`. Features full-width banners and multi-column footers.
- **Layout**: Focuses on categories and "Flash Sale" banners.

---

## 5. Styling & Branding (CSS Variables)
We don't hardcode colors like `bg-blue-500`. Instead, themes use **CSS Variables**.

In the `CompleteElectronicsUpfront.tsx` files, you will see a section that injects styles like this:
```tsx
const customStyles = {
  '--primary': config.colors.primary,
  '--secondary': config.colors.secondary,
  '--font-main': config.typography.headingFont
}
```
This allows a merchant to change their brand color in the Orbit Admin Panel, and the entire storefront updates instantly without a code change.

---

## 6. How to Extend (Developer Workflow)

### To modify an existing section:
1. Locate the component (e.g., `/themes/electronics/theme-components-2/Hero.tsx`).
2. If you want to change the layout, edit the Tailwind classes.
3. Ensure you are using the `config` prop to pull real data.

### To add a new section:
1. Create the component in the relevant `theme-components` folder.
2. Import it into the `CompleteElectronicsUpfront[X].tsx` file.
3. Add a new configuration block in the `WebsiteCustomization` model in the backend to support it.

---

## 7. AI Prompt Strategy for the Team
To help your team use AI to generate new sections/themes, use this prompt structure:

> "Act as a React/Tailwind expert. I have an Electronics theme in the `premade_stores` project. I need a new 'Specifications' section component for Theme 2. Features: 
> 1. Use the `config` prop pattern.
> 2. Use CSS variables for colors (e.g., `var(--primary)`).
> 3. Match the 'Electronics Pro' aesthetic (dark gradients, sharp borders).
> 4. Reference the existing `Hero.tsx` in `theme-components-2` for styling consistency."

---
**Orbit Platform v3.0** | *Logistics & Storefront Integration Team*
