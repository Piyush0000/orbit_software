"use client";

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './NewArrivals.module.css';
import { products as staticProducts } from '@/data/products';
import ProductCard from './ProductCard';
import { StorefrontAPI } from '@/lib/api';
import { useStoreContext } from '@/context/store-context';

export default function NewArrivals() {
    const { sections, customization, loading: contextLoading } = useStoreContext();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [title, setTitle] = useState("New Arrivals");
    const [subTitle, setSubTitle] = useState("Just Launched");
    const [loadingProducts, setLoadingProducts] = useState(true);

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'newArrivalsSection' }, '*');
        }
    };

    useEffect(() => {
        if (contextLoading) return;

        const load = async () => {
            setLoadingProducts(true);
            try {
                // 1️⃣ Fetch real new-arrivals products from Orbit API
                const result = await StorefrontAPI.getProducts({ category: 'new-arrivals', limit: 10 });
                const apiProducts = result?.products || [];
                if (apiProducts.length > 0) {
                    setProducts(apiProducts);
                    return;
                }

                // Try generic products if no "new-arrivals" category exists
                const allResult = await StorefrontAPI.getProducts({ limit: 10 });
                const allProducts = allResult?.products || [];
                if (allProducts.length > 0) {
                    setProducts(allProducts);
                    return;
                }
            } catch {
                // API failed — continue to fallbacks
            }

            // 2️⃣ Try sections context
            if (sections) {
                const sectionConfig = Object.values(sections).find((s: any) =>
                    s.type === 'new_arrivals' ||
                    s.id?.includes('new') ||
                    s.title?.toLowerCase().includes('new')
                ) as any;

                if (sectionConfig?.products?.length > 0) {
                    setProducts(sectionConfig.products);
                    if (sectionConfig.title) setTitle(sectionConfig.title);
                    if (sectionConfig.subtitle) setSubTitle(sectionConfig.subtitle);
                    return;
                }
            }

            // 3️⃣ Removing frontend dummy fallback per user request
            setProducts([]);
        };

        load().finally(() => setLoadingProducts(false));
    }, [sections, contextLoading]);

    // Override from customization if set
    const displayTitle = customization?.newArrivalsSection?.title || title;
    const displaySubTitle = customization?.newArrivalsSection?.subtitle || subTitle;

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
        }
    };

    if (contextLoading || loadingProducts) return (
        <section className={`${styles.section} ${styles.editorSection}`} onClick={handleSectionClick}>
            <div className={styles.headingWrapper}>
                <span className={styles.subHeading}>{displaySubTitle}</span>
                <h2 className={`heading-secondary ${styles.heading}`}>{displayTitle}</h2>
            </div>
            <div className="flex items-center justify-center h-48">
                <p className="text-zinc-500 animate-pulse">Loading amazing collections...</p>
            </div>
        </section>
    );

    return (
        <section
            className={`${styles.section} ${styles.editorSection}`}
            onClick={handleSectionClick}
        >
            <div className={styles.headingWrapper}>
                <span className={styles.subHeading}>{displaySubTitle}</span>
                <h2 className={`heading-secondary ${styles.heading}`}>{displayTitle}</h2>
            </div>

            <div className={styles.carousel} ref={carouselRef}>
                {products.map((product) => (
                    <div key={product.id} className={styles.carouselItem}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {/* Duplicate for carousel fill if few items */}
                {products.length < 4 && products.map((product) => (
                    <div key={`dup-${product.id}`} className={styles.carouselItem}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className={styles.controls}>
                <button onClick={(e) => { e.stopPropagation(); scroll('left'); }} className={styles.controlBtn} aria-label="Previous">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); scroll('right'); }} className={styles.controlBtn} aria-label="Next">
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}
