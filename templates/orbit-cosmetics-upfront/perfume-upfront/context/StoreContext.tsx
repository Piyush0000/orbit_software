'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getStoreData,
  applyBrandingColors,
  applyTypography,
  type StoreData,
  type WebsiteCustomization,
} from '@/lib/storefront-api';

interface StoreContextType {
  store: StoreData | null;
  customization: WebsiteCustomization | null;
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType>({
  store: null,
  customization: null,
  loading: true,
  error: null,
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<StoreData | null>(null);
  const [customization, setCustomization] = useState<WebsiteCustomization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStoreData = async () => {
      try {
        setLoading(true);
        const storeData = await getStoreData();

        if (!storeData) {
          setError('Store not found');
          return;
        }

        setStore(storeData);
        setCustomization(storeData.customization || null);

        // Apply branding immediately
        applyBrandingColors(storeData.customization || null);
        applyTypography(storeData.customization || null);

        setError(null);
      } catch (err) {
        console.error('Failed to load store data:', err);
        setError('Failed to load store data');
      } finally {
        setLoading(false);
      }
    };

    loadStoreData();
  }, []);

  return (
    <StoreContext.Provider value={{ store, customization, loading, error }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
