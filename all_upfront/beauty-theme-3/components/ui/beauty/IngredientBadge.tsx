import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface IngredientBadgeProps {
    name: string;
    description?: string;
    featured?: boolean;
}

export function IngredientBadge({ name, description, featured = false }: IngredientBadgeProps) {
    return (
        <Badge
            variant={featured ? "default" : "secondary"}
            className={`cursor-help px-3 py-1 text-xs font-medium transition-all hover:scale-105 ${featured ? "bg-primary/90 hover:bg-primary" : "bg-secondary hover:bg-secondary/80"
                }`}
            title={description}
        >
            {featured && <Sparkles className="w-3 h-3 mr-1 inline-block" />}
            {name}
        </Badge>
    );
}
