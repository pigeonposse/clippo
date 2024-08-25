import {
	box,
	font,
	table,
	gradient,
	columns,
	image,
	gif,
} from './main'

console.log( box( 'v1.0.0', {
	title   : 'collect',
	padding : 2,
} ) )

console.log( table( [
	[
		'0A',
		'0B',
		'0C',
	],
	[
		'1A',
		'1B',
		'1C',
	],
	[
		'2A',
		'2B',
		'2C',
	],
] ) )

const g = gradient( 
	font( 'Cunigan', 'Banner3' ), 
	[ '#00000', 'red' ] )
console.log( g ) 
console.log( ) 
  
console.log( columns( [ {
	name        : 'mod1',
	description : 'some description which happens to be far larger than the max',
	version     : '0.0.1',
}, {
	name        : 'module-two',
	description : 'another description larger than the max',
	version     : '0.2.0',
} ], {
	minWidth : 20,
	config   : { description: { maxWidth: 30 } },
} ) )
const IMG = await image( 'https://avatars.githubusercontent.com/u/111685953', {
	width  : 80,
	height : 80,
} )
const GIF = await gif( 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHoxYjBkcDB6Zmltcm9uaDFlYnl5MWN2a21meGN4czBpcnZ0ejBzeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NVBR6cLvUjV9C/giphy.gif', {
	width  : 80,
	height : 80,
} )
console.log( IMG, GIF )
