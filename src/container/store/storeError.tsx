import { create } from "zustand";

type StoreError = {
    error: string | null;
    setError: (error: string) => void;
    clearError: () => void;
};

export const useStoreError = create<StoreError>((set) => ({
    error: null,
    setError: (error) => {
        set(() => ({ error: error }))
        if (error.includes('Invalid Token')) {            
            localStorage.clear();
            window.location.reload();
        }
    }, 
    clearError: () => set(() => ({ error: null })),
}));