'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Checkout from '@/components/Checkout';

export default function CheckoutPage() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <Header />
      <main className="flex-grow">
        <Checkout />
      </main>
      <Footer />
    </div>
  );
}

