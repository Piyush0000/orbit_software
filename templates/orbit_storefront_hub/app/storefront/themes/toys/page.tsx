'use client';

import dynamic from 'next/dynamic';
import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';

// Dynamically import from orbit_front_others/toy upfront 2
const Header = dynamic(() => import('@/templates/toys/components/layout/Header'), { ssr: false });
const Footer = dynamic(() => import('@/templates/toys/components/layout/Footer'), { ssr: false });
const Hero = dynamic(() => import('@/templates/toys/components/home/Hero'), { ssr: false });
const FeaturedToys = dynamic(() => import('@/templates/toys/components/home/TrendingToys'), { ssr: false });
const CategoryBubbles = dynamic(() => import('@/templates/toys/components/home/CategoryGrid'), { ssr: false });

export default function ToysTheme({ merchant }: { merchant: MerchantStore }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryBubbles />
        <FeaturedToys />
      </main>
      <Footer />
    </div>
  );
}