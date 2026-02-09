'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useStorefront } from '@/contexts/StorefrontContext';
import { createOrder, checkInventory } from '@/lib/merchant-api';

interface CheckoutButtonProps {
  onSuccess?: (orderNumber: string) => void;
  onError?: (error: Error) => void;
}

export default function CheckoutButton({ onSuccess, onError }: CheckoutButtonProps) {
  const { items, clearCart } = useCart();
  const { storeInfo } = useStorefront();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError('Cart is empty');
      onError?.(new Error('Cart is empty'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check inventory for all items in the cart
      for (const item of items) {
        const { available } = await checkInventory(item.productId, item.quantity);
        if (!available) {
          throw new Error(`Insufficient inventory for ${item.name}`);
        }
      }

      // Prepare the order payload
      const orderPayload = {
        storeId: storeInfo?.id || '',
        customerName: 'Guest Customer', // This would typically come from user input
        customerEmail: 'guest@example.com', // This would typically come from user input
        shippingAddress: {}, // This would come from user input
        billingAddress: {}, // This would come from user input
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // Submit the order to the backend
      const result = await createOrder(orderPayload);

      // Clear the cart after successful checkout
      clearCart();

      // Extract order number from result and call success callback
      const orderNumber = (result.order as any)?.orderNumber || (result.order as any)?.id || 'Unknown';
      onSuccess?.(orderNumber);

    } catch (err: any) {
      console.error('Checkout failed:', err);
      setError(err.message || 'Checkout failed');
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className={`w-full py-3 px-6 rounded-md font-medium ${
          loading || items.length === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Processing...' : `Checkout (${items.length} items)`}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}