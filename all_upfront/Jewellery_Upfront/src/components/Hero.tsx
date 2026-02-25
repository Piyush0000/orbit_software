import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

// Note: In a real integration, the image source would be handled. 
// For now we assume the image will be placed in public folder as hero.jpg
// We also accept it as a prop for flexibility
import { useStoreContext } from '@/context/store-context';

export default function Hero() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Timeless Jewellery for Every Moment";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Explore the essence of elegance with our curated collection of premium jewellery.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop Collection";
    const bgImage = customization?.heroSection?.backgroundImage;

    return (
        <section 
            className={`${styles.hero} ${styles.editorSection}`}
            onClick={handleSectionClick}
        >
            <div className={styles.bgImage}>
                <Image
                    src={bgImage || "/hero_luxury_jewellery_v2.png"}
                    alt="Luxury Jewellery"
                    fill
                    priority
                    className={styles.img}
                />
            </div>

            <div className={styles.content}>
                <p className={styles.subheadline}>{subheadline}</p>
                <h1 className={styles.headline}>
                    {headline.includes("for Every") ? (
                        <>
                            {headline.split("for Every")[0]} <br /> for Every {headline.split("for Every")[1]}
                        </>
                    ) : headline}
                </h1>

                <div className={styles.ctaGroup}>
                    <Link href="/products" className={styles.primaryBtn}>
                        {ctaText}
                    </Link>
                    <Link href="/products?category=gifts" className={styles.secondaryBtn}>
                        Gift Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
