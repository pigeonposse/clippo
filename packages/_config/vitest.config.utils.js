/**
 * Vitest config.
 *
 * @description Vitest config.
 * @see https://vitest.dev/guide
 */

/**
 * @typedef {import('vitest/config').UserConfig} VitestUserConfig
 */

import { defineConfig } from 'vitest/config'

/**
 * @type {VitestUserConfig}
 */
const config = {
  base: './src',
}

export default defineConfig(config)
