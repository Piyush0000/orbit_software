import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryGrid.module.css';

const categories = [
    { id: 1, name: 'Gold-Plated', image: '/hero_model_jewellery.png', slug: 'gold-plated' },
    { id: 2, name: 'Silver Collection', image: '/silver_jewellery_collection.png', slug: 'silver' },
    { id: 3, name: 'Kundan & Ethnic', image: '/hero_model_jewellery.png', slug: 'ethnic' }, // Reusing for demo
    { id: 4, name: 'Minimalist', image: '/silver_jewellery_collection.png', slug: 'minimalist' }, // Reusing for demo
    { id: 5, name: 'Party Wear', image: '/hero_model_jewellery.png', slug: 'party-wear' }, // Reusing for demo
    { id: 6, name: 'Daily Wear', image: '/silver_jewellery_collection.png', slug: 'daily-wear' }, // Reusing for demo
];

export default function CategoryGrid() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={`heading-secondary ${styles.heading}`}>Shop by Category</h2>
                <div className={styles.grid}>
                    {categories.map((cat) => (
                        <Link href={`/products?category=${cat.slug}`} key={cat.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <h3 className={styles.cardTitle}>{cat.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
