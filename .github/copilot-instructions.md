# Copilot Instructions — TrakNor Frontend

## Contexto do Projeto

TrakNor Frontend é um sistema CMMS (Computerized Maintenance Management System) construído com React + TypeScript + Mantine v8, usando Clean Architecture. O projeto usa **pnpm workspaces** com estrutura monorepo contendo:

- `frontend/` - Aplicação principal TrakNor CMMS
- `traksense-frontend/` - Spark (renderizador de dashboards IoT)

**IMPORTANTE**: Este é um projeto **frontend-only** que consome APIs REST de backend Django. Não implementar lógica de backend aqui.

## Stack & Ferramentas

- **Build**: Vite 5 com path alias `@/` → `src/`
- **UI**: Mantine v8 (AppShell, DataTable, Notifications) + Tailwind CSS
- **Estado**: Zustand para autenticação/global
- **Queries**: React Query (@tanstack/react-query) para cache e data fetching
- **Formulários**: React Hook Form + Zod validation
- **Roteamento**: React Router v6 com lazy loading
- **API**: Gerada via `openapi-typescript-codegen` em `src/api/generated/`
- **Testes**: Vitest + React Testing Library (cobertura mínima 80%)
- **Lint**: ESLint flat config + Prettier (desativado no eslint.config.cjs para desenvolvimento rápido)
- **Package Manager**: pnpm (workspaces, lockfile v9+)

## Estrutura de Diretórios

```
frontend/src/
├── api/generated/      # Auto-gerado: nunca editar manualmente
├── application/        # Camada de aplicação (stores, hooks de negócio)
├── domain/             # Tipos de domínio puros (auth.ts, etc)
├── infrastructure/     # Implementações de API (axios config)
├── components/         # Componentes reutilizáveis (Layout/)
├── pages/              # Páginas por feature (Dashboard/, Reports/)
├── modules/            # Features modulares (users/, workorders/, assets/)
│   └── {module}/
│       ├── domain/         # Tipos e interfaces
│       ├── infrastructure/ # Services de API
│       └── schemas/        # Zod schemas
├── router/             # Configuração de rotas (RoleRoute)
├── providers/          # Context providers
├── hooks/              # Hooks customizados
├── utils/              # Utilitários puros
└── styles/             # Tokens de design
```

## Arquitetura e Padrões

### Clean Architecture Layers

1. **Domain**: Tipos TypeScript puros, sem dependências externas
2. **Infrastructure**: Implementa comunicação com API backend via axios
3. **Application**: Hooks e stores que orquestram regras de negócio
4. **Presentation**: Componentes React (pages/, components/)

**Regra**: Domain não importa de Infrastructure; Infrastructure não importa de Presentation.

### API Client Pattern

```typescript
// Sempre usar axios configurado em infrastructure/api/axios.ts
// Token JWT adicionado automaticamente via interceptor
// Exemplo:
import api from '@/infrastructure/api/axios';
const response = await api.get<User[]>('/api/users');
```

**CRÍTICO**: Sincronizar tipos com backend via:
```bash
pnpm api:gen  # Requer VITE_API_URL configurada
```

### Autenticação e Autorização

- JWT armazenado em `localStorage` via `utils/tokenStorage.ts`
- Role do usuário em `localStorage` via `utils/roleStorage.ts`
- Store global: `application/stores/useAuthStore.ts` (Zustand)
- Rotas protegidas: `<PrivateRoute>` e `<RoleRoute allowedRoles={['admin']}>`
- Roles: `'admin' | 'manager' | 'technician'`

### Roteamento

```tsx
// router.tsx usa createBrowserRouter com lazy loading
const Page = lazy(() => import('./pages/Feature'));

// Proteger por role:
{
  element: <RoleRoute allowedRoles={['admin']} />,
  children: [{ path: 'admin-only', element: <AdminPage /> }]
}
```

### Estado Global

- **Preferir React Query** para dados de servidor (cache automático)
- **Zustand**: apenas para estado de autenticação e UI global
- **Evitar** prop drilling excessivo; usar context quando necessário

