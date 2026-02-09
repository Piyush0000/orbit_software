"use client";

import { Product } from "@/lib/products";
import { RatingStars } from "@/components/ui/beauty/RatingStars";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, User } from "lucide-react";

interface ProductReviewsProps {
    product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
    const reviews = product.userReviews || [];
    const totalReviews = reviews.length > 0 ? reviews.length : product.reviews;
    const averageRating = product.rating;

    // Mock distribution if not enough real data
    const distribution = [70, 20, 5, 3, 2]; // 5 stars to 1 star percentages

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Summary Section */}
            <div className="md:col-span-4 space-y-6">
                <div className="bg-secondary/20 p-6 rounded-2xl">
                    <h3 className="text-lg font-serif font-bold mb-4">Customer Reviews</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-primary">{averageRating}</span>
                        <span className="text-muted-foreground">/ 5</span>
                    </div>
                    <RatingStars rating={averageRating} />
                    <p className="text-sm text-muted-foreground mt-2">Based on {totalReviews} reviews</p>

                    <Separator className="my-6 block bg-border/50" />

                    <div className="space-y-3">
                        {distribution.map((percentage, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                                <span className="w-3">{5 - index}</span>
                                <Progress value={percentage} className="h-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-8 space-y-8">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b pb-8 last:border-0 animation-in slide-in-from-bottom-2 fade-in duration-500">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <span className="font-medium">{review.user}</span>
                                    {review.verified && (
                                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>

                            <div className="mb-2">
                                <RatingStars rating={review.rating} />
                            </div>

                            <h4 className="font-bold text-lg mb-2">{review.title}</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-secondary/10 rounded-xl">
                        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
