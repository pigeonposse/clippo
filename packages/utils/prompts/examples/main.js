import {
	prompt,
	promptLine, 
} from '@clippo/prompts'

try {

	const questions = [
		{
			type     : 'toggle',
			name     : 'toggle',
			message  : 'Are ypou ready?',
			enabled  : 'Yep',
			disabled : 'Nope',
		},
		{
			type     : 'snippet',
			name     : 'snippet',
			message  : 'Fill out the fields in package.json',
			required : true,
			fields   : [ {
				name    : 'author_name',
				message : 'Author Name',
			}, {
				name : 'version',
				// @ts-ignore
				// validate : ( value, state, item ) =>{

				// 	return true

				// },
			} ],
			template : `\n{
	"name": "\${name}",
	"description": "\${description}",
	"version": "\${version}",
	"homepage": "https://github.com/\${username}/\${name}",
	"author": "\${author_name} (https://github.com/\${username})",
	"repository": "\${username}/\${name}",
	"license": "\${license:ISC}"
}
`,
		},
		{
			type     : 'sort',
			name     : 'sort',
			message  : 'Sort the colors in order of preference',
			hint     : '(Use <shifth+up/down> to move) Top is best, bottom is worst',
			numbered : true,
			choices  : [
				'red',
				'white',
				'green',
				'cyan',
				'yellow',
			],
		},
		{
			type    : 'select',
			name    : 'select',
			message : 'Pick a flavor',
			choices : [
				'apple',
				'grape',
				'watermelon',
				'cherry',
				'orange',
			],
		},
		{
			type    : 'scale',
			name    : 'scale',
			message : 'Please rate your experience',
			scale   : [
				{
					name    : '1',
					message : 'Strongly Disagree', 
				},
				{
					name    : '2',
					message : 'Disagree', 
				},
				{
					name    : '3',
					message : 'Neutral', 
				},
				{
					name    : '4',
					message : 'Agree', 
				},
				{
					name    : '5',
					message : 'Strongly Agree', 
				},
			],
			margin : [
				0,
				0,
				2,
				1,
			],
			choices : [
				{
					name    : 'interface',
					message : 'The website has a friendly interface.',
					initial : 2,
				},
				{
					name    : 'navigation',
					message : 'The website is easy to navigate.',
					initial : 2,
				},
				{
					name    : 'images',
					message : 'The website usually has good images.',
					initial : 2,
				},
				{
					name    : 'upload',
					message : 'The website makes it easy to upload images.',
					initial : 2,
				},
				{
					name    : 'colors',
					message : 'The website has a pleasing color palette.',
					initial : 2,
				},
			],
		},
		{
			type    : 'survey',
			name    : 'survey',
			message : 'Please rate your experience',
			scale   : [
				{
					name    : '1',
					message : 'Strongly Disagree', 
				},
				{
					name    : '2',
					message : 'Disagree', 
				},
				{
					name    : '3',
					message : 'Neutral', 
				},
				{
					name    : '4',
					message : 'Agree', 
				},
				{
					name    : '5',
					message : 'Strongly Agree', 
				},
			],
			margin : [
				0,
				0,
				2,
				1,
			],
			choices : [
				{
					name    : 'interface',
					message : 'The website has a friendly interface.',
				},
				{
					name    : 'navigation',
					message : 'The website is easy to navigate.',
				},
				{
					name    : 'images',
					message : 'The website usually has good images.',
				},
				{
					name    : 'upload',
					message : 'The website makes it easy to upload images.',
				},
				{
					name    : 'colors',
					message : 'The website has a pleasing color palette.',
				},
			],
		
		},
		{
			type    : 'number',
			name    : 'number',
			message : 'Please enter a number',
		},
		{
			type    : 'multiselect',
			name    : 'multiselect',
			message : 'Pick your favorite colors',
			// limit   : 4,
			choices : [
				{
					name  : 'aqua',
					value : '#00ffff', 
				},
				{
					name  : 'black',
					value : '#000000', 
				},
				{
					name  : 'blue',
					value : '#0000ff', 
				},
				{
					name  : 'fuchsia',
					value : '#ff00ff', 
				},
			],
		},
		{
			header  : '========================',
			footer  : '========================',
			type    : 'input',
			name    : 'input-header',
			message : 'Write your name',
		},
		{
			type    : 'list',
			name    : 'list',
			message : 'Type comma-separated keywords',
		},
		{
			type    : 'form',
			name    : 'form',
			message : 'Please provide the following information:',
			choices : [
				{
					name    : 'firstname', 
					message : 'First Name', 
					initial : 'Jon', 
				},
				{
					name    : 'lastname', 
					message : 'Last Name', 
					initial : 'Schlinkert', 
				},
				{
					name    : 'username', 
					message : 'GitHub username', 
					initial : 'jonschlinkert', 
				},
			],
		},
		{
			type         : 'basicauth',
			name         : 'basicauth',
			message      : 'Please enter your password',
			username     : 'admin',
			password     : '123',
			showPassword : true,
		},
		{
			type    : 'confirm',
			name    : 'confirm',
			message : 'Did you like enquirer?',
		},
		{
			type    : 'input',
			name    : 'input',
			message : 'What is your username?',
		},
		{
			type    : 'password',
			name    : 'password',
			message : 'What is your password?',
		},
		{
			type    : 'autocomplete',
			name    : 'autocomplete',
			message : 'Pick your favorite flavor',
			limit   : 10,
			initial : 2,
			choices : [
				'Almond',
				'Apple',
				'Banana',
				'Blackberry',
				'Blueberry',
				'Cherry',
				'Chocolate',
				'Cinnamon',
				'Coconut',
			],
		},
	]
  
	const answers  = await prompt( questions )
	const answers2 = await promptLine( {
		intro    : 'clippo init',
		outro    : 'Succesfully finished 🌈',
		onCancel : p => {

			p.cancel( 'canceled 💔' )
			process.exit( 0 )
		
		},
		list : async p => {

			return {
				name : () => p.text( {
					message      : 'What is your organization?',
					placeholder  : 'PigeonPosse',
					defaultValue : 'PigeonPosse',
				} ),
				age : () => p.number( { message: 'What is your age?' } ),
			}
		
		},
	} )
	console.log( answers, answers2 )

}catch( e ){

	console.log( e )

}
