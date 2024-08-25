---
outline: [2,3]
---

# 🔢 QR Code Generator

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

## Utils Index

[Go to index](../index.md) 👈
