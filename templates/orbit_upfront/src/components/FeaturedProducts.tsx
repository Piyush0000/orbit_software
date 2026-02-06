'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, type Product } from '@/lib/products-api';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const featured = products.filter(p => p.isFeatured && p.isActive).slice(0, 3);
        if (featured.length === 0) {
          setFeaturedProducts(products.filter(p => p.isActive).slice(0, 3));
        } else {
          setFeaturedProducts(featured);
        }
      } catch (error) {
        console.error('Failed to load featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section
        id="featured"
        className="py-16 transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p style={{ color: 'var(--text-muted)' }}>Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
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
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group"
              style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
            >
              {product.isFeatured && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  Featured
                </span>
              )}
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img 
                  src={product.images[0] || '/placeholder.jpg'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>₹{product.price.toFixed(2)}</span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>₹{product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
                <button
                  className="w-full px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
                >
                  Shop Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
