# Module: updater/dist/main

## Type Aliases

### UpdaterOptions

Ƭ **UpdaterOptions**: `Object`

Options for the updater function.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `box?` | `Parameters`\<typeof [`box`](styles_dist_main.md#box)\>[``1``] | Configuration options for the box used to display update information. **`Default`** ```ts { title : 'Update available', textAlignment : 'center', titleAlignment : 'center', padding : 1, margin : 1, borderColor : 'yellow', borderStyle : 'round', } ``` |
| `message?` | (`opts`: `UpdaterOptionsMessageParams`) => `string` | - |
| `name` | `string` | The name of the package. |
| `version` | `string` | The current version of the package. |

## Functions

### updater

▸ **updater**(`opts`): `Promise`\<\{ `notify`: () => `void` ; `updateData`: `undefined` \| `UpdateInfo`  }\>

Checks for updates of a package and notifies the user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`UpdaterOptions`](updater_dist_main.md#updateroptions) | Options for the updater. |

#### Returns

`Promise`\<\{ `notify`: () => `void` ; `updateData`: `undefined` \| `UpdateInfo`  }\>

- A promise that resolves to an object with functions for notification and accessing update data.

**`Example`**

```ts
// Simple usage:
import {name. version } from './package.json' assert {type: 'json'};
const { notify, updateData } = await updater( { name, version } );
// Display an update notification if an update is available
notify();
// Print update data wherever you want
if( updateData ) console.log(`Update available: ${updateData.latest} for ${updateData.name}`)
```
