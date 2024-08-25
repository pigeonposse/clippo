
/**
 * Caching User Settings in a CLI.
 */ 
import { cache } from '@clippo/fs'

const data = await cache( {
	projectName : 'my-app',
	id          : 'user-settings',
	values      : {
		theme    : 'dark',
		language : 'en', 
	}, // default values
} )

const getFlagValue = key =>{

	for ( const flag of process.argv ) {

		if ( flag.startsWith( `--${key}=` ) ) return flag.split( '=' )[ 1 ]
	
	}
	return undefined

}

const flags = {
	theme    : getFlagValue( 'theme' ),
	language : getFlagValue( 'language' ), 
}

if( flags.theme ) data.set( { theme: flags.theme } )
if( flags.language ) data.set( { language: flags.language } )

const all   = data.get( )
const lang  = data.get( 'language' )
const theme = data.get( 'theme' )

console.log( {
	all,
	lang,
	theme,
} )
