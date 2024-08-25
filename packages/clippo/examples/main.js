
import clippo from '../dist/main.js'

try {

	const run = async () => {

		const cli = await clippo( {
			name    : 'linkto',
			colors  : [ '#63fece', '#ffffff' ],
			font    : 'ANSI Regular',
			version : '1.0.0',
			desc    : 'El foro de los foros',
			docsUrl : 'https://forocoches.com',
			cmds    : [ {
				key  : 'abrir',
				desc : 'abrir forocoches',
			} ],
			opts : {
				'firefox' : {
					cmd   : 'abrir',
					alias : [ 'f' ],
					type  : 'string',
					desc  : 'abrir forocoches en firefox',
				},
			},
		} )
		// const { command }  = cli
		const commandAbrir = cli.argv.parsed.argv._[ 0 ]

		if( commandAbrir ) cli.fs.openUrl( 'https://forocoches.com' )

		console.log( `\n ${cli}` )
	
	}
	run()

}catch( e ){

	console.error( e )

}
