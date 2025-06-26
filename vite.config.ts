// /frontend/vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Este arquivo agora vive dentro da pasta /frontend.
// As configurações são mais simples porque os caminhos são relativos a este local.

export default defineConfig({
  // A propriedade 'root' foi REMOVIDA. 
  // O Vite assume, por padrão, a raiz como o diretório atual ('/frontend'), que agora é o correto.

  
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

  // A configuração do alias de caminho agora é muito mais simples.
  resolve: {
    alias: {
      // Como __dirname agora aponta para /frontend, o caminho para a pasta 'src' está correto e mais limpo.
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
