"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useStoreContext } from "@/context/store-context";

export function Hero() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Timeless Elegance";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "New Collection 2025";
    const description = customization?.heroSection?.description || customization?.heroSection?.text || "Discover our exclusive selection of handcrafted jewellery, designed to make every moment unforgettable.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop Collection";
    const bgImage = customization?.heroSection?.backgroundImage;

    return (
        <section 
            onClick={handleSectionClick}
            className="relative h-screen w-full overflow-hidden cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500/50"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage || "/images/hero-luxury-jewellery.png"}
                    alt="Luxury Jewellery Model"
                    fill
                    priority
                    className="object-cover object-top opacity-90"
                    sizes="100vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
                <div className="absolute inset-0 bg-black/20" /> {/* General darkening */}
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-center items-center text-center px-4 md:px-8 pt-20">
                <span className="text-gold tracking-[0.2em] font-medium mb-4 uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {subheadline}
                </span>

                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-wide drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {headline.includes("Elegance") ? (
                        <>
                            {headline.split("Elegance")[0]} <span className="italic text-gold">Elegance</span> {headline.split("Elegance")[1]}
                        </>
                    ) : headline}
                </h1>

                <p className="font-body text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gold hover:text-black transition-all duration-300 rounded-none px-8 py-6 text-sm tracking-widest uppercase font-semibold"
                    >
                        {ctaText}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-none px-8 py-6 text-sm tracking-widest uppercase font-semibold backdrop-blur-sm"
                    >
                        Gift Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
