const fs = require('fs')
const jsEslint = require('@eslint/js')
const tsEslint = require('typescript-eslint')
const parseGitignore = require('parse-gitignore')
const eslintConfigPrettier = require('eslint-config-prettier')
const eslintPluginReact = require('eslint-plugin-react')
const eslintPluginStylistic = require('@stylistic/eslint-plugin')

module.exports = function (options) {
  const { ignoreFiles = [], configs = [] } = options

  return tsEslint.config(
    // Transform ignore files (e.g. gitignore) into ignore configs
    ignoreFilesToIgnoreConfigs(ignoreFiles),
    { ignores: ['eslint.config.js'] },

    // Recommended config for linting with type information
    jsEslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: 'tsconfig.json',
          sourceType: 'module',
          warnOnUnsupportedTypeScriptVersion: false,
        },
      },
    },

    // Linting with React/JSX support
    eslintPluginReact.configs.flat.recommended,
    eslintPluginReact.configs.flat['jsx-runtime'], // Modern JSX transform
    { settings: { react: { version: 'detect' } } },

    // Custom stylistic rules that Prettier doesn't handle
    {
      plugins: { '@stylistic': eslintPluginStylistic },
      rules: {
        // Require single quotes for strings, except when using templating or to prevent escaping
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      },
    },

    // Disable rules that conflict with Prettier
    eslintConfigPrettier,

    // Custom rule overrides
    {
      rules: {
        // Don't require a weird naming convention for interfaces
        '@typescript-eslint/interface-name-prefix': 'off',

        // Allow inferring types for exported things
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Don't allow "any" at all
        '@typescript-eslint/no-explicit-any': 'error',

        // Make sure we are awaiting or explicitly voiding all Promises
        '@typescript-eslint/no-floating-promises': 'error',

        // Don't check void returns for JSX attributes, because it's a common React pattern
        // (e.g. `onClick={() => returnsPromiseVoid()}`)
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],

        // Require functions to define their return types for clearer contracts
        '@typescript-eslint/explicit-function-return-type': 'error',

        // Allow using functions that are defined later in the file (fine thanks to hoisting)
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: false, variables: true },
        ],

        // This rule makes no difference - ' and " are fine, > and } are already compile errors
        'react/no-unescaped-entities': 'off',

        // Disable validation of prop types, because we use TS instead and it gets confused
        'react/prop-types': 'off',

        // Make sure we're not using any deprecated APIs
        '@typescript-eslint/no-deprecated': 'error',

        // Enforce specific function type for React component functions
        'react/function-component-definition': [
          'error',
          { namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' },
        ],

        // Make sure comments are starting with an uppercase letter, to encourage correct grammar
        'capitalized-comments': [
          'warn',
          'always',
          { ignorePattern: 'prettier|c8', ignoreConsecutiveComments: true },
        ],

        // Enforce generic array types over array literals
        '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],

        // Disable specific syntax features
        'no-restricted-syntax': [
          'error',
          // Don't allow TS enums at all, since they have multiple unintuitive footguns
          {
            selector: 'TSEnumDeclaration',
            message: 'Unexpected enum. Use a literal string union or a const object instead.',
          },
          // Don't allow the `ReturnType<T>` generic, since this is nearly always a bad pattern and
          // indicates that something is missing proper typing
          {
            selector: "TSTypeReference[typeName.name='ReturnType']",
            message: "Unexpected 'ReturnType<T>'. Use an explicit type instead.",
          },
        ],
      },
    },

    // Custom rule overrides for test files
    {
      files: [
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__mocks__/**/*.ts',
        '**/__fixtures__/**/*.ts',
        '**/__helpers__/**/*.ts',
      ],
      rules: {
        // Allow `any` type usage in tests (for less frustrating mocking of complex types)
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',

        // Allow unbound methods in tests (valid for jest mock assertions)
        '@typescript-eslint/unbound-method': 'off',
      },
    },

    // Any additional configs that are passed in
    ...configs
  )
}

function ignoreFilesToIgnoreConfigs(ignoreFiles) {
  const ignores = []

  for (const path of ignoreFiles) {
    const content = fs.readFileSync(path, 'utf8')

    const parsed = parseGitignore(`${content}\n`)
    const globs = parsed.globs()

    for (const glob of globs) {
      if (glob.type === 'ignore') ignores.push(...glob.patterns)
      if (glob.type === 'unignore') ignores.push(...glob.patterns.map((pattern) => `!${pattern}`))
    }
  }

  return { ignores }
}
