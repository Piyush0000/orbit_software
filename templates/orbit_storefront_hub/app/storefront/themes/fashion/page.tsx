'use client';

import dynamic from 'next/dynamic';
import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';

// Dynamically import the real components from the fashion template
const Header = dynamic(() => import('@/templates/fashion/src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/templates/fashion/src/components/Footer'), { ssr: false });
const Hero = dynamic(() => import('@/templates/fashion/src/components/Hero'), { ssr: false });
const FeaturedProducts = dynamic(() => import('@/templates/fashion/src/components/FeaturedProducts'), { ssr: false });
const FeaturesSection = dynamic(() => import('@/templates/fashion/src/components/FeaturesSection'), { ssr: false });

export default function FashionTheme({ merchant }: { merchant: MerchantStore }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturesSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}