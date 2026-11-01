import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The living style guide at /design-system. Built as its own pass, after the site, into the same dist folder, so the
// site's own bundles and pre-rendered pages are exactly what they would be without it.
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    rollupOptions: { input: 'design-system.html' },
  },
})
