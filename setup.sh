#!/usr/bin/env bash
set -e  # para o script se qualquer comando falhar

echo "==> Instalando dependências do workspace root…"
pnpm install --frozen-lockfile

echo "==> Entrando no pacote frontend…"
cd frontend

echo "==> Adicionando Vite e plugins…"
pnpm add -D vite @vitejs/plugin-react vite-tsconfig-paths

echo "==> Gerando vite.config.ts…"
cat > vite.config.ts <<'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 5173 },
})
EOF

echo "==> Garantindo scripts no package.json…"
npx json -I -f package.json -e '
  this.scripts ||= {};
  this.scripts.dev     = "vite";
  this.scripts.build   = "vite build";
  this.scripts.preview = "vite preview";
  this.scripts.lint    = "eslint \"src/**/*.{ts,tsx}\" --fix";
'

echo "==> Configurando ESLint + Prettier (se ainda não houver)…"
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-import eslint-import-resolver-typescript

cat > .eslintrc.cjs <<'EOF'
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: { react: { version: 'detect' } }
}
EOF

echo "✅  Setup concluído! Agora você pode rodar:  pnpm run dev"
