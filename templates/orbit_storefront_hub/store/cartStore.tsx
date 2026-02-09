'use client';

import { useCart as useHubCart } from '@/contexts/CartContext';

export function useCart() {
  const hubCart = useHubCart();
  
  // Bridge Hub context to what templates expect
  return {
    ...hubCart,
    cartItems: hubCart.cart,
    getSubtotal: () => hubCart.subtotal,
  };
}
