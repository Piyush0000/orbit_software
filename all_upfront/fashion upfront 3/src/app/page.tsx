'use client';

import React from 'react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BannerCTA from '@/components/BannerCTA';
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <FeaturedProducts />
      <React.Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid />
      </React.Suspense>
      <BannerCTA />
    </>
  );
}
