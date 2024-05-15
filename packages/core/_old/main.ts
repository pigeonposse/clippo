// /**
//  * Cli.
//  *
//  * @description File for set cli functions.
//  * @todo Color in help.
//  * @todo PkgConf in subcommands.
//  * @todo Fix output in verbose. One line is removed.
//  * @todo Create extends function for add pluggins or themes.
//  */

// import type {
// 	ArgumentsCamelCase, InferredOptionTypes, 
// } from 'yargs'
// import yargs              from 'yargs'
// import { hideBin }        from 'yargs/helpers'
// import { updater }        from '@clippo/updater'
// import * as print         from '@clippo/styles'
// import { Logger }         from '@clippo/logger'
// import { Fs }             from '@clippo/fs'
// import * as ClippoProcess from '@clippo/process'
// import i18n               from '@clippo/i18n'
// import {
// 	defaultCustomOpts,
// 	optType, optionTypes, 
// } from './types'
// import type {
// 	Option, 
// 	ClippoArgs,
// 	Command,
// 	CliHookParams,
// } from './types'
// import { mergeLocales } from './locales'
// import deepmerge        from 'deepmerge'
// import { mergeConfig }  from './extends'

// /**
//  * Clippo.
//  *
//  * @description                        This function handles command line arguments for the CLI application.
//  * @tutorial clippo
//  * @param       {ClippoArgs}      args - Object containing command line arguments.
//  * @returns     {Promise<object>}      - Promise representing the execution of the function.
//  * @example 
//  * import { description, version, name } from './package.json'
//  * const cli = await clippo({
//  *    name,
//  *    version,
//  *    description,
//  *    // more options
//  * })
//  *
//  */
// export default async function clippo( args: ClippoArgs ) {

// 	const log         = new Logger()
// 	const fs          = new Fs()
// 	const thisProcess = ClippoProcess
// 	const params      = mergeConfig( args )
	
// 	const version = params.version
// 	const name    = params.name

// 	if( params.config?.i18n || params.config?.i18n === undefined ) throw Error( 'you need to set i18n' )
	
// 	const I18N  = await i18n( params.config.i18n )
// 	const { _ } = I18N

// 	// const mainColors  = args.help?.title?.colors || [
// 	// 	'red', 'green', 'blue',
// 	// ]
// 	// const mainFont    = args.help?.title?.font || 'ANSI Regular'
// 	// const defaultOpts = args.config?.defaultOpts && Array.isArray( args.config?.defaultOpts ) ? 
// 	// 	args.config?.defaultOpts : 
// 	// 	Object.values( defaultCustomOpts )
	
// 	// const mainTitleStyle = ( ) => {

// 	// 	if( args.help?.title?.value === undefined || args.help?.title?.value !== false ){

// 	// 		const title = typeof args.help?.title?.value === 'string' ? args.help?.title.value : name
// 	// 		return args.styles?.mainTitle ? 
// 	// 			args.styles.mainTitle( title, print ) :
// 	// 			'\n' + print.gradient( print.font( `${title.toUpperCase()}`, mainFont ), mainColors ) + '\n'
		
// 	// 	}
	
// 	// }

// 	// const descStyle         = ( s: string ) => args.styles?.desc ? args.styles.desc( s, print ) : print.color.white( print.color.dim( s ) )
// 	// const sectionTitleStyle = ( s: string ) => args.styles?.sectionTitle ? args.styles.sectionTitle( s, print ) : print.color.white( print.color.bold( s ) )
// 	// const nameStyle         = ( s: string ) => args.styles?.cliName ? args.styles.cliName( s, print ) : print.color.magenta( s )
// 	// const cmdStyle          = ( s: string ) => args.styles?.cmd ? args.styles.cmd( s, print ) : print.color.blue( s )
// 	// const optStyle          = ( s: string ) => args.styles?.opt ? args.styles.opt( s, print ) : print.color.green( s )
// 	// const requiredStyle     = ( s: string ) => args.styles?.required ? args.styles.required( s, print ) : print.color.red( s )
// 	// const defaultStyle      = ( s: string ) => args.styles?.default ? args.styles.default( s, print ) : print.color.white( print.color.dim( s ) )
// 	// const typeStyle         = ( s: string ) => args.styles?.type ? args.styles.type( s, print ) : print.color.white( s )
// 	// const choicesStyle      = ( s: string ) => args.styles?.choices ? args.styles.choices( s, print ) : print.color.white( print.color.dim( s ) )
// 	// const linkStyle         = ( s: string ) => args.styles?.link ? args.styles.link( s, print ) : descStyle( print.color.italic( print.color.underline( s ) ) )
// 	// const exampleStyle      = ( s: string ) => args.styles?.example ? args.styles.example( s, print ) : print.color.white( s )

