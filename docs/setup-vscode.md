# Guia de Configuracao para rodar o projeto no VS Code

Este documento descreve os passos para clonar e executar o front-end do projeto no Visual Studio Code.

## 1. Requisitos

 - **Node.js** 20 LTS
- **pnpm** (gerenciador de pacotes)
- **Git** para clonar o repositório
- (Opcional) Extensão _ESLint_ no VS Code para feedback de lint em tempo real

## 2. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd traknor-frontend
```

## 3. Instalar dependências

Instale todas as dependências utilizando o pnpm:

```bash
pnpm install
```

Para garantir que as bibliotecas permaneçam atualizadas, rode periodicamente:

```bash
pnpm update
```

Se estiver contribuindo com o projeto, execute também:

```bash
pnpm lint
pnpm test
```

## 4. Abrir no Visual Studio Code

Abra a pasta do projeto no VS Code:

```bash
code .
```

O VS Code detectará a configuração do TypeScript e oferecerá suporte a ESLint.

## 5. Iniciar o servidor de desenvolvimento

Com as dependências instaladas, rode o servidor do Vite:

```bash
pnpm dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## 6. Estrutura do projeto

Este repositório segue a abordagem **Clean Architecture**, com as pastas principais abaixo:

- `domain/`
- `application/`
- `infrastructure/` _(planejada para serviços HTTP e persistência)_
- `presentation/`

## 7. Dicas adicionais

- Recomenda-se configurar o arquivo `.env` caso a aplicação precise de variáveis de ambiente.
- Antes de enviar um pull request, execute `pnpm lint` e `pnpm test` (ou `pytest` para projetos em Python). Caso altere modelos em projetos do backend, crie a migração correspondente.
