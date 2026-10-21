import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps the build working from any sub-folder or static host
export default defineConfig({ plugins: [react()], base: './' })
