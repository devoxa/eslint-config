const fs = require('fs')
const eslint = require('@eslint/js')
const tsEslint = require('typescript-eslint')
const parseGitignore = require('parse-gitignore')
const eslintConfigPrettier = require('eslint-config-prettier')
const eslintPluginReact = require('eslint-plugin-react/configs/recommended')

module.exports = function (ignorePaths, configs = []) {
  return tsEslint.config(
    // Support ignore files (e.g. gitignore) for linting
    ignorePathsToIgnores(ignorePaths),
    { ignores: ['eslint.config.js', 'eslint-config.js'] },

    // Recommended config for linting with type information
    eslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,

    // Linting with React/JSX support
    eslintPluginReact,

    // Disable rules that conflict with Prettier
    eslintConfigPrettier,

    // Language options for parsing TS files
    {
      languageOptions: {
        parserOptions: {
          project: 'tsconfig.json',
          sourceType: 'module',
          warnOnUnsupportedTypeScriptVersion: false,
        },
      },
    },

    // Custom rule overrides
    {
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

        // Make sure comments are starting with an uppercase letter, to encourage correct grammar
        'capitalized-comments': [
          'warn',
          'always',
          { ignorePattern: 'prettier|c8', ignoreConsecutiveComments: true },
        ],

        // Disable specific syntax features
        'no-restricted-syntax': [
          'error',
          // Don't allow TS enums at all, since they have multiple unintuitive footguns
          {
            selector: 'TSEnumDeclaration',
            message: 'Unexpected enum. Use a literal string union or a const object instead.',
          },
        ],
      },
    },

    // Any additional configs that are passed in
    ...configs
  )
}

function ignorePathsToIgnores(ignorePaths) {
  const ignores = []

  for (const path of ignorePaths) {
    const content = fs.readFileSync(path, 'utf8')

    const parsed = parseGitignore(`${content}\n`)
    const globs = parsed.globs()

    for (const glob of globs) {
      if (glob.type === 'ignore') ignores.push(...glob.patterns)
      if (glob.type === 'unignore') ignores.push(...glob.patterns.map((x) => `!${x}`))
    }
  }

  return { ignores }
}
