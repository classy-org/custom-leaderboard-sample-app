/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
  globals: {
    process: true,
    module: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'padding-line-between-statements': [
      'error',
      /**
       * Add spacing before and after any multiline blocks
       */
      {
        blankLine: 'always',
        prev: 'multiline-block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-block-like',
      },
      /**
       * Add spacing before and after any multiline const declarations
       */
      {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-const',
      },
      /**
       * Add spacing before and after any multiline let declarations
       */
      {
        blankLine: 'always',
        prev: 'multiline-let',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-let',
      },
      /**
       * Add spacing before and after any multiline var declarations
       */
      {
        blankLine: 'always',
        prev: 'multiline-var',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-var',
      },
      /**
       * Add spacing before and after any multiline expressions
       */
      {
        blankLine: 'always',
        prev: 'multiline-expression',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-expression',
      },
      /**
       * Add spacing before all return
       */
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: 'return',
      },
      /**
       * Add spacing before and after any multiline expressions
       */
      {
        blankLine: 'always',
        prev: 'multiline-expression',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-expression',
      },
    ],

    'react/display-name': 'off',
  },
}
