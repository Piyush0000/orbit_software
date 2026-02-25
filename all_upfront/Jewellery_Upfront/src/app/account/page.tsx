"use client";

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Profile.module.css';

function ProfileContent() {
    const [activeTab, setActiveTab] = useState('settings');
    const { wishlist } = useWishlist();
    const { logout } = useAuth();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');

    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    // Filter products that are in wishlist
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            <User size={40} />
                        </div>
                        <h3 className={styles.userName}>Shreya Chauhan</h3>
                        <p className={styles.userEmail}>shreya@example.com</p>
                    </div>

                    <nav className={styles.nav}>
                        <div
                            className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <Package size={18} /> My Orders
                        </div>
                        <div
                            className={`${styles.navItem} ${activeTab === 'wishlist' ? styles.active : ''}`}
                            onClick={() => setActiveTab('wishlist')}
                        >
                            <Heart size={18} /> Wishlist
                        </div>
                        <div
                            className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <Settings size={18} /> Account Settings
                        </div>
                        <div
                            className={styles.navItem}
                            style={{ marginTop: '1rem', color: '#d32f2f' }}
                            onClick={logout}
                        >
                            <LogOut size={18} /> Sign Out
                        </div>
                    </nav>
                </aside>

                {/* Content Area */}
                <main className={styles.content}>
                    {activeTab === 'wishlist' && (
                        <div>
                            <h2 className={styles.sectionTitle}>My Wishlist ({wishlistProducts.length})</h2>
                            {wishlistProducts.length > 0 ? (
                                <div className={styles.grid}>
                                    {wishlistProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem', background: '#f9f9f9', borderRadius: '8px' }}>
                                    <Heart size={40} color="#ccc" style={{ marginBottom: '1rem' }} />
                                    <p style={{ color: '#555', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Your wishlist is empty.</p>
                                    <button
                                        className={styles.saveBtn}
                                        onClick={() => window.location.href = '/products'}
                                        style={{ maxWidth: '200px', margin: '0 auto' }}
                                    >
                                        Explore Collection
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <h2 className={styles.sectionTitle}>My Orders</h2>
                            <div className={styles.orderCard}>
                                <div className={styles.orderHeader}>
                                    <span className={styles.orderId}>Order #LUM-8821</span>
                                    <span className={styles.orderStatus}>Delivered</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {/* Mock Order Item */}
                                    <div style={{ width: 50, height: 50, background: '#eee', borderRadius: 4 }}></div>
                                    <div>
                                        <p>Eternal Gold Ring</p>
                                        <p style={{ fontSize: '0.9rem', color: '#666' }}>₹15,999</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className={styles.sectionTitle}>Account Settings</h2>
                            <form className={styles.formGrid} onSubmit={(e) => e.preventDefault()}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>First Name</label>
                                    <input type="text" defaultValue="Shreya" className={styles.input} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Last Name</label>
                                    <input type="text" defaultValue="Chauhan" className={styles.input} />
                                </div>
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Email Address</label>
                                    <input type="email" defaultValue="shreya@example.com" className={styles.input} />
                                </div>
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Phone Number</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className={styles.input} />
                                </div>
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Delivery Address</label>
                                    <input type="text" defaultValue="123, Park Avenue, Indiranagar" className={styles.input} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>City</label>
                                    <input type="text" defaultValue="Bangalore" className={styles.input} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Pincode</label>
                                    <input type="text" defaultValue="560038" className={styles.input} />
                                </div>

                                <button type="submit" className={styles.saveBtn}>Save Changes</button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Account...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
