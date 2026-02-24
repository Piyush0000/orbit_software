'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';
import { useStoreContext } from '../../../context/store-context';

export function Hero() {
    const { customization } = useStoreContext();

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Walk Your Way";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Built for every step. Premium comfort, unmatched style.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop Men";
    const bgImage = customization?.heroSection?.backgroundImage;

    return (
        <section 
            className={`${styles.hero} ${styles.editorSection}`}
            style={bgImage ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${bgImage}")` } : {}}
            onClick={handleSectionClick('heroSection')}
        >
            <div className={styles.content}>
                <h1 className={styles.title}>{headline}</h1>
                <p className={styles.subtitle}>{subheadline}</p>

                <div className={styles.actions}>
                    <Link href="/shop">
                        <Button variant="accent" size="lg">{ctaText}</Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="secondary" size="lg">Shop Women</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
