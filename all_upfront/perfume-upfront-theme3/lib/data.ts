
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface FragranceNote {
  name: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  reviewData?: Review[];

  image: string;
  imageHover?: string;
  gallery: string[];

  description: string;
  gender: 'Men' | 'Women' | 'Unisex';
  concentration: 'EDP' | 'EDT' | 'Parfum' | 'Cologne';
  size: string;
  availableSizes: string[];

  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];

  longevity: 'Low' | 'Moderate' | 'Long-lasting' | 'Eternal';
  sillage: 'Intimate' | 'Moderate' | 'Strong' | 'Enormous';
  season: ('Spring' | 'Summer' | 'Autumn' | 'Winter')[];
  occasion: ('Daily' | 'Party' | 'Date' | 'Office' | 'Sport')[];

  tag?: 'Best Seller' | 'New' | 'Limited Edition' | 'Sale' | 'Gift Set';
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "midnight-oud-elixir",
    name: "Midnight Oud Elixir",
    brand: "Lumière Paris",
    price: 4500,
    mrp: 6000,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=1000&auto=format&fit=crop",
    // Changed hover image
    imageHover: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    ],
    description: "A mysterious and enchanting blend that captures the essence of Arabian nights. Midnight Oud Elixir balances the raw potency of agarwood with the softness of velvet rose and warm amber.",
    gender: "Unisex",
    concentration: "EDP",
    size: "100ml",
    availableSizes: ["50ml", "100ml"],
    topNotes: ["Saffron", "Bergamot", "Black Pepper"],
    middleNotes: ["Rose", "Oud", "Incense"],
    baseNotes: ["Amber", "Musk", "Patchouli"],
    longevity: "Eternal",
    sillage: "Strong",
    season: ["Autumn", "Winter"],
    occasion: ["Party", "Date"],
    tag: "Best Seller",
    stock: 20,
    reviewData: [
      {
        id: "r1",
        author: "Sarah J.",
        rating: 5,
        date: "2024-01-15",
        title: "Absolutely stunning!",
        content: "The longevity of this perfume is insane. I sprayed it in the morning and could still smell it the next day.",
        verified: true
      }
    ]
  },
  {
    id: "2",
    slug: "ocean-breeze-sport",
    name: "Ocean Breeze Sport",
    brand: "Aqua Di Vita",
    price: 3200,
    mrp: 3500,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop",
    // Changed hover image
    imageHover: "https://images.unsplash.com/photo-1523293188086-b469b972208d?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523293188086-b469b972208d?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Dive into the crisp freshness of the open sea. Ocean Breeze Sport is an energetic citrus-aquatic fragrance.",
    gender: "Men",
    concentration: "EDT",
    size: "100ml",
    availableSizes: ["100ml"],
    topNotes: ["Sea Notes", "Mandarin", "Mint"],
    middleNotes: ["Neroli", "Cedar"],
    baseNotes: ["White Musk", "Vetiver"],
    longevity: "Moderate",
    sillage: "Moderate",
    season: ["Summer", "Spring"],
    occasion: ["Sport", "Daily", "Office"],
    stock: 50
  },
  {
    id: "3",
    slug: "velvet-rose-gold",
    name: "Velvet Rose Gold",
    brand: "Lumière Paris",
    price: 5500,
    mrp: 6500,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop",
    // Changed hover image
    imageHover: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "An ode to femininity. Velvet Rose Gold combines the lusciousness of blooming peonies with the richness of vanilla orchid.",
    gender: "Women",
    concentration: "Parfum",
    size: "75ml",
    availableSizes: ["50ml", "75ml", "100ml"],
    topNotes: ["Lychee", "Peony"],
    middleNotes: ["Rose", "Lily of the Valley"],
    baseNotes: ["Amber", "Cedar"],
    longevity: "Long-lasting",
    sillage: "Strong",
    season: ["Spring", "Autumn"],
    occasion: ["Date", "Party"],
    tag: "New",
    stock: 15
  },
  {
    id: "4",
    slug: "citrus-basil-tonic",
    name: "Citrus Basil Tonic",
    brand: "Botanique",
    price: 2800,
    mrp: 2800,
    rating: 4.2,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop",
    // Changed hover image
    imageHover: "https://images.unsplash.com/photo-1523293188086-b469b972208d?q=80&w=1000&auto=format&fit=crop",
    gallery: [],
    description: "A zesty and herbaceous concoction that revitalizes the senses.",
    gender: "Unisex",
    concentration: "Cologne",
    size: "100ml",
    availableSizes: ["100ml"],
    topNotes: ["Lime", "Basil", "Bergamot"],
    middleNotes: ["Thyme", "Lilac"],
    baseNotes: ["Vetiver", "Patchouli"],
    longevity: "Moderate",
    sillage: "Intimate",
    season: ["Summer"],
    occasion: ["Daily", "Office"],
    stock: 30
  },
  {
    id: "5",
    slug: "vanilla-smoke",
    name: "Vanilla Smoke",
    brand: "Noir Absolu",
    price: 7000,
    mrp: 7500,
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1585232004113-d46856a461f5?q=80&w=1000&auto=format&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=1000&auto=format&fit=crop",
    gallery: [],
    description: "A dark gourmet fragrance where sweet Madagascar vanilla meets smokey tobacco and leather.",
    gender: "Unisex",
    concentration: "Parfum",
    size: "50ml",
    availableSizes: ["50ml", "100ml"],
    topNotes: ["Clove", "Pink Pepper"],
    middleNotes: ["Vanilla", "Tobacco", "Guaiac Wood"],
    baseNotes: ["Leather", "Tonka Bean"],
    longevity: "Eternal",
    sillage: "Enormous",
    season: ["Winter"],
    occasion: ["Party", "Date"],
    tag: "Limited Edition",
    stock: 5
  },
  {
    id: "6",
    slug: "royal-sandalwood-gift-set",
    name: "Royal Sandalwood Set",
    brand: "Lumière Paris",
    price: 8500,
    mrp: 10000,
    rating: 4.9,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=1000&auto=format&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=1000&auto=format&fit=crop",
    gallery: [],
    description: "The ultimate luxury gift for the sandalwood lover. Includes 100ml EDP and 50ml Body Oil.",
    gender: "Unisex",
    concentration: "Parfum",
    size: "Set",
    availableSizes: ["Set"],
    topNotes: ["Sandalwood", "Cardamom"],
    middleNotes: ["Cedar", "Violet"],
    baseNotes: ["Amyris", "Amber"],
    longevity: "Long-lasting",
    sillage: "Moderate",
    season: ["Autumn", "Winter"],
    occasion: ["Party", "Date"],
    tag: "Gift Set",
    stock: 10
  },
  {
    id: "7",
    slug: "summer-citrus-sale",
    name: "Summer Citrus Burst",
    brand: "Botanique",
    price: 1999,
    mrp: 3500,
    rating: 4.1,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop",
    gallery: [],
    description: "A bright explosion of summer citruses to cool you down on hot days.",
    gender: "Unisex",
    concentration: "EDT",
    size: "100ml",
    availableSizes: ["100ml"],
    topNotes: ["Lemon", "Grapefruit"],
    middleNotes: ["Orange Blossom", "Ginger"],
    baseNotes: ["White Musk"],
    longevity: "Moderate",
    sillage: "Moderate",
    season: ["Summer"],
    occasion: ["Daily", "Sport"],
    tag: "Sale",
    stock: 100
  },
  {
    id: "8",
    slug: "gentlemans-classic",
    name: "Gentleman's Classic",
    brand: "Aqua Di Vita",
    price: 4200,
    mrp: 4200,
    rating: 4.6,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=1000&auto=format&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop",
    gallery: [],
    description: "Timeless elegance in a bottle. A fougere fragrance for the modern man.",
    gender: "Men",
    concentration: "EDP",
    size: "100ml",
    availableSizes: ["50ml", "100ml"],
    topNotes: ["Lavender", "Bergamot"],
    middleNotes: ["Geranium", "Oakmoss"],
    baseNotes: ["Tonka", "Sandalwood"],
    longevity: "Long-lasting",
    sillage: "Moderate",
    season: ["Spring", "Autumn"],
    occasion: ["Office", "Date"],
    tag: "Best Seller",
    stock: 45
  }
];

export const filters = {
  brands: ["Lumière Paris", "Aqua Di Vita", "Botanique", "Noir Absolu"],
  concentrations: ["EDP", "EDT", "Parfum", "Cologne"],
  genders: ["Men", "Women", "Unisex"],
  occasions: ["Daily", "Party", "Date", "Office", "Sport"],
  seasons: ["Spring", "Summer", "Autumn", "Winter"],
  priceRanges: [
    { label: "Under ₹3000", min: 0, max: 2999 },
    { label: "₹3000 - ₹5000", min: 3000, max: 4999 },
    { label: "₹5000+", min: 5000, max: 100000 },
  ]
}
