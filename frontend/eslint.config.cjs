// frontend/eslint.config.cjs
/** @type {import('eslint').FlatConfig[]} */
const { configs: { recommended: eslintRecommended } } = require("eslint");
const { configs: { recommended: tsRecommended, "recommended-requiring-type-checking": tsTypeChecked } } = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const { configs: { recommended: reactRecommended } } = require("eslint-plugin-react");
const { configs: { recommended: jsxA11yRecommended } } = require("eslint-plugin-jsx-a11y");
const { configs: { recommended: reactHooksRecommended } } = require("eslint-plugin-react-hooks");
const { configs: { recommended: importRecommended } } = require("eslint-plugin-import");
const { configs: { "prettier-recommended": prettierRecommended } } = require("eslint-plugin-prettier");

module.exports = [
  // ESLint core
  eslintRecommended,

  // TS basic
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
  },

  // React
  {
    ...reactRecommended,
    settings: { react: { version: "detect" } },
    rules: { ...reactRecommended.rules, "react/react-in-jsx-scope": "off" },
  },

  // A11y
  jsxA11yRecommended,

  // Hooks
  reactHooksRecommended,

  // Import
  {
    ...importRecommended,
    settings: { "import/resolver": { typescript: {} } },
  },

  // Prettier
  prettierRecommended,

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
