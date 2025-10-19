import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {allowedHosts: true},
  base: '/',
  define: {
    __APP_NAME__: JSON.stringify('MovieHub'),
  },
})
