# CLIPPO | Media 🎬

Print image or gifs in a terminal. Built for CLIPPO and designed for CLI and backend tools

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/media?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/media?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/media)

## Installation

```bash
npm i @clippo/media
# or
pnpm i @clippo/media
# or
yarn add @clippo/media
```

## Functions

### gif()

```ts
function gif(input: GraphicInput, options?: Readonly<{
  height: string | number;
  maximumFrameRate: number;
  renderFrame: RenderFrame;
  width: string | number;
}>): Promise<() => void>
```

**`Experimental`**

Display a GIF in the terminal.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`GraphicInput`](index.md#graphicinput) |
| `options`? | `Readonly`\<\{ `height`: `string` \| `number`; `maximumFrameRate`: `number`; `renderFrame`: `RenderFrame`; `width`: `string` \| `number`; \}\> |

#### Returns

`Promise`\<() => `void`\>

- Promise that resolves with the GIF formatted for the terminal.

#### Param

Input to the gif PATH, URL or BUFFER.

#### Param

Options to customize the display of the GIF.

#### Example

```ts
import { gif } from '@clippo/media'

// simple use with url
await gif( 'https://64.media.tumblr.com/38adef3da23d26058e3085ce271b39c1/tumblr_nil77wk20l1qhnszoo1_400.gifv' )

// simple use with path
await gif( './my-gif.gif' )
```

***

### image()

```ts
function image(input: GraphicInput, options?: ImageOptions): Promise<string>
```

Return an image for been print.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`GraphicInput`](index.md#graphicinput) | Input to the image PATH, URL or BUFFER. Format suppported: PNG and JPEG. |
| `options`? | [`ImageOptions`](index.md#imageoptions) | Options to customize the display of the image. |

#### Returns

`Promise`\<`string`\>

- Promise that resolves with the image formatted for the terminal.

#### Example

```ts
import { image } from '@clippo/media'

// simple use with url
const IMG = await image( 'https://avatars.githubusercontent.com/u/111685953' )
console.log( IMG )

// simple use with path
const IMG = await image( './image.png' )
console.log( IMG )

// ascii output
const IMG = await image('https://avatars.githubusercontent.com/u/111685953', 
   { asciiOutput: true }
);
console.log(IMG);

// ascii output with custom opts
const IMG = await image(imageUrl, {
    width: 50,
    height: 20,
    preserveAspectRatio: true,
    asciiOutput: true,
    asciiOptions: {
        colored: true,
    }
);
console.log(IMG);
```

## Type Aliases

### GifOptions

```ts
type GifOptions: Parameters<typeof terminalImage.gifFile>[1];
```

***

### GraphicInput

```ts
type GraphicInput: string | Readonly<Buffer>;
```

***

### ImageOptions

```ts
type ImageOptions: ImageParams & {
  asciiOptions: ImageToAsciiParams;
  asciiOutput: boolean;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `asciiOptions` | `ImageToAsciiParams` | Options for asciiOutput. |
| `asciiOutput` | `boolean` | Enable a ascii output. **Default** `false` |

## Examples

```js
import {
 gif, image, 
} from '@clippo/media'

const IMG = await image( 'https://avatars.githubusercontent.com/u/111685953', {
 width  : 50,
 height : 50,
} )
console.log( IMG )

const ASCII_IMG = await image( 'https://avatars.githubusercontent.com/u/111685953?size=50', {
 width        : 20,
 height       : 20,
 asciiOutput  : true,
 asciiOptions : {
  pxWidth : 4,
  colored : false,
 },
} )
console.log( ASCII_IMG )

await gif( 'https://64.media.tumblr.com/38adef3da23d26058e3085ce271b39c1/tumblr_nil77wk20l1qhnszoo1_400.gifv', {
 width  : 40,
 height : 40,
} )
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
