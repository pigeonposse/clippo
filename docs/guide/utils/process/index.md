---
outline: [2,3]
---

# ⚙️ Process Management

Package your extension for multiple browsers quickly and easily

[![License](https://img.shields.io/github/license/pigeonposse/@clippo/process?color=green&style=for-the-badge&logoColor=white)](/LICENSE)
[![Version](https://img.shields.io/npm/v/@clippo/process?color=blue&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/@clippo/process)

## Installation

```bash
npm i @clippo/process
# or
pnpm i @clippo/process
# or
yarn add @clippo/process
```

## Functions

### execute()

```ts
function execute(params: ChildProcessExecuteParams): Promise<void>
```

Executes a child process with the specified command.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `ChildProcessExecuteParams` | Parameters for executing the child process. |

#### Returns

`Promise`\<`void`\>

- A promise that resolves when the child process completes successfully or rejects if there is an error.

#### Example

```ts
await execute({
  cmd: 'git add .',
  onError: (e) => console.error(e),
  onLog: (data) =>  console.log(data),
})
```

***

### exit()

```ts
function exit(type?: ProcessExitType): never
```

Function to exit the process with a specified type.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `type`? | [`ProcessExitType`](index.md#processexittype) | `'succeed'` | The type of exit. Can be either 'succeed' or 'failed'. |

#### Returns

`never`

#### Example

```ts
// exit the process with error
exit('succeed');
// exit the process successfully
exit('failed');
```

***

### readline()

```ts
function readline(): {
  clearScreen: () => void;
  onKeypress: (cb: (keypress: string[], params: {
     clearScreen: () => void;
     pauseWrite: () => void;
     resumeWrite: () => void;
     stop: () => void;
     write: (s: string) => void;
    }) => void) => void;
  pauseWrite: () => void;
  resumeWrite: () => void;
  start: () => void;
  stop: () => void;
  write: (s: string) => void;
}
```

Function to capture keyboard input and handle it according to the specified keys.

#### Returns

```ts
{
  clearScreen: () => void;
  onKeypress: (cb: (keypress: string[], params: {
     clearScreen: () => void;
     pauseWrite: () => void;
     resumeWrite: () => void;
     stop: () => void;
     write: (s: string) => void;
    }) => void) => void;
  pauseWrite: () => void;
  resumeWrite: () => void;
  start: () => void;
  stop: () => void;
  write: (s: string) => void;
}
```

- Object containing stop function.

| Name | Type |
| ------ | ------ |
| `clearScreen` | () => `void` |
| `onKeypress` | (`cb`: (`keypress`: `string`[], `params`: \{ `clearScreen`: () => `void`; `pauseWrite`: () => `void`; `resumeWrite`: () => `void`; `stop`: () => `void`; `write`: (`s`: `string`) => `void`; \}) => `void`) => `void` |
| `pauseWrite` | () => `void` |
| `resumeWrite` | () => `void` |
| `start` | () => `void` |
| `stop` | () => `void` |
| `write` | (`s`: `string`) => `void` |

#### Example

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

***

### spinner()

```ts
function spinner(params?: SpinnerOpts): {
  failed: (text: string) => void;
  getTime: () => undefined | number;
  getTimeResult: () => undefined | number;
  reset: () => void;
  start: (text: string) => void;
  succeed: (text: string) => void;
  update: (text: string) => void;
}
```

Spinner function.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params`? | `SpinnerOpts` | Object for spinner options. |

#### Returns

```ts
{
  failed: (text: string) => void;
  getTime: () => undefined | number;
  getTimeResult: () => undefined | number;
  reset: () => void;
  start: (text: string) => void;
  succeed: (text: string) => void;
  update: (text: string) => void;
}
```

- Returns an object with spinner methods.

| Name | Type | Description |
| ------ | ------ | ------ |
| `failed` | (`text`: `string`) => `void` | Fail the spinner with provided text. |
| `getTime` | () => `undefined` \| `number` | Get elapsed time of spinner. |
| `getTimeResult` | () => `undefined` \| `number` | Get time result of spinner from start to stop. |
| `reset` | () => `void` | Reset spinner. |
| `start` | (`text`: `string`) => `void` | Start the spinner with provided text. |
| `succeed` | (`text`: `string`) => `void` | Succeed the spinner with provided text. |
| `update` | (`text`: `string`) => `void` | Change text of spinner. |

#### Example

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

***

### tasks()

```ts
function tasks(tasks: TaskList, opts?: TasksOpts): Promise<void>
```

Runs a list of tasks using Listr.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tasks` | `TaskList` | The list of tasks to execute. |
| `opts`? | `TasksOpts` | Tasks options. |

#### Returns

`Promise`\<`void`\>

- A Promise that resolves when all tasks are completed.

#### Example

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

***

### write()

```ts
function write(data: string): void
```

Writes data to the standard output.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The data to be written. |

#### Returns

`void`

#### Example

```ts
write('Lorem ipsum')
```

## Type Aliases

### ProcessExitType

```ts
type ProcessExitType: "succeed" | "failed";
```

## Utils Index

[Go to index](../index.md) 👈
