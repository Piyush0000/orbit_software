'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { StorefrontProvider } from '@/contexts/StorefrontContext';
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StorefrontProvider>{children}</StorefrontProvider>
    </ThemeProvider>
  );
}
