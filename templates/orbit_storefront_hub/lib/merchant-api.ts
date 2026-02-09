const API_URL = process.env.NEXT_PUBLIC_ORBIT_API_URL || 'http://localhost:5000';

export interface MerchantStore {
  id: string;
  name: string;
  subdomain: string;
  theme: string;
  customization: any;
  category: string;
  categoryConfig?: Record<string, unknown> | null;
}

export async function fetchMerchantByDomain(domain: string): Promise<MerchantStore | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/storefront/resolve?domain=${domain}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.success ? data.store : null;
  } catch (error) {
    console.error('Failed to fetch merchant:', error);
    return null;
  }
}

export async function fetchMerchantProducts(domain: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/public/stores/${domain}/products`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function fetchCategories(subdomain: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/public/stores/${subdomain}/categories`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export async function createOrder(payload: {
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
}) {
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
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
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
}

export async function checkInventory(productId: string, quantity: number) {
  try {
    const res = await fetch(`${API_URL}/api/products/${productId}/inventory`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return { available: false, stock: 0 };
    
    const data = await res.json();
    const hasStock = data.stock >= quantity;
    
    return { available: hasStock, stock: data.stock };
  } catch (error) {
    console.error('Failed to check inventory:', error);
    return { available: false, stock: 0 };
  }
}