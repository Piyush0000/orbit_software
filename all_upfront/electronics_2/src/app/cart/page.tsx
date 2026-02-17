'use client';

import Cart from '@/components/Cart';

export default function CartPage() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <main className="flex-grow">
        <Cart />
      </main>
    </div>
  );
}

