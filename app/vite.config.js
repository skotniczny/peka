import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { BASENAME } from './src/common/data'

// https://vite.dev/config/
export default defineConfig({
  base: BASENAME,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    reporters: ['verbose'],
    setupFiles: './src/test-setup.js'
  }
})
