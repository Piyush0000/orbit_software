"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStorefront } from "@/context/StorefrontContext";

export function Hero() {
  const { customization } = useStorefront();

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center bg-secondary overflow-hidden">
      {/* Background Image Overlay */}
      {customization?.hero?.backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${customization.hero.backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 z-0 bg-secondary/20 mix-blend-multiply" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 font-serif lowercase italic">
          {customization?.hero?.title || "Radiance Redefined"}
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          {customization?.hero?.subtitle || "Discover a curated collection of premium skincare and beauty essentials designed to enhance your natural glow."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={customization?.hero?.ctaLink || "/shop"}>
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
              {customization?.hero?.ctaText || "Shop Collection"}
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-white/50 backdrop-blur-sm border-white/50 hover:bg-white/80 transition-all hover:scale-105">
              Explore Beauty
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
