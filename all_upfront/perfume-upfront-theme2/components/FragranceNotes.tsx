import { Flower, Sprout, Wind, Droplets, Flame, Sun, Sparkles, Heart } from "lucide-react";

const NOTES = [
    { name: "Floral", icon: Flower, color: "text-pink-400" },
    { name: "Woody", icon: Sprout, color: "text-amber-800" },
    { name: "Citrus", icon: Sun, color: "text-yellow-500" },
    { name: "Fresh", icon: Wind, color: "text-blue-300" },
    { name: "Aqua", icon: Droplets, color: "text-cyan-500" },
    { name: "Spicy", icon: Flame, color: "text-red-500" },
    { name: "Oriental", icon: Sparkles, color: "text-purple-500" },
    { name: "Sweet", icon: Heart, color: "text-rose-400" },
];

export default function FragranceNotes() {
    return (
        <section className="py-16 bg-off-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-black">Shop by Fragrance Notes</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto font-light tracking-wide text-lg">
                    Discover perfumes based on the scent profile that defines your personality.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                    {NOTES.map((note) => (
                        <div
                            key={note.name}
                            className="flex flex-col items-center justify-center group cursor-pointer"
                        >
                            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4 group-hover:shadow-xl group-hover:bg-gold-50 transition-all duration-300 border border-gray-100 group-hover:border-gold-300">
                                <note.icon className={`w-8 h-8 ${note.color} transition-transform duration-300 group-hover:scale-110`} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-800 group-hover:text-black transition-colors">
                                {note.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
