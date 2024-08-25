/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */
// import {
// 	fileURLToPath, URL, 
// } from 'url'

import { defineConfig } from 'vite'
import dts              from 'vite-plugin-dts'

import { name } from '../../package.json'

export default defineConfig( {
	esbuild : { 
		platform : 'node',
		target   : 'node18',
	},
	build : {
		ssr       : true,
		target    : 'node18',
		sourcemap : true,
		lib       : {
			entry    : [ 'src/main.ts' ], 
			name, 
			fileName : format => `${name}.${format}.js`,
			formats  : [ 'es' ],
		},
	},
	// resolve : {
	// 	alias : [
	// 		{
	// 			find        : '@assets', 
	// 			replacement : fileURLToPath( new URL( './assets', import.meta.url ) ),  
	// 		},
	// 	],
	// },
	// define : {
	// 	DMG_SCRIPT_CONTENT : JSON.stringify( dmgScript ),
	// },
	plugins : [ dts( { rollupTypes: true } ) ],
} )
