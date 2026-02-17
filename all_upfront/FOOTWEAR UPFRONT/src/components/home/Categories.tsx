import Link from 'next/link';
import Image from 'next/image';
import styles from './Categories.module.css';

const categories = [
    { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2940&auto=format&fit=crop' },
    { name: 'Casual', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=2898&auto=format&fit=crop' },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop' },
    { name: 'Formal', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=3027&auto=format&fit=crop' },
    { name: 'Trending', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2264&auto=format&fit=crop' },
    { name: 'Sale', image: 'https://images.unsplash.com/photo-1630138767980-08a6b22c7a26?q=80&w=2836&auto=format&fit=crop' },
];

export function Categories() {
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Explore Collections</h2>
            <div className={styles.grid}>
                {categories.map((cat, index) => (
                    <Link href="/shop" key={index} className={styles.card}>
                        <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className={styles.cardImage}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className={styles.overlay}>
                            <h3 className={styles.cardTitle}>{cat.name}</h3>
                            <div className={styles.cardAction}>Shop Now &rarr;</div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
