"use client";

import { ChevronDown } from "lucide-react";

export default function ProductFilters() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2C2621]/10 pb-6">
            {/* Results Count */}
            <p className="text-sm text-[#8D6E63]">Showing <span className="text-[#2C2621] font-bold">9</span> Products</p>

            {/* Sort By */}
            <div className="flex items-center gap-3">
                <span className="text-sm text-[#5D554A]">Sort By:</span>
                <div className="relative group">
                    <button className="flex items-center gap-2 text-sm font-bold text-[#2C2621] hover:text-[#4A4238] transition-colors">
                        Recommended <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#EAE5D8] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-lg shadow-[#2C2621]/5 rounded-sm">
                        {["Recommended", "Price: Low to High", "Price: High to Low", "Newest", "Best Rating"].map(opt => (
                            <button key={opt} className="block w-full text-left px-4 py-2 text-sm text-[#5D554A] hover:bg-[#F5F1E8] hover:text-[#2C2621] transition-colors">
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
