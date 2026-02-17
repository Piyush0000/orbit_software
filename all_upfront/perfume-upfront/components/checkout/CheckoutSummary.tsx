"use client";

import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data"; // Keep for now if needed, or better, loop through actual items

// Mock data mirrored from CartPage


interface CheckoutSummaryProps {
    onPlaceOrder: () => void;
}

export default function CheckoutSummary({ onPlaceOrder }: CheckoutSummaryProps) {
    const { cartItems, cartTotal } = useCart();

    const subtotal = cartTotal;
    const shipping = subtotal > 5000 ? 0 : 500;
    const discount = 0;
    const total = subtotal + shipping - discount;

    return (
        <div className="bg-gray-50 p-6 sm:p-8 rounded-sm h-fit sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-6 pb-4 border-b border-gray-200 text-gray-900">Order Summary</h2>

            {/* Mini Cart List */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                        <div className="relative w-12 h-16 flex-shrink-0 bg-white">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                            />
                            <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {item.quantity}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.size}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between items-center font-serif text-lg font-bold border-t border-gray-200 pt-3 text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
            </div>

            <button
                onClick={onPlaceOrder}
                className="w-full bg-black text-white py-4 px-6 uppercase font-bold tracking-widest hover:bg-gold-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
                Place Order <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>SSL Secured Transaction</span>
            </div>
        </div>
    );
}
