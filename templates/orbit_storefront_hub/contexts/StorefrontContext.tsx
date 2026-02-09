'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { MerchantStore, fetchMerchantProducts, fetchCategories } from '@/lib/merchant-api';
import { CartProvider } from '@/contexts/CartContext';

interface StorefrontContextType {
  store: any;
  storeInfo: any;
  customization: any;
  websiteCustomization: any;
  categoryData: any;
  subdomain: string;
  products: any[];
  categories: any[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export function StorefrontProvider({ 
  children, 
  storeInfo, 
  subdomain 
}: { 
  children: ReactNode; 
  storeInfo: MerchantStore;
  subdomain: string;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const customization = storeInfo.customization;
  const websiteCustomization = customization;
  const categoryData = storeInfo.categoryConfig;

  const loadStoreData = useCallback(async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        fetchMerchantProducts(subdomain),
        fetchCategories(subdomain)
      ]);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load store data:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [subdomain]);

  useEffect(() => {
    loadStoreData();
  }, [loadStoreData]);

  return (
    <CartProvider subdomain={subdomain}>
      <StorefrontContext.Provider value={{
        store: storeInfo,
        storeInfo,
        customization,
        websiteCustomization,
        categoryData,
        subdomain,
        products,
        categories,
        loading,
        error,
        refresh: loadStoreData
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary-color: ${websiteCustomization?.brandColors?.primary || '#000000'};
            --secondary-color: ${websiteCustomization?.brandColors?.secondary || '#ffffff'};
            --accent-color: ${websiteCustomization?.brandColors?.accent || '#cccccc'};
          }
        ` }} />
        {children}
      </StorefrontContext.Provider>
    </CartProvider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (context === undefined) {
    throw new Error('useStorefront must be used within a StorefrontProvider');
  }
  return context;
}