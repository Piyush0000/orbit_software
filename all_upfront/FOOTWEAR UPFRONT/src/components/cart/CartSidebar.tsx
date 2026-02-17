'use client';

import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export function CartSidebar() {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 2000,
                    animation: 'fadeIn 0.2s ease'
                }}
                onClick={closeCart}
            />

            {/* Sidebar drawer */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    maxWidth: '400px',
                    background: 'white',
                    zIndex: 2001,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                    animation: 'slideIn 0.3s ease'
                }}
            >
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: '1.5rem', margin: 0 }}>My Cart ({cartItems.length})</h2>
                    <button
                        onClick={closeCart}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#666' }}>
                            <p>Your cart is empty.</p>
                            <button
                                onClick={closeCart}
                                style={{ marginTop: '1rem', background: 'black', color: 'white', border: 'none', padding: '0.8rem 1.5rem', textTransform: 'uppercase', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f5f5f5' }}>
                                    <div style={{ position: 'relative', width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '4px', flexShrink: 0 }}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <h4 style={{ margin: 0, textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.name}</h4>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                                            Size: {item.size} | Color: {item.color}
                                        </p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span style={{ fontSize: '0.9rem', padding: '0 0.5rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                                            >
                                                <Trash2 size={16} color="#ef4444" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', background: '#f9f9f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Link
                                href="/cart"
                                onClick={closeCart}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem',
                                    border: '1px solid black',
                                    color: 'black',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    borderRadius: '4px'
                                }}
                            >
                                View Cart
                            </Link>
                            <button
                                style={{
                                    background: 'black',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                                onClick={() => alert('Checkout coming soon')}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}

                <style jsx>{`
                    @keyframes slideIn {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        </>
    );
}
