"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold font-display text-gray-900 mb-8">Your Cart 🛒</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 space-y-6">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`/images/toy-${item}.png`} alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">Smart Robot Builder Kit</h3>
                                                <p className="text-sm text-gray-500">Age: 8+ Years</p>
                                            </div>
                                            <button className="text-red-500 hover:text-red-600 transition-colors p-1">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                <button className="px-3 py-1 hover:bg-gray-50 transition-colors text-gray-600">-</button>
                                                <span className="w-8 text-center text-sm font-bold text-gray-900">1</span>
                                                <button className="px-3 py-1 hover:bg-gray-50 transition-colors text-gray-600">+</button>
                                            </div>
                                            <span className="font-bold text-gray-900 text-lg">₹2,499</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 flex justify-between items-center">
                            <Link href="/category/all" className="text-gray-600 font-medium hover:text-gray-900 hover:underline">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="font-bold text-gray-900 text-xl mb-6">Order Summary</h2>

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">₹5,499</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="font-bold text-gray-900">₹450</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-primary">₹5,949</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <div className="mt-4 flex justify-center gap-4 text-gray-400">
                                {/* Icons would go here */}
                                <span className="text-xs">🔒 Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
