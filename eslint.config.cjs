// frontend/eslint.config.cjs
/** @type {import('eslint').FlatConfig[]} */
const { configs: { recommended: eslintRecommended } } = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const {
  configs: {
    recommended: tsRecommended,
    'recommended-requiring-type-checking': tsTypeChecked,
  },
} = tsPlugin;
const reactPlugin = require('eslint-plugin-react');
const { configs: { recommended: reactRecommended } } = reactPlugin;
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const { configs: { recommended: jsxA11yRecommended } } = jsxA11yPlugin;
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const { configs: { recommended: reactHooksRecommended } } = reactHooksPlugin;
const importPlugin = require('eslint-plugin-import');
const { configs: { recommended: importRecommended } } = importPlugin;
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  // Ignore tests, stories and generated API during development
  {
    ignores: [
      'cypress/**',
      'src/**/*.cy.ts',
      'src/**/*.{spec,test}.{ts,tsx}',
      'src/**/*.stories.tsx',
      'src/api/generated/**',
    ],
  },
  // 1) ESLint core
  eslintRecommended,

  // 2) TS sem type-check
  {
    plugins: { '@typescript-eslint': tsPlugin },
    rules: tsRecommended.rules,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // 3) TS com type-check (desativado para desenvolvimento rapido)
  /*
  {
    plugins: { '@typescript-eslint': tsPlugin },
    rules: tsTypeChecked.rules,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  */

  // 4) React
  {
    plugins: { react: reactPlugin },
    rules: {
      ...reactRecommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // 5) A11y
  {
    plugins: { 'jsx-a11y': jsxA11yPlugin },
    rules: jsxA11yRecommended.rules,
  },

  // 6) React Hooks
  {
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: reactHooksRecommended.rules,
  },

  // 7) Import (desativado)
  /*
  {
    plugins: { import: importPlugin },
    rules: importRecommended.rules,
    settings: { 'import/resolver': { typescript: {} } },
  },
  */

  // 8) Prettier (desativado)
  /*
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  */

  // 9) Ignora arquivos / overrides
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.vite/**',
      '.ignored_node_modules/**',
      '.storybook/**',
      '*.config.ts',
      'vite.config.ts',
    ],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        module: 'readonly',
        setTimeout: 'readonly',
      },
    },
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  },
];
