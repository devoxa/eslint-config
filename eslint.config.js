module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // Don't require a weird naming convention for interfaces
    '@typescript-eslint/interface-name-prefix': 'off',

    // Allow inferring types for functions
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Allow inferring types for exported things
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Don't allow "any" at all
    '@typescript-eslint/no-explicit-any': 'error',

    // Make sure we are awaiting or explicitly voiding all Promises
    '@typescript-eslint/no-floating-promises': 'error',

    // Allow using functions that are defined later in the file (fine thanks to hoisting)
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true },
    ],

    // This rule makes no difference - ' and " are fine, > and } are already compile errors
    'react/no-unescaped-entities': 'off',

    // Disable validation of prop types, because we use TS instead and it gets confused
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
