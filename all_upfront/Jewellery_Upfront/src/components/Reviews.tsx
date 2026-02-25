"use client";

import { useState } from 'react';
import { Star, ThumbsUp, Camera } from 'lucide-react';
import Image from 'next/image';
import styles from './Reviews.module.css';

interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    image?: string;
    helpful: number;
}

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely stunning ring! The gold shine is exactly as shown in the pictures. Delivery was super fast too. Highly recommended!",
        image: "/gold_ring_product.png", // Reusing asset for demo
        helpful: 12
    },
    {
        id: 2,
        name: "Anjali K.",
        rating: 4,
        date: "1 week ago",
        comment: "Beautiful packaging and the ring fits perfectly. Taking off one star because I wished it came in a bigger box, but the jewellery itself is flawless.",
        helpful: 5
    }
];

export default function Reviews() {
    const [showForm, setShowForm] = useState(false);
    const [reviews, setReviews] = useState(MOCK_REVIEWS);

    // Form State
    const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: reviews.length + 1,
            name: newReview.name || 'Guest User',
            rating: newReview.rating,
            date: 'Just now',
            comment: newReview.comment,
            helpful: 0
        };
        setReviews([review, ...reviews]);
        setShowForm(false);
        setNewReview({ name: '', comment: '', rating: 5 });
    };

    const handleHelpful = (id: number) => {
        setReviews(reviews.map(review => {
            if (review.id === id) {
                return { ...review, helpful: review.helpful + 1 };
            }
            return review;
        }));
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Customer Reviews</h2>

            <div className={styles.container}>
                {/* Summary Side */}
                <div className={styles.summary}>
                    <p className={styles.statsTitle}>Overall Rating</p>
                    <div className={styles.averageRating}>4.8</div>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#C6A87C" stroke="none" />)}
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Based on {reviews.length} Trustpilot reviews</p>

                    <button className={styles.writeBtn} onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel Review' : 'Write a Review'}
                    </button>
                </div>

                {/* Review List & Form */}
                <div className={styles.reviewList}>

                    {/* Write Review Form */}
                    {showForm && (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h3>Write your review</h3>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Rating</label>
                                <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={24}
                                            fill={star <= newReview.rating ? "#C6A87C" : "#eee"}
                                            stroke="none"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Your Name</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={newReview.name}
                                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Review</label>
                                <textarea
                                    rows={4}
                                    className={styles.textarea}
                                    value={newReview.comment}
                                    onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Add Photo</label>
                                <input type="file" accept="image/*" className={styles.fileInput} />
                            </div>

                            <button type="submit" className={styles.writeBtn} style={{ marginTop: 0, width: 'auto' }}>Submit Review</button>
                            <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                        </form>
                    )}

                    {/* Review Items */}
                    {reviews.map(review => (
                        <div key={review.id} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.reviewerName}>{review.name}</span>
                                <span className={styles.reviewDate}>{review.date}</span>
                            </div>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "#C6A87C" : "#eee"} stroke="none" />
                                ))}
                            </div>
                            <p className={styles.comment}>{review.comment}</p>

                            {review.image && (
                                <div style={{ position: 'relative', width: 100, height: 100, marginBottom: '1rem' }}>
                                    <Image src={review.image} alt="User Review" fill style={{ objectFit: 'cover', borderRadius: 4 }} />
                                </div>
                            )}

                            <button
                                className={styles.helpfulBtn}
                                onClick={() => handleHelpful(review.id)}
                            >
                                <ThumbsUp size={14} /> Helpful ({review.helpful})
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
