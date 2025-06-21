module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {},
};

