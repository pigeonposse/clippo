export const levels = {
	debug   : 'debug',
	success : 'success',
	info    : 'info',
	warn    : 'warn',
	error   : 'error',
	fatal   : 'fatal',
} as const

type ObjectValues<Values> = Values[keyof Values]

/**
 * Configuration parameters for the Logger class.
 */
export type LoggerParams = {
	/**
	 * The path to the output file where logs will be written.
	 *
	 * @default undefined
	 */
	outputFile?: string
	/**
	 * The name of the logger.
	 *
	 * @default undefined
	 */
	name?: string
	/**
	 * Determines whether logs should be printed to the console.
	 *
	 * @default true
	 */
	screenlog?: boolean
	/**
	 * A function to customize the format of log messages.
	 */
	format?: ( v: object ) => string
	/**
	 * Determinate the level of logger.
	 *
	 * @default debug
	 */
	level?: ObjectValues<typeof levels>
}
