'use client';

import { useCart } from '@/store/cartStore';
import Link from 'next/link';
import { formatINR } from '@/lib/utils';

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
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 mb-4"
              style={{ color: 'var(--text-muted)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Your shopping bag is empty
            </h1>
            <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
              Looks like you haven&apos;t added any items to your bag yet.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--header-text)',
                color: 'var(--header-bg)'
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
              Home
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>Cart</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Shopping Cart
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            Review your selected items before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemTotal = item.priceNum * item.quantity;
              return (
                <div
                  key={item.id}
                  className="rounded-lg border p-6 transition-shadow hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Left: Product Image */}
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Center: Product Info */}
                    <div className="flex-grow">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="text-xl font-semibold mb-2 hover:underline" style={{ color: 'var(--text)' }}>
                          {item.name}
                        </h3>
                      </Link>
                      {item.shortDescription && (
                        <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                          {item.shortDescription}
                        </p>
                      )}
                      <div className="mb-3">
                        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                          <span className="font-medium" style={{ color: 'var(--text)' }}>Price per unit:</span> {item.price}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          <span className="font-medium" style={{ color: '#16a34a' }}>Stock status:</span> In Stock
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mb-4">
                        <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                          Quantity:
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            style={{
                              borderColor: 'var(--card-border)',
                              color: 'var(--text)',
                              backgroundColor: 'var(--card-bg)'
                            }}
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          <span
                            className="w-12 text-center text-lg font-semibold"
                            style={{ color: 'var(--text)' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            disabled={item.quantity >= 5}
                            className="w-8 h-8 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            style={{
                              borderColor: 'var(--card-border)',
                              color: 'var(--text)',
                              backgroundColor: 'var(--card-bg)'
                            }}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          (Min: 1 | Max: 5)
                        </span>
                      </div>

                      {/* Item Total */}
                      <div className="mb-4">
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          <span className="font-medium" style={{ color: 'var(--text)' }}>Item Total:</span>{' '}
                          {item.price} × {item.quantity} = {formatINR(itemTotal)}
                        </p>
                      </div>
                    </div>

                    {/* Right: Remove Button */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-50"
                        style={{ color: '#dc2626' }}
                        aria-label="Remove item"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sidebar: Price Summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-lg border p-6 sticky top-24"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                Price Details
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal ({cartItems.length} items):</span>
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>
                    {formatINR(subtotal)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Discount:</span>
                  <span className={`font-semibold ${discount > 0 ? 'text-green-600' : ''}`} style={{ color: discount > 0 ? '#16a34a' : 'var(--text-muted)' }}>
                    {discount > 0 ? `-${formatINR(subtotal * discount)}` : '–₹0'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Shipping Charges:</span>
                  <span className="font-semibold" style={{ color: '#16a34a' }}>Free</span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Taxes (18% GST):</span>
                  <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>
                    {formatINR((subtotal - (subtotal * discount)) * 0.18)}
                  </span>
                </div>

                <div className="border-t pt-4" style={{ borderColor: 'var(--card-border)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                      Total Payable:
                    </span>
                    <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                      {formatINR((subtotal - (subtotal * discount)) * 1.18)}
                    </span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                    Prices are inclusive of all applicable taxes
                  </p>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="mb-6 pt-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
                <p className="font-medium mb-2" style={{ color: 'var(--text)' }}>Promo Code</p>
                {promoCode ? (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
                    <span className="text-green-700 font-medium">{promoCode} applied</span>
                    <button
                      onClick={removePromoCode}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-grow px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
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
                      className="px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--header-text)',
                        color: 'var(--header-bg)'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--header-text)',
                  color: 'var(--header-bg)'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

