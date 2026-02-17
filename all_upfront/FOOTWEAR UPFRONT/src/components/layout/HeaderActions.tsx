'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react'; // Added useEffect
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext'; // Import useWishlist
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export function HeaderActions() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isLoggedIn, login, logout } = useAuth();
    const { wishlistItems } = useWishlist(); // Get wishlist items
    const { cartCount, openCart } = useCart();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch for local storage
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={styles.actions}>
            <div className={styles.searchContainer}>
                <button className={styles.iconBtn} aria-label="Search">
                    <Search size={22} strokeWidth={1.5} />
                </button>
            </div>

            <div className={styles.profileContainer}>
                <button
                    className={styles.iconBtn}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    aria-label="Profile"
                >
                    <User size={22} strokeWidth={1.5} />
                </button>

                {isProfileOpen && (
                    <div className={styles.dropdown} onMouseLeave={() => setIsProfileOpen(false)}>
                        {isLoggedIn ? (
                            <>
                                <Link href="/profile" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>My Profile</Link>
                                <Link href="/profile" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>Orders</Link>
                                <Link href="/wishlist" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>Wishlist</Link>
                                <Link href="/support" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>Support</Link>
                                <div className={styles.divider} />
                                <button
                                    className={`${styles.dropdownItem} ${styles.logout}`}
                                    onClick={() => {
                                        logout();
                                        setIsProfileOpen(false);
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>Login</Link>
                                <Link href="/login" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>Register</Link>
                                <Link href="/support" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>Support</Link>
                                <div className={styles.divider} />
                                <button
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                        login();
                                        setIsProfileOpen(false);
                                    }}
                                >
                                    Demo Login
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <Link href="/wishlist" className={styles.cartBtn} aria-label="Wishlist">
                <Heart size={22} strokeWidth={1.5} />
                {mounted && wishlistItems.length > 0 && (
                    <span className={styles.cartCount}>{wishlistItems.length}</span>
                )}
            </Link>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (cartCount > 0) openCart();
                    else window.location.href = '/cart'; // fallback or logic
                }}
                className={styles.cartBtn}
                aria-label="Cart"
                style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {mounted && cartCount > 0 && (
                    <span className={styles.cartCount}>{cartCount}</span>
                )}
            </button>
        </div>
    );
}
