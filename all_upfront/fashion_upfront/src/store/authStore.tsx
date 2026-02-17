'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    register: (name: string, email: string) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (email: string) =>
                set({
                    user: { name: 'User', email }, // Mock user data
                    isAuthenticated: true,
                }),
            register: (name: string, email: string) =>
                set({
                    user: { name, email },
                    isAuthenticated: true,
                }),
            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
        }
    )
);
