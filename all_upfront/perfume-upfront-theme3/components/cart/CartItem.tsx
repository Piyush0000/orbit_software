"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/context/CartContext";


interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="flex gap-4 py-6 border-b border-[#2C2621]/10 last:border-0 hover:bg-[#EAE5D8]/30 transition-colors p-4 rounded-sm group relative">

            {/* Image */}
            <div className="relative w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-[#fffdf9] border border-[#EAE5D8] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="96px"
                />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between z-10">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="font-serif text-lg font-medium text-[#2C2621] line-clamp-2 group-hover:text-[#4A4238] transition-colors">
                            {item.name}
                        </h3>
                        <p className="text-xs text-[#8D6E63] mt-1 uppercase tracking-wide">
                            Size: {item.size}
                        </p>
                    </div>
                    <p className="font-medium text-[#2C2621] whitespace-nowrap">
                        ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                </div>

                <div className="flex justify-between items-end mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#2C2621]/20 rounded-sm bg-[#F5F1E8]">
                        <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className="p-2 text-[#5D554A] hover:text-[#2C2621] hover:bg-[#d7ccc8]/30 disabled:opacity-30 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#2C2621]">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-[#5D554A] hover:text-[#2C2621] hover:bg-[#d7ccc8]/30 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-[#8D6E63] hover:text-red-800 transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-wider"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
