import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mon-portefeuille-pwa/',
  plugins: [react()],
  base: "/mon-portefeuille-pwa",
})