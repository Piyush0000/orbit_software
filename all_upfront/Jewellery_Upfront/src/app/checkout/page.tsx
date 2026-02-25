'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { CheckCircle2, Loader2, ShoppingBag, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { StorefrontAPI } from '@/lib/api';
import styles from './Checkout.module.css';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function CheckoutPage() {
  const { cart, cartTotal, isGiftWrapped, clearCart } = useCart() as any;

  const shipping = 0;
  const giftWrapCost = isGiftWrapped ? 50 : 0;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + shipping + tax + giftWrapCost;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod',
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
      const payload = {
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
        },
        items: cart.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        paymentMethod: form.paymentMethod,
      };

      const result = await StorefrontAPI.createOrder(payload);

      if (result?.orderId) {
        setOrderId(result.orderId);
        if (clearCart) clearCart();
        setSuccess(true);
      } else {
        throw new Error(result?.message || 'Order could not be placed');
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.container} style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <CheckCircle2 style={{ width: 80, height: 80, color: '#16a34a', margin: '0 auto 1.5rem' }} />
          <h1 className={styles.heading}>Order Placed!</h1>
          <p style={{ marginBottom: '0.5rem' }}>Thank you for your order.</p>
          {orderId && (
            <p style={{ fontFamily: 'monospace', marginBottom: '1.5rem', opacity: 0.7 }}>
              Order ID: {orderId}
            </p>
          )}
          <p style={{ marginBottom: '2rem', opacity: 0.7 }}>
            A confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <Link href="/" className={styles.primaryBtn || ''} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (!cart || cart.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container} style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <ShoppingBag style={{ width: 64, height: 64, margin: '0 auto 1rem', opacity: 0.4 }} />
          <h1 className={styles.heading}>Your cart is empty</h1>
          <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Add items before checking out.</p>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Checkout</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.7 }}>
          No account needed — just fill in your delivery details.
        </p>

        {error && (
          <div style={{ marginBottom: '1.5rem', padding: '12px 16px', borderRadius: '8px', background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.layout}>
            {/* Left: Form */}
            <div className={styles.leftColumn}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Delivery Details</h2>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name *</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className={styles.input} placeholder="John" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name *</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className={styles.input} placeholder="Doe" />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className={styles.input} placeholder="you@example.com" />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={styles.input} placeholder="+91 98765 43210" />
                  </div>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Street Address *</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} required className={styles.input} placeholder="House no., Street, Area..." />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>City *</label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} required className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>State *</label>
                    <input type="text" name="state" value={form.state} onChange={handleChange} required className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>PIN Code *</label>
                    <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} required className={styles.input} />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Payment Method</h2>
                <div className={styles.paymentOptions}>
                  {[
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                    { value: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
                    { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  ].map((opt) => (
                    <label key={opt.value} className={styles.paymentOption}>
                      <input type="radio" name="paymentMethod" value={opt.value} checked={form.paymentMethod === opt.value} onChange={handleChange} />
                      <div>
                        <span style={{ fontWeight: 600 }}>{opt.label}</span>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0 }}>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className={styles.summary}>
              <h2 className={styles.sectionTitle}>Order Summary</h2>
              <div className={styles.summaryItems}>
                {cart.map((item: any) => (
                  <div key={`${item.id}-${item.color}`} className={styles.summaryItem}>
                    {item.image && (
                      <div className={styles.itemImageWrapper}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                      </div>
                    )}
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemMeta}>Qty: {item.quantity}{item.color ? ` | ${item.color}` : ''}</p>
                      <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.totalSection}>
                <div className={styles.row}><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className={styles.row}><span>Shipping</span><span style={{ color: '#16a34a' }}>Free</span></div>
                <div className={styles.row}><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                {isGiftWrapped && <div className={styles.row}><span>🎁 Gift Wrap</span><span>₹50</span></div>}
                <div className={styles.totalRow}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%', padding: '14px', borderRadius: '8px', fontWeight: 600,
                  fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'var(--gold-primary, #c9a96e)', color: '#fff', border: 'none', marginBottom: '12px'
                }}
              >
                {submitting ? (<><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Placing Order...</>) : ('Place Order')}
              </button>

              <Link href="/cart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.875rem', opacity: 0.7, textDecoration: 'none', marginBottom: '16px' }}>
                <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Cart
              </Link>

              <div className={styles.trustBadges}>
                <div className={styles.trustBadge}><Lock size={14} /> Secure Checkout</div>
                <div className={styles.trustBadge}><ShieldCheck size={14} /> Data Encrypted</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
