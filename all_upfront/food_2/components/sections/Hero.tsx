"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStoreContext } from "@/context/store-context"

export default function Hero() {
    const { customization } = useStoreContext()
    const [currentSlide, setCurrentSlide] = useState(0)

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Fresh Food & Drinks";
    const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Delivered.";
    const description = customization?.heroSection?.description || "Premium snacks, refreshing beverages & ready-to-eat meals. Sourced fresh, packed with care, delivered fast to your doorstep.";
    const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Order Now";
    const weeklySpecial = customization?.heroSection?.weeklySpecial || "Artisanal Combos";
    const specialPrice = customization?.heroSection?.specialPrice || "$19.99";

    const defaultSlides = [
        {
            src: "/hero.png",
            alt: "Premium Snacks and Beverages"
        },
        {
            src: "/category-beverages.png",
            alt: "Refreshing Artisanal Drinks"
        },
        {
            src: "/category-snacks.png",
            alt: "Gourmet Snack Platters"
        }
    ]

    const slides = customization?.heroSection?.slides || defaultSlides;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section 
            onClick={handleSectionClick}
            className="relative w-full overflow-hidden bg-background py-12 md:py-20 lg:py-28 hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl xl:text-8xl/none text-foreground uppercase leading-[0.9]">
                                {headline} <br />
                                <span className="text-primary italic">{subheadline}</span>
                            </h1>
                            <p className="max-w-[550px] text-muted-foreground md:text-xl font-medium leading-relaxed mx-auto lg:mx-0">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start pt-4">
                            <Button size="lg" className="px-10 py-7 text-sm font-black uppercase tracking-[0.2em] h-auto rounded-none shadow-xl hover:translate-y-[-2px] transition-all">
                                {ctaText}
                            </Button>
                            <Button size="lg" variant="outline" className="px-10 py-7 text-sm font-black uppercase tracking-[0.2em] h-auto bg-transparent border-2 border-border hover:bg-muted rounded-none transition-all">
                                Browse Menu
                            </Button>
                        </div>

                        {/* Slide Indicators for mobile/below-image context */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
                            {slides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1 transition-all duration-300 ${currentSlide === idx ? "w-8 bg-primary" : "w-4 bg-muted"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none group">
                        <div className="relative aspect-square overflow-hidden rounded-none shadow-[40px_40px_0px_0px_rgba(244,244,245,1)]">
                            {slides.map((slide: any, idx: number) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                                        }`}
                                >
                                    <Image
                                        src={slide.src}
                                        fill
                                        alt={slide.alt}
                                        className="object-cover transition-transform duration-[5s] scale-110 group-hover:scale-100"
                                        priority={idx === 0}
                                    />
                                    {/* Subtle Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                                </div>
                            ))}

                            {/* Controls */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevSlide}
                                    className="h-12 w-12 rounded-full bg-background/80 backdrop-blur hover:bg-background text-foreground shadow-lg"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextSlide}
                                    className="h-12 w-12 rounded-full bg-background/80 backdrop-blur hover:bg-background text-foreground shadow-lg"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-card p-6 shadow-2xl z-30 hidden md:block border border-border">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Weekly Special</p>
                            <p className="text-xl font-black uppercase tracking-tighter text-primary">Artisanal Combos</p>
                            <p className="text-xs font-bold text-muted-foreground mt-1">Starting at $19.99</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
