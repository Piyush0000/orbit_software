"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SortDropdown() {
    return (
        <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] bg-background border-border/50 text-foreground font-body">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="best-rated">Best Rated</SelectItem>
            </SelectContent>
        </Select>
    );
}
