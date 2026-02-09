'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types/product';
import {
  fetchCustomization,
  fetchProductById,
  fetchProducts,
  resolveStore,
  type StoreInfo,
  type WebsiteCustomization
} from '@/lib/storefront-api';

interface StorefrontContextValue {
  store: StoreInfo | null;
  customization: WebsiteCustomization | null;
  categoryConfig: Record<string, unknown> | null;
  products: Product[];
  categories: string[];
  brands: string[];
  loading: boolean;
  error: string | null;
  refreshProduct: (productId: string) => Promise<Product | null>;
}

const StorefrontContext = createContext<StorefrontContextValue | undefined>(undefined);

const applyBranding = (customization: WebsiteCustomization | null) => {
  if (!customization?.brandColors || typeof window === 'undefined') return;
  const colors = customization.brandColors;
  const root = document.documentElement.style;

  const setVar = (key: string, value?: string | null) => {
    if (!value) return;
    root.setProperty(key, value);
  };

  setVar('--page-bg', colors.background || colors.pageBg);
  setVar('--header-bg', colors.headerBg || colors.headerBackground);
  setVar('--header-text', colors.headerText || colors.primary);
  setVar('--text', colors.text);
  setVar('--text-muted', colors.textMuted || colors.secondary);
  setVar('--card-bg', colors.cardBg);
  setVar('--card-border', colors.cardBorder);
  setVar('--section-alt', colors.sectionAlt);
  setVar('--banner-bg', colors.bannerBg);
  setVar('--btn-primary-bg', colors.buttonBg);
  setVar('--btn-primary-text', colors.buttonText);
};

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [customization, setCustomization] = useState<WebsiteCustomization | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const storeInfo = await resolveStore();
        if (!active) return;
        if (!storeInfo?.subdomain) {
          setError('Store not found');
          setLoading(false);
          return;
        }

        const [custom, productList] = await Promise.all([
          fetchCustomization(storeInfo.subdomain),
          fetchProducts(storeInfo.subdomain)
        ]);

        if (!active) return;
        setStore(storeInfo);
        setCustomization(custom);
        setProducts(productList);
        applyBranding(custom);
        setLoading(false);
      } catch (err) {
        if (!active) return;
        setError('Failed to load storefront data');
        setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const refreshProduct = async (productId: string) => {
    if (!store?.subdomain) return null;
    try {
      const fresh = await fetchProductById(store.subdomain, productId);
      setProducts((prev) => {
        const idx = prev.findIndex((item) => item.id === fresh.id);
        if (idx === -1) return prev.concat(fresh);
        const updated = [...prev];
        updated[idx] = fresh;
        return updated;
      });
      return fresh;
    } catch (err) {
      return null;
    }
  };

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category).filter(Boolean))).sort(),
    [products]
  );

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.brand || '').filter(Boolean))).sort(),
    [products]
  );

  return (
    <StorefrontContext.Provider
      value={{
        store,
        customization,
        categoryConfig: store?.categoryConfig || null,
        products,
        categories,
        brands,
        loading,
        error,
        refreshProduct
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error('useStorefront must be used within a StorefrontProvider');
  }
  return context;
}
