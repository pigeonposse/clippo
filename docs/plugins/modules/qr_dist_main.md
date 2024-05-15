# Module: qr/dist/main

## Type Aliases

### QRcodeOpts

Ƭ **QRcodeOpts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `small` | `boolean` |

## Functions

### qrcode

▸ **qrcode**(`input`, `opts?`): `Promise`\<`string`\>

Generates a QR code string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The input string to generate the QR code from. |
| `opts?` | [`QRcodeOpts`](qr_dist_main.md#qrcodeopts) | Optional options for generating the QR code. |

#### Returns

`Promise`\<`string`\>

- A promise that resolves with the generated QR code string.

**`Example`**

```ts
try {
  const qrString = await qrcode('https://clippo.pigeonposse.com');
  console.log(qrString);
} catch (error) {
  console.error('Error generating QR code:', error);
}
```
