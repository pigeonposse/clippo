import deepmerge from 'deepmerge'

import { defaultArgs }     from './default'
import { type ClippoArgs } from './types'

export const mergeConfig = ( opts: ClippoArgs ): ClippoArgs => {

	const {
		extends: exts, ...options 
	} = opts

	const res = deepmerge.all( [
		defaultArgs, 
		...( exts ? exts : [] ),
		options, 
	] ) as ClippoArgs

	return res

}

