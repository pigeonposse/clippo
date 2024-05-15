
import { updater as updaterFunct }  from '@clippo/updater'
import type {
	UpdaterParams, UpdaterReturned, 
} from './types'

export const updater = async ( { config, name, version }: UpdaterParams ): UpdaterReturned => {

	if( config === false ) return {
		notify     : undefined,
		updateData : undefined,
	}

	const opts = await updaterFunct( {
		name, version, 
		...( typeof config === 'object' ? config : {} ),
	} )

	return opts

}
