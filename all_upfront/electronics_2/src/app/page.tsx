'use client';

import React from 'react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BannerCTA from '@/components/BannerCTA';
import FeaturesSection from '@/components/FeaturesSection';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <Hero />
      <FeaturesSection />
      <FeaturedProducts />
      <ProductGrid />
      <BannerCTA />
      <Newsletter />
    </div>
  );
}
