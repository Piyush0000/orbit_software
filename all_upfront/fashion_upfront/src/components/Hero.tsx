'use client';

import { useState, useEffect } from 'react';
import { StorefrontAPI } from '@/lib/api';

export default function Hero() {
  const [heroContent, setHeroContent] = useState({
    title: 'Urban',
    subtitle: 'Elegance',
    tagline: 'New Season Arrivals',
    description: 'Discover the latest trends from top international brands. Up to 60% off on selected styles.',
    ctaText: 'Shop Now',
    ctaSecondaryText: 'Explore',
    backgroundImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setLoading(true);
        const customization = await StorefrontAPI.getStoreCustomization();
        
        if (customization?.heroSection) {
          setHeroContent({
            title: customization.heroSection.title || 'Urban',
            subtitle: customization.heroSection.subtitle || 'Elegance',
            tagline: customization.heroSection.tagline || 'New Season Arrivals',
            description: customization.heroSection.description || 'Discover the latest trends from top international brands. Up to 60% off on selected styles.',
            ctaText: customization.heroSection.ctaText || 'Shop Now',
            ctaSecondaryText: customization.heroSection.ctaSecondaryText || 'Explore',
            backgroundImage: customization.heroSection.backgroundImage || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop'
          });
        } else {
          // Use defaults if no customization
          setHeroContent({
            title: 'Urban',
            subtitle: 'Elegance',
            tagline: 'New Season Arrivals',
            description: 'Discover the latest trends from top international brands. Up to 60% off on selected styles.',
            ctaText: 'Shop Now',
            ctaSecondaryText: 'Explore',
            backgroundImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop'
          });
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching hero content:', err);
        setError('Failed to load hero content');
        // Keep defaults
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center">
        {/* Background Image - Lifestyle Fashion */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop")', // Fashion lifestyle image
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-2xl animate-fade-in-up flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center">
      {/* Background Image - Lifestyle Fashion */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url("${heroContent.backgroundImage || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop'}")`, // Fashion lifestyle image
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-sm bg-white text-black text-xs font-bold mb-6 tracking-[0.2em] uppercase">
            {heroContent.tagline}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-medium leading-none mb-6">
            {heroContent.title} <br />
            <span className="italic font-light">{heroContent.subtitle}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 font-light tracking-wide max-w-lg">
            {heroContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="px-10 py-4 bg-white text-black font-bold text-sm tracking-widest hover:bg-gray-100 transition-colors duration-300 uppercase text-center"
            >
              {heroContent.ctaText}
            </a>
            <a
              href="#featured"
              className="px-10 py-4 border border-white text-white font-bold text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300 uppercase text-center"
            >
              {heroContent.ctaSecondaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
