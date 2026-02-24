'use client';

import { useState } from 'react';
import { useCart } from '@/store/cartStore';
import Link from 'next/link';
import { CheckCircle2, Loader2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { StorefrontAPI } from '@/lib/api';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const INPUT_STYLE = {
  backgroundColor: 'var(--card-bg)',
  borderColor: 'var(--card-border)',
  color: 'var(--text)',
} as React.CSSProperties;

export default function Checkout() {
  const { cartItems, getSubtotal, clearCart, discount } = useCart();
  const subtotal = getSubtotal();
  const discountAmt = subtotal * (discount || 0);
  const tax = (subtotal - discountAmt) * 0.18;
  const total = subtotal - discountAmt + tax;

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zipCode: '', paymentMethod: 'cod',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await StorefrontAPI.createOrder({
        customer: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, address: form.address, city: form.city, state: form.state, zipCode: form.zipCode },
        items: cartItems.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.priceNum })),
        total, paymentMethod: form.paymentMethod,
      });
      if (result?.orderId) { setOrderId(result.orderId); clearCart(); setSuccess(true); }
      else throw new Error(result?.message || 'Order could not be placed');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally { setSubmitting(false); }
  };

  if (success) return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>Order Placed!</h1>
        <p className="text-lg mb-2" style={{ color: 'var(--text-muted)' }}>Thank you for your order.</p>
        {orderId && <p className="text-sm mb-6 font-mono" style={{ color: 'var(--text-muted)' }}>Order ID: {orderId}</p>}
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Confirmation sent to <strong>{form.email}</strong>.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}>
          <ShoppingBag className="h-5 w-5" /> Continue Shopping
        </Link>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="py-16 px-4 text-center">
      <ShoppingBag className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>Your cart is empty</h1>
      <Link href="/" className="inline-block px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}>Shop Now</Link>
    </div>
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>Checkout</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>No account needed — just fill in your details below.</p>
        {error && <div className="mb-6 rounded-lg border border-red-400 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['firstName','First Name','text'],['lastName','Last Name','text']].map(([name,label,type]) => (
                    <div key={name}><label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>{label} *</label><input type={type} name={name} value={(form as any)[name]} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all" style={INPUT_STYLE} /></div>
                  ))}
                  <div className="sm:col-span-2"><label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Email Address *</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all" style={INPUT_STYLE} /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Phone Number *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210" className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all" style={INPUT_STYLE} /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Street Address *</label><textarea name="address" value={form.address} onChange={handleChange} required rows={2} placeholder="House no., Street, Area..." className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none" style={INPUT_STYLE} /></div>
                  {[['city','City'],['state','State'],['zipCode','PIN Code']].map(([name, label]) => (
                    <div key={name}><label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>{label} *</label><input type="text" name={name} value={(form as any)[name]} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all" style={INPUT_STYLE} /></div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>Payment Method</h2>
                <div className="space-y-3">
                  {[{ value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },{ value: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm' },{ value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' }].map((opt) => (
                    <label key={opt.value} className="flex items-center p-4 rounded-lg border cursor-pointer transition-colors" style={{ borderColor: form.paymentMethod === opt.value ? 'var(--header-text)' : 'var(--card-border)' }}>
                      <input type="radio" name="paymentMethod" value={opt.value} checked={form.paymentMethod === opt.value} onChange={handleChange} className="mr-3 accent-current" />
                      <div><span className="font-semibold" style={{ color: 'var(--text)' }}>{opt.label}</span><p className="text-sm" style={{ color: 'var(--text-muted)' }}>{opt.desc}</p></div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-lg border p-6 sticky top-24" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>Order Summary</h2>
                <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">{item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <ShoppingBag className="h-6 w-6 text-gray-400 m-auto mt-4" />}</div>
                      <div><p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{item.name}</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity} × {item.price}</p></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Subtotal</span><span style={{ color: 'var(--text)' }}>{formatINR(subtotal)}</span></div>
                  {discountAmt > 0 && <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Discount</span><span className="text-green-600">-{formatINR(discountAmt)}</span></div>}
                  <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Shipping</span><span className="text-green-600">Free</span></div>
                  <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>GST (18%)</span><span style={{ color: 'var(--text)' }}>{formatINR(tax)}</span></div>
                  <div className="flex justify-between items-center border-t pt-3 mt-2" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>Total</span>
                    <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>{formatINR(total)}</span>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="w-full px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}>
                  {submitting ? <><Loader2 className="h-5 w-5 animate-spin" />Placing Order...</> : 'Place Order'}
                </button>
                <Link href="/cart" className="flex items-center justify-center gap-1 mt-4 text-sm hover:underline" style={{ color: 'var(--text-muted)' }}><ArrowLeft className="h-4 w-4" />Back to Cart</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
