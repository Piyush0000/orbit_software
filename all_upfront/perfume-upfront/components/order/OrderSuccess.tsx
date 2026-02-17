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
            <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-fade-in">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Order Placed Successfully!
            </h1>
            <p className="text-gray-500 mb-10">
                Thank you for your purchase. Your order has been confirmed and is being prepared with care.
            </p>

            <div className="bg-gray-50 p-6 sm:p-8 rounded-sm grid grid-cols-1 sm:grid-cols-2 gap-8 text-left border border-gray-100 mb-10">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                        <Package className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-1">Order Number</h3>
                        <p className="font-mono text-lg text-black font-semibold">{orderId}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                        <Calendar className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-1">Expected Delivery</h3>
                        <p className="font-serif text-lg text-black font-semibold">{deliveryDate}</p>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                A confirmation email has been sent to your email address with the receipt and tracking details.
            </p>
        </div>
    );
}
