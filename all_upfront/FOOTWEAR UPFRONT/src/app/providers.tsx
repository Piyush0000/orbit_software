'use client';

import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';
import { CartProvider } from '../context/CartContext';
import { StoreProvider } from '../context/store-context';
import { CartSidebar } from '../components/cart/CartSidebar';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AuthProvider>
                <WishlistProvider>
                    <CartProvider>
                        {children}
                        <CartSidebar />
                    </CartProvider>
                </WishlistProvider>
            </AuthProvider>
        </StoreProvider>
    );
}
