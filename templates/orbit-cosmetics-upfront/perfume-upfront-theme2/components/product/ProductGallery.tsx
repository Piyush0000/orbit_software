"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col-reverse md:flex-row gap-8">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 custom-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                            "relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 border-2",
                            selectedImage === idx 
                                ? "border-gold-500 scale-105 shadow-xl ring-4 ring-gold-50" 
                                : "border-transparent grayscale hover:grayscale-0 hover:scale-105 opacity-60 hover:opacity-100"
                        )}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img}
                            alt={`View ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-grow aspect-[4/5] bg-[#faf9f6] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-gray-100">
                {images[selectedImage] && (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={images[selectedImage]}
                            alt="Product Main View"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </>
                )}
            </div>
        </div>
    );
}
