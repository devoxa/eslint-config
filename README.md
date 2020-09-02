<!-- Title -->
<h1 align="center">
  eslint-config
</h1>

<!-- Description -->
<h4 align="center"> 
  The <a href="https://eslint.org/docs/developer-guide/shareable-configs">shareable configuration</a>
  for <a href="https://eslint.org/">ESLint</a> used in all Devoxa projects
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@devoxa/eslint-config">
    <img
      src="https://img.shields.io/npm/v/@devoxa/eslint-config?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/devoxa/eslint-config/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/devoxa/eslint-config/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#extending">Extending</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

```bash
yarn add --dev eslint @devoxa/eslint-config
```

The configuration also has a peer dependency on `typescript@^3.9.2`.

## Usage

To enable the rules, add a `eslintConfig` property in your `package.json`. See the
[ESLint configuration docs](https://eslint.org/docs/user-guide/configuring) for more details.

```json
"eslintConfig": {
  "extends": "@devoxa"
},
```

Since the ESLint configuration is for TypeScript projects it is also required that you have a
`tsconfig.json` file configured.

It is also recommended to add the following script to your `package.json` for easy usage.

```json
"lint": "eslint --ignore-path='.gitignore' '{src,tests}/**/*.ts'",
```

## Extending

This configuration is not intended to be changed, but if you have a setup where modification is
required, it is possible. See the [ESLint docs](https://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/eslint-config/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/eslint-config/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/eslint-config/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
