# @bearer/logger

[![Version](https://img.shields.io/npm/v/@bearer/logger.svg)](https://npmjs.org/package/@bearer/logger)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@bearer/logger.svg)
[![Downloads/week](https://img.shields.io/npm/dw/@bearer/logger.svg)](https://npmjs.org/package/@bearer/logger)
[![License](https://img.shields.io/npm/l/@bearer/logger.svg)](https://github.com/Bearer/bearer/packages/logger/blob/master/package.json)

## Usage

We recommend to create a logger file within you project

```ts
// my-logger.ts
import debug from '@bearer/logger'

export default () => debug('my-package-name')
```

then in your app

```ts
import debug from 'path/to/my-logger'

const logger = debug()
logger('message to debug')
logger({ object: 'something' })

// sub logger

const subLogger = logger.extend('sub-feature')
subLogger('blablabl')
```

You'll need to set `DEBUG=*` to see all logs or `DEBUG=bearer:my-package-name` to see logs produced by your application.

### Browser support

We assume you are writing a bearer integration.

_views/src/my-component.tsx_

```tsx
import debug from '@bearer/logger'

const logger = debug('a-scope-you-provide')

class MyComponent {
  componentDidLoad() {
    logger('Loaded')
  }
}
```

if you want to see logs you must enable it by setting the `localStorage.debug` value from your console

**Show all logs**

```js
localStorage.debug = '*'
```

**Show bearer logs only**

```js
localStorage.debug = 'bearer:*'
```

**Show your integration logs only**

```js
localStorage.debug = 'bearer:a-scope-you-provide:*'
```
