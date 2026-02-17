import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyCartProps {
    onStartShopping: () => void;
}

export function EmptyCart({ onStartShopping }: EmptyCartProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
            <div className="relative bg-secondary/30 p-6 rounded-full mb-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary animate-pulse" />
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
                <h3 className="text-xl font-serif font-medium">Your bag is empty</h3>
                <p className="text-sm text-muted-foreground">
                    Looks like you haven't added any beauty essentials yet.
                </p>
            </div>

            <Button onClick={onStartShopping} className="mt-4" size="lg">
                Start Shopping
            </Button>
        </div>
    );
}
