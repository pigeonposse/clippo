# CLIPPO | QR Code Generator 🔢

Print utils, such as colors, gradients, images, icons, links, tables, columns, QRs code hightlight etc. Built for CLIPPO and designed for CLI and backend tools

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/qr?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/qr?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/qr)

## Installation

```bash
npm i @clippo/qr
# or
pnpm i @clippo/qr
# or
yarn add @clippo/qr
```

## Functions

### qrcode()

```ts
function qrcode(input: string, opts?: QRcodeOpts): Promise<string>
```

Generates a QR code string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The input string to generate the QR code from. |
| `opts`? | [`QRcodeOpts`](index.md#qrcodeopts) | Optional options for generating the QR code. |

#### Returns

`Promise`\<`string`\>

- A promise that resolves with the generated QR code string.

#### Example

```ts
import { qrcode } from "@clippo/qr"
try {
  const qrString = await qrcode('https://clippo.pigeonposse.com');
  console.log(qrString);
} catch (error) {
  console.error('Error generating QR code:', error);
}
```

## Type Aliases

### QRcodeOpts

```ts
type QRcodeOpts: {
  small: boolean;
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `small` | `boolean` |

## Examples

```js
import { qrcode } from '@clippo/qr'
( async () => {

 try {

  const qrString = await qrcode( 'https://clippo.pigeonposse.com' )
  console.log( qrString )
 
 } catch ( error ) {

  console.error( 'Error generating QR code:', error )
 
 }

} )()
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
