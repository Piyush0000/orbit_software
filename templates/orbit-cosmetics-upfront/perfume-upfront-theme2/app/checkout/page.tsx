"use client";

import Header from "@/components/Header";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useStorefront } from "@/context/StorefrontContext";
import { createOrder } from "@/lib/storefront-api";

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { store } = useStorefront();

    const getValue = (id: string) =>
        (typeof document !== "undefined" && (document.getElementById(id) as HTMLInputElement | null)?.value) || "";

    const handlePlaceOrder = async () => {
        const fullName = getValue("fullName");
        const phone = getValue("phone");
        const pincode = getValue("pincode");
        const city = getValue("city");
        const state = getValue("state");
        const address = getValue("address");
        const email = getValue("email");

        if (!fullName || !phone || !pincode || !city || !state || !address || !email) {
            alert("Please fill in all required fields to place your order.");
            return;
        }
        if (!store?.id) {
            alert("Store not resolved. Please try again.");
            return;
        }

        const payload = {
            storeId: store.id,
            customerName: fullName,
            customerEmail: email,
            shippingAddress: { name: fullName, phone, address, city, state, zip: pincode },
            billingAddress: { name: fullName, phone, address, city, state, zip: pincode },
            tax: 0,
            shipping: 0,
            items: cartItems.map((item) => ({
                productId: String(item.id),
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                variantInfo: undefined
            }))
        };

        try {
            const { order } = await createOrder(payload);
            clearCart();
            router.push(`/order-confirmation?order=${order.orderNumber}`);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to place order");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="container mx-auto px-4 lg:px-8 py-12">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-10 text-center text-gray-900">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
