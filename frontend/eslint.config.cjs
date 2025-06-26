// frontend/eslint.config.cjs
const eslintRecommended = require("eslint/conf/eslint-recommended.js");
const tsRecommended = require("@typescript-eslint/eslint-plugin/dist/configs/recommended.js");
const tsTypeChecked = require("@typescript-eslint/eslint-plugin/dist/configs/recommended-requiring-type-checking.js");
const reactRecommended = require("eslint-plugin-react/dist/configs/recommended.js");
const jsxA11yRecommended = require("eslint-plugin-jsx-a11y/dist/configs/recommended.js");
const reactHooksRecommended = require("eslint-plugin-react-hooks/dist/configs/recommended.js");
const importRecommended = require("eslint-plugin-import/configs/recommended.js");
const importTS = require("eslint-plugin-import/configs/typescript.js");
const prettierRecommended = require("eslint-plugin-prettier/configs/prettier-recommended.js");

const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const importPlugin = require("eslint-plugin-import");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  // ESLint core
  eslintRecommended,

  // TS base
  {
    ...tsRecommended,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { "@typescript-eslint": tsPlugin },
  },

  // TS com type-checking
  {
    ...tsTypeChecked,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { "@typescript-eslint": tsPlugin },
  },

  // React
  {
    ...reactRecommended,
    plugins: { react: reactPlugin },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactRecommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },

  // A11y
  {
    ...jsxA11yRecommended,
    plugins: { "jsx-a11y": jsxA11yPlugin },
    rules: jsxA11yRecommended.rules,
  },

  // Hooks
  {
    ...reactHooksRecommended,
    plugins: { "react-hooks": reactHooksPlugin },
  },

  // Import
  {
    ...importRecommended,
    plugins: { import: importPlugin },
    settings: { "import/resolver": { typescript: {} } },
  },
  {
    ...importTS,
    plugins: { import: importPlugin },
    settings: { "import/resolver": { typescript: {} } },
  },

  // Prettier
  {
    ...prettierRecommended,
    plugins: { prettier: prettierPlugin },
    rules: prettierRecommended.rules,
  },

  // Nosso override p/ ignorar bundles, storybook, configs…
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".vite/**",
      ".ignored_node_modules/**",
      ".storybook/**",
      "*.config.ts",
      "vite.config.ts",
    ],
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
  },
];
