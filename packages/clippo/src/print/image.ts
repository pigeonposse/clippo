/**
 * Images in the terminal.
 *
 * @description Functions for display images and gifs in terminal.
 */
import terminalImage from 'terminal-image'

type GraphicInput = string | Readonly<Buffer>
type ImageOptions = Parameters<typeof terminalImage.file>[1]
type GifOptions = Parameters<typeof terminalImage.gifFile>[1]

const fetchImage = async ( url: string ) =>{

	try {

		const response = await fetch( url )

		const buffer = Buffer.from( await response.arrayBuffer() )

		return buffer
	
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error fetching ghaphic from URL: ${error.message}` )
	
	}
	
}

/**
 * Display an image in the terminal.
 *
 * @param   {GraphicInput}    input     - Path to the image file, image Url or image buffer.
 * @param   {ImageOptions}    [options] - Options to customize the display of the image.
 * @returns {Promise<string>}           - Promise that resolves with the image formatted for the terminal.
 * @example
 *
 */
export const image = async ( input: GraphicInput, options?: ImageOptions ) => {
	
	if ( typeof input === 'string' ) {

		if( input.startsWith( 'https://' ) || input.startsWith( 'https://' ) ) {

			input = await fetchImage( input )
			return terminalImage.buffer( input, options )
		
		}else
			return terminalImage.file( input, options )
	
	}
	if ( Buffer.isBuffer( input ) ) return terminalImage.buffer( input, options )

	throw Error( 'Input is neither a string nor a buffer' )

}

/**
 * Display a GIF in the terminal.
 *
 * @param   {GraphicInput}    input     - Path to the GIF file, GIF url or GIF buffer.
 * @param   {GifOptions}      [options] - Options to customize the display of the GIF.
 * @returns {Promise<string>}           - Promise that resolves with the GIF formatted for the terminal.
 * @experimental
 * @example
 *
 */
export const gif = async ( input: GraphicInput, options?: GifOptions ) => {

	if ( typeof input === 'string' ){

		if( input.startsWith( 'https://' ) || input.startsWith( 'https://' ) ) {

			input = await fetchImage( input )
			return terminalImage.gifBuffer( input, options )

		}else
			return terminalImage.gifFile( input, options )
	
	}
	if ( Buffer.isBuffer( input ) ) return terminalImage.gifBuffer( input, options )

	throw Error( 'Input is neither a string nor a buffer' )

}
