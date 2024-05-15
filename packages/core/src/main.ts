/**
 * Cli.
 *
 * @description File for set cli functions.
 * @todo Color in help.
 * @todo PkgConf in subcommands.
 * @todo Fix output in verbose. One line is removed.
 * @todo Create extends function for add pluggins or themes.
 */
import yargs              from 'yargs'
import { hideBin }        from 'yargs/helpers'
import * as styles        from '@clippo/styles'
import { Logger }         from '@clippo/logger'
import { Fs }             from '@clippo/fs'
import * as clippoProcess from '@clippo/process'
import i18n               from '@clippo/i18n'
import Handlebars         from 'handlebars'

import {
	optType, optionTypes, 
} from './types'
import type {
	Option, 
	ClippoArgs,
	ClippoReturnedType,
} from './types'
import { mergeConfig } from './extends'
import { updater }     from './updater'
import { middleware }  from './middleware'

const clippoLogger = new Logger( {
	name : 'CLIPPO',
} )

/**
 * Clippo.
 *
 * @description                                    This function handles command line arguments for the CLI application.
 * @tutorial clippo
 * @param       {ClippoArgs}                  args - Object containing command line arguments.
 * @returns     {Promise<ClippoReturnedType>}      - Promise representing the execution of the function.
 * @example 
 * import { description, version, name } from './package.json'
 * const cli = await clippo({
 *    name,
 *    version,
 *    description,
 *    // more options
 * })
 *
 */
