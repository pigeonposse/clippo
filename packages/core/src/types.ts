/**
 * TYPES.
 *
 * @description File for set core types.
 */

import type { Fs }       from '@clippo/fs'
import type { I18nOpts } from '@clippo/i18n'
import type  i18n        from '@clippo/i18n'
import type {
	Logger,
	LoggerParams, 
} from '@clippo/logger'
import type * as clippoProcess from '@clippo/process'
import type * as styles        from '@clippo/styles'
import type {
	UpdaterOptions,
	updater, 
} from '@clippo/updater'
import type {
	ArgumentsCamelCase,
	InferredOptionTypes, 
} from 'yargs'
import type yargs from 'yargs'

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
		aliases : [ 'V' ],
	},
	help : {
		name    : 'help',
		aliases : [ 'h' ],
	},
	verbose : {
		name    : defaultCustomOpts.verbose,
		aliases : [ 'v' ],
	},
	config : {
		name    : defaultCustomOpts.config,
		aliases : [ 'c' ],
	},
	time : {
		name    : defaultCustomOpts.time,
		aliases : [ 't' ],
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
 * COMANDS AND OPTIONS
 * ****************************************************************************.
 */
export type OptionType = ObjectValues<typeof optionTypes>

export type CommandSuper = {
	/**
	 * Type of cmd/opts.
	 *
	 * @default boolean
	 */
	type?: OptionType | string
	/**
	 * Description of cmd/opts.
	 */
    desc: string
}

export type OptionSuper = CommandSuper & {
    alias?: string[]
	required?: boolean
}
export type OptionString = OptionSuper & {
    type?: typeof optionTypes.string
	default?: string 
}
export type OptionObject = OptionSuper & {
    type?: typeof optionTypes.object
	default?: object 
}
export type OptionNumber = OptionSuper & {
    type?:typeof optionTypes.number
	default?: number 
}
export type OptionBoolean = OptionSuper & {
    type?: typeof optionTypes.boolean
	default?: boolean 
}
export type OptionArray = OptionSuper & {
    type?: typeof optionTypes.array
	default?: ( string | number )[]
}
export type OptionChoices = OptionSuper & {
    type?: typeof optionTypes.choices
	choices: ( string | number )[]
	default?: string | number
}
export type OptionCustom = OptionSuper & {
    type?: string
	default?: unknown
}
export type Option = 	
	OptionString |
	OptionNumber |
	OptionBoolean |
	OptionArray | 
	OptionChoices |
	OptionObject |
	OptionCustom

export type Positional = 
	OptionString |
	OptionNumber |
	OptionBoolean |
	OptionArray | 
	OptionChoices |
	OptionObject |
	OptionCustom	

export type Command = CommandSuper & {
	/**
	 * List of positionals available.
	 */
	positionals?: Positionals
	/**
	 * List of commands available.
	 */
	cmds?: Commands
	/**
	 * List of options available.
	 */
	opts?: Options
	/**
	 * Customize thw output help.
	 */
	help?: ClippoHelp
}

type Options = {[id:string] : Option}
type Positionals = {[id:string] : Positional}
type Commands = { [key in string]: Command }

/**
 * ****************************************************************************.
 * CONFIG PARAMS
 * ****************************************************************************.
 */

export type CliHookParams = { opts: unknown, cmds: unknown }

type ClippoStyles = typeof styles
type CliHook = ( args: CliHookParams ) => void
type CliStyleHook = ( opts: {value: string, styles: ClippoStyles} ) => string
type CliTitleStyleHook = ( opts: ClippoHelp['title'] & { styles: ClippoStyles} ) => string

/**
 * Contains the options to add to the help.
 */
export type ClippoHelp = {
	/**
	 * Add a title to your help output, it can also be disabled.
	 */
	title?: {
		value?: string
		/**
		 * The colors used in the title.
		 */
		colors?: styles.GradientColors
		/**
		 * The type of font used in the title.
		 */
		font?: styles.Fonts
	}
	/**
	 * Information on how to use the CLI application or command.
	 */
	usage?: string | false
	/**
	 * Add usage examples of your command.
	 */
	examples?: ( {
		value: string
		desc: string
	} )[]
	/**
	 * URL of the documentation for the CLI.
	 */
	docsUrl?: string
	/**
	 * Format the help output. 
	 * This is executed before the styles.
	 */
	format?: ( v: object ) => string
	/**
	 * Customize only help styles.
	 */
	styles?: {
		title?: CliTitleStyleHook
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
}

export type ClippoSuperArgs = Omit<Command, 'desc' | 'type'> & {
	/**
	 * Add custom configuration to clippo.
	 */
	config?: {
		/**
		 * Command line arguments.
		 *
		 * @default process.argv
		 */
		argv?: string[]
		/**
		 * Add or remove default cli options.
		 *
		 * @default Object.values(defaultCustomOpts)
		 */
		defaultOpts?: ( ObjectValues<typeof defaultCustomOpts> )[]
		/**
		 * Add updater notifier and customize if you want.
		 *
		 */
		updater?: Omit<UpdaterOptions, 'name' | 'version'> | boolean
		/**
		 * Configuration for internationalization.
		 */
		i18n?: I18nOpts
		/**
		 * Execution hooks for specific actions.
		 */
		hooks?: { 
			beforeAll?: CliHook
			beforeVersion?: CliHook
			afterVersion?: CliHook
			beforeHelp?: CliHook
			afterHelpTitle?: CliHook
			afterHelp?: CliHook
		}
		/**
		 * Configuration for logger.
		 */
		logger?: LoggerParams
		/**
		 * Custom types for use in comands and options.
		 */
		customTypes?: {
			/**
			 * Identifier for the custom type.
			 * It is recommended to use a prefix in the id since otherwise it could clash with other existing types.
			 *
			 * @example '{yourPrefix}-url'
			 *
			 */
			[id in string] : {
				/**
				 * Validation function for the custom type.
				 */
				validate : ( value: unknown ) => boolean
			}
		} 
	}
	/**
	 * Extends functionallity.
	 *
	 * @see https://clippo.pigeonposse.com/tutorial/create-plugin
	 */
	plugins?: Plugins
}

export type ClippoArgs = ClippoSuperArgs & {
	/**
	 * The name of the CLI application.
	 */
    name: string
	/**
	 * The version of the CLI application.
	 */
    version: string
	/**
	 * The description of the CLI application.
	 */
    desc: string
	/**
	 * Make presets with cmds and opts predesigned or make styles configuration.
	 *
	 * @see https://clippo.pigeonposse.com/tutorial/how-to-extends
	 */
	extends?: ClippoExtendsArgs[]
}

export type ClippoExtendsArgs = ClippoSuperArgs

/**
 * ****************************************************************************.
 * Updater
 * ****************************************************************************.
 */
type UpdaterConfig = Omit<UpdaterOptions, 'name' | 'version'> | boolean
export type UpdaterParams = {
	config?: UpdaterConfig
	name: string,
	version:string
}
export type UpdaterReturned = Promise<Awaited<ReturnType<typeof updater>> | {		
	notify : undefined,
	updateData : undefined
}>

/**
 * ****************************************************************************.
 * RETURNED TYPE
 * ****************************************************************************.
 */
export type ClippoUtils = object & Awaited<ReturnType<typeof i18n>> & {
	showHelp: () => void
	styles: typeof styles
	fs : Fs
	log: Logger
	updater: Awaited<UpdaterReturned>
	thisProcess : typeof clippoProcess
}
export type ClippoReturnedType = {
	name: string
	version: string
	cmds: ( string | number )[],
	opts: object
	utils: ClippoUtils
}

/**
 * ****************************************************************************.
 * MIDDLEWARE
 * ****************************************************************************.
 */
export type AddMiddleware = (
	// eslint-disable-next-line @typescript-eslint/ban-types
	innerArgv: ArgumentsCamelCase<yargs.Omit<{}, never> & InferredOptionTypes<{}>>, 
	cb: ( opts: ClippoMiddleware ) => Promise<void>
) => void
export type ClippoMiddleware = ClippoReturnedType & {
	params: ClippoArgs,
}

/**
 * ****************************************************************************.
 * PLUGINS TYPES
 * ****************************************************************************.
 */
type Plugins<
	Name extends string = string,
	ConfigObject extends object = object
> = Array<Plugin<Name> | CorePlugin<Name, ConfigObject>>

/**
 * Plugin type.
 */
export type Plugin<
	Name extends string = string,
> = {
	name: Name
	middleware?: ( values: object ) => object
}
export type CorePlugin<
	Name extends string = string,
	ConfigObject extends object = object
> = {
	name: Name
	middleware: ( values: object & { config: { [key in Name ]: ConfigObject } } ) => Promise<object>
}

/**
 * Create plugin type.
 */
export type CreateCorePlugin<
	Name extends string = string,
	ConfigObject extends object = object
> = ( ) => CorePlugin<Name, ConfigObject>

/**
 * Create CORE plugin type.
 */
export type CreatePlugin<
	Name extends string = string,
	ConfigObject extends object = object
> = ( opts?: ConfigObject ) => Plugin<Name>
