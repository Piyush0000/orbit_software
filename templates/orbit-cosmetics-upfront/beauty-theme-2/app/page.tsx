import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BestSellers } from "@/components/BestSellers";
import { SkinTypeFilter } from "@/components/SkinTypeFilter";
import { TrustSafety } from "@/components/TrustSafety";
import { PromoBanner } from "@/components/PromoBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <CategoryGrid />
      <BestSellers />
      <SkinTypeFilter />
      <TrustSafety />
      <PromoBanner />
    </main>
  );
}
