"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { useStoreContext } from "@/context/store-context";

export default function Hero() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Essence of Elegance";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Unveil the artistry of scent. A collection curated for the discerning soul, blending timeless tradition with modern sophistication.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Explore Fragrances";
    const bgImage = customization?.heroSection?.backgroundImage;

    return (
        <section 
            onClick={handleSectionClick}
            className="relative w-full min-h-[95vh] pt-48 lg:pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#F5F1E8] hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
        >
            {/* Background Texture - Subtle Grain */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

            {/* Content Container */}
            <div className="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="space-y-10 lg:pr-12 order-2 lg:order-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#2C2621] leading-[1.1] mb-6">
                            {headline.includes("of Elegance") ? (
                                <>
                                    {headline.replace("of Elegance", "")} <br />
                                    <span className="font-light italic text-[#5D554A]">of Elegance</span>
                                </>
                            ) : headline}
                        </h1>
                        <p className="text-[#5D554A] text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                            {subheadline}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                    >
                        <Link href="/shop" className="px-10 py-4 bg-[#2C2621] text-[#F5F1E8] uppercase text-xs tracking-[0.2em] font-medium hover:bg-[#4A4238] transition-all">
                            {ctaText}
                        </Link>
                        <Link href="/about" className="px-10 py-4 border border-[#2C2621] text-[#2C2621] uppercase text-xs tracking-[0.2em] font-medium hover:bg-[#EAE5D8] transition-all">
                            Our Journey
                        </Link>
                    </motion.div>
                </div>

                {/* Hero Image / Product Highlight */}
                <div className="order-1 lg:order-2 relative h-[50vh] lg:h-[70vh] w-full flex items-center justify-center">
                    {/* Abstract shape background */}
                    <div className="absolute w-[80%] h-[80%] bg-[#EAE5D8] rounded-full blur-[60px] opacity-60 animate-float"></div>

                    {/* Placeholder for Hero Image */}
                    <div className="relative w-full max-w-md aspect-[3/4] lg:aspect-square bg-[#fffdf9] p-8 shadow-2xl shadow-[#2c2621]/5 flex flex-col items-center justify-center border border-white">
                        <div className="w-full h-full border border-[#EAE5D8] flex items-center justify-center relative bg-[#faf9f6] overflow-hidden">
                            {bgImage ? (
                                <img src={bgImage} alt="Hero" className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-serif text-3xl text-[#2C2621] tracking-widest opacity-20 rotate-[-45deg]">SCENTARIS</span>
                            )}
                        </div>
                        <div className="absolute bottom-12 bg-white px-6 py-3 shadow-lg border border-[#f0f0f0]">
                            <p className="font-serif text-xl text-[#2C2621]">Nude et Signature</p>
                            <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] text-center mt-1">Eau de Parfum</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
