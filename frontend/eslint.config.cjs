// frontend/eslint.config.cjs
/** @type {import('eslint').FlatConfig[]} */
const { configs: { recommended: eslintRecommended } } = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const importPlugin = require("eslint-plugin-import");
const prettierPlugin = require("eslint-plugin-prettier");
const { configs: { recommended: tsRecommended, "recommended-requiring-type-checking": tsTypeChecked } } = tsPlugin;
const { configs: { recommended: reactRecommended } } = reactPlugin;
const { configs: { recommended: jsxA11yRecommended } } = jsxA11yPlugin;
const { configs: { recommended: reactHooksRecommended } } = reactHooksPlugin;
const { configs: { recommended: importRecommended } } = importPlugin;
const { configs: { recommended: prettierRecommended } } = prettierPlugin;

module.exports = [
  // ESLint core
  eslintRecommended,

  // TS basic
  {
    plugins: { "@typescript-eslint": tsPlugin },
    rules: tsRecommended.rules,
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
  },

  // TS com type-checking
  {
    plugins: { "@typescript-eslint": tsPlugin },
    rules: tsTypeChecked.rules,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
      },
    },
  },

  // React
  {
    plugins: { react: reactPlugin },
    rules: { ...reactRecommended.rules, "react/react-in-jsx-scope": "off" },
    languageOptions: { parserOptions: reactRecommended.parserOptions },
    settings: { react: { version: "detect" } },
  },

  // A11y
  {
    plugins: { "jsx-a11y": jsxA11yPlugin },
    rules: jsxA11yRecommended.rules,
    languageOptions: {
      parserOptions: jsxA11yRecommended.parserOptions,
    },
  },

  // Hooks
  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: reactHooksRecommended.rules,
  },

  // Import
  {
    plugins: { import: importPlugin },
    rules: importRecommended.rules,
    languageOptions: { parserOptions: importRecommended.parserOptions },
    settings: { "import/resolver": { typescript: {} } },
  },

  // Prettier
  {
    plugins: { prettier: prettierPlugin },
    rules: prettierRecommended.rules,
  },

  // ignores e patterns
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
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
  },
];
