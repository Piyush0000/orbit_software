import { Product } from '@/types/product';
import { usdToInr, formatINR } from '@/lib/utils';

export const products: Product[] = [
    {
        id: 1,
        name: 'Premium Headphones',
        price: formatINR(usdToInr(199.99)),
        priceNum: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        description: 'Experience premium audio quality with our top-of-the-line wireless headphones. Featuring active noise cancellation, 30-hour battery life, and crystal-clear sound reproduction.',
        shortDescription: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
        category: 'Audio',
        brand: 'Premium',
        stock: true,
        rating: 4.8,
        reviewCount: 120,
        popularity: 95,
        createdAt: new Date('2023-01-15'),
        tags: ['wireless', 'noise-cancelling', 'music'],
        originalPrice: formatINR(usdToInr(299.99)),
        discount: 33,
        features: [
            'Active Noise Cancellation (ANC)',
            '30-hour battery life',
            'Quick charge: 10 minutes for 3 hours',
            'Premium leather ear cushions',
            'Bluetooth 5.0 connectivity'
        ],
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: formatINR(usdToInr(299.99)),
        priceNum: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
        description: 'Stay connected and track your health with our feature-rich smartwatch. Monitor your heart rate, track workouts, receive notifications, and more.',
        shortDescription: 'Track your fitness and stay connected with this advanced smartwatch.',
        category: 'Wearables',
        brand: 'Smart',
        stock: true,
        rating: 4.6,
        reviewCount: 85,
        popularity: 90,
        createdAt: new Date('2023-02-10'),
        tags: ['fitness', 'tracker', 'smart'],
        originalPrice: formatINR(usdToInr(399.99)),
        discount: 25,
        features: [
            'Heart rate monitoring',
            'GPS tracking',
            'Water resistant (50m)',
            '7-day battery life'
        ],
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 3,
        name: 'Wireless Speaker',
        price: formatINR(usdToInr(149.99)),
        priceNum: 149.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
        description: 'Take your music anywhere with our powerful portable speaker. Delivering rich, clear sound with deep bass, this speaker is perfect for parties.',
        shortDescription: 'Portable Bluetooth speaker with exceptional sound quality.',
        category: 'Audio',
        brand: 'Wireless',
        stock: true,
        rating: 4.5,
        reviewCount: 200,
        popularity: 88,
        createdAt: new Date('2022-11-05'),
        tags: ['portable', 'bass', 'party'],
        originalPrice: formatINR(usdToInr(199.99)),
        discount: 25,
        features: [
            '360° surround sound',
            '20-hour battery life',
            'IPX7 waterproof rating'
        ],
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 4,
        name: 'Laptop Stand',
        price: formatINR(usdToInr(79.99)),
        priceNum: 79.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
        description: 'Elevate your workspace with our premium aluminum laptop stand. Designed for ergonomics and durability.',
        shortDescription: 'Ergonomic aluminum laptop stand for better posture.',
        category: 'Accessories',
        brand: 'Pro',
        stock: true,
        rating: 4.9,
        reviewCount: 300,
        popularity: 85,
        createdAt: new Date('2023-03-20'),
        tags: ['ergonomic', 'office', 'setup'],
        originalPrice: formatINR(usdToInr(99.99)),
        discount: 20,
        features: [
            'Ergonomic height adjustment',
            'Aluminum construction',
            'Ventilation slots'
        ],
        images: [
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        price: formatINR(usdToInr(129.99)),
        priceNum: 129.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop',
        description: 'Elevate your typing and gaming experience with our mechanical keyboard. Featuring RGB backlighting and premium switches.',
        shortDescription: 'RGB mechanical gaming keyboard with customizable keys.',
        category: 'Computers',
        brand: 'Elite',
        stock: false,
        rating: 4.7,
        reviewCount: 150,
        popularity: 92,
        createdAt: new Date('2023-05-01'),
        tags: ['gaming', 'rgb', 'mechanical'],
        originalPrice: formatINR(usdToInr(179.99)),
        discount: 28,
        features: [
            'RGB backlighting',
            'Mechanical switches',
            'Programmable keys'
        ],
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 6,
        name: 'USB-C Hub',
        price: formatINR(usdToInr(59.99)),
        priceNum: 59.99,
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop',
        description: 'Expand your laptop connectivity with our versatile USB-C hub. Featuring multiple ports including HDMI and USB 3.0.',
        shortDescription: 'Multi-port USB-C adapter for expanding connectivity.',
        category: 'Accessories',
        brand: 'Pro',
        stock: true,
        rating: 4.4,
        reviewCount: 95,
        popularity: 80,
        createdAt: new Date('2023-04-15'),
        tags: ['connectivity', 'adapter', 'usb-c'],
        originalPrice: formatINR(usdToInr(89.99)),
        discount: 33,
        features: [
            'HDMI output (4K)',
            '3x USB 3.0 ports',
            'SD card reader'
        ],
        images: [
            'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 7,
        name: 'Smartphone Pro Max',
        price: formatINR(usdToInr(1099.99)),
        priceNum: 1099.99,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
        description: 'The ultimate smartphone experience with a pro-grade camera system, stunning display, and all-day battery life.',
        shortDescription: 'Flagship smartphone with pro camera and A15 chip.',
        category: 'Smartphones',
        brand: 'TechPro',
        stock: true,
        rating: 4.9,
        reviewCount: 350,
        popularity: 98,
        createdAt: new Date('2023-09-15'),
        tags: ['smartphone', '5g', 'promax'],
        originalPrice: formatINR(usdToInr(1199.99)),
        discount: 8,
        features: [
            '6.7-inch Super Retina XDR display',
            'A15 Bionic chip',
            'Pro camera system (Telephoto, Wide, Ultra Wide)',
            'LiDAR Scanner'
        ],
        images: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 8,
        name: 'Smartphone Lite 5G',
        price: formatINR(usdToInr(399.99)),
        priceNum: 399.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
        description: 'Powerful performance and 5G connectivity at an affordable price. Capture great photos and stay connected.',
        shortDescription: 'Affordable 5G smartphone with great battery life.',
        category: 'Smartphones',
        brand: 'Smart',
        stock: true,
        rating: 4.5,
        reviewCount: 180,
        popularity: 88,
        createdAt: new Date('2023-06-20'),
        tags: ['smartphone', 'budget', '5g'],
        originalPrice: formatINR(usdToInr(449.99)),
        discount: 11,
        features: [
            '6.1-inch OLED display',
            'Dual camera system',
            'All-day battery life',
            '5G capable'
        ],
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 9,
        name: 'Noise Cancelling Earbuds',
        price: formatINR(usdToInr(149.99)),
        priceNum: 149.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
        description: 'Immerse yourself in music with our true wireless noise-cancelling earbuds. Compact design with powerful sound.',
        shortDescription: 'True wireless earbuds with active noise cancellation.',
        category: 'Audio',
        brand: 'Premium',
        stock: true,
        rating: 4.7,
        reviewCount: 220,
        popularity: 93,
        createdAt: new Date('2023-04-10'),
        tags: ['tws', 'earbuds', 'noise-cancelling'],
        originalPrice: formatINR(usdToInr(199.99)),
        discount: 25,
        features: [
            'Active Noise Cancellation',
            '24-hour battery life with case',
            'Water and sweat resistant',
            'Transparency mode'
        ],
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 10,
        name: 'Soundbar 2.1',
        price: formatINR(usdToInr(199.99)),
        priceNum: 199.99,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop',
        description: 'Upgrade your home theater with this compact 2.1 channel soundbar with wireless subwoofer.',
        shortDescription: 'Cinematic sound with wireless subwoofer.',
        category: 'Audio',
        brand: 'Wireless',
        stock: true,
        rating: 4.6,
        reviewCount: 90,
        popularity: 85,
        createdAt: new Date('2023-02-28'),
        tags: ['soundbar', 'hometheater', 'bass'],
        originalPrice: formatINR(usdToInr(249.99)),
        discount: 20,
        features: [
            '300W total power output',
            'Wireless subwoofer',
            'Bluetooth streaming',
            'HDMI ARC'
        ],
        images: [
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 11,
        name: 'Wireless Gaming Mouse',
        price: formatINR(usdToInr(59.99)),
        priceNum: 59.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
        description: 'Precision gaming mouse with ultra-low latency wireless technology and customizable RGB lighting.',
        shortDescription: 'High-performance wireless gaming mouse.',
        category: 'Accessories',
        brand: 'Elite',
        stock: true,
        rating: 4.8,
        reviewCount: 150,
        popularity: 91,
        createdAt: new Date('2023-05-15'),
        tags: ['gaming', 'mouse', 'wireless'],
        originalPrice: formatINR(usdToInr(79.99)),
        discount: 25,
        features: [
            '20K DPI optical sensor',
            '70-hour battery life',
            'RGB Chroma lighting',
            '8 programmable buttons'
        ],
        images: [
            'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1615663245857-acda5b2b1518?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 12,
        name: 'Mechanical Keyboard Pro',
        price: formatINR(usdToInr(149.99)),
        priceNum: 149.99,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop',
        description: 'Professional grade mechanical keyboard with hot-swappable switches and aircraft-grade aluminum frame.',
        shortDescription: 'Premium mechanical keyboard for pros.',
        category: 'Accessories',
        brand: 'Elite',
        stock: true,
        rating: 4.9,
        reviewCount: 210,
        popularity: 94,
        createdAt: new Date('2023-01-20'),
        tags: ['keyboard', 'mechanical', 'productivity'],
        originalPrice: formatINR(usdToInr(179.99)),
        discount: 16,
        features: [
            'Hot-swappable switches',
            'PBT keycaps',
            'Detachable USB-C cable',
            'Sound dampening foam'
        ],
        images: [
            'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 13,
        name: '4K Monitor 27"',
        price: formatINR(usdToInr(349.99)),
        priceNum: 349.99,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
        description: 'Stunning 4K resolution monitor with color accuracy perfect for creators and designers.',
        shortDescription: '27-inch 4K UHD IPS Monitor.',
        category: 'Computers',
        brand: 'Visual',
        stock: true,
        rating: 4.7,
        reviewCount: 110,
        popularity: 89,
        createdAt: new Date('2023-03-10'),
        tags: ['monitor', '4k', 'display'],
        originalPrice: formatINR(usdToInr(449.99)),
        discount: 22,
        features: [
            '4K UHD (3840 x 2160) resolution',
            'IPS panel with 99% sRGB',
            'USB-C with Power Delivery',
            'Pivot, tilt, and height adjustment'
        ],
        images: [
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 14,
        name: 'External SSD 1TB',
        price: formatINR(usdToInr(129.99)),
        priceNum: 129.99,
        image: 'https://images.unsplash.com/photo-1531492343-d364adb52ced?w=800&h=800&fit=crop',
        description: 'Blazing fast portable storage for your files, photos, and games. Rugged design for durability.',
        shortDescription: '1TB Portable External NVMe SSD.',
        category: 'Accessories',
        brand: 'Pro',
        stock: true,
        rating: 4.8,
        reviewCount: 175,
        popularity: 92,
        createdAt: new Date('2023-04-05'),
        tags: ['storage', 'ssd', 'portable'],
        originalPrice: formatINR(usdToInr(159.99)),
        discount: 18,
        features: [
            'Read speeds up to 1050MB/s',
            'Drop protection up to 2 meters',
            'USB-C and USB-A compatible',
            'Password protection'
        ],
        images: [
            'https://images.unsplash.com/photo-1531492343-d364adb52ced?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1597872250969-95a2f588c83e?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 15,
        name: 'Smart Home Hub',
        price: formatINR(usdToInr(89.99)),
        priceNum: 89.99,
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&h=800&fit=crop',
        description: 'Control your entire smart home from one device. Compatible with thousands of devices.',
        shortDescription: 'Central hub for all your smart devices.',
        category: 'Smart Home',
        brand: 'Smart',
        stock: true,
        rating: 4.5,
        reviewCount: 80,
        popularity: 82,
        createdAt: new Date('2023-05-10'),
        tags: ['smarthome', 'hub', 'automation'],
        originalPrice: formatINR(usdToInr(119.99)),
        discount: 25,
        features: [
            'Voice control support',
            'Zigbee and Z-Wave compatible',
            'Built-in speaker',
            'Privacy shutter'
        ],
        images: [
            'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1563461661646-1bd40cc1a6eb?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 16,
        name: 'Fitness Band 5',
        price: formatINR(usdToInr(49.99)),
        priceNum: 49.99,
        image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=800&fit=crop',
        description: 'Track your steps, sleep, and heart rate with this lightweight fitness tracker.',
        shortDescription: 'Advanced activity tracker with AMOLED display.',
        category: 'Wearables',
        brand: 'Smart',
        stock: true,
        rating: 4.6,
        reviewCount: 250,
        popularity: 96,
        createdAt: new Date('2023-06-01'),
        tags: ['fitness', 'tracker', 'health'],
        originalPrice: formatINR(usdToInr(69.99)),
        discount: 28,
        features: [
            'AMOLED touch display',
            '14-day battery life',
            '5 ATM water resistance',
            'Stress monitoring'
        ],
        images: [
            'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1557935728-e6d1eaed5503?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 17,
        name: 'Action Camera 4K',
        price: formatINR(usdToInr(299.99)),
        priceNum: 299.99,
        image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&h=800&fit=crop',
        description: 'Capture your adventures in stunning 4K. Waterproof, rugged, and ready for action.',
        shortDescription: 'Waterproof 4K action camera with stabilization.',
        category: 'Cameras',
        brand: 'Pro',
        stock: true,
        rating: 4.8,
        reviewCount: 140,
        popularity: 90,
        createdAt: new Date('2023-04-25'),
        tags: ['camera', 'action', '4k'],
        originalPrice: formatINR(usdToInr(349.99)),
        discount: 14,
        features: [
            'HyperSmooth video stabilization',
            'Waterproof down to 33ft (10m)',
            'Voice control',
            'Live streaming capable'
        ],
        images: [
            'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 18,
        name: 'Drone Mini',
        price: formatINR(usdToInr(599.99)),
        priceNum: 599.99,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop',
        description: 'The perfect companion for capturing aerial photos and videos. Lightweight and easy to fly.',
        shortDescription: 'Ultralight folding drone with 4K camera.',
        category: 'Cameras',
        brand: 'TechPro',
        stock: true,
        rating: 4.9,
        reviewCount: 160,
        popularity: 97,
        createdAt: new Date('2023-05-20'),
        tags: ['drone', 'aerial', 'camera'],
        originalPrice: formatINR(usdToInr(699.99)),
        discount: 14,
        features: [
            'Under 249g weight',
            '30-minute flight time',
            '4K/30fps video',
            '10km video transmission'
        ],
        images: [
            'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=800&fit=crop'
        ]
    }
];
