import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import NewArrivals from "@/components/NewArrivals";
import BestSellers from "@/components/BestSellers";
import { GiftCollections, BrandStory } from "@/components/HomeSections";
import ForHim from "@/components/ForHim";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <BestSellers />
      <ForHim />
      <GiftCollections />
      <BrandStory />
    </div>
  );
}
