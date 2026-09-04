// Lints SCSS files and the <style> blocks in .vue components.
// Prettier formats CSS, Stylelint checks correctness.
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
  rules: {
    // Tailwind's at-rules are valid in this project
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'screen', 'variants', 'responsive', 'config'],
      },
    ],

    // The .noselect helper needs the -webkit-/-moz-/-ms-/-khtml- prefixes on purpose
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,

    // Keep the existing rgba()/legacy color syntax instead of rewriting every color
    'color-function-notation': null,
    'alpha-value-notation': null,

    // Noisy for a nested SCSS codebase; not a correctness problem
    'no-descending-specificity': null,

    // CSS custom properties here are not BEM-cased; allow the project's naming
    'custom-property-pattern': null,
  },
}
