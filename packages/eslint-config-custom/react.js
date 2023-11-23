const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

const dfLintConfig = require.resolve('@dwarvesf/react-eslint-config')

module.exports = {
  extends: [dfLintConfig, 'eslint-config-turbo'],
  plugins: ['prettier'],
  parserOptions: {
    project,
  },
  globals: {
    JSX: true,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.eslintrc.js',
    '**/*.css',
    '*.snap',
    'jest.config.js',
    '**/*.js',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/function-component-definition': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'react/jsx-key': 'off',
    'no-dupe-class-members': 'off',
    'prefer-arrow-callback': 'off',
    'import/export': 'off',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-use-before-define': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-sort-props': 'off',
        'no-void': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: false },
        ],
      },
    },
  ],
}
