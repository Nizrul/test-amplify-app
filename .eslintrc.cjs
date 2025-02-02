const stylisticJsx = require('@stylistic/eslint-plugin-jsx');
const stylisticTs = require('@stylistic/eslint-plugin-ts');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic/jsx', '@stylistic/ts'],
  rules: {
    '@stylistic/jsx/jsx-indent-props': ['error', 2],
    '@stylistic/ts/indent': ['error', 2],
    '@stylistic/jsx/jsx-indent': ['error', 2],
    '@stylistic/ts/quotes': ['error', 'single'],
    '@stylistic/ts/semi': ['error', 'always'],
    'max-len': 'off',
    '@stylistic/jsx/jsx-first-prop-new-line': 'error',
  },
};
