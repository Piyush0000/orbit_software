"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FILTERS = [
    {
        id: "price",
        name: "Price",
        options: [
            { label: "Under ₹1,000", value: "0-1000" },
            { label: "₹1,000 - ₹5,000", value: "1000-5000" },
            { label: "₹5,000 - ₹10,000", value: "5000-10000" },
            { label: "₹10,000 - ₹50,000", value: "10000-50000" },
            { label: "Above ₹50,000", value: "50000+" },
        ],
    },
    {
        id: "material",
        name: "Material",
        options: [
            { label: "Gold", value: "gold" },
            { label: "Silver", value: "silver" },
            { label: "Rose Gold", value: "rose-gold" },
            { label: "Platinum", value: "platinum" },
            { label: "Brass", value: "brass" },
        ],
    },
    {
        id: "occasion",
        name: "Occasion",
        options: [
            { label: "Wedding", value: "wedding" },
            { label: "Engagement", value: "engagement" },
            { label: "Daily Wear", value: "daily-wear" },
            { label: "Party Wear", value: "party-wear" },
            { label: "Gifting", value: "gifting" },
        ],
    },
];

export function FilterSidebar() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const toggleFilter = (value: string) => {
        setSelectedFilters((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    return (
        <div className="w-64 flex-shrink-0 pr-8 hidden lg:block">
            <div className="pb-6 border-b border-border/50 mb-6">
                <h3 className="font-heading font-bold text-lg text-foreground">Filters</h3>
            </div>

            <Accordion type="multiple" defaultValue={["price", "material"]} className="w-full">
                {FILTERS.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="border-border/30">
                        <AccordionTrigger className="text-foreground hover:text-gold hover:no-underline">
                            {section.name}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {section.options.map((option) => (
                                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                                        <div
                                            className={cn(
                                                "w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-200",
                                                selectedFilters.includes(option.value)
                                                    ? "bg-gold border-gold text-black"
                                                    : "border-muted-foreground/50 group-hover:border-gold"
                                            )}
                                            onClick={() => toggleFilter(option.value)}
                                        >
                                            {selectedFilters.includes(option.value) && <Check className="w-3 h-3" />}
                                        </div>
                                        <span className={cn(
                                            "text-sm font-body transition-colors",
                                            selectedFilters.includes(option.value) ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"
                                        )}>
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
