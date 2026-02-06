'use client';

import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/shop/ProductCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products-api';
import { mapApiProducts, type FootwearProduct } from '@/lib/product-adapter';

export default function WishlistPage() {
    const { wishlistItems } = useWishlist();
    const [products, setProducts] = useState<FootwearProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const apiProducts = await getProducts();
                setProducts(mapApiProducts(apiProducts));
            } catch (error) {
                console.error('Failed to load products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const wishlistedProducts = products.filter(product => wishlistItems.includes(product.id));

    if (loading) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '1rem' }}>My Wishlist</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Loading your wishlist...</p>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '1rem' }}>My Wishlist</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Your wishlist is empty.</p>
                <Link href="/shop" style={{
                    padding: '1rem 2rem',
                    background: 'black',
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>My Wishlist ({wishlistItems.length})</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {wishlistedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
