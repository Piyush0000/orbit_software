import { formatINR } from '@/lib/utils';
import { Product } from '@/types/product';

export interface StoreInfo {
  id: string;
  name: string;
  subdomain?: string;
  customDomain?: string | null;
  description?: string | null;
  logo?: string | null;
  category?: string | null;
  categoryConfig?: Record<string, unknown> | null;
  theme?: string | null;
  customization?: WebsiteCustomization | null;
}

export interface WebsiteCustomization {
  logo?: string | null;
  favicon?: string | null;
  brandColors?: Record<string, string> | null;
  heroSection?: Record<string, string> | null;
  footerContent?: Record<string, string> | null;
  contactInfo?: Record<string, string> | null;
  navLinks?: Array<{ label: string; href: string }> | null;
  announcementBar?: Record<string, string> | null;
  newsletter?: Record<string, string> | null;
  socialLinks?: Array<{ label: string; href: string }> | null;
}

interface ApiProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number | string;
  compareAtPrice?: number | string | null;
  stock?: number | null;
  images?: string[];
  image?: string | null;
  category?: string | null;
  tags?: string[];
  customFields?: Record<string, unknown> | null;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

const DEFAULT_API_BASE = 'http://localhost:5000';

const toNumber = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getApiBase = () => process.env.NEXT_PUBLIC_ORBIT_API_URL || DEFAULT_API_BASE;

const getDomainFromRuntime = () => {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return process.env.NEXT_PUBLIC_STORE_DOMAIN || process.env.NEXT_PUBLIC_STORE_SUBDOMAIN || null;
  }
  return hostname;
};

const getSubdomainFromDomain = (domain: string | null) => {
  if (!domain) return null;
  if (domain === 'localhost' || domain === '127.0.0.1') {
    return process.env.NEXT_PUBLIC_STORE_SUBDOMAIN || null;
  }
  return domain.split('.')[0];
};

const fetchJson = async <T,>(url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
};

export const resolveStore = async () => {
  const domain = getDomainFromRuntime();
  if (!domain) return null;
  const apiBase = getApiBase();

  try {
    const resolved = await fetchJson<{ store: StoreInfo }>(
      `${apiBase}/api/storefront/resolve?domain=${encodeURIComponent(domain)}`
    );
    return resolved.store;
  } catch (err) {
    const subdomain = getSubdomainFromDomain(domain);
    if (!subdomain) return null;
    try {
      const info = await fetchJson<{ store: StoreInfo }>(
        `${apiBase}/api/storefront/public/${encodeURIComponent(subdomain)}/info`
      );
      return info.store;
    } catch {
      return null;
    }
  }
};

export const fetchCustomization = async (subdomain: string) => {
  const apiBase = getApiBase();
  const data = await fetchJson<{ customization: WebsiteCustomization }>(
    `${apiBase}/api/storefront/public/${encodeURIComponent(subdomain)}/customization`
  );
  return data.customization;
};

export const fetchProducts = async (subdomain: string) => {
  const apiBase = getApiBase();
  const data = await fetchJson<{ products: ApiProduct[] }>(
    `${apiBase}/api/storefront/public/${encodeURIComponent(subdomain)}/products`
  );
  return data.products.map(normalizeProduct);
};

export const fetchProductById = async (subdomain: string, productId: string) => {
  const apiBase = getApiBase();
  const data = await fetchJson<{ product: ApiProduct }>(
    `${apiBase}/api/storefront/public/${encodeURIComponent(subdomain)}/products/${encodeURIComponent(productId)}`
  );
  return normalizeProduct(data.product);
};

export const createOrder = async (payload: {
  storeId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: Record<string, unknown>;
  billingAddress: Record<string, unknown>;
  tax?: number;
  shipping?: number;
  items: Array<{
    productId: string;
    name?: string;
    quantity: number;
    price?: number;
    variantId?: string;
    variantInfo?: Record<string, unknown>;
  }>;
}) => {
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let message = 'Failed to place order';
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }
  return (await res.json()) as { order: Record<string, unknown> };
};

export const normalizeProduct = (product: ApiProduct): Product => {
  const priceNum = toNumber(product.price);
  const compareAt = toNumber(product.compareAtPrice);
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const customFields = product.customFields || {};
  const brand = typeof customFields.brand === 'string' ? customFields.brand : '';
  const features = Array.isArray(customFields.features) ? (customFields.features as string[]) : undefined;
  const rating = typeof customFields.rating === 'number' ? customFields.rating : undefined;
  const reviewCount = typeof customFields.reviewCount === 'number' ? customFields.reviewCount : undefined;
  const popularity = typeof customFields.popularity === 'number' ? customFields.popularity : undefined;

  return {
    id: product.id,
    name: product.name,
    price: formatINR(priceNum),
    priceNum,
    image: images[0] || '',
    images,
    description: product.description || '',
    shortDescription: product.description || '',
    category: product.category || 'General',
    brand,
    tags: product.tags || [],
    stock: (product.stock || 0) > 0,
    rating,
    reviewCount,
    popularity,
    createdAt: product.createdAt ? new Date(product.createdAt) : undefined,
    originalPrice: compareAt > 0 ? formatINR(compareAt) : undefined,
    discount: compareAt > 0 ? Math.max(0, Math.round((1 - priceNum / compareAt) * 100)) : undefined,
    features,
    isFeatured: product.isFeatured
  };
};
