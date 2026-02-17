"use client";

import Link from "next/link";
import { ArrowRight, Star, Cloud, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white pt-12 pb-24 lg:pt-24 lg:pb-48">
            {/* Background Doodles/Shapes */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-[10%] text-amber-300"
                >
                    <Cloud className="w-16 h-16 fill-current" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-[15%] text-accent/20"
                >
                    <Star className="w-12 h-12 fill-current" />
                </motion.div>
                <div className="absolute bottom-[20%] left-[5%] w-8 h-8 rounded-full bg-secondary/20 animate-bounce delay-700" />
                <div className="absolute top-[40%] right-[5%] w-4 h-4 rounded-full bg-primary/40 animate-ping duration-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left relative">
                        {/* Playful Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white border-2 border-primary/20 text-secondary font-bold text-xs lg:text-sm shadow-sm hover:scale-105 transition-transform cursor-default">
                            <span className="text-xl animate-pulse">✨</span>
                            <span className="tracking-wide uppercase">Making childhood magical</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-6 font-display leading-[1.1] tracking-tight relative">
                            Play, Learn, & <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Grow Together</span>
                                <span className="absolute -bottom-2 left-0 w-full h-3 bg-secondary/20 -skew-x-6 rounded-full z-0"></span>
                            </span>
                        </h1>

                        <p className="text-lg lg:text-xl text-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Discover the safest, most engaging toys designed to spark creativity
                            and joy in every child.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/category/educational"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-primary rounded-full hover:bg-amber-300 transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
                            >
                                Start Playing
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/category/new-arrivals"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-foreground/80 bg-white border-2 border-gray-100 shadow-sm rounded-full hover:border-secondary/30 hover:text-secondary transition-all hover:-translate-y-1"
                            >
                                New Arrivals 🎁
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Illustration */}
                    <div className="flex-1 relative w-full max-w-[320px] lg:max-w-xl">
                        <div className="relative z-10">
                            {/* Main Image with 'Blob' sensation */}
                            <motion.div
                                animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="overflow-hidden border-[6px] border-white shadow-2xl relative bg-amber-100"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hero-image.jpg"
                                    alt="Happy kids playing"
                                    className="w-full h-auto object-cover scale-110 hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>

                            {/* Floating Stickers */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg border border-gray-100 -rotate-12"
                            >
                                <Heart className="w-8 h-8 text-secondary fill-secondary" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fun Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 text-white">
                <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-current"></path>
                </svg>
            </div>
        </section>
    );
}
