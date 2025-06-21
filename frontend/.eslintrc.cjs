module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: "./tsconfig.eslint.json", ← comente isso temporariamente
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'react-hooks',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
