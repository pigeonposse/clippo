/**
 * Cli.
 *
 * @description File for set cli functions.
 * @todo Color in help.
 * @todo PkgConf in subcommands.
 * @todo Fix output in verbose. One line is removed.
 * @todo Create extends function for add pluggins or themes.
 */

import type {
	ArgumentsCamelCase, InferredOptionTypes, 
} from 'yargs'
import yargs              from 'yargs'
import { hideBin }        from 'yargs/helpers'
import updateNotifier     from 'update-notifier'
import * as print         from '../print/main'
import { Logger }         from '../logger/main'
import { Fs }             from '../fs/main'
import { Process }        from '../process/main'
import { Locales }        from './locales'
import {
	defaultCustomOpts,
	optType, optionTypes, 
} from './types'
import type {
	Option, CliArgs,
	Command,
	CliHookParams,
} from './types'

/**
 * Clippo.
 *
 * @typedef {import("./types").CliArgs} CliArgs                                                                This function handles command line arguments for the CLI application.
 * @description
 * @param       {CliArgs}                             args                       - Object containing command line arguments.
 * @param       {CliArgs['name']}                     args.name                  - The name of the CLI application.
 * @param       {CliArgs['version']}                  args.version               - The version of the CLI application.
 * @param       {CliArgs['desc']}                     args.desc                  - The description of the CLI application.
 * @param       {CliArgs['colors']}                   args.colors                - The type of colors used in the CLI application.
 * @param       {CliArgs['usage']}                    [args.usage]               - Information on how to use the CLI application (optional).
 * @param       {CliArgs['font']}                     [args.font]                - The type of font used in the CLI application (optional).
 * @param       {CliArgs['docsUrl']}                  [args.docsUrl]             - URL of the documentation for the CLI application (optional).
 * @param       {CliArgs['cmds']}                     args.cmds                  - List of commands available in the CLI application.
 * @param       {CliArgs['argv']}                     [args.argv]                - Command line arguments (optional).
 * @param       {CliArgs['hooks']}                    [args.hooks]               - Execution hooks for specific actions (optional).
 * @param       {CliArgs['locales']}                  [args.locales]             - Configuration for internationalization (optional).
 * @param       {CliArgs['locales']['dir']}           args.locales.dir           - Directory containing language files.
 * @param       {CliArgs['locales']['defaultLocale']} args.locales.defaultLocale - Default language of the application.
 * @param       {CliArgs['opts']}                     [args.opts]                - Additional options for configuring the CLI application (optional).
 * @returns     {Promise<object>}                                                - Promise representing the execution of the function.
 * @example h
 *
 */
