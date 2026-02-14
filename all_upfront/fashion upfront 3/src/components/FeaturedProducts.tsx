'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { StorefrontAPI } from '@/lib/api';

interface FeaturedProduct {
  id: number | string;
  name: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  badge?: string;
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
            badge: badge
          };
        });

        setProducts(featured);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products');
        // Set some fallback products in case of error
        setProducts([
          { id: 1, name: 'Loading...', price: '₹0', image: 'https://placehold.co/600x800?text=Loading', badge: '' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section id="featured" className="py-24 bg-[var(--page-bg)]">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-4 border-b border-[var(--card-border)]">
            <div>
              <span className="block text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.2em] mb-2">Curated Selection</span>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-[var(--text-primary)] uppercase tracking-tight">
                Featured Edits
              </h2>
            </div>
            <div className="hidden md:block text-[var(--text-secondary)] uppercase tracking-widest text-sm font-medium">
              Loading Collection &rarr;
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="relative aspect-[3/4] overflow-hidden bg-[var(--card-bg)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <div className="text-[var(--text-primary)] uppercase tracking-widest text-sm font-bold">
              Loading Collection
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="featured" className="py-24 bg-[var(--page-bg)]">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-4 border-b border-[var(--card-border)]">
            <div>
              <span className="block text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.2em] mb-2">Curated Selection</span>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-[var(--text-primary)] uppercase tracking-tight">
                Featured Edits
              </h2>
            </div>
          </div>
          
          <div className="text-center py-12">
            <p className="text-[var(--text-primary)]">Error loading featured products: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-3 rounded-md font-semibold bg-[var(--text-primary)] text-[var(--page-bg)]"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-24 bg-[var(--page-bg)]">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-4 border-b border-[var(--card-border)]">
          <div>
            <span className="block text-[var(--highlight)] text-xs font-bold uppercase tracking-[0.2em] mb-2">Curated Selection</span>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-[var(--text-primary)] uppercase tracking-tight">
              Featured Edits
            </h2>
          </div>
          <Link href="/products" className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-widest text-sm font-medium transition-colors">
            View All Collection &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div className="group relative aspect-[3/4] overflow-hidden bg-[var(--card-bg)] cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-6 left-6 bg-[var(--text-primary)] text-[var(--page-bg)] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                    {product.badge}
                  </span>
                )}

                {/* Minimalist Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <h3 className="text-2xl font-heading font-medium text-[var(--accent-color)] mb-2 italic tracking-wide">{product.name}</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-lg font-light text-[var(--text-primary)]">{product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-[var(--text-muted)] line-through">{product.compareAtPrice}</span>
                    )}
                  </div>

                  <button className="w-full border border-[var(--accent-color)] text-[var(--accent-color)] py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--accent-color)] hover:text-black transition-all duration-300">
                    Add to Bag
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="text-[var(--text-primary)] uppercase tracking-widest text-sm font-bold border-b border-[var(--text-primary)] pb-1">
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
