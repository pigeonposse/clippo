import {
	createInterface, clearScreenDown,
	cursorTo, 
} from 'node:readline'
import type { KeyPressParams } from './types'

/**
 * Function to capture keyboard input and handle it according to the specified keys.
 *
 * @param   {KeyPressParams['keys']} keys    - Array of arrays containing combinations of keys to capture.
 * @param   {Function}               handler - Handler function to execute when the specified keys are pressed.
 * @returns {object}                         - Object containing stop function.
 */
export default function keypress( 
	keys: KeyPressParams['keys'], 
	handler: ( keypress: string[], stop: () => void ) => void, 
) {

	const rl = createInterface( {
		input  : process.stdin,
		output : process.stdout,
	} )
	
	let isRawMode = false
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
			
		for ( const key of keys ) {

			if ( Array.isArray( key ) ) {

				const areEqual = JSON.stringify( key ) === JSON.stringify( keypress )

				if ( areEqual ){

					handler( keypress, stop )
					break 
				
				}
			
			} else {

				if ( keypress.includes( key ) ) {

					handler( keypress, stop )
					break
				
				}
			
			}
		
		}
	
	}

	const clearScreen = () => {

		cursorTo( process.stdout, 0,0 )
		clearScreenDown( process.stdout )
	
	}
	
	const blockWrite = () => {

		process.stdin.resume()
		process.stdin.unref()
	
	}

	/**
	 * Method to start capturing keyboard events.
	 */
	const start = () => {

		process.stdin.addListener( 'keypress', keypressListener )
		clearScreen()
		blockWrite()

		// read and write
		if ( !isRawMode ) {

			isRawMode = true
			if ( process.stdin.isTTY ) process.stdin.setRawMode( true )
		
		}

		// read
	
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

	rl.on( 'close', () => stop() )
	
	// Start capturing keyboard events
	start()

	// Return the stop function to allow external code to stop capturing events if needed
	return {
		stop,
		write : ( s: string ) =>rl.write( `${s}\n` ),
	}

}
