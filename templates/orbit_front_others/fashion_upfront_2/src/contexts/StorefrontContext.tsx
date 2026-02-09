'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
    StoreInfo, 
    WebsiteCustomization, 
    resolveStore, 
    fetchStoreInfo, 
    fetchCustomization, 
    fetchProducts, 
    fetchProductById,
    normalizeProduct
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
    refreshProduct: (productId: string | number) => Promise<void>;
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
            let subdomain = process.env.NEXT_PUBLIC_STORE_SUBDOMAIN;
            const hostname = window.location.hostname;

            if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
                const resolved = await resolveStore(hostname);
                if (resolved) {
                    setStore(resolved);
                    subdomain = resolved.subdomain;
                }
            }

            if (!subdomain) {
                // Fallback or error if no subdomain found and not resolved
                console.warn("No subdomain found. Using default or empty.");
            }

            if (subdomain) {
                const [storeInfo, customData, productData] = await Promise.all([
                    fetchStoreInfo(subdomain),
                    fetchCustomization(subdomain),
                    fetchProducts(subdomain)
                ]);

                if (storeInfo) setStore(storeInfo);
                if (customData) {
                    setCustomization(customData);
                    // Apply brand colors to CSS variables
                    if (customData.brandColors) {
                        const root = document.documentElement;
                        root.style.setProperty('--primary', customData.brandColors.primary);
                        root.style.setProperty('--secondary', customData.brandColors.secondary);
                        root.style.setProperty('--accent', customData.brandColors.accent);
                        root.style.setProperty('--background', customData.brandColors.background);
                        root.style.setProperty('--text', customData.brandColors.text);
                    }
                }
                setProducts(productData);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load store data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initStore();
    }, []);

    const refreshProduct = async (productId: string | number) => {
        if (!store?.subdomain) return;
        const freshProduct = await fetchProductById(store.subdomain, productId);
        if (freshProduct) {
            setProducts((prev: Product[]) => {
                const idx = prev.findIndex((p: Product) => p.id === productId);
                if (idx >= 0) {
                    const newProducts = [...prev];
                    newProducts[idx] = freshProduct;
                    return newProducts;
                }
                return prev;
            });
        }
    };

    const categories = Array.from(new Set(products.map((p: Product) => p.category)));
    const brands = Array.from(new Set(products.map((p: Product) => p.brand).filter(Boolean) as string[]));

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
