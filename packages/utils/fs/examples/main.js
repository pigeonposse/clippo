
/**
 * Fetches an object from a remote URL and a local file, then logs specific parts of them.
 */ 
import {
	getObjectFrom,
	getObjectFromPath, 
} from '@clippo/fs'

const result = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
const pkg    = await getObjectFromPath( '.', 'package' )

console.log( result.web[ 0 ], pkg )

