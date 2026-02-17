"use client";

import { useState } from "react";
import { CreditCard, Wallet, Banknote, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS = [
    {
        id: "upi",
        label: "UPI",
        icon: Wallet,
        description: "Google Pay, PhonePe, Paytm, etc.",
    },
    {
        id: "card",
        label: "Credit / Debit Card",
        icon: CreditCard,
        description: "Visa, Mastercard, RuPay, Amex",
    },
    {
        id: "netbanking",
        label: "Net Banking",
        icon: Landmark,
        description: "All major banks supported",
    },
    {
        id: "cod",
        label: "Cash on Delivery",
        icon: Banknote,
        description: "Pay with cash upon delivery",
    },
];

export default function PaymentOptions() {
    const [selectedMethod, setSelectedMethod] = useState("upi");

    return (
        <div className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                <CreditCard className="w-5 h-5 text-gold-500" />
                Payment Method
            </h2>

            <div className="space-y-4">
                {PAYMENT_METHODS.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={cn(
                            "relative border rounded-sm p-4 cursor-pointer transition-all duration-300 flex items-center justify-between group",
                            selectedMethod === method.id
                                ? "border-black bg-gray-50"
                                : "border-gray-200 hover:border-gray-400"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                selectedMethod === method.id ? "bg-black text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                            )}>
                                <method.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">{method.label}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                            </div>
                        </div>

                        <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center",
                            selectedMethod === method.id ? "border-black" : "border-gray-300"
                        )}>
                            {selectedMethod === method.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-black" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Details / Form placeholder */}
            <div className="mt-6 p-4 bg-yellow-50/50 border border-yellow-100 rounded-sm text-xs text-yellow-800">
                <p className="font-medium">
                    Secure Payment: Your payment details are encrypted and secure.
                    {selectedMethod === 'cod' && " Please keep exact change handy for hassle-free delivery."}
                </p>
            </div>
        </div>
    );
}
