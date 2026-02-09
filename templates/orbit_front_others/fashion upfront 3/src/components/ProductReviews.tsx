import { useMemo } from 'react';
import { getReviewsByProductId, getRatingStats } from '@/data/reviews';
import { getQuestionsByProductId } from '@/data/questions';
import ReviewList from './reviews/ReviewList';
import ProductQnA from './reviews/ProductQnA';

interface ProductReviewsProps {
    productId: string | number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
    // Mock data expects numeric ID. If string, try to parse, else default to -1 (no reviews)
    const numericId = typeof productId === 'number' ? productId : parseInt(productId as string, 10);
    const validId = !isNaN(numericId) ? numericId : -1;

    const reviews = useMemo(() => getReviewsByProductId(validId), [validId]);
    const questions = useMemo(() => getQuestionsByProductId(validId), [validId]);
    const ratingStats = useMemo(() => getRatingStats(validId), [validId]);

    return (
        <section className="py-12 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ReviewList reviews={reviews} ratingStats={ratingStats} />
                <ProductQnA questions={questions} />
            </div>
        </section>
    );
}
