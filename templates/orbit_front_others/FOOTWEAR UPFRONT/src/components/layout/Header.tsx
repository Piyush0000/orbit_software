'use client';

import Link from 'next/link';
import { HeaderActions } from './HeaderActions';
import styles from './Header.module.css';
import { useStore } from '@/contexts/StoreContext';

export function Header() {
    const { store } = useStore();

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                {store?.name || 'Store'}
            </Link>

            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>Home</Link>
                <Link href="/shop" className={styles.navLink}>Men</Link>
                <Link href="/shop" className={styles.navLink}>Women</Link>
                <Link href="/shop" className={styles.navLink}>Kids</Link>
                <Link href="/shop" className={styles.navLink}>Sports</Link>
                <Link href="/shop" className={styles.navLink}>Sale</Link>
            </nav>

            <HeaderActions />
        </header>
    );
}

