'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BannerCTA from '@/components/BannerCTA';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturesSection />
        <FeaturedProducts />
        <ProductGrid />
        <BannerCTA />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
