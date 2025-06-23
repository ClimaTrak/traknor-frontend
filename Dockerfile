FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY frontend ./frontend
COPY vite.config.ts ./
RUN corepack enable && corepack prepare pnpm@8 --activate
RUN pnpm install --frozen-lockfile
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm build

FROM nginx:1.25-alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
