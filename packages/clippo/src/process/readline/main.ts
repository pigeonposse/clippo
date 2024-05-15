import {
	createInterface, clearScreenDown,
	cursorTo, 
} from 'node:readline'

/**
 * Function to capture keyboard input and handle it according to the specified keys.
 *
 * @returns {object} - Object containing stop function.
 */
export default function readline( ) {

	const rl = createInterface( {
		input  : process.stdin,
		output : process.stdout,
	} )

	// @ts-ignore
	const handlerKeypress = []
	let isRawMode         = false,
		isPaused  		  = false
	const stdoutWrite     = process.stdout.write.bind( process.stdout )

	const clearScreen = () => {

		cursorTo( process.stdout, 0,0 )
		clearScreenDown( process.stdout )
	
	}

	const pauseWrite = () => {

		if ( !isPaused ) {

			// @ts-ignore
			process.stdout.write = () => {}
			isPaused             = true
		
		}
	
	}
	
	const resumeWrite = () => {

		if ( isPaused ) {

			process.stdout.write = stdoutWrite
			isPaused             = false
		
		}
	
	}

	const write = ( s: string ) => {

		if( isPaused ) {

			resumeWrite()
			rl.write( `${s}\n` )
			pauseWrite()
		
		}else
			rl.write( `${s}\n` )
	
	}
	
	/**
	 * Method to start capturing keyboard events.
	 */
	const start = () => {

		process.stdin.addListener( 'keypress', keypressListener )

		if ( !isRawMode ) {

			isRawMode = true
			if ( process.stdin.isTTY ) process.stdin.setRawMode( true )
		
		}
	
	}

	/**
	 * Method to stop capturing keyboard events and restore terminal settings.
	 */
	const stop = () => {

		process.stdin.removeListener( 'keypress', keypressListener )
		if ( isRawMode ) {

			isRawMode = false
			if ( process.stdin.isTTY ) process.stdin.setRawMode( false )
		
		}
		rl.close()
	
	}

	const utils = {
		write,
		pauseWrite,
		resumeWrite,
		clearScreen,
		stop,
	}
	
	/**
	 * Function to handle the keypress event.
	 *
	 * @param {any}    _          - Unused parameter.
	 * @param {object} pressedKey - Object containing information about the pressed key.
	 */
	// @ts-ignore
	const keypressListener = ( _, pressedKey ) => {

		const keypress: string[] = []

		if ( pressedKey.ctrl ) keypress.push( 'ctrl' )
		if ( pressedKey.shift ) keypress.push( 'shift' )
		if ( pressedKey.alt ) keypress.push( 'alt' )
		if( pressedKey.name ) keypress.push( pressedKey.name )
			
		// for ( const key of keys ) {

		// 	if ( Array.isArray( key ) ) {

		// 		const areEqual = JSON.stringify( key ) === JSON.stringify( keypress )

		// 		if ( areEqual ){

		// 			handler( keypress, stop )
		// 			break 
				
		// 		}
			
		// 	} else {

		// 		if ( keypress.includes( key ) ) {

		// 			handler( keypress, stop )
		// 			break
				
		// 		}
			
		// 	}
		
		// }
		
		//onKeypress( keypress, utils )

		for ( let i = 0; i < handlerKeypress.length; i++ ) {

			// @ts-ignore
			handlerKeypress[i]( keypress, utils ) // Llama a la función en la posición 'i' del array
		
		}

	}
	
	const onKeypress = ( cb: ( keypress: string[], params: typeof utils ) => void ) => {

		handlerKeypress.push( cb )
	
	}

	rl.on( 'close', () => stop() )

	return {
		start,
		onKeypress,
		...utils,
	}

}
