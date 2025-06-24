FROM node:20-alpine AS builder
WORKDIR /app

# copia o lockfile que está na raiz do workspace
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# copia código do frontend
COPY frontend ./frontend
COPY vite.config.ts ./

RUN corepack enable && corepack prepare pnpm@10.12.2 --activate
RUN pnpm install --no-frozen-lockfile
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm --filter frontend run build

FROM nginx:1.25-alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
