# Module: logger/dist/main

## Classes

- [Logger](../classes/logger_dist_main.Logger.md)

## Type Aliases

### LoggerParams

Ƭ **LoggerParams**: `Object`

Configuration parameters for the Logger class.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `format?` | (`v`: `object`) => `string` | - |
| `level?` | `ObjectValues`\<typeof `levels`\> | Determinate the level of logger. |
| `name?` | `string` | The name of the logger. |
| `outputFile?` | `string` | The path to the output file where logs will be written. |
| `screenlog?` | `boolean` | Determines whether logs should be printed to the console. Default: true. |
