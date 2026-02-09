/* eslint-disable */
const fs = require('fs');

const MENU_DATA = {
    Men: [
        { title: 'Topwear', items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Jackets', 'Blazers & Coats', 'Suits'] },
        { title: 'Bottomwear', items: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants & Joggers'] },
        { title: 'Footwear', items: ['Casual Shoes', 'Sports Shoes', 'Formal Shoes', 'Sneakers', 'Sandals & Floaters', 'Flip Flops'] },
        { title: 'Accessories', items: ['Wallets', 'Belts', 'Perfumes', 'Trimmers', 'Deodorants', 'Sunglasses'] }
    ],
    Women: [
        { title: 'Indian & Fusion Wear', items: ['Kurtas & Suits', 'Kurtis, Tunics & Tops', 'Sarees', 'Ethnic Wear', 'Leggings', 'Lehenga Cholis'] },
        { title: 'Western Wear', items: ['Dresses', 'Tops', 'Tshirts', 'Jeans', 'Trousers & Capris', 'Shorts & Skirts', 'Jumpsuits'] },
        { title: 'Footwear', items: ['Flats', 'Casual Shoes', 'Heels', 'Boots', 'Sports Shoes & Floaters'] },
        { title: 'Beauty & Personal Care', items: ['Makeup', 'Skincare', 'Premium Beauty', 'Lipsticks', 'Fragrances'] }
    ],
    Kids: [
        { title: 'Boys Clothing', items: ['T-Shirts', 'Shirts', 'Shorts', 'Jeans', 'Trousers', 'Clothing Sets'] },
        { title: 'Girls Clothing', items: ['Dresses', 'Tops', 'Tshirts', 'Clothing Sets', 'Lehenga Cholis', 'Dungarees'] },
        { title: 'Footwear', items: ['Casual Shoes', 'Sports Shoes', 'School Shoes', 'Sandals', 'Flip Flops'] },
        { title: 'Toys', items: ['Learning & Development', 'Activity Toys', 'Soft Toys', 'Action Figures'] }
    ],
    Accessories: [
        { title: 'Fashion Accessories', items: ['Wallets', 'Belts', 'Sunglasses', 'Watches', 'Jewellery', 'Caps & Hats'] },
        { title: 'Travel', items: ['Backpacks', 'Luggage', 'Trolleys', 'Handbags'] }
    ]
};

const placeholderImages = [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop', // Clothing
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop', // Shoes
    'https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=800&h=800&fit=crop', // Accessories
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop', // Shirt
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop'  // Jeans
];

function getRandomImage() {
    return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
}

function generateProducts() {
    let products = [];
    let idCounter = 1;

    for (const [category, subcategories] of Object.entries(MENU_DATA)) {
        for (const subcategory of subcategories) {
            for (const item of subcategory.items) {
                // Generate 2-3 products per item to ensure coverage
                const count = Math.floor(Math.random() * 2) + 2;
                for (let i = 0; i < count; i++) {
                    const price = (Math.random() * 100 + 10).toFixed(2);

                    let brand = ['H&M', 'Nike', 'Zara', 'Adidas', 'Puma'][Math.floor(Math.random() * 5)];

                    products.push({
                        id: idCounter++,
                        name: `${brand} ${item}`,
                        price: `₹${(price * 80).toFixed(0)}`, // Approx USD to INR
                        priceNum: parseFloat(price),
                        image: getRandomImage(),
                        description: `High quality ${item} from ${brand}. Perfect for any occasion.`,
                        shortDescription: `${item} by ${brand}`,
                        category: category,
                        brand: brand,
                        stock: true,
                        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
                        reviewCount: Math.floor(Math.random() * 200),
                        popularity: Math.floor(Math.random() * 100),
                        createdAt: new Date(),
                        tags: [item.toLowerCase(), category.toLowerCase(), 'new arrival'],
                        originalPrice: `₹${(price * 80 * 1.2).toFixed(0)}`,
                        discount: 20,
                        sizes: ['S', 'M', 'L', 'XL'],
                        colors: ['Black', 'Blue', 'White'],
                        material: 'Cotton/Polyester'
                    });
                }
            }
        }
    }
    return products;
}

const allProducts = generateProducts();

const fileContent = `import { Product } from '@/types/product';
import { usdToInr, formatINR } from '@/lib/utils';

export const products: Product[] = ${JSON.stringify(allProducts, null, 4)};
`;

console.log(fileContent);

