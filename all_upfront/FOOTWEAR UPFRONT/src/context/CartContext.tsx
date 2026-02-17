'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string; // Unique ID for the cart item (e.g., productID + size + color)
    productId: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('cart');
            if (stored) {
                setCartItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            try {
                localStorage.setItem('cart', JSON.stringify(cartItems));
            } catch (e) {
                console.error('Failed to save cart', e);
            }
        }
    }, [cartItems, mounted]);

    const addToCart = (item: Omit<CartItem, 'id'>) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
            );

            if (existingItem) {
                return prev.map((i) =>
                    i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            } else {
                const newItem = { ...item, id: `${item.productId}-${item.size}-${item.color}` };
                return [...prev, newItem];
            }
        });
        setIsCartOpen(true); // Open drawer on add
    };

    const removeFromCart = (cartItemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(cartItemId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    // Safeguard against NaN: ensure price and quantity are valid numbers
    const cartTotal = cartItems.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + price * quantity;
    }, 0);

    const cartCount = cartItems.reduce((count, item) => count + (Number(item.quantity) || 0), 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                isCartOpen,
                openCart,
                closeCart
            }}
        >
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
