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
        <div className="bg-[#EAE5D8] p-6 sm:p-8 rounded-sm shadow-sm border border-[#d7ccc8]">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2 text-[#2C2621]">
                <CreditCard className="w-5 h-5 text-[#8D6E63]" />
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
                                ? "border-[#2C2621] bg-[#F5F1E8]"
                                : "border-[#2C2621]/20 hover:border-[#2C2621]/60 hover:bg-[#F5F1E8]/50"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                selectedMethod === method.id ? "bg-[#2C2621] text-[#F5F1E8]" : "bg-[#2C2621]/5 text-[#5D554A] group-hover:bg-[#2C2621] group-hover:text-[#F5F1E8]"
                            )}>
                                <method.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-[#2C2621]">{method.label}</h3>
                                <p className="text-xs text-[#5D554A]/80 mt-0.5">{method.description}</p>
                            </div>
                        </div>

                        <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center",
                            selectedMethod === method.id ? "border-[#2C2621]" : "border-[#2C2621]/30"
                        )}>
                            {selectedMethod === method.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#2C2621]" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Details / Form placeholder */}
            <div className="mt-6 p-4 bg-[#F5F1E8] border border-[#d7ccc8] rounded-sm text-xs text-[#5D554A]">
                <p className="font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Secure Payment: Your payment details are encrypted and secure.
                    {selectedMethod === 'cod' && " Please keep exact change handy for hassle-free delivery."}
                </p>
            </div>
        </div>
    );
}
