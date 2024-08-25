---
outline: [2,3]
---

# 🔄 Updater

Simple update notifier for npm packages. Created for CLIPPO, available to everyone

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/updater?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/updater?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/updater)

## Installation

```bash
npm i @clippo/updater
# or
pnpm i @clippo/updater
# or
yarn add @clippo/updater
```

## Functions

### updater()

```ts
function updater(opts: UpdaterOptions): Promise<{
  notify: () => void;
  updateData: up.update;
}>
```

Checks for updates of a package and notifies the user.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts` | [`UpdaterOptions`](index.md#updateroptions) | Options for the updater. |

#### Returns

`Promise`\<\{
  `notify`: () => `void`;
  `updateData`: `up.update`;
 \}\>

- A promise that resolves to an object with functions for notification and accessing update data.

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `notify` | () => `void` | - | Displays the update notification. **Example** `import {name. version } from './package.json' assert {type: 'json'}; const { notify } = await updater( { name, version } ); // Display an update notification if an update is available notify();` |
| `updateData` | `undefined` \| `UpdateInfo` | up.update | Returns the update data. |

#### Example

```ts
// Simple usage:
import {name. version } from './package.json' assert {type: 'json'};
const { notify, updateData } = await updater( { name, version } );
// Display an update notification if an update is available
notify();
// Print update data wherever you want
if( updateData ) console.log(`Update available: ${updateData.latest} for ${updateData.name}`)
```

## Type Aliases

### UpdaterOptions

```ts
type UpdaterOptions: {
  box: Parameters<typeof box>[1];
  message: (opts: UpdaterOptionsMessageParams) => string;
  name: string;
  version: string;
};
```

Options for the updater function.

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `box` | `Parameters`\<*typeof* `box`\>\[`1`\] | Configuration options for the box used to display update information. **Default** `{ title : 'Update available', textAlignment : 'center', titleAlignment : 'center', padding : 1, margin : 1, borderColor : 'yellow', borderStyle : 'round', }` |
| `message` | (`opts`: `UpdaterOptionsMessageParams`) => `string` | A custom message function to display update information. |
| `name` | `string` | The name of the package. |
| `version` | `string` | The current version of the package. |

## Examples

```js
// import { updater } from '@clippo/updater'
import { updater } from '../dist/main.js'

const { notify, updateData } = await updater( {
 name : '@clippo/updater', version : '0.0.1', 
} )

console.log( updateData )
// Display an update notification if an update is available
notify()
// Print update data wherever you want
if( updateData ) console.log( `Update available: ${updateData.latest} for ${updateData.name}` )
```

## Utils Index

[Go to index](../index.md) 👈
