"use client";

import Header from "@/components/Header";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();

    const handlePlaceOrder = () => {
        // Here we would handle form validation and payment processing
        // For now, redirect to success
        router.push("/order-confirmation");
    };

    return (
        <main className="min-h-screen bg-[#F5F1E8]">
            <Header />

            <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-64 pb-32 animate-fade-in">
                <h1 className="font-serif text-3xl lg:text-5xl font-light mb-12 text-center text-[#2C2621]">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <AddressForm />
                        <PaymentOptions />
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1">
                        <CheckoutSummary onPlaceOrder={handlePlaceOrder} />
                    </div>
                </div>
            </div>
        </main>
    );
}
