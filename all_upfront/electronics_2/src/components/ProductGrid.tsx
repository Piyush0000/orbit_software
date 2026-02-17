'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { Product } from '@/types/product';
import { usdToInr, parseINRToNumber } from '@/lib/utils';
import { products as allProducts } from '@/data/products';

// Define filter state locally
interface FilterState {
  category: string[];
  brand: string[];
  price: string[];
  availability: string[];
}

export default function ProductGrid() {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    category: [],
    brand: [],
    price: [],
    availability: [],
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const categories = ['Audio', 'Wearables', 'Accessories', 'Computers'];
  const brands = ['Premium', 'Smart', 'Wireless', 'Pro', 'Elite'];
  const prices = ['₹0 - ₹4,000', '₹4,000 - ₹8,000', '₹8,000 - ₹16,000', '₹16,000+'];
  const availability = ['In Stock', 'Out of Stock'];

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setActiveFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      brand: [],
      price: [],
      availability: []
    });
  };

  const handleAddToCart = (product: Product) => {
    const priceInINRNum = parseINRToNumber(product.price);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: priceInINRNum,
      image: product.image,
      shortDescription: product.description,
    }, 1);
  };

  // Derive filtered and sorted products
  const displayedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // 1. Search Filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    // 2. Filters
    // Category
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(p => activeFilters.category.includes(p.category));
    }
    // Brand
    if (activeFilters.brand.length > 0) {
      filtered = filtered.filter(p => activeFilters.brand.includes(p.brand));
    }
    // Availability
    if (activeFilters.availability.length > 0) {
      if (activeFilters.availability.includes('In Stock')) {
        filtered = filtered.filter(p => p.stock);
      }
      if (activeFilters.availability.includes('Out of Stock')) {
        filtered = filtered.filter(p => !p.stock);
      }
    }
    // Price
    if (activeFilters.price.length > 0) {
      filtered = filtered.filter(p => {
        const priceInINR = usdToInr(p.priceNum);
        return activeFilters.price.some(range => {
          if (range === '₹0 - ₹4,000') return priceInINR <= 4000;
          if (range === '₹4,000 - ₹8,000') return priceInINR > 4000 && priceInINR <= 8000;
          if (range === '₹8,000 - ₹16,000') return priceInINR > 8000 && priceInINR <= 16000;
          if (range === '₹16,000+') return priceInINR > 16000;
          return false;
        });
      });
    }

    // 3. Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.priceNum - b.priceNum;
        case 'price_high':
          return b.priceNum - a.priceNum;
        case 'newest':
          return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
        case 'popular':
        default:
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return filtered;
  }, [activeFilters, searchQuery, sortBy]);

  return (
    <section
      id="products"
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: 'var(--section-alt)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading" style={{ color: 'var(--text)' }}>
            Our Products
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
            Discover our curated collection of premium products
          </p>

          {/* Search, Sort, and Filter Controls */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-1 transition-all placeholder-gray-500"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    '--tw-ring-color': 'var(--accent-blue)',
                    '--tw-border-opacity': '0.2'
                  } as React.CSSProperties}
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: 'var(--text-muted)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-lg border flex items-center gap-2 font-medium transition-colors hover:border-[var(--accent-blue)]`}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: showFilters ? 'var(--accent-blue)' : 'var(--card-border)',
                  color: 'var(--text)'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
                {(Object.values(activeFilters).flat().length > 0) && (
                  <span className="bg-[var(--accent-blue)] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(activeFilters).flat().length}
                  </span>
                )}
              </button>

              {/* Sorting Dropdown */}
              <div className="md:w-48 transition-all hover:border-[var(--accent-blue)] rounded-lg">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border appearance-none focus:outline-none focus:ring-1 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    '--tw-ring-color': 'var(--accent-blue)',
                  } as React.CSSProperties}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Collapsible Filter Panel */}
            {showFilters && (
              <div className="p-6 rounded-lg border mb-4 animate-fadeIn glass" style={{ borderColor: 'var(--card-border)' }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>Refine Selection</h3>
                  <button onClick={clearFilters} className="text-sm text-red-400 hover:text-red-300 hover:underline">Clear All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Category */}
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--accent-blue)' }}>Category</h4>
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={activeFilters.category.includes(cat)}
                            onChange={() => toggleFilter('category', cat)}
                            className="rounded border-gray-600 bg-black/50 text-[var(--accent-blue)] focus:ring-[var(--accent-blue)]"
                          />
                          <span className="group-hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--accent-green)' }}>Price</h4>
                    <div className="space-y-2">
                      {prices.map(price => (
                        <label key={price} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={activeFilters.price.includes(price)}
                            onChange={() => toggleFilter('price', price)}
                            className="rounded border-gray-600 bg-black/50 text-[var(--accent-green)] focus:ring-[var(--accent-green)]"
                          />
                          <span className="group-hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--accent-purple)' }}>Brand</h4>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={activeFilters.brand.includes(brand)}
                            onChange={() => toggleFilter('brand', brand)}
                            className="rounded border-gray-600 bg-black/50 text-[var(--accent-purple)] focus:ring-[var(--accent-purple)]"
                          />
                          <span className="group-hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--text)' }}>Availability</h4>
                    <div className="space-y-2">
                      {availability.map(status => (
                        <label key={status} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={activeFilters.availability.includes(status)}
                            onChange={() => toggleFilter('availability', status)}
                            className="rounded border-gray-600 bg-black/50 text-white focus:ring-white"
                          />
                          <span className="group-hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Tags */}
            {Object.values(activeFilters).flat().length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).flatMap(([type, values]) =>
                  values.map((value: string) => (
                    <span key={`${type}-${value}`} className="px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 bg-[rgba(0,240,255,0.1)] text-[var(--accent-blue)] border border-[var(--accent-blue)]">
                      {value}
                      <button onClick={() => toggleFilter(type as keyof FilterState, value)} className="hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid - Full Width */}
        <div className="w-full">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-dashed glass" style={{ borderColor: 'var(--card-border)' }}>
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>No products found</h3>
              <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
                We couldn&apos;t find any products matching your current filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); clearFilters(); }}
                className="px-6 py-2 rounded-lg font-bold transition-all hover:bg-[var(--accent-cyan)] bg-[var(--accent-blue)] text-black"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 border flex flex-col group relative glass"
                  style={{ borderColor: 'var(--card-border)' }}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square bg-[#050505] overflow-hidden cursor-pointer relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {!product.stock && (
                        <div className="absolute top-2 right-2 bg-red-600/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded z-10">
                          OUT OF STOCK
                        </div>
                      )}
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-[var(--accent-green)] text-black text-xs font-bold px-2 py-1 rounded z-10 shadow-[0_0_10px_rgba(0,255,148,0.5)]">
                          {product.discount}% OFF
                        </div>
                      )}

                      {/* Quick Actions Overlay */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInWishlist(product.id)) {
                              removeFromWishlist(product.id);
                            } else {
                              addToWishlist(product);
                            }
                          }}
                          className="p-2 bg-black/50 backdrop-blur text-white rounded-full hover:bg-[var(--accent-purple)] hover:text-white transition-colors border border-white/10"
                          title="Add to Wishlist"
                        >
                          <svg
                            className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-[var(--accent-purple)] text-[var(--accent-purple)]' : ''}`}
                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-[var(--accent-cyan)] border border-white/5">
                        {product.category}
                      </span>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-bold mb-1 hover:text-[var(--accent-blue)] transition-colors cursor-pointer line-clamp-1" style={{ color: 'var(--text)' }}>{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center text-[var(--accent-purple)]">
                        <span className="text-sm">★</span>
                        <span className="text-xs font-medium text-[var(--text-muted)] ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold neon-text-blue" style={{ color: 'var(--text)' }}>{product.price}</span>
                        {product.originalPrice && <span className="text-xs line-through text-[var(--text-muted)]">{product.originalPrice}</span>}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.stock}
                        className="px-4 py-2 rounded font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Results Count */}
          {displayedProducts.length > 0 && (
            <div className="mt-8 text-right text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              Showing <span className="text-white">{displayedProducts.length}</span> product{displayedProducts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
