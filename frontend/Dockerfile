# --- Estágio 1: Build da Aplicação ---
FROM node:20-alpine AS builder

WORKDIR /app

# Habilita o pnpm na versão exata
RUN corepack enable && corepack prepare pnpm@10.12.2 --activate

# --- Camada 1: Dependências da Raiz ---
# Copia somente os manifestos da raiz e o lockfile.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Instala somente as dependências da raiz do workspace (sem os workspaces filhos).
# Isso cria o cache principal do pnpm e raramente muda.
RUN pnpm install --filter . --prod

# --- Camada 2: Código e Dependências Finais ---
# Agora, copia o código-fonte COMPLETO do projeto.
# Esta camada só será invalidada se o código-fonte mudar.
COPY . .

# Roda pnpm install novamente. Agora, com todo o código dos workspaces
# presente, o pnpm vai instalar as dependências restantes (como as devDependencies
# do frontend) e criar todos os links simbólicos corretamente.
# Esta etapa será rápida pois o cache do pnpm já foi populado na etapa anterior.
RUN pnpm install --frozen-lockfile

# --- Etapa de Build ---
# Com tudo instalado e linkado, execute o build do frontend.
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN pnpm --filter frontend run build


# --- Estágio 2: Servidor de Produção ---
FROM nginx:1.25-alpine AS production

COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]