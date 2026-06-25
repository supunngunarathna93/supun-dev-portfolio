import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is '/' for Vercel (root domain). Change to '/repo-name/' only for GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
