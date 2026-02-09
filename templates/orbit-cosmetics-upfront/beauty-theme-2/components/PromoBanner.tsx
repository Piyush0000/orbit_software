import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PromoBanner() {
    return (
        <section className="relative py-28 px-4 w-full overflow-hidden bg-background">
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-background" />

            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left">
                    <span className="inline-block py-1.5 px-4 bg-primary/10 rounded-full text-primary mb-6 text-xs font-bold tracking-[0.2em] uppercase">
                        Limited Time Offer
                    </span>
                    <h2 className="text-5xl md:text-7xl font-medium mb-6 font-serif text-foreground leading-tight">
                        Flat 30% OFF <br /><span className="italic text-muted-foreground font-light text-4xl md:text-6xl">on Skincare</span>
                    </h2>

                    <Link href="/shop">
                        <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-12 py-7 rounded-full shadow-lg">
                            Shop the Sale
                        </Button>
                    </Link>
                </div>

                {/* Simple Countdown UI - Modernized */}
                <div className="flex gap-4 md:gap-6 font-mono bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-2xl">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-light">02</span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Days</span>
                    </div>
                    <span className="text-4xl md:text-6xl font-light text-primary/50">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-light">14</span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Hours</span>
                    </div>
                    <span className="text-4xl md:text-6xl font-light text-primary/50">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-light">45</span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Mins</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
