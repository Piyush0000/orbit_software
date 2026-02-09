"use client";
import Link from "next/link";
import { useStorefront } from "@/context/StorefrontContext";

export default function Hero() {
    const { customization } = useStorefront();

    return (
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-contrast-black">
            {/* Background with luxury texture overlay */}
            {customization?.hero?.backgroundImage ? (
                <div className="absolute inset-0 opacity-40">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={customization.hero.backgroundImage} 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-contrast-black to-contrast-black" />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="animate-slide-up space-y-6">
                    <p className="text-gold-300 tracking-[0.2em] text-sm uppercase font-medium">
                        Luxury • Long Lasting • Authentic
                    </p>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-medium leading-tight uppercase tracking-tighter">
                        {customization?.hero?.title?.split(' ').map((word, i) => (
                             <span key={i} className={i === 2 ? "italic text-gold-200 block" : ""}>
                               {word}{' '}
                             </span>
                        )) || (<>Discover Your <br /><span className="italic text-gold-200">Signature Scent</span></>)}
                    </h1>

                    <p className="text-gray-300 max-w-xl mx-auto text-lg font-light">
                        {customization?.hero?.subtitle || "Experience the essence of elegance with our curated collection of premium fragrances for every occasion."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Link
                            href={customization?.hero?.ctaLink || "/shop"}
                            className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold-500 hover:text-white transition-colors duration-300 min-w-[180px]"
                        >
                            {customization?.hero?.ctaText || "Shop Collection"}
                        </Link>
                        <Link
                            href="/shop?category=women"
                            className="px-8 py-4 border border-white text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors duration-300 min-w-[180px]"
                        >
                            Explore Scents
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0" />
        </section>
    );
}
