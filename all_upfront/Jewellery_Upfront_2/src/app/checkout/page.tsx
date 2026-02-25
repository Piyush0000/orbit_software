import SRCheckoutButton from '@/components/SRCheckoutButton';
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Lock, Gift } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
    const { cart, cartTotal, isGiftWrapped } = useCart();
    const router = useRouter();

    const shipping = 0;
    const giftWrapCost = isGiftWrapped ? 50 : 0;
    const tax = Math.round(cartTotal * 0.18);
    const total = cartTotal + shipping + tax + giftWrapCost;

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart');
        }
    }, [cart, router]);

    if (cart.length === 0) return null;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Checkout</h1>

                <div className={styles.layout}>
                    {/* Left Column: Forms */}
                    <div className={styles.leftColumn}>
                        {/* Address Form */}
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>Shipping Address</h2>
                            <form className={styles.formGrid}>
                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Full Name</label>
                                    <input type="text" className={styles.input} placeholder="John Doe" />
                                </div>
                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Address Line 1</label>
                                    <input type="text" className={styles.input} placeholder="House No, Street" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>City</label>
                                    <input type="text" className={styles.input} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Postal Code</label>
                                    <input type="text" className={styles.input} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Phone Number</label>
                                    <input type="tel" className={styles.input} />
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>Payment Method</h2>
                            <div className={styles.paymentOptions}>
                                <label className={styles.paymentOption}>
                                    <input type="radio" name="payment" defaultChecked />
                                    <span>Credit/Debit Card</span>
                                </label>
                                <label className={styles.paymentOption}>
                                    <input type="radio" name="payment" />
                                    <span>UPI / Netbanking</span>
                                </label>
                                <label className={styles.paymentOption}>
                                    <input type="radio" name="payment" />
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className={styles.summary}>
                        <h2 className={styles.sectionTitle}>Order Summary</h2>
                        <div className={styles.summaryItems}>
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.color}`} className={styles.summaryItem}>
                                    <div className={styles.itemImageWrapper}>
                                        <Image src={item.image} alt={item.name} fill className={styles.itemImage} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemName}>{item.name}</p>
                                        <p className={styles.itemMeta}>Qty: {item.quantity} | Color: {item.color}</p>
                                        <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totalSection}>
                            <div className={styles.row}>
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className={styles.row}>
                                <span>Estimated Tax (18%)</span>
                                <span>₹{tax.toLocaleString()}</span>
                            </div>
                            {isGiftWrapped && (
                                <div className={styles.row} style={{ color: 'var(--gold-primary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Gift size={14} /> Gift Wrap
                                    </span>
                                    <span>₹50</span>
                                </div>
                            )}
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <SRCheckoutButton cartItems={cartItems} totalAmount={total} className="" label="Place Order" />

                        <div className={styles.trustBadges}>
                            <div className={styles.trustBadge}>
                                <Lock size={16} /> Secure Checkout
                            </div>
                            <div className={styles.trustBadge}>
                                <ShieldCheck size={16} /> Data Encrypted
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
