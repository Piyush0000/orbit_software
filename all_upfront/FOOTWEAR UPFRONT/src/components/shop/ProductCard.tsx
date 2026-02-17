'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Heart } from 'lucide-react';
import { useState } from 'react'; // Import useState
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext'; // Import useCart

interface ProductProps {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    hoverImage?: string;
    colors?: string[];
}

export function ProductCard({ product }: { product: ProductProps }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [showSizeModal, setShowSizeModal] = useState(false);

    // Default available sizes if not present in product data
    const sizes = ['7', '8', '9', '10', '11'];

    const [selectedQuickSize, setSelectedQuickSize] = useState('');
    const [selectedQuickColor, setSelectedQuickColor] = useState('');

    const openQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedQuickSize('');
        setSelectedQuickColor(product.colors?.[0] || '');
        setShowSizeModal(true);
    };

    const confirmQuickAdd = () => {
        if (!selectedQuickSize) {
            alert('Please select a size');
            return;
        }
        if (product.colors && product.colors.length > 0 && !selectedQuickColor) {
            alert('Please select a color');
            return;
        }

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedQuickSize,
            color: selectedQuickColor || 'Default',
            quantity: 1
        });
        setShowSizeModal(false);
        // Alert handled by Drawer opening automatically (logic is in addToCart)
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <>
            <Link href={`/product/${product.id}`} className={styles.card}>
                <div className={styles.imageContainer}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {product.hoverImage && (
                        <Image
                            src={product.hoverImage}
                            alt={`${product.name} view 2`}
                            fill
                            className={styles.imageHover}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    )}

                    <div className={styles.actionsOverlay}>
                        <button
                            className={styles.actionButton}
                            onClick={openQuickAdd}
                        >
                            Add to Cart
                        </button>
                        <button className={`${styles.actionButton} ${styles.secondaryAction}`}>
                            View Details
                        </button>
                    </div>

                    <button
                        className={styles.wishlistButton}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isInWishlist(product.id)) {
                                removeFromWishlist(product.id);
                            } else {
                                addToWishlist(product.id);
                            }
                        }}
                    >
                        <Heart
                            size={20}
                            fill={isInWishlist(product.id) ? "currentColor" : "none"}
                            color={isInWishlist(product.id) ? "#ef4444" : "currentColor"}
                        />
                    </button>
                </div>

                <div className={styles.info}>
                    {/* ... info content ... */}
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.category}>{product.category}</p>

                    <div className={styles.rating}>
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span style={{ color: '#666', marginLeft: '4px' }}>({product.rating})</span>
                    </div>

                    <div className={styles.priceContainer}>
                        <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                            <>
                                <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                <span className={styles.discount}>{discount}% OFF</span>
                            </>
                        )}
                    </div>

                    {product.colors && (
                        <div className={styles.colors}>
                            {product.colors.map((color, idx) => (
                                <span
                                    key={idx}
                                    className={styles.colorDot}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Link>

            {/* Size & Color Selection Modal */}
            {showSizeModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowSizeModal(false);
                    }}
                >
                    <div
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            minWidth: '350px',
                            maxWidth: '90%',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', textAlign: 'center' }}>Quick Add to Cart</h3>

                        {/* Size Selection */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>SELECT SIZE</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedQuickSize(size)}
                                        style={{
                                            padding: '0.8rem',
                                            border: selectedQuickSize === size ? '2px solid black' : '1px solid #ddd',
                                            background: selectedQuickSize === size ? 'black' : 'white',
                                            color: selectedQuickSize === size ? 'white' : 'black',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            borderRadius: '4px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#666' }}>SELECT COLOR</p>
                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedQuickColor(color)}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: color,
                                                border: selectedQuickColor === color ? '2px solid black' : '1px solid #ddd',
                                                outline: selectedQuickColor === color ? '2px solid white' : 'none',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                            }}
                                            aria-label={color}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setShowSizeModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.8rem',
                                    border: '1px solid #ddd',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    borderRadius: '4px'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmQuickAdd}
                                disabled={!selectedQuickSize}
                                style={{
                                    flex: 1,
                                    padding: '0.8rem',
                                    border: 'none',
                                    background: selectedQuickSize ? 'black' : '#ccc',
                                    color: 'white',
                                    cursor: selectedQuickSize ? 'pointer' : 'not-allowed',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    borderRadius: '4px'
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
