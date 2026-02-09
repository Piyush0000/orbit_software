'use client';

import dynamic from 'next/dynamic';
import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';

// Dynamically import the real components from the electronics template
const Header = dynamic(() => import('@/templates/electronics/src/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/templates/electronics/src/components/Footer'), { ssr: false });
const Hero = dynamic(() => import('@/templates/electronics/src/components/Hero'), { ssr: false });
const FeaturedProducts = dynamic(() => import('@/templates/electronics/src/components/FeaturedProducts'), { ssr: false });
const FeaturesSection = dynamic(() => import('@/templates/electronics/src/components/FeaturesSection'), { ssr: false });

export default function ElectronicsTheme({ merchant }: { merchant: MerchantStore }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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