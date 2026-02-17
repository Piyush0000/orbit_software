import { useState } from 'react';
import { Review } from '@/types/product';
import Image from 'next/image';

interface ReviewItemProps {
    review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
    const [isHelpful, setIsHelpful] = useState(false);
    const [isReported, setIsReported] = useState(false);

    return (
        <div className="border-b py-6 last:border-b-0" style={{ borderColor: 'var(--card-border)' }}>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 relative">
                    {review.avatar ? (
                        <Image src={review.avatar} alt={review.userName} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-gray-300">
                            {review.userName.charAt(0)}
                        </div>
                    )}
                </div>
                <span className="font-medium" style={{ color: 'var(--text)' }}>{review.userName}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                </div>
                <h4 className="font-bold" style={{ color: 'var(--text)' }}>{review.title}</h4>
            </div>

            <div className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                <span>Reviewed on {review.date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {review.verified && (
                    <span className="ml-2 text-orange-600 font-semibold text-xs border border-orange-200 px-1 rounded">Verified Purchase</span>
                )}
            </div>

            <p className="mb-4 text-base" style={{ color: 'var(--text)' }}>{review.comment}</p>

            {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {review.images.map((img, idx) => (
                        <div key={idx} className="w-20 h-20 relative rounded-lg overflow-hidden border">
                            <Image src={img} alt={`Review image ${idx}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span>{isHelpful ? review.helpfulCount + 1 : review.helpfulCount} people found this helpful</span>
                <button
                    onClick={() => setIsHelpful(true)}
                    disabled={isHelpful}
                    className={`px-4 py-1 border rounded transition-colors ${isHelpful ? 'bg-green-50 text-green-700 border-green-200' : 'hover:bg-gray-50'}`}
                    style={{ borderColor: isHelpful ? 'transparent' : 'var(--card-border)' }}
                >
                    {isHelpful ? 'Marked Helpful' : 'Helpful'}
                </button>
                <button
                    onClick={() => setIsReported(true)}
                    disabled={isReported}
                    className={`text-xs hover:underline cursor-pointer ${isReported ? 'text-red-500 italic' : ''}`}
                >
                    {isReported ? 'Reported' : 'Report'}
                </button>
            </div>
        </div>
    );
}
