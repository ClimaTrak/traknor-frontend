# Mantine 8 Migration

Este projeto foi atualizado para o Mantine 8.1.2.

Os componentes de layout `Header`, `Navbar`, `Footer` e `Aside` foram removidos do export principal do `@mantine/core` e agora devem ser acessados via `AppShell`.

Para facilitar a migração foi criado o codemod `scripts/mantine-v8-appshell-codemod.js`.

Execute o comando abaixo a partir da raiz do repositório para refatorar automaticamente os arquivos:

```bash
npx jscodeshift -t scripts/mantine-v8-appshell-codemod.js src --extensions=ts,tsx --parser=tsx
```

Referência: [Mantine AppShell Guide](https://mantine.dev/guides/app-shell/#compound-components)
