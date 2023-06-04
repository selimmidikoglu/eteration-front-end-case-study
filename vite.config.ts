/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/dist/config.js'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
})