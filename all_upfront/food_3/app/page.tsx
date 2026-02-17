import Hero from "@/components/sections/Hero";
import CategoryExplorer from "@/components/sections/CategoryExplorer";
import BestSellers from "@/components/sections/BestSellers";
import DealsCombos from "@/components/sections/DealsCombos";
import TrustSafety from "@/components/sections/TrustSafety";
import LimitedOffer from "@/components/sections/LimitedOffer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryExplorer />
      <BestSellers />
      <DealsCombos />
      <TrustSafety />
      <LimitedOffer />
    </div>
  );
}
