# CLIPPO | Prompts 💬

Package your extension for multiple browsers quickly and easily

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/prompts?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/prompts?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/prompts)

## Installation

```bash
npm i @clippo/prompts
# or
pnpm i @clippo/prompts
# or
yarn add @clippo/prompts
```

## Functions

### prompt()

```ts
function prompt(props: PromptOptions | (this: Enquirer<object>) => PromptOptions | PromptOptions | ((this: Enquirer<object>) => PromptOptions)[]): Promise<object>
```

Ask questions to user with prompt function.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | `PromptOptions` \| (`this`: `Enquirer`\<`object`\>) => `PromptOptions` \| PromptOptions \| ((this: Enquirer\<object\>) =\> PromptOptions)[] | PromptOptions. |

#### Returns

`Promise`\<`object`\>

- Promise resolving to answers.

#### See

<https://clippo.pigeonposse.com>

#### Example

```ts
import { prompt } from "@clippo/prompts"

const answers = await prompt([
  {
    type: 'toggle',
    name: 'ready',
    message: 'Are you ready?',
    enabled: 'Yep',
    disabled: 'Nope',
  },
  {
    type: 'number',
    name: 'age',
    message: 'What is your age',
  },
]);
console.log(answers.ready, answers.age)
```

***

### promptLine()

```ts
function promptLine(params: PromptLineParams): Promise<{}>
```

