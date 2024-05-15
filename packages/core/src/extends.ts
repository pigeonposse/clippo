import deepmerge           from 'deepmerge'
import { type ClippoArgs } from './types'
import { defaultArgs }     from './default'

export const mergeConfig = ( opts: ClippoArgs ): ClippoArgs => {

	const { extends: exts, ...options } = opts

	const res = deepmerge.all( [
		defaultArgs, 
		...( exts ? exts : [] ),
		options, 
	] ) as ClippoArgs

	return res

}

