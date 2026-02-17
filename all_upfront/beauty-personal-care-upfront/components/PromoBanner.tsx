import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PromoBanner() {
    return (
        <section className="relative py-24 px-4 bg-foreground w-full overflow-hidden text-background">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <span className="inline-block py-1 px-3 border border-primary/50 rounded-full text-primary mb-6 text-sm font-bold tracking-widest uppercase">
                    Limited Time Offer
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
                    Flat 30% OFF on Skincare
                </h2>

                {/* Simple Countdown UI */}
                <div className="flex justify-center gap-4 md:gap-8 mb-8 text-center font-mono">
                    <div className="flex flex-col">
                        <span className="text-3xl md:text-5xl font-bold">02</span>
                        <span className="text-xs uppercase text-white/50">Days</span>
                    </div>
                    <span className="text-3xl md:text-5xl font-bold text-primary">:</span>
                    <div className="flex flex-col">
                        <span className="text-3xl md:text-5xl font-bold">14</span>
                        <span className="text-xs uppercase text-white/50">Hours</span>
                    </div>
                    <span className="text-3xl md:text-5xl font-bold text-primary">:</span>
                    <div className="flex flex-col">
                        <span className="text-3xl md:text-5xl font-bold">45</span>
                        <span className="text-xs uppercase text-white/50">Mins</span>
                    </div>
                </div>

                <Link href="/shop">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-primary/25">
                        Shop the Sale
                    </Button>
                </Link>
            </div>
        </section>
    );
}
