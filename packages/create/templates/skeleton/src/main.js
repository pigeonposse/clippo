/**
 * CLIPPO.
 *
 * @description Vite config.
 * @see https://clippo.pigeonposse.com/guide/
 */

import { clippo } from 'clippo'

import {
	version, 
	name, 
} from '../package.json'

const cli = await clippo( {
	name,
	version,
} )

console.log( cli )
// do something

