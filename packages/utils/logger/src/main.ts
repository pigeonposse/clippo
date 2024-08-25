/**
 * LOGGER.
 *
 * @description File for set logger functions.
 */

// @ts-ignore
import { spinner } from '@clippo/process'
import {
	icon,
	color,
	columns,
	highlight, 
} from '@clippo/styles'
import pino   from 'pino'
import pretty from 'pino-pretty'
import Youch  from 'youch'
// @ts-ignore
import forTerminal from 'youch-terminal'

import { time }        from './time'
import {
	levels, 
	type LoggerParams, 
} from './types'

/**
 * Export types that can be used from outside.
 *
 */
export { LoggerParams }

/**
 * Class for logger.
 *
 */
export class Logger {

	#outputFile: LoggerParams['outputFile']
	#log: ReturnType<typeof pino> | undefined = undefined
	#logFile: ReturnType<typeof pino> | undefined = undefined
	verbose = false
	levels = levels
	
	constructor( params?: LoggerParams ){

		this.#outputFile = params?.outputFile
		const opts       = {
			name           : params?.name,
			level          : params?.level || this.levels.debug,
			customLevels   : { success: 35 },
			useLevelLabels : true,
		}
		const maxLetters = Math.max( ...Object.values( levels ).map( level => level.length ) )

		if( params?.screenlog === undefined || ( params?.screenlog && params?.screenlog === true ) )
			// @ts-ignore
			this.#log = pino(
				{
					...opts,
					timestamp  : false,
					formatters : {
						level : label => {
	
							return { level: label }
					
						},
						bindings ( bindings ) {

							return {
							// pid  : bindings.pid, 
								name : bindings.name,
							// hostname : bindings.hostname, 
							}
					
						},
					},
				},  
				pretty( 
					{
						colorize      : false,
						messageFormat : params?.format ? params.format : ( log, messageKey ) => {

							const isJSON = ( value: unknown ) =>{

								try {

									if( typeof value !== 'string' ) return false
									JSON.parse( value )
									return true
								
								} catch ( _error ) {

									return false
								
								}
							
							}
							
							const msg = isJSON( log[ messageKey ] ) 
								? highlight( log[ messageKey ] as string, { language: 'json' } ) 
								: color.gray( log[ messageKey ] )
								
							const logLevel = log.level as string
							
							let styles 
							if( logLevel === 'error' ) styles = {
								text : color.red,
								icon : color.red( icon.cross ),
							}
							else if( logLevel === 'fatal' ) styles = {
								text : color.redBright,
								icon : color.redBright( icon.cross ),
							}
							else if( logLevel === 'info' ) styles = {
								text : color.blue,
								icon : color.blue( icon.info ),
							}
							else if( logLevel === 'warn' ) styles = {
								text : color.yellow,
								icon : color.yellow( icon.warning ),
							}
							else if( logLevel === 'success' ) styles = {
								text : color.green,
								icon : color.green( icon.tick ),
							}
							else styles = {
								text : color.white,
								icon : color.white( icon.info ),
							} 

							const name = log.name && typeof log.name === 'string' 
								? color.gray( ( `${ log.name }` ) ) + ' ' 
								: ''
								
							return columns(	[ {
								...( name ? { name } : {} ),
								level : `${styles.icon} ${styles.text( `${color.underline( logLevel.toUpperCase() )}` )}`,
								msg,
							} ], {
								showHeaders : false,
								config      : {
									level : {
										// this is the sum for the maxlengh of level string + spaces&ticon
										minWidth : maxLetters + 1,
									},
									msg : { maxWidth: 80 },
									
								},
								preserveNewLines : true,
								columnSplitter   : '  ',
								// truncate         : true,
							} )
							
							// return `${name}${ styles.bg( ` ${styles.icon} ${logLevel.toUpperCase()} ` ) } ${log.msg}`
			
						},
						ignore : 'pid,hostname,time,name,level',
						// customPrettifiers : {
						// 	name  : output => color.dim( color.bgBlack( ` ${output} ` ) ),
						// 	level : logLevel => {

						// 		let bgColor 
						// 		if( logLevel === 'error' || logLevel === 'fatal' ) bgColor = color.bgRed
						// 		else if( logLevel === 'info' ) bgColor = color.bgBlue
						// 		else if( logLevel === 'warn' ) bgColor = color.bgYellow
						// 		else bgColor = color.bgWhite
						// 		// @ts-ignore
						// 		return bgColor( ` ${logLevel.toUpperCase()} ` )
						
						// 	},
						// },
					
					},
				), 
			)

