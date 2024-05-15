/* eslint-disable jsdoc/require-example */
import type { ListrTask } from 'listr2'
import {
	Listr, PRESET_TIMER, 
} from 'listr2'
import type {
	Task, 
	Tasks,
	TasksOpts, 
} from './types'

/**
 * Export types that can be used from outside.
 *
 */
export {
	Tasks,
	TasksOpts,
}

/**
 * Get task props.
 *
 * @param   {Task}   task - Object of tasks props.
 * @returns {object}      - Tasks object.
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
		res.fallbackRendererOptions = {
			timer : PRESET_TIMER,
		}
	
	}else if ( task.timer === false ){

		//@ts-ignore
		rendererOptions.timer = false
		//@ts-ignore
		res.fallbackRendererOptions = {
			timer : false,
		}
	
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
 */
function getTasksList ( tasks: Task[] ): ListrTask[]{

	return tasks.map( currTask => {

		const props = getTaskProps( currTask )
		return ( Array.isArray( currTask.task ) ) ? 
			{
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
 * @param   {TasksOpts}     [opts] - Tasks options.
 * @returns {Promise<void>}        - A Promise that resolves when all tasks are completed.
 * @example
 * const delay = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ) )
 * await tasks({
 *   title: 'Tasks',
 *   task: [
 *     {
 *       title: 'Task 0',
 *       task: [
 *         {
 *           title: 'Task 0.1',
 *           task: async (_, task) => {
 *             await delay(500);
 *             task.title = 'Task finished';
 *           },
 *         },
 *         {
 *           title: 'Task 0.2',
 *           task: async () => await delay(500),
 *         },
 *       ],
 *     },
 * 	   {
 *       title : 'Task 1',
 *       task  : async () => await delay(1000),
 *     },
 *   ],
 * });
 *
 */
export default async function tasks( tasks: Tasks, opts?: TasksOpts ): Promise<void> {

	process.stdout.write( tasks.title + '\n' )

	const tasksProps = getTaskProps( tasks )
	const tasksList  = getTasksList( tasks.task )

	const exec = new Listr( tasksList,
		{
			renderer : opts?.verbose ? 'verbose' : 'default',
			...tasksProps,
		},
	)

	await exec.run()

}
