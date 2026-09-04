// Prettier owns whitespace/layout; eslint-config-prettier switches off every ESLint/Vue formatting rule that would fight it.
// The rules below are code-quality and the few non-whitespace stylistic choices Prettier does not cover.
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(eslintConfigPrettier, {
  rules: {
    // Control-flow statements always use blocks: no `if (x) return`
    'curly': ['error', 'all'],

    // No arrow functions; use function declarations or expressions
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ArrowFunctionExpression',
        message: 'Arrow functions are not allowed. Use a function declaration or expression instead.',
      },
    ],
    'prefer-arrow-callback': 'off',

    // Blank line after a block statement or function, unless the next line is part of the chain
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: ['block-like', 'function'], next: '*' }],

    // File hygiene
    'eol-last': ['error', 'always'],

    // General correctness
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],

    // Vue
    'vue/attributes-order': 'error',
    'vue/multi-word-component-names': 'off',
  },
})
