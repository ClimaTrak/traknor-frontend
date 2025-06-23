#!/bin/bash
echo "🛠️  Iniciando configuração do ambiente TrakNor..."

###############################################################################
# 1. pnpm
###############################################################################
if ! command -v pnpm &>/dev/null; then
  echo "🚫 pnpm não encontrado. Instalando..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi
echo "✅ pnpm disponível: $(pnpm -v)"

###############################################################################
# 2. Instala dependências do monorepo
###############################################################################
echo "📦 Instalando dependências (root/workspace)..."
pnpm install --registry="${NPM_REGISTRY:-https://registry.npmmirror.com}"

###############################################################################
# 3. Garante @tanstack/react-query para todo o workspace
###############################################################################
if ! pnpm list -w --depth -1 @tanstack/react-query &>/dev/null; then
  echo "➕ Instalando @tanstack/react-query (workspace)..."
  pnpm add -w @tanstack/react-query
fi

###############################################################################
# 4. Entra em frontend/
###############################################################################
cd frontend || { echo "❌ Diretório 'frontend' não encontrado"; exit 1; }

###############################################################################
# 5. Garante Vite
###############################################################################
if ! pnpm list vite &>/dev/null; then
  echo "➕ Instalando Vite..."
  pnpm add -D vite
fi

###############################################################################
# 6. Cria script dev se não existir
###############################################################################
if ! grep -q '"dev"' package.json; then
  echo "🚀 Adicionando script \"dev\" ao package.json..."
  npx json -I -f package.json -e 'this.scripts ??={}; this.scripts.dev="vite"'
fi

###############################################################################
# 7. tsconfig / ESLint mínimos
###############################################################################
echo "🔍 Conferindo tsconfig / eslint..."
if [ ! -f "tsconfig.json" ]; then
  echo "⚠️  tsconfig.json ausente – criando..."
  npx tsc --init --rootDir src --module ESNext --target ESNext --jsx react-jsx
fi

if [ ! -f ".eslintrc.cjs" ]; then
  echo "⚠️  .eslintrc.cjs ausente – gerando base..."
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

###############################################################################
# 8. Sobe o servidor
###############################################################################
echo "🚀 Iniciando Vite (pnpm run dev)..."
pnpm run dev
