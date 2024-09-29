import { create } from "zustand";

type StoreLoader = {
    loader: number;
    isQuery: boolean;
    setLoaderQuery: (isQuery: boolean) => void;
    startLoader: () => void;
    stopLoader: () => void;

};

export const useStoreLoader = create<StoreLoader>((set) => ({
    loader: 0,
    isQuery: false,
    setLoaderQuery: (isQuery: boolean) => set({ isQuery }),
    startLoader: () => set((state) => ({ loader: state.loader + 1 })),
    stopLoader: () => set((state) => ({ loader: state.loader > 0 ? state.loader - 1 : 0 })),
}));