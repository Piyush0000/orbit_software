"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

import { useStoreContext } from '@/context/store-context';

export default function Header() {
    const { customization, storeInfo } = useStoreContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();
    const { wishlist } = useWishlist();
    const { cartCount } = useCart();

    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const isMen = category === 'mens' || (typeof category === 'string' && ['chains', 'cufflinks'].includes(category));

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const logoText = customization?.headerStyle?.storeName || customization?.headerStyle?.logoText || storeInfo?.name || "LUMIÈRE";
    const logoUrl = customization?.headerStyle?.logoUrl;
    const announcementText = customization?.announcementBar?.text;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const womenLinks = [
        { name: 'Necklaces', href: '/products?category=necklaces' },
        { name: 'Earrings', href: '/products?category=earrings' },
        { name: 'Rings', href: '/products?category=rings' },
        { name: 'Bracelets', href: '/products?category=bracelets' },
        { name: 'Gifts', href: '/products?category=gifts' },
    ];

    const menLinks = [
        { name: 'Chains', href: '/products?category=chains' },
        { name: 'Rings', href: '/products?category=rings' },
        { name: 'Bracelets', href: '/products?category=bracelets' },
        { name: 'Cufflinks', href: '/products?category=cufflinks' },
        { name: 'Earrings', href: '/products?category=earrings' },
    ];

    const navLinks = isMen ? menLinks : womenLinks;

    return (
        <div className={styles.headerWrapper}>
            {announcementText && (
                <div 
                    className={`${styles.announcementBar} ${styles.editorSection}`}
                    onClick={handleSectionClick('announcementBar')}
                >
                    {announcementText}
                </div>
            )}
            <header 
                className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${styles.editorSection}`}
                style={{ top: announcementText ? '36px' : '0' }}
                onClick={handleSectionClick('headerStyle')}
            >
                <div className={styles.headerContent}>
                    {/* Top Row: Gender, Logo, Utilities */}
                    <div className={styles.topRow}>
                        <div className={styles.leftMeta}>
                            <button
                                className={styles.mobileMenuBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMobileMenuOpen(!isMobileMenuOpen);
                                }}
                                aria-label="Toggle Menu"
                            >
                                <Menu size={24} strokeWidth={1.5} />
                            </button>

                            <div className={styles.genderToggle}>
                                <Link href="/" className={!isMen ? styles.activeGender : styles.inactiveGender}>WOMEN</Link>
                                <span className={styles.divider}>|</span>
                                <Link href="/products?category=mens" className={isMen ? styles.activeGender : styles.inactiveGender}>MEN</Link>
                            </div>
                        </div>

                        <Link href="/" className={styles.logo}>
                            {logoUrl ? (
                                <img src={logoUrl} alt={logoText} className="h-10 object-contain" />
                            ) : (
                                logoText
                            )}
                        </Link>

                        <div className={styles.utilities}>
                            <button className={styles.iconBtn} aria-label="Search">
                                <Search size={22} strokeWidth={1} />
                            </button>
                            <Link href={user ? "/account" : "/login"} className={styles.iconBtn} aria-label={user ? "Account" : "Login"}>
                                <User size={22} strokeWidth={1} />
                            </Link>
                            <Link href={user ? "/account?tab=wishlist" : "/login"} className={styles.iconBtn} aria-label="Wishlist">
                                <Heart size={22} strokeWidth={1} />
                                {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
                            </Link>
                            <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
                                <ShoppingBag size={22} strokeWidth={1} />
                                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Row: Navigation */}
                    <nav className={`${styles.bottomNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
                        <ul className={styles.navLinks}>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={styles.navLink}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>
            <div style={{ height: announcementText ? '150px' : '120px' }} />
        </div>
    );
}
