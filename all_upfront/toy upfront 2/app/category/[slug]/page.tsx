"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

// Mock Products Data (Expanded)
const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Fun Toy Product ${i + 1}`,
    price: 20 + i * 5,
    rating: 4.5,
    reviews: 10 + i,
    age: "3-5",
    badge: i % 3 === 0 ? "Bestseller" : null,
    image: "/api/placeholder/400/400",
}));

export default function CategoryPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [showFilters, setShowFilters] = useState(false);

    // Format slug for title
    const title = slug
        ? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        : "All Toys";

    return (
        <div className="bg-background min-h-screen pb-24">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-white to-muted/40 border-b border-muted/50 pt-16 pb-12 px-4">
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-display text-foreground mb-4 tracking-tight">{title}</h1>
                    <div className="flex items-center gap-2 text-sm text-foreground/60 font-medium">
                        <span className="hover:text-primary transition-colors cursor-pointer">Home</span> / <span className="text-primary font-bold">{title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Desktop */}
                    <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
                        <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-muted/60 sticky top-28">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-lg text-foreground font-display">Filters</h3>
                                <button className="text-xs font-bold text-primary hover:text-secondary uppercase tracking-wider transition-colors">Reset</button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8 border-b border-muted/40 pb-6 last:border-0">
                                <h4 className="font-bold text-sm mb-4 text-foreground/80">Price Range</h4>
                                <div className="space-y-3">
                                    {["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "₹2000+"].map((price, i) => (
                                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-muted rounded-md checked:bg-primary checked:border-primary transition-all" />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            <span className="text-sm text-foreground/70 group-hover:text-primary transition-colors font-medium">{price}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Age Group */}
                            <div className="mb-8 border-b border-muted/40 pb-6 last:border-0">
                                <h4 className="font-bold text-sm mb-4 text-foreground/80">Age Group</h4>
                                <div className="space-y-3">
                                    {["0-2 Years", "3-5 Years", "6-8 Years", "9-12 Years", "Teens"].map((age) => (
                                        <label key={age} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-muted rounded-md checked:bg-primary checked:border-primary transition-all" />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            <span className="text-sm text-foreground/70 group-hover:text-primary transition-colors font-medium">{age}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Material */}
                            <div>
                                <h4 className="font-bold text-sm mb-4 text-foreground/80">Material</h4>
                                <div className="space-y-3">
                                    {["Wood", "Plastic", "Plush", "Metal", "Eco-friendly"].map((mat) => (
                                        <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-muted rounded-md checked:bg-primary checked:border-primary transition-all" />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            <span className="text-sm text-foreground/70 group-hover:text-primary transition-colors font-medium">{mat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-muted/40">
                            <button
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-muted/20 hover:bg-muted/40 border border-transparent rounded-full text-sm font-bold text-foreground transition-colors"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            <p className="text-sm text-foreground/60 font-medium">Showing <span className="text-foreground font-bold">12</span> results</p>

                            <div className="flex items-center gap-3 ml-auto">
                                <span className="text-sm text-foreground/60 font-medium hidden sm:inline">Sort by:</span>
                                <div className="relative">
                                    <select className="appearance-none bg-muted/20 hover:bg-muted/40 border border-transparent pl-4 pr-10 py-2.5 rounded-full text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all">
                                        <option>Recommended</option>
                                        <option>Newest</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-foreground/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mockProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
