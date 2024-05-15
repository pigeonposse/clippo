/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import { mergeConfig } from 'vite'
import utilsConfig     from '@clippo/config/vite.config.utils.js'

export default mergeConfig( 
	utilsConfig, 
	{ 
		build : {
			rollupOptions : {
				external : [
					'@clippo/styles',
				],
			},
		},
	}, 
)
