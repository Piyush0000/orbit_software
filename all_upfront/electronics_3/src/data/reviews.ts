import { Review } from '@/types/product';

export const reviews: Review[] = [
    // Zenith X1 (ID: 1)
    {
        id: 101,
        productId: 1,
        userName: "Alex Chen",
        rating: 5,
        title: "Absolute Beast of a Machine",
        comment: "This laptop runs Cyberpunk 2077 at max settings with Ray Tracing enabled and still hits 100+ FPS. The screen is gorgeous.",
        date: new Date('2023-11-25'),
        verified: true,
        helpfulCount: 52,
        avatar: "https://i.pravatar.cc/150?u=1"
    },
    // NovaPhone 15 (ID: 2)
    {
        id: 201,
        productId: 2,
        userName: "Sarah Miller",
        rating: 5,
        title: "The camera is insane!",
        comment: "I switched from Android just for this camera. The 200MP mode captures so much detail.",
        date: new Date('2023-09-20'),
        verified: true,
        helpfulCount: 33,
        avatar: "https://i.pravatar.cc/150?u=2",
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop"
        ]
    },
    // SonicFlow Headphones (ID: 3)
    {
        id: 301,
        productId: 3,
        userName: "Mike Ross",
        rating: 4,
        title: "Amazing ANC, bit tight",
        comment: "The noise cancellation is better than other premium brands I've tried. The clamping force is a bit strong initially but gets better.",
        date: new Date('2023-10-15'),
        verified: true,
        helpfulCount: 15,
        avatar: "https://i.pravatar.cc/150?u=3"
    }
];

// Helper to get reviews by product ID
export const getReviewsByProductId = (productId: number) => {
    return reviews.filter(review => review.productId === productId);
};

// Helper to get rating stats
export const getRatingStats = (productId: number) => {
    const productReviews = getReviewsByProductId(productId);
    const total = productReviews.length;
    if (total === 0) return { average: 0, total: 0, breakdown: [0, 0, 0, 0, 0] };

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / total;

    const breakdown = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
    productReviews.forEach(r => {
        if (r.rating >= 1 && r.rating <= 5) {
            breakdown[5 - r.rating]++; // Index 0 is 5 stars, Index 4 is 1 star
        }
    });

    return {
        average: parseFloat(average.toFixed(1)),
        total,
        breakdown // [count5, count4, count3, count2, count1]
    };
};
