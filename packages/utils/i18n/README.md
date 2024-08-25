# CLIPPO | Internationalization 🌐

Internalization with zero configuration. Created for clippo and designed for CLI and backend tools

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/i18n?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/i18n?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/i18n)

## Installation

```bash
npm i @clippo/i18n
# or
pnpm i @clippo/i18n
# or
yarn add @clippo/i18n
```

## Functions

### i18n()

```ts
function i18n(opts: I18nOpts): Promise<{
  _: (...opts: [string | TemplateStringsArray | (string | TemplateStringsArray)[], TOptionsBase & $Dictionary] | [string | string[], TOptionsBase & $Dictionary & {
     defaultValue: string;
    }] | [string | string[], string, TOptionsBase & $Dictionary]) => string;
  changeLanguage: i18next.changeLanguage;
  getCurrentLocale: () => string;
  getLocales: () => string[];
}>
```

Initializes the i18n library with the provided options and returns an i18n object with helper methods.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts` | [`I18nOpts`](index.md#i18nopts) | Options for configuring i18n. |

#### Returns

`Promise`\<\{
  `_`: (...`opts`: [`string` \| `TemplateStringsArray` \| (`string` \| `TemplateStringsArray`)[], `TOptionsBase` & `$Dictionary`] \| [`string` \| `string`[], `TOptionsBase` & `$Dictionary` & \{
     `defaultValue`: `string`;
    \}] \| [`string` \| `string`[], `string`, `TOptionsBase` & `$Dictionary`]) => `string`;
  `changeLanguage`: `i18next.changeLanguage`;
  `getCurrentLocale`: () => `string`;
  `getLocales`: () => `string`[];
 \}\>

- An object with helper methods for managing localization.

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `_` | (...`opts`: [`string` \| `TemplateStringsArray` \| (`string` \| `TemplateStringsArray`)[], `TOptionsBase` & `$Dictionary`] \| [`string` \| `string`[], `TOptionsBase` & `$Dictionary` & \{ `defaultValue`: `string`; \}] \| [`string` \| `string`[], `string`, `TOptionsBase` & `$Dictionary`]) => `string` | - | Translates a given string key to the current locale. **Example** `const { _ } = yourI18nInstance console.log( _('general:greet') )` |
| `changeLanguage` | (`lng`?: `string`, `callback`?: `Callback`) => `Promise`\<`TFunction`\<`"translation"`, `undefined`\>\> | i18next.changeLanguage | Change language. **Example** `const { changeLanguage } = yourI18nInstance // change lang to spanish changeLanguage('es')` |
| `getCurrentLocale` | () => `string` | - | Retrieves the ID of the current locale. **Example** `const { getCurrentLocale } = yourI18nInstance const currentLocale = getCurrentLocale();` |
| `getLocales` | () => `string`[] | - | Retrieves an array of available locales. **Example** `const { getLocales } = yourI18nInstance const appLocales = getLocales()` |

#### Example

```ts
import { i18n } from '@clippo/i18n'

const I18N = await i18n({
  locales: {
    en: { general: { greet: '🇬🇧 Hello pigeon' } },
    es: { general: { greet: '🇪🇸 Hola paloma' } }
  },
});

const currentLocale = I18N.getCurrentLocale(); 
const availableLocales = I18N.getLocales(); 
const translatedString = I18N._('general:greet');

console.log(currentLocale, availableLocales, translatedString)

// change lang to spanish
I18N.changeLanguage('es')
console.log(I18N.getCurrentLocale())
```

## Type Aliases

### I18nOpts

```ts
type I18nOpts: {
  defaultLocale: string;
  locales: {};
};
```

Options for configuring i18n.

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `defaultLocale` | `string` | Default language. If not set, gets the system language and takes the locales object's first language as the fallback language. |
| `locales` | \{\} | Set your translations. **Example** `const locales = { en: { general: { greet: '🇬🇧 Hello pigeon' } }, es: { general: { greet: '🇪🇸 Hola paloma' } } }` |

## Examples

```js
/* eslint-disable jsdoc/require-jsdoc */
import { i18n } from '@clippo/i18n'

async function initializeI18n() {

 const {
  _, getCurrentLocale, getLocales, changeLanguage, 
 } = await i18n( {
  locales : {
   en : {
    general : {
     greeting : '🇬🇧 Hello',
     farewell : '🇬🇧 Goodbye',
     nested   : { more: 'Read more...' },
    },
   },
   es : {
    general : {
     greeting : '🇪🇸 Hola',
     farewell : '🇪🇸 Adiós',
    },
   },
   ja : {
    general : {
     greeting : '🇯🇵 こんにちは',
     farewell : '🇯🇵 さようなら',
    },
   },
   zh : {
    general : {
     greeting : '🇨🇳 你好',
     farewell : '🇨🇳 再见',
    },
   },
   fr : {
    general : {
     greeting : '🇫🇷 Bonjour',
     farewell : '🇫🇷 Au revoir',
    },
   },
  },  
  // defaultLocale : 'en',
 } )

 console.log( {
  t : {
   greet              : _( 'general:greeting' ), // returns your value in your system lang, if not exists return falback lang (first in object, in this case: en)
   nested             : _( 'general:nested:more' ), // returns fallback because only exists in english
   errorNoNS          : _( 'greeting' ), // ERROR: returns key an not the value, because namespace is not set
   errorNestedAndNoNS : _( ':nested:more' ), //ERROR: returns key an not the value, because namespace is not set
  },
  availableLocales : getCurrentLocale(), // Returns the current locale name,
  currentLocale    : getLocales(), // Returns an array of available locales
 } )

 await changeLanguage( 'fr' )

 console.log( {
  t : {
   greet              : _( 'general:greeting' ), // returns your value in your system lang, if not exists return falback lang (first in object, in this case: en)
   nested             : _( 'general:nested:more' ), // returns fallback because only exists in english
   errorNoNS          : _( 'greeting' ), // ERROR: returns key an not the value, because namespace is not set
   errorNestedAndNoNS : _( ':nested:more' ), //ERROR: returns key an not the value, because namespace is not set
  },
  availableLocales : getCurrentLocale(), // Returns the current locale name,
  currentLocale    : getLocales(), // Returns an array of available locales
 } )

}

initializeI18n()
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
