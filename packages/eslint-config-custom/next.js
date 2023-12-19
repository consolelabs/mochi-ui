const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: ['./react.js', 'next'],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
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
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/display-name': 'off',
    'no-return-assign': 'off',
    'react/jsx-no-bind': 'off',
  },
}
