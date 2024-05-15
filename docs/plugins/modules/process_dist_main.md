# Module: process/dist/main

## Type Aliases

### ProcessExitType

Ƭ **ProcessExitType**: ``"succeed"`` \| ``"failed"``

## Functions

### execute

▸ **execute**(`params`): `Promise`\<`void`\>

Executes a child process with the specified command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `ChildProcessExecuteParams` | Parameters for executing the child process. |

#### Returns

`Promise`\<`void`\>

- A promise that resolves when the child process completes successfully or rejects if there is an error.

**`Example`**

```ts
await execute({
  cmd: 'git add .',
  onError: (e) => console.error(e),
  onLog: (data) =>  console.log(data),
})
```

___

### exit

▸ **exit**(`type?`): `never`

Function to exit the process with a specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type?` | [`ProcessExitType`](process_dist_main.md#processexittype) | The type of exit. Can be either 'succeed' or 'failed'. |

#### Returns

`never`

**`Example`**

```ts
// exit the process with error
exit('succeed');
// exit the process successfully
exit('failed');
```

___

### readline

▸ **readline**(): `Object`

Function to capture keyboard input and handle it according to the specified keys.

#### Returns

`Object`

- Object containing stop function.

| Name | Type |
| :------ | :------ |
| `clearScreen` | () => `void` |
| `onKeypress` | (`cb`: (`keypress`: `string`[], `params`: \{ `clearScreen`: () => `void` ; `pauseWrite`: () => `void` ; `resumeWrite`: () => `void` ; `stop`: () => `void` ; `write`: (`s`: `string`) => `void`  }) => `void`) => `void` |
| `pauseWrite` | () => `void` |
| `resumeWrite` | () => `void` |
| `start` | () => `void` |
| `stop` | () => `void` |
| `write` | (`s`: `string`) => `void` |

**`Example`**

```ts
const rl = readline();
rl.clearScreen();
rl.write('Readline activated')
rl.pauseWrite();
rl.onKeypress((keypress, { write, stop, clearScreen, resumeWrite, pauseWrite }) => {
  if (keypress.includes('ctrl') && keypress.includes('h')) write(info);
  if (keypress.includes('ctrl') && keypress.includes('e')) clearScreen();
  if (keypress.includes('ctrl') && keypress.includes('r')) resumeWrite();
  if (keypress.includes('ctrl') && keypress.includes('p')) pauseWrite();
  if (keypress.includes('ctrl') && keypress.includes('s')) stop();
});
rl.start();
// more core
rl.stop();
```

___

### spinner

▸ **spinner**(`params?`): `Object`

Spinner function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | `SpinnerOpts` | Object for spinner options. |

#### Returns

`Object`

- Returns an object with spinner methods.

| Name | Type | Description |
| :------ | :------ | :------ |
| `failed` | (`text`: `string`) => `void` | - |
| `getTime` | () => `number` \| `undefined` | - |
| `getTimeResult` | () => `number` \| `undefined` | - |
| `reset` | () => `void` | - |
| `start` | (`text`: `string`) => `void` | - |
| `succeed` | (`text`: `string`) => `void` | - |
| `update` | (`text`: `string`) => `void` | - |

**`Example`**

```ts
const load = spinner({prefix: 'DEV', name: 'dots' })
load.start('Starting...')
try {
  // your code
  load.update( 'updating...' )
  // your code
  load.succeed('Starting...')
}catch(e){
  load.failed('Failed')
}
```

___

### tasks

▸ **tasks**(`tasks`, `opts?`): `Promise`\<`void`\>

Runs a list of tasks using Listr.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | `TaskList` | The list of tasks to execute. |
| `opts?` | `TasksOpts` | Tasks options. |

#### Returns

`Promise`\<`void`\>

- A Promise that resolves when all tasks are completed.

**`Example`**

```ts
const delay = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ) )
await tasks({
  title: 'Tasks',
  task: [
    {
      title: 'Task 0',
      task: [
        {
          title: 'Task 0.1',
          task: async (_, task) => {
            await delay(500);
            task.title = 'Task finished';
          },
        },
        {
          title: 'Task 0.2',
          task: async () => await delay(500),
        },
      ],
    },
	   {
      title : 'Task 1',
      task  : async () => await delay(1000),
    },
  ],
});
```

___

### write

▸ **write**(`data`): `void`

Writes data to the standard output.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | The data to be written. |

#### Returns

`void`

**`Example`**

```ts
write('Lorem ipsum')
```
