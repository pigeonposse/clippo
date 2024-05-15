import type { ClippoMiddleware } from './types'

export const versionMiddleware = async ( { opts, cmds, utils, params }: ClippoMiddleware ) => {
	
	if ( !( 'version' in opts ) ) return
	
	const { styles, thisProcess } = utils

	if( params.config?.hooks?.beforeVersion ) 
		await params.config.hooks.beforeVersion( {
			cmds, opts,
		} )
			
	thisProcess.write( styles.color.bgGreen( ` ${params.version} ` ) )
		
	if( params.config?.hooks?.afterVersion ) 
		await params.config.hooks.afterVersion( {
			cmds, opts,
		} )
	
	thisProcess.exit()

}
