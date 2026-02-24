"use client";

import Image from "next/image";
import Link from "next/link";

import { useStoreContext } from "@/context/store-context";

export default function Hero() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Discover Elegance in Every Drop";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Experience the essence of sophistication with our curated collection. Find the scent that defines your presence.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop Now";
    const bgImage = customization?.heroSection?.backgroundImage;

    return (
        <section 
            onClick={handleSectionClick}
            className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-contrast-black hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
        >
            {/* Background with luxury texture overlay - Reduced Opacity for Clean Look */}
            <div className="absolute inset-0 opacity-40">
                {/* Abstract gradient flow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-contrast-black to-contrast-black" />
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-gold-500/5 to-transparent blur-3xl rounded-full" />
            </div>

            {/* Content Container - Asymmetric Layout */}
            <div className="relative z-10 container mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Text Content - Left Side */}
                <div className="lg:col-span-7 animate-slide-up space-y-10 text-left">
                    <div className="inline-block border border-gold-500/20 rounded-full px-5 py-2 bg-black/10 backdrop-blur-sm">
                        <p className="text-gold-300 tracking-[0.3em] text-[10px] uppercase font-bold text-opacity-90">
                            Luxury • Long Lasting • Authentic
                        </p>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-thin leading-[1.05] tracking-tight">
                        {headline.includes("Elegance") ? (
                            <>
                                {headline.split("Elegance")[0]}
                                <span className="block italic text-gold-200 font-light opacity-90">Elegance</span>
                                {headline.split("Elegance")[1]}
                            </>
                        ) : headline}
                    </h1>

                    <p className="text-gray-400 max-w-lg text-lg font-light leading-relaxed border-l border-gold-500/50 pl-6 py-1">
                        {subheadline}
                    </p>

                    <div className="flex flex-wrap gap-5 pt-2">
                        <Link
                            href="/men"
                            className="w-40 py-4 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-gold-500 hover:text-white transition-all duration-500 rounded-full shadow-xl hover:shadow-gold-500/10 text-center flex items-center justify-center"
                        >
                            Shop Men
                        </Link>
                        <Link
                            href="/women"
                            className="w-40 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500 rounded-full text-center flex items-center justify-center"
                        >
                            Shop Women
                        </Link>
                        <Link
                            href="/luxury"
                            className="w-40 py-4 bg-gold-500 text-white text-xs uppercase tracking-widest font-bold hover:bg-gold-600 transition-all duration-500 rounded-full text-center flex items-center justify-center"
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>

                {/* Visual Element - Right Side - Stabilized for Professional Look */}
                <div className="lg:col-span-5 relative hidden lg:block h-[650px] flex items-center justify-center">
                    {/* Glassmorphism Card Effect - Reduced Rotation for Stability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] border border-white/5 backdrop-blur-sm transform rotate-1 flex items-center justify-center overflow-hidden z-0">
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <Image
                            src={bgImage || "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=1000&auto=format&fit=crop"}
                            alt="Luxury Perfume"
                            fill
                            className="object-cover opacity-60 grayscale-[30%]"
                            priority
                        />
                    </div>
                    <div className="absolute inset-6 bg-black/30 rounded-[2.5rem] border border-white/10 backdrop-blur-xl transform -rotate-1 flex items-center justify-center overflow-hidden shadow-2xl z-20 hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src={bgImage || "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"}
                            alt="Scent of the Year"
                            fill
                            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <div className="relative z-10 text-center p-12 mt-auto">
                            <p className="text-gold-200 text-xs tracking-[0.4em] uppercase mb-4 font-bold drop-shadow-md opacity-80">Collection</p>
                            <h3 className="text-5xl font-serif text-white font-medium italic drop-shadow-xl tracking-wide">Signature</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative gradient at bottom - Smoother transition */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent z-0" />
        </section>
    );
}
