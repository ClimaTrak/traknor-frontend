// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuracao principal do Vite para o projeto React.

export default defineConfig({
  // A propriedade 'root' não é definida pois usamos a raiz do projeto.

  
  plugins: [react()],

  // A configuração do 'server' continua a mesma para o ambiente de desenvolvimento.
  server: {
    proxy: {
      '/api': {
        // O alvo do proxy para o backend.
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false, // Útil para ambientes de dev com certificados auto-assinados.
      },
    },
  },

  // Resolve path aliases para importações
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
