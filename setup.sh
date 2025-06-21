#!/bin/bash

echo "🛠️  Iniciando configuração do ambiente TrakNor..."

################################################################################
# 1. Verifica se pnpm está instalado
################################################################################
if ! command -v pnpm &> /dev/null; then
  echo "🚫 pnpm não encontrado. Instalando..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi

echo "✅ pnpm disponível: $(pnpm -v)"

################################################################################
# 2. Instala TODAS as dependências do monorepo
################################################################################
echo "📦 Instalando dependências..."
pnpm install

################################################################################
# 3. Garante que @tanstack/react-query esteja instalado (root/workspace)
################################################################################
if ! pnpm -w list @tanstack/react-query &> /dev/null; then
  echo "➕ Instalando dependência ausente @tanstack/react-query..."
  pnpm add -w @tanstack/react-query
fi

################################################################################
# 4. Acessa o diretório do frontend
################################################################################
cd frontend || exit 1

################################################################################
# 5. Garante que Vite esteja instalado
################################################################################
if ! pnpm list vite &> /dev/null; then
  echo "📦 Vite não encontrado, instalando como dependência de desenvolvimento..."
  pnpm add -D vite
fi

################################################################################
# 6. Garante que o script 'dev' exista no package.json
################################################################################
if ! grep -q '"dev"' package.json; then
  echo "🚀 Adicionando script de desenvolvimento ao package.json..."
  npx json -I -f package.json -e 'this.scripts.dev="vite"'
fi

################################################################################
# 7. Garante presença de tsconfig.json e .eslintrc.cjs básicos
################################################################################
echo "🔍 Verificando tsconfig e eslint..."
if [ ! -f "tsconfig.json" ]; then
  echo "⚠️  tsconfig.json não encontrado, criando arquivo base..."
  npx tsc --init --rootDir src --module ESNext --target ESNext --jsx react-jsx
fi

if [ ! -f ".eslintrc.cjs" ]; then
  echo "⚠️  .eslintrc.cjs não encontrado, criando base..."
  cat <<'EOF' > .eslintrc.cjs
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: [
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
EOF
fi

################################################################################
# 8. Inicia o servidor de desenvolvimento
################################################################################
echo "🚀 Iniciando o servidor de desenvolvimento com Vite..."
pnpm run dev
