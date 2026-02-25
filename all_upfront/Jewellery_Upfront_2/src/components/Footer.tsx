import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';
import { useStoreContext } from '@/context/store-context';

export default function Footer() {
    const { customization, storeInfo } = useStoreContext();

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const newsletterTitle = customization?.newsletterCatch?.title || "Newsletter";
    const newsletterText = customization?.newsletterCatch?.description || customization?.newsletterCatch?.text || "Subscribe to receive updates, access to exclusive deals, and more.";
    const copyrightText = customization?.footerStyle?.copyright || `© ${new Date().getFullYear()} ${storeInfo?.name || "Lumière Jewellery"}. All rights reserved.`;

    // Contact info — customization first, then storeInfo fallbacks
    const contactPhone = customization?.footerStyle?.contact?.phone || storeInfo?.phone || null;
    const contactEmail = customization?.footerStyle?.contact?.email || storeInfo?.email || null;
    const contactAddress = customization?.footerStyle?.contact?.address || storeInfo?.address || null;

    // Social links
    const instagramUrl = customization?.footerStyle?.socials?.instagram || customization?.socials?.instagram || '#';
    const facebookUrl = customization?.footerStyle?.socials?.facebook || customization?.socials?.facebook || '#';
    const twitterUrl = customization?.footerStyle?.socials?.twitter || customization?.socials?.twitter || '#';

    return (
        <footer
            className={`${styles.footer} ${styles.editorSection}`}
            onClick={handleSectionClick('footerStyle')}
        >
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.column}>
                        <h3>Shop</h3>
                        <ul>
                            <li><Link href="/products?category=necklaces" className={styles.link}>Necklaces</Link></li>
                            <li><Link href="/products?category=earrings" className={styles.link}>Earrings</Link></li>
                            <li><Link href="/products?category=rings" className={styles.link}>Rings</Link></li>
                            <li><Link href="/products?category=bracelets" className={styles.link}>Bracelets</Link></li>
                            <li><Link href="/products?category=gifts" className={styles.link}>Gift Cards</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>Support</h3>
                        <ul>
                            <li><Link href="/track-order" className={styles.link}>Track Order</Link></li>
                            <li><Link href="/shipping" className={styles.link}>Shipping & Returns</Link></li>
                            <li><Link href="/care" className={styles.link}>Jewellery Care</Link></li>
                            <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
                            <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>About</h3>
                        <ul>
                            <li><Link href="/story" className={styles.link}>Our Story</Link></li>
                            <li><Link href="/craftsmanship" className={styles.link}>Craftsmanship</Link></li>
                            <li><Link href="/sustainability" className={styles.link}>Sustainability</Link></li>
                            <li><Link href="/stores" className={styles.link}>Store Locator</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div
                        className={`${styles.column} ${styles.editorSection}`}
                        onClick={handleSectionClick('footerStyle')}
                    >
                        <h3>Contact Us</h3>
                        <ul className={styles.contactList}>
                            {contactPhone && (
                                <li className={styles.contactItem}>
                                    <Phone size={14} className={styles.contactIcon} />
                                    <a href={`tel:${contactPhone}`} className={styles.link}>{contactPhone}</a>
                                </li>
                            )}
                            {contactEmail && (
                                <li className={styles.contactItem}>
                                    <Mail size={14} className={styles.contactIcon} />
                                    <a href={`mailto:${contactEmail}`} className={styles.link}>{contactEmail}</a>
                                </li>
                            )}
                            {contactAddress && (
                                <li className={styles.contactItem}>
                                    <MapPin size={14} className={styles.contactIcon} />
                                    <span className={styles.link}>{contactAddress}</span>
                                </li>
                            )}
                            {!contactPhone && !contactEmail && !contactAddress && (
                                <>
                                    <li className={styles.contactItem}>
                                        <Phone size={14} className={styles.contactIcon} />
                                        <a href="tel:+911800000000" className={styles.link}>+91 1800-000-000</a>
                                    </li>
                                    <li className={styles.contactItem}>
                                        <Mail size={14} className={styles.contactIcon} />
                                        <a href="mailto:hello@lumiere.in" className={styles.link}>hello@lumiere.in</a>
                                    </li>
                                    <li className={styles.contactItem}>
                                        <MapPin size={14} className={styles.contactIcon} />
                                        <span className={styles.link}>Mumbai, Maharashtra, India</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div
                        className={`${styles.column} ${styles.newsletter} ${styles.editorSection}`}
                        onClick={handleSectionClick('newsletterCatch')}
                    >
                        <h3>{newsletterTitle}</h3>
                        <p>{newsletterText}</p>
                        <form className={styles.inputGroup} onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email" className={styles.input} />
                            <button type="submit" className={styles.button}>Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.socials}>
                        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.link}><Instagram size={20} /></a>
                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={styles.link}><Facebook size={20} /></a>
                        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={styles.link}><Twitter size={20} /></a>
                    </div>
                    <p className={styles.copyright}>{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}
