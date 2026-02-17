"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartItem as CartItemType } from "@/context/CartContext";


interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors p-2 rounded-sm">
            {/* Image */}
            <div className="relative w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-gray-50">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="font-serif text-lg font-medium text-gray-900 line-clamp-2">
                            {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">
                            Size: {item.size}
                        </p>
                    </div>
                    <p className="font-medium text-gray-900 whitespace-nowrap">
                        ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                </div>

                <div className="flex justify-between items-end mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-sm">
                        <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-wider"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
