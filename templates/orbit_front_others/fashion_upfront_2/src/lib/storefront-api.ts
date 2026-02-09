import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_ORBIT_API_URL || 'http://localhost:5000';

export interface StoreInfo {
    id: string;
    name: string;
    subdomain: string;
    customDomain?: string;
    logo?: string;
    description?: string;
    categoryConfig?: Record<string, unknown> | null;
}

export interface WebsiteCustomization {
    id: string;
    theme: string;
    brandColors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    navbar: {
        links: { label: string; url: string }[];
        logoHeight: string;
    };
    hero: {
        title: string;
        subtitle: string;
        ctaText: string;
        ctaLink: string;
        backgroundImage?: string;
    };
    features: {
        title: string;
        description: string;
        icon: string;
    }[];
    footer: {
        text: string;
        socialLinks: { platform: string; url: string }[];
    };
}

export interface ApiProduct {
    id: string;
    name: string;
    description: string;
    price: number | string;
    images: string[];
    category: string;
    stock: number;
    customFields?: {
        brand?: string;
        rating?: number;
        reviewCount?: number;
        features?: string[];
        badge?: string;
        age?: string;
        tags?: string[];
        sizes?: string[];
        colors?: string[];
        material?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export async function resolveStore(domain: string): Promise<StoreInfo | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/resolve?domain=${domain}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Failed to resolve store:', error);
        return null;
    }
}

export async function fetchStoreInfo(subdomain: string): Promise<StoreInfo | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/public/${subdomain}/info`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch store info:', error);
        return null;
    }
}

export async function fetchCustomization(subdomain: string): Promise<WebsiteCustomization | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/public/${subdomain}/customization`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch customization:', error);
        return null;
    }
}

export async function fetchProducts(subdomain: string): Promise<Product[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/public/${subdomain}/products`);
        if (!res.ok) return [];
        const data: ApiProduct[] = await res.json();
        return data.map(normalizeProduct);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export async function fetchProductById(subdomain: string, productId: string | number): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/public/${subdomain}/products/${productId}`);
        if (!res.ok) return null;
        const data: ApiProduct = await res.json();
        return normalizeProduct(data);
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
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
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
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
    return await res.json();
}

export function normalizeProduct(apiProduct: ApiProduct): Product {
    const priceNum = typeof apiProduct.price === 'string' ? parseFloat(apiProduct.price) : apiProduct.price;
    const price = `₹${priceNum.toLocaleString()}`;

    return {
        id: apiProduct.id,
        name: apiProduct.name,
        price: price,
        priceNum: priceNum,
        image: apiProduct.images?.[0] || '',
        images: apiProduct.images || [],
        description: apiProduct.description || '',
        category: apiProduct.category || 'Uncategorized',
        brand: apiProduct.customFields?.brand,
        rating: apiProduct.customFields?.rating || 0,
        reviewCount: apiProduct.customFields?.reviewCount || 0,
        stock: (apiProduct.stock || 0) > 0,
        tags: apiProduct.customFields?.tags || [],
        sizes: apiProduct.customFields?.sizes || [],
        colors: apiProduct.customFields?.colors || [],
        material: apiProduct.customFields?.material,
        features: apiProduct.customFields?.features || [],
    };
}
