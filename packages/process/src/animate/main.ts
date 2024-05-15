
import { createLogUpdate } from 'log-update'
import {
	gradient, font, 
}  from '@clippo/styles'
// import { prompt }          from 'process/prompt/main'
// Write output but don't hide the cursor
const log               = createLogUpdate( process.stdout, {
	showCursor : true,
} )
const faces             = [
	'( つ ◕_◕ )つ',
	'( っ ◉_◉ )っ',
	'( つ •_• )つ',
]
const gradientAnimation = [
	[
		'red', 'green', 'blue',
	],
	[
		'blue', 'red', 'green',
	],
	[
		'green', 'blue', 'red',
	],
]
let index               = 0

const title = font( 'unicorn' )
setInterval( () => {

	const gradientArr = gradientAnimation[index = ++index % gradientAnimation.length]
	const face        = faces[index = ++index % faces.length]
	log( `
${face}
${gradient( title, gradientArr )}
` )

}, 120 )

// const answer = await prompt( [
// 	{
// 		type    : 'text',
// 		name    : 'text',
// 		message : 'Whats your name?',
// 	},
// ] )

// console.log( answer )
