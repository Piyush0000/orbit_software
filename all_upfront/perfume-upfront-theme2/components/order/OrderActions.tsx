"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Truck } from "lucide-react";

export default function OrderActions() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mt-8">
            <button className="flex-1 bg-white border border-black text-black py-4 px-6 uppercase font-bold tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Truck className="w-4 h-4" /> Track Order
            </button>

            <Link
                href="/shop"
                className="flex-1 bg-black text-white py-4 px-6 uppercase font-bold tracking-widest hover:bg-gold-500 transition-colors flex items-center justify-center gap-2"
            >
                <ShoppingBag className="w-4 h-4" /> Continue Shopping
            </Link>
        </div>
    );
}
