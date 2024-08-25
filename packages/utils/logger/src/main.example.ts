import { Logger } from './main'

const log = new Logger( {
	// name      : 'test-clippo',
	// outputFile : './clipo-log',
	screenlog : true,
} )

log.verbose = true

log.info( 'es info' )
log.debug( 'es debug' )
log.debug( {
	type     : 'es debug',
	moreData : '',
} )
log.success( 'es exitoso' )
log.warn( 'es una advertencia' )
log.error( 'es un error' )
try {

	// @ts-ignore
	d // force a sintax error

}catch( e ){

	await log.codeError( e as object )

}

log.fatal( 'es un error fatal' )
