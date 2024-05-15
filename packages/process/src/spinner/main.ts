/* eslint-disable jsdoc/require-example */

import { Spinner }          from '@topcli/spinner'
import { color }            from '@clippo/styles'
import type { SpinnerOpts } from './types'

/**
 * Export types that can be used from outside.
 *
 */
export {
	SpinnerOpts,
}

/**
 * Spinner function.
 *
 * @param   {SpinnerOpts}                    params                 - Object for spinner options.
 * @param   {string}                         params.prefix          - Prefix for spinner instance.
 * @param   {SpinnerOpts['name']}            params.name            - Spinner name.
 * @param   {SpinnerOpts['color']}           params.color           - Spinner color.
 * @param   {SpinnerOpts['overwriteOutput']} params.overwriteOutput - Spinner hook. Used for change log.
 * @returns {object}                                                - Returns an object with spinner methods.
 * @example
 * const load = spinner({prefix: 'DEV', name: 'dots' })
 * load.start('Starting...')
 * try {
 *   // your code
 *   load.update( 'updating...' )
 *   // your code
 *   load.succeed('Starting...')
 * }catch(e){
 *   load.failed('Failed')
 * }
 * 
 * 
 */
export default function spinner ( params?: SpinnerOpts ){

	let start: number, 
		stop: number

	const { prefix, overwriteOutput, ...options } = params ?? {}

	const defaultSpinnerOpts = {
		name : 'line' as SpinnerOpts['name'],
	}
	
	const instance = new Spinner( 
		options ? {
			...defaultSpinnerOpts,
			...options,
		} : defaultSpinnerOpts, 
	)
	
	const getTime = ( now: number ) => start && now ? now - start : undefined

	return {

		/**
		 * Start the spinner with provided text.
		 *
		 * @param {string} text - Text to display with spinner.
		 */
		start : ( text: string ) => {

			start = performance.now()
			if( overwriteOutput ) overwriteOutput( {
				type : 'start', 
				time : getTime( start ),
				text, 
				prefix,
			} )
			else
				instance.start( text, prefix ? {
					withPrefix : color.blue( prefix ) + ' ',
				} : undefined )
		
		},

		/**
		 * Change text of spinner.
		 *
		 * @param {string} text - New text for spinner.
		 */
		update : ( text: string ) => {

			if( overwriteOutput ) overwriteOutput( {
				type : 'update', 
				time : getTime( performance.now() ),
				text, 
				prefix,
			} )
			else
				instance.text = text
		
		},

		/**
		 * Succeed the spinner with provided text.
		 *
		 * @param {string} text - Text to display when spinner succeeds.
		 */
		succeed : ( text: string ) => {

			stop = performance.now()
			if( overwriteOutput ) overwriteOutput( {
				type : 'succeed', 
				time : getTime( stop ),
				text, 
				prefix,
			} )
			else
				instance.succeed( color.green( text ) )
		
		},

		/**
		 * Fail the spinner with provided text.
		 *
		 * @param {string} text - Text to display when spinner fails.
		 */
		failed : ( text: string ) => {

			stop = performance.now()
			if( overwriteOutput ) overwriteOutput( {
				type : 'failed', 
				text, 
				time : getTime( stop ),
				prefix,
			} )
			else
				instance.failed( color.red( text ) )
		
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
		 * @returns {number | undefined} - Elapsed time.
		 */
		getTime : () => getTime( performance.now() ),
		
		/**
		 * Get time result of spinner from start to stop.
		 *
		 * @returns {number | undefined} - Time result.
		 */
		getTimeResult : () => getTime( stop ),

	}

}
