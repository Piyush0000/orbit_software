'use client';

import Link from 'next/link';

interface SubCategory {
    title: string;
    items: string[];
}

const MENU_DATA: Record<string, SubCategory[]> = {
    Men: [
        {
            title: 'Topwear',
            items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Jackets', 'Blazers & Coats', 'Suits']
        },
        {
            title: 'Bottomwear',
            items: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants & Joggers']
        }
    ],
    Women: [
        {
            title: 'Indian & Fusion Wear',
            items: ['Kurtas & Suits', 'Kurtis, Tunics & Tops', 'Sarees', 'Ethnic Wear', 'Leggings', 'Lehenga Cholis']
        },
        {
            title: 'Western Wear',
            items: ['Dresses', 'Tops', 'Tshirts', 'Jeans', 'Trousers & Capris', 'Shorts & Skirts', 'Jumpsuits']
        }
    ],
    Kids: [
        {
            title: 'Boys Clothing',
            items: ['T-Shirts', 'Shirts', 'Shorts', 'Jeans', 'Trousers', 'Clothing Sets']
        },
        {
            title: 'Girls Clothing',
            items: ['Dresses', 'Tops', 'Tshirts', 'Clothing Sets', 'Lehenga Cholis', 'Dungarees']
        }
    ]
};

interface MegaMenuProps {
    category: string;
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function MegaMenu({ category, isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
    const categories = MENU_DATA[category];

    if (!categories) return null;

    return (
        <div
            className={`absolute top-full left-0 w-full bg-[var(--card-bg)] border-t border-[var(--card-border)] transition-all duration-300 transform origin-top z-40 ${isOpen ? 'opacity-100 visible translate-y-0 shadow-2xl' : 'opacity-0 invisible -translate-y-2'
                }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
                <div className="grid grid-cols-5 gap-12">
                    {categories.map((section, idx) => (
                        <div key={idx} className="flex flex-col space-y-6">
                            <h3 className="font-heading font-medium text-lg text-[var(--text-primary)] uppercase tracking-tight border-b border-[var(--text-primary)] pb-2">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        <Link
                                            href={`/products?category=${category}&subcategory=${encodeURIComponent(item)}`}
                                            className="text-sm font-light text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-200 block"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Optional: Add a visual Promo card in the 5th column if space permits, or leave as whitespace */}
                    <div className="hidden lg:block relative h-full min-h-[200px] bg-[var(--section-alt)] p-6 flex flex-col justify-end">
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">New Arrivals</p>
                        <p className="font-heading text-2xl uppercase leading-none mb-4 text-[var(--text-primary)]">Summer Collection 2026</p>
                        <Link href="/products" className="text-xs font-bold uppercase tracking-widest border-b border-[var(--text-primary)] self-start pb-1 text-[var(--text-primary)]">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
