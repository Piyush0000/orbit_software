"use client";

import Link from "next/link";
import { ShoppingBag, Truck } from "lucide-react";

export default function OrderActions() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto mt-12">
            <button className="flex-1 bg-transparent border border-[#2C2621]/20 text-[#2C2621] py-4 px-6 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#2C2621] hover:text-[#F5F1E8] hover:border-[#2C2621] transition-all duration-300 flex items-center justify-center gap-2">
                <Truck className="w-4 h-4" /> Track Order
            </button>

            <Link
                href="/shop"
                className="flex-1 bg-[#2C2621] text-[#F5F1E8] py-4 px-6 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#4A4238] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#2C2621]/20"
            >
                <ShoppingBag className="w-4 h-4" /> Continue Shopping
            </Link>
        </div>
    );
}
