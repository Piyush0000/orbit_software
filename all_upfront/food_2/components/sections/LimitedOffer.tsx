import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function LimitedOffer() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-12 md:px-16 md:py-20 text-center text-white">
                    <div className="relative z-10 flex flex-col items-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-5xl uppercase md:text-6xl">
                                Limited-Time Offer
                            </h2>
                            <p className="max-w-[600px] text-zinc-400 md:text-xl mx-auto">
                                Order before <span className="text-white font-bold">10:00 PM</span> for same-day dispatch and guaranteed freshness!
                            </p>
                        </div>

                        {/* Timer UI (Static as requested) */}
                        <div className="flex gap-4 md:gap-8">
                            {[{ l: "Hrs", v: "02" }, { l: "Min", v: "45" }, { l: "Sec", v: "30" }].map((item) => (
                                <div key={item.l} className="flex flex-col items-center space-y-2">
                                    <div className="flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-xl bg-background/10 text-3xl md:text-5xl font-bold backdrop-blur-sm">
                                        {item.v}
                                    </div>
                                    <span className="text-xs md:text-sm uppercase tracking-widest text-zinc-500 font-bold">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="bg-background text-foreground hover:bg-muted px-12 py-8 text-xl font-bold uppercase tracking-widest h-auto">
                            Shop Now
                        </Button>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
                </div>
            </div>
        </section>
    )
}
