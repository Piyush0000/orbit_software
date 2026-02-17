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
        <div className="bg-gray-50 p-6 sm:p-8 rounded-sm h-fit sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-6 pb-4 border-b border-gray-200 text-gray-900">Order Summary</h2>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                    </div>
                )}

                <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center font-serif text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 mb-6">
                Shipping & taxes calculated at checkout
            </p>

            <div className="space-y-3">
                <button
                    onClick={onCheckout}
                    className="w-full bg-black text-white py-4 px-6 uppercase font-bold tracking-widest hover:bg-gold-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                    href="/shop"
                    className="w-full bg-white border border-black text-black py-4 px-6 uppercase font-bold tracking-widest hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-xs"
                >
                    <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}
