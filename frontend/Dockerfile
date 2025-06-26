# --- Estágio 1: Build da Aplicação ---
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copia os arquivos de manifesto do monorepo para a raiz /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# 2. Habilita o pnpm
RUN corepack enable && corepack prepare pnpm@10.12.2 --activate

# 3. Instala SOMENTE as dependências de produção da raiz do workspace.
#    Isso otimiza o cache do Docker.
RUN pnpm install --filter . --prod

# 4. Copia o código-fonte COMPLETO do frontend para dentro do seu próprio diretório
COPY frontend ./frontend

# 5. Define o diretório de trabalho para o workspace do frontend
WORKDIR /app/frontend

# 6. **PASSO CRUCIAL**: Instala TODAS as dependências (incluindo as de desenvolvimento)
#    necessárias para o build do frontend, como autoprefixer e tailwindcss.
RUN pnpm install --no-frozen-lockfile

# 7. Define a variável de ambiente para a URL da API e executa o build
#    O build agora ocorre de dentro de /app/frontend, onde todas as dependências estão presentes.
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN pnpm run build

# --- Estágio 2: Servidor de Produção ---
FROM nginx:1.25-alpine AS production

# Copia os arquivos de build (da pasta /app/frontend/dist) para o diretório do Nginx
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]