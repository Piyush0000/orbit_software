import SRCheckoutButton from '@/components/SRCheckoutButton';
"use client";

import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Mock Data


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
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="font-serif text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">
                    Looks like you haven't added anything to your cart yet. Explore our luxury collection to find your signature scent.
                </p>
                <Link
                    href="/shop"
                    className="bg-black text-white py-4 px-10 uppercase font-bold tracking-widest hover:bg-gold-500 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-10 text-center text-gray-900">Your Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                            Product
                        </span>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest hidden sm:block">
                            Total
                        </span>
                    </div>

                    <div className="flex flex-col">
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemove}
                            />
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
