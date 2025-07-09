# Guia Rápido para Rodar Localmente

Este documento descreve passo a passo como executar a aplicação front-end do ClimaTrak em ambiente de desenvolvimento.

## 1. Requisitos

 - **Node.js** 20 LTS
- **pnpm** como gerenciador de pacotes
- **Git** para clonar o repositório

## 2. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd traknor-frontend
cp .env.example .env
pnpm install
```

Se já possui o projeto clonado, atualize as dependências com:

```bash
pnpm update
```

## 3. Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## 4. Conferência de código

Antes de enviar um pull request, execute:

```bash
pnpm lint
pnpm test
```

Caso seja um projeto Python, também rode `pytest` e crie migrações quando modificar models.
