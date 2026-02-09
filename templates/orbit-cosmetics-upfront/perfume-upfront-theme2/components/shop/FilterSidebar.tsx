"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectedFilters {
    genders: string[];
    brands: string[];
    priceRanges: string[];
    concentrations: string[];
}

interface FilterSidebarProps {
    className?: string;
    selectedFilters: SelectedFilters;
    onFilterChange: (type: keyof SelectedFilters, value: string) => void;
    onClearAll: () => void;
    availableOptions: {
        brands: string[];
        concentrations: string[];
    };
}

export default function FilterSidebar({ 
    className = "", 
    selectedFilters, 
    onFilterChange, 
    onClearAll,
    availableOptions 
}: FilterSidebarProps) {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        genders: true,
        brands: true,
        priceRanges: true,
        concentrations: false,
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const priceRanges = [
        { label: "Under ₹3,000", value: "under-3000" },
        { label: "₹3,000 - ₹5,000", value: "3000-5000" },
        { label: "Over ₹5,000", value: "over-5000" },
    ];

    const genders = ["Men", "Women", "Unisex"];

    return (
        <aside className={cn("w-full", className)}>
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
                <h3 className="font-serif text-2xl text-gray-900 italic">Filters</h3>
                <button 
                    onClick={onClearAll}
                    className="text-[10px] text-gray-400 hover:text-gold-600 uppercase tracking-[0.2em] font-bold transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="space-y-10">
                {/* Gender */}
                <FilterSection 
                    title="Gender" 
                    isOpen={openSections.genders} 
                    onToggle={() => toggleSection('genders')}
                >
                    <div className="space-y-3">
                        {genders.map(gender => (
                            <FilterCheckbox 
                                key={gender}
                                label={gender}
                                isChecked={selectedFilters.genders.includes(gender)}
                                onChange={() => onFilterChange('genders', gender)}
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Price */}
                <FilterSection 
                    title="Price Range" 
                    isOpen={openSections.priceRanges} 
                    onToggle={() => toggleSection('priceRanges')}
                >
                    <div className="space-y-3">
                        {priceRanges.map((range) => (
                            <FilterCheckbox 
                                key={range.value}
                                label={range.label}
                                isChecked={selectedFilters.priceRanges.includes(range.value)}
                                onChange={() => onFilterChange('priceRanges', range.value)}
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Brands */}
                <FilterSection 
                    title="Designers" 
                    isOpen={openSections.brands} 
                    onToggle={() => toggleSection('brands')}
                >
                    <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                        {availableOptions.brands.map(brand => (
                            <FilterCheckbox 
                                key={brand}
                                label={brand}
                                isChecked={selectedFilters.brands.includes(brand)}
                                onChange={() => onFilterChange('brands', brand)}
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Concentration */}
                <FilterSection 
                    title="Concentration" 
                    isOpen={openSections.concentrations} 
                    onToggle={() => toggleSection('concentrations')}
                >
                    <div className="space-y-3">
                        {availableOptions.concentrations.map(conc => (
                            <FilterCheckbox 
                                key={conc}
                                label={conc}
                                isChecked={selectedFilters.concentrations.includes(conc)}
                                onChange={() => onFilterChange('concentrations', conc)}
                            />
                        ))}
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
}

function FilterSection({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) {
    return (
        <div className="border-b border-gray-50 pb-8 last:border-0">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full mb-6 group"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-900 group-hover:text-gold-600 transition-colors">{title}</span>
                {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FilterCheckbox({ label, isChecked, onChange }: { label: string, isChecked: boolean, onChange: () => void }) {
    return (
        <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex items-center justify-center">
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={onChange}
                    className="peer appearance-none w-5 h-5 border border-gray-200 rounded-lg checked:border-gold-500 checked:bg-gold-500 transition-all duration-300" 
                />
                <motion.div 
                    initial={false}
                    animate={{ scale: isChecked ? 1 : 0 }}
                    className="absolute text-white"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
            </div>
            <span className={cn(
                "text-sm tracking-tight transition-colors duration-300",
                isChecked ? "text-gray-900 font-medium" : "text-gray-500 group-hover:text-gray-900"
            )}>
                {label}
            </span>
        </label>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
