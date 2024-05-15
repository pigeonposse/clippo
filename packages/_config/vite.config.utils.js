/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/guide
 */

/**
 * @typedef {import('vite').UserConfig} UserConfig
 */

import dts from 'vite-plugin-dts'

const nodeTarget = 'node18'
/**
 * @type {UserConfig}
 */
const config = {
  esbuild: {
    platform: 'node',
    target: nodeTarget,
  },
  build: {
    ssr: true, // true because is backend
    target: nodeTarget,
    sourcemap: false,
	minify: 'esbuild',
    lib: {
      entry: [
        'src/main.ts',
      ],
      formats: [
        'es',
		// 'cjs'
      ],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
}

export default config
