import {
	box, 
	table, 
	columns,
} from '@clippo/styles'

console.log( box( 'v1.0.0', {
	title   : 'collect',
	padding : 2,
} ) )

console.log( table( [
	[
		'0A', '0B', '0C',
	],
	[
		'1A', '1B', '1C',
	],
	[
		'2A', '2B', '2C',
	],
] ) )
  
console.log( columns( [
	{
		name        : 'mod1',
		description : 'some description which happens to be far larger than the max',
		version     : '0.0.1',
	}, {
		name        : 'module-two',
		description : 'another description larger than the max',
		version     : '0.2.0',
	},
], {
	minWidth : 20,
	config   : {
		description : {
			maxWidth : 30,
		},
	},
} ) )
