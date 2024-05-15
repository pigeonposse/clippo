import spinner from './main'
const delay = ( ms: number ): Promise<void> => new Promise( resolve => setTimeout( resolve, ms ) )

const load  = spinner( {
	prefix : 'hola',
	name   : 'dots',
	// on     : params =>{

	// 	console.log( params )
	
	// },
} )
const load2 = spinner( {
	prefix : 'hola 2',
	name   : 'dots',
	// on     : params =>{

	// 	console.log( params )
	
	// },
} )
load.start( '🪫 Starting...' )
load2.start( '🪫 Starting...' )
await delay( 2000 )
load.update( '➡️ Updating...' )
load2.update( '➡️ Updating...' )
await delay( 2000 )
load.succeed( '🔋Successfull' )
load2.failed( '💔 Failed' )
