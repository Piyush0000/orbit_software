'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
    wishlistItems: string[]; // Store product IDs
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<string[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('wishlist');
            if (stored) {
                setWishlistItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load wishlist from local storage', e);
        }
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        } catch (e) {
            console.error('Failed to save wishlist to local storage', e);
        }
    }, [wishlistItems]);

    const addToWishlist = (productId: string) => {
        setWishlistItems((prev) => {
            if (prev.includes(productId)) return prev;
            return [...prev, productId];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.includes(productId);
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
