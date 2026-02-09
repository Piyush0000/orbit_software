'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string | number;
  name: string;
  price: string | number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (item) => {
        const { items } = get();
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] });
        }
      },
      removeFromWishlist: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
