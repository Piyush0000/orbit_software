/**
 * Storefront API - Connects template to Orbit backend
 * Fetches merchant-specific data (branding, products, content)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const STORE_SUBDOMAIN = process.env.NEXT_PUBLIC_STORE_SUBDOMAIN || 'new-business';

export interface StoreData {
  id: string;
  name: string;
  subdomain: string;
  category: string;
  theme?: {
    name: string;
    category: string;
    primaryColor?: string;
  };
  customization?: WebsiteCustomization;
}

export interface WebsiteCustomization {
  logo?: string | null;
  favicon?: string | null;
  brandColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  typography?: {
    headingFont?: string;
    bodyFont?: string;
  };
  heroSection?: {
    title?: string;
    subtitle?: string;
    image?: string;
    cta?: string;
  };
  aboutSection?: {
    title?: string;
    content?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  headerStyle?: string;
  footerContent?: {
    copyright?: string;
    links?: Array<{ label: string; url: string }>;
  };
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

/**
 * Fetch store data and customization
 */
export async function getStoreData(): Promise<StoreData | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/public/stores/${STORE_SUBDOMAIN}`,
      {
        cache: 'no-store', // Always fetch fresh data
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

/**
 * Fetch store customization only
 */
export async function getStoreCustomization(): Promise<WebsiteCustomization | null> {
  try {
    const storeData = await getStoreData();
    return storeData?.customization || null;
  } catch (error) {
    console.error('Error fetching customization:', error);
    return null;
  }
}

/**
 * Fetch store products
 */
export async function getStoreProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/public/stores/${STORE_SUBDOMAIN}/products`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Apply branding colors to CSS variables
 */
export function applyBrandingColors(customization: WebsiteCustomization | null) {
  if (typeof window === 'undefined') return;

  const colors = customization?.brandColors;
  if (!colors) return;

  const root = document.documentElement;

  if (colors.primary) {
    root.style.setProperty('--color-primary', colors.primary);
  }

  if (colors.secondary) {
    root.style.setProperty('--color-secondary', colors.secondary);
  }

  if (colors.accent) {
    root.style.setProperty('--color-accent', colors.accent);
  }
}

/**
 * Apply typography to document
 */
export function applyTypography(customization: WebsiteCustomization | null) {
  if (typeof window === 'undefined') return;

  const typography = customization?.typography;
  if (!typography) return;

  const root = document.documentElement;

  if (typography.headingFont) {
    root.style.setProperty('--font-heading', typography.headingFont);
  }

  if (typography.bodyFont) {
    root.style.setProperty('--font-body', typography.bodyFont);
  }
}

/**
 * Get store configuration for easy access
 */
export const storeConfig = {
  apiUrl: API_URL,
  subdomain: STORE_SUBDOMAIN,
};
