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
    categories: string[];
    brands: string[];
    loading: boolean;
    error: string | null;
    refreshProduct: (productId: string | number) => Promise<Product | null>;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export const StorefrontProvider = ({ children }: { children: ReactNode }) => {
    const [store, setStore] = useState<StoreInfo | null>(null);
    const [customization, setCustomization] = useState<WebsiteCustomization | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const initStore = async () => {
        try {
            setLoading(true);
            // Default subdomain processing
            let subdomain = process.env.NEXT_PUBLIC_STORE_SUBDOMAIN;
            
            // If running on custom domain or wildcard, try to resolve
            if (typeof window !== 'undefined') {
                const hostname = window.location.hostname;
                if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
                     const resolved = await resolveStore(hostname);
                     if (resolved) {
                         setStore(resolved);
                         subdomain = resolved.subdomain;
                     }
                }
            }

            if (!subdomain) {
                // If strictly localhost with no ENV, we might fail or show demo data
                // For now, let's assume one is provided or handled
                console.log("No subdomain provided, skipping API fetch");
                setLoading(false);
                return;
            }

            const [storeInfo, customData, productData] = await Promise.all([
                fetchStoreInfo(subdomain),
                fetchCustomization(subdomain),
                fetchProducts(subdomain)
            ]);

            if (storeInfo) setStore(storeInfo);
            if (customData) {
                setCustomization(customData);
                // Apply branding
                if (customData.brandColors && typeof document !== 'undefined') {
                    const root = document.documentElement;
                    root.style.setProperty('--primary', customData.brandColors.primary);
                    root.style.setProperty('--secondary', customData.brandColors.secondary);
                    root.style.setProperty('--accent', customData.brandColors.accent);
                    root.style.setProperty('--background', customData.brandColors.background);
                    root.style.setProperty('--text', customData.brandColors.text);
                }
            }
            if (productData) setProducts(productData);

        } catch (err) {
            console.error(err);
            setError("Failed to load storefront data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initStore();
    }, []);

    const refreshProduct = async (productId: string | number) => {
        if (!store?.subdomain) return null;
        const fresh = await fetchProductById(store.subdomain, productId);
        if (fresh) {
            setProducts(prev => {
                const idx = prev.findIndex(p => String(p.id) === String(productId));
                if (idx >= 0) {
                    const next = [...prev];
                    next[idx] = fresh;
                    return next;
                }
                return prev;
            });
        }
        return fresh;
    };

    const categories = Array.from(new Set(products.map(p => p.category)));
    const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean) as string[]));

    return (
        <StorefrontContext.Provider value={{
            store,
            customization,
            categoryConfig: store?.categoryConfig || null,
            products,
            categories,
            brands,
            loading,
            error,
            refreshProduct
        }}>
            {children}
        </StorefrontContext.Provider>
    );
};

export const useStorefront = () => {
    const context = useContext(StorefrontContext);
    if (context === undefined) {
        throw new Error('useStorefront must be used within a StorefrontProvider');
    }
    return context;
};
