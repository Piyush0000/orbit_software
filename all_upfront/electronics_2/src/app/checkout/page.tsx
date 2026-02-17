'use client';

import Checkout from '@/components/Checkout';

export default function CheckoutPage() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <main className="flex-grow">
        <Checkout />
      </main>
    </div>
  );
}

