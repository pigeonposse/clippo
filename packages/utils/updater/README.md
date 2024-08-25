# CLIPPO | Updater 🔄

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

## More info

- [Documentation](https://clippo.pigeonposse.com/)
- [Installation](https://clippo.pigeonposse.com/guide/getting-started#installation)

## 👨‍💻 Development

**CLIPPO** is an open-source project and its development is open to anyone who wants to participate.

[![Issues](https://img.shields.io/badge/Issues-grey?style=for-the-badge)](https://github.com/pigeonposse/clippo/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=for-the-badge)](https://github.com/pigeonposse/clippo/pulls)
[![Read more](https://img.shields.io/badge/Read%20more-grey?style=for-the-badge)](https://clippo.pigeonposse.com/)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=for-the-badge)](https://pigeonposse.com/?popup=donate)

## 📜 License

This software is licensed with **[GPL-3.0](/LICENSE)**.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](/LICENSE)

## 🐦 About us

*PigeonPosse* is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=for-the-badge)](https://github.com/pigeonposse)

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="https://github.com/angelespejo.png?size=72" alt="Angelo" style="border-radius:100%"/> | Angelo |   Author & Development   | [@Angelo](https://github.com/angelespejo) |
| <img src="https://github.com/PigeonPosse.png?size=72" alt="PigeonPosse" style="border-radius:100%"/> | PigeonPosse | Collective | [@PigeonPosse](https://github.com/PigeonPosse) |

<br>
<p align="center">

[![Web](https://img.shields.io/badge/Web-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com)
[![About Us](https://img.shields.io/badge/About%20Us-grey?style=for-the-badge&logoColor=white)](https://pigeonposse.com?popup=about)
[![Donate](https://img.shields.io/badge/Donate-pink?style=for-the-badge&logoColor=white)](https://pigeonposse.com/?popup=donate)
[![Github](https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigeonposse)
[![Twitter](https://img.shields.io/badge/Twitter-black?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/pigeonposse_)
[![Instagram](https://img.shields.io/badge/Instagram-black?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/pigeon.posse/)
[![Medium](https://img.shields.io/badge/Medium-black?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@pigeonposse)

</p>

<!--
██████╗ ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║
██████╔╝██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║
██╔═══╝ ██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║
██║     ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║
╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
                                               
██████╗  ██████╗ ███████╗███████╗███████╗      
██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝      
██████╔╝██║   ██║███████╗███████╗█████╗        
██╔═══╝ ██║   ██║╚════██║╚════██║██╔══╝        
██║     ╚██████╔╝███████║███████║███████╗      
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝      
                                               
█████╗█████╗█████╗█████╗█████╗█████╗█████╗     
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝     
                                               
 ██████╗██╗     ██╗██████╗ ██████╗  ██████╗    
██╔════╝██║     ██║██╔══██╗██╔══██╗██╔═══██╗   
██║     ██║     ██║██████╔╝██████╔╝██║   ██║   
██║     ██║     ██║██╔═══╝ ██╔═══╝ ██║   ██║   
╚██████╗███████╗██║██║     ██║     ╚██████╔╝   
 ╚═════╝╚══════╝╚═╝╚═╝     ╚═╝      ╚═════╝    
                                                
REPOSITORY: https://github.com/pigeonposse/clippo
AUTHORS: 
	- Angelo (https://github.com/angelespejo)

BY PigeonPosse 🐦🌈

-->
