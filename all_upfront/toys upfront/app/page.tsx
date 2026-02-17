import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import Features from "@/components/home/Features";
import TrendingToys from "@/components/home/TrendingToys";
import GiftSection from "@/components/home/GiftSection";
import TrustedBadges from "@/components/home/TrustedBadges";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <TrustedBadges />
      <CategoryGrid />
      <TrendingToys />
      <Features />
      <GiftSection />
    </div>
  );
}
