"use client";

import { ChevronDown } from "lucide-react";

export default function ProductFilters() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Results Count */}
            <p className="text-sm text-gray-500">Showing <span className="text-black font-medium">9</span> Products</p>

            {/* Sort By */}
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Sort By:</span>
                <div className="relative group">
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gold-600 transition-colors">
                        Recommended <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                        {["Recommended", "Price: Low to High", "Price: High to Low", "Newest", "Best Rating"].map(opt => (
                            <button key={opt} className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black">
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
