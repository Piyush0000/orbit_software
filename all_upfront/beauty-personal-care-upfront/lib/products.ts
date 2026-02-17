export type Review = {
    id: string;
    user: string;
    rating: number;
    date: string;
    title: string;
    comment: string;
    verified?: boolean;
};

export type FAQItem = {
    question: string;
    answer: string;
};

export type Product = {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    skinType: string[];
    concern: string[];
    productType: "Serum" | "Cream" | "Cleanser" | "Toner" | "Mask" | "Sunscreen" | "Moisturizer";
    image: string;
    images: string[];
    tags: string[];
    description: string;
    benefits: string[];
    ingredients: { name: string; description: string; featured: boolean }[];
    usage: string[];
    warnings?: string;
    bestseller?: boolean;
    variants?: { id: string; name: string; price: number }[];
    userReviews?: Review[];
    faqs?: FAQItem[];
};

export const products: Product[] = [
    {
        id: "1",
        name: "Luminous Glow Serum",
        price: 3599,
        rating: 4.8,
        reviews: 128,
        category: "Skincare",
        skinType: ["All", "Dull", "Dry"],
        concern: ["Dullness", "Uneven Tone"],
        productType: "Serum",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600", // Placeholder
        ],
        tags: ["Vitamin C", "Brightening", "Bestseller"],
        description: "Reveal your natural radiance with our concentrated Vitamin C serum. Designed to fade dark spots and even out skin tone, this lightweight formula absorbs instantly to deliver a powerful antioxidant boost.",
        benefits: [
            "Brightens dull skin instantly",
            "Reduces appearance of dark spots",
            "Protects against environmental stressors"
        ],
        ingredients: [
            { name: "Vitamin C (15%)", description: "Potent antioxidant that brightens and protects.", featured: true },
            { name: "Hyaluronic Acid", description: "Hydrates and plumps skin.", featured: true },
            { name: "Ferulic Acid", description: "Boosts efficacy of Vitamin C.", featured: false }
        ],
        usage: [
            "Cleanse skin thoroughly.",
            "Apply 3-4 drops to face and neck.",
            "Follow with moisturizer.",
            "Use consistently in the morning."
        ],
        warnings: "For external use only. Patch test recommended. Discontinue if irritation occurs.",
        bestseller: true,
        variants: [
            { id: "1-30ml", name: "30ml", price: 3599 },
            { id: "1-50ml", name: "50ml", price: 5499 }
        ],
        userReviews: [
            {
                id: "r1",
                user: "Sarah M.",
                rating: 5,
                date: "2 months ago",
                title: "Game changer for dark spots!",
                comment: "I've been using this for 6 weeks and my acne scars have significantly faded. It gives such a nice glow without being sticky.",
                verified: true
            },
            {
                id: "r2",
                user: "Jessica K.",
                rating: 5,
                date: "1 month ago",
                title: "Best Vitamin C I've tried",
                comment: "Doesn't oxidize quickly like other brands. Smells fresh and feels great on the skin.",
                verified: true
            },
            {
                id: "r3",
                user: "Emily R.",
                rating: 4,
                date: "3 weeks ago",
                title: "Good but pricey",
                comment: "The results are there, but I wish the bottle was bigger for the price. Still, I will probably repurchase.",
                verified: false
            }
        ],
        faqs: [
            {
                question: "Can I use this with retinol?",
                answer: "Yes, you can use Vitamin C in the morning and Retinol at night. Avoid using them at the exact same time to prevent irritation."
            },
            {
                question: "Is this suitable for sensitive skin?",
                answer: "Our formula is gentle, but Vitamin C can be potent. We recommend patch testing first or starting with every other day usage."
            },
            {
                question: "How long does a bottle last?",
                answer: "With daily use (3-4 drops), a 30ml bottle typically lasts about 2-3 months."
            }
        ]
    },
    {
        id: "2",
        name: "Hydra-Barrier Cream",
        price: 2999,
        rating: 4.6,
        reviews: 94,
        category: "Skincare",
        skinType: ["Dry", "Sensitive", "Normal"],
        concern: ["Dryness", "Sensitivity"],
        productType: "Cream",
        image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
        ],
        tags: ["Ceramides", "Soothing", "Fragrance-Free"],
        description: "Lock in moisture and repair your skin barrier with this rich, non-greasy cream. Formulated with ceramides and calming botanicals, it comforts stressed skin immediately.",
        benefits: [
            "Deeply hydrates for 24 hours",
            "Strengthens skin's natural barrier",
            "Soothes redness and irritation"
        ],
        ingredients: [
            { name: "Ceramide Complex", description: "Restores protective skin barrier.", featured: true },
            { name: "Squalane", description: "Prevents moisture loss.", featured: true },
            { name: "Centella Asiatica", description: "Calms inflammation.", featured: false }
        ],
        usage: [
            "Use as the last step of your PM routine.",
            "Warm a pea-sized amount in palms.",
            "Gently press into skin."
        ],
        bestseller: false,
        variants: [
            { id: "2-50ml", name: "50ml", price: 2999 },
            { id: "2-100ml", name: "100ml", price: 4999 }
        ]
    },
    {
        id: "3",
        name: "Purifying Clay Mask",
        price: 2499,
        rating: 4.7,
        reviews: 210,
        category: "Skincare",
        skinType: ["Oily", "Combination", "Acne-Prone"],
        concern: ["Pores", "Oiliness"],
        productType: "Mask",
        image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600",
        ],
        tags: ["Detox", "Pore Minimizing"],
        description: "A deep-cleansing mask that draws out impurities and excess oil without stripping the skin. Leaves pores looking visibly smaller and skin feeling refreshed.",
        benefits: [
            "Unclogs and tightens pores",
            "Absorbs excess sebum",
            "Leaves skin matte and smooth"
        ],
        ingredients: [
            { name: "Kaolin Clay", description: "Gently absorbs oil and impurities.", featured: true },
            { name: "Charcoal Powder", description: "Detoxifies skin.", featured: true },
            { name: "Salicylic Acid", description: "Exfoliates inside pores.", featured: false }
        ],
        usage: [
            "Apply a thin layer to clean, dry skin.",
            "Leave on for 10-15 minutes.",
            "Rinse thoroughly with warm water.",
            "Use 1-2 times weekly."
        ],
        bestseller: true,
        variants: [
            { id: "3-100g", name: "100g", price: 2499 }
        ]
    },
    {
        id: "4",
        name: "Retinol Renew Serum",
        price: 4999,
        rating: 4.9,
        reviews: 340,
        category: "Skincare",
        skinType: ["Mature", "All"],
        concern: ["Aging", "Wrinkles"],
        productType: "Serum",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=600",
        ],
        tags: ["Anti-Aging", "Night Care"],
        description: "Transform your skin overnight with our advanced encapsulated retinol serum. Minimizes fine lines and refines texture with minimal irritation.",
        benefits: [
            "Reduces appearance of wrinkles",
            "Improves skin texture and tone",
            "Boosts collagen production"
        ],
        ingredients: [
            { name: "Encapsulated Retinol", description: "Promotes cell turnover gracefully.", featured: true },
            { name: "Peptides", description: "Firm and strengthen skin.", featured: true },
            { name: "Niacinamide", description: "Soothes and brightens.", featured: false }
        ],
        usage: [
            "Apply at night to clean, dry skin.",
            "Start usage 2-3 times a week.",
            "Always use sunscreen the next morning."
        ],
        warnings: "Not safe for use during pregnancy or breastfeeding. Use SPF daily.",
        bestseller: true,
        variants: [
            { id: "4-30ml", name: "30ml", price: 4999 }
        ]
    },
    {
        id: "5",
        name: "Gentle Milky Cleanser",
        price: 1899,
        rating: 4.5,
        reviews: 85,
        category: "Skincare",
        skinType: ["Sensitive", "Dry", "Normal"],
        concern: ["Dryness", "Makeup Removal"],
        productType: "Cleanser",
        image: "https://images.unsplash.com/photo-1556228578-8d8948272d56?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1556228578-8d8948272d56?auto=format&fit=crop&q=80&w=600",
        ],
        tags: ["Sulfate-Free", "Daily Use"],
        description: "A soft, non-foaming cleanser that melts away makeup and impurities while maintaining skin's moisture balance.",
        benefits: [
            "Cleanses without stripping",
            "Softer, hydrated skin feel",
            "Safe for eye makeup removal"
        ],
        ingredients: [
            { name: "Oat Extract", description: "Soothes irritated skin.", featured: true },
            { name: "Glycerin", description: "Hydrates and softens.", featured: false }
        ],
        usage: [
            "Massage onto dry or damp skin.",
            "Rinse with lukewarm water.",
            "Use morning and night."
        ],
        bestseller: false,
        variants: [
            { id: "5-150ml", name: "150ml", price: 1899 },
            { id: "5-300ml", name: "300ml", price: 2999 }
        ]
    },
];

export const filters = {
    categories: ["Skincare", "Makeup", "Haircare", "Body", "Fragrance"],
    skinTypes: ["Dry", "Oily", "Combination", "Normal", "Sensitive", "Mature"],
    productTypes: ["Cleanser", "Toner", "Serum", "Moisturizer", "Cream", "Mask", "Sunscreen"],
    priceRanges: [
        { label: "Under ₹2000", min: 0, max: 2000 },
        { label: "₹2000 - ₹4000", min: 2000, max: 4000 },
        { label: "₹4000 - ₹8000", min: 4000, max: 8000 },
        { label: "₹8000+", min: 8000, max: 100000 },
    ]
};