// 	const prefixType = 'type_'
// 	// const text       = {
// 	// 	options                                 : _( 'general:options' ),
// 	// 	commands                                : _( 'general:commands' ),
// 	// 	examples                                : _( 'general:examples' ),
// 	// 	docs                                    : _( 'general:docs' ),
// 	// 	usage                                   : _( 'general:usage' ),
// 	// 	usageCmds                               : _( 'general:usageCmds' ),
// 	// 	usageOpts                               : _( 'general:usageOpts' ),
// 	// 	versionDesc                             : _( 'general:versionDesc' ),
// 	// 	timeDesc                                : _( 'general:timeDesc' ),
// 	// 	helpDesc                                : _( 'general:helpDesc' ),
// 	// 	verboseDesc                             : _( 'general:verboseDesc' ),
// 	// 	requiredTitle                           : _( 'general:requiredTitle' ),
// 	// 	choicesTitle                            : _( 'general:choicesTitle' ),
// 	// 	defaultTitle                            : _( 'general:defaultTitle' ),
// 	// 	[`${prefixType}${optionTypes.array}`]   : _( 'general:array' ),
// 	// 	[`${prefixType}${optionTypes.string}`]  : _( 'general:string' ),
// 	// 	[`${prefixType}${optionTypes.boolean}`] : _( 'general:boolean' ),
// 	// 	[`${prefixType}${optionTypes.choices}`] : _( 'general:choices' ),
// 	// 	[`${prefixType}${optionTypes.object}`]  : _( 'general:object' ),
// 	// 	[`${prefixType}${optionTypes.number}`]  : _( 'general:number' ),
// 	// }
// 	// return	
// 	const types = {
// 		getOption     : ( s: Option['type'] ) => s === 'object' ? 'string' : s,
// 		getPositional : ( s: Option['type'] ) => s === 'object' || s === 'array' || s === 'choices' ? 'string' : s,
// 		validateAndtransform( value: unknown, opt: Option ){

// 			try {

// 				if( opt.type === 'object' ) {

// 					if( typeof value === 'string' && JSON.parse( value ) ) return JSON.parse( value )
				
// 				}else if( opt.type === 'array' )
// 					return Array.isArray( value ) ? value : Error
// 				else if ( opt.type === 'choices' )
// 					return !Array.isArray( value ) && typeof value !== 'object' ? value : Error
		
// 				return typeof value === opt.type ? value : Error
			
// 			}catch( e ){

// 				throw Error( `[${opt.key}] must have a type value: ${opt.type}` )
			
// 			}
		
// 		},
// 	}
	
// 	const formatOpts = ( opts: Option[] ) => {

// 		const transformedOptions = {}

// 		for ( const opt of opts ) {

// 			// @ts-ignore
// 			transformedOptions[opt.key] = {
// 				desc         : descStyle( opt.desc ),
// 				alias        : opt.alias,
// 				type         : opt.type,
// 				// config       : true,
// 				demandOption : opt.required,
// 				coerce       : ( key: typeof opt.default ) => types.validateAndtransform( key, opt ),
// 			}
// 			// @ts-ignore
// 			if( opt.default ) transformedOptions[opt.key].default = opt.default
// 			// @ts-ignore
// 			if( opt.choices ) transformedOptions[opt.key].choices = opt.choices
		
// 		}
	
// 		return transformedOptions
	
// 	} 
	
// 	const addPositionals = ( argv: typeof yargs, values: Option[] ) => {

// 		for ( const value of values ) {

// 			const opts = {
// 				desc         : descStyle( value.desc ),
// 				type         : types.getPositional( value.type ),
// 				demandOption : value.required,
// 				coerce       : ( key: typeof value.default ) => types.validateAndtransform( key, value ),
// 			}

// 			// @ts-ignore
// 			if( value.default ) opts.default = opt.default
// 			// @ts-ignore
// 			if( value.choices ) opts.choices = opt.choices
			
// 			argv.positional( value.key, opts ) 

// 		}
	
// 	}

// 	const addCmds = ( argv: typeof yargs, cmds: Command[] ) => {

// 		for ( let i = 0; i < cmds.length; i++ ) {

// 			const cmd = cmds[i]
// 			argv.command( 
// 				cmd.key, 
// 				cmd.desc, 
// 				childArgv => {

// 					if( cmd.key === '*' ) addPositionals( childArgv, cmd )
// 					// addConfigCommand( childArgv, cmd.key )
// 					if( cmd.cmds ) addCmds( childArgv, cmd.cmds )
// 					if( cmd.opts ) childArgv.option( formatOpts( cmd.opts ) )

