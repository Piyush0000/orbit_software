'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  sections: {
    hero: boolean;
    productGrid: boolean;
    featuredProducts: boolean;
    bannerCTA: boolean;
  };
  sectionOrder: string[];
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateColors: (colors: Partial<ThemeConfig['colors']>) => void;
  updateFonts: (fonts: Partial<ThemeConfig['fonts']>) => void;
  toggleSection: (section: keyof ThemeConfig['sections']) => void;
  reorderSections: (newOrder: string[]) => void;
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#111827', // gray-900
    secondary: '#6B7280', // gray-500
    background: '#FFFFFF',
    text: '#111827',
  },
  fonts: {
    heading: 'inherit',
    body: 'inherit',
  },
  sections: {
    hero: true,
    productGrid: true,
    featuredProducts: true,
    bannerCTA: true,
  },
  sectionOrder: ['hero', 'productGrid', 'featuredProducts', 'bannerCTA'],
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  // Set light theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
  }, []);

  const updateColors = (colors: Partial<ThemeConfig['colors']>) => {
    setTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
  };

  const updateFonts = (fonts: Partial<ThemeConfig['fonts']>) => {
    setTheme((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, ...fonts },
    }));
  };

  const toggleSection = (section: keyof ThemeConfig['sections']) => {
    setTheme((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }));
  };

  const reorderSections = (newOrder: string[]) => {
    setTheme((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, updateColors, updateFonts, toggleSection, reorderSections }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
