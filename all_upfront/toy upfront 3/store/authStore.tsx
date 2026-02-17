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
                    user: { name: 'Parent', email },
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
            name: 'toy-store-3-auth',
        }
    )
);
