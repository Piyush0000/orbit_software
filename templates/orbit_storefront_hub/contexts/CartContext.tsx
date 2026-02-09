'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  priceNum: number;
  quantity: number;
  image?: string | string[];
  images?: string[];
}

interface CartContextType {
  cart: CartItem[];
  cartItems: CartItem[]; // Alias for templates
  items: CartItem[]; // Compatibility with Hub-originated components
  addToCart: (product: any) => void;
  addItem: (item: any) => void; // Compatibility
  removeFromCart: (productId: string | number) => void;
  removeItem: (itemId: string) => void; // Compatibility
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalPrice: number; // Compatibility
  totalItems: number;
  getTotalPrice: () => number; // Compatibility
  getTotalItems: () => number; // Compatibility
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ 
  children, 
  subdomain 
}: { 
  children: ReactNode; 
  subdomain: string;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartStorageKey = `cart_${subdomain}`;

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(cartStorageKey);
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
          setCart([]);
        }
      }
    }
  }, [subdomain, cartStorageKey]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    }
  }, [cart, cartStorageKey]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const productId = String(product.id || product.productId);
      const existing = prev.find(item => item.productId === productId);
      
      const priceNum = product.priceNum || parseFloat(String(product.price).replace(/[^\d.]/g, '')) || 0;
      
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      
      const newItem: CartItem = {
        id: productId,
        productId: productId,
        name: product.name,
        price: priceNum,
        priceNum: priceNum,
        quantity: product.quantity || 1,
        image: Array.isArray(product.image) ? product.image : (product.image ? [product.image] : (product.images || [])),
        images: product.images || (Array.isArray(product.image) ? product.image : (product.image ? [product.image] : [])),
      };
      
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart(prev => prev.filter(item => item.productId !== String(productId)));
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.productId === String(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((total, item) => total + item.priceNum * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      cartItems: cart,
      items: cart,
      addToCart,
      addItem: addToCart,
      removeFromCart,
      removeItem: removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalPrice: subtotal,
      totalItems,
      getTotalPrice: () => subtotal,
      getTotalItems: () => totalItems
    }}>
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
