/**
 * CLIPPO.
 *
 * @description Vite config.
 * @see https://clippo.pigeonposse.com/guide/
 */

import { clippo } from 'clippo'

import {
	description, 
	version, 
	name, 
	homepage, 
	repository,
} from '../../../package.json'

const cli = await clippo( {
	name,
	version,
	desc   : description,
	config : {
		i18n : {
			locales : {
				en : { clippo: { urlDesc: 'write a url' } },
				es : { clippo: { urlDesc: 'Escribe una url' } },
			},
		},
	},
	help : {
		docsUrl : homepage,
		title   : {
			colors : [
				'red',
				'green',
				'blue',
			],
			font  : '3-D',
			value : 'clippo',
		},
		usage    : '{{name}} <command/s> [flag/s]',
		examples : [ {
			desc  : 'Open repo',
			value : 'clippo open repo',
		}, {
			desc  : 'Write number 3',
			value : 'clippo types --number 3',
		} ],
	},
	positionals : {
		source : { 
			desc : '{{ _ "clippo:urlDesc" }}',
			type : 'string',
		},
	},
	cmds : { 
		types : {
			desc : 'print types',
			opts : {
				string : {
					type : 'string',
					desc : 'print a string',
				},
				number : {
					type    : 'number',
					desc    : 'print number',
					default : 13,
				},
				choices : {
					type    : 'choices',
					desc    : 'print number',
					choices : [
						1,
						2,
						3,
						4,
					],
					default : 4,
				},
				array : {
					type    : 'array',
					desc    : 'print array',
					default : [ 'array' ],
				},
			},
		},
		info : { desc: 'Set clippo information' },
		open : {
			desc : 'Open clippo urls',
			cmds : {
				docs   : { desc: 'Open clippo docs web' },
				repo   : { desc: 'Open clippo repository' },
				custom : {
					desc        : 'Open a custom url',
					cmds        : { ss: { desc: 'Open clippo repository' } },
					positionals : {
						firsturl : {
							desc : 'set the url to open',
							type : 'url',
						},
						secondurl : {
							desc : 'set the second url to open',
							type : 'url',
						},
					},
				},
			},
			opts : {
				firefox : {
					alias : [ 'f' ],
					type  : 'boolean',
					desc  : 'Open url in firefox',
				},
			},
		},
	},
	opts : {
		yes : {
			alias : [ 'y' ],
			type  : 'boolean',
			desc  : 'Say yes to all',
		},
	},
} )

const {
	cmds, opts, utils, 
} = cli
const {
	log, showHelp, fs, 
} = utils

if( cmds.includes( 'open' ) ) {

	const browser = 'firefox' in opts ? { app: { name: 'firefox' } } : undefined

	if( cmds.includes( 'docs' ) ) fs.open( homepage, browser )
	else if( cmds.includes( 'repo' ) ) fs.open( repository.url, browser )
	else await showHelp()
		
}else if( cmds.includes( 'types' ) )
	log.info( opts )
else if( cmds.includes( 'info' ) ) 
	log.info( cmds )

// process.exit()

