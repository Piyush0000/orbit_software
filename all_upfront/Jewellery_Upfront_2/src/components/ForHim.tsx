import Image from 'next/image';
import Link from 'next/link';
import styles from './ForHim.module.css';

export default function ForHim() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.subtitle}>The Gentleman's Edit</span>
                    <h2 className={styles.title}>Refined Masculinity</h2>
                    <p className={styles.description}>
                        Discover our curated collection of men's jewellery. From geometric signet rings to minimalist chains,
                        each piece is crafted to add a touch of understated luxury to your everyday style.
                    </p>
                    <Link href="/products?category=mens">
                        <button className={styles.btn}>Shop For Him</button>
                    </Link>
                </div>

                <div className={styles.imageWrapper}>
                    {/* Reuse existing image as placeholder since generation failed - implies a gender neutral/generic luxury shot */}
                    <Image
                        src="/mens_jewellery_editorial.png"
                        alt="Men's Jewellery Collection"
                        fill
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}
