"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                            "relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border transition-all",
                            selectedImage === idx ? "border-black opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`View ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-grow aspect-[4/5] md:aspect-auto bg-gray-50 overflow-hidden group">
                {images[selectedImage] && (
                    <Image
                        src={images[selectedImage]}
                        alt="Product Main View"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
        </div>
    );
}
