// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuracao principal do Vite para o projeto React.

export default defineConfig({
  // A propriedade 'root' não é definida pois usamos a raiz do projeto.

  
  plugins: [react()],

  // O servidor de desenvolvimento não precisa de proxy.

  // Resolve path aliases para importações
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