export default async function clippo( args: ClippoArgs ): Promise<ClippoReturnedType> {

	try {

		let params           = mergeConfig( args )
		clippoLogger.verbose = true
		
		const version = params.version
		const name    = params.name

		if( !params.config?.i18n || params.config?.i18n === undefined ) throw Error( 'i18n cannot be undefined' )

		const log   = new Logger( params.config.logger )
		const I18N  = await i18n( params.config.i18n )
		const { _ } = I18N

		Handlebars.registerHelper( '_', value => _( value ) )

		const replaceValues = <T extends Record<string, unknown>>( template:T, data: Record<string, unknown> ): T => {

			const result: T = {
				...template, 
			}
		
			for ( const key in result ) {

				if ( Object.prototype.hasOwnProperty.call( result, key ) ) {

					const value = result[key]
					if ( typeof value === 'object' && !Array.isArray( value ) ) {

						// @ts-ignore
						result[key] = replaceValues( value, data )
					
					} else if ( typeof value === 'string' ) {

						// @ts-ignore
						result[key] = Handlebars.compile( value )( data )
					
					}
				
				}
			
			}
		
			return result
		
		}

		params = replaceValues( params, {
			name,
		} )

		const utils = {
			showHelp    : () => {},
			...I18N, 
			styles, 
			log, 
			fs          : new Fs(), 
			thisProcess : clippoProcess,
			updater     : await updater( {
				name, 
				version,
				config : params.config?.updater,
			} ),
		}

		const validateAndtransform = ( value: unknown, opt: Option, key: string ) =>{

			try {

				if ( opt.type === 'object' ) {

					if ( typeof value === 'string' && JSON.parse( value ) ) 
						return JSON.parse( value )
				
				} else if ( opt.type === 'array' ) {

					if ( Array.isArray( value ) ) return value
					throw Error( `[${key}] must be an array.` )
				
				} else if ( opt.type === 'choices' ) {

					if ( !Array.isArray( value ) && typeof value !== 'object' ) 
						return value
					throw Error
				
				}else if( opt.type === 'string' ) {

					if ( typeof value === opt.type || value === undefined ) return value
					throw Error
				
				}else{

					if( !params.config?.customTypes ) throw Error
					Object.entries( params.config?.customTypes ).filter( ( [
						k,v, 
					] ) => {

						if( k === opt.type ){

							const valid = v.validate( value )
							if( valid ) return value
							else throw Error
						
						}
					
					} )
				
				}

				return value
			
			}catch( e ){

				throw Error( `[${key}] must have a type value: ${opt.type}` )
			
			}
	
		}
	
		const formatOpts = ( opts: NonNullable<ClippoArgs['opts']> ) => {

			const transformedOptions: Record<string, {[k in string]: unknown}> = {}
			
			const getType = ( s: Option['type'] ) => s === undefined ? 'boolean' : s === 'boolean' || s === 'number' || s === 'choices' || s === 'array' ? s : 'string'

			for ( const key in opts ) {

				const opt = opts[key]
	
				transformedOptions[key] = {
					desc         : opt.desc,
					alias        : opt.alias,
					type         : getType( opt.type ),
					// config       : true,
					demandOption : opt.required,
					coerce       : ( value: typeof opt.default ) => validateAndtransform( value, opt, key ),
				}
		
				if( 'default' in opt ) transformedOptions[key].default = opt.default
				if( 'choices' in opt ) transformedOptions[key].choices = opt.choices
		
			}
	
			return transformedOptions
	
		} 
		const getCmdKey      = ( key: string, positionals: ClippoArgs['positionals'] ) => {

			return !positionals ? 
				key : 
				key + ' ' + Object.entries( positionals ).map( ( [
					k, v,
				] ) => v.required ? `<${k}>` : `[${k}]` ).join( ' ' )
		
		}
		const addPositionals = ( argv: typeof yargs, positionals: NonNullable<ClippoArgs['positionals']> ) => {

			const getPositionalType = ( s: Option['type'] ) => s === undefined ? 'boolean' : s === 'boolean' || s === 'number' ? s : 'string'
			
			for ( const key in positionals ) {

				const positional = positionals[key]
				
				const opts: Parameters<typeof argv.positional>[1] = {
					desc         : positional.desc,
					type         : getPositionalType( positional.type ),
					demandOption : positional.required || false,
					default      : positional.default,
					coerce       : v => validateAndtransform( v, positional, key ),
				} 
				// if( positional.default ) opts.default = positional.default
				// if( positional.required ) opts.demandOption = positional.required
				// if( positional.choices ) opts.choices = positional.choices
				// console.log( opts )
				argv.positional( key, opts ) 

			} 
	
		}

		const addCmds = ( argv: typeof yargs, cmds: NonNullable<ClippoArgs['cmds']> ) => {

			for ( const key in cmds ) {

				const cmd = cmds[key]

				argv.command( 
					getCmdKey( key, cmd.positionals ),
					cmd.desc, 
					childArgv => {

						if( cmd.positionals ) addPositionals( childArgv, cmd.positionals )
						if( cmd.cmds ) addCmds( childArgv, cmd.cmds )
						if( cmd.opts ) childArgv.options( formatOpts( cmd.opts ) )

						return childArgv

					}, 
				)
		
			}
	
		}

		const argv = yargs( hideBin( args.config?.argv ? args.config?.argv : process.argv ) )
			.scriptName( name )
			.version( false )
	
		const defaultOpts =  params.config?.defaultOpts
		
		if( 'positionals' in params && params.positionals !== undefined && typeof params.positionals === 'object' && !Array.isArray( params.positionals ) ) 
			argv.command( 
				getCmdKey( '$0', params.positionals ),
				params.desc, 
				// @ts-ignore
				childArgv => addPositionals( childArgv, params.positionals ), 
			)
	
		if( params.cmds ) addCmds( argv, params.cmds )

		if( !params.opts ) params.opts = {}

		if ( defaultOpts?.includes( optType.verbose.name ) )
			params.opts[optType.verbose.name] = {
				alias : optType.verbose.aliases,
				type  : optionTypes.boolean,
				desc  : _( 'general:verboseDesc' ),
			} 

		if ( defaultOpts?.includes( optType.time.name ) )
			params.opts[optType.time.name] = {
				alias : optType.time.aliases,
				type  : optionTypes.boolean,
				desc  : _( 'general:timeDesc' ),
			}

		if ( defaultOpts?.includes( optType.config.name ) )
			params.opts[optType.config.name] = {
				alias : optType.config.aliases,
				type  : optionTypes.string,
				desc  : _( 'general:configDesc', {
					name,
				} ),
			} 

		params.opts[optType.version.name] = {
			alias : optType.version.aliases,
			type  : optionTypes.boolean,
			desc  : _( 'general:versionDesc' ),
		}

		params.opts[optType.help.name] = {
			alias : optType.help.aliases,
			type  : optionTypes.boolean,
			desc  : _( 'general:helpDesc' ),
		} 

		const globalOpts = [
			...Object.keys( params.opts ), 
			optType.help.name,
		]

		argv.options( formatOpts( params.opts ) )
			.help( false )
			.alias( optType.help.aliases[0], optType.help.name )
			.group( globalOpts, _( 'general:globalOptions' ) )
			.showHelpOnFail( false )
			.fail( msg => log.fatal( msg ) )
			.strict()
			.parse()

		const { $0, _: cmds, ...opts } = await argv.argv
		const options                  = await middleware( {
			name, version, cmds, opts, params, utils,
		} )
		const res: ClippoReturnedType  = {
			name : $0, 
			version, 
			cmds, 
			opts : options, 
			utils,
		}

		// clippoLogger.debug( res )
		
		return res 

	}catch( e ){

		clippoLogger.codeFatal( e as Error )
		process.exit( 0 )
	
	}

}
