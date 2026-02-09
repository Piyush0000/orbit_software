'use client';

import dynamic from 'next/dynamic';
import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';

// Dynamically import the real components from the perfume template
const Hero = dynamic(() => import('@/templates/cosmetics/components/Hero'), { ssr: false });
const CategoryGrid = dynamic(() => import('@/templates/cosmetics/components/CategoryGrid'), { ssr: false });
const FragranceNotes = dynamic(() => import('@/templates/cosmetics/components/FragranceNotes'), { ssr: false });
const Occasions = dynamic(() => import('@/templates/cosmetics/components/Occasions'), { ssr: false });
const BestSellers = dynamic(() => import('@/templates/cosmetics/components/BestSellers'), { ssr: false });
const GiftSection = dynamic(() => import('@/templates/cosmetics/components/GiftSection'), { ssr: false });
const Header = dynamic(() => import('@/templates/cosmetics/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/templates/cosmetics/components/Footer'), { ssr: false });

export default function CosmeticsTheme({ merchant }: { merchant: MerchantStore }) {
  // Inject merchant data into environment for template elements that might look for it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <div className="min-h-screen flex flex-col font-outfit">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryGrid />
        <FragranceNotes />
        <Occasions />
        <BestSellers />
        <GiftSection />
      </main>
      <Footer />
    </div>
  );
}
