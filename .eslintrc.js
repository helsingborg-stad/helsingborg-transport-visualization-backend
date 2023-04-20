module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'linebreak-style': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error'],
    'import/prefer-default-export': 0,
    'no-useless-constructor': 0,
    '@typescript-eslint/no-useless-constructor': ['error'],
    'no-empty-function': 0,
    '@typescript-eslint/no-empty-function': ['error'],
    'class-methods-use-this': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  ignorePatterns: ['src/fakeFactory/*.ts'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        extensions: ['.ts', '.json'],
        map: [
          ['@root', './src/'],
          ['@config', './src/config'],
          ['@domains', './src/domains'],
          ['@services', './src/services'],
          ['@entities', './src/entities'],
          ['@utils', './src/utils'],
        ],
      },
    },
  },
};
