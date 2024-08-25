import type { ProcessExitType } from './types'

export { default as tasks } from './tasks/main'
export { default as readline } from './readline/main'
export { default as execute } from './exec/main'
export { default as spinner } from './spinner/main'

/**
 * Export types that can be used from outside.
 *
 */
export { ProcessExitType }

/**
 * Writes data to the standard output.
 *
 * @param {string} data - The data to be written.
 * @example
 * write('Lorem ipsum')
 *
 */
export const write = ( data: string ) => {

	process.stdout.write( data + '\n' )

}

/**
 * Function to exit the process with a specified type.
 *
 * @param   {ProcessExitType} [type] - The type of exit. Can be either 'succeed' or 'failed'.
 * @returns {void}
 * @example
 * // exit the process with error
 * exit('succeed');
 * // exit the process successfully
 * exit('failed');
 *
 */
export const exit = ( type: ProcessExitType = 'succeed' ) => {

	if( type === 'succeed' )
		process.exit( 0 )
	else
		process.exit( 1 )

}