### Formulários

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});
```

## Comandos Essenciais (PowerShell/Windows)

```powershell
# Instalar dependências (usa mirror se configurado em .npmrc)
pnpm install

# Dev server (proxy /api → localhost:8000)
pnpm dev  # http://localhost:5173

# Build de produção
pnpm build

# Testes com coverage
pnpm test
pnpm test:coverage  # Requer >= 80%

# Lint
pnpm lint

# Sincronizar tipos da API (após mudanças no backend)
pnpm api:gen
pnpm api:check  # Verifica se há diferenças

# Docker (se precisar rodar frontend isolado)
docker compose up --build
```

## Convenções de Código

### Nomenclatura

- **Componentes**: PascalCase (`UserList.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`)
- **Services**: PascalCase com sufixo `Service` (`UserService.ts`)
- **Tipos/Interfaces**: PascalCase (`User`, `ApiResponse`)
- **Arquivos de domínio**: singular (`user.ts`, `auth.ts`)

### Imports

```tsx
// 1. React/libs
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Alias @ (configurado no vite.config.ts)
import { useAuth } from '@/hooks/useAuth';
import api from '@/infrastructure/api/axios';

// 3. Relativos (último recurso)
import { UserSchema } from './schemas/userSchema';
```

### TypeScript

- **Sempre tipar** retornos de funções e props de componentes
- **Evitar `any`**: usar `unknown` e type guards
- **Preferir interfaces** para props de componentes; `type` para unions/aliases
- **Não usar enums**: usar const objects ou union types

```typescript
// ✅ BOM
type Status = 'pending' | 'active' | 'completed';
const STATUSES = { PENDING: 'pending', ACTIVE: 'active' } as const;

