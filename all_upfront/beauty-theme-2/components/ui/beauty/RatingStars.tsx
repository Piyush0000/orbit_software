import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
    size?: number;
    showCount?: boolean;
    count?: number;
    className?: string;
}

export function RatingStars({
    rating,
    maxRating = 5,
    size = 16,
    showCount = false,
    count,
    className,
}: RatingStarsProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex text-amber-400">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} size={size} fill="currentColor" />
                ))}
                {hasHalfStar && <StarHalf size={size} fill="currentColor" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} size={size} className="text-gray-200" fill="currentColor" />
                ))}
            </div>
            {showCount && count !== undefined && (
                <span className="text-xs text-muted-foreground ml-1">({count})</span>
            )}
        </div>
    );
}
