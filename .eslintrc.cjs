module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['html', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'import/no-unresolved': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'func-names': 0,
  },
  includes: ['**/*.js', '**/*.html'],
}
