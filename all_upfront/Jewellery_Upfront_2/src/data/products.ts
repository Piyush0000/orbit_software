export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    gender?: 'women' | 'men' | 'unisex'; // Added gender
    isNew?: boolean;
    isBestSeller?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Eternal Gold Ring',
        price: 15999,
        image: '/gold_ring_product.png',
        category: 'rings',
        gender: 'women',
        isNew: true
    },
    {
        id: '2',
        name: 'Sapphire Drop Earrings',
        price: 12499,
        image: '/hero_model_jewellery.png', // Placeholder reuse
        category: 'earrings',
        gender: 'women',
        isNew: true
    },
    {
        id: '3',
        name: 'Rose Gold Chain',
        price: 8999,
        image: '/silver_jewellery_collection.png', // Placeholder reuse
        category: 'necklaces',
        gender: 'women',
        isBestSeller: true
    },
    {
        id: '4',
        name: 'Minimalist Cuff',
        price: 4500,
        image: '/gold_ring_product.png',
        category: 'bracelets',
        gender: 'women',
        isNew: true
    },
    {
        id: '5',
        name: 'Diamond Studs',
        price: 24999,
        image: '/hero_model_jewellery.png',
        category: 'earrings',
        gender: 'women',
        isBestSeller: true
    },
    {
        id: '6',
        name: 'Vintage Pendant',
        price: 18000,
        image: '/silver_jewellery_collection.png',
        category: 'necklaces',
        gender: 'women',
        isNew: true
    },
    // MEN'S PRODUCTS
    {
        id: 'm1',
        name: 'Onyx Signet Ring',
        price: 12000,
        image: '/gold_ring_product.png', // Placeholder
        category: 'rings',
        gender: 'men',
        isNew: true
    },
    {
        id: 'm2',
        name: 'Braided Leather Bracelet',
        price: 5500,
        image: '/silver_jewellery_collection.png', // Placeholder
        category: 'bracelets',
        gender: 'men',
        isBestSeller: true
    },
    {
        id: 'm3',
        name: 'Sterling Silver Chain',
        price: 8500,
        image: '/silver_jewellery_collection.png', // Placeholder
        category: 'necklaces',
        gender: 'men'
    }
];
