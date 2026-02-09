'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MerchantStore } from '@/lib/merchant-api';
import { useStorefront } from '@/context/StorefrontContext';

interface ThemeRendererProps {
  merchant: MerchantStore;
}

export default function ThemeRenderer({ merchant }: ThemeRendererProps) {
  const [ThemeComponent, setThemeComponent] = useState<React.ComponentType<any> | null>(null);
  const { storeInfo, websiteCustomization, categoryData, subdomain } = useStorefront();

  useEffect(() => {
    console.log('[ThemeRenderer] Merchant Theme:', merchant.theme);
    // Dynamically import the correct theme component based on merchant's theme
    const loadTheme = async () => {
      try {
        const themeKey = merchant.theme || 'general';
        const normalizedTheme = themeKey.toLowerCase().replace(/_/g, '-');
        console.log('[ThemeRenderer] Attempting to load:', normalizedTheme, 'Original:', themeKey);
        let component;
        
        switch (normalizedTheme) {
          case 'toys':
          case 'toys-theme':
          case 'toystore':
            component = (await import('../app/storefront/themes/toys/page')).default;
            break;
          case 'electronics-upfront':
          case 'electronics-3':
          case 'electronics':
            component = (await import('../app/storefront/themes/electronics/page')).default;
            break;
          case 'fashion-upfront':
          case 'fashion-upfront-2':
          case 'fashion-upfront-3':
          case 'fashion':
          case 'clothing':
            component = (await import('../app/storefront/themes/fashion/page')).default;
            break;
          case 'perfume-theme-2':
          case 'beauty-personal-care-upfront':
          case 'cosmetics':
          case 'beauty':
          case 'perfume':
            component = (await import('../app/storefront/themes/cosmetics/page')).default;
            break;
          case 'food-beverage':
          case 'food':
            component = (await import('../app/storefront/themes/food-beverage/page')).default;
            break;
          default:
            console.log('[ThemeRenderer] No match for:', normalizedTheme, 'Falling back to general');
            component = (await import('../app/storefront/themes/general/page')).default;
        }

        if (component) {
          setThemeComponent(() => component);
        }
      } catch (error: any) {
        console.error('Error loading theme component:', error);
        // Fallback to a default component with debug info
        setThemeComponent(() => () => (
          <div className="p-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Theme Loading Error</h1>
            <p className="text-gray-600 mb-2">Target Theme: {merchant.theme}</p>
            <p className="text-red-500 text-sm">{error.message}</p>
          </div>
        ));
      }
    };

    loadTheme();
  }, [merchant.theme]);

  if (!ThemeComponent) {
    return <div>Loading theme...</div>;
  }

  // Pass merchant data to the theme component
  return <ThemeComponent merchant={merchant} />;
}