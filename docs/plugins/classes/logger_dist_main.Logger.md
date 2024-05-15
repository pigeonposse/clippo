# Class: Logger

[logger/dist/main](../modules/logger_dist_main.md).Logger

Class for logger.

## Constructors

### constructor

• **new Logger**(`params?`): [`Logger`](logger_dist_main.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`LoggerParams`](../modules/logger_dist_main.md#loggerparams) |

#### Returns

[`Logger`](logger_dist_main.Logger.md)

## Properties

### #private

• `Private` **#private**: `any`

___

### levels

• **levels**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | ``"debug"`` |
| `error` | ``"error"`` |
| `fatal` | ``"fatal"`` |
| `info` | ``"info"`` |
| `success` | ``"success"`` |
| `warn` | ``"warn"`` |

___

### verbose

• **verbose**: `boolean`

## Methods

### addTimeout

▸ **addTimeout**(`processModule?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `processModule?` | `Process` |

#### Returns

`void`

___

### codeError

▸ **codeError**(`data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `object` |

#### Returns

`Promise`\<`void`\>

___

### codeFatal

▸ **codeFatal**(`data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `object` |

#### Returns

`Promise`\<`void`\>

___

### debug

▸ **debug**(`data`): `void`

Log data as debug if verbosity is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | Data to log. |

#### Returns

`void`

**`Example`**

```ts
loggerInstance.debug('Lorem ipsum')
```

___

### error

▸ **error**(`data`): `void`

Log data as error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | Data to log. |

#### Returns

`void`

**`Example`**

```ts
loggerInstance.error('Lorem ipsum')
```

___

### fatal

▸ **fatal**(`data`): `void`

Log data as fatal error and exit process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | Data to log. |

#### Returns

`void`

**`Example`**

```ts
loggerInstance.fatal('Lorem ipsum')
```

___

### info

▸ **info**(`data`): `void`

Log data as info.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | Data to log. |

#### Returns

`void`

**`Example`**

```ts
loggerInstance.info('Lorem ipsum')
```

___

### spinner

▸ **spinner**(`prefix`): `Object`

Spinner function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | Prefix for spinner instance. |

#### Returns

`Object`

- Returns Spinner type.

| Name | Type |
| :------ | :------ |
| `failed` | (`text`: `string`) => `void` |
| `getTime` | () => `undefined` \| `number` |
| `getTimeResult` | () => `undefined` \| `number` |
| `reset` | () => `void` |
| `start` | (`text`: `string`) => `void` |
| `succeed` | (`text`: `string`) => `void` |
| `update` | (`text`: `string`) => `void` |

**`Example`**

```ts
const spinner = loggerInstance.spinner('prefix')
```

___

### success

▸ **success**(`data`): `void`

Log data as success.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | Data to log. |

#### Returns

`void`

**`Example`**

```ts
loggerInstance.success('Lorem ipsum')
```

___

### warn

▸ **warn**(`data`, `force?`): `void`

Log data as warning if verbosity is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `object` | Data to log. |
| `force?` | `boolean` | Force print regardless of verbosity. |

#### Returns

`void`

**`Example`**

```ts
loggerInstance.warn('Lorem ipsum')
```
