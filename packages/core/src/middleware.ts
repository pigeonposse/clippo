
import { configMiddleware }      from './config'
import { helpMiddleware }        from './help/main'
import type { ClippoMiddleware } from './types'
import { versionMiddleware }     from './version'

export const middleware = async ( { opts, cmds, name, utils, version, params }: ClippoMiddleware ) => {

	const { log, updater } = utils

	/**
	 * CONFIG.
	 */
	opts = await configMiddleware( {
		opts, cmds, name, version, utils, params, 
	} )

	/**
	 * BEFORE ALL.
	 */
	if ( 'verbose' in opts && opts.verbose === true ) log.verbose = true
	if ( 'time' in opts && opts.time === true ) log.addTimeout( )

	if( params.config?.hooks?.beforeAll ) 
		await params.config.hooks.beforeAll( {
			cmds,
			opts,
		} )
	
	if( typeof updater.notify == 'function' && ( params.config?.updater === undefined || params.config?.updater !== false ) )
		updater.notify()
	
	/**
	 * HELP SECTION.
	 */

	await helpMiddleware( {
		opts, cmds, name, version, utils, params, 
	} )

	/**
	 * VERSION SECTION.
	 */
	await versionMiddleware( {
		opts, cmds, name, version, utils, params, 
	} )
	
	return opts
		
}
