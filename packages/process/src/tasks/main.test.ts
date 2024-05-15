/**
 * Tests.
 *
 * @description File for set test functions.
 */

import {
	describe, it, expect, 
} from 'vitest'
import tasks from './main'

const delay     = ( ms: number ): Promise<void> => new Promise( resolve => setTimeout( resolve, ms ) )
const tasksList = {
	title : 'My Task',
	task  : [
		{
			title : 'Task fail',
			task  : [
				{
					title : 'Task failed',
					task  : async () => {

						await delay( 500 )
						throw Error( 'Error forced' )
						
					},
				},
				{
					title : 'Task skipped',
					task  : async () => await delay( 500 ),
				},
			],
		},
		{
			title : 'Task 1',
			task  : async () => await delay( 1000 ),
		},
		{
			title : 'Task concurrent',
			task  : [
				{
					title : 'Task concurrent 1',
					task  : async () => await delay( 1000 ),
				},
				{
					title : 'Task concurrent 2',
					task  : async () => await delay( 1000 ),
				},
			],
			concurrent : true,
		},
	],
	exitOnError : true,
	timer       : true,
}

describe( 'tasks', () => {

	it( 'Runs failed', async () => {

		expect( tasks( tasksList ) ).rejects.toThrowError( )
	
	} )
	
	it( 'Runs succeed', async () => {

		expect( tasks( 		
			{
				title : 'Task succeed',
				task  : [
					{
						title : 'Task 2.1 (collapsed)',
						task  : [ 
							{
								title : 'Task 2.1.1',
								task  : async () => await delay( 1000 ),
							},
							{
								title : 'Task 2.1.2',
								task  : async () => await delay( 1000 ),
							},
						],
						collapseSubtasks : true,
					},
					{
						title : 'Task 2.2',
						task  : async () => await delay( 1000 ),
					},
				],
				exitOnError : false,
				timer       : false,
			} ) ).resolves.toBe( undefined )
	
	} )

} )

