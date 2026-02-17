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
    setActiveFilters(filters);
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
      {/* Top Banner - Premium Minimalist */}
      <div className="bg-zinc-950 text-white text-[10px] md:text-xs font-bold py-2.5 text-center px-4 tracking-[0.15em] uppercase relative z-[51]">
        Free Shipping on all orders over ₹500 | Use Code: <span className="text-highlight">UPFRONT20</span>
      </div>

      <header
        className={`bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'border-b border-transparent'
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0 mr-12 flex items-center">
              <Link href="/" className="text-4xl font-heading font-medium tracking-tighter text-black uppercase">
                Upfront
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 h-full">
              {['Men', 'Women', 'Kids'].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className={`relative flex items-center h-full text-sm font-bold uppercase tracking-widest transition-colors duration-200 group ${activeCategory === category ? 'text-black' : 'text-zinc-500 hover:text-black'
                    }`}
                  onMouseEnter={() => setActiveCategory(category)}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-black transform origin-left transition-transform duration-300 ${activeCategory === category ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                </Link>
              ))}

              <div ref={productsRef} className="relative group h-full flex items-center">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${isProductsOpen ? 'text-black' : 'text-zinc-500 hover:text-black'
                    }`}
                >
                  All Products
                  {Object.values(activeFilters).flat().length > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-black text-white">
                      {Object.values(activeFilters).flat().length}
                    </span>
                  )}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6 md:gap-8 ml-auto">

              {/* Search (Desktop) */}
              <div className="hidden md:block relative group">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-48 border-b border-zinc-300 py-1.5 bg-transparent text-sm placeholder-zinc-400 focus:outline-none focus:border-black transition-all duration-300 focus:w-64"
                />
                <svg className="absolute right-0 top-1.5 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Profile */}
              <div
                className="relative group hidden md:flex items-center"
                onMouseEnter={() => setIsMenuOpen(false)}
              >
                <Link href="/profile" className="text-zinc-800 hover:text-black transition-colors" aria-label="Account">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                {/* Dropdown Container */}
                <div className="absolute right-0 top-[100%] pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <div className="bg-white border border-zinc-100 shadow-xl p-2">
                    <ProfileDropdown />
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative text-zinc-800 hover:text-black transition-colors hidden md:block" // Hidden on mobile initially to avoid crowding, or can be added to mobile menu
                aria-label="Wishlist"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-highlight text-black"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-zinc-800 hover:text-black transition-colors"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-highlight text-black"
                  >
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-zinc-800"
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
            <div className="md:hidden py-6 space-y-6 border-t border-zinc-100 bg-white absolute left-0 right-0 px-4 shadow-lg min-h-screen">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-zinc-50 border-b border-zinc-200 px-4 py-3 pl-10 text-sm outline-none"
                />
                <svg className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-heading uppercase text-black">Home</Link>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full text-lg font-heading uppercase text-black"
                >
                  Products
                  <svg className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <a href="#featured" className="text-lg font-heading uppercase text-black">Featured</a>
                <Link href="/about" className="text-lg font-heading uppercase text-black">About</Link>
              </div>

              <div className="pt-6 border-t border-zinc-100 space-y-4">
                <Link href="/profile" className="block text-sm font-bold uppercase tracking-widest text-zinc-500">My Account</Link>
                <Link href="/wishlist" className="block text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Wishlist ({wishlistCount})
                </Link>
                <Link href="/cart" className="block text-sm font-bold uppercase tracking-widest text-zinc-500">
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsProductsOpen(false)}
            style={{ top: '0px' }}
          ></div>
          <div
            className="fixed z-50 bg-white shadow-2xl overflow-hidden"
            data-products-dropdown
            style={{
              top: '120px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(95vw, 1200px)',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProductsDropdown onFilterChange={handleFilterChange} />
          </div>
        </>
      )}
    </div>
  );
}
