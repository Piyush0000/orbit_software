export interface Product {
    id: number;
    name: string;
    price: string;
    priceNum: number;
    image: string;
    description: string;
    category: string;
    brand: string;
    // Enhanced properties for filtering and sorting
    tags?: string[];
    rating?: number;
    reviewCount?: number;
    stock?: boolean;
    createdAt?: Date; // For "Newest" sort
    popularity?: number; // For "Popular" sort
    variants?: {
        type: 'color' | 'size';
        options: string[];
    }[];
    // Detailed view properties
    originalPrice?: string;
    discount?: number;
    shortDescription?: string;
    features?: string[];
    images?: string[];
    sizes?: string[];
    colors?: string[];
    material?: string;
}

export interface Review {
    id: number;
    productId: number;
    userName: string;
    rating: number; // 1-5
    title: string;
    comment: string;
    date: Date;
    verified: boolean;
    helpfulCount: number;
    avatar?: string;
    images?: string[];
}

export interface Answer {
    id: number;
    user: string; // "Seller" or user name
    text: string;
    date: Date;
}

export interface Question {
    id: number;
    productId: number;
    user: string;
    text: string;
    date: Date;
    answers: Answer[];
}

export interface CartItem {
    id: number;
    name: string;
    price: string;
    priceNum: number; // Numeric price for calculations
    image: string;
    quantity: number;
    size?: string;
    shortDescription?: string;
}
