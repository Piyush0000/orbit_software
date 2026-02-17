import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={`${styles.column} ${styles.brandColumn}`}>
                    <h3>Upfront</h3>
                    <p>
                        Premium footwear designed for performance and style.
                        Walk your way with confidence.
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>Shop</h3>
                    <ul>
                        <li><Link href="/shop">Men</Link></li>
                        <li><Link href="/shop">Women</Link></li>
                        <li><Link href="/shop">Kids</Link></li>
                        <li><Link href="/shop">New Arrivals</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Support</h3>
                    <ul>
                        <li><Link href="/help">Help Center</Link></li>
                        <li><Link href="/returns">Returns & Exchanges</Link></li>
                        <li><Link href="/size-guide">Size Guide</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                &copy; {new Date().getFullYear()} Upfront Footwear. All rights reserved.
            </div>
        </footer>
    );
}
