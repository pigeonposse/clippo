import {
	gif,
	image, 
} from '@clippo/media'

const IMG = await image( 'https://avatars.githubusercontent.com/u/111685953', {
	width  : 50,
	height : 50,
} )
console.log( IMG )

const ASCII_IMG = await image( 'https://avatars.githubusercontent.com/u/111685953?size=50', {
	width        : 20,
	height       : 20,
	asciiOutput  : true,
	asciiOptions : {
		pxWidth : 4,
		colored : false,
	},
} )
console.log( ASCII_IMG )

await gif( 'https://64.media.tumblr.com/38adef3da23d26058e3085ce271b39c1/tumblr_nil77wk20l1qhnszoo1_400.gifv', {
	width  : 40,
	height : 40,
} )
