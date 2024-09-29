import { create } from "zustand";
import { DeviceInfo } from '@capacitor/device';

type StoreDevice = {
    device: {
        operatingSystem?: 'ios' | 'android' | 'windows' | 'mac' | 'unknown';
        platform?: 'ios' | 'android' | 'web';
    };
    setDevice: (device: DeviceInfo) => void;
};

export const storeDevice = create<StoreDevice>((set) => ({
    device: {},
    setDevice: (device: StoreDevice["device"]) => set({ device }),
}));


