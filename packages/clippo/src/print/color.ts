import gradientString from 'gradient-string'
import picocolors     from 'picocolors'

export const color = picocolors

export const gradient = ( txt: string, colors: string[] ) => {

	return gradientString( ...colors ).multiline( txt )

}
