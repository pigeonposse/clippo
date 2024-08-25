# CLIPPO | File System 📂

File system functions for utilities. Created for CLIPPO, designed for cli and backend libraries

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/fs?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/fs?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/fs)

## Installation

```bash
npm i @clippo/fs
# or
pnpm i @clippo/fs
# or
yarn add @clippo/fs
```

## Functions

### cache()

```ts
function cache<K>(params: {
  id: string;
  projectName: string;
  values: Record<K, unknown>;
 }): Promise<{
  get: (v?: K) => Record<K, unknown> | Value;
  set: (obj: Record<K, unknown>) => void;
  values: Record<K, unknown>;
}>
```

Creates a caching mechanism for storing and retrieving values.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `string` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `object` | Parameters for configuring the cache. |
| `params.id` | `string` | Identifier for the values. |
| `params.projectName` | `string` | Project name for search cache. |
| `params.values` | `Record`\<`K`, `unknown`\> | Cache Values. |

#### Returns

`Promise`\<\{
  `get`: (`v`?: `K`) => `Record`\<`K`, `unknown`\> \| `Value`;
  `set`: (`obj`: `Record`\<`K`, `unknown`\>) => `void`;
  `values`: `Record`\<`K`, `unknown`\>;
 \}\>

- An object with methods to interact with the cache.

| Name | Type |
| ------ | ------ |
| `get` | (`v`?: `K`) => `Record`\<`K`, `unknown`\> \| `Value` |
| `set` | (`obj`: `Record`\<`K`, `unknown`\>) => `void` |
| `values` | `Record`\<`K`, `unknown`\> |

#### Throws

If the cache value is unexpected or not found.

#### Example

```ts
import { cache } from "@clippo/fs"

const { get, set } = await cache({
  id: 'userSettings',
  values: { theme: 'dark', language: 'en' },
  projectName: 'myApp',
});

// Set a new value in the cache
set({ theme: 'light' });

// Retrieve a value from the cache
const theme = get('theme');
console.log(theme); // Output: 'light'

// Retrieve all cached values
const allValues = get();
console.log(allValues); // Output: { theme: 'light', language: 'en' }

// Handle unexpected cache value
try {
  const nonExistentValue = get('nonExistent');
} catch (error) {
  console.error('Error:', error.message); // Output: Cache value is unexpected: nonExistent
}
```

***

### createDir()

```ts
function createDir(path: string): Promise<void>
```

Creates a directory at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the directory to create. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while creating the directory.

#### Example

```ts
import { createDir } from '@clippo/fs'
await createDir('./my/dir')
```

***

### createImageFromBase64()

```ts
function createImageFromBase64(base64String: string, outputPath: string): Promise<void>
```

Create an image file from a base64 string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base64String` | `string` | Base64 string representing the image. |
| `outputPath` | `string` | Path to save the image file. |

#### Returns

`Promise`\<`void`\>

#### Throws

If the base64 string is invalid.

#### Example

```ts
import { createImageFromBase64 } from '@clippo/fs'
const imageBuffer = await createImageFromBase64(base64String)
```

***

### existsDir()

```ts
function existsDir(path: string): Promise<boolean>
```

Checks if a directory exists at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a directory exists at the specified path, otherwise false.

#### Example

```ts
import { existsDir } from '@clippo/fs'
const exist = await existsDir('./my/dir')
```

***

### existsFile()

```ts
function existsFile(path: string): Promise<boolean>
```

Checks if a file exists at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to the file. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the file exists, otherwise false.

#### Throws

If an error occurs while checking the existence of the file.

#### Example

```ts
import { existsFile } from '@clippo/fs'

const existPKG = await existsFile('./package.json')
```

***

### existsPath()

```ts
function existsPath(path: string): Promise<boolean>
```

Checks if a file or directory exists at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a file or directory exists at the specified path, otherwise false.

#### Throws

If an error occurs while checking the existence of the path.

#### Example

```ts
import { existsPath } from '@clippo/fs'

