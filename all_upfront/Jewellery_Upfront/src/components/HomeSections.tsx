import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Gem, Truck } from 'lucide-react';
import styles from './HomeSections.module.css';
import { useStoreContext } from '@/context/store-context';

export function GiftCollections() {
    const { customization } = useStoreContext();
    
    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'imageBannerSection' }, '*');
        }
    };

    return (
        <section 
            className={`${styles.section} ${styles.editorSection}`}
            onClick={handleSectionClick}
        >
            <div className="container">
                <h2 className={`heading-secondary ${styles.heading}`}>Gifts for Every Occasion</h2>
                <div className={styles.giftGrid}>
                    <div className={`${styles.giftCard} ${styles.giftCardLarge}`}>
                        <Link href="/products?category=gifts">
                            <Image src="/luxury_gift_box.png" alt="Wedding Gifts" fill className={styles.giftImage} />
                            <div className={styles.giftOverlay}>
                                <h3 className={styles.giftTitle}>Wedding Gifts</h3>
                                <span className={styles.giftBtn}>Shop Now</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.giftCard}>
                        <Link href="/products?category=gifts-her">
                            <Image src="/hero_model_jewellery.png" alt="For Her" fill className={styles.giftImage} />
                            <div className={styles.giftOverlay}>
                                <h3 className={styles.giftTitle}>For Her</h3>
                                <span className={styles.giftBtn}>Shop Now</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.giftCard}>
                        <Link href="/products?category=under-999">
                            <Image src="/silver_jewellery_collection.png" alt="Under ₹999" fill className={styles.giftImage} />
                            <div className={styles.giftOverlay}>
                                <h3 className={styles.giftTitle}>Under ₹999</h3>
                                <span className={styles.giftBtn}>Show Now</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function BrandStory() {
    const { customization } = useStoreContext();

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const aboutTitle = customization?.aboutSection?.title || "Why Choose Lumière";
    const aboutText = customization?.aboutSection?.description || customization?.aboutSection?.text || "We believe in crafting jewellery that tells a story. Each piece is designed with precision, passion, and a promise of quality.";

    return (
        <section className={styles.storySection}>
            <div 
                className={`container ${styles.editorSection}`}
                onClick={handleSectionClick('aboutSection')}
            >
                <h2 className="heading-secondary">{aboutTitle}</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
                    {aboutText}
                </p>
            </div>

            <div 
                className={`${styles.features} ${styles.editorSection}`}
                onClick={handleSectionClick('featuresSection')}
            >
                <div className={styles.feature}>
                    <div className={styles.iconWrapper}><ShieldCheck size={28} /></div>
                    <h3 className={styles.featureTitle}>Hypoallergenic</h3>
                    <p className={styles.featureDesc}>Safe for sensitive skin with nickel-free materials.</p>
                </div>
                <div className={styles.feature}>
                    <div className={styles.iconWrapper}><Sparkles size={28} /></div>
                    <h3 className={styles.featureTitle}>Anti-Tarnish</h3>
                    <p className={styles.featureDesc}>Premium plating that lasts and shines longer.</p>
                </div>
                <div className={styles.feature}>
                    <div className={styles.iconWrapper}><Gem size={28} /></div>
                    <h3 className={styles.featureTitle}>Handcrafted</h3>
                    <p className={styles.featureDesc}>Made by skilled artisans with attention to detail.</p>
                </div>
                <div className={styles.feature}>
                    <div className={styles.iconWrapper}><Truck size={28} /></div>
                    <h3 className={styles.featureTitle}>Express Delivery</h3>
                    <p className={styles.featureDesc}>Fast and secure shipping to your doorstep.</p>
                </div>
            </div>
        </section>
    );
}
