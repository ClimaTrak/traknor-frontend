# Changelog

## [Unreleased]

### Added

- Login e recuperação de senha com Mantine e React Router
- Armazenamento de tokens e role no `localStorage`
- Proteção de rotas via `<PrivateRoute>`
- Sincronização automática dos tipos da API (Closes #22)
- Aplicação de layout base com Mantine AppShell
- CRUD de Equipamentos com importação CSV
- Lista e detalhe de Ordens de Serviço com transições de status
- Suporte a mirror de registry npm via `.npmrc` (Closes #27)
- Dashboard KPIs com auto-refresh (Closes #26)
- Exporta relatórios em PDF ou Excel pela página `/reports` (Closes #27)
- Controle de acesso por papéis com `<RoleRoute>` e página de erro 403 (Closes #28)
- Configura Vitest e React Testing Library com cobertura mínima de 80% (Closes #29)
- Setup local de frontend com proxy e script `setup.sh` (SB30)
- Hook pre-commit ignora etapas locais no CI (Closes #32)
- Move `vite.config.ts` para a raiz e atualiza scripts `dev`/`build` (Closes #33)
- Torna `setup.sh` compatível com Windows usando corepack e `pnpm env` (Closes #34)
- Workflow CI executa lint e testes automatizados (Closes #35)
- Dockerfile multi-stage e exemplo `docker-compose.yml` para rodar frontend e backend (Closes #36)
- Corrige dependências e configurações do frontend garantindo build sem erros (Closes #67)
- Otimiza Dockerfile, adiciona `.dockerignore`, rede dedicada e verificação no CI (SB37)

### Fixed
- navbar import errors
