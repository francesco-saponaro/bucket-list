import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import svgr from "vite-plugin-svgr";
delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];
const packageJson = require('./package.json');
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react(),
      legacy(),
      svgr({
        include: '**/*.svg'
      }),
    ],
    define: {
      ...Object.keys(env).reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(env[key]);
        return acc;
      }, {}),
      'process.env.VERSION': JSON.stringify(packageJson.version),
    },
    resolve: {
      "alias": {
        '@hooks': fileURLToPath(new URL('./src/container/hooks', import.meta.url)),
        '@common': fileURLToPath(new URL('./src/container/common', import.meta.url)),
        '@core': fileURLToPath(new URL('./src/container/core', import.meta.url)),
        '@container': fileURLToPath(new URL('./src/container/core', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/container/store', import.meta.url)),
        '@constants': fileURLToPath(new URL('./src/container/constants', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@assets': fileURLToPath(new URL('./public/assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/entries', import.meta.url)),
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})