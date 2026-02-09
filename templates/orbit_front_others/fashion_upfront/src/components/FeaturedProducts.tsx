'use client';

import { useStorefront } from '@/contexts/StorefrontContext';

export default function FeaturedProducts() {
  const { products, loading } = useStorefront();
  const featured = products.filter((product) => product.isFeatured);
  const fallback = [...products].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 3);
  const featuredProducts = featured.length ? featured.slice(0, 3) : fallback;
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
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Loading featured products...</div>
          ) : (
            featuredProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group"
              style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>{product.originalPrice}</span>
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
          ))
          )}
        </div>
      </div>
    </section>
  );
}
