import {
	color, 
	gradient, 
	font,
	columns,
} from '../../../styles/src/main'
import readline from './main'
// import { promptLine }      from '../../../prompts/src/main'
import { createLogUpdate } from 'log-update'

// Write output but don't hide the cursor
const log = createLogUpdate( process.stdout, {
	showCursor : true,
} )

const gradientAnimation = [
	[
		'red', 'green', 'blue',
	],
	[
		'blue', 'red', 'green',
	],
	[
		'green', 'blue', 'red',
	],
]
const faces             = [
	'( つ ◕_◕ )つ',
	'( っ ◉_◉ )っ',
	'( つ •_• )つ',
]
const delay             = ( ms: number ): Promise<void> => new Promise( resolve => setTimeout( resolve, ms ) )

const line  = color.gray( '========================================================' )
const info  = `${line}
${color.green( 'ctrl + p' )}    ==> ${color.blue( 'pause write' )}
${color.green( 'ctrl + r' )}    ==> ${color.blue( 'resume write' )}
${color.green( 'ctrl + e' )}    ==> ${color.blue( 'clear screen' )}
${color.green( 'ctrl + y' )}    ==> ${color.blue( 'close' )}
${color.green( 'ctrl + t' )}    ==> ${color.blue( 'print title' )}
${color.green( 'ctrl + h' )}    ==> ${color.blue( 'print help' )}
${line}\n`
const title = gradient( font( '\nTest\n', '3-D' ), [
	// @ts-ignore
	'red', 'yellow',
] )

const main = async () =>{
	
	const rl = readline( )
	rl.clearScreen()
	rl.pauseWrite()
	rl.onKeypress( ( keypress, { write, stop, clearScreen, resumeWrite, pauseWrite } ) => {

		if( keypress.includes( 'ctrl' ) && keypress.includes( 'h' ) ) write( info ) 
		if( keypress.includes( 'ctrl' ) && keypress.includes( 't' ) ) write( title )
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'e' ) ) clearScreen()
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'r' ) ) resumeWrite()
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'p' ) ) pauseWrite()
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'y' ) ) stop()
	
	} )
	
	rl.start()

	rl.write( info )

	await delay( 1000 )

	// rl.write( title )
	
	const unicorn = font( 'unicorn' )
	let index     = 0
	rl.resumeWrite()
	setInterval( () => {

		const gradientArr = gradientAnimation[index = ++index % gradientAnimation.length]
		const face        = faces[index = ++index % gradientAnimation.length]
		log( `
${line}
${columns(	[
		{
			level : gradient( face, gradientArr ),
			msg   : gradient( unicorn, gradientArr ),
		}, 
		{
			level : gradient( ' hola ', gradientArr ),
			msg   : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		}, 
		{
			level : gradient( ' adios ', gradientArr ),
			msg   : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		}, 
		{
			level : gradient( ' hola ', gradientArr ),
			msg   : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		}, 
		{
			level : gradient( ' adios ', gradientArr ),
			msg   : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		}, 
	], {
		showHeaders : false,
		config      : {
			level : {
				align    : 'right',
				minWidth : 9,
			},
			msg : {
				maxWidth : 80,
			},
		
		},
		preserveNewLines : true,
		columnSplitter   : '  ',
		// truncate         : true,
	} )}
` )
	
	}, 200 )

	// rl.pauseWrite()
	// const results = await promptLine( {
	// 	intro    : color.white( color.bgCyan( ' clippo init ' ) ),
	// 	outro    : 'Succesfully finished 🌈',
	// 	onCancel : p => {
			
	// 		p.cancel( 'canceled 💔' )
	// 		process.exit( 0 )
	
	// 	},
	// 	list : async p => {
	
	// 		return {
	// 			image : async () => p.image( 'https://avatars.githubusercontent.com/u/111685953', {
	// 				width        : 20,
	// 				height       : 20,
	// 				asciiOutput  : true,
	// 				asciiOptions : {
	// 					// eslint-disable-next-line camelcase
	// 					white_bg : false,
	// 				},
	// 			} ),
	// 			name : () => p.text( {
	// 				message      : 'What is your name?', 
	// 				placeholder  : 'Angel Albiñana',
	// 				defaultValue : 'Angel Albiñana',
	// 			} ),
	// 			notes : () => p.note( 'Welcome to clippo test', 'pigeonposse 🐦🌈' ),
	// 			table : () => p.table( [
	// 				[
	// 					'0A', '0B', '0C',
	// 				],
	// 				[
	// 					'1A', '1B', '1C',
	// 				],
	// 				[
	// 					'2A', '2B', '2C',
	// 				],
	// 			] ),
	// 			age : () => p.number( {
	// 				message : 'What is your age?', 
	// 			} ),
	// 			// @ts-ignore
	// 			color : ( { results } ) =>
	// 				p.multiselect( {
	// 					message : `What is your favorite color ${results.name}?`,
	// 					options : [
	// 						{
	// 							value : 'red', label : 'Red', 
	// 						},
	// 						{
	// 							value : 'green', label : 'Green', 
	// 						},
	// 						{
	// 							value : 'blue', label : 'Blue', 
	// 						},
	// 					],
	// 				} ),
	// 			// @ts-ignore
	// 			execute : async ( { results } ) => {
	
	// 				try{
	
	// 					const spinner = p.spinner()
	// 					spinner.start( 'Executing...' )
	// 					await delay( 3000 )
	// 					spinner.message( results.name )
	// 					spinner.message( results.age )
	// 					spinner.stop( 'Installed via npm' )
	// 					return true
					
	// 				}catch( e ){
	
	// 					return false
					
	// 				}
				
	// 			},
	// 		}
		
	// 	},
	// } )
	// rl.write( results as string )
	// rl.resumeWrite()

}
  
main()
