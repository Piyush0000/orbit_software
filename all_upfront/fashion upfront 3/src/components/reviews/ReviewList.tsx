import { useState, useMemo } from 'react';
import { Review } from '@/types/product';
import ReviewItem from './ReviewItem';
import RatingSummary from './RatingSummary';
import ReviewForm from './ReviewForm';

interface ReviewListProps {
    reviews: Review[];
    ratingStats: {
        average: number;
        total: number;
        breakdown: number[];
    };
}

export default function ReviewList({ reviews, ratingStats }: ReviewListProps) {
    const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('helpful');
    const [showReviewForm, setShowReviewForm] = useState(false);

    const sortedReviews = useMemo(() => {
        const sorted = [...reviews];
        switch (sortBy) {
            case 'recent':
                return sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
            case 'highest':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'lowest':
                return sorted.sort((a, b) => a.rating - b.rating);
            case 'helpful':
            default:
                return sorted.sort((a, b) => b.helpfulCount - a.helpfulCount);
        }
    }, [reviews, sortBy]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Summary */}
            <div className="lg:col-span-1">
                <RatingSummary
                    average={ratingStats.average}
                    total={ratingStats.total}
                    breakdown={ratingStats.breakdown}
                />

                <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--card-border)' }}>
                    <h3 className="font-bold mb-2 text-[var(--text-primary)]">Review this product</h3>
                    <p className="text-sm mb-4 text-[var(--text-secondary)]">Share your thoughts with other customers</p>
                    <button
                        onClick={() => setShowReviewForm(true)}
                        className="w-full py-2 px-4 border rounded shadow-sm hover:bg-[var(--section-alt)] transition-colors font-medium text-[var(--text-primary)] border-[var(--card-border)]"
                    >
                        Write a customer review
                    </button>
                </div>
            </div>

            {/* Right Column: Reviews List */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-[var(--text-primary)]">Top reviews from India</h3>
                    <div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'recent' | 'highest' | 'lowest' | 'helpful')}
                            className="p-2 border rounded-md text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)]"
                            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', borderColor: 'var(--card-border)' }}
                        >
                            <option value="helpful">Top Reviews</option>
                            <option value="recent">Most Recent</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    {sortedReviews.length > 0 ? (
                        sortedReviews.map(review => (
                            <ReviewItem key={review.id} review={review} />
                        ))
                    ) : (
                        <p className="text-[var(--text-muted)]">No reviews yet.</p>
                    )}
                </div>
            </div>
            {/* Review Form Modal */}
            {showReviewForm && (
                <ReviewForm
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={(data) => {
                        console.log('Review Submitted:', data);
                        alert('Thanks for your review! It will be posted after moderation.');
                    }}
                />
            )}
        </div>
    );
}
