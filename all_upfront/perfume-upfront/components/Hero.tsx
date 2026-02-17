"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-contrast-black">
            {/* Background with luxury texture overlay */}
            <div className="absolute inset-0 opacity-40">
                {/* Placeholder for a luxury background texture/image */}
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-contrast-black to-contrast-black" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="animate-slide-up space-y-6">
                    <p className="text-gold-300 tracking-[0.2em] text-sm uppercase font-medium">
                        Luxury • Long Lasting • Authentic
                    </p>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-medium leading-tight">
                        Discover Your <br />
                        <span className="italic text-gold-200">Signature Scent</span>
                    </h1>

                    <p className="text-gray-300 max-w-xl mx-auto text-lg font-light">
                        Experience the essence of elegance with our curated collection of premium fragrances for every occasion.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Link
                            href="/men"
                            className="px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-gold-500 hover:text-white transition-colors duration-300 min-w-[160px]"
                        >
                            Shop Men
                        </Link>
                        <Link
                            href="/women"
                            className="px-8 py-4 border border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors duration-300 min-w-[160px]"
                        >
                            Shop Women
                        </Link>
                        <Link
                            href="/luxury"
                            className="px-8 py-4 bg-transparent text-gold-300 text-sm uppercase tracking-widest font-bold border border-gold-300 hover:bg-gold-300 hover:text-black transition-colors duration-300 min-w-[160px]"
                        >
                            Luxury
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0" />
        </section>
    );
}
