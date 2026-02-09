'use client';

import { useCart } from '@/store/cartStore';
import Link from 'next/link';
import { formatINR } from '@/lib/utils';
import Image from 'next/image';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, discount, promoCode, applyPromoCode, removePromoCode } = useCart();
  const subtotal = getSubtotal();

  const handleQuantityChange = (id: number, delta: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      updateQuantity(id, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center py-20 px-4">
        <h1 className="text-3xl font-heading uppercase tracking-tight mb-4 text-[var(--text-primary)]">Your Bag is Empty</h1>
        <p className="text-[var(--text-secondary)] mb-8 font-light">Looks like you haven&apos;t added anything to your bag yet.</p>
        <Link
          href="/products"
          className="px-10 py-4 bg-[var(--text-primary)] text-[var(--page-bg)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--highlight)] hover:text-black transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-12 max-w-[1920px] mx-auto">

      {/* Page Header */}
      <div className="mb-12 border-b border-[var(--card-border)] pb-4">
        <h1 className="text-4xl md:text-5xl font-heading font-medium uppercase tracking-tighter text-[var(--text-primary)]">
          Shopping Bag <span className="text-[var(--text-muted)] text-2xl align-middle">({cartItems.length})</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart Items List */}
        <div className="flex-grow space-y-8">
          {cartItems.map((item) => {
            const itemTotal = item.priceNum * item.quantity;
            return (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-b border-[var(--card-border)] pb-8">
                {/* Product Image */}
                <Link href={`/products/${item.id}`} className="flex-shrink-0 relative w-32 h-44 bg-[var(--card-bg)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="text-xl font-heading uppercase tracking-wide text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="font-bold text-lg text-[var(--text-primary)]">{formatINR(itemTotal)}</span>
                    </div>

                    {item.shortDescription && (
                      <p className="text-sm text-[var(--text-secondary)] mb-4 font-light max-w-md">
                        {item.shortDescription}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-xs mb-4">
                      <span className="text-[var(--text-secondary)]">Size:</span>
                      <span className="font-bold uppercase text-[var(--text-primary)]">{item.size || 'N/A'}</span>

                      <span className="text-[var(--text-secondary)]">Price:</span>
                      <span className="text-[var(--text-primary)]">{item.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-[var(--card-border)]">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-lg text-[var(--text-primary)] hover:bg-[var(--section-alt)] disabled:opacity-30 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-[var(--text-primary)]">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={item.quantity >= 5}
                          className="w-10 h-10 flex items-center justify-center text-lg text-[var(--text-primary)] hover:bg-[var(--section-alt)] disabled:opacity-30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-0.5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sidebar: Price Summary */}
        <div className="lg:w-[400px] flex-shrink-0">
          <div className="bg-[var(--card-bg)] p-8 border border-[var(--card-border)] sticky top-32">
            <h2 className="text-xl font-heading uppercase tracking-tight mb-6 text-[var(--text-primary)] border-b border-[var(--card-border)] pb-2">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span className="font-medium text-[var(--text-primary)]">{formatINR(subtotal)}</span>
              </div>

              {/* Discount */}
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Discount</span>
                <span className={`font-medium ${discount > 0 ? 'text-[var(--highlight)]' : 'text-[var(--text-primary)]'}`}>
                  {discount > 0 ? `-${formatINR(subtotal * discount)}` : '—'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Shipping</span>
                <span className="font-medium text-[var(--text-primary)]">Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Estimated Tax</span>
                <span className="font-medium text-[var(--text-primary)]">{formatINR((subtotal - (subtotal * discount)) * 0.18)}</span>
              </div>

              <div className="border-t border-[var(--card-border)] pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold uppercase tracking-wide text-[var(--text-primary)]">Total</span>
                  <span className="text-xl font-bold font-heading text-[var(--text-primary)]">
                    {formatINR((subtotal - (subtotal * discount)) * 1.18)}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mt-2 text-right">
                  Including all taxes
                </p>
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="mb-8">
              {promoCode ? (
                <div className="flex justify-between items-center bg-[var(--section-alt)] text-[var(--text-primary)] p-3 text-xs uppercase tracking-wider border border-[var(--highlight)]">
                  <span>{promoCode} Applied</span>
                  <button
                    onClick={removePromoCode}
                    className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="w-full bg-[var(--section-alt)] border border-[var(--card-border)] py-3 px-4 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--text-primary)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        if (!applyPromoCode(target.value)) {
                          alert('Invalid Promo Code');
                        } else {
                          target.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (!applyPromoCode(input.value)) {
                        alert('Invalid Promo Code');
                      } else {
                        input.value = '';
                      }
                    }}
                    className="absolute right-0 top-0 h-full px-4 text-xs font-bold uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-colors text-[var(--text-primary)]"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[var(--text-primary)] text-[var(--page-bg)] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--highlight)] hover:text-black transition-colors"
            >
              Checkout
            </button>

            <p className="text-[10px] text-[var(--text-muted)] mt-6 text-center font-light leading-relaxed">
              Secure Checkout - 30 Day Returns - Free Shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

