'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductsDropdown from './ProductsDropdown';
import { useCart } from '@/store/cartStore';
import { useStoreContext } from '@/contexts/store-context';

export default function Header() {
  const { customization, storeInfo } = useStoreContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const productsRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const announcementText = customization?.announcementBar?.text || "Tell a friend about Upfront & get a ₹500 coupon for next order!";
  const logoText = customization?.headerStyle?.storeName || customization?.headerStyle?.logoText || storeInfo?.name || "Upfront";
  const logoUrl = customization?.headerStyle?.logoUrl;

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
    <div className="sticky top-0 z-[100] flex flex-col w-full transition-all duration-300">
      {/* Top Banner */}
      <div 
        onClick={handleSectionClick('announcementBar')}
        className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-black text-xs sm:text-sm font-bold py-2.5 text-center px-4 tracking-wide relative z-[101] hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
      >
        {announcementText}
      </div>

      <header
        onClick={handleSectionClick('headerStyle')}
        className="glass relative z-[100] border-b border-white/10 hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
        style={{
          backgroundColor: 'var(--header-bg)',
          borderColor: 'var(--header-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 mr-8 flex items-center">
              <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: 'var(--header-text)' }}>
                {logoUrl ? <img src={logoUrl} alt={logoText} className="h-8 object-contain" /> : null}
                {(!logoUrl || logoText) && logoText}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div ref={productsRef} className="relative group">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center gap-1 font-medium transition-colors hover:text-[var(--accent-blue)]"
                  style={{ color: 'var(--header-text-muted)' }}
                >
                  Products
                  {Object.values(activeFilters).flat().length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-[var(--accent-blue)] text-black font-bold">
                      {Object.values(activeFilters).flat().length}
                    </span>
                  )}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <a href="#featured" className="font-medium transition-colors hover:text-[var(--accent-blue)]" style={{ color: 'var(--header-text-muted)' }}>
                Featured
              </a>
              <Link href="/about" className="font-medium transition-colors hover:text-[var(--accent-blue)]" style={{ color: 'var(--header-text-muted)' }}>
                About
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)] focus:ring-1 rounded-full px-4 py-2.5 pl-11 text-sm text-[var(--text)] transition-all duration-200 outline-none placeholder-gray-500"
                />
                <svg className="absolute left-4 top-3 w-4 h-4 text-gray-500 group-focus-within:text-[var(--accent-blue)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">

              <Link
                href="/cart"
                className="relative text-[var(--header-text-muted)] hover:text-[var(--accent-blue)] transition-colors group"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6 hover-glow rounded-full p-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-[var(--accent-blue)] text-black border-2 border-[var(--header-bg)]"
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
              </div>
            </div>
          )}
        </div>
      </header>

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
