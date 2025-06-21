module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json"   // ⚠️ aponta p/ o arquivo acima
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "import", "jsx-a11y"],
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked", // preset v6
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "airbnb-typescript/base",
    "prettier"
  ],
  settings: { react: { version: "18.2" } },
  ignorePatterns: ["cypress/**", "tests/**", "**/*.stories.tsx"]
};


