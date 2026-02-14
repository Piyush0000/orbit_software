'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { Product } from '@/types/product';
import { usdToInr, parseINRToNumber } from '@/lib/utils';
import { StorefrontAPI } from '@/lib/api';

// Define filter state locally
interface FilterState {
  category: string[];
  brand: string[];
  price: string[];
  availability: string[];
  size: string[];
}

export default function ProductGrid() {
  const searchParams = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    category: [],
    brand: [],
    price: [],
    availability: [],
    size: [],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await StorefrontAPI.getProducts();
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // eslint-disable-next-line
      setActiveFilters(prev => {
        if (prev.category.includes(categoryParam)) return prev;
        return {
          ...prev,
          category: [categoryParam]
        };
      });
    }
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProductForSize, setSelectedProductForSize] = useState<Product | null>(null);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const categories = ['Men', 'Women', 'Kids'];
  const brands = ['H&M', 'Levi\'s', 'Zara', 'Gucci', 'Nike', 'Woodland', 'Mothercare', 'Ray-Ban'];
  const prices = ['₹0 - ₹2,000', '₹2,000 - ₹5,000', '₹5,000 - ₹10,000', '₹10,000+'];
  const availability = ['In Stock', 'Out of Stock'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

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
      size: []
    });
  };

  const handleAddToCart = (product: Product, size?: string) => {
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

    setShowSizeModal(false);
    setSelectedProductForSize(null);
  };

  // Derive filtered and sorted products
  const displayedProducts = useMemo(() => {
    let filtered = [...products];

    const subcategoryParam = searchParams.get('subcategory');
    if (subcategoryParam) {
      const term = subcategoryParam.toLowerCase();
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === searchParams.get('category')?.toLowerCase() && (
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(term))) ||
          product.category.toLowerCase().includes(term)
        ));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(p => activeFilters.category.includes(p.category));
    }
    if (activeFilters.brand.length > 0) {
      filtered = filtered.filter(p => activeFilters.brand.includes(p.brand));
    }
    if (activeFilters.size.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes && p.sizes.some((s: string) => activeFilters.size.includes(s))
      );
    }
    if (activeFilters.availability.length > 0) {
      if (activeFilters.availability.includes('In Stock')) {
        filtered = filtered.filter(p => p.stock);
      }
      if (activeFilters.availability.includes('Out of Stock')) {
        filtered = filtered.filter(p => !p.stock);
      }
    }
    if (activeFilters.price.length > 0) {
      filtered = filtered.filter(p => {
        const priceInINR = usdToInr(p.priceNum);
        return activeFilters.price.some(range => {
          if (range === '₹0 - ₹2,000') return priceInINR <= 2000;
          if (range === '₹2,000 - ₹5,000') return priceInINR > 2000 && priceInINR <= 5000;
          if (range === '₹5,000 - ₹10,000') return priceInINR > 5000 && priceInINR <= 10000;
          if (range === '₹10,000+') return priceInINR > 10000;
          return false;
        });
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low': return a.priceNum - b.priceNum;
        case 'price_high': return b.priceNum - a.priceNum;
        case 'newest': return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
        case 'popular': default: return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return filtered;
  }, [activeFilters, searchQuery, sortBy, searchParams, products]);

  return (
    <section id="products" className="py-20 bg-[var(--page-bg)]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-[var(--text-primary)] uppercase tracking-tight">
              Latest Drops
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md font-light">
              Explore the season&apos;s most coveted pieces, curated for the modern wardrobe.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative group flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-transparent border-b border-[var(--header-border)] py-2 pl-0 text-sm focus:outline-none focus:border-[var(--text-primary)] transition-all placeholder-[var(--text-muted)] text-[var(--text-primary)]"
              />
              <svg className="absolute right-0 top-2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-2 border border-[var(--card-border)] text-sm font-bold uppercase tracking-wider hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-all ${showFilters ? 'bg-[var(--text-primary)] text-[var(--page-bg)]' : 'text-[var(--text-primary)]'}`}
            >
              Filters {(Object.values(activeFilters).flat().length > 0) && `(${Object.values(activeFilters).flat().length})`}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-transparent border-b border-[var(--header-border)] text-[var(--text-primary)] text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[var(--card-bg)]">Popular</option>
              <option value="newest" className="bg-[var(--card-bg)]">Newest</option>
              <option value="price_low" className="bg-[var(--card-bg)]">Price: Low to High</option>
              <option value="price_high" className="bg-[var(--card-bg)]">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
          <div className="bg-[var(--card-bg)] p-8">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--card-border)] pb-4">
              <h3 className="font-heading text-lg text-[var(--text-primary)] uppercase">Refine Selection</h3>
              <button onClick={clearFilters} className="text-xs font-bold underline text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-wide">Clear All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: 'Category', items: categories, key: 'category' as keyof FilterState },
                { title: 'Price', items: prices, key: 'price' as keyof FilterState },
                { title: 'Brand', items: brands, key: 'brand' as keyof FilterState },
                { title: 'Size', items: sizes, key: 'size' as keyof FilterState },
                { title: 'Availability', items: availability, key: 'availability' as keyof FilterState },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">{section.title}</h4>
                  <div className="space-y-2.5">
                    {section.items.map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${activeFilters[section.key].includes(item) ? 'bg-[var(--highlight)] border-[var(--highlight)]' : 'border-[var(--text-muted)] group-hover:border-[var(--text-primary)]'}`}>
                          {activeFilters[section.key].includes(item) && <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={activeFilters[section.key].includes(item)}
                          onChange={() => toggleFilter(section.key, item)}
                        />
                        <span className={`text-sm transition-colors ${activeFilters[section.key].includes(item) ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-32 bg-[var(--section-alt)]">
              <h3 className="text-2xl font-heading uppercase mb-2 text-[var(--text-primary)]">Error Loading Products</h3>
              <p className="text-[var(--text-secondary)] mb-6 font-light">{error}</p>
              <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[var(--text-primary)] text-[var(--page-bg)] text-sm font-bold uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-colors">
                Retry
              </button>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-32 bg-[var(--section-alt)]">
              <h3 className="text-2xl font-heading uppercase mb-2 text-[var(--text-primary)]">No items match your search</h3>
              <p className="text-[var(--text-secondary)] mb-6 font-light">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="px-8 py-3 bg-[var(--text-primary)] text-[var(--page-bg)] text-sm font-bold uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {displayedProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col bg-[var(--card-bg)] aspect-[3/4] overflow-hidden">
                  {/* Image Container */}
                  <div className="absolute inset-0 z-0">
                    <Link href={`/products/${product.id}`} className="block w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </Link>
                  </div>

                  {/* Badges */}
                  {(product.stock === false) && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                      Out of Stock
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-4 right-4 bg-[var(--highlight)] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                      -{product.discount}%
                    </span>
                  )}

                  {/* Minimalist Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10 pointer-events-none" />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                    className="absolute top-4 right-14 p-2 text-white/70 hover:text-red-500 transition-colors z-20 opacity-0 group-hover:opacity-100"
                  >
                    <svg
                      className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-current'}`}
                      fill={isInWishlist(product.id) ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Link href={`/products/${product.id}`} className="group-hover:underline decoration-1 underline-offset-4 decoration-white">
                      <h3 className="text-xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-2">{product.name}</h3>
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      <span className="text-xs text-gray-300 font-medium uppercase tracking-wide opacity-80">{product.brand}</span>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.stock}
                      className="w-full py-4 bg-[var(--highlight)] text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75"
                    >
                      {product.sizes?.length ? 'Select Size' : 'Quick Add'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && displayedProducts.length > 0 && (
            <div className="mt-12 text-center">
              <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Showing {displayedProducts.length} Products</span>
            </div>
          )}
        </div>
      </div>

      {/* Size Selection Modal/Drawer */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showSizeModal && selectedProductForSize ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
        ></div>

        {selectedProductForSize && (
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] w-full max-w-sm relative z-10 p-6 shadow-2xl animate-fade-in-up">
            <button
              onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex gap-4 mb-6">
              <div className="relative w-20 h-24 bg-[var(--section-alt)] flex-shrink-0">
                <Image
                  src={selectedProductForSize.image}
                  alt={selectedProductForSize.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-1 text-[var(--text-primary)]">{selectedProductForSize.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{selectedProductForSize.price}</p>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Select Size</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {selectedProductForSize.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => handleAddToCart(selectedProductForSize, size)}
                  className="h-10 border border-[var(--card-border)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-all focus:bg-[var(--text-primary)] focus:text-[var(--page-bg)]"
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
              className="w-full text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
