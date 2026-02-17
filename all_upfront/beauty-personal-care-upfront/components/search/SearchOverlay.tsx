"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, Product } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Filter logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = products.filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(lowerQuery);
            const ingredientMatch = product.ingredients.some((ing) =>
                ing.name.toLowerCase().includes(lowerQuery)
            );
            return nameMatch || ingredientMatch;
        });
        setResults(filtered);
    }, [query]);

    // Highlight helper
    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) return text;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} className="bg-yellow-200 text-black font-medium px-0.5 rounded">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-4xl mx-auto p-4 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <SearchIcon className="w-6 h-6 text-muted-foreground" />
                    <Input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products, ingredients..."
                        className="h-12 text-lg border-0 border-b rounded-none px-0 focus-visible:ring-0 shadow-none bg-transparent"
                    />
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-secondary">
                        <X className="w-6 h-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {query.trim() === "" ? (
                        <div className="text-center text-muted-foreground py-20">
                            <p>Start typing to discover our products</p>
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {["Vitamin C", "Retinol", "Moisturizer", "Cleanser"].map((term) => (
                                    <Button
                                        key={term}
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => setQuery(term)}
                                    >
                                        {term}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center text-muted-foreground py-20">
                            <p>No results found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop`} // Ideally this would go to product details
                                    onClick={onClose}
                                    className="group flex gap-4 p-4 rounded-xl border bg-card hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="relative h-20 w-20 min-w-20 overflow-hidden rounded-lg bg-white">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium truncate pr-2">
                                                {highlightText(product.name, query)}
                                            </h4>
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                            {/* Show matching ingredients if any */}
                                            {product.ingredients.some(ing => ing.name.toLowerCase().includes(query.toLowerCase())) ? (
                                                <span>
                                                    Contains: {product.ingredients
                                                        .filter(ing => ing.name.toLowerCase().includes(query.toLowerCase()))
                                                        .map(ing => highlightText(ing.name, query))
                                                        .reduce((prev, curr) => [prev, ", ", curr] as any)
                                                    }
                                                </span>
                                            ) : (
                                                product.category
                                            )}
                                        </div>
                                        <div className="mt-2 font-medium text-sm">₹{product.price.toLocaleString()}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
