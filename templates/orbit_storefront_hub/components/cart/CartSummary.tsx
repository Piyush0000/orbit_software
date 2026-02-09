'use client';

import { useCart } from '@/contexts/CartContext';
import CheckoutButton from '@/components/checkout/CheckoutButton';

export default function CartSummary() {
  const { items, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Your Cart</h3>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Your Cart ({getTotalItems()})</h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <CheckoutButton 
          onSuccess={(orderNumber) => {
            alert(`Order placed successfully! Order Number: ${orderNumber}`);
          }}
          onError={(error) => {
            console.error('Checkout error:', error);
          }}
        />
      </div>
    </div>
  );
}