// Vite config for producing an IIFE bundle used only by the jsdom smoke test.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/tmp/dharma-iife',
    emptyOutDir: true,
    rollupOptions: {
      output: { format: 'iife' },
    },
  },
})
