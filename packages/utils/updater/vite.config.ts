/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import utilsConfig     from '@clippo/config/vite.config.utils.js'
import { mergeConfig } from 'vite'

export default mergeConfig( 
	utilsConfig, 
	{ build: { rollupOptions: { external: [ '@clippo/styles' ] } } }, 
)
