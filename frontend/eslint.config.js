import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

const __dirname = new URL('.', import.meta.url).pathname;

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'vite.config.ts'],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.eslint.json', tsconfigRootDir: __dirname },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
