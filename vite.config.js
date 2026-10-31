import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths so the site works from any sub-path, e.g. a GitHub Pages project site.
  base: './',
  plugins: [react(), tailwindcss()],
})
