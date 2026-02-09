
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Leaf, Heart, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center bg-secondary/30 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px]" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="text-sm font-bold tracking-widest uppercase text-primary mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Our Story
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                        Beauty in Every Light
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        We are Lumière. Dedicated to illuminating your natural radiance through conscious, curated, and scientifically backed skincare.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 md:py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-muted group">
                        <Image
                            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                            alt="Natural Ingredients"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold">
                            Conscious Beauty, <br />
                            <span className="text-primary">Uncompromised Quality.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground">
                            <p>
                                Born from a desire to simplify skincare without sacrificing efficacy, Lumière represents a new era of beauty. We believe that what you put on your skin should be as pure as it is powerful.
                            </p>
                            <p>
                                Our formulations are grounded in science and inspired by nature. We meticulously source bio-active ingredients that work in harmony with your skin's natural biology to restore, protect, and rejuvenate.
                            </p>
                        </div>
                        <div className="pt-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold font-serif">100%</h3>
                                    <p className="text-sm text-muted-foreground">Clean Ingredients</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold font-serif">50k+</h3>
                                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-secondary/20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Core Philosophies</h2>
                        <p className="text-muted-foreground">Guided by principles that prioritize your health and the planet.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Leaf,
                                title: "Sustainably Sourced",
                                desc: "We prioritize ingredients that are ethically harvested and packaging that respects our planet."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Clinically Proven",
                                desc: "Every formula is rigorously tested to ensure it delivers visible, tangible results for your skin."
                            },
                            {
                                icon: Heart,
                                title: "Cruelty Free",
                                desc: "We never test on animals. Beauty should be kind, compassionate, and guilt-free."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-background p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3">{item.title}</h3>
                                <p className="text-muted-foreground mb-4">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote / Vision */}
            <section className="py-24 px-4 bg-primary text-primary-foreground text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-serif italic leading-relaxed opacity-90">
                        "We didn't just want to create another skincare brand. We wanted to create a moment of self-care in your busy day—a ritual that reminds you of your own light."
                    </h2>
                    <div className="mt-8 font-bold tracking-widest uppercase text-sm opacity-75">
                        — The Founders
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to Find Your Glow?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Explore our best-selling collections and start your journey to radiant skin today.
                    </p>
                    <Link href="/shop">
                        <Button size="lg" className="px-8 py-6 text-lg rounded-full">
                            Shop The Collection
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
