# RE01 - Feedback de Revisao Estrutural do Front-end

Esta analise abrange os arquivos da sprint 6 (features FE01 a FE09). Seguem os principais pontos observados e recomendacoes de melhoria.

## Estrutura de Pastas
- Projeto segue em parte a Clean Architecture (`domain`, `application`, `presentation`). Recomenda-se criar tambem uma camada `infrastructure` para servicos HTTP e persistencia.
- Pastas de componentes reutilizaveis (`presentation/components`) e paginas (`presentation/pages`) estao coesas. Avaliar mover `components/routes` para `presentation/routes` para manter padrao.
- Evitar duplicacao de stores: existe `src/stores/useAuthStore.ts` apenas reexportando a implementacao em `src/application/stores/useAuthStore.ts`. Centralizar em um unico caminho.

## Padronizacao de Codigo
- Garantir execucao do ESLint e Prettier de forma automatica (pre-commit ou CI). O projeto ainda utiliza formato antigo `.eslintrc.cjs`; avaliar migracao para `eslint.config.js` conforme aviso do proprio ESLint.
- Remover comentarios obsoletos e garantir nomes consistentes nos arquivos e funcoes. Exemplos: arquivos de paginas usam minusculo (`Overview.tsx`, `Assets.tsx`) enquanto componentes seguem camelCase.
- Algumas paginas sao placeholders apenas com `<h1>`; caso mantenham, adicione TODOs ou documentacao para evitar confusao.

## Design System e Tokens
- Tokens de cores e tipografia estao centralizados em `styles/tokens.ts`. Garantir que todos os componentes reutilizaveis (e.g. `StatCard`, `ChartCard`, `TopNav`) consumam estes tokens via `useTokens`.
- Integracao com `MantineProvider` e `Tailwind` esta basica. Avaliar documentar melhor como usar as cores personalizadas nas classes Tailwind.

## Regras de Negocio e Stores
- `AuthService`, `useAuthStore` e `AuthGuard` funcionam, mas a logica de autenticacao poderia ser movida para modulo de `infrastructure` (services) e `application` (hooks/stores) para reforcar separacao de dominio.
- `AuthGuard` depende diretamente de `useAuthStore`. Avaliar injeção de dependencia para facilitar testes.

## Testes e Storybook
- Existem testes unitarios utilizando Jest e alguns e2e com Cypress. As configuracoes devem rodar via `pnpm test`. Incluir mais cenarios para componentes e hooks.
- Storybook apresenta stories basicos (`StatCard`, `ChartCard`, `Button`). Garantir que todas as props sejam documentadas e controlaveis.

## Outros Pontos
- Criar scripts de automatizacao para instalacao de dependencias, rodar lint e testes em CI.
- Considerar adicao de `infrastructure/http` para consolidar chamadas de API futuramente.

Estas sugestoes visam melhorar a manutencao e escalabilidade do front-end conforme o projeto evolui.
