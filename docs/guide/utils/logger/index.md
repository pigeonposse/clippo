---
outline: [2,3]
---

# 📝 Logger

Fast and modern logger ready to use. Print to console and export to JSON if desired. Built for CLIPPO and designed for CLI and backend tools

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/logger?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/logger?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/logger)

## Installation

```bash
npm i @clippo/logger
# or
pnpm i @clippo/logger
# or
yarn add @clippo/logger
```

## Classes

### Logger

Class for logger.

#### Constructors

##### new Logger()

```ts
new Logger(params?: LoggerParams): Logger
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `params`? | [`LoggerParams`](index.md#loggerparams) |

###### Returns

[`Logger`](index.md#logger)

#### Methods

##### addTimeout()

```ts
addTimeout(processModule?: Process): void
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `processModule`? | `Process` |

###### Returns

`void`

##### codeError()

```ts
codeError(data: object): Promise<void>
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `object` |

###### Returns

`Promise`\<`void`\>

##### codeFatal()

```ts
codeFatal(data: object): Promise<void>
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `object` |

###### Returns

`Promise`\<`void`\>

##### debug()

```ts
debug(data: string | object): void
```

Log data as debug if verbosity is enabled.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` \| `object` | Data to log. |

###### Returns

`void`

###### Example

```ts
loggerInstance.debug('Lorem ipsum')
```

##### error()

```ts
error(data: string | object): void
```

Log data as error.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` \| `object` | Data to log. |

###### Returns

`void`

###### Example

```ts
loggerInstance.error('Lorem ipsum')
```

##### fatal()

```ts
fatal(data: string | object): void
```

Log data as fatal error and exit process.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` \| `object` | Data to log. |

###### Returns

`void`

###### Example

```ts
loggerInstance.fatal('Lorem ipsum')
```

##### info()

```ts
info(data: string | object): void
```

Log data as info.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` \| `object` | Data to log. |

###### Returns

`void`

###### Example

```ts
loggerInstance.info('Lorem ipsum')
```

##### spinner()

```ts
spinner(prefix: string): {
  failed: (text: string) => void;
  getTime: () => undefined | number;
  getTimeResult: () => undefined | number;
  reset: () => void;
  start: (text: string) => void;
  succeed: (text: string) => void;
  update: (text: string) => void;
}
```

Spinner function.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `prefix` | `string` | Prefix for spinner instance. |

###### Returns

```ts
{
  failed: (text: string) => void;
  getTime: () => undefined | number;
  getTimeResult: () => undefined | number;
  reset: () => void;
  start: (text: string) => void;
  succeed: (text: string) => void;
  update: (text: string) => void;
}
```

- Returns Spinner type.

| Name | Type | Description |
| ------ | ------ | ------ |
| `failed` | (`text`: `string`) => `void` | Fail the spinner with provided text. |
| `getTime` | () => `undefined` \| `number` | Get elapsed time of spinner. |
| `getTimeResult` | () => `undefined` \| `number` | Get time result of spinner from start to stop. |
| `reset` | () => `void` | Reset spinner. |
| `start` | (`text`: `string`) => `void` | Start the spinner with provided text. |
| `succeed` | (`text`: `string`) => `void` | Succeed the spinner with provided text. |
| `update` | (`text`: `string`) => `void` | Change text of spinner. |

###### Example

```ts
const spinner = loggerInstance.spinner('prefix')
```

##### success()

```ts
success(data: string | object): void
```

Log data as success.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` \| `object` | Data to log. |

###### Returns

`void`

###### Example

```ts
loggerInstance.success('Lorem ipsum')
```

##### warn()

```ts
warn(data: string | object, force: boolean): void
```

Log data as warning if verbosity is enabled.

###### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `data` | `string` \| `object` | `undefined` | Data to log. |
| `force` | `boolean` | `false` | Force print regardless of verbosity. |

###### Returns

`void`

###### Example

```ts
loggerInstance.warn('Lorem ipsum')
```

#### Properties

| Property | Modifier | Type | Default value |
| ------ | ------ | ------ | ------ |
| `levels` | `public` | \{ `debug`: `'debug'`; `error`: `'error'`; `fatal`: `'fatal'`; `info`: `'info'`; `success`: `'success'`; `warn`: `'warn'`; \} | `levels` |
| `levels.debug` | `readonly` | `"debug"` | `'debug'` |
| `levels.error` | `readonly` | `"error"` | `'error'` |
| `levels.fatal` | `readonly` | `"fatal"` | `'fatal'` |
| `levels.info` | `readonly` | `"info"` | `'info'` |
| `levels.success` | `readonly` | `"success"` | `'success'` |
| `levels.warn` | `readonly` | `"warn"` | `'warn'` |
| `verbose` | `public` | `boolean` | `false` |

## Type Aliases

### LoggerParams

```ts
type LoggerParams: {
  format: (v: object) => string;
  level: ObjectValues<typeof levels>;
  name: string;
  outputFile: string;
  screenlog: boolean;
};
```

Configuration parameters for the Logger class.

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `format` | (`v`: `object`) => `string` | A function to customize the format of log messages. |
| `level` | `ObjectValues`\<*typeof* `levels`\> | Determinate the level of logger. **Default** `debug` |
| `name` | `string` | The name of the logger. **Default** `undefined` |
| `outputFile` | `string` | The path to the output file where logs will be written. **Default** `undefined` |
| `screenlog` | `boolean` | Determines whether logs should be printed to the console. **Default** `true` |

## Utils Index

[Go to index](../index.md) 👈
