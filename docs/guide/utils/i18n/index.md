---
outline: [2,3]
---

# 🌐 Internationalization

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

## Utils Index

[Go to index](../index.md) 👈
