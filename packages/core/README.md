# Bearer Core

[![Version](https://img.shields.io/npm/v/@bearer/core.svg)](https://npmjs.org/package/@bearer/core)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@bearer/core.svg)
[![Downloads/week](https://img.shields.io/npm/dw/@bearer/core.svg)](https://npmjs.org/package/@bearer/core)
[![License](https://img.shields.io/npm/l/@bearer/core.svg)](https://github.com/Bearer/bearer/packages/cli/blob/master/package.json)


Bearer Core contains helpers and business logic that you must use if you want create new components and interact with Bearer servers.

- Authentication
- Networks helpers
- Decorators [README](./src/README/md)

## Development

Build a local bundle

```bash
cp .env{.example,}

yarn build
yarn link
```

Somewhere else in a different repository

```bash
yarn link "@bearer/core"
```
