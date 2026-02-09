'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { Product } from '@/types/product';
import { parseINRToNumber } from '@/lib/utils';
import { useStorefront } from '@/contexts/StorefrontContext';

// Define filter state locally
interface FilterState {
  category: string[];
  brand: string[];
  price: string[];
  availability: string[];
  size: string[];
  rating: string[];
}

export default function ProductGrid() {
  const searchParams = useSearchParams(); // Hook to read URL params

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    category: [],
    brand: [],
    price: [],
    availability: [],
    size: [],
    rating: [],
  });

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setActiveFilters(prev => {
        if (prev.category.includes(categoryParam)) return prev;
        return {
          ...prev,
          category: [categoryParam]
        };
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const handleFilterChange = (event: Event) => {
      const detail = (event as CustomEvent).detail as FilterState;
      if (detail) {
        setActiveFilters({
          category: enabledFilterSet.has('category') ? detail.category || [] : [],
          brand: enabledFilterSet.has('brand') ? detail.brand || [] : [],
          price: enabledFilterSet.has('price') ? detail.price || [] : [],
          availability: enabledFilterSet.has('availability') ? detail.availability || [] : [],
          size: enabledFilterSet.has('size') ? detail.size || [] : [],
          rating: enabledFilterSet.has('rating') ? detail.rating || [] : []
        });
      }
    };
    window.addEventListener('filterChange', handleFilterChange);
    return () => window.removeEventListener('filterChange', handleFilterChange);
  }, [enabledFilters]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProductForSize, setSelectedProductForSize] = useState<Product | null>(null);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products: allProducts, categories, brands, loading, categoryConfig } = useStorefront();
  const enabledFilters = (categoryConfig as { filters?: string[] } | null)?.filters || ['category', 'brand', 'price', 'availability', 'size', 'rating'];
  const enabledFilterSet = new Set(enabledFilters);
  const prices = ['₹0 - ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹10,000', '₹10,000+'];
  const availability = ['In Stock', 'Out of Stock'];
  const sizeOptions = Array.from(new Set(allProducts.flatMap((product) => product.sizes || []))).filter(Boolean);
  const sizes = sizeOptions.length ? sizeOptions : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

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
      availability: [],
      size: [],
      rating: []
    });
  };

  const handleAddToCart = (product: Product, size?: string) => {
    // If product has sizes and no size is selected, open modal
    if (product.sizes && product.sizes.length > 0 && !size) {
      setSelectedProductForSize(product);
      setShowSizeModal(true);
      return;
    }

    const priceInINRNum = parseINRToNumber(product.price);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: priceInINRNum,
      image: product.image,
      shortDescription: product.description,
      size: size
    }, 1);

    // Close modal if open
    setShowSizeModal(false);
    setSelectedProductForSize(null);
  };

  // Derive filtered and sorted products
  const displayedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // 0. Subcategory Filtering (from URL)
    const subcategoryParam = searchParams.get('subcategory');
    if (subcategoryParam) {
      const term = subcategoryParam.toLowerCase();
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === searchParams.get('category')?.toLowerCase() && (
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term))) ||
          product.category.toLowerCase().includes(term) // Fallback
        ));
    }

    // 1. Search Filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
          (product.brand || '').toLowerCase().includes(query)
      );
    }

    // 2. Filters
    // Category
    if (enabledFilterSet.has('category') && activeFilters.category.length > 0) {
      filtered = filtered.filter(p => activeFilters.category.includes(p.category));
    }
    // Brand
    if (enabledFilterSet.has('brand') && activeFilters.brand.length > 0) {
      filtered = filtered.filter(p => p.brand && activeFilters.brand.includes(p.brand));
    }
    // Size
    if (enabledFilterSet.has('size') && activeFilters.size.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes && p.sizes.some(s => activeFilters.size.includes(s))
      );
    }
    // Availability
    if (enabledFilterSet.has('availability') && activeFilters.availability.length > 0) {
      if (activeFilters.availability.includes('In Stock')) {
        filtered = filtered.filter(p => p.stock);
      }
      if (activeFilters.availability.includes('Out of Stock')) {
        filtered = filtered.filter(p => !p.stock);
      }
    }
    // Rating
    if (enabledFilterSet.has('rating') && activeFilters.rating.length > 0) {
      filtered = filtered.filter(p => {
        const rating = p.rating || 0;
        return activeFilters.rating.some((range) => {
          if (range === '4+ Stars') return rating >= 4;
          if (range === '3+ Stars') return rating >= 3;
          if (range === '2+ Stars') return rating >= 2;
          if (range === '1+ Stars') return rating >= 1;
          return false;
        });
      });
    }
    // Price
    if (enabledFilterSet.has('price') && activeFilters.price.length > 0) {
      filtered = filtered.filter(p => {
        const priceInINR = p.priceNum;
        return activeFilters.price.some(range => {
          if (range === '₹0 - ₹2,000') return priceInINR <= 2000;
          if (range === '₹2,000 - ₹5,000') return priceInINR > 2000 && priceInINR <= 5000;
          if (range === '₹5,000 - ₹10,000') return priceInINR > 5000 && priceInINR <= 10000;
          if (range === '₹10,000+') return priceInINR > 10000;
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
  }, [activeFilters, searchQuery, sortBy, searchParams, allProducts, enabledFilters]);

  return (
    <section
      id="products"
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: 'var(--section-alt)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
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
                  className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                  }}
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
                className={`px-6 py-3 rounded-lg border flex items-center gap-2 font-medium transition-colors ${showFilters ? 'ring-2 ring-offset-1' : ''}`}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  color: 'var(--text)'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
                {(Object.values(activeFilters).flat().length > 0) && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(activeFilters).flat().length}
                  </span>
                )}
              </button>

              {/* Sorting Dropdown */}
              <div className="md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border appearance-none focus:outline-none focus:ring-2 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                  }}
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
              <div className="p-6 rounded-lg border mb-4 animate-fadeIn" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text)' }}>Refine Selection</h3>
                  <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">Clear All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {enabledFilterSet.has('category') && (
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text)' }}>Category</h4>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeFilters.category.includes(cat)}
                              onChange={() => toggleFilter('category', cat)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span style={{ color: 'var(--text-muted)' }}>{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {enabledFilterSet.has('size') && (
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text)' }}>Size</h4>
                      <div className="space-y-2">
                        {sizes.map(size => (
                          <label key={size} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeFilters.size.includes(size)}
                              onChange={() => toggleFilter('size', size)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span style={{ color: 'var(--text-muted)' }}>{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {enabledFilterSet.has('price') && (
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text)' }}>Price</h4>
                      <div className="space-y-2">
                        {prices.map(price => (
                          <label key={price} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeFilters.price.includes(price)}
                              onChange={() => toggleFilter('price', price)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span style={{ color: 'var(--text-muted)' }}>{price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {enabledFilterSet.has('brand') && (
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text)' }}>Brand</h4>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeFilters.brand.includes(brand)}
                              onChange={() => toggleFilter('brand', brand)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span style={{ color: 'var(--text-muted)' }}>{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {enabledFilterSet.has('availability') && (
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: 'var(--text)' }}>Availability</h4>
                      <div className="space-y-2">
                        {availability.map(status => (
                          <label key={status} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeFilters.availability.includes(status)}
                              onChange={() => toggleFilter('availability', status)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span style={{ color: 'var(--text-muted)' }}>{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Active Filters Tags */}
            {Object.values(activeFilters).flat().length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).flatMap(([type, values]) =>
                  values.map((value: string) => (
                    <span key={`${type}-${value}`} className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 bg-blue-100 text-blue-800">
                      {value}
                      <button onClick={() => toggleFilter(type as keyof FilterState, value)} className="hover:text-blue-600">
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
          {loading ? (
            <div className="text-center py-20 rounded-lg border border-dashed" style={{ borderColor: 'var(--card-border)' }}>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Loading products...</h3>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-dashed" style={{ borderColor: 'var(--card-border)' }}>
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>No products found</h3>
              <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
                We couldn&apos;t find any products matching your current filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); clearFilters(); }}
                className="px-6 py-2 rounded-lg font-medium transition-colors hover:opacity-90 bg-blue-600 text-white"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border flex flex-col"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square bg-gray-200 overflow-hidden cursor-clothing relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {!product.stock && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                          OUT OF STOCK
                        </div>
                      )}
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                          {product.discount}% OFF
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist(product);
                          }
                        }}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110"
                      >
                        <svg
                          className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                          fill={isInWishlist(product.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </Link>
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600" style={{ backgroundColor: 'var(--section-alt)', color: 'var(--text-muted)' }}>
                        {product.category}
                      </span>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-semibold mb-1 hover:underline cursor-pointer" style={{ color: 'var(--text)' }}>{product.name}</h3>
                    </Link>
                    {product.rating !== undefined && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center text-yellow-400">
                          <span className="text-sm">★</span>
                          <span className="text-sm text-gray-600 ml-1" style={{ color: 'var(--text-muted)' }}>{product.rating}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>{product.price}</span>
                        {product.originalPrice && <span className="text-sm line-through text-gray-400">{product.originalPrice}</span>}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.stock}
                        className="px-4 py-2 rounded-md font-medium transition-opacity hover:opacity-90 text-sm disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white"
                        style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
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
            <div className="mt-6 text-right text-sm" style={{ color: 'var(--text-muted)' }}>
              Showing {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Size Selection Side Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showSizeModal && selectedProductForSize ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--card-bg)', borderLeft: '1px solid var(--card-border)' }}
      >
        {selectedProductForSize && (
          <div className="h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-red-600 font-bold text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Please Select a Size
              </h3>
              <button
                onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProductForSize.image}
                  alt={selectedProductForSize.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm line-clamp-2" style={{ color: 'var(--text)' }}>{selectedProductForSize.name}</h4>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-muted)' }}>{selectedProductForSize.price}</p>
              </div>
            </div>

            <div className="flex-grow">
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>Available Sizes:</p>
              <div className="grid grid-cols-3 gap-3">
                {selectedProductForSize.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleAddToCart(selectedProductForSize, size)}
                    className="py-3 px-2 text-sm font-bold border rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-200 active:scale-95 text-center"
                    style={{ borderColor: 'var(--card-border)', color: 'var(--text)' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowSizeModal(false);
                setSelectedProductForSize(null);
              }}
              className="w-full py-3 mt-auto text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Backdrop for Drawer (Invisible - click to close) */}
      {showSizeModal && (
        <div
          className="fixed inset-0 z-40 transition-opacity"
          onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
        ></div>
      )}
    </section>
  );
}
