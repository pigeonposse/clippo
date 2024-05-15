# Class: Fs

[fs/dist/main](../modules/fs_dist_main.md).Fs

## Constructors

### constructor

• **new Fs**(): [`Fs`](fs_dist_main.Fs.md)

#### Returns

[`Fs`](fs_dist_main.Fs.md)

## Properties

### #private

• `Private` **#private**: `any`

___

### getAbsolutePath

• **getAbsolutePath**: (...`paths`: `string`[]) => `string`

Resolves path segments into an absolute path.

#### Type declaration

▸ (`...paths`): `string`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...paths` | `string`[] | Path segments to resolve. |

##### Returns

`string`

___

### join

• **join**: (...`paths`: `string`[]) => `string`

Joins path segments.

#### Type declaration

▸ (`...paths`): `string`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...paths` | `string`[] | Path segments to join. |

##### Returns

`string`

___

### localStorage

• **localStorage**: (`location`: `string`) => `LocalStorage`

#### Type declaration

▸ (`location`): `LocalStorage`

Creates a new instance of LocalStorage with the specified location.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | `string` | The location where the local storage data will be stored. |

##### Returns

`LocalStorage`

- A new instance of LocalStorage.

**`See`**

https://www.npmjs.com/package/node-localstorage

**`Example`**

```ts
const storage = localstorage('./myStorage'); // Creates a local storage instance in the './myStorage' directory
storage.setItem('key', 'value'); // Sets an item in the local storage
const value = storage.getItem('key'); // Retrieves the value of the item from the local storage
```

___

### open

• **open**: (`target`: `string`, `options?`: `Options`) => `Promise`\<`ChildProcess`\>

Opens a system file or URL.

#### Type declaration

▸ (`target`, `options?`): `Promise`\<`ChildProcess`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `string` | The file path or URL to open. |
| `options?` | `Options` | - |

##### Returns

`Promise`\<`ChildProcess`\>

___

### openApp

• **openApp**: (`name`: `string` \| readonly `string`[], `options?`: `OpenAppOptions`) => `Promise`\<`ChildProcess`\>

Open an app. Cross-platform.

#### Type declaration

▸ (`name`, `options?`): `Promise`\<`ChildProcess`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` \| readonly `string`[] | The app you want to open. Can be either builtin supported apps names or other name supported in platform. |
| `options?` | `OpenAppOptions` | - |

##### Returns

`Promise`\<`ChildProcess`\>

## Methods

### createDir

▸ **createDir**(`path`): `Promise`\<`void`\>

Creates a directory at the specified path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path of the directory to create. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

If an error occurs while creating the directory.

**`Example`**

```ts
await createDir('./my/dir')
```

___

### createImageFromBase64

▸ **createImageFromBase64**(`base64String`, `outputPath`): `Promise`\<`void`\>

Create an image file from a base64 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base64String` | `string` | Base64 string representing the image. |
| `outputPath` | `string` | Path to save the image file. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

If the base64 string is invalid.

**`Example`**

```ts
const imageBuffer = await createImageFromBase64(base64String)
```

___

### existsDir

▸ **existsDir**(`path`): `Promise`\<`boolean`\>

Checks if a directory exists at the specified path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a directory exists at the specified path, otherwise false.

**`Example`**

```ts
const exist = await existsDir('./my/dir')
```

___

### existsFile

▸ **existsFile**(`path`): `Promise`\<`boolean`\>

Checks if a file exists at the specified path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to the file. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the file exists, otherwise false.

**`Throws`**

If an error occurs while checking the existence of the file.

**`Example`**

```ts
const existPKG = await existsFile('./package.json')
```

___

### existsPath

▸ **existsPath**(`path`): `Promise`\<`boolean`\>

Checks if a file or directory exists at the specified path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a file or directory exists at the specified path, otherwise false.

**`Throws`**

If an error occurs while checking the existence of the path.

**`Example`**

```ts
const existPKG = await existsPath('./package.json')
```

___

### fetchContentToString

▸ **fetchContentToString**(`url`): `Promise`\<`string`\>

Fetch content from a URL to string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | URL of the resource. |

#### Returns

`Promise`\<`string`\>

- The fetched content.

**`Throws`**

If there is an error fetching content from the URL.

**`Example`**

```ts
const imageData = await fetchContentToString('https://source.unsplash.com/random')
console.log(imageData)
```

