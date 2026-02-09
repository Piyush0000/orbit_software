'use client';

import { useStorefront } from '@/contexts/StorefrontContext';

export default function Hero() {
  const { customization } = useStorefront();
  const hero = customization?.heroSection || {};
  const heroBadge = hero.badge || 'New Season Arrivals';
  const heroTitle = hero.title || 'Urban';
  const heroSubtitle = hero.subtitle || 'Elegance';
  const heroDescription =
    hero.description ||
    'Discover the latest trends from top international brands. Up to 60% off on selected styles.';
  const heroImage =
    hero.image ||
    hero.imageUrl ||
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop';
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center">
      {/* Background Image - Lifestyle Fashion */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url("${heroImage}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-sm bg-white text-black text-xs font-bold mb-6 tracking-[0.2em] uppercase">
            {heroBadge}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-medium leading-none mb-6">
            {heroTitle} <br />
            <span className="italic font-light">{heroSubtitle}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 font-light tracking-wide max-w-lg">
            {heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="px-10 py-4 bg-white text-black font-bold text-sm tracking-widest hover:bg-gray-100 transition-colors duration-300 uppercase text-center"
            >
              {hero.ctaText || 'Shop Now'}
            </a>
            <a
              href="#featured"
              className="px-10 py-4 border border-white text-white font-bold text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300 uppercase text-center"
            >
              {hero.secondaryCtaText || 'Explore'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
