import SRCheckoutButton from '@/components/SRCheckoutButton';
"use client";

import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPageContent() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        updateQuantity(id, newQuantity);
    };

    const handleRemove = (id: string) => {
        removeFromCart(id);
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };

    const subtotal = cartTotal;
    const shipping = subtotal > 5000 ? 0 : 500; // Free shipping above 5000
    const discount = 0; // Placeholder for promo code

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-[#EAE5D8] flex items-center justify-center mb-8 border border-[#d7ccc8] shadow-sm">
                    <ShoppingBag className="w-10 h-10 text-[#5D554A]" />
                </div>
                <h2 className="font-serif text-4xl font-light mb-4 text-[#2C2621]">Your Cart is Empty</h2>
                <p className="text-[#5D554A] mb-10 max-w-md font-light text-lg">
                    Looks like you haven't added anything to your cart yet. Explore our luxury collection to find your signature scent.
                </p>
                <Link
                    href="/shop"
                    className="bg-[#2C2621] text-[#F5F1E8] py-4 px-10 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#4A4238] transition-all shadow-lg shadow-[#2C2621]/20"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20 pt-32 lg:pt-64 animate-fade-in">
            <h1 className="font-serif text-3xl lg:text-5xl font-light mb-12 text-center text-[#2C2621]">Your Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex justify-between items-center pb-4 border-b border-[#2C2621]/10 mb-4">
                        <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-[0.2em]">
                            Product
                        </span>
                        <span className="text-xs font-bold text-[#8D6E63] uppercase tracking-[0.2em] hidden sm:block">
                            Total
                        </span>
                    </div>

                    <div className="flex flex-col gap-6">
                        {cartItems.map((item, index) => (
                            <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <CartItem
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemove}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <CartSummary
                        subtotal={subtotal}
                        shipping={shipping}
                        discount={discount}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    );
}
