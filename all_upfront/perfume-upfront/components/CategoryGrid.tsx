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
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-black">Shop by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
                    {CATEGORIES.map((category, idx) => (
                        <Link
                            key={idx}
                            href={category.href}
                            className={cn(
                                "group relative overflow-hidden rounded-sm cursor-pointer",
                                category.size || "col-span-1"
                            )}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="block text-white text-xl md:text-2xl font-serif font-medium tracking-wide mb-2 drop-shadow-md">
                                        {category.name}
                                    </span>
                                    <span className="inline-block h-[1px] w-0 bg-gold-300 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
