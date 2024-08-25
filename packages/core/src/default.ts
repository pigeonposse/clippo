import i18n from '@clippo/i18n'

import { locales }           from './locales'
import { defaultCustomOpts } from './types'

import type {
	CreateCorePlugin, 
	ClippoExtendsArgs, 
} from './types'
import type { I18nOpts } from '@clippo/i18n'

// export const createCorePlugin: CreateCorePlugin<'i18n', I18nOpts> = ( ) => ( {
export const createCorePlugin: CreateCorePlugin<'i18n', I18nOpts> = ( ) => ( {
	name       : 'i18n', // the name for use in output and error log or debug 
	middleware : async values => {

		const I18n = await i18n( values.config.i18n )

		return {
			...values,
			...I18n,
		}
	
	},
} )

export const defaultArgs: ClippoExtendsArgs = {
	config : {
		argv        : process.argv,
		defaultOpts : Object.values( defaultCustomOpts ),
		updater     : true,
		i18n        : { locales },
		customTypes : { url: { validate: ( v: unknown ) => typeof v === 'string' && ( v.startsWith( 'https://' ) || v.startsWith( 'https://' ) ) } },
		// customTypess : {
		// 	url : ( v: unknown ) => typeof v === 'string' && ( v.startsWith( 'https://' ) || v.startsWith( 'https://' ) ),
		// },
	},
	help : {
		title : {
			value  : '{{name}}',
			font   : 'ANSI Regular',
			colors : [
				'red',
				'green',
				'blue', 
			],
		},
		styles : {
			title : ( {
				font, value, colors, styles, 
			} ) => {
				
				if( value && font && colors ) 
					return '\n' + styles.gradient( styles.font( `${value.toUpperCase()}`, font ), colors ) + '\n'
				else if ( value && colors )
					return '\n' + styles.gradient( `${value.toUpperCase()}`, colors ) + '\n'
				else if ( value && font )
					return '\n' + styles.font( `${value.toUpperCase()}`, font ) + '\n'
				else if ( value )
					return value.toUpperCase()
				return ''
				
			},
			desc : ( {
				value, styles, 
			} ) => styles.color.white.dim( value ),
			link : ( {
				value, styles, 
			} ) => styles.color.white.dim.italic.underline( value ),
			sectionTitle : ( {
				value, styles, 
			} ) => styles.color.white.bold( value ),
			cliName : ( {
				value, styles, 
			} ) => styles.color.magenta( value ),
			cmd : ( {
				value, styles, 
			} ) => styles.color.blue( value ),
			opt : ( {
				value, styles, 
			} ) => styles.color.green( value ),
			type : ( {
				value, styles, 
			} ) => styles.color.white( value ),
			required : ( {
				value, styles, 
			} ) => styles.color.red( value ),
			choices : ( {
				value, styles, 
			} ) => styles.color.white.dim( value ),
			example : ( {
				value, styles, 
			} ) => styles.color.white( value ),
			default : ( {
				value, styles, 
			} ) => styles.color.white.dim( value ),
		},
	},
}

