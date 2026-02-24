'use client';

import Link from 'next/link';
import { HeaderActions } from './HeaderActions';
import styles from './Header.module.css';
import { useStoreContext } from '../../../context/store-context';

export function Header() {
    const { customization, storeInfo } = useStoreContext();

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const logoText = customization?.headerStyle?.storeName || customization?.headerStyle?.logoText || storeInfo?.name || "Upfront";
    const logoUrl = customization?.headerStyle?.logoUrl;
    const announcementText = customization?.announcementBar?.text;

    return (
        <div className={styles.headerWrapper}>
            {announcementText && (
                <div 
                    className={styles.announcementBar}
                    onClick={handleSectionClick('announcementBar')}
                >
                    {announcementText}
                </div>
            )}
            <header 
                className={`${styles.header} ${styles.editorSection}`}
                onClick={handleSectionClick('headerStyle')}
            >
                <Link href="/" className={styles.logo}>
                    {logoUrl ? (
                        <img src={logoUrl} alt={logoText} style={{ height: '40px', objectFit: 'contain' }} />
                    ) : (
                        logoText
                    )}
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
        </div>
    );
}