// 					return childArgv

// 				} )
		
// 		}
	
// 	}

// 	// const addConfigCommand = ( argv: typeof yargs, key: string ) => {

// 	// 	if ( args.configFile !== false ) argv.pkgConf( key )

// 	// }

// 	const argv = yargs( hideBin( args.config?.argv ? args.config?.argv : process.argv ) )
// 		.scriptName( name )
// 		.version( false )
	
// 	// addConfigCommand( argv, args.name )

// 	if( args.cmds ) addCmds( argv,args.cmds )

// 	if( !args.opts ) args.opts = []

// 	if ( defaultOpts.includes( optType.verbose.name ) ){

// 		args.opts.push( {
// 			key   : optType.verbose.name,
// 			alias : optType.verbose.aliases,
// 			type  : optionTypes.boolean,
// 			desc  : _( 'general:verboseDesc' ),
// 		} )
	
// 	}

// 	if ( defaultOpts.includes( optType.time.name ) ){

// 		args.opts.push( {
// 			key   : optType.time.name,
// 			alias : optType.time.aliases,
// 			type  : optionTypes.boolean,
// 			desc  : _( 'general:timeDesc' ),
// 		} )
	
// 	}
// 	if ( defaultOpts.includes( optType.config.name ) ){

// 		args.opts.push( {
// 			key   : optType.config.name,
// 			alias : optType.config.aliases,
// 			type  : optionTypes.string,
// 			desc  : _( 'general:configDesc', {
// 				name,
// 			} ),
// 		} )
	
// 	}

// 	args.opts.push( {
// 		key   : optType.version.name,
// 		alias : optType.version.aliases,
// 		type  : optionTypes.boolean,
// 		desc  : _( 'general:versionDesc' ),
// 	} )

// 	args.opts.push( {
// 		key   : optType.help.name,
// 		alias : optType.help.aliases,
// 		type  : optionTypes.boolean,
// 		desc  : _( 'general:helpDesc' ),
// 	} )

// 	const gOpts = [
// 		...Object.values( args.opts ).map( option => option.key ), 
// 		optType.help.name,
// 	]

// 	const showHelp = async ( params : CliHookParams ) => {

// 		if( args.hooks?.beforeHelp ) await args.hooks.beforeHelp( params )

// 		const title = mainTitleStyle( ) 
// 		if( title ) thisProcess.write( title )
		
// 		if( args.hooks?.afterHelpTitle ) await args.hooks.afterHelpTitle( params )

// 		if( args.desc ) thisProcess.write( descStyle( args.desc ) + '\n' )
		
// 		if( args.help?.usage !== false ) {

// 			const usageDesc = args.help?.usage ? args.help?.usage : `${nameStyle( name )} ${cmdStyle( _( 'general:usageCmds' ) )} ${optStyle( text.usageOpts )}`
// 			thisProcess.write( `${sectionTitleStyle( _( 'general:usage' ) )} ${descStyle( usageDesc )}` )
		
// 		}
// 		const wrap     = '   '
// 		const writeCol = ( i:object[] ) => thisProcess.write( print.columns( i, {
// 			maxWidth       : 50,
// 			columnSplitter : wrap,
// 			showHeaders    : false,
// 		} ) )
		
// 		const writeCmdHelp = ( cmds: Command[] )=> {

// 			writeCol( cmds.map( cmd => {

// 				const key = [
// 					nameStyle( wrap + name ),
// 					cmdStyle( cmd.key ),
// 				].join( ' ' )

// 				return {
// 					key,
// 					desc : descStyle( cmd.desc ),
// 				}
			
// 			} ) )
		
// 		}
		
// 		const writeOptsHelp = ( opts: Option[] )=> {

// 			writeCol( opts.map( opt => {

// 				const values = [
// 					...( opt.alias ?? [] ), 
// 					opt.key,
// 				].map( value => {

// 					if ( value.length > 2 ) return `--${value}`
// 					return `-${value}`
				
// 				} ).join( ', ' )
				
// 				const props = [
// 					typeStyle( `[${text[prefixType + opt.type]}]` ),
// 				]
// 				if( opt.required ) props.push( requiredStyle( `[${text.requiredTitle}]` ) )
// 				if( opt.default ) props.push( defaultStyle( `[${text.defaultTitle}=${opt.default}]` ) )
// 				if( opt.type === optionTypes.choices && opt.choices ) props.push( choicesStyle( `[${text.choicesTitle}=${opt.choices.join( ', ' )}` ) )

// 				return {
// 					key   : optStyle( wrap + values ),
// 					desc  : descStyle( opt.desc ),
// 					props : props.join( ' ' ),
// 				}
			
