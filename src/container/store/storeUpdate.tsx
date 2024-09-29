import { create } from "zustand";

type StoreUpdate = {
    isDownloading: boolean;
    setIsDownloading: (isDownloading: boolean) => void;
    percentage: number;
    setPercentage: (percentage: number) => void;
    version: string;
    setVersion: (version: string) => void;
};

export const useStoreUpdate = create<StoreUpdate>((set) => ({
    isDownloading: false,
    setIsDownloading: (isDownloading) => set(() => ({ isDownloading: isDownloading })),
    percentage: 0,
    setPercentage: (percentage) => set(() => ({ percentage: percentage })),
    version: process.env.VERSION || '1.0.0',
    setVersion: (version) => set(() => ({ version: version })),

}));    