Define a group of prompts to be displayed and return a results of objects within the group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`PromptLineParams`](index.md#promptlineparams) | PromptLine options . |

#### Returns

`Promise`\<\{\}\>

- Object with answers.

#### Example

```ts
import { promptLine } from "@clippo/prompts"

const answers = await promptLine({
    intro: 'clippo init',
    outro: 'Succesfully finished 🌈',
    onCancel: p => {
        p.cancel('canceled 💔')
        process.exit(0)
    },
    list: async p => ({
       name: () => p.text({
           message: 'What is your organization?',
           placeholder: 'PigeonPosse',
           defaultValue: 'PigeonPosse',
       }),
       age: () => p.number({
           message: 'What is your age?',
       }),
    })
})

console.log(answers.name, answers.age)
```

## Type Aliases

### BoxParams

```ts
type BoxParams: Parameters<typeof box>;
```

Parameters of the `box` function from the `@clippo/styles` module.

[See module](https://clippo.pigeonposse.com/guide/utils/styles#box).

***

### ColumnsParams

```ts
type ColumnsParams: Parameters<typeof columns>;
```

Parameters of the `columns` function from the `@clippo/styles` module.

[See module](https://clippo.pigeonposse.com/guide/utils/styles#columns).

***

### ImageParams

```ts
type ImageParams: Parameters<typeof image>;
```

Parameters of the `image` function from the `@clippo/media` module.

[See module](https://clippo.pigeonposse.com/guide/utils/media#image).

***

### NumberParams

```ts
type NumberParams: p.TextOptions & {
  defaultValue: number;
  errorText: string;
  placeholder: number;
};
```

NUMBER.

#### Type declaration

| Name | Type |
| ------ | ------ |
| `defaultValue` | `number` |
| `errorText` | `string` |
| `placeholder` | `number` |

***

### PromptLineParams

```ts
type PromptLineParams: {
  intro: string;
  list: (prompt: PromptLineExecProps) => Parameters<typeof p.group>[0];
  onCancel: (prompt: PromptLineCancelProps) => Promise<void>;
  outro: string;
};
```

Parameters for configuring a prompt line.

#### Type declaration

| Name | Type |
| ------ | ------ |
| `intro` | `string` |
| `list` | (`prompt`: `PromptLineExecProps`) => `Parameters`\<*typeof* `p.group`\>\[`0`\] |
| `onCancel` | (`prompt`: `PromptLineCancelProps`) => `Promise`\<`void`\> |
| `outro` | `string` |

***

### PromptParams

```ts
type PromptParams: Parameters<typeof Enquirer.prompt>[0];
```

***

### QRcodeParams

```ts
type QRcodeParams: Parameters<typeof qrcode>;
```

Parameters of the `qrcode` function from the `@clippo/qr` module.

[See module](https://clippo.pigeonposse.com/guide/utils/qr#qrcode).

***

### TableParams

```ts
type TableParams: Parameters<typeof table>;
```

Parameters of the `table` function from the `@clippo/styles` module.

[See module](https://clippo.pigeonposse.com/guide/utils/style#table).

## Examples

```js
import {
 prompt, promptLine, 
} from '@clippo/prompts'

try {

 const questions = [
  {
   type     : 'toggle',
   name     : 'toggle',
   message  : 'Are ypou ready?',
   enabled  : 'Yep',
   disabled : 'Nope',
  },
  {
   type     : 'snippet',
   name     : 'snippet',
   message  : 'Fill out the fields in package.json',
   required : true,
   fields   : [
    {
     name    : 'author_name',
     message : 'Author Name',
    },
    {
     name : 'version',
     // @ts-ignore
     // validate : ( value, state, item ) =>{

     //  return true

     // },
    },
   ],
   template : `\n{
 "name": "\${name}",
 "description": "\${description}",
 "version": "\${version}",
 "homepage": "https://github.com/\${username}/\${name}",
 "author": "\${author_name} (https://github.com/\${username})",
 "repository": "\${username}/\${name}",
 "license": "\${license:ISC}"
}
`,
  },
  {
   type     : 'sort',
   name     : 'sort',
   message  : 'Sort the colors in order of preference',
   hint     : '(Use <shifth+up/down> to move) Top is best, bottom is worst',
   numbered : true,
   choices  : [
    'red', 'white', 'green', 'cyan', 'yellow',
   ],
  },
  {
   type    : 'select',
   name    : 'select',
   message : 'Pick a flavor',
   choices : [
    'apple', 'grape', 'watermelon', 'cherry', 'orange',
   ],
  },
  {
   type    : 'scale',
   name    : 'scale',
   message : 'Please rate your experience',
   scale   : [
    {
     name : '1', message : 'Strongly Disagree', 
    },
    {
     name : '2', message : 'Disagree', 
    },
    {
     name : '3', message : 'Neutral', 
    },
    {
     name : '4', message : 'Agree', 
    },
    {
     name : '5', message : 'Strongly Agree', 
    },
   ],
   margin : [
    0, 0, 2, 1,
   ],
   choices : [
    {
     name    : 'interface',
     message : 'The website has a friendly interface.',
     initial : 2,
    },
    {
     name    : 'navigation',
     message : 'The website is easy to navigate.',
     initial : 2,
    },
    {
     name    : 'images',
     message : 'The website usually has good images.',
     initial : 2,
    },
    {
     name    : 'upload',
     message : 'The website makes it easy to upload images.',
     initial : 2,
    },
    {
     name    : 'colors',
     message : 'The website has a pleasing color palette.',
     initial : 2,
    },
   ],
  },
  {
   type    : 'survey',
   name    : 'survey',
   message : 'Please rate your experience',
   scale   : [
    {
     name : '1', message : 'Strongly Disagree', 
    },
    {
     name : '2', message : 'Disagree', 
    },
    {
     name : '3', message : 'Neutral', 
    },
    {
     name : '4', message : 'Agree', 
    },
    {
     name : '5', message : 'Strongly Agree', 
    },
   ],
   margin : [
    0, 0, 2, 1,
   ],
   choices : [
    {
     name    : 'interface',
     message : 'The website has a friendly interface.',
    },
    {
     name    : 'navigation',
     message : 'The website is easy to navigate.',
    },
    {
     name    : 'images',
     message : 'The website usually has good images.',
    },
    {
     name    : 'upload',
     message : 'The website makes it easy to upload images.',
    },
    {
     name    : 'colors',
     message : 'The website has a pleasing color palette.',
    },
   ],
  
  },
  {
   type    : 'number',
   name    : 'number',
   message : 'Please enter a number',
  },
  {
   type    : 'multiselect',
   name    : 'multiselect',
   message : 'Pick your favorite colors',
   // limit   : 4,
   choices : [
    {
     name : 'aqua', value : '#00ffff', 
    },
    {
     name : 'black', value : '#000000', 
    },
    {
     name : 'blue', value : '#0000ff', 
    },
    {
     name : 'fuchsia', value : '#ff00ff', 
    },
   ],
  },
  {
   header  : '========================',
   footer  : '========================',
   type    : 'input',
   name    : 'input-header',
   message : 'Write your name',
  },
  {
   type    : 'list',
   name    : 'list',
   message : 'Type comma-separated keywords',
  },
  {
   type    : 'form',
   name    : 'form',
   message : 'Please provide the following information:',
   choices : [
    {
     name    : 'firstname', 
     message : 'First Name', 
     initial : 'Jon', 
    },
    {
     name    : 'lastname', 
     message : 'Last Name', 
     initial : 'Schlinkert', 
    },
    {
     name    : 'username', 
     message : 'GitHub username', 
     initial : 'jonschlinkert', 
    },
   ],
  },
  {
   type         : 'basicauth',
   name         : 'basicauth',
   message      : 'Please enter your password',
   username     : 'admin',
   password     : '123',
   showPassword : true,
  },
  {
   type    : 'confirm',
   name    : 'confirm',
   message : 'Did you like enquirer?',
  },
  {
   type    : 'input',
   name    : 'input',
   message : 'What is your username?',
  },
  {
   type    : 'password',
   name    : 'password',
   message : 'What is your password?',
  },
  {
   type    : 'autocomplete',
   name    : 'autocomplete',
   message : 'Pick your favorite flavor',
   limit   : 10,
   initial : 2,
   choices : [
    'Almond',
    'Apple',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Chocolate',
    'Cinnamon',
    'Coconut',
   ],
  },
 ]
  
 const answers  = await prompt( questions )
 const answers2 = await promptLine( {
  intro    : 'clippo init',
  outro    : 'Succesfully finished 🌈',
  onCancel : p => {

   p.cancel( 'canceled 💔' )
   process.exit( 0 )
  
  },
  list : async p => {

   return {
    name : () => p.text( {
     message      : 'What is your organization?',
     placeholder  : 'PigeonPosse',
     defaultValue : 'PigeonPosse',
    } ),
    age : () => p.number( {
     message : 'What is your age?',
    } ),
   }
  
  },
 } )
 console.log( answers, answers2 )

}catch( e ){

 console.log( e )

}
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