const existPKG = await existsPath('./package.json')
```

***

### fetchContentToString()

```ts
function fetchContentToString(url: string): Promise<string>
```

Fetch content from a URL to string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | URL of the resource. |

#### Returns

`Promise`\<`string`\>

- The fetched content.

#### Throws

If there is an error fetching content from the URL.

#### Example

```ts
import { fetchContentToString } from '@clippo/fs'

const imageData = await fetchContentToString('https://source.unsplash.com/random')
console.log(imageData)
```

***

### getAbsolutePath()

```ts
function getAbsolutePath(...paths: string[]): string
```

Resolves path segments into an absolute path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`paths` | `string`[] | A sequence of paths or path segments. |

#### Returns

`string`

- The resolved absolute path.

#### Param

Path segments to resolve.

#### Throws

if any of the arguments is not a string.

***

### getObjectFrom()

```ts
function getObjectFrom(input: string): Promise<object>
```

Retrieve an object from either a file specified by path or a URL.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | Path to a file or URL of the resource. |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the file or URL.

#### Throws

If there is an error fetching data or parsing the object.

#### Example

```ts
import { getObjectFrom } from "@clippo/fs"

const objectFromYamlUrl = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
const objectFromJSON = await getObjectFrom('/my/file.json')

console.log( objectFromYamlUrl, objectFromJSON )
```

***

### getObjectFromFile()

```ts
function getObjectFromFile(path: string): Promise<object>
```

Retrieve an object from a file specified by path.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the file. |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the file.

#### Throws

If the file does not exist, or if the data is not an object.

#### Example

```ts
import { getObjectFromFile } from "@clippo/fs"

const objectFromJSON = await getObjectFromFile('/my/file.json')
const objectFromYAML = await getObjectFromFile('/my/file.yaml')
const objectFromTOML = await getObjectFromFile('/my/file.toml')

console.log(
  objectFromJSON,
  objectFromYAML,
  objectFromTOML
)
```

***

### getObjectFromJSONFile()

```ts
function getObjectFromJSONFile(path: string): Promise<object | object[]>
```

Get object from a JSON file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the JSON file. |

#### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

#### Throws

If there is an error reading the JSON file.

#### Example

```ts
import { getObjectFromJSONFile } from "@clippo/fs"

const object = await getObjectFromJSONFile('/my/file.json')
console.log( object )
```

***

### getObjectFromPath()

```ts
function getObjectFromPath(path: string, filename: string): Promise<object>
```

Retrieve an object from a file specified by path and filename.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the directory containing the file. |
| `filename` | `string` | Name of the file (without extension). |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the file.

#### Throws

If the file does not exist, or if the data is not an object.

#### Example

```ts
import { getObjectFromPath } from "@clippo/fs"

const content = await getObjectFromPath('/my/directory', 'my-file-name')
console.log( content )
```

***

### getObjectFromTOMLFile()

```ts
function getObjectFromTOMLFile(path: string): Promise<object | object[]>
```

Get object from a TOML file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the JSON file. |

#### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

#### Throws

If there is an error reading the JSON file.

#### Example

```ts
import { getObjectFromTOMLFile } from "@clippo/fs"

const objectFromTOML = await getObjectFromTOMLFile('/my/file.toml')
console.log(objectFromTOML)
```

***

### getObjectFromUrl()

```ts
function getObjectFromUrl(url: string): Promise<object>
```

Retrieve an object from a URL.
Supports JSON, YAML, and TOML formats.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | URL of the resource. |

#### Returns

`Promise`\<`object`\>

- The object retrieved from the URL.

#### Throws

If there is an error fetching data from the URL or parsing the object.

#### Example

```ts
import { getObjectFromUrl } from "@clippo/fs"

// from YAML url
const objectFromYamlUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
// from JSON url
const objectFromJsonUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/clippo/main/package.json')

