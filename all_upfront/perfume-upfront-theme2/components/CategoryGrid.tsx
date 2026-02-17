import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { name: "Men's Perfumes", image: "https://images.unsplash.com/photo-1595166667117-9c9be2897e93?q=80&w=700&auto=format&fit=crop", href: "/men", size: "col-span-1 md:col-span-2 row-span-2" },
    { name: "Women's Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700&auto=format&fit=crop", href: "/women", size: "col-span-1 md:col-span-2 row-span-2" },
    { name: "Unisex", image: "https://images.unsplash.com/photo-1615160359300-47401c107ae7?q=80&w=700&auto=format&fit=crop", href: "/unisex" },
    { name: "Gift Sets", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=700&auto=format&fit=crop", href: "/gift-sets" },
    { name: "Travel Size", image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=700&auto=format&fit=crop", href: "/travel" },
    { name: "Premium Collection", image: "https://images.unsplash.com/photo-1605307373307-e075c324c4c2?q=80&w=700&auto=format&fit=crop", href: "/premium" },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 px-4 md:px-8 bg-transparent">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-foreground font-light tracking-wide">
                    Shop by <span className="italic text-gold-500">Category</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
                    {CATEGORIES.map((category, idx) => (
                        <Link
                            key={idx}
                            href={category.href}
                            className={cn(
                                "group relative overflow-hidden rounded-[2.5rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                                category.size || "col-span-1"
                            )}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            {/* Overlay - Gradient for better readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pb-10">
                                <div className="text-center transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <span className="block text-white text-2xl md:text-3xl font-serif font-light tracking-wider mb-3 drop-shadow-lg">
                                        {category.name}
                                    </span>
                                    <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
                                        <span className="text-xs uppercase tracking-[0.2em] text-gold-300 font-bold border-b border-gold-300 pb-1">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
