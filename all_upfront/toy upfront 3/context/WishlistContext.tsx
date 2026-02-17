"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
    id: number | string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    image?: string;
    age: string;
    badge?: string | null;
    originalPrice?: number;
}

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number | string) => void;
    isInWishlist: (productId: number | string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem('wishlist');
    };

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            try {
                const parsed = JSON.parse(savedWishlist);
                if (Array.isArray(parsed)) {
                    // Filter duplicates by converting all IDs to string
                    const uniqueItems = parsed.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            String(t.id) === String(item.id)
                        ))
                    );
                    setWishlist(uniqueItems);
                }
            } catch (e) {
                console.error("Failed to parse wishlist", e);
                localStorage.removeItem('wishlist');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        setWishlist((prev) => {
            // Check if product already exists (comparing as strings)
            if (prev.some((item) => String(item.id) === String(product.id))) {
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: number | string) => {
        setWishlist((prev) => prev.filter((item) => String(item.id) !== String(productId)));
    };

    const isInWishlist = (productId: number | string) => {
        return wishlist.some((item) => String(item.id) === String(productId));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
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
