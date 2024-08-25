import type { ISpinnerOptions } from '@topcli/spinner'

export type SpinnerType = 'start' | 'succeed'| 'update' | 'failed'
export type SpinnerEventParams = {
	text: string,
	time?: number
	prefix?: string
	type: SpinnerType
}

/**
 * Set spinner options like color, name...
 */
export type SpinnerOpts = {
	/**
	 * Set a prefix.
	 *
	 * @default undefined
	 */
	prefix?: string
	/**
	 * Spinner name (from cli-spinners lib).
	 *
	 * @default "line"
	 * @see https://jsfiddle.net/sindresorhus/2eLtsbey/embedded/result/
	 * @see https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json
	 */
	name?: ISpinnerOptions['name']
	/**
	 * Spinner frame color.
	 *
	 * @default "white"
	 */
	color?: string
	/**
	 * Format the output of spinner.
	 */
	// format?: () => string
	/**
	 * On callback.
	 */
	overwriteOutput?: ( params : SpinnerEventParams ) => void 
}
