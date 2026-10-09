import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build output goes to ../backend/static so the Flask app serves the
// production bundle directly. `npm run dev` still works for development.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    fs: { allow: ['..'] },
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  build: {
    outDir: '../backend/static',
    emptyOutDir: true
  }
})
