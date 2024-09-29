import { create } from 'zustand';

export type User = {
    email: string | null;
    uid: string;
};

export type authState = {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<authState>((set, get) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
}));

