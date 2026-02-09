import { useStorefront } from '@/contexts/StorefrontContext';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts() {
  const { products } = useStorefront();
  
  // Select top 3 products as featured, or filter by a tag if preferred
  const featured = products.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-20 bg-zinc-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Curated Selection</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-black uppercase tracking-tight mb-4">
            Featured Edits
          </h2>
          <div className="h-[1px] w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-200 mb-6">
                <Image
                  src={product.image || 'https://via.placeholder.com/600x800'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.stock === false && (
                   <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                     Out of Stock
                   </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-8 bg-gradient-to-t from-black/50 to-transparent">
                  <Link href={`/products/${product.id}`} className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-heading uppercase text-black mb-1">{product.name}</h3>
                <div className="flex justify-center items-center gap-3 text-sm">
                  <span className="font-bold text-black">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-zinc-500 line-through decoration-zinc-400">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
