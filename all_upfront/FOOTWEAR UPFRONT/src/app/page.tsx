import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { Offers } from '@/components/home/Offers';
import { USP } from '@/components/home/USP';

export default function Home() {
  return (
    <main>
      <Hero />
      <USP />
      <Categories />
      <Offers />
    </main>
  );
}

