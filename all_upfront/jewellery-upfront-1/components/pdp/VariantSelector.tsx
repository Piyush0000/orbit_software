"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const SIZES = ["6", "7", "8", "9", "10", "11"];

export function VariantSelector() {
    const [selectedSize, setSelectedSize] = useState("7");

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Ring Size</span>
                <button className="text-xs text-gold underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                            "w-10 h-10 border rounded-full flex items-center justify-center text-sm transition-all",
                            selectedSize === size
                                ? "border-gold bg-gold text-black font-bold"
                                : "border-border text-foreground hover:border-gold"
                        )}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
