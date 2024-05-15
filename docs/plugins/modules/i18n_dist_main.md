# Module: i18n/dist/main

## Type Aliases

### I18nOpts

Ƭ **I18nOpts**: `Object`

Options for configuring i18n.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultLocale?` | `string` | Default language. If not set, gets the system language and takes the locales object's first language as the fallback language. |
| `locales` | \{ `[language: string]`: \{ `[namespace: string]`: \{ `[key: string]`: `string` \| `object`;  };  };  } | Set your translations. **`Example`** ```ts { * en: { general: { greet: '🇬🇧 Hello pigeon' } }, * es: { general: { greet: '🇪🇸 Hola paloma' } } * } ``` |

## Functions

### default

▸ **default**(`opts`): `Promise`\<\{ `_`: (...`opts`: `Parameters`\<typeof `i18next.t`\>) => `string` ; `changeLanguage`: (`lng?`: `string`, `callback?`: `Callback`) => `Promise`\<`TFunction`\<``"translation"``, `undefined`\>\> ; `getCurrentLocale`: () => `string` ; `getLocales`: () => `string`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`I18nOpts`](i18n_dist_main.md#i18nopts) |

#### Returns

`Promise`\<\{ `_`: (...`opts`: `Parameters`\<typeof `i18next.t`\>) => `string` ; `changeLanguage`: (`lng?`: `string`, `callback?`: `Callback`) => `Promise`\<`TFunction`\<``"translation"``, `undefined`\>\> ; `getCurrentLocale`: () => `string` ; `getLocales`: () => `string`[]  }\>
