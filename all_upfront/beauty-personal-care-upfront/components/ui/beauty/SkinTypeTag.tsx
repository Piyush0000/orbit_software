import { cn } from "@/lib/utils";

interface SkinTypeTagProps {
    type: string;
    className?: string;
}

const skinTypeColors: Record<string, string> = {
    "Dry": "bg-blue-100 text-blue-700 border-blue-200",
    "Oily": "bg-green-100 text-green-700 border-green-200",
    "Combination": "bg-purple-100 text-purple-700 border-purple-200",
    "Normal": "bg-gray-100 text-gray-700 border-gray-200",
    "Sensitive": "bg-pink-100 text-pink-700 border-pink-200",
    "Mature": "bg-amber-100 text-amber-700 border-amber-200",
    "Acne-Prone": "bg-red-100 text-red-700 border-red-200",
    "All": "bg-stone-100 text-stone-700 border-stone-200",
};

export function SkinTypeTag({ type, className }: SkinTypeTagProps) {
    const colorClass = skinTypeColors[type] || skinTypeColors["All"];

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                colorClass,
                className
            )}
        >
            {type}
        </span>
    );
}
