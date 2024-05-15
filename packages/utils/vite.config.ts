/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import {
	defineConfig, mergeConfig, 
} from 'vite'
import utilsConfig      from '@clippo/config/vite.config.utils.js'
import { dependencies } from './package.json'

export default mergeConfig( 
	utilsConfig, 
	await defineConfig( { 
		build : {
			rollupOptions : {
				external : Object.keys( dependencies ),
			},
		},
	} ), 
)
