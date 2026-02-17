"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    discount: number;
    onCheckout: () => void;
}

export default function CartSummary({ subtotal, shipping, discount, onCheckout }: CartSummaryProps) {
    const total = subtotal + shipping - discount;

    return (
        <div className="bg-[#EAE5D8] p-6 sm:p-8 rounded-sm h-fit sticky top-24 border border-[#d7ccc8] shadow-sm">
            <h2 className="font-serif text-xl font-medium mb-6 pb-4 border-b border-[#2C2621]/10 text-[#2C2621]">Order Summary</h2>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between text-[#5D554A]">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5D554A]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-[#4A4238]">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                    </div>
                )}

                <div className="pt-4 mt-4 border-t border-[#2C2621]/10 flex justify-between items-center font-serif text-xl text-[#2C2621] font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
            </div>

            <p className="text-xs text-[#8D6E63] mt-4 mb-8">
                Shipping & taxes calculated at checkout
            </p>

            <div className="space-y-4">
                <button
                    onClick={onCheckout}
                    className="w-full bg-[#2C2621] text-[#F5F1E8] py-4 px-6 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#4A4238] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#2C2621]/20 hover:shadow-[#2C2621]/30"
                >
                    Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                    href="/shop"
                    className="w-full bg-transparent border border-[#2C2621]/20 text-[#2C2621] py-4 px-6 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#F5F1E8] hover:border-[#2C2621]/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}
