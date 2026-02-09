'use client';

import { useCart } from '../../context/CartContext';
import styles from './cart.module.css'; // We'll need to create this or use inline styles for now
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const shipping = cartTotal > 5000 ? 0 : 500;
    const totalAmount = cartTotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Your Cart is Empty</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link href="/shop" style={{ background: 'black', color: 'white', padding: '1rem 2rem', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', minHeight: '80vh' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', textTransform: 'uppercase' }}>Shopping Cart ({cartItems.length})</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cartItems.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem', border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px', background: '#f5f5f5', borderRadius: '4px', flexShrink: 0 }}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: '1rem' }}>{item.name}</h3>
                                        <span style={{ fontWeight: 'bold' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Size: {item.size}</p>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Color: <span style={{ display: 'inline-block', width: '12px', height: '12px', background: item.color, borderRadius: '50%', marginLeft: '4px', verticalAlign: 'middle', border: '1px solid #ddd' }}></span></p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span style={{ padding: '0 0.8rem', fontWeight: 'bold' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                                    >
                                        <Trash2 size={18} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem', color: '#666' }}
                    >
                        Clear Cart
                    </button>
                </div>

                <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', position: 'sticky', top: '120px' }}>
                    <h2 style={{ textTransform: 'uppercase', fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>Order Summary</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#666' }}>
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                        <span>Total</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                        style={{
                            width: '100%',
                            background: 'black',
                            color: 'white',
                            padding: '1.2rem',
                            border: 'none',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                        onClick={() => alert('Checkout functionality coming soon!')}
                    >
                        Checkout <ArrowRight size={20} />
                    </button>

                    <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'center' }}>
                        Secure Checkout - SSL Encrypted
                    </p>
                </div>
            </div>

            {/* Responsive styles */}
            <style jsx global>{`
                @media (max-width: 900px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
