"use client";

import { ChevronDown, ListFilter } from "lucide-react";

interface ProductFiltersProps {
    resultsCount: number;
    sortBy: string;
    onSortChange: (value: string) => void;
}

export default function ProductFilters({ resultsCount, sortBy, onSortChange }: ProductFiltersProps) {
    const sortOptions = [
        { label: "Recommended", value: "recommended" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Newest Arrivals", value: "newest" },
        { label: "Top Rated", value: "rating" }
    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || "Recommended";

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 py-6 border-b border-gray-50">
            {/* Results Count */}
            <div className="flex items-center gap-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold">
                    Discovery
                </p>
                <div className="h-4 w-[1px] bg-gray-200" />
                <p className="text-sm text-gray-900 font-light">
                    Showing <span className="font-bold">{resultsCount}</span> masterworks
                </p>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-6">
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold">Sort By</span>
                <div className="relative group">
                    <button className="flex items-center gap-3 text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] group-hover:text-gold-600 transition-all duration-300">
                        {currentSortLabel} <ChevronDown className="w-3.5 h-3.5 text-gold-500 group-hover:rotate-180 transition-transform duration-500" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-4 w-64 bg-white shadow-2xl rounded-2xl border border-gray-50 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 overflow-hidden">
                        <div className="px-6 py-2 border-b border-gray-50 mb-2">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">Arrange By</span>
                        </div>
                        {sortOptions.map(opt => (
                            <button 
                                key={opt.value} 
                                onClick={() => onSortChange(opt.value)}
                                className={cn(
                                    "block w-full text-left px-8 py-3 text-[10px] uppercase tracking-widest transition-all duration-300",
                                    sortBy === opt.value 
                                        ? "text-gold-600 bg-gold-50/30 font-bold" 
                                        : "text-gray-500 hover:text-black hover:bg-gray-50"
                                )}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
