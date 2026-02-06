/**
 * Product Adapter - Maps API products to template Product interface
 */

import { Product as ApiProduct } from './products-api';
import { Product as TemplateProduct } from './data';

/**
 * Maps API product to template product format
 */
export function mapApiProductToTemplate(apiProduct: ApiProduct): TemplateProduct {
  // Extract gender from tags or category
  const genderTag = apiProduct.tags?.find(t => 
    ['men', 'women', 'unisex'].includes(t.toLowerCase())
  );
  const gender = genderTag 
    ? (genderTag.charAt(0).toUpperCase() + genderTag.slice(1).toLowerCase() as 'Men' | 'Women' | 'Unisex')
    : 'Unisex';

  // Extract concentration from tags
  const concentrationTag = apiProduct.tags?.find(t => 
    ['edp', 'edt', 'parfum', 'cologne'].includes(t.toLowerCase())
  );
  const concentration = concentrationTag 
    ? (concentrationTag.toUpperCase() as 'EDP' | 'EDT' | 'Parfum' | 'Cologne')
    : 'EDP';

  // Extract tag from tags array
  const tagMapping: Record<string, TemplateProduct['tag']> = {
    'best seller': 'Best Seller',
    'bestseller': 'Best Seller',
    'new': 'New',
    'limited edition': 'Limited Edition',
    'limited': 'Limited Edition',
    'sale': 'Sale',
    'gift set': 'Gift Set',
    'gift': 'Gift Set',
  };
  
  const tagValue = apiProduct.tags?.find(t => 
    tagMapping[t.toLowerCase()]
  );
  const tag = tagValue ? tagMapping[tagValue.toLowerCase()] : undefined;

  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    name: apiProduct.name,
    brand: apiProduct.category || 'Luxury Perfumes',
    price: apiProduct.price,
    mrp: apiProduct.compareAtPrice || apiProduct.price,
    rating: 4.5, // Default rating
    reviews: 0, // Default reviews count
    image: apiProduct.images[0] || '/placeholder.jpg',
    imageHover: apiProduct.images[1] || apiProduct.images[0] || '/placeholder.jpg',
    gallery: apiProduct.images.slice(0, 3),
    description: apiProduct.description || 'A luxurious fragrance experience.',
    gender,
    concentration,
    size: '100ml',
    availableSizes: ['50ml', '100ml'],
    topNotes: ['Bergamot', 'Citrus'],
    middleNotes: ['Rose', 'Jasmine'],
    baseNotes: ['Musk', 'Amber'],
    longevity: 'Long-lasting' as const,
    sillage: 'Moderate' as const,
    season: ['Spring', 'Summer'],
    occasion: ['Daily', 'Party'],
    tag,
    stock: apiProduct.stockQuantity,
  };
}

/**
 * Maps array of API products to template products
 */
export function mapApiProducts(apiProducts: ApiProduct[]): TemplateProduct[] {
  return apiProducts.map(mapApiProductToTemplate);
}
