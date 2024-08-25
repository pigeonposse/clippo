import { wrap } from 'module'

import { getData } from './data'

import type { ClippoMiddleware } from '../types'

export const helpMiddleware = async ( args: ClippoMiddleware ) => {

	const {
		opts, cmds, utils, params, 
	} = args
	if ( !( 'help' in opts ) ) return

	const {
		log, thisProcess, styles, _, 
	} = utils
	
	// const isHelp = ( !cmds || !Array.isArray( cmds ) || cmds.length <= 0 ) || 'help' in opts
	// console.log( params )

	if( params.config?.hooks?.beforeHelp ) 
		await params.config?.hooks.beforeHelp( {
			cmds,
			opts,
		} )	
	
	const data         = ( await getData( args ) )
	const globalData   = data.data.global
	const currentData  = data.currentData
	const columnConfig = {
		showHeaders      : false,
		preserveNewLines : true,
		columnSplitter   : '  ',
		config           : {
			value : {
				dataTransform : function( data: string ) {

					return '  ' + data
				
				},
			},
			desc : { maxWidth: 60 },
		},
	}

	if( currentData.title ) {

		thisProcess.write( currentData.title )
		thisProcess.write( '' )
	
	}
	// if( currentData.desc ) thisProcess.write( currentData.title )
	if( currentData.usage.value ) {

		thisProcess.write( currentData.usage.title + ' ' + currentData.usage.value )
		thisProcess.write( '' )
	
	}

	if( currentData.cmds.value ){

		thisProcess.write( currentData.cmds.title + '\n' )
		const colArr = currentData.cmds.value.map( d => ( {
			separator : '  ',
			...d,
		} ) )
		thisProcess.write( styles.columns( colArr, columnConfig ) )
		thisProcess.write( '' )
	
	}
	if( !data.isGlobal && currentData.opts.value ){

		thisProcess.write( currentData.opts.title + '\n' )
		const colArr = currentData.opts.value.map( d => ( {
			separator : '  ',
			...d,
		} ) )
		thisProcess.write( styles.columns( colArr, columnConfig ) )
		thisProcess.write( '' )
	
	}
	if( globalData.opts.value ){

		thisProcess.write( globalData.opts.title + '\n' )
		const colArr = globalData.opts.value.map( d => ( {
			separator : '  ',
			...d,
		} ) )
		thisProcess.write( styles.columns( colArr, columnConfig ) )
		thisProcess.write( '' )
	
	}
	if( currentData.examples.value ){

		thisProcess.write( currentData.examples.title + '\n' )
		const colArr = currentData.examples.value.map( d => ( {
			separator : '  ',
			...d,
		} ) )
		thisProcess.write( styles.columns( colArr, columnConfig ) )
		thisProcess.write( '' )
	
	}
	if( currentData.docs.value ) thisProcess.write( currentData.docs.title + ' ' + currentData.docs.value )
	
	thisProcess.write( '' )
	
	log.success( 'help' )

	if( params.config?.hooks?.afterHelp ) 
		await params.config?.hooks.afterHelp( {
			cmds,
			opts,
		} )		

	// process.exit( 1 )

}

// export const showHelp = async ( args: ClippoArgs, params : CliHookParams ) => {

// 	const title = mainTitleStyle( ) 
// 	if( title ) thisProcess.write( title )
	
// 	if( args.config?.hooks?.afterHelpTitle ) await args.config?.hooks.afterHelpTitle( params )

// 	if( args.desc ) thisProcess.write( descStyle( args.desc ) + '\n' )
	
// 	if( args.help?.usage !== false ) {

// 		const usageDesc = args.help?.usage ? args.help?.usage : `${nameStyle( name )} ${cmdStyle( _( 'general:usageCmds' ) )} ${optStyle( text.usageOpts )}`
// 		thisProcess.write( `${sectionTitleStyle( _( 'general:usage' ) )} ${descStyle( usageDesc )}` )
	
// 	}
// 	const wrap     = '   '
// 	const writeCol = ( i:object[] ) => thisProcess.write( print.columns( i, {
// 		maxWidth       : 50,
// 		columnSplitter : wrap,
// 		showHeaders    : false,
// 	} ) )
	
// 	const writeCmdHelp = ( cmds: Command[] )=> {

// 		writeCol( cmds.map( cmd => {

// 			const key = [
// 				nameStyle( wrap + name ),
// 				cmdStyle( cmd.key ),
// 			].join( ' ' )

// 			return {
// 				key,
// 				desc : descStyle( cmd.desc ),
// 			}
		
// 		} ) )
	
// 	}
	
// 	const writeOptsHelp = ( opts: Option[] )=> {

// 		writeCol( opts.map( opt => {

// 			const values = [
// 				...( opt.alias ?? [] ), 
// 				opt.key,
// 			].map( value => {

// 				if ( value.length > 2 ) return `--${value}`
// 				return `-${value}`
			
// 			} ).join( ', ' )
			
// 			const props = [
// 				typeStyle( `[${text[prefixType + opt.type]}]` ),
// 			]
// 			if( opt.required ) props.push( requiredStyle( `[${text.requiredTitle}]` ) )
// 			if( opt.default ) props.push( defaultStyle( `[${text.defaultTitle}=${opt.default}]` ) )
// 			if( opt.type === optionTypes.choices && opt.choices ) props.push( choicesStyle( `[${text.choicesTitle}=${opt.choices.join( ', ' )}` ) )

// 			return {
// 				key   : optStyle( wrap + values ),
// 				desc  : descStyle( opt.desc ),
// 				props : props.join( ' ' ),
// 			}
		
// 		} ) )
	
// 	}

// 	if( args.cmds ){

// 		writeCmdHelp
// 		// @ts-ignore
// 		if( params.cmds.length <= 0 ){

// 			thisProcess.write( `\n${sectionTitleStyle( text.commands )}\n` )
// 			writeCmdHelp( args.cmds )
		
// 		}
	
// 	}
// 	if( args.opts ){

// 		thisProcess.write( `\n${sectionTitleStyle( _( 'general:globalOptions' ) )}\n` )
// 		writeOptsHelp( args.opts )
	
// 	}

// 	// argv.showHelp()

// 	if( args.help?.examples ) {

// 		thisProcess.write( `\n${sectionTitleStyle( text.examples )}\n` )

// 		writeCol( args.help?.examples.map( example => {

// 			return {
// 				value : exampleStyle( example.value ),
// 				desc  : descStyle( wrap + example.desc ), 
// 			}
		
// 		} ) )
	
// 	}

// 	if( args.help?.docsUrl ) thisProcess.write( `\n${sectionTitleStyle( text.docs )} ${linkStyle( args.help?.docsUrl )}` )
// 	thisProcess.write( '' )

// }
