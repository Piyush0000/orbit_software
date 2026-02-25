"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.css';
import { Product } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Link href={`/products/${product.id}`} className={styles.linkOverlay}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                    />
                </Link>
                <button
                    className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
                    aria-label="Add to Wishlist"
                    onClick={toggleWishlist}
                    type="button"
                >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                {product.isNew && <span className={styles.badge}>New In</span>}
            </div>

            <Link href={`/products/${product.id}`} className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>₹{product.price.toLocaleString()}</p>
            </Link>
        </div>
    );
}
