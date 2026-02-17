// Review type removed as unused

interface RatingSummaryProps {
    average: number;
    total: number;
    breakdown: number[]; // [5stars, 4stars, 3stars, 2stars, 1star]
}

export default function RatingSummary({ average, total, breakdown }: RatingSummaryProps) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Customer Reviews</h2>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xl">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < Math.round(average) ? '★' : '☆'}</span>
                        ))}
                    </div>
                    <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>{average} out of 5</span>
                </div>
                <span className="text-lg" style={{ color: 'var(--text-muted)' }}>{total} global ratings</span>
            </div>

            <div className="space-y-2 max-w-md">
                {breakdown.map((count, index) => {
                    const stars = 5 - index;
                    const percentage = total > 0 ? (count / total) * 100 : 0;
                    return (
                        <div key={stars} className="flex items-center gap-3 text-sm">
                            <span className="w-12 text-nowrap" style={{ color: 'var(--text)' }}>{stars} star</span>
                            <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="w-12 text-right" style={{ color: 'var(--text-muted)' }}>{Math.round(percentage)}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
