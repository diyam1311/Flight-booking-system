import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export default defineConfig({
  plugins: [react()],
  cacheDir: join(tmpdir(), 'mobiyantra-vite'),
  server: {
    proxy: {
      '/api': {
        target: 'https://travel-booking-backend-8bzz.onrender.com',
        changeOrigin: true,
        secure: true,
        configure(proxy) {
          proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'))
        },
      },
    },
  },
  resolve: {
    // lets you write  import x from '@/features/auth'  instead of '../../../features/auth'
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
