import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCarousel } from "@/components/ProductCarousel";
import { GiftSection } from "@/components/GiftSection";
import { QualityStory } from "@/components/QualityStory";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryGrid />
      <ProductCarousel title="New Arrivals" subtitle="Just Launched" />
      <ProductCarousel title="Best Sellers" subtitle="Customer Favorites" />
      <GiftSection />
      <QualityStory />
    </div>
  );
}
