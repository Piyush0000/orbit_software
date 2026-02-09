'use client';

import { MerchantStore } from '@/lib/merchant-api';
import { useEffect } from 'react';
import CategoryNavigation from '@/components/CategoryNavigation';
import CategoryGrid from '@/components/CategoryGrid';
import CartSummary from '@/components/cart/CartSummary';

export default function GeneralTheme({ merchant }: { merchant: MerchantStore }) {
  // Inject merchant data into environment for template to consume
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MERCHANT_DATA__ = merchant;
    }
  }, [merchant]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{merchant.name}</h1>
        </div>
      </header>
      
      <CategoryNavigation />
      
      <main className="flex-grow">
        <div className="flex flex-col gap-0">
          <div className="bg-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome to {merchant.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your one-stop shop for all your needs.
              </p>
            </div>
          </div>
          
          <CategoryGrid />
          
          <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Products will be loaded dynamically */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="bg-gray-200 h-48 rounded mb-4"></div>
                      <h3 className="font-medium">Product</h3>
                      <p className="text-gray-600">$24.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="bg-gray-200 h-48 rounded mb-4"></div>
                      <h3 className="font-medium">Product</h3>
                      <p className="text-gray-600">$34.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="bg-gray-200 h-48 rounded mb-4"></div>
                      <h3 className="font-medium">Product</h3>
                      <p className="text-gray-600">$29.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                      <div className="bg-gray-200 h-48 rounded mb-4"></div>
                      <h3 className="font-medium">Product</h3>
                      <p className="text-gray-600">$44.99</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <CartSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} {merchant.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}