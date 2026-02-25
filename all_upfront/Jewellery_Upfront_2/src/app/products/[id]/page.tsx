"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import Reviews from '@/components/Reviews';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import styles from './PDP.module.css';

// Mock data for specific product
const productData = {
    id: '1',
    name: 'Eternal Gold Ring',
    sku: 'JR-001-GOLD-DIA',
    price: 15999,
    mrp: 18999,
    images: [
        '/gold_ring_product.png',
        '/silver_jewellery_collection.png', // Demo filling
        '/hero_model_jewellery.png', // Demo filling
    ],
    description: 'Handcrafted from 18k gold, this ring features a stunning solitaire diamond setting that captures light from every angle. Designed for the modern woman who appreciates timeless elegance.',
    details: {
        material: '18k Gold',
        weight: '3.5g',
        stone: 'Swarovski Crystal',
        finish: 'High Polish'
    }
};

export default function ProductDetailPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('Gold');
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const isWishlisted = isInWishlist(productData.id);

    const { showToast } = useToast();

    // ...

    const handleAddToCart = () => {
        addToCart({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.images[0],
            quantity: 1,
            color: selectedColor
        });
        showToast(`Added ${productData.name} (${selectedColor}) to cart!`, 'success');
    };

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(productData.id);
        } else {
            addToWishlist(productData.id);
        }
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.breadcrumbs}>Home / Products / Rings / {productData.name}</div>
            </div>

            <div className={styles.container}>
                {/* Left: Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.thumbnails}>
                        {productData.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`${styles.thumbnail} ${activeImage === idx ? styles.active : ''}`}
                                onMouseEnter={() => setActiveImage(idx)}
                            >
                                <Image src={img} alt="Thumbnail" fill />
                            </div>
                        ))}
                    </div>
                    <div className={styles.mainImageWrapper}>
                        <Image
                            src={productData.images[activeImage]}
                            alt="Main Product"
                            fill
                            className={styles.mainImage}
                        />
                    </div>
                </div>

                {/* Right: Info */}
                <div className={styles.info}>
                    <h1 className={styles.title}>{productData.name}</h1>
                    <p className={styles.sku}>SKU: {productData.sku}</p>

                    <div className={styles.priceBlock}>
                        <span className={styles.price}>₹{productData.price.toLocaleString()}</span>
                        <span className={styles.mrp}>₹{productData.mrp.toLocaleString()}</span>
                        <span className={styles.taxNote}>(Tax included)</span>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <span className={styles.optionTitle}>Color: {selectedColor}</span>
                        <div className={styles.colorOptions}>
                            <div
                                className={`${styles.colorOption} ${selectedColor === 'Gold' ? styles.active : ''}`}
                                style={{ backgroundColor: '#e5c100' }}
                                title="Gold"
                                onClick={() => setSelectedColor('Gold')}
                            />
                            <div
                                className={`${styles.colorOption} ${selectedColor === 'Silver' ? styles.active : ''}`}
                                style={{ backgroundColor: '#e0e0e0' }}
                                title="Silver"
                                onClick={() => setSelectedColor('Silver')}
                            />
                            <div
                                className={`${styles.colorOption} ${selectedColor === 'Rose Gold' ? styles.active : ''}`}
                                style={{ backgroundColor: '#e6b8af' }}
                                title="Rose Gold"
                                onClick={() => setSelectedColor('Rose Gold')}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button
                            className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
                            onClick={toggleWishlist}
                        >
                            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {/* Description Tabs would go here */}
                    <div style={{ marginBottom: '2rem', lineHeight: '1.6', color: '#555' }}>
                        <p>{productData.description}</p>
                    </div>

                    <div className={styles.trustBadges}>
                        <div className={styles.badge}>
                            <Award className={styles.badgeIcon} />
                            <span className={styles.badgeText}>BIS Hallmarked<br />Gold</span>
                        </div>
                        <div className={styles.badge}>
                            <ShieldCheck className={styles.badgeIcon} />
                            <span className={styles.badgeText}>1 Year<br />Warranty</span>
                        </div>
                        <div className={styles.badge}>
                            <Truck className={styles.badgeIcon} />
                            <span className={styles.badgeText}>Free Insured<br />Shipping</span>
                        </div>
                        <div className={styles.badge}>
                            <RotateCcw className={styles.badgeIcon} />
                            <span className={styles.badgeText}>7 Day Easy<br />Returns</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container">
                <Reviews />
            </div>
        </div>
    );
}
