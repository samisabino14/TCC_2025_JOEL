import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Permite acesso externo
    port: 5173, // Porta padrão
    strictPort: true, // Garante o uso da porta especificada
  },
  plugins: [react()],
})
