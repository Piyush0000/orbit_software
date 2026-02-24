'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

interface SRCheckoutButtonProps {
  cartItems: any[];
  totalAmount: number;
  storeName?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export default function SRCheckoutButton({ 
  cartItems, 
  totalAmount, 
  storeName = 'Orbit Store',
  className = '',
  label = 'Proceed to Checkout',
  disabled = false 
}: SRCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/checkout/config`)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load checkout config', err));
  }, []);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading || !sdkLoaded) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/checkout/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cartItems.map(item => ({
            id: item.productId || item.id || 'item',
            name: item.name || item.product?.name,
            price: item.price || item.product?.price,
            quantity: item.quantity,
            image: item.image || item.product?.image || ''
          })),
          store_name: storeName,
          redirect_url: `${window.location.origin}/order-confirm`
        })
      });

      const { token } = await response.json();

      if (!token) throw new Error('Failed to get checkout token');

      if ((window as any).HeadlessCheckout) {
        (window as any).HeadlessCheckout.addToCart(e.nativeEvent, token);
      } else {
        alert('Checkout SDK not ready. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      // alert('Failed to initiate checkout. Please try again.');
        if ((window as any).HeadlessCheckout && token) {
             (window as any).HeadlessCheckout.addToCart(e.nativeEvent, token);
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {config && (
        <>
          <link rel="stylesheet" href={config.sdkCss} />
          <Script 
            src={config.sdkJs} 
            onLoad={() => setSdkLoaded(true)}
          />
        </>
      )}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || loading}
        className={className}
      >
        {loading ? "Processing..." : label}
      </button>
    </>
  );
}
