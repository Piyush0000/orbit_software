import { Product } from '@/types/product';
import { usdToInr, formatINR } from '@/lib/utils';

export const products: Product[] = [
    {
        id: 1,
        name: 'Zenith X1 Carbon Gaming Laptop',
        price: formatINR(usdToInr(2499.99)),
        priceNum: 2499.99,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=800&fit=crop',
        description: 'Dominate the competition with the Zenith X1. Featuring the latest RTX 4090 GPU, i9 processor, and a buttery smooth 240Hz OLED display. The ultimate machine for gamers and creators.',
        shortDescription: 'RTX 4090, i9-13900K, 64GB RAM, 240Hz OLED.',
        category: 'Computers',
        brand: 'Zenith',
        stock: true,
        rating: 4.9,
        reviewCount: 42,
        popularity: 98,
        createdAt: new Date('2023-11-20'),
        tags: ['gaming', 'laptop', 'rtx4090', 'oled'],
        originalPrice: formatINR(usdToInr(2999.99)),
        discount: 16,
        features: [
            'NVIDIA GeForce RTX 4090 16GB',
            'Intel Core i9-13900HX Processor',
            '16-inch 3.2K Mini-LED Display (240Hz)',
            '64GB DDR5 RAM | 2TB NVMe SSD'
        ],
        images: [
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1588872657578-a3d2af14e501?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 2,
        name: 'NovaPhone 15 Ultra',
        price: formatINR(usdToInr(1199.99)),
        priceNum: 1199.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
        description: 'Experience the future of mobile photography. The NovaPhone 15 Ultra features a 200MP main sensor, titanium frame, and all-day battery life powered by the N5 chip.',
        shortDescription: '200MP Camera, Titanium Body, A17 Pro Chip.',
        category: 'Smartphones',
        brand: 'Nova',
        stock: true,
        rating: 4.8,
        reviewCount: 1250,
        popularity: 100,
        createdAt: new Date('2023-09-15'),
        tags: ['smartphone', '5g', 'camera', 'titanium'],
        originalPrice: formatINR(usdToInr(1299.99)),
        discount: 8,
        features: [
            '6.8" Super Retina XDR OLED',
            'Titanium Design',
            '200MP Quad-Camera System',
            'Satellite Connectivity'
        ],
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 3,
        name: 'SonicFlow Pro Headphones',
        price: formatINR(usdToInr(349.99)),
        priceNum: 349.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        description: 'Immerse yourself in pure silence. SonicFlow Pro brings industry-leading Active Noise Cancellation and spatial audio that tracks your head movements.',
        shortDescription: 'Industry-leading ANC with Spatial Audio.',
        category: 'Audio',
        brand: 'Sonic',
        stock: true,
        rating: 4.7,
        reviewCount: 320,
        popularity: 95,
        createdAt: new Date('2023-10-05'),
        tags: ['wireless', 'anc', 'audio', 'spatial'],
        originalPrice: formatINR(usdToInr(399.99)),
        discount: 12,
        features: [
            'Adaptive Active Noise Cancellation',
            'Transparency Mode',
            '30-Hour Battery Life',
            'Spatial Audio with Head Tracking'
        ],
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 4,
        name: 'Chronos Watch Ultra',
        price: formatINR(usdToInr(799.99)),
        priceNum: 799.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
        description: 'Built for the extreme. The Chronos Watch Ultra features a rugged titanium case, 100m water resistance, and up to 60 hours of battery life on a single charge.',
        shortDescription: 'Rugged GPS Smartwatch for Adventure.',
        category: 'Wearables',
        brand: 'Chronos',
        stock: true,
        rating: 4.9,
        reviewCount: 88,
        popularity: 92,
        createdAt: new Date('2023-08-20'),
        tags: ['smartwatch', 'fitness', 'gps', 'adventure'],
        originalPrice: formatINR(usdToInr(849.99)),
        discount: 6,
        features: [
            '49mm Titanium Case',
            'Precision Dual-Frequency GPS',
            '100m Water Resistance',
            'Advanced Health Sensors'
        ],
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 5,
        name: 'Vision 4K Curved Monitor',
        price: formatINR(usdToInr(499.99)),
        priceNum: 499.99,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
        description: 'Wrap your field of view with the Vision 34" Curved Monitor. 4K resolution, 165Hz refresh rate, and 1ms response time for gaming and productivity.',
        shortDescription: '34" Curved 4K 165Hz Gaming Monitor.',
        category: 'Computers',
        brand: 'Vision',
        stock: true,
        rating: 4.6,
        reviewCount: 156,
        popularity: 90,
        createdAt: new Date('2023-07-01'),
        tags: ['monitor', 'gaming', '4k', 'curved'],
        originalPrice: formatINR(usdToInr(599.99)),
        discount: 17,
        features: [
            '34-inch UWQHD Curved Display',
            '165Hz Refresh Rate',
            '1ms (GtG) Response Time',
            'HDR 400 Certified'
        ],
        images: [
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 6,
        name: 'Tactile Pro Mechanical Keyboard',
        price: formatINR(usdToInr(159.99)),
        priceNum: 159.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop',
        description: 'The satisfying click you love. Tactile Pro features hot-swappable switches, PBT keycaps, and fully programmable RGB customization.',
        shortDescription: 'Wireless RGB Mechanical Keyboard.',
        category: 'Accessories',
        brand: 'Tactile',
        stock: true,
        rating: 4.8,
        reviewCount: 210,
        popularity: 88,
        createdAt: new Date('2023-05-12'),
        tags: ['keyboard', 'mechanical', 'gaming', 'rgb'],
        originalPrice: formatINR(usdToInr(199.99)),
        discount: 20,
        features: [
            'Hot-swappable Mechanical Switches',
            'Wireless 2.4GHz & Bluetooth',
            'Aircraft-grade Aluminum Frame',
            'Per-key RGB Lighting'
        ],
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 7,
        name: 'SkyHawk Drone',
        price: formatINR(usdToInr(899.99)),
        priceNum: 899.99,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop',
        description: 'Capture the world from above. SkyHawk records in 5.4K via a 1-inch sensor, offering 35 minutes of flight time and omnidirectional obstacle sensing.',
        shortDescription: '5.4K Video Drone with 1-inch Sensor.',
        category: 'Cameras',
        brand: 'SkyHawk',
        stock: true,
        rating: 4.9,
        reviewCount: 75,
        popularity: 94,
        createdAt: new Date('2023-06-25'),
        tags: ['drone', 'camera', '4k', 'aerial'],
        originalPrice: formatINR(usdToInr(999.99)),
        discount: 10,
        features: [
            '5.4K Video / 20MP Photos',
            '1-inch CMOS Sensor',
            'MasterShots & FocusTrack',
            '12km Video Transmission'
        ],
        images: [
            'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 8,
        name: 'VR Omni Headset',
        price: formatINR(usdToInr(399.99)),
        priceNum: 399.99,
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=800&h=800&fit=crop',
        description: 'Step into new worlds. The VR Omni features high-resolution displays, pancake lenses for a slimmer profile, and full color passthrough for mixed reality.',
        shortDescription: 'Standalone VR/MR Headset.',
        category: 'Computers',
        brand: 'Omni',
        stock: true,
        rating: 4.7,
        reviewCount: 145,
        popularity: 91,
        createdAt: new Date('2023-10-10'),
        tags: ['vr', 'gaming', 'metaverse', 'headset'],
        originalPrice: formatINR(usdToInr(499.99)),
        discount: 20,
        features: [
            '4K+ Infinite Display',
            'Qualcomm Snapdragon XR2 Gen 2',
            'Full Color Passthrough',
            'Touch Plus Controllers'
        ],
        images: [
            'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 9,
        name: 'GigaDrive 2TB SSD',
        price: formatINR(usdToInr(179.99)),
        priceNum: 179.99,
        image: 'https://images.unsplash.com/photo-1531492343-d364adb52ced?w=800&h=800&fit=crop',
        description: 'Transfer huge files in seconds. The GigaDrive offers read speeds up to 2000MB/s in a rugged, drop-resistant aluminum enclosure.',
        shortDescription: 'Rugged Portable NVMe SSD 2TB.',
        category: 'Accessories',
        brand: 'Giga',
        stock: true,
        rating: 4.8,
        reviewCount: 95,
        popularity: 87,
        createdAt: new Date('2023-04-15'),
        tags: ['storage', 'ssd', 'usb-c'],
        originalPrice: formatINR(usdToInr(229.99)),
        discount: 22,
        features: [
            'Up to 2000MB/s Read/Write',
            'IP55 Water & Dust Resistance',
            'USB 3.2 Gen 2x2',
            '256-bit AES Hardware Encryption'
        ],
        images: [
            'https://images.unsplash.com/photo-1531492343-d364adb52ced?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1597872250969-95a2f588c83e?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 10,
        name: 'AlphaCam Mirrorless',
        price: formatINR(usdToInr(1899.99)),
        priceNum: 1899.99,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop',
        description: 'For hybrid shooters. The AlphaCam features a 33MP full-frame sensor, 4K60p video recording, and advanced AI-based autofocus.',
        shortDescription: 'Full-Frame Mirrorless Hybrid Camera.',
        category: 'Cameras',
        brand: 'Alpha',
        stock: false,
        rating: 4.9,
        reviewCount: 56,
        popularity: 96,
        createdAt: new Date('2023-02-14'),
        tags: ['camera', 'photo', 'video', 'mirrorless'],
        originalPrice: formatINR(usdToInr(2199.99)),
        discount: 14,
        features: [
            '33MP Full-Frame Exmor R Sensor',
            '4K 60p 10-bit 4:2:2 Video',
            'Real-time Eye AF for Humans/Animals',
            '5-Axis In-Body Stabilization'
        ],
        images: [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519183071298-a2962feb80f3?w=800&h=800&fit=crop'
        ]
    }
];
