/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

import utilsConfig from '@clippo/config/vite.config.utils.js'
import {
	defineConfig,
	mergeConfig, 
} from 'vite'

import { dependencies } from './package.json'

export default mergeConfig( 
	utilsConfig, 
	await defineConfig( { build: { rollupOptions: { external: Object.keys( dependencies ) } } } ), 
)
