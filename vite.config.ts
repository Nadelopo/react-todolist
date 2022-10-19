import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgLoader from 'vite-svg-loader'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,tsx}"',
      },
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
