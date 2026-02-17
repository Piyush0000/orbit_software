"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useStore } from '@/lib/api';

interface StoreContextType {
  storeInfo: any;
  customization: any;
  sections: any;
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeData = useStore();
  
  return (
    <StoreContext.Provider value={storeData}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
}