"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { filters } from "@/lib/data";

interface FilterSidebarProps {
    className?: string;
}

export default function FilterSidebar({ className = "" }: FilterSidebarProps) {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        genders: true,
        brands: true,
        priceRanges: true,
        concentrations: false,
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2C2621]/10">
                <h3 className="font-serif text-xl text-[#2C2621]">Filters</h3>
                <button className="text-[10px] text-[#8D6E63] hover:text-[#2C2621] uppercase tracking-widest transition-colors font-bold">Clear All</button>
            </div>

            <div className="space-y-8">
                {/* Gender */}
                <div className="border-b border-[#2C2621]/10 pb-8">
                    <button
                        onClick={() => toggleSection('genders')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2C2621] group-hover:text-[#4A4238] transition-colors">Gender</span>
                        {openSections.genders ? <ChevronUp className="w-4 h-4 text-[#8D6E63]" /> : <ChevronDown className="w-4 h-4 text-[#8D6E63]" />}
                    </button>
                    <AnimatePresence>
                        {openSections.genders && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-3 pt-2">
                                    {filters.genders.map(gender => (
                                        <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-4 h-4 border-[#2C2621]/30 rounded-sm bg-white checked:bg-[#2C2621] checked:border-[#2C2621] focus:ring-0 transition-colors" />
                                            </div>
                                            <span className="text-sm text-[#5D554A] group-hover:text-[#2C2621] transition-colors">{gender}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Price */}
                <div className="border-b border-[#2C2621]/10 pb-8">
                    <button
                        onClick={() => toggleSection('priceRanges')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2C2621] group-hover:text-[#4A4238] transition-colors">Price</span>
                        {openSections.priceRanges ? <ChevronUp className="w-4 h-4 text-[#8D6E63]" /> : <ChevronDown className="w-4 h-4 text-[#8D6E63]" />}
                    </button>
                    <AnimatePresence>
                        {openSections.priceRanges && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-3 pt-2">
                                    {filters.priceRanges.map((range, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="peer w-4 h-4 border-[#2C2621]/30 rounded-sm bg-white checked:bg-[#2C2621] checked:border-[#2C2621] focus:ring-0 transition-colors" />
                                            <span className="text-sm text-[#5D554A] group-hover:text-[#2C2621] transition-colors">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Brands */}
                <div className="border-b border-[#2C2621]/10 pb-8">
                    <button
                        onClick={() => toggleSection('brands')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2C2621] group-hover:text-[#4A4238] transition-colors">Brand</span>
                        {openSections.brands ? <ChevronUp className="w-4 h-4 text-[#8D6E63]" /> : <ChevronDown className="w-4 h-4 text-[#8D6E63]" />}
                    </button>
                    <AnimatePresence>
                        {openSections.brands && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-3 pt-2">
                                    {filters.brands.map(brand => (
                                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="peer w-4 h-4 border-[#2C2621]/30 rounded-sm bg-white checked:bg-[#2C2621] checked:border-[#2C2621] focus:ring-0 transition-colors" />
                                            <span className="text-sm text-[#5D554A] group-hover:text-[#2C2621] transition-colors">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Concentration */}
                <div className="pb-8">
                    <button
                        onClick={() => toggleSection('concentrations')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2C2621] group-hover:text-[#4A4238] transition-colors">Concentration</span>
                        {openSections.concentrations ? <ChevronUp className="w-4 h-4 text-[#8D6E63]" /> : <ChevronDown className="w-4 h-4 text-[#8D6E63]" />}
                    </button>
                    <AnimatePresence>
                        {openSections.concentrations && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-3 pt-2">
                                    {filters.concentrations.map(conc => (
                                        <label key={conc} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="peer w-4 h-4 border-[#2C2621]/30 rounded-sm bg-white checked:bg-[#2C2621] checked:border-[#2C2621] focus:ring-0 transition-colors" />
                                            <span className="text-sm text-[#5D554A] group-hover:text-[#2C2621] transition-colors">{conc}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </aside>
    );
}
