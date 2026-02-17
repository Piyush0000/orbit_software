import Link from "next/link";
import { Gamepad2, Blocks, Palette, Car, Baby, Brain, Sparkles, Rocket } from "lucide-react";

const categories = [
    { name: "Educational", icon: Brain, color: "bg-primary/10 text-primary", border: "border-primary/20", slug: "educational" },
    { name: "Building Blocks", icon: Blocks, color: "bg-secondary/10 text-secondary", border: "border-secondary/20", slug: "blocks" },
    { name: "Arts & Crafts", icon: Palette, color: "bg-accent/10 text-accent", border: "border-accent/20", slug: "arts-crafts" },
    { name: "Remote Control", icon: Car, color: "bg-blue-100 text-[#71A5DE]", border: "border-blue-200", slug: "remote-control" }, // Soft Sky Blue
    { name: "Soft Toys", icon: Baby, color: "bg-pink-100 text-[#F48FB1]", border: "border-pink-200", slug: "soft-toys" }, // Soft Pink
    { name: "Board Games", icon: Gamepad2, color: "bg-green-100 text-[#88D498]", border: "border-green-200", slug: "games" }, // Minty Green
    { name: "Outdoor Fun", icon: Rocket, color: "bg-orange-100 text-[#F4A261]", border: "border-orange-200", slug: "outdoor" }, // Terracotta tint
    { name: "New Arrivals", icon: Sparkles, color: "bg-yellow-100 text-[#FFD166]", border: "border-yellow-200", slug: "new" }, // Soft Yellow
];

export default function CategoryGrid() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">
                        Shop by Category
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Pick a theme and start exploring!
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="group flex flex-col items-center"
                        >
                            <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${cat.color} ${cat.border} border-2 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                                <cat.icon className="w-10 h-10 md:w-12 md:h-12" />
                            </div>
                            <h3 className="font-bold text-foreground/80 text-sm md:text-base text-center group-hover:text-primary transition-colors leading-tight px-2">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
