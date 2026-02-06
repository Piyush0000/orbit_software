'use client';

import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import { StoreProvider } from '@/contexts/StoreContext';
import { CartSidebar } from '@/components/cart/CartSidebar';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <StoreProvider>
                <WishlistProvider>
                    <CartProvider>
                        {children}
                        <CartSidebar />
                    </CartProvider>
                </WishlistProvider>
            </StoreProvider>
        </AuthProvider>
    );
}
