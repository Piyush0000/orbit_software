'use client';

import { useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useStoreContext } from '@/contexts/store-context';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { customization } = useStoreContext();

  useEffect(() => {
    if (customization?.brandColors) {
      const { primary, secondary } = customization.brandColors;
      if (primary) {
        document.documentElement.style.setProperty('--header-text', primary);
        document.documentElement.style.setProperty('--btn-primary-text', primary);
      }
      if (secondary) {
        document.documentElement.style.setProperty('--text-muted', secondary);
        document.documentElement.style.setProperty('--header-text-muted', secondary);
      }
    }
  }, [customization]);

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
