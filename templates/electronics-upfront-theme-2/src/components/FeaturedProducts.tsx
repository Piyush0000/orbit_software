'use client';

import { useMemo } from 'react';
import { useStorefront } from '@/contexts/StorefrontContext';

export default function FeaturedProducts() {
  const { products, loading } = useStorefront();
  const featuredProducts = useMemo(() => {
    const featured = products.filter((product) => product.isFeatured);
    const base = featured.length ? featured : products;
    return [...base]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 3);
  }, [products]);

  return (
    <section
      id="featured"
      className="py-16 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.05),_transparent_40%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 font-heading tracking-tight" style={{ color: 'var(--text)' }}>
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]">Selection</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Handpicked favorites from our collection
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 rounded-lg border" style={{ borderColor: 'var(--card-border)' }}>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Loading featured products...</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 border group glass"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="aspect-square bg-black/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold neon-text-blue" style={{ color: 'var(--text)' }}>{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-gray-500">{product.originalPrice}</span>
                  )}
                </div>
                <button
                  className="w-full px-6 py-3 rounded font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-[1.02] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                >
                  Shop Now
                </button>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
