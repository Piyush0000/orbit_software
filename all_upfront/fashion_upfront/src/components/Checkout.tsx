'use client';

import { useState } from 'react';
import { useCart } from '@/store/cartStore';
import Link from 'next/link';
import { formatINR } from '@/lib/utils';

export default function Checkout() {
  const { cartItems, getSubtotal, clearCart, discount } = useCart();
  const subtotal = getSubtotal();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // UI only - simulate form submission
    setTimeout(() => {
      alert('Order placed successfully! (UI only - no backend)');
      clearCart();
      setIsSubmitting(false);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'cod'
      });
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Your cart is empty
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            Please add items to your cart before checkout.
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
            <Link href="/cart" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
              Cart
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>Checkout</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            Checkout
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            Complete your order
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div
                className="rounded-lg border p-6"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div
                className="rounded-lg border p-6"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.paymentMethod === 'cod' ? 'var(--header-text)' : 'var(--card-border)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>Cash on Delivery</span>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pay when you receive your order</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.paymentMethod === 'card' ? 'var(--header-text)' : 'var(--card-border)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>Credit/Debit Card</span>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Secure payment via card</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: formData.paymentMethod === 'upi' ? 'var(--header-text)' : 'var(--card-border)' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>UPI</span>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pay via UPI apps</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="rounded-lg border p-6 sticky top-24"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          Qty: {item.quantity} × {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
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
                    <span style={{ color: 'var(--text-muted)' }}>Shipping:</span>
                    <span className="font-semibold" style={{ color: '#16a34a' }}>Free</span>
                  </div>

                  {/* Taxes */}
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-muted)' }}>Taxes (18% GST):</span>
                    <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {formatINR((subtotal - (subtotal * discount)) * 0.18)}
                    </span>
                  </div>

                  <div className="border-t pt-3" style={{ borderColor: 'var(--card-border)' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                        Total:
                      </span>
                      <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                        {formatINR((subtotal - (subtotal * discount)) * 1.18)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--header-text)',
                    color: 'var(--header-bg)'
                  }}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>

                <Link
                  href="/cart"
                  className="block text-center mt-4 text-sm hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ← Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

