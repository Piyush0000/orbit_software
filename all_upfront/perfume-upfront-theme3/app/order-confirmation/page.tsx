"use client";

import Header from "@/components/Header";
import OrderSuccess from "@/components/order/OrderSuccess";
import OrderActions from "@/components/order/OrderActions";

export default function OrderConfirmationPage() {
    return (
        <main className="min-h-screen bg-[#F5F1E8]">
            <Header />
            <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-64 pb-24 animate-fade-in">
                <OrderSuccess />
                <OrderActions />
            </div>
        </main>
    );
}