___

### getObjectFrom

▸ **getObjectFrom**(`input`): `Promise`\<`object`\>

Retrieve an object from either a file specified by path or a URL.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | Path to a file or URL of the resource. |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the file or URL.

**`Throws`**

If there is an error fetching data or parsing the object.

**`Example`**

```ts
const objectFromYamlUrl = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
const objectFromJSON = await getObjectFrom('/my/file.json')
console.log( objectFromYamlUrl, objectFromJSON )
```

___

### getObjectFromFile

▸ **getObjectFromFile**(`path`): `Promise`\<`object`\>

Retrieve an object from a file specified by path.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file. |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the file.

**`Throws`**

If the file does not exist, or if the data is not an object.

**`Example`**

```ts
const objectFromJSON = await getObjectFromFile('/my/file.json')
const objectFromYAML = await getObjectFromFile('/my/file.yaml')
const objectFromTOML = await getObjectFromFile('/my/file.toml')

console.log(
  objectFromJSON,
  objectFromYAML,
  objectFromTOML
)
```

___

### getObjectFromJSONFile

▸ **getObjectFromJSONFile**(`path`): `Promise`\<`object` \| `object`[]\>

Get object from a JSON file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the JSON file. |

#### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

**`Throws`**

If there is an error reading the JSON file.

**`Example`**

```ts
const objectFromJSON = await getObjectFromFile('/my/file.json')
console.log( objectFromJSON )
```

___

### getObjectFromPath

▸ **getObjectFromPath**(`path`, `filename`): `Promise`\<`object`\>

Retrieve an object from a file specified by path and filename.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the directory containing the file. |
| `filename` | `string` | Name of the file (without extension). |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the file.

**`Throws`**

If the file does not exist, or if the data is not an object.

**`Example`**

```ts
const content = await getObjectFromPath('/my/directory', 'my-file-name')
console.log( content )
```

___

### getObjectFromTOMLFile

▸ **getObjectFromTOMLFile**(`path`): `Promise`\<`object` \| `object`[]\>

Get object from a TOML file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the JSON file. |

#### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

**`Throws`**

If there is an error reading the JSON file.

**`Example`**

```ts
const objectFromTOML = await getObjectFromFile('/my/file.toml')
console.log(objectFromTOML)
```

___

### getObjectFromUrl

▸ **getObjectFromUrl**(`url`): `Promise`\<`object`\>

Retrieve an object from a URL.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | URL of the resource. |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the URL.

**`Throws`**

If there is an error fetching data from the URL or parsing the object.

**`Example`**

```ts
// from YAML url
const objectFromYamlUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
// from JSON url
const objectFromJsonUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/clippo/main/package.json')

console.log( objectFromYamlUrl, objectFromJsonUrl )
```

___

### getObjectFromYAMLFile

▸ **getObjectFromYAMLFile**(`path`): `Promise`\<`object` \| `object`[]\>

Get object from a YAML file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the JSON file. |

#### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

**`Throws`**

If there is an error reading the JSON file.

**`Example`**

```ts
const objectFromYAML = await getObjectFromFile('/my/file.yaml')
console.log( objectFromYAML )
```

___

### isDirectory

▸ **isDirectory**(`path`): `Promise`\<`boolean`\>

Checks if the given path points to a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the path points to a directory, otherwise false.

**`Example`**

```ts
const isDir = await isDirectory('./my/path')
```

___

### removeDir

▸ **removeDir**(`path`): `Promise`\<`void`\>

Removes a directory and its contents if it exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path of the directory to remove. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

If an error occurs while removing the directory.

**`Example`**

```ts
try {
  await removeDir('./my/path')
}catch(e){
  console.log(e)
}
```

___

### removeDirIfExist

▸ **removeDirIfExist**(`path`): `Promise`\<`void`\>

Removes a directory and its contents if it exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path of the directory to remove. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

If an error occurs while removing the directory.

**`Example`**

```ts
await removeDirIfExist('./my/path')
```

___

### writeFile

▸ **writeFile**(`path`, `content`): `Promise`\<`void`\>

Writes content to a file at the specified path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path of the file to write to. |
| `content` | `string` \| `Buffer` | The content to write to the file. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

If an error occurs while writing to the file.

**`Example`**

```ts
await writeFile('./greetFile.txt', 'Hello')
```
