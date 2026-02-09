'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/product';
import { parseINRToNumber } from '@/lib/utils';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  clearCart: () => void;
  // Promo Code
  discount: number;
  promoCode: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount and fix any incorrect priceNum values
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Fix any items with incorrect priceNum by re-parsing from price string
        const fixedCart = parsedCart.map((item: CartItem) => {
          const correctPriceNum = parseINRToNumber(item.price);
          // If priceNum seems incorrect (too small compared to price string), fix it
          if (item.priceNum < correctPriceNum * 0.1) {
            return { ...item, priceNum: correctPriceNum };
          }
          return item;
        });
        // eslint-disable-next-line
        setCartItems(fixedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        // If item exists, update quantity (max 5)
        const newQuantity = Math.min(existingItem.quantity + quantity, 5);
        return prev.map((cartItem) =>
          (cartItem.id === item.id && cartItem.size === item.size)
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      } else {
        // If item doesn't exist, add it
        return [...prev, { ...item, quantity: Math.min(quantity, 5) }];
      }
    });
  };

  const removeFromCart = (id: number, size?: string) => {
    setCartItems((prev) => prev.filter((item) => {
      if (size) {
        return !(item.id === id && item.size === size);
      }
      return item.id !== id;
    }));
  };

  const updateQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }
    if (quantity > 5) {
      quantity = 5;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (size) {
          return (item.id === id && item.size === size) ? { ...item, quantity } : item;
        }
        return item.id === id ? { ...item, quantity } : item;
      })
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.priceNum * item.quantity), 0);
  };

  // Promo Code State
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const applyPromoCode = (code: string): boolean => {
    // Mock Validation Logic
    const validCodes: Record<string, number> = {
      'SAVE10': 0.10,
      'WELCOME20': 0.20,
      'ORBIT50': 0.50
    };

    if (validCodes[code.toUpperCase()]) {
      setPromoCode(code.toUpperCase());
      setDiscount(validCodes[code.toUpperCase()]);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscount(0);
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
    setDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getSubtotal,
        clearCart,
        discount,
        promoCode,
        applyPromoCode,
        removePromoCode
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

