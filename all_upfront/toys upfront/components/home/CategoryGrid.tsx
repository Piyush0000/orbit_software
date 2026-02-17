import Link from "next/link";
import { Gamepad2, Blocks, Palette, Car, Baby, Brain, Sparkles, Rocket } from "lucide-react";

const categories = [
    { name: "Educational", icon: Brain, color: "bg-blue-100 text-blue-600", slug: "educational" },
    { name: "Building Blocks", icon: Blocks, color: "bg-orange-100 text-orange-600", slug: "blocks" },
    { name: "Arts & Crafts", icon: Palette, color: "bg-purple-100 text-purple-600", slug: "arts-crafts" },
    { name: "Remote Control", icon: Car, color: "bg-red-100 text-red-600", slug: "remote-control" },
    { name: "Soft Toys", icon: Baby, color: "bg-pink-100 text-pink-600", slug: "soft-toys" },
    { name: "Board Games", icon: Gamepad2, color: "bg-green-100 text-green-600", slug: "games" },
    { name: "Outdoor Fun", icon: Rocket, color: "bg-teal-100 text-teal-600", slug: "outdoor" },
    { name: "New Arrivals", icon: Sparkles, color: "bg-yellow-100 text-yellow-600", slug: "new" },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Find the perfect toy for every interest and personality.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="group flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-white border-2 border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <cat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
