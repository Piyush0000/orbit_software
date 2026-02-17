import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";

import TrendingToys from "@/components/home/TrendingToys";
import GiftSection from "@/components/home/GiftSection";
import TrustedBadges from "@/components/home/TrustedBadges";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <div className="bg-white"><Hero /></div>
      <div className="bg-orange-50/50"><TrustedBadges /></div>
      <div className="bg-white"><CategoryGrid /></div>
      <div className="bg-blue-50/30"><TrendingToys /></div>
      {/* Sections */}
      <div className="bg-pink-50/30"><GiftSection /></div>
      <Newsletter />
    </div>
  );
}
