import tasks from './main'

const delay = ( ms: number ): Promise<void> => new Promise( resolve => setTimeout( resolve, ms ) )

await tasks( {
	title : 'My Task',
	task  : [
		{
			title : 'Task 0',
			task  : [
				{
					title : 'Task 0.1',
					// @ts-ignore
					task  : async ( _, task ) => {

						await delay( 500 )
						task.title = 'Task finished'
						//throw Error( 'Error forced' )
						
					},
				},
				{
					title : 'Task 0.2',
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
	collapseSubtasks : false,
	exitOnError      : false,
	timer            : true,
}, {
	verbose : false,
} ) 
