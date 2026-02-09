"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/types/product"

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string | number) => void
    updateQuantity: (productId: string | number, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    // Load cart from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem("provision-cart")
            if (savedCart) {
                try {
                    setCart(JSON.parse(savedCart))
                } catch (e) {
                    console.error("Failed to parse cart", e)
                }
            }
        }
    }, [])

    // Save cart to localStorage on change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("provision-cart", JSON.stringify(cart))
        }
    }, [cart])

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => String(item.id) === String(product.id))
            if (existing) {
                return prev.map(item =>
                    String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 } as CartItem]
        })
    }

    const removeFromCart = (productId: string | number) => {
        setCart(prev => prev.filter(item => String(item.id) !== String(productId)))
    }

    const updateQuantity = (productId: string | number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId)
            return
        }
        setCart(prev => prev.map(item =>
            String(item.id) === String(productId) ? { ...item, quantity } : item
        ))
    }

    const clearCart = () => setCart([])

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = cart.reduce((acc, item) => acc + (item.priceNum * item.quantity), 0)

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
