import {
	Listr,
	PRESET_TIMER, 
} from 'listr2'

import type {
	Task,
	Tasks, 
} from './types'
import type { Logger }    from '../../logger/main'
import type { ListrTask } from 'listr2'

/**
 * Get task props.
 *
 * @param   {Task}   task - Object of tasks props.
 * @returns {object}      - Tasks object.
 * @example
 *
 */
function getTaskProps ( task: Task ){

	const res             = {}
	const rendererOptions = {}

	//@ts-ignore
	if( task.concurrent === true ) res.concurrent = true
	//@ts-ignore
	if( task.concurrent === false ) res.concurrent = false

	//@ts-ignore
	if( task.collapseSubtasks === true ) rendererOptions.collapseSubtasks = true
	//@ts-ignore
	if( task.collapseSubtasks === false ) rendererOptions.collapseSubtasks = false

	//@ts-ignore
	if( task.exitOnError === true ) res.exitOnError = true
	//@ts-ignore
	if( task.exitOnError === false ) res.exitOnError = false

	if( task.timer === true ) {

		//@ts-ignore
		rendererOptions.timer = PRESET_TIMER
		//@ts-ignore
		res.fallbackRendererOptions = { timer: PRESET_TIMER }
	
	}else if ( task.timer === false ){

		//@ts-ignore
		rendererOptions.timer = false
		//@ts-ignore
		res.fallbackRendererOptions = { timer: false }
	
	}

	// @ts-ignore
	if( Object.keys( rendererOptions ).length > 0 ) res.rendererOptions = rendererOptions

	// console.log( res )
	return res

}

/**
 * Get task list.
 *
 * @param   {Task[]} tasks - The list of tasks to execute.
 * @returns {object}       - Tasks object.
 * @example
 *
 */
function getTasksList ( tasks: Task[] ): ListrTask[]{

	return tasks.map( currTask => {

		const props = getTaskProps( currTask )
		return ( Array.isArray( currTask.task ) ) 
			? {
				title : currTask.title,
				task  : ( _, task ) => {

					// @ts-ignore
					const list = getTasksList( currTask.task )
					// console.log( currTask.title,list )
					// console.log( list )
			
					// @ts-ignore
					return task.newListr( list, props )
			
				}, 
			} : {
				title : currTask.title,
				// @ts-ignore
				task  : currTask.task,
				...props,
			}
	
	} )

}

/**
 * Runs a list of tasks using Listr.
 *
 * @param   {Tasks}         tasks  - The list of tasks to execute.
 * @param   {Logger}        logger - Logger instance.
 * @returns {Promise<void>}        - A Promise that resolves when all tasks are completed.
 * @example
 *
 */
export default async function tasks( tasks: Tasks, logger: Logger ) {

	logger.info( tasks.title )

	const tasksProps = getTaskProps( tasks )
	const tasksList  = getTasksList( tasks.task )
	// console.log( 'List',tasksProps )

	const exec = new Listr( tasksList,
		{
			renderer : logger.verbose ? 'verbose' : 'default',
			...tasksProps,
		},
	)

	await exec.run()

}