		if( !this.#outputFile ) return

		const currDate = new Date( ).toLocaleString( undefined, {
			timeZoneName : 'short',
			hour12       : false,
		} )
		// @ts-ignore
		this.#logFile = pino(
			{
				...opts,
				timestamp  : () => `,"time":"${currDate}"`,
				formatters : {
					level : label => {
		
						return { level: label }
						
					},
					bindings ( bindings ) {
		
						return {
							pid  : bindings.pid, 
							name : bindings.name,
							// hostname : bindings.hostname, 
						}
						
					},
				},
			},  
			pino.destination( {
				dest : this.#outputFile, 
				sync : true,
			} ),
		)
	
	}

	#validateData( data: unknown ){

		if( !data ) return ''
		if( typeof data == 'string' ) return data
		if( typeof data === 'object' ) return JSON.stringify( data, null, 2 )

		return ''
	
	}

	/**
	 * Spinner function.
	 *
	 * @param   {string} prefix - Prefix for spinner instance.
	 * @returns {object}        - Returns Spinner type.
	 * @example
	 * const spinner = loggerInstance.spinner('prefix')
	 *
	 */
	spinner( prefix: string ){

		return spinner( {
			prefix,
			overwriteOutput : this.verbose ? ( {
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
	 * loggerInstance.debug('Lorem ipsum')
	 *
	 */
	debug( data: string | object ){

		data = this.#validateData( data )
		this.#logFile?.debug( data ) 
		if( this.verbose ) this.#log?.debug( data ) 

	}

	/**
	 * Log data as info.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 * loggerInstance.info('Lorem ipsum')
	 *
	 */
	info( data: string | object ){

		data = this.#validateData( data )
		this.#logFile?.info( data ) 
		this.#log?.info( data )

	}

	/**
	 * Log data as success.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 * loggerInstance.success('Lorem ipsum')
	 *
	 */
	success( data: string | object ){

		data = this.#validateData( data )
		this.#logFile?.success( data ) 
		this.#log?.success( data )

	}

	/**
	 * Log data as warning if verbosity is enabled.
	 *
	 * @param {string | object} data  - Data to log.
	 * @param {boolean}         force - Force print regardless of verbosity.
	 * @example
	 * loggerInstance.warn('Lorem ipsum')
	 *
	 */
	warn( data: string | object, force: boolean = false ){

		data = this.#validateData( data )
		this.#logFile?.warn( data ) 
		if( this.verbose && !force ) this.#log?.warn( data )

	}

	/**
	 * Log data as error.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 * loggerInstance.error('Lorem ipsum')
	 *
	 */
	error( data: string | object ){

		data = this.#validateData( data )
		this.#logFile?.error( data ) 
		this.#log?.error( data )

	}

	/**
	 * Log data as fatal error and exit process.
	 *
	 * @param {string | object} data - Data to log.
	 * @example
	 * loggerInstance.fatal('Lorem ipsum')
	 *
	 */
	fatal( data: string | object ){

		data = this.#validateData( data )
		this.#log?.fatal( data )
		this.#logFile?.fatal( data ) 
		process.exit( 1 )
    
	}

	async #codeErrorConstructor( data: object, type: 'fatal' | 'error' ){

		const jsonResponse = await new Youch( data, {} ).toJSON()
		const terminalData = forTerminal( jsonResponse, {
			// Defaults to false
			displayShortPath     : false,
			// Defaults to single whitspace
			prefix               : '',
			// Defaults to false
			hideErrorTitle       : false,
			// Defaults to false
			hideMessage          : false,
			// Defaults to false
			displayMainFrameOnly : false,
			// Defaults to 3
			framesMaxLimit       : 1,
		} )
		this.#log?.[ type ]( terminalData )
		this.#logFile?.[ type ]( data ) 
	
	}
	
	async codeError( data: object ){

		await this.#codeErrorConstructor( data, 'error' )
	
	}
	
	async codeFatal( data: object ){

		await this.#codeErrorConstructor( data, 'fatal' )
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
