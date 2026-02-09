'use client';

import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';
import { CartProvider } from '../context/CartContext';
import { CartSidebar } from '../components/cart/CartSidebar';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <WishlistProvider>
                <CartProvider>
                    {children}
                    <CartSidebar />
                </CartProvider>
            </WishlistProvider>
        </AuthProvider>
    );
}
