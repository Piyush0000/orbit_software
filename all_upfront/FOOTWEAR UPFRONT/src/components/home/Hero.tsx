import Link from 'next/link';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Walk Your Way</h1>
                <p className={styles.subtitle}>Built for every step. Premium comfort, unmatched style.</p>

                <div className={styles.actions}>
                    <Link href="/shop">
                        <Button variant="accent" size="lg">Shop Men</Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="secondary" size="lg">Shop Women</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
