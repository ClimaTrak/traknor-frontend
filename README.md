# ClimaTrak Frontend

This repository contains the React front-end for ClimaTrak.

## Development

Install dependencies and start the dev server from the repository root:

```bash
pnpm install
pnpm dev
```

The application will be available at http://localhost:5173 showing **Hello ClimaTrak**.

For a detailed step-by-step guide on running the project locally, see [docs/rodando-localmente.md](docs/rodando-localmente.md).

## Como rodar

1. Execute `pnpm install` na raiz do repositório para instalar as dependências.
2. Inicie o servidor de desenvolvimento com `pnpm dev`.
3. Abra `http://localhost:5173` no navegador e verifique se a página inicial é exibida sem erros.

### Formatting and Linting

For instructions on setting up the project in Visual Studio Code, see [docs/setup-vscode.md](docs/setup-vscode.md).

Run the linter and formatter:

```bash
pnpm lint
pnpm format
pnpm format:check
```

## Camada de API & Auth

Todas as chamadas HTTP utilizam a instância `api` configurada em `src/infrastructure/api/axios.ts`. Antes de consumir, defina `VITE_API_URL` no `.env` apontando para o backend.

Exemplo de login e chamada autenticada:

```ts
import { login } from '@/infrastructure/api/auth';
import { api } from '@/infrastructure/api/axios';

await login({ username: 'alice', password: '123' });
const dados = await api.get('/api/dashboard/');
```

Tokens são salvos em `localStorage` e renovados automaticamente.

### Autenticação no Frontend

As telas **Login** (`/login`) e **Recuperar Senha** (`/password-reset`) utilizam componentes da Mantine.
Após autenticar, a aplicação grava `access`, `refresh` e `role` em `localStorage`.
O redirecionamento pós-login considera o `role` do usuário:

| Role       | Rota inicial        |
|------------|--------------------|
| `ADMIN`    | `/dashboard`       |
| `TECH`     | `/work-orders`     |
| `CLIENT`   | `/work-orders/my`  |

Rotas privadas usam `<PrivateRoute>` para exigir token válido.

### Sincronizar tipos da API

- `pnpm api:gen` → gera/atualiza tipos e hooks
- `pnpm api:check` → gera e falha se houver diferenças (usado no CI e pre-commit)
