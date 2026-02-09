'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
    StoreInfo, 
    WebsiteCustomization, 
    resolveStore, 
    fetchStoreInfo, 
    fetchCustomization, 
    fetchProducts, 
    fetchProductById 
} from '@/lib/storefront-api';
import { Product } from '@/types/product';

interface StorefrontContextType {
    store: StoreInfo | null;
    customization: WebsiteCustomization | null;
    categoryConfig: Record<string, unknown> | null;
    products: Product[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    getProduct: (id: string | number) => Promise<Product | null>;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export function StorefrontProvider({ children }: { children: ReactNode }) {
    const [store, setStore] = useState<StoreInfo | null>(null);
    const [customization, setCustomization] = useState<WebsiteCustomization | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            setLoading(true);
            // In a real scenario, we'd get the subdomain from the URL
            // For now, we'll try to resolve it or use a fallback
            let subdomain = 'demo'; 
            
            if (typeof window !== 'undefined') {
                const hostname = window.location.hostname;
                if (!hostname.includes('localhost') && !hostname.includes('orbit-stores.com')) {
                    const resolved = await resolveStore(hostname);
                    if (resolved) subdomain = resolved.subdomain;
                } else {
                    // Check if subdomain is in search params for testing
                    const urlParams = new URLSearchParams(window.location.search);
                    const querySubdomain = urlParams.get('subdomain');
                    if (querySubdomain) subdomain = querySubdomain;
                }
            }

            const [storeInfo, customData, productsData] = await Promise.all([
                fetchStoreInfo(subdomain),
                fetchCustomization(subdomain),
                fetchProducts(subdomain)
            ]);

            setStore(storeInfo);
            setCustomization(customData);
            setProducts(productsData);
        } catch (err) {
            console.error('Failed to load storefront data:', err);
            setError('Failed to load store data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getProduct = async (id: string | number): Promise<Product | null> => {
        // First check in-memory products
        const existing = products.find(p => p.id === id || p.id === String(id));
        if (existing) return existing;

        // Otherwise fetch from API
        if (store?.subdomain) {
            return await fetchProductById(store.subdomain, id);
        }
        return null;
    };

    return (
        <StorefrontContext.Provider value={{ 
            store, 
            customization, 
            categoryConfig: store?.categoryConfig || null,
            products, 
            loading, 
            error, 
            refresh: loadData,
            getProduct
        }}>
            {children}
        </StorefrontContext.Provider>
    );
}

export function useStorefront() {
    const context = useContext(StorefrontContext);
    if (context === undefined) {
        throw new Error('useStorefront must be used within a StorefrontProvider');
    }
    return context;
}
