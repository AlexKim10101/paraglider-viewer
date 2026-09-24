import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vitest/config'

// Cesium грузит воркеры, ассеты и стили виджетов в рантайме по CESIUM_BASE_URL.
const CESIUM_BASE_URL = 'cesium'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/Cesium/{Workers,ThirdParty,Assets,Widgets}',
          dest: CESIUM_BASE_URL,
          rename: { stripBase: 4 },
        },
      ],
    }),
  ],
  define: {
    CESIUM_BASE_URL: JSON.stringify(`/${CESIUM_BASE_URL}`),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    passWithNoTests: true,
  },
})
