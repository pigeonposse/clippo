import { spawn } from 'node:child_process'

import type { ChildProcessExecuteParams }      from './types'
import type { ChildProcessWithoutNullStreams } from 'node:child_process'

/**
 * Executes a child process with the specified command.
 *
 * @param   {ChildProcessExecuteParams} params - Parameters for executing the child process.
 * @returns {Promise<void>}                    - A promise that resolves when the child process completes successfully or rejects if there is an error.
 * @example
 *
 */
export default async function execute( {
	cmd, 
	onError, 
	onLog,
}: ChildProcessExecuteParams ) {

	return new Promise<void>( ( resolve, reject ) => {

		// @ts-ignore
		const childProcess: ChildProcessWithoutNullStreams = spawn( cmd, {
			shell : true,
			stdio : [
				'inherit',
				'pipe',
				'pipe',
			], 
		} )
		// @ts-ignore
		childProcess.stdout.on( 'data', data => {

			if( onLog ) onLog( data.toString() )
			
		} )
		// @ts-ignore
		childProcess.stderr.on( 'data', data => {

			if( onLog ) onLog( data.toString() )
			
		} )
		// @ts-ignore
		childProcess.on( 'close', code => {

			if ( code === 0 ) {

				resolve()
				
			} else {

				const error = new Error( `Command failed with code ${code}` )
				if( onError ) onError( error )
				reject( error )
				
			}
			
		} )
		// @ts-ignore
		childProcess.on( 'error', error => {

			if( onError ) onError( error )
			reject( error )
			
		} )
		
	} )
	
}
