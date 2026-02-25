"use client";

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './ProductList.module.css';
import { ChevronDown } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

function ProductListContent() {
    const [sortBy, setSortBy] = useState('newest');
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    // Duplicate products to fill the grid for demo (if small count), but better to just use raw or duplicate filtered
    // Filtering logic
    const filteredProducts = products.filter(product => {
        if (!category) return true; // Show all
        if (category === 'mens') return product.gender === 'men';
        if (category === 'gifts') return true; // Show all for gifts demo
        return product.category === category;
    });

    // Handle "empty" selection by showing all if nothing matches (optional safety)
    const displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    {category === 'mens' ? 'Men\'s Collection' :
                        category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` :
                            'All Jewellery'}
                </h1>
                <div className={styles.breadcrumbs}>Home / Shop / {category || 'All'}</div>
            </header>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Category <ChevronDown size={16} /></h3>
                        <ul className={styles.filterList}>
                            {category === 'mens' || (category && ['chains', 'rings', 'bracelets', 'cufflinks', 'earrings'].includes(category)) ? (
                                <>
                                    <li className={styles.filterItem}><Link href="/products?category=chains">Chains</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=rings&gender=men">Rings</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=bracelets&gender=men">Bracelets</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=cufflinks">Cufflinks</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=earrings&gender=men">Earrings</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className={styles.filterItem}><Link href="/products?category=necklaces">Necklaces (120)</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=earrings">Earrings (85)</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=rings">Rings (45)</Link></li>
                                    <li className={styles.filterItem}><Link href="/products?category=bracelets">Bracelets (30)</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Price <ChevronDown size={16} /></h3>
                        <ul className={styles.filterList}>
                            <li className={styles.filterItem}><div className={styles.checkbox} /> Under ₹1,000</li>
                            <li className={styles.filterItem}><div className={styles.checkbox} /> ₹1,000 - ₹5,000</li>
                            <li className={styles.filterItem}><div className={styles.checkbox} /> ₹5,000 - ₹10,000</li>
                            <li className={styles.filterItem}><div className={styles.checkbox} /> Above ₹10,000</li>
                        </ul>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Material <ChevronDown size={16} /></h3>
                        <ul className={styles.filterList}>
                            <li className={styles.filterItem}>Gold Plated</li>
                            <li className={styles.filterItem}>Sterling Silver</li>
                            <li className={styles.filterItem}>Rose Gold</li>
                            <li className={styles.filterItem}>Oxidised Silver</li>
                        </ul>
                    </div>
                </aside>

                <div className={styles.mainContent}>
                    <div className={styles.toolbar}>
                        <span>Showing {displayedProducts.length} Products</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.sortSelect}
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Best Rated</option>
                        </select>
                    </div>

                    <div className={styles.productGrid}>
                        {displayedProducts.map((product, index) => (
                            <ProductCard key={`${product.id}-${index}`} product={product} />
                        ))}
                    </div>
                </div>
            </div >
        </div >
    );
}

export default function ProductListingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Products...</div>}>
            <ProductListContent />
        </Suspense>
    );
}