console.log( objectFromYamlUrl, objectFromJsonUrl )
```

***

### getObjectFromYAMLFile()

```ts
function getObjectFromYAMLFile(path: string): Promise<object | object[]>
```

Get object from a YAML file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the JSON file. |

#### Returns

`Promise`\<`object` \| `object`[]\>

- The parsed JSON object.

#### Throws

If there is an error reading the JSON file.

#### Example

```ts
import { getObjectFromYAMLFile } from "@clippo/fs"

const object = await getObjectFromYAMLFile('/my/file.yaml')
console.log( object )
```

***

### isDirectory()

```ts
function isDirectory(path: string): Promise<boolean>
```

Checks if the given path points to a directory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the path points to a directory, otherwise false.

#### Example

```ts
import { isDirectory } from '@clippo/fs'

const isDir = await isDirectory('./my/path')
```

***

### joinPath()

```ts
function joinPath(...paths: string[]): string
```

Joins path segments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`paths` | `string`[] | Path segments to join. |

#### Returns

`string`

- The joined path.

#### Example

```ts
joinPath('user', 'pigeonposse')
```

***

### localStorage()

```ts
function localStorage(location: string): LocalStorage
```

Creates a new instance of LocalStorage with the specified location.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `location` | `string` | The location where the local storage data will be stored. |

#### Returns

`LocalStorage`

- A new instance of LocalStorage.

#### Example

```ts
import { localStorage } from "@clippo/fs"

// Creates a local storage instance in the './myStorage' directory
const storage = localStorage('./myStorage'); 
// Sets an item in the local storage
storage.setItem('key', 'value'); 
// Retrieves the value of the item from the local storage
const value = storage.getItem('key');
```

***

### openApp()

```ts
function openApp(name: string | readonly string[], options?: OpenAppOptions): Promise<ChildProcess>
```

Open an app. Cross-platform.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` \| readonly `string`[] | The app you want to open. Can be either builtin supported `apps` names or other name supported in platform. |
| `options`? | `OpenAppOptions` | - |

#### Returns

`Promise`\<`ChildProcess`\>

