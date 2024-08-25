/**
 * Readme.
 *
 * @description Readme.
 */

import {
	pkg, 
	addTextBetweenAMark,
	execProcess, 
} from '@clippo/config/core'

import { readme } from './templates/readme.mjs'

await execProcess( {
	name : 'CHANGE README',
	on   : async ( ) => {

		// const readmeTemp    = readme( pkg.data )
		// const convertReadme = async filePath => {

		// 	await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START MARK -->', '<!-- PIGEONPOSSE END MARK -->', readmeTemp.mark )
		// 	await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START CONTENT -->', '<!-- PIGEONPOSSE END CONTENT -->', readmeTemp.content )
		// 	await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START INDEX -->', '<!-- PIGEONPOSSE END INDEX -->', readmeTemp.index )
		// 	await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START ORG -->', '<!-- PIGEONPOSSE END ORG -->', readmeTemp.org )
		// 	await addTextBetweenAMark( filePath, '<!-- PIGEONPOSSE START HEADER -->', '<!-- PIGEONPOSSE END HEADER -->', readmeTemp.header )
		
		// }

		// const readmePaths = [
		// 	'README.md',
		// 	'packages/_config/README.md',
		// 	'packages/lib/README.md',
		// 	'packages/docs/README.md',
		// ]

		// for ( const path of readmePaths ) {

		// 	await convertReadme( path )
 
		// }
	
	},
} )