// ❌ EVITAR
enum Status { Pending, Active }
```

## Integração com Backend

### Proxy de Desenvolvimento

Vite proxy configurado em `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': { target: 'http://localhost:8000', changeOrigin: true }
  }
}
```

Requisições para `/api/*` são automaticamente redirecionadas para o backend Django.

### Geração de Tipos

Backend expõe schema OpenAPI em `/schema/`. Para atualizar:

1. Configurar `VITE_API_URL` no `.env`
2. Rodar `pnpm api:gen`
3. Código gerado em `src/api/generated/` (hooks React Query incluídos)

**NUNCA editar** arquivos em `src/api/generated/` manualmente.

## Testes

- **Localização**: `*.test.tsx` ou `*.spec.tsx` ao lado do arquivo fonte
- **Coverage mínimo**: 80% (configurado em `vitest.config.ts`)
- **Mocks**: MSW para API mocking, evitar mocks excessivos

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## CI/CD

GitHub Actions em `.github/workflows/`:
- `frontend.yml`: lint + test + build
- `docker-smoke.yml`: smoke test do container Docker
- `smoke-front.yml`: smoke test end-to-end

**Pré-commit**: Lint e testes rodam localmente antes de push (se configurado).

## Integração com TrakSense Backend (IoT)

TrakNor Frontend pode consumir APIs TrakSense IoT (backend Django/DRF multi-tenant). Coordenação:

- **Multi-tenancy**: Backend usa django-tenants; frontend deve enviar header `X-Tenant` ou usar subdomínio
- **MQTT Dashboards**: Backend expõe `DashboardConfig` (JSON); frontend Spark renderiza com ECharts
- **Telemetria**: Endpoints `/api/data/points?device={uuid}&point={uuid}&from={iso}&to={iso}&agg={1m|5m|1h}`
- **Comandos IoT**: `POST /api/cmd/{device_id}` com body `{"op": "reset_fault", "pulse_ms": 500}`

## Tarefas Comuns

### Adicionar Nova Página

1. Criar em `pages/{Feature}/{FeatureName}.tsx`
2. Lazy load em `router.tsx`
3. Adicionar rota (proteger com `<RoleRoute>` se necessário)

### Adicionar Módulo

```
modules/
└── {module}/
    ├── domain/user.ts           # Tipos puros
    ├── schemas/userSchema.ts    # Zod schemas
    ├── infrastructure/
    │   └── UserService.ts       # API calls
    └── hooks/
        └── useUsers.ts          # React Query hooks
```

### Adicionar Componente Reutilizável

- Se global: `components/{ComponentName}/`
- Se específico de módulo: `modules/{module}/components/`
- Sempre criar `.test.tsx` para coverage

## Debugging

- **VS Code**: Launch config em `.vscode/launch.json` (se existir)
- **React DevTools**: instalar extensão do navegador
- **Network tab**: verificar requisições `/api/*` e headers JWT
- **Redux DevTools**: compatível com Zustand via middleware

## Coisas a Evitar

- ❌ Mutar state diretamente (usar immer se necessário)
- ❌ Fetch sem React Query (exceto casos especiais)
- ❌ CSS-in-JS pesado (preferir Tailwind + Mantine)
- ❌ Importar de `api/generated/` em domain layer
- ❌ Hardcoded API URLs (usar proxy ou env vars)
- ❌ Ignorar ESLint (exceto em desenvolvimento rápido)

## Estrutura do Workspace (Monorepo)

```
traknor-frontend/
├── .github/
│   └── workflows/          # CI/CD (frontend.yml, docker-smoke.yml)
├── frontend/               # APP PRINCIPAL (TrakNor CMMS)
│   ├── src/
│   ├── vite.config.ts
│   ├── package.json
│   └── docker-compose.yml
├── traksense-frontend/     # Spark (IoT Dashboard Renderer)
│   └── src/
├── package.json            # Root workspace config
└── pnpm-workspace.yaml
```

**Comandos workspace-aware**:
```powershell
# Rodar apenas frontend principal
pnpm --filter frontend dev

# Rodar todos os workspaces
pnpm -r dev

# Instalar dependência em workspace específico
pnpm --filter frontend add axios
```

## Relacionamento com Backend

### Backend Principal: TrakNor API (Django)
- **URL Dev**: http://localhost:8000
- **Endpoints**: `/api/users`, `/api/assets`, `/api/workorders`, `/api/reports`
- **Auth**: JWT via header `Authorization: Bearer {token}`

### Backend IoT: TrakSense API (Django + django-tenants)
- **URL Dev**: http://localhost:8000 (mesmo backend, apps separados)
- **Multi-tenancy**: Header `X-Tenant: {tenant_schema}` ou subdomínio
- **Endpoints**: `/api/devices`, `/api/dashboards/{device_id}`, `/api/data/points`
- **Telemetria**: TimescaleDB com RLS por tenant_id

## Troubleshooting Comum

### "Module not found" após add dependency
```powershell
pnpm install  # Reinstalar lockfile
```

### "pnpm not found"
```powershell
npm install -g pnpm@10.12
# Ou via corepack:
corepack enable
corepack prepare pnpm@latest --activate
```

### Proxy não funciona (404 em /api/*)
1. Verificar backend rodando: `curl http://localhost:8000/health`
2. Verificar `vite.config.ts` proxy config
3. Limpar cache Vite: `rm -rf node_modules/.vite`

### Tipos da API desatualizados
```powershell
# Backend deve estar rodando e expondo /schema/
pnpm api:gen
# Se erro de network, configurar VITE_API_URL no .env
```

## Notas Finais

- **Setup no Windows**: Use `pnpm install` direto (setup.sh é para Linux/Mac)
- **Node.js 20**: Recomendado via `pnpm env use --global 20` (sem precisar nvm)
- **Mirror npm**: `.npmrc` pode configurar registry alternativo via `registry=https://...`
- **Mantine v8**: Usa AppShell redesenhado (veja `docs/migration/mantine-v8.md`)
- **Changelog**: Manter atualizado em `CHANGELOG.md` seguindo [Keep a Changelog](https://keepachangelog.com)
- **Docker**: `docker-compose.yml` em `frontend/` para rodar isolado

Para dúvidas sobre arquitetura, consultar `README.md` e arquivos em `docs/`.
