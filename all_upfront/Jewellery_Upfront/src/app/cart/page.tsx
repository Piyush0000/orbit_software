"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Gift, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, isGiftWrapped, toggleGiftWrap } = useCart();
    const shipping = 0; // Free shipping logic
    const giftWrapCost = isGiftWrapped ? 50 : 0;
    const tax = Math.round(cartTotal * 0.18); // 18% GST estimate
    const total = cartTotal + shipping + tax + giftWrapCost;

    if (cart.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.container} style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <div style={{ background: '#f9f9f9', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <ShoppingBag size={40} color="#ccc" />
                    </div>
                    <h1 className={styles.heading} style={{ marginBottom: '10px' }}>Your Cart is Empty</h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Looks like you haven't added any elegant pieces yet.</p>
                    <Link href="/products">
                        <button className={styles.checkoutBtn} style={{ maxWidth: '250px' }}>Start Shopping</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Shopping Cart</h1>

                <div className={styles.content}>
                    <div className={styles.cartItems}>
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.color}`} className={styles.item}>
                                <div className={styles.itemImageWrapper}>
                                    <Image src={item.image} alt={item.name} fill className={styles.itemImage} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <p className={styles.itemMeta}>Color: {item.color}</p>
                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >-</button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >+</button>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</p>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeFromCart(item.id)}
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>
                        <div className={styles.row}>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Estimated Tax (18%)</span>
                            <span>₹{tax.toLocaleString()}</span>
                        </div>

                        {isGiftWrapped && (
                            <div className={styles.row}>
                                <span>Gift Wrap</span>
                                <span>₹50</span>
                            </div>
                        )}

                        <div className={styles.giftOption}>
                            <label className={styles.giftLabel} style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={isGiftWrapped}
                                    onChange={toggleGiftWrap}
                                />
                                <Gift size={16} color="var(--gold-primary)" /> Add Gift Wrap (+₹50)
                            </label>
                        </div>

                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <Link href="/checkout">
                            <button className={styles.checkoutBtn}>Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
