"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/products";

export type CartItem = {
    productId: string;
    variantId?: string;
    quantity: number;
    product: Product;
    // Helper helper properties for easy access
    name: string;
    price: number;
    image: string;
    variantName?: string;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product, variantId?: string, quantity?: number) => void;
    removeFromCart: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Hydrate cart from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const storedCart = localStorage.getItem("beauty-cart");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cart from local storage", error);
            }
        }
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("beauty-cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isMounted]);

    const addToCart = (product: Product, variantId?: string, quantity: number = 1) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                (item) => item.productId === product.id && item.variantId === variantId
            );

            // Determine price and variant name
            let price = product.price;
            let variantName = undefined;

            if (variantId && product.variants) {
                const variant = product.variants.find((v) => v.id === variantId);
                if (variant) {
                    price = variant.price;
                    variantName = variant.name;
                }
            }

            if (existingItemIndex > -1) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                return [
                    ...prev,
                    {
                        productId: product.id,
                        variantId,
                        quantity,
                        product,
                        name: product.name,
                        price,
                        image: product.image,
                        variantName,
                    },
                ];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string, variantId?: string) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item.productId === productId && item.variantId === variantId))
        );
    };

    const updateQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId, variantId);
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId && item.variantId === variantId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
