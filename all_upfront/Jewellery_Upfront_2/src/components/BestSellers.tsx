"use client";

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import styles from './BestSellers.module.css';
import { products as staticProducts, Product } from '@/data/products';
import ProductCard from './ProductCard';
import { useStoreContext } from '@/context/store-context';
import { StorefrontAPI } from '@/lib/api';

export default function BestSellers() {
    const { sections, customization, loading: contextLoading } = useStoreContext();
    const [products, setProducts] = useState<any[]>([]);
    const [sectionTitle, setSectionTitle] = useState("Best Sellers");
    const [loadingProducts, setLoadingProducts] = useState(true);

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'featuredProducts' }, '*');
        }
    };

    useEffect(() => {
        if (contextLoading) return;

        const load = async () => {
            setLoadingProducts(true);
            try {
                // 1️⃣ Fetch real products from Orbit API
                const result = await StorefrontAPI.getProducts({ limit: 8 });
                const apiProducts = result?.products || [];
                if (apiProducts.length > 0) {
                    setProducts(apiProducts);
                    return;
                }
            } catch {
                // API failed — continue to fallbacks
            }

            // 2️⃣ Try sections context for featured/bestseller items
            if (sections) {
                const sectionConfig = Object.values(sections).find((s: any) =>
                    s.type === 'best_sellers' ||
                    s.type === 'featured' ||
                    s.id?.toLowerCase().includes('best') ||
                    s.id?.toLowerCase().includes('feat') ||
                    s.title?.toLowerCase().includes('best')
                ) as any;

                if (sectionConfig?.products?.length > 0) {
                    setProducts(sectionConfig.products);
                    if (sectionConfig.title) setSectionTitle(sectionConfig.title);
                    return;
                }
            }

            // 3️⃣ Ultimate fallback: static dummy products
            const bestSellers = staticProducts.filter(p => p.isBestSeller).slice(0, 6);
            setProducts([...bestSellers, ...staticProducts.filter(p => !p.isBestSeller).slice(0, 6 - bestSellers.length)]);
        };

        load().finally(() => setLoadingProducts(false));
    }, [sections, contextLoading]);

    const displayTitle = customization?.featuredProducts?.title || sectionTitle;

    if (contextLoading || loadingProducts) return (
        <section className={`${styles.section} ${styles.editorSection}`} onClick={handleSectionClick}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className="heading-secondary">{displayTitle}</h2>
                </div>
                <div className={styles.grid}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ height: 300, background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <section
            className={`${styles.section} ${styles.editorSection}`}
            onClick={handleSectionClick}
        >
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.trustBadge}>
                        <div className={styles.stars}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                        <span className={styles.trustText}>10,000+ Happy Customers</span>
                    </div>
                    <h2 className="heading-secondary">{displayTitle}</h2>
                </div>

                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
