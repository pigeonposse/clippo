/**
 * LOGGER.
 *
 * @description File for set logger functions.
 */

import pino     from 'pino'
import pretty   from 'pino-pretty'
import { time } from 'process/time'

import { spinner } from '../print/main'

/**
 * Class for logger.
 *
 * @typedef {import('@topcli/spinner').Spinner} Spinner
 * @typedef {ReturnType<Logger['spinner']>} SpinnerFunct
 */

export class Logger {

	log = pino(
		{ level: 'debug' }, 
		pretty( {
			colorize : true,
			ignore   : 'pid,hostname,time',
		},
		), 
	) || console
    
	verbose = false

	/**
	 * Spinner function.
	 *
	 * @param   {string}  prefix - Prefix for spinner instance.
	 * @returns {Spinner}        - Returns Spinner type.
	 * @example
	 *
	 */
	spinner( prefix: string ){

		return spinner( {
			prefix,
			on : this.verbose ? ( {
				text, type, 
			} ) => {

				if ( this.verbose && type == 'failed' ) 
					this.error( text )
				else
					this.info( text )

			} : undefined,
		} )

	}

	/**
	 * Log data as debug if verbosity is enabled.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 *
	 */
	debug( data: string | object ){

		if( this.verbose ) this.log.debug( data ) 

	}

	/**
	 * Log data as info.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 *
	 */
	info( data: string | object ){

		this.log.info( data )

	}

	/**
	 * Log data as warning if verbosity is enabled.
	 *
	 * @param {string | object} data  - Data to log.
	 * @param {boolean}         force - Force print regardless of verbosity.
	 * @example
	 *
	 */
	warn( data: string | object, force: boolean = false ){

		if( this.verbose && !force ) this.log.warn( data )

	}

	/**
	 * Log data as error.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 *
	 */
	error( data: string | object ){

		this.log.error( data )

	}

	/**
	 * Log data as fatal error and exit process.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 *
	 */
	fatal( data: string | object ){
   
		this.log.fatal( data )
		process.exit( 1 )
    
	}

	addTimeout( processModule?: NodeJS.Process ){

		const p = processModule ? processModule : process
		const t = time()
		t.start()
		p.on( 'exit', () => {

			t.stop()
			const elapsedTime = ( t.getResult() ).toString()
			if( this.verbose )
				this.info( {
					title : 'Execution time',
					value : {
						miliseconds : elapsedTime,
						seconds     : Number( elapsedTime ) / 1000,
					},
				} )
			else
				this.info( `Execution time: ${Number( elapsedTime ) / 1000 } seconds` )
			
		} )
	
	}

}
