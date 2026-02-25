"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
    images: {
        main: string;
        hover?: string;
        gallery?: string[];
    };
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const allImages = [images.main, ...(images.gallery || [])].filter(Boolean);
    const [selectedImage, setSelectedImage] = useState(allImages[0]);
    const [isZoomed, setIsZoomed] = useState(false);

    // Simple zoom effect: tracking mouse (for demo we might just upscale on hover or click)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
                {allImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={cn(
                            "relative w-20 h-20 md:w-full md:h-24 flex-shrink-0 border transition-all rounded-sm overflow-hidden",
                            selectedImage === img ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                    >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div
                className="relative flex-1 bg-secondary/10 rounded-sm overflow-hidden aspect-square md:aspect-[4/5] cursor-zoom-in group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={selectedImage}
                    alt="Product Image"
                    fill
                    className={cn(
                        "object-cover transition-transform duration-200",
                        isZoomed ? "scale-150" : "scale-100"
                    )}
                    style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
                    priority
                />
                <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full md:hidden">
                    <ZoomIn className="w-5 h-5 text-black" />
                </div>
            </div>
        </div>
    );
}