export default async function clippo( args: CliArgs ) {

	const log         = new Logger()
	const fs          = new Fs()
	const thisProcess = new Process( log )

	const locales     = new Locales( {
		yargs, 
		dir          : args.locales?.dir, 
		defaltLocale : args.locales?.defaltLocale, 
	} )
	const mainColors  = args.title?.colors || [
		'red', 'green', 'blue',
	]
	const mainFont    = args.title?.font || 'ANSI Regular'
	const defaultOpts = args.defaultOpts && Array.isArray( args.defaultOpts ) ? 
		args.defaultOpts : 
		Object.values( defaultCustomOpts )
	
	const mainTitleStyle = ( ) => {

		if( args.title?.value === undefined || args.title?.value !== false ){

			const title = typeof args.title?.value === 'string' ? args.title.value : args.name
			return args.styles?.mainTitle ? 
				args.styles.mainTitle( title, print ) :
				'\n' + print.gradient( print.font( `${title.toUpperCase()}`, mainFont ), mainColors ) + '\n'
		
		}
	
	}

	const descStyle         = ( s: string ) => args.styles?.desc ? args.styles.desc( s, print ) : print.color.white( print.color.dim( s ) )
	const sectionTitleStyle = ( s: string ) => args.styles?.sectionTitle ? args.styles.sectionTitle( s, print ) : print.color.white( print.color.bold( s ) )
	const nameStyle         = ( s: string ) => args.styles?.cliName ? args.styles.cliName( s, print ) : print.color.magenta( s )
	const cmdStyle          = ( s: string ) => args.styles?.cmd ? args.styles.cmd( s, print ) : print.color.blue( s )
	const optStyle          = ( s: string ) => args.styles?.opt ? args.styles.opt( s, print ) : print.color.green( s )
	const requiredStyle     = ( s: string ) => args.styles?.required ? args.styles.required( s, print ) : print.color.red( s )
	const defaultStyle      = ( s: string ) => args.styles?.default ? args.styles.default( s, print ) : print.color.white( print.color.dim( s ) )
	const typeStyle         = ( s: string ) => args.styles?.type ? args.styles.type( s, print ) : print.color.white( s )
	const choicesStyle      = ( s: string ) => args.styles?.choices ? args.styles.choices( s, print ) : print.color.white( print.color.dim( s ) )
	const linkStyle         = ( s: string ) => args.styles?.link ? args.styles.link( s, print ) : descStyle( print.color.italic( print.color.underline( s ) ) )
	const exampleStyle      = ( s: string ) => args.styles?.example ? args.styles.example( s, print ) : print.color.white( s )
	
	const version = args.version

	const prefixType = 'type_'
	const text       = {
		globalOptions                      : 'Global options:',
		options                            : 'Options:',
		commands                           : 'Commands:',
		examples                           : 'Examples:' ,
		docs                               : 'Documentation:',
		usage                              : 'Usage:',
		usageCmds                          : '<command/s>',
		usageOpts                          : '[option/s>]',
		versionDesc                        : 'Show Version number' ,
		timeDesc                           : 'Show timeout',
		helpDesc                           : 'Show Help',
		verboseDesc                        : 'Run with verbose logging',
		configDesc                         : `Get your configuration from a custom config file. \nFormats supported: JSON, YAML or TOML. You can get config from local path or url. Automatically searches for: (./package.json).${args.name} or ./${args.name}.[json|yaml|yml|toml].`,
		requiredTitle                      : 'required',
		choicesTitle                       : 'choices',
		defaultTitle                       : 'default',
		[prefixType + optionTypes.array]   : 'array',
		[prefixType + optionTypes.string]  : 'string',
		[prefixType + optionTypes.boolean] : 'boolean',
		[prefixType + optionTypes.choices] : 'choices',
		[prefixType + optionTypes.object]  : 'object',
		[prefixType + optionTypes.number]  : 'number',
	}

	const types = {
		getOption     : ( s: Option['type'] ) => s === 'object' ? 'string' : s,
		getPositional : ( s: Option['type'] ) => s === 'object' || s === 'array' || s === 'choices' ? 'string' : s,
		validateAndtransform( value: unknown, opt: Option ){

			try {

				if( opt.type === 'object' ) {

					if( typeof value === 'string' && JSON.parse( value ) ) return JSON.parse( value )
				
				}else if( opt.type === 'array' )
					return Array.isArray( value ) ? value : Error
				else if ( opt.type === 'choices' )
					return !Array.isArray( value ) && typeof value !== 'object' ? value : Error
		
				return typeof value === opt.type ? value : Error
			
			}catch( e ){

				throw Error( `[${opt.key}] must have a type value: ${opt.type}` )
			
			}
		
		},
	}
	
	const formatOpts = ( opts: Option[] ) => {

		const transformedOptions = {}

		for ( const opt of opts ) {

			// @ts-ignore
			transformedOptions[opt.key] = {
				desc         : descStyle( opt.desc ),
				alias        : opt.alias,
				type         : opt.type,
				// config       : true,
				demandOption : opt.required,
				coerce       : ( key: typeof opt.default ) => types.validateAndtransform( key, opt ),
			}
			// @ts-ignore
			if( opt.default ) transformedOptions[opt.key].default = opt.default
			// @ts-ignore
			if( opt.choices ) transformedOptions[opt.key].choices = opt.choices
		
		}
	
		return transformedOptions
	
	} 
	
	const addPositionals = ( argv: typeof yargs, values: Option[] ) => {

		for ( const value of values ) {

			const opts = {
				desc         : descStyle( value.desc ),
				type         : types.getPositional( value.type ),
				demandOption : value.required,
				coerce       : ( key: typeof value.default ) => types.validateAndtransform( key, value ),
			}

			// @ts-ignore
			if( value.default ) opts.default = opt.default
			// @ts-ignore
			if( value.choices ) opts.choices = opt.choices
			
			argv.positional( value.key, opts ) 

		}
	
	}

	const addCmds = ( argv: typeof yargs, cmds: Command[] ) => {

		for ( let i = 0; i < cmds.length; i++ ) {

			const cmd = cmds[i]
			argv.command( 
				cmd.key, 
				cmd.desc, 
				childArgv => {

					if( cmd.positionals ) addPositionals( childArgv, cmd.positionals )
					// addConfigCommand( childArgv, cmd.key )
					if( cmd.cmds ) addCmds( childArgv, cmd.cmds )
					if( cmd.opts ) childArgv.option( formatOpts( cmd.opts ) )

					return childArgv

				} )
		
		}
	
	}

	// const addConfigCommand = ( argv: typeof yargs, key: string ) => {

	// 	if ( args.configFile !== false ) argv.pkgConf( key )

	// }

	const argv = yargs( hideBin( args.argv ? args.argv : process.argv ) )
		.scriptName( args.name )
		.version( false )
	
	// addConfigCommand( argv, args.name )

	if( args.cmds ) addCmds( argv,args.cmds )

	if( !args.opts ) args.opts = []

	if ( defaultOpts.includes( optType.verbose.name ) ){

		args.opts.push( {
			key   : optType.verbose.name,
			alias : optType.verbose.aliases,
			type  : optionTypes.boolean,
			desc  : text.verboseDesc,
		} )
	
	}

	if ( defaultOpts.includes( optType.time.name ) ){

		args.opts.push( {
			key   : optType.time.name,
			alias : optType.time.aliases,
			type  : optionTypes.boolean,
			desc  : text.timeDesc,
		} )
	
	}
	if ( defaultOpts.includes( optType.config.name ) ){

		args.opts.push( {
			key   : optType.config.name,
			alias : optType.config.aliases,
			type  : optionTypes.string,
			desc  : text.configDesc,
		} )
	
	}
	args.opts.push( {
		key   : optType.version.name,
		alias : optType.version.aliases,
		type  : optionTypes.boolean,
		desc  : text.versionDesc,
	} )
	args.opts.push( {
		key   : optType.help.name,
		alias : optType.help.aliases,
		type  : optionTypes.boolean,
		desc  : text.helpDesc,
	} )

	const gOpts = [
		...Object.values( args.opts ).map( option => option.key ), 
		optType.help.name,
	]

	const showHelp = async ( params : CliHookParams ) => {

		if( args.hooks?.beforeHelp ) await args.hooks.beforeHelp( params )

		const title = mainTitleStyle( ) 
		if( title ) thisProcess.write( title )
		
		if( args.hooks?.afterHelpTitle ) await args.hooks.afterHelpTitle( params )

		if( args.desc ) thisProcess.write( descStyle( args.desc ) + '\n' )
		
		if( args.usage !== false ) {

			const usageDesc = args.usage ? args.usage : `${nameStyle( args.name )} ${cmdStyle( text.usageCmds )} ${optStyle( text.usageOpts )}`
			thisProcess.write( `${sectionTitleStyle( text.usage )} ${descStyle( usageDesc )}` )
		
		}
		
		const wrap     = '   '
		const writeCol = ( i:object[] ) => thisProcess.write( print.columns( i, {
			maxWidth       : 50,
			columnSplitter : wrap,
			showHeaders    : false,
		} ) )
		
		const writeCmdHelp = ( cmds: Command[] )=> {

			writeCol( cmds.map( cmd => {

				const key = [
					nameStyle( wrap + args.name ),
					cmdStyle( cmd.key ),
				].join( ' ' )

				return {
					key,
					desc : descStyle( cmd.desc ),
				}
			
			} ) )
		
		}
		
		const writeOptsHelp = ( opts: Option[] )=> {

			writeCol( opts.map( opt => {

				const values = [
					...( opt.alias ?? [] ), 
					opt.key,
				].map( value => {

					if ( value.length > 2 ) return `--${value}`
					return `-${value}`
				
				} ).join( ', ' )
				
				const props = [
					typeStyle( `[${text[prefixType + opt.type]}]` ),
				]
				if( opt.required ) props.push( requiredStyle( `[${text.requiredTitle}]` ) )
				if( opt.default ) props.push( defaultStyle( `[${text.defaultTitle}=${opt.default}]` ) )
				if( opt.type === optionTypes.choices && opt.choices ) props.push( choicesStyle( `[${text.choicesTitle}=${opt.choices.join( ', ' )}` ) )

				return {
					key   : optStyle( wrap + values ),
					desc  : descStyle( opt.desc ),
					props : props.join( ' ' ),
				}
			
			} ) )
		
		}

		if( args.cmds ){

			writeCmdHelp
			// @ts-ignore
			if( params.cmds.length <= 0 ){

				thisProcess.write( `\n${sectionTitleStyle( text.commands )}\n` )
				writeCmdHelp( args.cmds )
			
			}
		
		}
		if( args.opts ){

			thisProcess.write( `\n${sectionTitleStyle( text.globalOptions )}\n` )
			writeOptsHelp( args.opts )
		
		}

		// argv.showHelp()

		if( args.examples ) {

			thisProcess.write( `\n${sectionTitleStyle( text.examples )}\n` )

			writeCol( args.examples.map( example => {

				return {
					value : exampleStyle( example.value ),
					desc  : descStyle( wrap + example.desc ), 
				}
			
			} ) )
		
		}

		if( args.docsUrl ) thisProcess.write( `\n${sectionTitleStyle( text.docs )} ${linkStyle( args.docsUrl )}` )
		thisProcess.write( '' )
		if( args.hooks?.afterHelp ) await args.hooks.afterHelp( params )
	
	}
	const updateNot = async () => {
		
		// const name           = '`{packageName}`'
		const currentVersion = '`{currentVersion}`'
		const latestVersion  = '`{latestVersion}`'
		const updateCommand  = '`{updateCommand}`'

		await updateNotifier( {
			pkg : {
				name : args.name, 
				version,
			},
		} ).notify( {
			message      : `${print.color.red( currentVersion )} → ${print.color.green( latestVersion )}\n\n${updateCommand}`,
			boxenOptions : {
				title          : 'Update available',
				textAlignment  : 'center',
				titleAlignment : 'center',
				padding        : 1, 
				margin         : 1, 
				borderColor    : 'yellow', 
				borderStyle    : 'round',
			},
		} )
	
	}
	// eslint-disable-next-line @typescript-eslint/ban-types
	const middleware = async ( innerArgv: ArgumentsCamelCase<yargs.Omit<{}, never> & InferredOptionTypes<{}>> ) => {

		const { $0, _, ...opts } = innerArgv
		if ( opts.verbose ) log.verbose = true
		if ( opts.time ) log.addTimeout()

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const name        = $0 
		const cmds        = _ || undefined
		const hooksParams = {
			cmds,
			opts,
		}

		if( !opts.config ) {

			try{

				const p = await fs.getObjectFrom( './package.json' )
				// @ts-ignore
				if( p[args.name] ) thisProcess.write( JSON.stringify( p[args.name] ) )
				const c = await fs.getObjectFromPath( '.',args.name )
				thisProcess.write( JSON.stringify( c ) )
			
			}catch( e ){

				// @ts-ignore
				thisProcess.write( e )
			
			}
		
		}else if( opts.config && typeof opts.config === 'string' ) {

			const c = await fs.getObjectFrom( opts.config )
			thisProcess.write( c.toString() )
		
		}

		console.log( hooksParams )
		// console.log( hooksParams )
		if( args.hooks?.beforeAll ) await args.hooks.beforeAll( hooksParams )

		if( args.updater === undefined || args.updater === true ) await updateNot()

		if ( ( !cmds || !Array.isArray( cmds ) || cmds.length <= 0 ) || opts.help || opts.h ) {

			await showHelp( hooksParams )
			
			thisProcess.exit()
			
		}

		if ( opts.version ) {

			if( args.hooks?.beforeVersion ) await args.hooks.beforeVersion( hooksParams )
		
			thisProcess.write( print.color.bgGreen( ` ${version} ` ) )
			if( args.hooks?.afterVersion ) await args.hooks.afterVersion( hooksParams )

			thisProcess.exit()
		
		}
	
	}

	argv.options( formatOpts( args.opts ) )
		// .locale('en')
		// .help( optType.help.name, descStyle( text.helpDesc ) )
		// .help( false )
		// .alias( optType.help.aliases[0], optType.help.name )
		.group( gOpts, text.globalOptions + '\n' )
		.showHelpOnFail( false )
		.middleware( [
			middleware,
		] )
		.strict()
		.parseAsync()
	
	// @ts-ignore
	const { $0, _, ...opts } = argv.parsed.argv
	const name               = $0
	const cmds               = _

	return {
		name,
		version,
		cmds,
		opts,
		showHelp : () => showHelp( {
			cmds, opts,
		} ),
		locales, 
		print, 
		fs, 
		log, 
		process : thisProcess,
	}

}
