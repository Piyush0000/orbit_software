"use client";

import { useState, useEffect } from 'react';
import { useStoreContext } from '@/contexts/store-context';
import Link from 'next/link';

export default function FeaturedProducts() {
  const { sections, loading: contextLoading, error } = useStoreContext();
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("Featured Products");
  const [subtitle, setSubtitle] = useState("Handpicked favorites from our collection");
  const [customization, setCustomization] = useState<any>({});

  // Listen from iFrame parent messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ORBIT_CUSTOMIZATION_UPDATE') {
        setCustomization(e.data.data);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!contextLoading && sections) {
      // Look for featured section in the sections data
      const sectionEntries = Object.entries(sections);
      const sectionConfig = sectionEntries.find(([key, value]: [string, any]) => {
        const section = value;
        return section.type === 'featured' || 
               section.type === 'bestseller' ||
               section.type === 'new' ||
               section.type === 'sale' ||
               key.toLowerCase().includes('feat') || 
               section.title?.toLowerCase().includes('feat') ||
               key.toLowerCase().includes('best') || 
               section.title?.toLowerCase().includes('best') ||
               key.toLowerCase().includes('new') || 
               section.title?.toLowerCase().includes('new') ||
               key.toLowerCase().includes('sale') || 
               section.title?.toLowerCase().includes('sale');
      });

      if (sectionConfig) {
        const sectionData = sectionConfig[1] as any;
        if (sectionData && sectionData.products && sectionData.products.length > 0) {
          setProducts(sectionData.products);
          if (sectionData.title) setTitle(sectionData.title);
          if (sectionData.subtitle) setSubtitle(sectionData.subtitle);
        } else {
          // If no specific section found, get featured products from the API
          const featuredProducts = Object.values(sections)
            .filter((section: any) => section.products && section.products.length > 0)
            .flatMap((section: any) => section.products)
            .slice(0, 3);
          
          setProducts(featuredProducts);
        }
      } else {
        // If no specific section found, get featured products from the API
        const featuredProducts = Object.values(sections)
          .filter((section: any) => section.products && section.products.length > 0)
          .flatMap((section: any) => section.products)
          .slice(0, 3);
        
        setProducts(featuredProducts);
      }
    }
  }, [sections, contextLoading]);

  if (contextLoading) {
    return (
      <section
        id="featured"
        className="py-16 transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              {title}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group"
                style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Loading...</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>₹0</span>
                  </div>
                  <button
                    className="w-full px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
                    disabled
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="featured"
        className="py-16 transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              {title}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          </div>
          
          <div className="text-center py-12">
            <p style={{ color: 'var(--text)' }}>Error loading featured products: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-3 rounded-md font-semibold"
              style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  const displayTitle = customization?.productSections?.title || title;
  const displaySubtitle = customization?.productSections?.subtitle || subtitle;

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'productSections' }, '*');
    }
  };

  return (
    <section
      id="featured"
      onClick={handleSectionClick}
      className="py-16 transition-colors duration-300 hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            {displayTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {displaySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div
                key={product.id}
                className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group cursor-pointer"
                style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
              >
                {product.isFeatured && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  <img 
                    src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>₹{product.price?.toLocaleString()}</span>
                    {product.compareAtPrice && (
                      <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>₹{product.compareAtPrice?.toLocaleString()}</span>
                    )}
                  </div>
                  <button
                    className="w-full px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
