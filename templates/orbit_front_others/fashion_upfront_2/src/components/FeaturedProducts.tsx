'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
        // Get featured products or first 3 products
        const featured = products.filter(p => p.isFeatured && p.isActive).slice(0, 3);
        if (featured.length === 0) {
          // Fallback to first 3 active products if no featured products
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
      <section id="featured" className="py-20 bg-zinc-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center py-12">
            <p className="text-zinc-500">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section id="featured" className="py-20 bg-zinc-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Curated Selection</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-black uppercase tracking-tight mb-4">
            Featured Edits
          </h2>
          <div className="h-[1px] w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-200 mb-6">
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.isFeatured && (
                  <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                    Featured
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-8 bg-gradient-to-t from-black/50 to-transparent">
                  <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-heading uppercase text-black mb-1">{product.name}</h3>
                <div className="flex justify-center items-center gap-3 text-sm">
                  <span className="font-bold text-black">₹{product.price.toFixed(2)}</span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-zinc-500 line-through decoration-zinc-400">₹{product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
