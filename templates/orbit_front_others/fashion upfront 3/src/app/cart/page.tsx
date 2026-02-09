'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default function CartPage() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <Header />
      <main className="flex-grow">
        <Cart />
      </main>
      <Footer />
    </div>
  );
}

