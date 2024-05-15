# Module: prompts/dist/main

## Type Aliases

### PromptParams

Ƭ **PromptParams**: `Parameters`\<typeof `Enquirer.prompt`\>[``0``]

## Functions

### prompt

▸ **prompt**(`props`): `Promise`\<`object`\>

Ask questions to user with prompt function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `PromptOptions` \| (`this`: `Enquirer`\<`object`\>) => `PromptOptions` \| PromptOptions \| ((this: Enquirer\<object\>) =\> PromptOptions)[] | PromptOptions. |

#### Returns

`Promise`\<`object`\>

- Promise resolving to answers.

**`See`**

https://clippo.pigeonposse.com

**`Example`**

```ts
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

___

### promptLine

▸ **promptLine**(`params`): `Promise`\<{}\>

Define a group of prompts to be displayed and return a results of objects within the group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `PromptLineParams` | PromptOptions. |

#### Returns

`Promise`\<{}\>

- Promise resolving to answers.

**`Example`**

```ts
const answers = await promptLine({
    intro: 'clippo init',
    outro: 'Succesfully finished 🌈',
    onCancel: p => {
        p.cancel('canceled 💔')
        process.exit(0)
    },
    list: async p => {
        return {
            name: () => p.text({
                message: 'What is your organization?',
                placeholder: 'PigeonPosse',
                defaultValue: 'PigeonPosse',
            }),
            age: () => p.number({
                message: 'What is your age?',
            }),
        }
    }
})

console.log(answers.name, answers.age)
```
