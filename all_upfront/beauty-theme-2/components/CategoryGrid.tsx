import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Scissors, Palette, Heart, Flower2 } from "lucide-react";

const categories = [
    { name: "Skincare", icon: Sparkles, color: "bg-primary/10 text-primary" },
    { name: "Haircare", icon: Scissors, color: "bg-primary/10 text-primary" },
    { name: "Makeup", icon: Palette, color: "bg-primary/10 text-primary" },
    { name: "Hygiene", icon: Heart, color: "bg-primary/10 text-primary" },
    { name: "Fragrances", icon: Flower2, color: "bg-primary/10 text-primary" },
];

export function CategoryGrid() {
    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-12 text-foreground">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.map((cat) => (
                        <Card
                            key={cat.name}
                            className="group cursor-pointer hover:border-primary/50 transition-all duration-300 border border-border/50 bg-card hover:bg-card/80 shadow-none rounded-2xl"
                        >
                            <CardContent className="flex flex-col items-center justify-center p-8 gap-5">
                                <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                    <cat.icon className="w-8 h-8" />
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
