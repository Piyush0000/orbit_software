'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStorefront } from '@/contexts/StorefrontContext';
import { useCart } from '@/store/cartStore';

export default function FeaturedProducts() {
  const { products } = useStorefront();
  const { addToCart } = useCart();
  
  // Get top 3 featured products
  // In a real scenario you might filter by a 'featured' tag or similar
  // For now we just take the first 3
  const featured = products.slice(0, 3);

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
          {featured.map((product) => (
            <div key={product.id} className="group relative aspect-[3/4] overflow-hidden bg-[var(--card-bg)] cursor-pointer">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image || 'https://via.placeholder.com/600x800'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </Link>

              {/* Badge */}
              {product.stock === false ? (
                <span className="absolute top-6 left-6 bg-[var(--text-primary)] text-[var(--page-bg)] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 w-auto">
                    Out of Stock
                </span>
              ) : product.discount ? (
                <span className="absolute top-6 left-6 bg-[var(--highlight)] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 w-auto">
                  -{product.discount}%
                </span>
              ) : null}

              {/* Minimalist Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-2xl font-heading font-medium text-[var(--accent-color)] mb-2 italic tracking-wide">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg font-light text-[var(--text-primary)]">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[var(--text-muted)] line-through">{product.originalPrice}</span>
                  )}
                </div>

                <Link href={`/products/${product.id}`} className="block w-full text-center border border-[var(--accent-color)] text-[var(--accent-color)] py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--accent-color)] hover:text-black transition-all duration-300">
                  View Details
                </Link>
              </div>
            </div>
          ))}
          {featured.length === 0 && (
            <div className="col-span-3 text-center py-20 text-[var(--text-secondary)]">
                Loading featured products...
            </div>
          )}
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
