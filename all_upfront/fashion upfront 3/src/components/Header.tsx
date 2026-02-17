'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductsDropdown from './ProductsDropdown';
import MegaMenu from './MegaMenu';
import ProfileDropdown from './ProfileDropdown';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();
  const { wishlist } = useWishlist();
  const cartItemCount = getTotalItems();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is outside both the products button and the dropdown
      if (productsRef.current && !productsRef.current.contains(target)) {
        const dropdown = document.querySelector('[data-products-dropdown]');
        if (!dropdown || !dropdown.contains(target)) {
          setIsProductsOpen(false);
        }
      }
    };

    if (isProductsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProductsOpen]);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    // Wrap in setTimeout to avoid updating state during render of child components
    setTimeout(() => {
      setActiveFilters(filters);
    }, 0);
    // Scroll to products section when filters are applied
    if (Object.keys(filters).length > 0) {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div
      className="flex flex-col w-full font-sans sticky top-0 z-50 transition-all duration-300"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="bg-[var(--header-bg)] text-[var(--text-secondary)] border-b border-[var(--header-border)] text-[10px] font-medium py-2 text-center px-4 tracking-[0.2em] uppercase relative z-[51]">
        Complimentary Shipping on all orders
      </div>

      <header
        className={`transition-all duration-700 border-b ${isScrolled
          ? 'bg-black/80 backdrop-blur-md border-white/5 py-2'
          : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 sm:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 mr-16 flex items-center">
              <Link href="/" className="text-3xl font-heading font-bold tracking-tight text-[var(--annotated-text-primary)] uppercase">
                Upfront
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 h-full">
              {['Men', 'Women', 'Kids'].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className={`relative flex items-center h-full text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 group ${activeCategory === category ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  onMouseEnter={() => setActiveCategory(category)}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent-color)] transform origin-left transition-transform duration-500 ease-out ${activeCategory === category ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                </Link>
              ))}

              <div ref={productsRef} className="relative group h-full flex items-center">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className={`flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${isProductsOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  Shop All
                  {Object.values(activeFilters).flat().length > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-[var(--accent-color)] text-black ml-1">
                      {Object.values(activeFilters).flat().length}
                    </span>
                  )}
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-8 ml-auto">

              {/* Search (Desktop) */}
              <div className="hidden md:block relative group">
                <input
                  type="text"
                  placeholder="SEARCH"
                  className="w-32 bg-transparent border-b border-transparent py-1 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-primary)] focus:w-64 transition-all duration-300"
                />
                <button className="absolute right-0 top-1 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Profile */}
              <div
                className="relative group hidden md:flex items-center"
                onMouseEnter={() => setIsMenuOpen(false)}
              >
                <Link href="/profile" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2" aria-label="Account">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                {/* Dropdown Container */}
                <div className="absolute right-0 top-[100%] pt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <div className="bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl">
                    <ProfileDropdown />
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden md:block p-2"
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span
                    className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-[var(--highlight)] text-black"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-[var(--text-primary)] hover:text-[var(--highlight)] transition-colors p-2 flex items-center gap-2"
                aria-label="Shopping cart"
              >
                <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">Cart</span>
                <span className="text-xs font-bold">({cartItemCount})</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-[var(--text-primary)]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-8 space-y-8 bg-[var(--page-bg)] border-t border-[var(--card-border)] absolute left-0 right-0 px-6 shadow-2xl h-screen overflow-y-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  className="w-full bg-transparent border-b border-[var(--text-secondary)] py-4 text-lg font-heading uppercase text-[var(--text-primary)] outline-none placeholder-[var(--text-secondary)]"
                />
              </div>

              <div className="flex flex-col gap-6">
                <Link href="/" className="text-3xl font-heading font-bold uppercase text-[var(--text-primary)] hover:text-[var(--highlight)]">Home</Link>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full text-3xl font-heading font-bold uppercase text-[var(--text-primary)] hover:text-[var(--highlight)]"
                >
                  Collections
                  <svg className={`w-6 h-6 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <a href="#featured" className="text-3xl font-heading font-bold uppercase text-[var(--text-primary)] hover:text-[var(--highlight)]">New Arrivals</a>
                <Link href="/about" className="text-3xl font-heading font-bold uppercase text-[var(--text-primary)] hover:text-[var(--highlight)]">About</Link>
              </div>

              <div className="pt-8 border-t border-[var(--card-border)] space-y-4">
                <Link
                  href="/profile"
                  className="block text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link href="/wishlist" className="block text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                  Wishlist ({wishlistCount})
                </Link>
                <Link href="/cart" className="block text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                  Cart ({cartItemCount})
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mega Menu Overlay */}
      {activeCategory && (
        <MegaMenu
          category={activeCategory}
          isOpen={!!activeCategory}
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        />
      )}

      {/* Products Dropdown Overlay */}
      {isProductsOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsProductsOpen(false)}
            style={{ top: '0px' }}
          ></div>
          <div
            className="fixed z-50 bg-[var(--page-bg)] border-b border-[var(--card-border)] shadow-2xl overflow-hidden"
            data-products-dropdown
            style={{
              top: '100px',
              left: '0',
              right: '0',
              width: '100%',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[1920px] mx-auto">
              <ProductsDropdown onFilterChange={handleFilterChange} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
