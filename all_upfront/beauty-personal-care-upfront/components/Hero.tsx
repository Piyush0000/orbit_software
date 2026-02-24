import Link from "next/link";
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

  const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Radiance Redefined";
  const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "";
  const description = customization?.heroSection?.description || "Discover a curated collection of premium skincare and beauty essentials designed to enhance your natural glow.";
  const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop Skincare";
  const bgImage = customization?.heroSection?.backgroundImage || "https://images.unsplash.com/photo-1596462502278-27bfaf410911?q=80&w=2000&auto=format&fit=crop";

  return (
    <section 
      onClick={handleSectionClick}
      className="relative w-full h-[600px] flex items-center justify-center bg-secondary overflow-hidden hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-serif drop-shadow-lg">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl md:text-2xl text-white mb-2 font-medium drop-shadow-md">
            {subheadline}
          </p>
        )}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
              {ctaText}
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-white/50 backdrop-blur-sm border-white/50 hover:bg-white/80 transition-all hover:scale-105 text-foreground font-bold">
              Explore Beauty
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
