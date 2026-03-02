import { useState, useEffect } from 'react';

/**
 * 🛰️ ORBIT 360 - UNIVERSAL STOREFRONT ADAPTER
 * ------------------------------------------
 * Drop this file into /src/lib/orbit-adapter.ts
 * Use the 'useOrbitStore' hook in your layout/app to make any static theme 100% dynamic.
 */

// 1. API Configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.orbit360.shop/api/storefront/public';

// 2. Types for IntelliSense
export interface OrbitStoreData {
  storeInfo: any;
  customization: {
    brandColors: { primary: string; secondary: string; accent: string };
    heroSection?: any;
    footerContent?: any;
    socialLinks?: any;
    [key: string]: any;
  };
  sections: any;
  loading: boolean;
  error: string | null;
}

// 3. Subdomain Discovery Logic
export const getSubdomain = (): string => {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_DEFAULT_SUBDOMAIN || 'demo';
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // Localhost (e.g. tech.localhost:3000)
  if (hostname.includes('localhost')) {
    return parts.length >= 2 && parts[0] !== 'localhost' ? parts[0] : 'demo';
  }
  
  // Production (e.g. tech.orbit360.store)
  return parts.length > 2 ? parts[0] : 'demo';
};

// 4. The Magic Hook
export function useOrbitStore(): OrbitStoreData {
  const [data, setData] = useState<any>({
    storeInfo: null,
    customization: null,
    sections: {},
    loading: true,
    error: null
  });

  const subdomain = getSubdomain();

  // Fetch Logic
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [infoRes, customRes, sectionsRes] = await Promise.all([
          fetch(`${API_BASE}/${subdomain}/info`),
          fetch(`${API_BASE}/${subdomain}/customization`),
          fetch(`${API_BASE}/${subdomain}/sections`)
        ]);

        const [info, custom, sections] = await Promise.all([
          infoRes.json(),
          customRes.json(),
          sectionsRes.json()
        ]);

        setData({
          storeInfo: info.data,
          customization: custom.data,
          sections: sections.data,
          loading: false,
          error: null
        });

        // 🎨 AUTO-THEME INJECTION
        if (custom.data?.brandColors) {
          const { primary, secondary, accent } = custom.data.brandColors;
          document.documentElement.style.setProperty('--primary', primary || '#000000');
          document.documentElement.style.setProperty('--accent', accent || '#ff6b6b');
        }

      } catch (err: any) {
        setData((prev: any) => ({ ...prev, loading: false, error: err.message }));
      }
    };

    fetchAll();
  }, [subdomain]);

  // 🔄 REAL-TIME SYNC (For Admin Editor Mode)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ORBIT_CUSTOMIZATION_UPDATE') {
        setData((prev: any) => ({
          ...prev,
          customization: { ...prev.customization, ...e.data.data }
        }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return data;
}

/**
 * USAGE GUIDE:
 * 1. Import { useOrbitStore } from '@/lib/orbit-adapter';
 * 2. In your Layout.tsx: const { customization, sections, loading } = useOrbitStore();
 * 3. Use CSS variables in your Tailwind/CSS: className="bg-[var(--primary)]"
 */
