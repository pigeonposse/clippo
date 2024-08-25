/**
 * TODO prompt.
 *
 * @description Add prompt for edit project TODO List.
 */

import {
	execProcess, 
	exec,
} from '@clipo/config/core'

await execProcess( {
	name : 'UPDATE VERSION',
	on   : async ( ) => {

		await exec( 'changeset && changeset version' )
	
	},

} )
