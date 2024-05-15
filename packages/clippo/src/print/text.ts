import figlet       from 'figlet'
import terminalLink from 'terminal-link'

export const font = ( txt: string, font?: figlet.Fonts ) => {

	return figlet.textSync( txt, {
		font             : font ? font : 'Standard',
		horizontalLayout : 'default',
		verticalLayout   : 'default',
	} )

}
export const link = ( text: string, url: string ) => {

	return terminalLink.isSupported ? terminalLink( text, url ) : url

}
