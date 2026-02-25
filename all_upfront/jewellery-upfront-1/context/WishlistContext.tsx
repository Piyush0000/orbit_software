"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/data";

interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Self-healing: Deduplicate items just in case storage got corrupted
                const uniqueItems = parsed.filter((item: Product, index: number, self: Product[]) =>
                    index === self.findIndex((t) => String(t.id) === String(item.id))
                );
                setWishlistItems(uniqueItems);
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isLoaded]);

    const addToWishlist = (product: Product) => {
        setWishlistItems((prev) => {
            if (prev.some((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Guarantee uniqueness in the exposed list, even if state somehow got duplicates
    const uniqueWishlistItems = React.useMemo(() => {
        return wishlistItems.filter((item, index, self) =>
            index === self.findIndex((t) => String(t.id) === String(item.id))
        );
    }, [wishlistItems]);

    return (
        <WishlistContext.Provider value={{ wishlistItems: uniqueWishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