The [spawned child process](https://nodejs.org/api/child_process.html#child_process_class_childprocess). You would normally not need to use this for anything, but it can be useful if you'd like to attach custom event listeners or perform other operations directly on the spawned process.

#### Param

The app you want to open. Can be either builtin supported apps names or other name supported in platform.

#### Examples

```ts
import { openApp } from "@clippo/fs"

// Open Xcode
await openApp('xcode');
```

```
import open, {openApp, apps} from 'open';

// Open Firefox.
await openApp(apps.firefox);

// Open Chrome in incognito mode.
await openApp(apps.chrome, {arguments: ['--incognito']});

// Open default browser.
await openApp(apps.browser);

// Open default browser in incognito mode.
await openApp(apps.browserPrivate);

// Open Xcode.
await openApp('xcode');
```

***

### readFile()

Reads the content of a file at the specified path.

#### Param

The path of the file to read.

#### Throws

If an error occurs while reading the file.

#### Example

```ts
import { readFile } from '@clippo/fs'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

#### readFile(path, options)

```ts
function readFile(path: PathLike | FileHandle, options?: null | {
  encoding: null;
  flag: OpenMode;
} & Abortable): Promise<Buffer>
```

Asynchronously reads the entire contents of a file.

If no encoding is specified (using `options.encoding`), the data is returned
as a `Buffer` object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

When the `path` is a directory, the behavior of `fsPromises.readFile()` is
platform-specific. On macOS, Linux, and Windows, the promise will be rejected
with an error. On FreeBSD, a representation of the directory's contents will be
returned.

An example of reading a `package.json` file located in the same directory of the
running code:

```js
import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./package.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

It is possible to abort an ongoing `readFile` using an `AbortSignal`. If a
request is aborted the promise returned is rejected with an `AbortError`:

```js
import { readFile } from 'node:fs/promises';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.readFile` performs.

Any specified `FileHandle` has to support reading.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | filename or `FileHandle` |
| `options`? | `null` \| \{ `encoding`: `null`; `flag`: `OpenMode`; \} & `Abortable` | - |

##### Returns

`Promise`\<`Buffer`\>

- A promise that resolves to the content of the file as a string or buffer.

Fulfills with the contents of the file.

##### Param

The path of the file to read.

##### Throws

If an error occurs while reading the file.

##### Example

```ts
import { readFile } from '@clippo/fs'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

##### Since

v10.0.0

#### readFile(path, options)

```ts
function readFile(path: PathLike | FileHandle, options: BufferEncoding | {
  encoding: BufferEncoding;
  flag: OpenMode | undefined;
} & Abortable): Promise<string>
```

Asynchronously reads the entire contents of a file.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | A path to a file. If a URL is provided, it must use the `file:` protocol. If a `FileHandle` is provided, the underlying file will *not* be closed automatically. |
| `options` | `BufferEncoding` \| \{ `encoding`: `BufferEncoding`; `flag`: OpenMode \| undefined; \} & `Abortable` | An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`. |

##### Returns

`Promise`\<`string`\>

- A promise that resolves to the content of the file as a string or buffer.

##### Param

The path of the file to read.

##### Throws

If an error occurs while reading the file.

##### Example

```ts
import { readFile } from '@clippo/fs'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

#### readFile(path, options)

```ts
function readFile(path: PathLike | FileHandle, options?: null | BufferEncoding | ObjectEncodingOptions & Abortable & {
  flag: OpenMode | undefined;
}): Promise<string | Buffer>
```

Asynchronously reads the entire contents of a file.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | A path to a file. If a URL is provided, it must use the `file:` protocol. If a `FileHandle` is provided, the underlying file will *not* be closed automatically. |
| `options`? | `null` \| `BufferEncoding` \| `ObjectEncodingOptions` & `Abortable` & \{ `flag`: OpenMode \| undefined; \} | An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`. |

##### Returns

`Promise`\<`string` \| `Buffer`\>

- A promise that resolves to the content of the file as a string or buffer.

##### Param

The path of the file to read.

##### Throws

If an error occurs while reading the file.

##### Example

```ts
import { readFile } from '@clippo/fs'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

***

### removeDir()

```ts
function removeDir(path: string): Promise<void>
```

Removes a directory and its contents if it exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the directory to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the directory.

#### Example

```ts
import { removeDir } from '@clippo/fs'

try {
  await removeDir('./my/path')
} catch (e) {
  console.log(e)
}
```

***

### removeDirIfExist()

```ts
function removeDirIfExist(path: string): Promise<void>
```

Removes a directory and its contents if it exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the directory to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the directory.

#### Example

```ts
import { removeDirIfExist } from '@clippo/fs'

await removeDirIfExist('./my/path')
```

***

### validateHomeDir()

```ts
function validateHomeDir(path: string): string
```

Validates and resolves a path with home directory replacement.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to validate and resolve. |

#### Returns

`string`

- The validated and resolved absolute path.

#### Example

```ts
import { validateHomeDir } from '@clippo/fs'

const path = validateHomeDir('~/Documents') 

console.log(path) // returns: /users/{username}/Documents

const path = validateHomeDir('/Home') 

console.log(path) // returns same: /Home
```

***

### writeFileContent()

```ts
function writeFileContent(path: string, content: string | Buffer): Promise<void>
```

Writes content to a file at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the file to write to. |
| `content` | `string` \| `Buffer` | The content to write to the file. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while writing to the file.

#### Example

```ts
import { writeFile } from '@clippo/fs'

await writeFile('./greetFile.txt', 'Hello')
```

## Variables

### open

```ts
const open: __module = o;
```

Opens a system file or URL.

#### Param

The file path or URL to open.

#### Example

```ts
import { open } from "@clippo/fs"

// Opens the image in the default image viewer.
await open('pigeon.png', {wait: true});
```

## Examples

```js

/**
 * Fetches an object from a remote URL and a local file, then logs specific parts of them.
 */ 
import {
 getObjectFrom,
 getObjectFromPath, 
} from '@clippo/fs'

const result = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
const pkg    = await getObjectFromPath( '.', 'package' )

console.log( result.web[ 0 ], pkg )

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
