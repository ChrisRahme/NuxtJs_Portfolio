// Same code rules as the website (see website/eslint.config.mjs); Prettier owns formatting.
import studio from '@sanity/eslint-config-studio'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  ...studio,
  eslintConfigPrettier,
  {
    rules: {
      curly: ['error', 'all'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ArrowFunctionExpression',
          message: 'Arrow functions are not allowed. Use a function declaration or expression instead.',
        },
      ],
      'prefer-arrow-callback': 'off',
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: ['block-like', 'function'], next: '*' }],
      'eol-last': ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    ignores: ['dist/', '.sanity/', 'node_modules/', 'schema.json', 'scripts/legacy-data/'],
  },
]
