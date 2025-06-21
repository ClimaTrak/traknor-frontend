#!/bin/bash

echo "🛠️  Iniciando configuração do ambiente TrakNor..."

# 1. Verifica se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
  echo "🚫 pnpm não encontrado. Instalando..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi

echo "✅ pnpm disponível: $(pnpm -v)"

# 2. Instala todas as dependências do projeto
echo "📦 Instalando dependências..."
pnpm install

# 3. Acessa o frontend
cd frontend || exit 1

# 4. Garante que Vite esteja instalado
if ! pnpm list vite &> /dev/null; then
  echo "📦 Vite não encontrado, instalando como dependência de desenvolvimento..."
  pnpm add -D vite
fi

# 5. Cria o script dev no package.json se não existir
if ! grep -q '"dev"' package.json; then
  echo "🚀 Adicionando script de desenvolvimento ao package.json..."
  npx json -I -f package.json -e 'this.scripts.dev="vite"'
fi

# 6. Verifica se há erros no tsconfig ou eslint
echo "🔍 Verificando tsconfig e eslint..."
if [ ! -f "tsconfig.json" ]; then
  echo "⚠️ tsconfig.json não encontrado, criando arquivo base..."
  npx tsc --init --rootDir src --module ESNext --target ESNext --jsx react-jsx
fi

if [ ! -f ".eslintrc.cjs" ]; then
  echo "⚠️ .eslintrc.cjs não encontrado, criando base..."
  cat <<EOF > .eslintrc.cjs
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

# 7. Executa a aplicação
echo "🚀 Iniciando o servidor de desenvolvimento com Vite..."
pnpm run dev

