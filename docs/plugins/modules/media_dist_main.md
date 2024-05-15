# Module: media/dist/main

## Type Aliases

### GifOptions

Ƭ **GifOptions**: `Parameters`\<typeof `terminalImage.gifFile`\>[``1``]

___

### GraphicInput

Ƭ **GraphicInput**: `string` \| `Readonly`\<`Buffer`\>

___

### ImageOptions

Ƭ **ImageOptions**: `ImageParams` & \{ `asciiOptions?`: `ImageToAsciiParams` ; `asciiOutput?`: `boolean`  }

## Functions

### gif

▸ **gif**(`input`, `options?`): `Promise`\<() => `void`\>

Display a GIF in the terminal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`GraphicInput`](media_dist_main.md#graphicinput) | Input to the gif PATH, URL or BUFFER. |
| `options?` | `Readonly`\<\{ `height?`: `string` \| `number` ; `maximumFrameRate?`: `number` ; `renderFrame?`: `RenderFrame` ; `width?`: `string` \| `number`  }\> | Options to customize the display of the GIF. |

#### Returns

`Promise`\<() => `void`\>

- Promise that resolves with the GIF formatted for the terminal.

**`Example`**

```ts
// simple use with url
await gif( 'https://64.media.tumblr.com/38adef3da23d26058e3085ce271b39c1/tumblr_nil77wk20l1qhnszoo1_400.gifv' )

// simple use with path
await gif( './my-gif.gif' )
```

___

### image

▸ **image**(`input`, `options?`): `Promise`\<`string`\>

Return an image for been print.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`GraphicInput`](media_dist_main.md#graphicinput) | Input to the image PATH, URL or BUFFER. Format suppported: PNG and JPEG. |
| `options?` | [`ImageOptions`](media_dist_main.md#imageoptions) | Options to customize the display of the image. |

#### Returns

`Promise`\<`string`\>

- Promise that resolves with the image formatted for the terminal.

**`Example`**

```ts
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
