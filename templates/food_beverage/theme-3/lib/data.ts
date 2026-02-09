export interface Product {
    id: number;
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    image: string[];
    veg: boolean;
    rating: number;
    reviewCount: number;
    category: string;
    originalPrice?: number;
    badge?: string;
    dietary: {
        vegan: boolean;
        sugarFree: boolean;
        glutenFree: boolean;
    };
    spiceLevel: "Mild" | "Medium" | "Spicy" | "None";
    ingredients: string[];
    nutrition: {
        energy: string;
        protein: string;
        carbohydrates: string;
        sugar: string;
        fat: string;
    };
    storage: {
        instructions: string;
        bestBefore: string;
        disclaimer: string;
    };
}

export const products: Product[] = [
    {
        id: 1,
        name: "Truffle Popcorn",
        shortDescription: "Gourmet popcorn infused with premium black truffle oil and sea salt.",
        fullDescription: "Indulge in the ultimate snacking experience with our Truffle Popcorn. We use only the finest non-GMO corn, popped to perfection and drizzled with authentic black truffle oil. Each bite offers a sophisticated earthy aroma balanced with a hint of sea salt, making it the perfect companion for movie nights or elegant gatherings.",
        price: 299,
        originalPrice: 349,
        image: ["/category-snacks.png", "/category-snacks.png", "/category-snacks.png"],
        veg: true,
        rating: 4.8,
        reviewCount: 124,
        category: "snacks",
        badge: "Bestseller",
        dietary: {
            vegan: false,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "None",
        ingredients: ["Popped Corn", "Coconut Oil", "Black Truffle Oil", "Sea Salt", "Natural Flavors"],
        nutrition: {
            energy: "120 kcal",
            protein: "2g",
            carbohydrates: "15g",
            sugar: "0g",
            fat: "6g"
        },
        storage: {
            instructions: "Store in a cool, dry place away from direct sunlight. Once opened, store in an airtight container.",
            bestBefore: "45 days",
            disclaimer: "May contain unpopped kernels."
        }
    },
    {
        id: 2,
        name: "Spicy Peri Peri Cashews",
        shortDescription: "Roasted cashews coated in a fiery peri peri spice blend.",
        fullDescription: "Our Spicy Peri Peri Cashews are a bold explosion of flavor. Hand-picked premium cashews are slow-roasted and tossed in a secret blend of African bird's eye chili, garlic, and citrus. It's the perfect snack for those who love a little heat followed by the creamy crunch of high-quality nuts.",
        price: 499,
        originalPrice: 599,
        image: ["/category-snacks.png"],
        veg: true,
        rating: 4.4,
        reviewCount: 89,
        category: "snacks",
        badge: "Trending",
        dietary: {
            vegan: true,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "Spicy",
        ingredients: ["Cashew Nuts", "Sunflower Oil", "Peri Peri Spice Mix (Chili, Garlic, Salt, Lemon Powder, Spices)", "Maltodextrin", "Anticaking Agent (E551)"],
        nutrition: {
            energy: "160 kcal",
            protein: "5g",
            carbohydrates: "8g",
            sugar: "1g",
            fat: "13g"
        },
        storage: {
            instructions: "Store in a cool and dry place. Keep away from moisture.",
            bestBefore: "90 days",
            disclaimer: "Allergen Warning: Contains Cashews."
        }
    },
    {
        id: 3,
        name: "Cold Pressed Orange Juice",
        shortDescription: "100% pure Valencia oranges, cold-pressed to preserve nutrients and flavor.",
        fullDescription: "Experience the refreshing taste of pure sunshine. Our orange juice is never from concentrate and contains no added sugar or preservatives. We use a cold-press extraction process that keeps the enzymes and vitamins intact, giving you a vibrant, high-energy boost in every sip.",
        price: 149,
        image: ["/category-beverages.png"],
        veg: true,
        rating: 4.5,
        reviewCount: 210,
        category: "beverages",
        badge: "Pure",
        dietary: {
            vegan: true,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "None",
        ingredients: ["100% Valencia Orange Juice"],
        nutrition: {
            energy: "45 kcal",
            protein: "0.7g",
            carbohydrates: "10g",
            sugar: "8g (Natural)",
            fat: "0.2g"
        },
        storage: {
            instructions: "Keep refrigerated at all times (0-4°C). Shake well before use.",
            bestBefore: "3 days",
            disclaimer: "Consume within 24 hours of opening."
        }
    },
    {
        id: 4,
        name: "Lemon & Mint Iced Tea",
        shortDescription: "Brewed black tea infused with fresh lemon and garden mint.",
        fullDescription: "Our Lemon & Mint Iced Tea is the ultimate thirst quencher. We slow-brew premium Assam tea leaves and blend them with zesty lemon juice and hand-picked mint leaves. It's lightly sweetened to balance the natural astringency of the tea, providing a sophisticated refreshment.",
        price: 99,
        image: ["/category-beverages.png"],
        veg: true,
        rating: 4.3,
        reviewCount: 156,
        category: "beverages",
        dietary: {
            vegan: true,
            sugarFree: false,
            glutenFree: true
        },
        spiceLevel: "None",
        ingredients: ["Water", "Brewed Black Tea", "Lemon Juice", "Fresh Mint Leaves", "Sugar", "Natural Flavors"],
        nutrition: {
            energy: "35 kcal",
            protein: "0.1g",
            carbohydrates: "8.5g",
            sugar: "8g",
            fat: "0g"
        },
        storage: {
            instructions: "Refrigerate after opening.",
            bestBefore: "60 days",
            disclaimer: "Serve chilled for best taste."
        }
    },
    {
        id: 5,
        name: "Gourmet Trail Mix",
        shortDescription: "A curated blend of premium nuts, seeds, and dried berries.",
        fullDescription: "Fuel your day with our Gourmet Trail Mix. A perfect balance of salty, sweet, and crunchy, this mix combines high-quality almonds, walnuts, pumpkin seeds, and sun-dried cranberries. It's nutrient-dense and provides sustained energy for your busy lifestyle or outdoor adventures.",
        price: 450,
        image: ["/category-organic.png"],
        veg: true,
        rating: 4.9,
        reviewCount: 320,
        category: "organic",
        badge: "Premium",
        dietary: {
            vegan: true,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "None",
        ingredients: ["Almonds", "Walnuts", "Pumpkin Seeds", "Dried Cranberries", "Sunflower Seeds", "Sea Salt"],
        nutrition: {
            energy: "180 kcal",
            protein: "6g",
            carbohydrates: "12g",
            sugar: "4g",
            fat: "14g"
        },
        storage: {
            instructions: "Store in a cool, dry place. Reseal after use.",
            bestBefore: "120 days",
            disclaimer: "May contain traces of other nuts."
        }
    },
    {
        id: 6,
        name: "Sriracha Quinoa Chips",
        shortDescription: "Crunchy quinoa chips with a spicy Sriracha kick.",
        fullDescription: "Our Sriracha Quinoa Chips are the perfect healthy alternative to traditional potato chips. Made from nutrient-rich quinoa flour and seasoned with a bold Sriracha blend, these chips deliver a satisfying crunch and a lingering heat that keeps you coming back for more.",
        price: 199,
        image: ["/category-snacks.png"],
        veg: true,
        rating: 4.6,
        reviewCount: 75,
        category: "snacks",
        dietary: {
            vegan: true,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "Medium",
        ingredients: ["Quinoa Flour", "Sunflower Oil", "Sriracha Seasoning (Chili, Garlic, Vinegar Powder, Salt)", "Rice Flour"],
        nutrition: {
            energy: "110 kcal",
            protein: "3g",
            carbohydrates: "14g",
            sugar: "1g",
            fat: "5g"
        },
        storage: {
            instructions: "Store in a cool, dry place.",
            bestBefore: "60 days",
            disclaimer: "Produced in a facility that also processes wheat."
        }
    },
    {
        id: 7,
        name: "Ready-to-Eat Quinoa Salad",
        shortDescription: "Mediterranean style quinoa salad with chickpeas and olives.",
        fullDescription: "Enjoy a fresh, healthy meal anywhere with our Ready-to-Eat Quinoa Salad. We've combined fluffy quinoa with protein-rich chickpeas, tangy olives, and a light lemon-herb dressing. It's the perfect light lunch or side dish for your busy workday.",
        price: 349,
        image: ["/hero.png"],
        veg: true,
        rating: 4.7,
        reviewCount: 92,
        category: "ready-to-eat",
        badge: "Healthy",
        dietary: {
            vegan: true,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "Mild",
        ingredients: ["Cooked Quinoa", "Chickpeas", "Kalamata Olives", "Cucumber", "Red Onion", "Lemon Juice", "Extra Virgin Olive Oil", "Herbs"],
        nutrition: {
            energy: "240 kcal",
            protein: "8g",
            carbohydrates: "32g",
            sugar: "2g",
            fat: "9g"
        },
        storage: {
            instructions: "Refrigerate after purchase. Consume immediately after opening.",
            bestBefore: "7 days",
            disclaimer: "Contains Olives with pits."
        }
    },
    {
        id: 8,
        name: "Artisan Cheese & Cracker Combo",
        shortDescription: "A selection of aged cheddar and multigrain crackers.",
        fullDescription: "Indulge in our Artisan Cheese & Cracker Combo. We've paired our sharp, aged cheddar cheese with crunchy, multigrain crackers for a classic flavor profile. It's an elegant and satisfying snack that's perfect for any time of day.",
        price: 699,
        image: ["/category-combos.png"],
        veg: true,
        rating: 4.8,
        reviewCount: 54,
        category: "combos",
        badge: "Limited Edition",
        dietary: {
            vegan: false,
            sugarFree: true,
            glutenFree: false
        },
        spiceLevel: "None",
        ingredients: ["Aged Cheddar Cheese (Milk, Salt, Cultures, Rennet)", "Multigrain Crackers (Wheat Flour, Whole Grains, Seeds, Salt, Oil)"],
        nutrition: {
            energy: "310 kcal",
            protein: "14g",
            carbohydrates: "22g",
            sugar: "1g",
            fat: "19g"
        },
        storage: {
            instructions: "Keep refrigerated. Serve at room temperature for best flavor.",
            bestBefore: "30 days",
            disclaimer: "Contains Milk and Wheat."
        }
    },
    {
        id: 9,
        name: "Movie Night Special",
        shortDescription: "2x Truffle Popcorn, 2x Sparkling Berry Fusion",
        fullDescription: "Make your movie nights unforgettable with our Movie Night Special. This combo includes two packs of our best-selling Truffle Popcorn and two bottles of refreshing Sparkling Berry Fusion. It's the perfect mix of savory and sweet for sharing properly.",
        price: 699,
        originalPrice: 838,
        image: ["/category-combos.png"],
        veg: true,
        rating: 4.9,
        reviewCount: 42,
        category: "combos",
        badge: "Best Value",
        dietary: {
            vegan: true,
            sugarFree: false,
            glutenFree: true
        },
        spiceLevel: "None",
        ingredients: ["Popped Corn", "Black Truffle Oil", "Sparkling Water", "Berry Juice Concentrate"],
        nutrition: {
            energy: "210 kcal",
            protein: "2g",
            carbohydrates: "25g",
            sugar: "12g",
            fat: "6g"
        },
        storage: {
            instructions: "Store popcorn in a cool dry place. Refrigerate drinks.",
            bestBefore: "30 days",
            disclaimer: "Best served chilled."
        }
    },
    {
        id: 10,
        name: "Office Break Pack",
        shortDescription: "Gourmet Trail Mix, Cold Pressed Juice, Caffeine Boost",
        fullDescription: "Stay energized and focused with our Office Break Pack. This thoughtfully curated combo features our nutrient-dense Gourmet Trail Mix, a revitalizing Cold Pressed Juice, and a natural Caffeine Boost bar. It's the ultimate productivity partner.",
        price: 599,
        originalPrice: 749,
        image: ["/category-combos.png"],
        veg: true,
        rating: 4.7,
        reviewCount: 28,
        category: "combos",
        badge: "Work Essentials",
        dietary: {
            vegan: true,
            sugarFree: true,
            glutenFree: true
        },
        spiceLevel: "None",
        ingredients: ["Almonds", "Walnuts", "Orange Juice", "Coffee Extract", "Dates", "Oats"],
        nutrition: {
            energy: "340 kcal",
            protein: "12g",
            carbohydrates: "45g",
            sugar: "15g",
            fat: "14g"
        },
        storage: {
            instructions: "Refrigerate juice. Keep snacks in a cool dry place.",
            bestBefore: "5 days (Juice)",
            disclaimer: "Contains nuts and caffeine."
        }
    }
];

export const categories = [
    { name: "Snacks", slug: "snacks", image: "/category-snacks.png" },
    { name: "Beverages", slug: "beverages", image: "/category-beverages.png" },
    { name: "Organic", slug: "organic", image: "/category-organic.png" },
    { name: "Ready-to-Eat", slug: "ready-to-eat", image: "/hero.png" },
    { name: "Combos", slug: "combos", image: "/category-combos.png" }
];
