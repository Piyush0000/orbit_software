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

        spiceLevel?: string;
        veg?: boolean;
    };
    createdAt?: string;
    updatedAt?: string;
    image?: string;
    compareAtPrice?: string | number;
}

export async function resolveStore(domain: string = window.location.hostname): Promise<StoreInfo | null> {
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
    // Helper to safely parse numbers/strings to number
    const toNumber = (val: string | number | undefined): number => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return parseFloat(val.replace(/[^\d.]/g, '')) || 0;
        return 0;
    };

    const priceNum = toNumber(apiProduct.price);
    const compareAt = toNumber(apiProduct.compareAtPrice);
    
    // Format INR
    const formatINR = (num: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    };

    const images = apiProduct.images?.length ? apiProduct.images : apiProduct.image ? [apiProduct.image] : [];

    return {
        id: apiProduct.id,
        name: apiProduct.name,
        description: apiProduct.description || '',
        price: formatINR(priceNum),
        priceNum: priceNum,
        image: images[0] || '',
        images: images,
        category: apiProduct.category || 'Uncategorized',
        brand: apiProduct.customFields?.brand,
        stock: Boolean(apiProduct.stock && Number(apiProduct.stock) > 0),
        tags: apiProduct.customFields?.tags || [],
        sizes: apiProduct.customFields?.sizes || [],
        colors: apiProduct.customFields?.colors || [],
        rating: apiProduct.customFields?.rating,
        reviewCount: apiProduct.customFields?.reviewCount,
        material: apiProduct.customFields?.material,
        features: apiProduct.customFields?.features || [],
        badge: apiProduct.customFields?.badge,
        spiceLevel: apiProduct.customFields?.spiceLevel,
        veg: apiProduct.customFields?.veg ?? apiProduct.customFields?.tags?.includes('Veg'), // Fallback to tag
        createdAt: apiProduct.createdAt ? new Date(apiProduct.createdAt) : undefined,

        originalPrice: compareAt > priceNum ? formatINR(compareAt) : undefined,
        originalPriceNum: compareAt > priceNum ? compareAt : undefined,
        discount: compareAt > priceNum ? Math.round(((compareAt - priceNum) / compareAt) * 100) : undefined,
        shortDescription: apiProduct.description?.substring(0, 150) + '...'
    };
}
