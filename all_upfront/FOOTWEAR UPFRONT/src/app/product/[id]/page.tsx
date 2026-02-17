'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import { Heart, Star, ShoppingBag, Truck, RotateCcw } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext'; // Import useCart

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find(p => p.id === id);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart(); // Get addToCart

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || '');
    const [activeImage, setActiveImage] = useState(product?.image || '');

    // Reviews State
    const [reviews, setReviews] = useState([
        { id: 1, user: 'John Doe', rating: 5, comment: 'Great shoes! Very comfortable.', date: '2023-10-15' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Good quality but sizing runs a bit small.', date: '2023-11-02' }
    ]);
    const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    if (!product) {
        notFound();
    }

    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        });

        alert(`Added ${product.name} (Size: ${selectedSize}) to Cart!`);
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingReview(true);
        setTimeout(() => {
            setReviews(prev => [
                ...prev,
                {
                    id: Date.now(),
                    user: newReview.user || 'Anonymous',
                    rating: newReview.rating,
                    comment: newReview.comment,
                    date: new Date().toISOString().split('T')[0]
                }
            ]);
            setNewReview({ rating: 5, comment: '', user: '' });
            setIsSubmittingReview(false);
        }, 1000);
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* Image Gallery */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative', aspectRatio: '1', width: '100%', background: '#f5f5f5', borderRadius: '8px', overflow: 'hidden' }}>
                        <Image
                            src={activeImage}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                        <button
                            onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'white',
                                borderRadius: '50%',
                                padding: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Heart size={24} fill={inWishlist ? '#ef4444' : 'none'} color={inWishlist ? '#ef4444' : 'currentColor'} />
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        {product.name}
                    </h1>
                    <p style={{ color: '#666', marginBottom: '1rem', fontSize: '1.1rem' }}>{product.category}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                            <span style={{ textDecoration: 'line-through', color: '#999' }}>
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                            <Star size={18} fill="#fbbf24" color="#fbbf24" />
                            <span style={{ fontWeight: '600' }}>{product.rating}</span>
                            <span style={{ color: '#666' }}>({reviews.length} reviews)</span>
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Color: <span style={{ fontWeight: 'normal' }}>{selectedColor}</span></h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {product.colors?.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: color,
                                        border: selectedColor === color ? '2px solid black' : '2px solid transparent',
                                        outline: selectedColor === color ? '2px solid white' : 'none',
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>Select Size (US)</h3>
                            <button style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}>Size Guide</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                            {['7', '7.5', '8', '8.5', '9', '9.5', '10', '11'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        padding: '1rem 0',
                                        border: selectedSize === size ? '2px solid black' : '1px solid #ddd',
                                        background: selectedSize === size ? 'black' : 'white',
                                        color: selectedSize === size ? 'white' : 'black',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                flex: 1,
                                background: 'black',
                                color: 'white',
                                border: 'none',
                                padding: '1.2rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <ShoppingBag size={20} /> Add to Cart
                        </button>
                    </div>

                    {/* Features */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '2rem 0', borderTop: '1px solid #eee' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Truck size={24} />
                            <div>
                                <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>Free Delivery</h4>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>On orders over ₹5000</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <RotateCcw size={24} />
                            <div>
                                <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>Easy Returns</h4>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>15 days return policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div style={{ marginTop: '6rem', maxWidth: '800px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid black', paddingBottom: '0.5rem', display: 'inline-block' }}>
                    Customer Reviews
                </h2>

                {/* Write Review */}
                <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', marginBottom: '3rem' }}>
                    <h3 style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>Write a Review</h3>
                    <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={newReview.user}
                                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <select
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="5">5 Stars - Excellent</option>
                                <option value="4">4 Stars - Good</option>
                                <option value="3">3 Stars - Average</option>
                                <option value="2">2 Stars - Poor</option>
                                <option value="1">1 Star - Terrible</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Your review..."
                            rows={4}
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            required
                            style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
                        />
                        <button
                            type="submit"
                            disabled={isSubmittingReview}
                            style={{
                                alignSelf: 'flex-start',
                                background: 'black',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                opacity: isSubmittingReview ? 0.7 : 1
                            }}
                        >
                            {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {reviews.map(review => (
                        <div key={review.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={16}
                                            fill={star <= review.rating ? "#fbbf24" : "#eee"}
                                            color={star <= review.rating ? "#fbbf24" : "#ddd"}
                                        />
                                    ))}
                                </div>
                                <span style={{ color: '#999', fontSize: '0.9rem' }}>{review.date}</span>
                            </div>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{review.user}</h4>
                            <p style={{ color: '#444', lineHeight: '1.6' }}>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
