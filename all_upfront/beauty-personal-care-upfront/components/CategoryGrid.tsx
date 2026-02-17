import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Scissors, Palette, Heart, Flower2 } from "lucide-react";

const categories = [
    { name: "Skincare", icon: Sparkles, color: "bg-rose-100 dark:bg-rose-900/20" },
    { name: "Haircare", icon: Scissors, color: "bg-amber-100 dark:bg-amber-900/20" },
    { name: "Makeup", icon: Palette, color: "bg-fuchsia-100 dark:bg-fuchsia-900/20" },
    { name: "Hygiene", icon: Heart, color: "bg-sky-100 dark:bg-sky-900/20" },
    { name: "Fragrances", icon: Flower2, color: "bg-purple-100 dark:bg-purple-900/20" },
];

export function CategoryGrid() {
    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-serif text-foreground">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.map((cat) => (
                        <Card
                            key={cat.name}
                            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none bg-secondary/50 hover:bg-white dark:hover:bg-card"
                        >
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                                <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <cat.icon className="w-8 h-8 text-primary" />
                                </div>
                                <span className="font-medium text-lg tracking-wide group-hover:text-primary transition-colors">
                                    {cat.name}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
