import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy cho DSpace REST API
      '/rest': {
        target: 'https://lib.hpu.edu.vn',
        changeOrigin: true,
        secure: false,
        // Giữ nguyên path /rest
        rewrite: (path) => path
      }
    }
  }
})
