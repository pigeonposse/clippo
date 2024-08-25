# @clippo/fs

## Classes

### Fs

#### Constructors

##### new Fs()

```ts
new Fs(): Fs
```

###### Returns

[`Fs`](README.md#fs)

#### Properties

| Property | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `getAbsolutePath` | (...`paths`: `string`[]) => `string` | `resolve` | Resolves path segments into an absolute path. **Param** Path segments to resolve. |
| `localStorage` | (`location`: `string`) => `LocalStorage` | `localStorage` | - |
| `open` | (`target`: `string`, `options`?: `Options`) => `Promise`\<`ChildProcess`\> | `open` | Opens a system file or URL. **Param** The file path or URL to open. |
| `openApp` | (`name`: `string` \| readonly `string`[], `options`?: `OpenAppOptions`) => `Promise`\<`ChildProcess`\> | `openApp` | Open an app. Cross-platform. **Param** The app you want to open. Can be either builtin supported apps names or other name supported in platform. |

#### Methods

##### createDir()

```ts
createDir(path): Promise<void>
```

Creates a directory at the specified path.

###### Parameters

• **path**: `string`

The path of the directory to create.

###### Returns

`Promise`\<`void`\>

###### Throws

If an error occurs while creating the directory.

###### Example

```ts
await createDir('./my/dir')
```

##### createImageFromBase64()

```ts
createImageFromBase64(base64String, outputPath): Promise<void>
```

Create an image file from a base64 string.

###### Parameters

• **base64String**: `string`

Base64 string representing the image.

• **outputPath**: `string`

Path to save the image file.

###### Returns

`Promise`\<`void`\>

###### Throws

If the base64 string is invalid.

###### Example

```ts
const imageBuffer = await createImageFromBase64(base64String)
```

##### existsDir()

```ts
existsDir(path): Promise<boolean>
```

Checks if a directory exists at the specified path.

###### Parameters

• **path**: `string`

The path to check.

###### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a directory exists at the specified path, otherwise false.

###### Example

```ts
const exist = await existsDir('./my/dir')
```

##### existsFile()

```ts
existsFile(path): Promise<boolean>
```

Checks if a file exists at the specified path.

###### Parameters

• **path**: `string`

The path to the file.

###### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the file exists, otherwise false.

###### Throws

If an error occurs while checking the existence of the file.

###### Example

```ts
const existPKG = await existsFile('./package.json')
```

##### existsPath()

```ts
existsPath(path): Promise<boolean>
```

Checks if a file or directory exists at the specified path.

###### Parameters

• **path**: `string`

The path to check.

###### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a file or directory exists at the specified path, otherwise false.

###### Throws

If an error occurs while checking the existence of the path.

###### Example

```ts
const existPKG = await existsPath('./package.json')
```

##### fetchContentToString()

```ts
fetchContentToString(url): Promise<string>
```

Fetch content from a URL to string.

###### Parameters

• **url**: `string`

URL of the resource.

###### Returns

`Promise`\<`string`\>

- The fetched content.

###### Throws

If there is an error fetching content from the URL.

###### Example

```ts
const imageData = await fetchContentToString('https://source.unsplash.com/random')
console.log(imageData)
```

##### getObjectFrom()

```ts
getObjectFrom(input): Promise<object>
```

Retrieve an object from either a file specified by path or a URL.
Supports JSON, YAML, and TOML formats.

###### Parameters

• **input**: `string`

Path to a file or URL of the resource.

###### Returns

`Promise`\<`object`\>

- The object retrieved from the file or URL.

###### Throws

If there is an error fetching data or parsing the object.

###### Example

```ts
const objectFromYamlUrl = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
const objectFromJSON = await getObjectFrom('/my/file.json')
console.log( objectFromYamlUrl, objectFromJSON )
```

##### getObjectFromFile()

```ts
getObjectFromFile(path): Promise<object>
```

Retrieve an object from a file specified by path.
Supports JSON, YAML, and TOML formats.

###### Parameters

• **path**: `string`

Path to the file.

###### Returns

`Promise`\<`object`\>

- The object retrieved from the file.

###### Throws

If the file does not exist, or if the data is not an object.

###### Example

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

##### getObjectFromJSONFile()

```ts
getObjectFromJSONFile(path): Promise<object | object[]>
```

Get object from a JSON file.

###### Parameters

• **path**: `string`

Path to the JSON file.

###### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

###### Throws

If there is an error reading the JSON file.

###### Example

```ts
const objectFromJSON = await getObjectFromFile('/my/file.json')
console.log( objectFromJSON )
```

##### getObjectFromPath()

```ts
getObjectFromPath(path, filename): Promise<object>
```

Retrieve an object from a file specified by path and filename.
Supports JSON, YAML, and TOML formats.

###### Parameters

• **path**: `string`

Path to the directory containing the file.

• **filename**: `string`

Name of the file (without extension).

###### Returns

`Promise`\<`object`\>

- The object retrieved from the file.

###### Throws

If the file does not exist, or if the data is not an object.

###### Example

```ts
const content = await getObjectFromPath('/my/directory', 'my-file-name')
console.log( content )
```

##### getObjectFromTOMLFile()

```ts
getObjectFromTOMLFile(path): Promise<object | object[]>
```

Get object from a TOML file.

###### Parameters

• **path**: `string`

Path to the JSON file.

###### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

###### Throws

If there is an error reading the JSON file.

###### Example

```ts
const objectFromTOML = await getObjectFromFile('/my/file.toml')
console.log(objectFromTOML)
```

##### getObjectFromUrl()

```ts
getObjectFromUrl(url): Promise<object>
```

Retrieve an object from a URL.
Supports JSON, YAML, and TOML formats.

###### Parameters

• **url**: `string`

URL of the resource.

###### Returns

`Promise`\<`object`\>

- The object retrieved from the URL.

###### Throws

If there is an error fetching data from the URL or parsing the object.

###### Example

```ts
// from YAML url
const objectFromYamlUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
// from JSON url
const objectFromJsonUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/clippo/main/package.json')

console.log( objectFromYamlUrl, objectFromJsonUrl )
```

##### getObjectFromYAMLFile()

```ts
getObjectFromYAMLFile(path): Promise<object | object[]>
```

Get object from a YAML file.

###### Parameters

• **path**: `string`

Path to the JSON file.

###### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

###### Throws

If there is an error reading the JSON file.

###### Example

```ts
const objectFromYAML = await getObjectFromFile('/my/file.yaml')
console.log( objectFromYAML )
```

##### isDirectory()

```ts
isDirectory(path): Promise<boolean>
```

Checks if the given path points to a directory.

###### Parameters

• **path**: `string`

The path to check.

###### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the path points to a directory, otherwise false.

###### Example

```ts
const isDir = await isDirectory('./my/path')
```

##### join()

```ts
join(...paths): string
```

Joins path segments.

###### Parameters

• ...**paths**: `string`[]

Path segments to join.

###### Returns

`string`

- The joined path.

###### Example

```ts
join('user', 'pigeonposse')
```

##### removeDir()

```ts
removeDir(path): Promise<void>
```

Removes a directory and its contents if it exists.

###### Parameters

• **path**: `string`

The path of the directory to remove.

###### Returns

`Promise`\<`void`\>

###### Throws

If an error occurs while removing the directory.

###### Example

```ts
try {
  await removeDir('./my/path')
}catch(e){
  console.log(e)
}
```

##### removeDirIfExist()

```ts
removeDirIfExist(path): Promise<void>
```

Removes a directory and its contents if it exists.

###### Parameters

• **path**: `string`

The path of the directory to remove.

###### Returns

`Promise`\<`void`\>

###### Throws

If an error occurs while removing the directory.

###### Example

```ts
await removeDirIfExist('./my/path')
```

##### writeFile()

```ts
writeFile(path, content): Promise<void>
```

Writes content to a file at the specified path.

###### Parameters

• **path**: `string`

The path of the file to write to.

• **content**: `string` \| `Buffer`

The content to write to the file.

###### Returns

`Promise`\<`void`\>

###### Throws

If an error occurs while writing to the file.

###### Example

```ts
await writeFile('./greetFile.txt', 'Hello')
```
