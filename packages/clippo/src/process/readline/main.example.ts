import {
	color, gradient, 
} from 'print/color'
import readline from './main'
import { font } from 'print/text'

const delay = ( ms: number ): Promise<void> => new Promise( resolve => setTimeout( resolve, ms ) )
	
const info = `============================
${color.green( 'ctrl + t' )}    ==> ${color.blue( 'pause write' )}
${color.green( 'ctrl + r' )}    ==> ${color.blue( 'resume write' )}
${color.green( 'ctrl + e' )}    ==> ${color.blue( 'clear screen' )}
${color.green( 'ctrl + y' )}    ==> ${color.blue( 'close' )}
${color.green( 't' )}           ==> ${color.blue( 'print title' )}
${color.green( 'h' )}           ==> ${color.blue( 'print help' )}
============================\n`
const title = gradient( font( '\nTest\n', '3-D' ), [
	// @ts-ignore
	'red', 'yellow',
] )

const main = async () =>{
	
	const rl = readline( )
	rl.clearScreen()
	rl.pauseWrite()
	rl.onKeypress( ( keypress, { write, stop, clearScreen, resumeWrite, pauseWrite } ) => {

		if( keypress.includes( 'h' ) ) write( info ) 
		if( keypress.includes( 't' ) ) write( title )
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'e' ) ) clearScreen()
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'r' ) ) resumeWrite()
		if( keypress.includes( 'ctrl' ) && keypress.includes( 't' ) ) pauseWrite()
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'y' ) ) stop()
	
	} )
	
	rl.start()

	rl.write( info )

	await delay( 3000 )
	
	rl.write( title )

}
  
main()
