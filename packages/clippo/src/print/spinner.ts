
import type { ISpinnerOptions } from '@topcli/spinner'
import { Spinner }              from '@topcli/spinner'
import { color }                from './color'

type SpinnerEventParams = {
	instance: Spinner, 
	text: string,
	prefix?: string
	type: 'start' | 'succeed'| 'update' | 'failed'
}

type SpinnerType = {
	prefix?: string
	opts?: ISpinnerOptions
	on?: ( params : SpinnerEventParams ) => void 
} | undefined

/**
 * Spinner function.
 *
 * @param   {SpinnerType}     params        - Object for spinner opts.
 * @param   {string}          params.prefix - Prefix for spinner instance.
 * @param   {ISpinnerOptions} params.opts   - Spinner opts.
 * @param   {Function}        params.on     - Spinner hook. Used for change log.
 * @returns {object}                        - Returns an object with spinner methods.
 */
export const spinner = ( params: SpinnerType ) => {

	const defaultSpinnerOpts: ISpinnerOptions = {
		name : 'line',
	}
	
	const instance = new Spinner( 
		params?.opts ? {
			...defaultSpinnerOpts,
			...params.opts,
		} : defaultSpinnerOpts, 
	)

	return {

		/**
		 * Start the spinner with provided text.
		 *
		 * @param {string} txt - Text to display with spinner.
		 */
		start : ( txt: string ) => {

			if( params?.on ) params.on( {
				instance, 
				type   : 'start', 
				text   : txt, 
				prefix : params.prefix,
			} )
			else 
				instance.start( txt, params?.prefix ? {
					withPrefix : color.blue( params.prefix ) + ' - ',
				} : undefined )
		
		},

		/**
		 * Change text of spinner.
		 *
		 * @param {string} txt - New text for spinner.
		 */
		update : ( txt: string ) => {

			if( params?.on ) params.on( {
				instance, 
				type   : 'update', 
				text   : txt, 
				prefix : params.prefix,
			} )
			else 
				instance.text = txt
		
		},

		/**
		 * Succeed the spinner with provided text.
		 *
		 * @param {string} txt - Text to display when spinner succeeds.
		 */
		succeed : ( txt: string ) => {

			if( params?.on ) params.on( {
				instance, 
				type   : 'succeed', 
				text   : txt, 
				prefix : params.prefix,
			} )
			else
				instance.succeed( color.green( txt ) )
		
		},

		/**
		 * Fail the spinner with provided text.
		 *
		 * @param {string} txt - Text to display when spinner fails.
		 */
		failed : ( txt: string ) => {

			if( params?.on ) params.on( {
				instance, 
				type   : 'failed', 
				text   : txt, 
				prefix : params.prefix,
			} )
			else
				instance.failed( color.red( txt ) )
		
		},

		/**
		 * Reset spinner.
		 *
		 * @returns {void} - Void.
		 */
		reset : () => Spinner.reset(),

		/**
		 * Get elapsed time of spinner.
		 *
		 * @returns {number} - Elapsed time.
		 */

		getTime : () => instance.elapsedTime.toFixed( 2 ),

	}

}
