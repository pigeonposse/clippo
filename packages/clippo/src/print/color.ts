import picocolors     from 'picocolors'
import gradientString from 'gradient-string'

export const color = picocolors

export const gradient = ( txt: string, colors: string[] ) => {

	return gradientString( ...colors ).multiline( txt )

}
