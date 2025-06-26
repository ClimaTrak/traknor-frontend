# ← STAGE 1: BASE
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH"
RUN corepack enable

# ← STAGE 2: BUILDER
FROM base AS builder
WORKDIR /app

# 2.1) Copia manifestos e config do Vite/TS
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml vite.config.ts tsconfig.json ./

# 2.2) Copia o código-fonte do frontend
COPY frontend ./frontend

# 2.3) Instala tudo, com cache BuildKit
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# 2.4) Build do Vite dentro de frontend (já traz vite e devDeps)
WORKDIR /app/frontend
RUN pnpm run build

# ← STAGE 3: RUNNER
FROM nginx:1.25-alpine AS runner

# 3.1) (opcional) usuário não-root
RUN addgroup -S app && adduser -S app -G app
USER app

# 3.2) Copia apenas o dist gerado
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
