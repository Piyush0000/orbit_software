'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveFilters(prev => ({
        ...prev,
        category: [categoryParam]
      }));
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
    let filtered = [...allProducts];

    const subcategoryParam = searchParams.get('subcategory');
    if (subcategoryParam) {
      const term = subcategoryParam.toLowerCase();
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === searchParams.get('category')?.toLowerCase() && (
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term))) ||
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
        p.sizes && p.sizes.some(s => activeFilters.size.includes(s))
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
  }, [activeFilters, searchQuery, sortBy, searchParams]);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-black uppercase tracking-tight">
              Latest Drops
            </h2>
            <p className="text-zinc-500 max-w-md font-light">
              Explore the season's most coveted pieces, curated for the modern wardrobe.
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
                className="w-full sm:w-64 bg-transparent border-b border-zinc-300 py-2 pl-0 text-sm focus:outline-none focus:border-black transition-all placeholder-zinc-400"
              />
              <svg className="absolute right-0 top-2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-2 border border-zinc-200 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all ${showFilters ? 'bg-black text-white' : 'text-black'}`}
            >
              Filters {(Object.values(activeFilters).flat().length > 0) && `(${Object.values(activeFilters).flat().length})`}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-transparent border-b border-zinc-300 text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
          <div className="bg-zinc-50 p-8">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-200 pb-4">
              <h3 className="font-heading text-lg text-black uppercase">Refine Selection</h3>
              <button onClick={clearFilters} className="text-xs font-bold underline text-zinc-500 hover:text-black uppercase tracking-wide">Clear All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: 'Category', items: categories, key: 'category' as keyof FilterState },
                { title: 'Price', items: prices, key: 'price' as keyof FilterState },
                { title: 'Brand', items: brands, key: 'brand' as keyof FilterState },
                { title: 'Size', items: sizes, key: 'size' as keyof FilterState },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4">{section.title}</h4>
                  <div className="space-y-2.5">
                    {section.items.map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${activeFilters[section.key].includes(item) ? 'bg-black border-black' : 'border-zinc-300 group-hover:border-black'}`}>
                          {activeFilters[section.key].includes(item) && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={activeFilters[section.key].includes(item)}
                          onChange={() => toggleFilter(section.key, item)}
                        />
                        <span className={`text-sm transition-colors ${activeFilters[section.key].includes(item) ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>{item}</span>
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
          {displayedProducts.length === 0 ? (
            <div className="text-center py-32 bg-zinc-50">
              <h3 className="text-2xl font-heading uppercase mb-2">No items match your search</h3>
              <p className="text-zinc-500 mb-6 font-light">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {displayedProducts.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden mb-4">
                    <Link href={`/products/${product.id}`} className="block w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </Link>

                    {/* Tags */}
                    {(product.stock === false) && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                        Out of Stock
                      </span>
                    )}
                    {product.discount && (
                      <span className="absolute top-3 right-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                        -{product.discount}%
                      </span>
                    )}

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hidden md:block">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.stock}
                        className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {product.sizes?.length ? 'Select Size' : 'Quick Add'}
                      </button>
                    </div>

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
                      className="absolute top-3 right-3 p-2 text-black hover:text-red-500 transition-colors z-20 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <svg
                        className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-black'}`}
                        fill={isInWishlist(product.id) ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <Link href={`/products/${product.id}`} className="group-hover:underline decoration-1 underline-offset-4">
                        <h3 className="text-sm font-bold text-black uppercase tracking-wide leading-tight">{product.name}</h3>
                      </Link>
                      <span className="text-sm font-medium text-black">{product.price}</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">{product.brand}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {displayedProducts.length > 0 && (
            <div className="mt-12 text-center">
              <span className="text-xs text-zinc-400 uppercase tracking-widest">Showing {displayedProducts.length} Products</span>
            </div>
          )}
        </div>
      </div>

      {/* Size Selection Modal/Drawer */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showSizeModal && selectedProductForSize ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
        ></div>

        {selectedProductForSize && (
          <div className="bg-white w-full max-w-sm relative z-10 p-6 shadow-2xl animate-fade-in-up">
            <button
              onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex gap-4 mb-6">
              <div className="relative w-20 h-24 bg-zinc-100 flex-shrink-0">
                <Image
                  src={selectedProductForSize.image}
                  alt={selectedProductForSize.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-1">{selectedProductForSize.name}</h3>
                <p className="text-sm text-zinc-600">{selectedProductForSize.price}</p>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Select Size</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {selectedProductForSize.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => handleAddToCart(selectedProductForSize, size)}
                  className="h-10 border border-zinc-200 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all focus:bg-black focus:text-white"
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setShowSizeModal(false); setSelectedProductForSize(null); }}
              className="w-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
