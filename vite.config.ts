import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Dev/demo only. Library build is done with tsup.
export default defineConfig({
  plugins: [react()],
  // Served from a GitHub Pages project site at /koi-ui/ in production.
  // Dev keeps the root base so http://localhost:5847/ works as usual.
  base: process.env.NODE_ENV === 'production' ? '/koi-ui/' : '/',
  // uncommon port to avoid clashing with other local dev servers (e.g. 5173)
  server: { port: 5847 },
  // keep demo output separate from the library build in dist/
  build: { outDir: 'demo-dist' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