// 			} ) )
		
// 		}

// 		if( args.cmds ){

// 			writeCmdHelp
// 			// @ts-ignore
// 			if( params.cmds.length <= 0 ){

// 				thisProcess.write( `\n${sectionTitleStyle( text.commands )}\n` )
// 				writeCmdHelp( args.cmds )
			
// 			}
		
// 		}
// 		if( args.opts ){

// 			thisProcess.write( `\n${sectionTitleStyle( _( 'general:globalOptions' ) )}\n` )
// 			writeOptsHelp( args.opts )
		
// 		}

// 		// argv.showHelp()

// 		if( args.help?.examples ) {

// 			thisProcess.write( `\n${sectionTitleStyle( text.examples )}\n` )

// 			writeCol( args.help?.examples.map( example => {

// 				return {
// 					value : exampleStyle( example.value ),
// 					desc  : descStyle( wrap + example.desc ), 
// 				}
			
// 			} ) )
		
// 		}

// 		if( args.help?.docsUrl ) thisProcess.write( `\n${sectionTitleStyle( text.docs )} ${linkStyle( args.help?.docsUrl )}` )
// 		thisProcess.write( '' )
// 		if( args.hooks?.afterHelp ) await args.hooks.afterHelp( params )
	
// 	}

// 	const updateNot = async () => {

// 		const updaterOptions = {
// 			name, 
// 			version,
// 			box : {
// 				title : _( 'general:updaterTitle' ),
// 			},
// 		}
		
// 		const { notify } = await updater( args.config?.updaterOptions ?
// 			deepmerge( updaterOptions, args.config.updaterOptions ) : 
// 			updaterOptions, 
// 		)

// 		notify()
	
// 	}

// 	// eslint-disable-next-line @typescript-eslint/ban-types
// 	const middleware = async ( innerArgv: ArgumentsCamelCase<yargs.Omit<{}, never> & InferredOptionTypes<{}>> ) => {

// 		const { $0, _: cmds, ...opts } = innerArgv
// 		if ( opts.verbose ) log.verbose = true
// 		if ( opts.time ) log.addTimeout()

// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 		const name        = $0 
// 		const hooksParams = {
// 			cmds,
// 			opts,
// 		}

// 		if( !opts.config ) {

// 			try{

// 				const p = await fs.getObjectFrom( './package.json' )
// 				// @ts-ignore
// 				if( p[name] ) thisProcess.write( JSON.stringify( p[name] ) )
// 				const c = await fs.getObjectFromPath( '.',name )
// 				thisProcess.write( JSON.stringify( c ) )
			
// 			}catch( e ){

// 				// @ts-ignore
// 				thisProcess.write( e )
			
// 			}
		
// 		}else if( opts.config && typeof opts.config === 'string' ) {

// 			const c = await fs.getObjectFrom( opts.config )
// 			thisProcess.write( c.toString() )
		
// 		}

// 		console.log( hooksParams )
// 		// console.log( hooksParams )
// 		if( args.hooks?.beforeAll ) await args.hooks.beforeAll( hooksParams )

// 		if( args.config?.updater === undefined || args.config?.updater === true ) await updateNot()

// 		if ( ( !cmds || !Array.isArray( cmds ) || cmds.length <= 0 ) || opts.help || opts.h ) {

// 			await showHelp( hooksParams )
			
// 			thisProcess.exit()
			
// 		}

// 		if ( opts.version ) {

// 			if( args.hooks?.beforeVersion ) await args.hooks.beforeVersion( hooksParams )
		
// 			thisProcess.write( print.color.bgGreen( ` ${version} ` ) )
// 			if( args.hooks?.afterVersion ) await args.hooks.afterVersion( hooksParams )

// 			thisProcess.exit()
		
// 		}
	
// 	}

// 	argv.options( formatOpts( args.opts ) )
// 		// .locale('en')
// 		// .help( optType.help.name, descStyle( text.helpDesc ) )
// 		.help( false )
// 		// .alias( optType.help.aliases[0], optType.help.name )
// 		.group( gOpts, _( 'general:globalOptions' ) + '\n' )
// 		.showHelpOnFail( false )
// 		.middleware( [
// 			middleware,
// 		] )
// 		.strict()
// 		.parseAsync()
	
// 	// @ts-ignore
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	const { $0, _: cmds, ...opts } = argv.parsed.argv

// 	return {
// 		name,
// 		version,
// 		cmds,
// 		opts,
// 		showHelp : () => showHelp( {
// 			cmds, opts,
// 		} ),
// 		...I18N, 
// 		print, 
// 		fs, 
// 		log, 
// 		process : thisProcess,
// 	}

// }
