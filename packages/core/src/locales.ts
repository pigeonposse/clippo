/**
 * Locales for cli.
 *
 * @description Locales for cli.
 */

import { optionTypes } from './types'

import type { I18nOpts } from '@clippo/i18n'

export const prefixType = 'type_'

export const locales: I18nOpts['locales'] = {
	en : {
		general : {
			globalOptions                        : 'Global options:',
			options                              : 'Options:',
			commands                             : 'Commands:',
			examples                             : 'Examples:',
			docs                                 : 'Documentation:',
			usage                                : 'Usage:',
			usageCmds                            : '<command/s>',
			usageOpts                            : '[option/s>]',
			versionDesc                          : 'Show Version number',
			timeDesc                             : 'Show timeout',
			helpDesc                             : 'Show Help',
			verboseDesc                          : 'Run with verbose logging',
			configDesc                           : 'Get your configuration from a custom config file. \nFormats supported: JSON, YAML or TOML. You can get config from local path or url. Automatically searches for: (./package.json).{{name}} or ./{{name}}.[json|yaml|yml|toml].',
			requiredTitle                        : 'required',
			choicesTitle                         : 'choices',
			defaultTitle                         : 'default',
			updaterTitle                         : 'Update available',
			[ prefixType + optionTypes.array ]   : 'array',
			[ prefixType + optionTypes.string ]  : 'string',
			[ prefixType + optionTypes.boolean ] : 'boolean',
			[ prefixType + optionTypes.choices ] : 'choices',
			[ prefixType + optionTypes.object ]  : 'object',
			[ prefixType + optionTypes.number ]  : 'number',
		},
	},
	es : {
		general : {
			globalOptions                        : 'Opciones globales:',
			options                              : 'Opciones:',
			commands                             : 'Comandos:',
			examples                             : 'Ejemplos:',
			docs                                 : 'Documentación:',
			usage                                : 'Uso:',
			usageCmds                            : '<comando/s>',
			usageOpts                            : '[opción/es]',
			versionDesc                          : 'Mostrar número de versión',
			timeDesc                             : 'Mostrar tiempo de espera',
			helpDesc                             : 'Mostrar Ayuda',
			verboseDesc                          : 'Ejecutar con registro detallado',
			configDesc                           : 'Obtener la configuración desde un archivo.\nFormatos admitidos: JSON, YAML o TOML. Puede obtener la configuración desde una ruta local o una URL. Por defecto buscará automáticamente en: (./package.json).{{name}} o ./{{name}}.[json|yaml|yml|toml].',
			requiredTitle                        : 'requerido',
			choicesTitle                         : 'opciones',
			defaultTitle                         : 'por defecto',
			updaterTitle                         : 'Actualización disponible',
			[ prefixType + optionTypes.array ]   : 'arreglo',
			[ prefixType + optionTypes.string ]  : 'cadena',
			[ prefixType + optionTypes.boolean ] : 'booleano',
			[ prefixType + optionTypes.choices ] : 'opciones',
			[ prefixType + optionTypes.object ]  : 'objeto',
			[ prefixType + optionTypes.number ]  : 'número',
		},
	},
}

