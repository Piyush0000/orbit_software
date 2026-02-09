"use client";

import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CheckoutSummaryProps {
    onPlaceOrder: () => void;
}

export default function CheckoutSummary({ onPlaceOrder }: CheckoutSummaryProps) {
    const { cartItems, cartTotal } = useCart();

    const subtotal = cartTotal;
    const shipping = subtotal > 5000 ? 0 : 500;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const formatPrice = (num: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    };

    return (
        <div className="bg-gray-50 p-6 sm:p-8 rounded-3xl h-fit sticky top-24 border border-gray-100 shadow-sm">
            <h2 className="font-serif text-2xl font-light italic mb-8 pb-4 border-b border-gray-200 text-gray-900 uppercase tracking-widest">Order Summary</h2>

            {/* Mini Cart List */}
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-16 h-20 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-100">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                            <div className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                                {item.quantity}
                            </div>
                        </div>
                        <div className="flex-1 py-1">
                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 uppercase tracking-wider">{item.name}</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{item.size}</p>
                            <p className="text-sm font-bold text-gray-900 mt-2">{formatPrice((item.priceNum || 0) * item.quantity)}</p>
                        </div>
                    </div>
                ))}
                {cartItems.length === 0 && (
                    <p className="text-center text-gray-400 font-light italic py-8">Your bag is currently empty.</p>
                )}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : "text-gray-900"}>
                        {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                    </span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-green-600">
                        <span>Savings</span>
                        <span>-{formatPrice(discount)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center font-serif text-2xl border-t border-gray-200 pt-5 text-gray-900">
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">Total</span>
                    <span className="font-bold">{formatPrice(total)}</span>
                </div>
            </div>

            <button
                onClick={onPlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-black text-white py-5 rounded-full uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-gold-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Secure Purchase <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 opacity-60">
                <Lock className="w-3 h-3" />
                <span>Encrypted Connection</span>
            </div>
        </div>
    );
}
