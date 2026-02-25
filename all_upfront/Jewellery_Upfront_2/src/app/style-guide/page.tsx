import Image from 'next/image';
import styles from './StyleGuide.module.css';

export default function StyleGuideData() {
    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>The 2026 Lookbook</h1>
                    <p>Curated styles for the modern muse.</p>
                </div>
            </div>

            <div className={styles.lookbookGrid}>
                {/* Look 1 */}
                <div className={styles.lookCard}>
                    <div className={styles.lookImageWrapper}>
                        <Image src="/hero_model_jewellery.png" alt="Festive Look" fill className={styles.lookImage} />
                    </div>
                    <div className={styles.lookDetails}>
                        <h2 className={styles.lookTitle}>Golden Hour Gala</h2>
                        <p className={styles.lookPrice}>Complete Look: ₹45,000</p>

                        <div className={styles.productsUsed}>
                            {/* Product Thumbnails */}
                            <div className={styles.miniProduct}><Image src="/gold_ring_product.png" alt="Ring" fill style={{ objectFit: 'cover' }} /></div>
                            <div className={styles.miniProduct}></div>
                            <div className={styles.miniProduct}></div>
                        </div>

                        <button className={styles.addAllBtn}>Shop This Look</button>
                    </div>
                </div>

                {/* Look 2 */}
                <div className={styles.lookCard}>
                    <div className={styles.lookImageWrapper}>
                        <Image src="/hero_model_jewellery.png" alt="Minimalist Office" fill className={styles.lookImage} />
                    </div>
                    <div className={styles.lookDetails}>
                        <h2 className={styles.lookTitle}>Minimalist Chic</h2>
                        <p className={styles.lookPrice}>Complete Look: ₹12,500</p>

                        <div className={styles.productsUsed}>
                            <div className={styles.miniProduct}></div>
                            <div className={styles.miniProduct}></div>
                        </div>

                        <button className={styles.addAllBtn}>Shop This Look</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
