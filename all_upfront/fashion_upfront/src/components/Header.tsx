'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductsDropdown from './ProductsDropdown';
import MegaMenu from './MegaMenu';
import ProfileDropdown from './ProfileDropdown';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const productsRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const cartItemCount = getTotalItems();

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
      className="flex flex-col w-full font-sans sticky top-0 z-50 bg-white"
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* Top Banner - Myntra style minimalist or soft gradient */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs sm:text-sm font-bold py-2 text-center px-4 tracking-wide relative z-[51]">
        FLAT ₹500 OFF ON YOUR FIRST ORDER! USE CODE: NEW500
      </div>

      <header
        className="border-b bg-white shadow-sm"
        style={{
          borderColor: 'var(--header-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 mr-8 flex items-center">
              <Link href="/" className="text-3xl font-extrabold tracking-tight text-black">
                UPFRONT
              </Link>
            </div>

            {/* Desktop Navigation - Fashion Categories */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-700 uppercase tracking-wide h-full">
              {['Men', 'Women', 'Kids', 'Accessories'].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className={`flex items-center h-full border-b-4 transition-all duration-200 px-2 ${activeCategory === category
                    ? 'border-pink-500 text-black'
                    : 'border-transparent hover:border-pink-500 hover:text-black'
                    }`}
                  onMouseEnter={() => setActiveCategory(category)}
                >
                  {category.toUpperCase()}
                </Link>
              ))}

              <div ref={productsRef} className="relative group">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center gap-1 hover:text-black transition-colors"
                >
                  ALL
                  {Object.values(activeFilters).flat().length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-pink-500 text-white">
                      {Object.values(activeFilters).flat().length}
                    </span>
                  )}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-gray-100/50 border border-transparent focus:bg-white focus:border-gray-200 rounded-full px-4 py-2.5 pl-11 text-sm transition-all duration-200 outline-none"
                />
                <svg className="absolute left-4 top-3 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">

              <div className="relative group h-full flex items-center">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" className="text-gray-600 hover:text-black transition-colors py-4" aria-label="Account">
                      <div className="flex flex-col items-center gap-0.5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-[10px] font-bold">Profile</span>
                      </div>
                    </Link>
                    {/* Dropdown Container */}
                    <div className="absolute right-0 top-[100%] pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                      <ProfileDropdown />
                    </div>
                  </>
                ) : (
                  <Link href="/auth/login" className="text-gray-600 hover:text-black transition-colors py-4" aria-label="Login">
                    <div className="flex flex-col items-center gap-0.5">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-[10px] font-bold">Login</span>
                    </div>
                  </Link>
                )}
              </div>
              <Link
                href="/cart"
                className="relative text-gray-600 hover:text-black transition-colors group"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-black text-white border-2 border-white"
                  >
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-gray-100">
              <div className="px-2 pb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-100 rounded-lg px-4 py-2 pl-10 text-sm outline-none"
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <Link href="/" className="block px-2 font-medium text-gray-600">Home</Link>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full px-2 font-medium text-gray-600"
              >
                Products
                <svg className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <a href="#featured" className="block px-2 font-medium text-gray-600">Featured</a>
              <Link href="/about" className="block px-2 font-medium text-gray-600">About</Link>
              <div className="pt-4 border-t border-gray-100 space-y-3 px-2">
                <Link
                  href="/cart"
                  className="flex items-center gap-2 font-medium text-gray-600"
                >
                  <span className="relative">
                    Cart
                    {cartItemCount > 0 && (
                      <span className="ml-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">{cartItemCount}</span>
                    )}
                  </span>
                </Link>
                <Link href="/profile" className="block font-medium text-gray-600">Account</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mega Menu */}
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
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsProductsOpen(false)}
            style={{ top: '0px' }}
          ></div>
          <div
            className="fixed z-50 bg-white shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5"
            data-products-dropdown
            style={{
              top: '120px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90vw, 900px)',
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
