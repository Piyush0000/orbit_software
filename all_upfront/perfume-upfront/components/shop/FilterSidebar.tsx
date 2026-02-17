"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
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
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-serif text-lg text-gray-900">Filters</h3>
                <button className="text-xs text-gray-500 hover:text-black uppercase tracking-wide">Clear All</button>
            </div>

            <div className="space-y-6">
                {/* Gender */}
                <div className="border-b border-gray-100 pb-6">
                    <button
                        onClick={() => toggleSection('genders')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-sm font-medium uppercase tracking-wide text-gray-900 group-hover:text-gold-600 transition-colors">Gender</span>
                        {openSections.genders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                        {openSections.genders && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-2">
                                    {filters.genders.map(gender => (
                                        <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-4 h-4 border-gray-300 rounded-sm checked:bg-black checked:border-black focus:ring-0 transition-colors" />
                                            </div>
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{gender}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Price */}
                <div className="border-b border-gray-100 pb-6">
                    <button
                        onClick={() => toggleSection('priceRanges')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-sm font-medium uppercase tracking-wide text-gray-900 group-hover:text-gold-600 transition-colors">Price</span>
                        {openSections.priceRanges ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                        {openSections.priceRanges && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-2">
                                    {filters.priceRanges.map((range, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-sm checked:bg-black checked:border-black focus:ring-0 transition-colors" />
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Brands */}
                <div className="border-b border-gray-100 pb-6">
                    <button
                        onClick={() => toggleSection('brands')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-sm font-medium uppercase tracking-wide text-gray-900 group-hover:text-gold-600 transition-colors">Brand</span>
                        {openSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                        {openSections.brands && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-2">
                                    {filters.brands.map(brand => (
                                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-sm checked:bg-black checked:border-black focus:ring-0 transition-colors" />
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Concentration */}
                <div className="pb-6">
                    <button
                        onClick={() => toggleSection('concentrations')}
                        className="flex items-center justify-between w-full mb-4 group"
                    >
                        <span className="text-sm font-medium uppercase tracking-wide text-gray-900 group-hover:text-gold-600 transition-colors">Concentration</span>
                        {openSections.concentrations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                        {openSections.concentrations && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-2">
                                    {filters.concentrations.map(conc => (
                                        <label key={conc} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-sm checked:bg-black checked:border-black focus:ring-0 transition-colors" />
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{conc}</span>
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
