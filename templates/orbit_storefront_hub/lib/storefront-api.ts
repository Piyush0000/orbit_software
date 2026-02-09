import { MerchantStore, fetchMerchantProducts } from './merchant-api';

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

// Map Hub-style merchant-api to template-style storefront-api
export async function resolveStore(domain: string): Promise<StoreInfo | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/resolve?domain=${domain}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.success ? data.store : null;
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

export async function fetchProducts(subdomain: string): Promise<any[]> {
    return fetchMerchantProducts(subdomain);
}

export async function fetchProductById(subdomain: string, productId: string | number): Promise<any | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/storefront/public/${subdomain}/products/${productId}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}

export async function createOrder(payload: any) {
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
        } catch (_) {}
        throw new Error(message);
    }
    return await res.json();
}
