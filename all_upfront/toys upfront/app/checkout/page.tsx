"use client";

import { ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold font-display text-gray-900 mb-8 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                                Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                    <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Zip Code</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                                Payment Method
                            </h2>

                            <div className="space-y-3">
                                <label className="flex items-center gap-4 p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer transition-all">
                                    <input type="radio" name="payment" className="w-5 h-5 text-primary focus:ring-primary" defaultChecked />
                                    <span className="font-bold text-gray-900">Credit / Debit Card</span>
                                    <div className="ml-auto flex gap-2">
                                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all">
                                    <input type="radio" name="payment" className="w-5 h-5 text-primary focus:ring-primary" />
                                    <span className="font-bold text-gray-900">PayPal</span>
                                </label>
                                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all">
                                    <input type="radio" name="payment" className="w-5 h-5 text-primary focus:ring-primary" />
                                    <span className="font-bold text-gray-900">Apple Pay</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="font-bold text-gray-900 text-lg mb-4">Your Order</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/api/placeholder/100/100" alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Smart Robot Builder Kit</h4>
                                        <p className="text-xs text-gray-500">Qty: 1</p>
                                        <div className="font-bold text-gray-900">₹5,499</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">₹5,499</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                                    <span>Total</span>
                                    <span className="text-primary">$34.99</span>
                                </div>
                            </div>

                            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200">
                                Place Order
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                                <ShieldCheck className="w-4 h-4" />
                                <span>SSL Encrypted Transaction</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
