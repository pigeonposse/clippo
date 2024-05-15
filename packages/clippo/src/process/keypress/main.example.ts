import { color }  from 'print/color'
import onKeypress from './main'

const main = async () =>{
	
	const readline = onKeypress( [
		[
			'y',
		],
		[
			'ctrl', 'y',
		],
		[
			'ctrl', 'u',
		],
	], ( keypress, stop ) => {

		if( keypress.includes( 'y' ) ) console.log( '\n break...' )
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'u' ) ) console.log( 'hello' )
		if( keypress.includes( 'ctrl' ) && keypress.includes( 'y' ) ) stop()
	
	} )

	readline.write( `============================
${color.green( 'ctrl + y' )}    ==> ${color.blue( 'close' )}
${color.green( 'y' )}           ==> ${color.blue( 'break' )}
${color.green( 'ctrl + u' )}    ==> ${color.blue( 'say hello' )}
============================` )

}
  
main()
