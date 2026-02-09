"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStorefront } from "@/context/StorefrontContext";

export function Hero() {
  const { customization } = useStorefront();

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-background overflow-hidden border-b border-border/50">
      {/* Background Image Overlay */}
      {customization?.hero?.backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url(${customization.hero.backgroundImage})` }}
        />
      )}
      {/* Abstract Background - Dark Mode Optimized */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-sm tracking-[0.3em] font-medium text-primary uppercase mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
           Premium Collection
        </span>
        <h1 className="text-5xl md:text-8xl font-serif font-medium tracking-tight text-foreground mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 uppercase">
          {customization?.hero?.title?.split(' ').map((word, i) => (
             <span key={i} className={i % 2 !== 0 ? "italic font-light text-muted-foreground block" : ""}>
               {word}{' '}
             </span>
          )) || (<>Radiance<br /><span className="italic font-light text-muted-foreground">Redefined</span></>)}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          {customization?.hero?.subtitle || "Discover a curated collection of premium skincare and beauty essentials designed to enhance your natural glow with science-backed formulas."}
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Link href={customization?.hero?.ctaLink || "/shop"}>
            <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] transition-all bg-primary text-primary-foreground border border-primary/20 uppercase tracking-widest">
              {customization?.hero?.ctaText || "Shop Collection"}
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg bg-transparent border-white/10 hover:bg-white/5 text-foreground transition-all uppercase tracking-widest">
              Explore Beauty
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
