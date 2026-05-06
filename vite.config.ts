import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: false,
  },
  server: {
    middlewareMode: false,
  }
})
