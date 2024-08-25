import type number           from './number'
import type { PromptParams } from '../prompt/types'
import type * as p           from '@clack/prompts'
import type { image }        from '@clippo/media'
import type { qrcode }       from '@clippo/qr'
import type {
	box,
	columns, 
	table, 
}              from '@clippo/styles'

/**
 * NUMBER.
 *
 */

export type NumberParams = p.TextOptions & {
	placeholder?: number
	defaultValue?: number
	errorText?: string
}

/**
 * Parameters of the `table` function from the `@clippo/styles` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/style#table).
 */
export type TableParams = Parameters<typeof table>
/**
 * Parameters of the `columns` function from the `@clippo/styles` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/styles#columns).
 */
export type ColumnsParams = Parameters<typeof columns>

/**
 * Parameters of the `box` function from the `@clippo/styles` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/styles#box).
 */
export type BoxParams = Parameters<typeof box>

/**
 * Parameters of the `image` function from the `@clippo/media` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/media#image).
 */
export type ImageParams = Parameters<typeof image>

/**
 * Parameters of the `qrcode` function from the `@clippo/qr` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/qr#qrcode).
 */
export type QRcodeParams = Parameters<typeof qrcode>

/**
 * Props for canceling a prompt line, including functions from various modules.
 */
type PromptLineCancelProps = typeof p & {
	number: typeof number
	table: ( ...p: TableParams ) => void
	box: ( ...p: BoxParams ) => void
	columns: ( ...p: ColumnsParams ) => void
	image: ( ...p: ImageParams ) => Promise<void>
	qrcode: ( ...p: QRcodeParams ) => Promise<void>
}

/**
 * Props for executing a prompt line, extending `PromptLineCancelProps` with typePrompt.
 */
type PromptLineExecProps = PromptLineCancelProps & {
	typePrompt: <T>( props: PromptParams ) => Promise<T>
}

/**
 * Parameters for configuring a prompt line.
 */
export type PromptLineParams = {
	intro?: string
	outro?: string
	list: ( prompt: PromptLineExecProps ) => Parameters<typeof p.group>[0]
	onCancel: ( prompt: PromptLineCancelProps ) => Promise<void>
}
