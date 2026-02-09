'use client';

import dynamic from 'next/dynamic';
import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';

// Dynamically import from food_beverage/theme-1
const Header = dynamic(() => import('@/templates/food-beverage/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/templates/food-beverage/components/Footer'), { ssr: false });
const Hero = dynamic(() => import('@/templates/food-beverage/components/sections/Hero'), { ssr: false });
const CategorySection = dynamic(() => import('@/templates/food-beverage/components/sections/CategoryExplorer'), { ssr: false });
const FeaturedMenu = dynamic(() => import('@/templates/food-beverage/components/sections/BestSellers'), { ssr: false });

export default function FoodBeverageTheme({ merchant }: { merchant: MerchantStore }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedMenu />
      </main>
      <Footer />
    </div>
  );
}