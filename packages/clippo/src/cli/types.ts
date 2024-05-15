/**
 * TYPES.
 *
 * @description File for set core types.
 */

import type * as print from '../print/main'

/**
 * ****************************************************************************.
 * CONSTANTS
 * ****************************************************************************.
 */

export const defaultCustomOpts = {
	config  : 'config',
	verbose : 'verbose',
	time    : 'time',
} as const
export const optType = {
	version : {
		name    : 'version',
		aliases : [
			'V',
		],
	},
	help : {
		name    : 'help',
		aliases : [
			'h',
		],
	},
	verbose : {
		name    : defaultCustomOpts.verbose,
		aliases : [
			'v',
		],
	},
	config : {
		name    : defaultCustomOpts.config,
		aliases : [
			'c',
		],
	},
	time : {
		name    : defaultCustomOpts.time,
		aliases : [
			't',
		],
	},
} 
export const optionTypes = {
	string  : 'string',
	boolean : 'boolean',
	choices : 'choices',
	object  : 'object',
	number  : 'number',
	array   : 'array',
} as const

/**
 * ****************************************************************************.
 * UTILS
 * ****************************************************************************.
 */
export type ObjectValues<Values> = Values[keyof Values]

/**
 * ****************************************************************************.
 * TYPES
 * ****************************************************************************.
 */
export type OptionType = ObjectValues<typeof optionTypes>
type FontType = Parameters<typeof print.font>[1]
type ColorTyoe = Parameters<typeof print.gradient>[1]

export type CommandSuper = {
	key: string;
    desc: string;
}

export type OptionSuper = CommandSuper & {
    alias?: string[];
	required?: boolean
}
export type OptionString = OptionSuper & {
    type: typeof optionTypes.string
	default?: string 
}
export type OptionObject = OptionSuper & {
    type: typeof optionTypes.object
	default?: object 
}
export type OptionNumber = OptionSuper & {
    type:typeof optionTypes.number
	default?: number 
}
export type OptionBoolean = OptionSuper & {
    type: typeof optionTypes.boolean
	default?: boolean 
}
export type OptionArray = OptionSuper & {
    type: typeof optionTypes.array
	default?: ( string | number )[]
}

export type OptionChoices = OptionSuper & {
    type: typeof optionTypes.choices
	choices: ( string | number )[]
	default?: string | number
}
export type Option = 	
	OptionString |
	OptionNumber |
	OptionBoolean |
	OptionArray | 
	OptionChoices |
	OptionObject

export type Command = CommandSuper & {
	opts?: Option[]
	cmds?: Command[]
	positionals?: Option[]
}

type CliPrint = typeof print
export type CliHookParams = { opts: unknown, cmds: unknown }
type CliHook = ( args: CliHookParams ) => void
type CliStyleHook = ( value: string, print: CliPrint ) => string

export type CliArgs = {
    name: string
    version: string
    desc: string
	title?: {
		value?: string | boolean
		colors?: ColorTyoe
		font?: FontType;
	}
    cmds?: Command[]
	opts?: Option[]
	defaultOpts?: ( ObjectValues<typeof defaultCustomOpts> )[]
	usage?: string | false
	examples?: ( {
		value: string
		desc: string
	} )[]
    docsUrl?: string;
	argv?: string[]
	hooks?: { 
		beforeAll?: CliHook
		beforeVersion?: CliHook
		afterVersion?: CliHook
		beforeHelp?: CliHook
		afterHelpTitle?: CliHook
		afterHelp?: CliHook
	}
	styles?: {
		mainTitle?: CliStyleHook
		desc?: CliStyleHook
		link?: CliStyleHook
		sectionTitle?: CliStyleHook
		cliName?: CliStyleHook
		cmd?: CliStyleHook
		opt?: CliStyleHook
		type?: CliStyleHook
		required?: CliStyleHook
		choices?: CliStyleHook
		example?: CliStyleHook
		default?: CliStyleHook
	}
	configFile?: boolean
	updater?: boolean
	locales?: {
		dir: string
		defaltLocale: string
	}
};
