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
        },
        {
            title: 'Footwear',
            items: ['Casual Shoes', 'Sports Shoes', 'Formal Shoes', 'Sneakers', 'Sandals & Floaters', 'Flip Flops']
        },
        {
            title: 'Accessories',
            items: ['Wallets', 'Belts', 'Perfumes', 'Trimmers', 'Deodorants', 'Sunglasses']
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
        },
        {
            title: 'Footwear',
            items: ['Flats', 'Casual Shoes', 'Heels', 'Boots', 'Sports Shoes & Floaters']
        },
        {
            title: 'Beauty & Personal Care',
            items: ['Makeup', 'Skincare', 'Premium Beauty', 'Lipsticks', 'Fragrances']
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
        },
        {
            title: 'Footwear',
            items: ['Casual Shoes', 'Sports Shoes', 'School Shoes', 'Sandals', 'Flip Flops']
        },
        {
            title: 'Toys',
            items: ['Learning & Development', 'Activity Toys', 'Soft Toys', 'Action Figures']
        }
    ],
    Accessories: [
        {
            title: 'Fashion Accessories',
            items: ['Wallets', 'Belts', 'Sunglasses', 'Watches', 'Jewellery', 'Caps & Hats']
        },
        {
            title: 'Travel',
            items: ['Backpacks', 'Luggage', 'Trolleys', 'Handbags']
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
            className={`absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 transform origin-top z-40 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-5 gap-8">
                    {categories.map((section, idx) => (
                        <div key={idx} className="flex flex-col space-y-4">
                            <h3 className="font-bold text-sm text-pink-500 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        <Link
                                            href={`/products?category=${category}&subcategory=${encodeURIComponent(item)}`}
                                            className="text-sm text-gray-500 hover:text-black hover:font-bold transition-all block"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
