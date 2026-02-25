import { Review } from '@/types/product';

export const reviews: Review[] = [
    // Premium Headphones (ID: 1)
    {
        id: 101,
        productId: 1,
        userName: "John Doe",
        rating: 5,
        title: "Best headphones I've ever owned",
        comment: "The noise cancellation is top-notch. I use these for my daily commute and they completely block out the train noise. Battery life is also excellent.",
        date: new Date('2023-11-15'),
        verified: true,
        helpfulCount: 45,
        avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
        id: 102,
        productId: 1,
        userName: "Sarah Smith",
        rating: 4,
        title: "Great sound, slightly heavy",
        comment: "Sound quality is amazing, very balanced bass and treble. My only complaint is that they feel a bit heavy after wearing them for 3-4 hours.",
        date: new Date('2023-10-20'),
        verified: true,
        helpfulCount: 12,
        avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
        id: 103,
        productId: 1,
        userName: "Mike Johnson",
        rating: 5,
        title: "Perfect for office work",
        comment: "I bought these for the office to focus. They connect seamlessly to my Mac and iPhone. Highly recommend!",
        date: new Date('2023-12-05'),
        verified: true,
        helpfulCount: 8,
        images: [
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=300"
        ]
    },

    // Smart Watch (ID: 2)
    {
        id: 201,
        productId: 2,
        userName: "Emily Davis",
        rating: 5,
        title: "Love the fitness tracking features",
        comment: "Accurate heart rate monitoring and GPS. The battery easily lasts a week as advertised.",
        date: new Date('2023-09-10'),
        verified: true,
        helpfulCount: 20
    },
    {
        id: 202,
        productId: 2,
        userName: "Chris Wilson",
        rating: 3,
        title: "Good value but app is buggy",
        comment: "The watch itself is great, but the syncing app sometimes disconnects. Hope they fix it in an update.",
        date: new Date('2023-08-22'),
        verified: true,
        helpfulCount: 5,
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
