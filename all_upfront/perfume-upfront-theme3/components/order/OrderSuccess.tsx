"use client";

import { CheckCircle, Calendar, Package } from "lucide-react";

export default function OrderSuccess() {
    // Mock Data
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days from now
    const deliveryDate = date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-[#EAE5D8] rounded-full flex items-center justify-center animate-fade-in border border-[#2C2621]/10 shadow-sm">
                    <CheckCircle className="w-12 h-12 text-[#2C2621]" strokeWidth={1} />
                </div>
            </div>

            <h1 className="font-serif text-3xl lg:text-5xl font-light mb-4 text-[#2C2621]">
                Order Placed Successfully!
            </h1>
            <p className="text-[#5D554A] mb-12 text-lg font-light">
                Thank you for your purchase. Your order has been confirmed and is being prepared with care.
            </p>

            <div className="bg-[#EAE5D8] p-6 sm:p-10 rounded-sm grid grid-cols-1 sm:grid-cols-2 gap-8 text-left border border-[#d7ccc8] mb-12 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-[#2C2621] p-3 rounded-full shadow-sm">
                        <Package className="w-6 h-6 text-[#F5F1E8]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#8D6E63] uppercase tracking-widest text-xs mb-2">Order Number</h3>
                        <p className="font-mono text-xl text-[#2C2621] font-medium tracking-wide">{orderId}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-[#2C2621] p-3 rounded-full shadow-sm">
                        <Calendar className="w-6 h-6 text-[#F5F1E8]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#8D6E63] uppercase tracking-widest text-xs mb-2">Expected Delivery</h3>
                        <p className="font-serif text-xl text-[#2C2621] font-light">{deliveryDate}</p>
                    </div>
                </div>
            </div>

            <p className="text-sm text-[#8D6E63]">
                A confirmation email has been sent to your email address with the receipt and tracking details.
            </p>
        </div>
    );
}
