
import clippo  from './main'
import {
	description,
	version,
	name,
	homepage,
	repository,
} from '../../package.json'

try {

	const run = async () => {

		const cli = await clippo( {
			name    : 'ethan-cli',
			version,
			desc    : description,
			docsUrl : homepage,
			title   : {
				colors : [
					'red',
					'green',
					'blue',
				],
				font  : '3-D',
				value : 'ethan cli',
			},
			cmds : [
				{
					key  : 'types',
					desc : 'print types',
					opts : [
						{
							key  : 'string',
							type : 'string',
							desc : 'print a string',
						},
						{
							key     : 'number',
							type    : 'number',
							desc    : 'print number',
							default : 13,
						},
						{
							key     : 'choices',
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
						{
							key     : 'array',
							type    : 'array',
							desc    : 'print array',
							default : [ 'array' ],
						},
					],
				},
				{
					key  : 'info',
					desc : 'Set clippo information',
				},
				{

					key  : 'open',
					desc : 'Open clippo urls',
					cmds : [
						{
							key  : 'docs',
							desc : 'Open clippo docs web',
						},
						{
							key  : 'repo',
							desc : 'Open clippo repository',
						},
						{
							key         : 'custom',
							desc        : 'Open a custom url',
							positionals : [ {
								key      : 'url',
								type     : 'string',
								desc     : 'set the url to open',
								required : true,
							} ],
						},
					],
					opts : [ {
						key   : 'firefox',
						alias : [ 'f' ],
						type  : 'boolean',
						desc  : 'Open url in firefox',
					} ],
				},
			],
			// opts : [
			// 	{
			// 		key   : 'yes',
			// 		alias : [
			// 			'y',
			// 		],
			// 		type : 'boolean',
			// 		desc : 'say yes to all',
			// 	},
			// ],
			examples : [ {
				desc  : 'Open repo',
				value : 'clippo open repo',
			}, {
				desc  : 'Write number 3',
				value : 'clippo types --number 3',
			} ],
			// defaultOpts : [
			// 	'time',
			// ],
			// styles : {
			// 	desc : ( s, { color } ) => color.red( s ),
			// },
			// hooks : {
			// 	afterHelpTitle : () => {},
			// },
		} )
		
		const {
			cmds, opts, log, showHelp, 
		} = cli
		// console.log( cmds, opts )
		if( cmds.includes( 'open' ) ) {

			const browser = opts.firefox ? { app: { name: 'firefox' } } : undefined

			if( cmds.includes( 'docs' ) )
				cli.fs.open( homepage, browser )
			else if( cmds.includes( 'repo' ) )
				cli.fs.open( repository.url, browser )
			else {

				await showHelp()
			
			}
		
		}else if( cmds.includes( 'types' ) )
			log.info( opts )
		else if( cmds.includes( 'info' ) ) 
			log.info( cmds )
	
	}
	run()

}catch( e ){

	console.error( e )

}
