import { Review } from '@/types/product';

export const reviews: Review[] = [
    // Classic White Tee (ID: 1)
    {
        id: 101,
        productId: 1,
        userName: "John Doe",
        rating: 5,
        title: "Perfect fit and feel",
        comment: "This is the best white tee I have ever bought. The fabric is thick enough to not be see-through but very soft.",
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
        title: "Great basic tee",
        comment: "Fits well, true to size. Shrunk a tiny bit after the first wash but still fits great.",
        date: new Date('2023-10-20'),
        verified: true,
        helpfulCount: 12,
        avatar: "https://i.pravatar.cc/150?u=2"
    },

    // Denim Jacket (ID: 2)
    {
        id: 201,
        productId: 2,
        userName: "Mike Johnson",
        rating: 5,
        title: "Awesome vintage look",
        comment: "The wash on this jacket is perfect. It looks like a high-end vintage piece. Very sturdy denim.",
        date: new Date('2023-09-10'),
        verified: true,
        helpfulCount: 20,
        images: [
            "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300"
        ]
    },
    {
        id: 202,
        productId: 2,
        userName: "Chris Wilson",
        rating: 4,
        title: "Runs slightly small",
        comment: "I usually wear a Medium but had to exchange for a Large. Quality is amazing though.",
        date: new Date('2023-08-22'),
        verified: true,
        helpfulCount: 5,
        avatar: "https://i.pravatar.cc/150?u=3"
    },

    // Summer Floral Dress (ID: 3)
    {
        id: 301,
        productId: 3,
        userName: "Emily Davis",
        rating: 5,
        title: "So pretty for summer!",
        comment: "I wore this to a garden party and got so many compliments. The fabric is light and breathable.",
        date: new Date('2023-07-15'),
        verified: true,
        helpfulCount: 30
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
