'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StorefrontAPI } from '@/lib/api';

interface FeaturedProduct {
  id: number | string;
  name: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  badge?: string;
  category?: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Get all products and categorize them based on their properties
        const data = await StorefrontAPI.getProducts({ limit: 12 });
        const allProducts = data.products || [];

        // Take first 3 products and assign badges based on their properties
        const featured = allProducts.slice(0, 3).map((product: any, index: number) => {
          let badge = '';
          if (index === 0) badge = 'Best Seller';
          else if (index === 1) badge = 'New';
          else if (index === 2) badge = 'Sale';

          return {
            id: product.id,
            name: product.name,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: Array.isArray(product.images) ? product.images[0] : product.image,
            badge: badge,
            category: product.category
          };
        });

        setProducts(featured);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products');
        // Set some fallback products in case of error
        setProducts([
          { id: 1, name: 'Loading...', price: '₹0', image: 'https://placehold.co/600x600?text=Loading', badge: '' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section
        id="featured"
        className="py-16 transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Featured Products
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Handpicked favorites from our collection
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
              Featured Products
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Handpicked favorites from our collection
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

  return (
    <section
      id="featured"
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Featured Products
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Handpicked favorites from our collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div
                className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group cursor-pointer"
                style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
              >
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>{product.compareAtPrice}</span>
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
