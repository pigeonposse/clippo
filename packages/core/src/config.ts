/**
 * Configuration function.
 *
 * @description Add configuration function.
 */
import type { ClippoMiddleware } from './types'
import deepmerge                 from 'deepmerge'

export const configMiddleware = async ( { cmds, opts, name, utils, params }: ClippoMiddleware ) => {

	let config: object = {},
		commands: object = {}, 
		options: object  = {}
	
	if( !params.config?.defaultOpts?.includes( 'config' ) ) return opts
	
	const { fs, log } = utils
	const cmdsKey     = 'cmds'
	const isObject    = ( v: unknown ) => typeof v === 'object' && v !== null && !Array.isArray( v )
	
	/**
	 * ****************************************************************************.
	 * GET CONFIG
	 * ****************************************************************************.
	 */
	
	// Auto search
	if( !( 'config' in opts ) ) {
	
		try{

			// package first
			const pkgConfig = await fs.getObjectFrom( './package.json' ) as Record<string, unknown>

			if( name in pkgConfig && isObject( pkgConfig[name] ) ) 
				config = pkgConfig[name] as object

			// get config files after. In ./[name](.yaml|.yml|json|toml)
			const fileConfig = await fs.getObjectFromPath( '.',name )
			config           = deepmerge.all( [
				config,
				fileConfig, 
			] )
		
		}catch( e ){
	
			return opts
				
		}
	
	}else if( typeof opts.config === 'string' ) 	
		config = await fs.getObjectFrom( opts.config )
	
	/**
	 * ****************************************************************************.
	 * MERGE CONFIG
	 * ****************************************************************************.
	 */

	const getArgs = ( c: object ) => {

		let commands: object = {}, 
			options: object  = {}

		if( cmdsKey in c ){

			const { [cmdsKey]: k, ...o } = c
			commands                     = isObject( k ) ? k as object : commands
			options                      = o
		
		}else
			options = config
			
		return {
			commands,
			options,
		}
		
	}
	
	const getSpecificCmds = ( commandsToFilter: object )=> {

		let commands: object = {}, 
			options: object  = {}

		const specificCmds = Object.keys( commandsToFilter ).filter( c => cmds.includes( c ) )
	
		if( specificCmds.length > 0 ){

			for ( const specificCmd of specificCmds ){

				// @ts-ignore
				if( specificCmd in config && isObject( config[specificCmd] ) ){

					// @ts-ignore
					const args = getArgs( config[specificCmd] )
					options    = {
						...args.options, 
						...options, 
					}
					commands   = {
						...args.commands, 
						...commands, 
					}

					if( cmdsKey in commands ) {

						const nestedCommands = getSpecificCmds( args.commands )
						options              = {
							...nestedCommands.options,
							...options,
						}
						commands             = {
							...nestedCommands.commands,
							...commands,
						}
					
					}
			
				}
		
			}

		}
		return {
			options, commands,
		}
	
	}

	const globalArgs = getArgs( config )
	commands         = globalArgs.commands
	options          = {
		...globalArgs.options,
		...getSpecificCmds( commands ).options,
	}
	
	return {
		...options,
		...opts,
	}

	// return config
	log.success( opts )
	// log.success( config )
		
}
