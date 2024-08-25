// import keypress from './keypress/main'
import exec     from './exec/main'
import prompt   from './prompt/main'
import readline from './readline/main'
import tasks    from './tasks/main'
import { time } from './time'

import type { Tasks }  from './tasks/types'
import type { Logger } from 'logger/main'

/**
 * Process.
 *
 * @description File for set process functions.
 */

/**
 * Represents a process utility class.
 */
export class Process {

	execute = exec
	prompt = prompt
	readline = readline
	// onKeypress = keypress
	time = time
	logger: Logger

	constructor( logger: Logger ){

		this.logger = logger
	
	}

	/**
	 * Runs a list of tasks using Listr.
	 *
	 * [See example](./main.example.ts).
	 *
	 * @param   {Tasks}         list - The list of tasks to execute.
	 * @returns {Promise<void>}      - A Promise that resolves when all tasks are completed.
	 * @see https://clippo.pigeonposse.com
	 * @example
	 *
	 */
	tasks( list: Tasks ){

		return tasks( list, this.logger )
	
	}

	write( data: string ){

		process.stdout.write( data + '\n' )
	
	}

	/**
	 * Function to exit the process with a specified type.
	 *
	 * @param   {string} [type] - The type of exit. Can be either 'succeed' or 'failed'.
	 * @returns {void}
	 * @example
	 *
	 */
	exit( type: 'succeed' | 'failed' = 'succeed' ){

		if( type === 'succeed' )
			process.exit( 0 )
		else
			process.exit( 1 )
	
	}

}
