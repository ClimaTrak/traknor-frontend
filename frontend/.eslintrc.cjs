// frontend/.eslintrc.cjs
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  settings: {
    react: { version: "detect" },
    "import/resolver": { typescript: {} },
  },
  ignorePatterns: [
    "dist/",
    "node_modules/",
    ".vite/",
    ".ignored_node_modules/",
    ".storybook/",
    "*.config.ts",
    "vite.config.ts",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    // outras regras personalizadas...
  },
};
