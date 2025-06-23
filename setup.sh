#!/usr/bin/env bash
set -euo pipefail

USE_MIRROR=false
for arg in "$@"; do
  if [[ "$arg" == "--mirror" ]]; then
    USE_MIRROR=true
  fi
done

OS=$(uname -o 2>/dev/null || echo "unknown")
NODE_VERSION=20

if echo "$OS" | grep -qi 'mingw'; then
  echo "Windows detected – using corepack instead of nvm"
  corepack enable pnpm
  pnpm env use --global "$NODE_VERSION"
else
  if command -v nvm >/dev/null; then
    source "$(command -v nvm | sed 's/bin\/nvm$/nvm.sh/')"
  else
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source "$HOME/.nvm/nvm.sh"
  fi
  nvm install "$NODE_VERSION"
  nvm use "$NODE_VERSION"
fi

echo "🔧 Using Node $(node -v)"

if ! command -v pnpm >/dev/null; then
  corepack enable
  corepack prepare pnpm@latest --activate
fi

echo "📦 Installing dependencies..."
REGISTRY="https://registry.npmjs.org"
if $USE_MIRROR; then
  REGISTRY="https://registry.npmmirror.com"
fi
pnpm install --registry "$REGISTRY"

echo "✅ Setup completo"
