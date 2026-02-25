export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: {
        main: string;
        hover: string;
        gallery: string[];
    };
    attributes: {
        material: string;
        metalColor: string[];
        stoneType: string;
        weight: string;
        occasion: string[];
    };
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    description: string;
    stock: number;
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Ethereal Diamond Solitaire Ring",
        slug: "ethereal-diamond-solitaire-ring",
        sku: "RNG-001-GLD",
        price: 45999,
        originalPrice: 52999,
        category: "rings",
        images: {
            main: "https://images.unsplash.com/photo-1605100804763-ebea643341d5?q=80&w=800&auto=format&fit=crop",
            hover: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
            gallery: [
                "https://images.unsplash.com/photo-1605100804763-ebea643341d5?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
            ]
        },
        attributes: {
            material: "18k Gold",
            metalColor: ["Yellow Gold", "Rose Gold", "White Gold"],
            stoneType: "Diamond",
            weight: "3.5g",
            occasion: ["Engagement", "Anniversary"],
        },
        rating: 4.9,
        reviewCount: 124,
        isNew: true,
        isBestSeller: true,
        description: "A timeless solitaire ring featuring a brilliant-cut diamond set in 18k gold. Designed to capture light from every angle, this piece is the epitome of elegance.",
        stock: 10,
    },
    {
        id: "2",
        name: "Royale Kundan Choker Set",
        slug: "royale-kundan-choker-set",
        sku: "SET-002-KDN",
        price: 125000,
        category: "sets",
        images: {
            main: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
            hover: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
            gallery: [
                "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
            ]
        },
        attributes: {
            material: "22k Gold Plated",
            metalColor: ["Yellow Gold"],
            stoneType: "Kundan & Polki",
            weight: "85g",
            occasion: ["Wedding", "Festive"],
        },
        rating: 5.0,
        reviewCount: 45,
        isBestSeller: true,
        description: "Handcrafted intricate Kundan choker set with matching earrings. Perfect for weddings and grand occasions.",
        stock: 5,
    },
    {
        id: "3",
        name: "Minimalist Pearl Drop Earrings",
        slug: "minimalist-pearl-drop-earrings",
        sku: "EAR-003-PRL",
        price: 2499,
        originalPrice: 3999,
        category: "earrings",
        images: {
            main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
            hover: "https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=800&auto=format&fit=crop",
            gallery: [
                "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=800&auto=format&fit=crop",
            ]
        },
        attributes: {
            material: "Sterling Silver",
            metalColor: ["Silver", "Rose Gold"],
            stoneType: "Pearl",
            weight: "2g",
            occasion: ["Daily Wear", "Office Wear"],
        },
        rating: 4.7,
        reviewCount: 89,
        isNew: true,
        description: "Elegant freshwater pearls suspended from a delicate silver chain. A perfect blend of modern minimalism and classic charm.",
        stock: 50,
    },
    {
        id: "4",
        name: "Rose Gold Tennis Bracelet",
        slug: "rose-gold-tennis-bracelet",
        sku: "BRC-004-RG",
        price: 15999,
        category: "bracelets",
        images: {
            main: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
            hover: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop",
            gallery: [
                "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop",
            ]
        },
        attributes: {
            material: "14k Rose Gold",
            metalColor: ["Rose Gold"],
            stoneType: "Zirconia",
            weight: "8g",
            occasion: ["Party Wear", "Gift"],
        },
        rating: 4.8,
        reviewCount: 32,
        description: "A continuous line of brilliance. This tennis bracelet features high-quality zirconia stones set in radiant rose gold.",
        stock: 15,
    },
    {
        id: "5",
        name: "Antique Temple Necklace",
        slug: "antique-temple-necklace",
        sku: "NCK-005-TMP",
        price: 8500,
        originalPrice: 10999,
        category: "necklaces",
        images: {
            main: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop",
            hover: "https://images.unsplash.com/photo-1574406280735-35183a79d020?q=80&w=800&auto=format&fit=crop",
            gallery: [
                "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop",
            ]
        },
        attributes: {
            material: "Brass",
            metalColor: ["Antique Gold"],
            stoneType: "Kemp Stones",
            weight: "45g",
            occasion: ["Festive", "Traditional"],
        },
        rating: 4.6,
        reviewCount: 56,
        description: "Traditional temple jewellery design featuring intricate goddess motifs and vibrant kemp stones.",
        stock: 20,
    }
];
