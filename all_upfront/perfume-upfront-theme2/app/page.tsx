import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FragranceNotes from "@/components/FragranceNotes";
import Occasions from "@/components/Occasions";
import BestSellers from "@/components/BestSellers";
import GiftSection from "@/components/GiftSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FragranceNotes />
      <Occasions />
      <BestSellers />
      <GiftSection />
    </>
  );
}
