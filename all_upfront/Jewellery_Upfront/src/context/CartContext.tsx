"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    sku?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    cartCount: number;
    cartTotal: number;
    isGiftWrapped: boolean;
    toggleGiftWrap: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isGiftWrapped, setIsGiftWrapped] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('jewellery_cart');
        const savedGiftWrap = localStorage.getItem('jewellery_gift_wrap');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        if (savedGiftWrap) {
            setIsGiftWrapped(JSON.parse(savedGiftWrap));
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('jewellery_cart', JSON.stringify(cart));
            localStorage.setItem('jewellery_gift_wrap', JSON.stringify(isGiftWrapped));
        }
    }, [cart, isGiftWrapped, isLoaded]);

    const addToCart = (newItem: CartItem) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === newItem.id && item.color === newItem.color
            );

            if (existingItemIndex > -1) {
                // Update quantity if already exists
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += newItem.quantity;
                return updatedCart;
            } else {
                return [...prevCart, newItem];
            }
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        setCart((prev) =>
            prev.map(item =>
                item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const toggleGiftWrap = () => {
        setIsGiftWrapped(prev => !prev);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isGiftWrapped, toggleGiftWrap }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
