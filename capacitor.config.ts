import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zumbat.misterbolletta',
  appName: 'Bucket list',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'undefined',
      keystoreAlias: 'undefined',
    }
  },
  plugins: {
    CapacitorUpdater: {
      appReadyTimeout: 1000,
      responseTimeout: 10,
      autoDeleteFailed: true,
      autoDeletePrevious: false,
      autoUpdate: false,
      resetWhenUpdate: false,
      allowModifyUrl: true,
      directUpdate: true
    }
  }
};
export default config;
