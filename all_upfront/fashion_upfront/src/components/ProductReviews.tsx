import { useMemo } from 'react';
import { getReviewsByProductId, getRatingStats } from '@/data/reviews';
import { getQuestionsByProductId } from '@/data/questions';
import ReviewList from './reviews/ReviewList';
import ProductQnA from './reviews/ProductQnA';

interface ProductReviewsProps {
    productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
    const reviews = useMemo(() => getReviewsByProductId(productId), [productId]);
    const questions = useMemo(() => getQuestionsByProductId(productId), [productId]);
    const ratingStats = useMemo(() => getRatingStats(productId), [productId]);

    return (
        <section className="py-12 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ReviewList reviews={reviews} ratingStats={ratingStats} />
                <ProductQnA questions={questions} />
            </div>
        </section>
    );
}
