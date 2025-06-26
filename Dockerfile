# --- Estágio 1: Build da Aplicação ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copia todos os arquivos do projeto para o WORKDIR /app
# Isso inclui package.json, pnpm-lock.yaml, vite.config.ts e a pasta frontend/
COPY . .

# **A CORREÇÃO-CHAVE ESTÁ AQUI**
# Altera o arquivo vite.config.ts para corrigir o caminho de entrada.
# Ele muda "input: 'frontend/index.html'" para "input: 'index.html'"
RUN sed -i "s|input: 'frontend/index.html'|input: 'index.html'|" vite.config.ts

# Instala as dependências de todo o monorepo
RUN corepack enable \
 && corepack prepare pnpm@10.12.2 --activate \
 && pnpm install --no-frozen-lockfile

# Define a variável de ambiente para a URL da API e executa o build
# O build é executado a partir da raiz (/app), que é o esperado pela config
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN pnpm --filter frontend run build

# --- Estágio 2: Servidor de Produção ---
FROM nginx:1.25-alpine AS production

# Copia os arquivos de build (da pasta /app/frontend/dist) para o diretório do Nginx
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]