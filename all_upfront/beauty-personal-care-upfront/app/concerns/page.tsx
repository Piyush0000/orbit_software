
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConcernsPage() {
    const concerns = [
        "Dryness",
        "Acne & Blemishes",
        "Anti-Aging",
        "Dullness",
        "Sensitivity",
        "Sun Protection"
    ];

    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto py-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-center">Shop by Concern</h1>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Find the perfect solution for your skin's unique needs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {concerns.map((concern) => (
                        <Link href={`/shop?concern=${concern.toLowerCase().replace(/ /g, '-')}`} key={concern}>
                            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 hover:shadow-lg transition-all cursor-pointer h-40 flex items-center justify-center">
                                <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{concern}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
