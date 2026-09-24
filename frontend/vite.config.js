import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Vrittara mounts this UI behind its authenticated /simulation route. Keeping
  // the base configurable lets the standalone upstream app keep working too.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@locales': path.resolve(__dirname, '../locales')
    }
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT || 3000),
    open: false,
    // The browser reaches Vite through Vrittara's authenticated gateway. Vite
    // validates that private Railway host before accepting the forwarded request.
    allowedHosts: ['mirofish-secure.railway.internal'],
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
