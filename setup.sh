#!/bin/bash

echo "🛠️  Iniciando configuração do ambiente TrakNor..."

################################################################################
# 1. pnpm
################################################################################
if ! command -v pnpm &> /dev/null; then
  echo "🚫 pnpm não encontrado. Instalando..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi
echo "✅ pnpm disponível: $(pnpm -v)"

################################################################################
# 2. Instala todas as dependências do monorepo
################################################################################
echo "📦 Instalando dependências (root/workspace)..."
pnpm install

################################################################################
# 3. Acessa o diretório frontend (sub-package)
################################################################################
cd frontend || { echo "❌ Diretório 'frontend' não encontrado"; exit 1; }

################################################################################
# 4. Garante Vite
################################################################################
if ! pnpm list vite &> /dev/null; then
  echo "➕ Instalando Vite..."
  pnpm add -D vite
fi

################################################################################
# 5. Garante @tanstack/react-query (dependência reportada como ausente)
################################################################################
if ! pnpm list @tanstack/react-query &> /dev/null; then
  echo "➕ Instalando dependência ausente @tanstack/react-query..."
  pnpm add @tanstack/react-query
fi

################################################################################
# 6. Cria script dev se não existir
################################################################################
if ! grep -q '"dev"' package.json; then
  echo "🚀 Adicionando script \"dev\" ao package.json..."
  npx json -I -f package.json -e 'this.scripts ??={}; this.scripts.dev="vite"'
fi

################################################################################
# 7. tsconfig e ESLint básicos (para não travar build)
################################################################################
echo "🔍 Conferindo tsconfig / eslint..."
if [ ! -f "tsconfig.json" ]; then
  echo "⚠️  tsconfig.json não encontrado – criando configuração mínima..."
  npx tsc --init --rootDir src --module ESNext --target ESNext --jsx react-jsx
fi

if [ ! -f ".eslintrc.cjs" ]; then
  echo "⚠️  .eslintrc.cjs não encontrado – gerando arquivo base..."
  cat <<'EOF' > .eslintrc.cjs
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json", tsconfigRootDir: __dirname },
  extends: [
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "react-hooks"],
  rules: { "react/react-in-jsx-scope": "off" },
  settings: { react: { version: "detect" } }
};
EOF
fi

################################################################################
# 8. Sobe o servidor de desenvolvimento
################################################################################
echo "🚀 Iniciando Vite (pnpm run dev)..."
pnpm run dev
