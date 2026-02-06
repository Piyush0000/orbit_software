/**
 * Products API - Fetch products from backend
 */

import { storeConfig } from './storefront-api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  category?: string | null;
  tags?: string[];
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

/**
 * Fetch all products for a store
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${storeConfig.apiUrl}/api/public/stores/${storeConfig.subdomain}/products`,
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
 * Fetch featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.isFeatured && p.isActive);
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(
    p => p.category?.toLowerCase() === category.toLowerCase() && p.isActive
  );
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug && p.isActive) || null;
}
