import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

import { useStoreContext } from '@/context/store-context';

export default function Hero() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Timeless Elegance";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Collection 2026";
    const description = customization?.heroSection?.description || "Redefining luxury with handcrafted pieces that celebrate your unique story.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Discover";
    const bgImage = customization?.heroSection?.backgroundImage;

    return (
        <section 
            className={`${styles.hero} ${styles.editorSection}`}
            onClick={handleSectionClick}
        >
            <div className={styles.container}>
                <div className={styles.textLayer}>
                    <p className={styles.subheadline}>{subheadline}</p>
                    <h1 className={styles.headline}>
                        {headline.includes(" ") ? (
                            <>
                                <span className={styles.line1}>{headline.split(" ")[0]}</span>
                                <span className={styles.line2}>{headline.split(" ").slice(1).join(" ")}</span>
                            </>
                        ) : (
                            <span className={styles.line1}>{headline}</span>
                        )}
                    </h1>
                    <p className={styles.description}>
                        {description}
                    </p>
                    <div className={styles.ctaGroup}>
                        <Link href="/products" className={styles.primaryBtn}>
                            {ctaText}
                        </Link>
                        <Link href="/products?category=gifts" className={styles.secondaryBtn}>
                            Lookbook
                        </Link>
                    </div>
                </div>

                <div className={styles.imageLayer}>
                    <div className={styles.mainImageWrapper}>
                        <Image
                            src={bgImage || "/hero_luxury_jewellery_v2.png"}
                            alt="Luxury Jewellery Editorial"
                            fill
                            priority
                            className={styles.img}
                        />
                    </div>
                    <div className={styles.secondaryImageWrapper}>
                        <Image
                            src="/luxury_gift_box.png"
                            alt="Detail Shot"
                            fill
                            className={styles.img}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
