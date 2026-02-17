import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";

import TrendingToys from "@/components/home/TrendingToys";
import GiftSection from "@/components/home/GiftSection";
import TrustedBadges from "@/components/home/TrustedBadges";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 font-sans">
      <div className="bg-white">
        <Hero />
      </div>

      <div className="bg-white border-y border-gray-100">
        <TrustedBadges />
      </div>

      <div className="bg-white">
        <CategoryGrid />
      </div>

      <div className="bg-gray-50 pt-10 pb-4">
        <TrendingToys />
      </div>

      <div className="bg-white">
        <GiftSection />
      </div>

      <div className="bg-gray-50">
        <Newsletter />
      </div>
    </div>
  );
}
