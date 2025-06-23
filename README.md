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

## Problemas de Registry

Se sua rede bloquear `registry.npmjs.org`, defina:

```bash
export NPM_REGISTRY=https://registry.npmmirror.com
pnpm install
```

### Formatting and Linting

For instructions on setting up the project in Visual Studio Code, see [docs/setup-vscode.md](docs/setup-vscode.md).

Run the linter and formatter:

```bash
pnpm lint
pnpm format
pnpm format:check
```

## Rodando Testes

Execute a suíte de testes e gere o relatório de cobertura com:

```bash
pnpm test:coverage
```

Commits e builds falham se a cobertura ficar abaixo de 80%.

## Camada de API & Auth

Todas as chamadas HTTP utilizam a instância `api` configurada em `src/infrastructure/api/axios.ts`. Antes de consumir, defina `VITE_API_URL` no `.env` apontando para o backend.

Exemplo de login e chamada autenticada:

```ts
import { login } from "@/infrastructure/api/auth";
import { api } from "@/infrastructure/api/axios";

await login({ username: "alice", password: "123" });
const dados = await api.get("/api/dashboard/");
```

Tokens são salvos em `localStorage` e renovados automaticamente.

### Autenticação no Frontend

As telas **Login** (`/login`) e **Recuperar Senha** (`/password-reset`) utilizam componentes da Mantine.
Após autenticar, a aplicação grava `access`, `refresh` e `role` em `localStorage`.
O redirecionamento pós-login considera o `role` do usuário:

| Role     | Rota inicial      |
| -------- | ----------------- |
| `ADMIN`  | `/dashboard`      |
| `TECH`   | `/work-orders`    |
| `CLIENT` | `/work-orders/my` |

Rotas privadas usam `<PrivateRoute>` para exigir token válido.

### Sincronizar tipos da API

- `pnpm api:gen` → gera/atualiza tipos e hooks
- `pnpm api:check` → gera e falha se houver diferenças (usado no CI e pre-commit)

## Layout & Tema

- Cores primárias: #002d2b | #00968f | #00fff4
- Componente AppShell em `src/components/Layout`

## Equipamentos

A tela `/app/equipamentos` permite gerenciar a lista de equipamentos.
Ela utiliza tabela paginada, formulário em modal e importação de CSV.
Os dados são obtidos via hooks gerados em `src/api/generated/hooks/equipment.ts`.

## Ordens de Serviço

A partir da rota `/app/work-orders` é possível visualizar uma caixa de entrada de OS e o detalhe da seleção ao lado. As ações de mudança de status são carregadas dinamicamente e requerem permissão conforme o papel do usuário.

## Dashboard KPIs

A página `/dashboard` exibe indicadores-chave de manutenção (MTTR, MTBF e contagem de ordens de serviço) em cartões visuais. Os valores são atualizados automaticamente a cada 60 segundos utilizando **@tanstack/react-query**.

## Relatórios

A página `/reports` permite gerar relatórios em PDF ou Excel dos equipamentos ou ordens de serviço. Selecione o tipo e formato desejados e clique em **Download** para iniciar a geração. Um toast informa o andamento e o arquivo é salvo automaticamente.

## Controle de Acesso

As rotas e ações são protegidas conforme o papel do usuário (`admin`, `manager`, `technician`). Utilize o componente `<RoleRoute>` para restringir páginas:

```tsx
<Route element={<RoleRoute allowedRoles={['admin']} />}>
  <Route path="/usuarios" element={<UsuariosPage />} />
</Route>
```

Para verificar permissões em componentes:

```tsx
{isAuthorized(['admin']) && <ActionIcon aria-label="Excluir" />}
```
