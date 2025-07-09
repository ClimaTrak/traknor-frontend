#!/usr/bin/env bash
set -e

echo "🗑️  Limpando artefatos antigos..."
rm -rf node_modules dist .vite
rm -f package-lock.json pnpm-lock.yaml

echo "🐳  Parando containers antigos e removendo volumes órfãos..."
# tenta docker compose, se falhar usa docker-compose
if ! docker compose down --volumes --remove-orphans; then
  docker-compose down --volumes --remove-orphans
fi

echo "⚙️  Fazendo prune no Docker para liberar cache..."
docker system prune -f || true

echo "🔧  Instalando dependências..."
pnpm install

echo "🚀  Subindo o frontend em Docker..."
if ! docker compose up --build -d frontend; then
  docker-compose up --build -d frontend
fi
echo "✅  Frontend rodando! Acesse http://localhost:3000"

