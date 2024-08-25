/**
 * Internationalization.
 *
 * @description Internationalize your CLI.
 */

/* eslint-disable import/no-named-as-default-member *//* eslint-disable import/no-named-as-default-member */

import i18next                    from 'i18next'
import I18nextCLILanguageDetector from 'i18next-cli-language-detector'

import type { I18nOpts } from './types'

/**
 * Export types that can be used from outside.
 *
 */
export { I18nOpts }

/**
 * Initializes the i18n library with the provided options and returns an i18n object with helper methods.
 *
 * @param   {import('./types.ts').I18nOpts} opts - Options for configuring i18n.
 * @returns {Promise<object>}                    - An object with helper methods for managing localization.
 * @example
 * import { i18n } from '@clippo/i18n'
 * 
 * const I18N = await i18n({
 *   locales: {
 *     en: { general: { greet: '🇬🇧 Hello pigeon' } },
 *     es: { general: { greet: '🇪🇸 Hola paloma' } }
 *   },
 * });
 * 
 * const currentLocale = I18N.getCurrentLocale(); 
 * const availableLocales = I18N.getLocales(); 
 * const translatedString = I18N._('general:greet');
 * 
 * console.log(currentLocale, availableLocales, translatedString)
 * 
 * // change lang to spanish
 * I18N.changeLanguage('es')
 * console.log(I18N.getCurrentLocale())
 *
 */
export async function i18n( opts: I18nOpts ) {

	const lang    = opts.defaultLocale || Object.keys( opts.locales )[ 0 ]
	const options = {
		// ns            : 'translations',
		// defaultNS     : 'translations',
		initImmediate : false, // setting initImediate to false, will load the resources synchronously
		resources     : opts.locales,
		fallbackLng   : lang,
		cleanCode     : true,
	}
	if( !opts.defaultLocale )
		// @ts-ignore
		await i18next.use( I18nextCLILanguageDetector ).init( options )
	else
		// @ts-ignore
		await i18next.init( {
			...options,
			lng : opts.defaultLocale,
		} )
		
	return {
		/**
		 * Retrieves the ID of the current locale.
		 *
		 * @returns {string} - The ID of the current locale.
		 * @example
		 * const { getCurrentLocale } = yourI18nInstance
		 * const currentLocale = getCurrentLocale();
		 *
		 */
		getCurrentLocale : () => i18next.language,
		/**
		 * Retrieves an array of available locales.
		 *
		 * @returns {string[]} - An array of available locales.
		 * @example
		 * const { getLocales } = yourI18nInstance
		 * const appLocales = getLocales()
		 *
		 */
		getLocales       : () => Object.keys( opts.locales ),
		/**
		 * Translates a given string key to the current locale.
		 *
		 * @param   {...unknown} opts - The key to translate.
		 * @returns {string}          - The translated string.
		 * @example
		 * const { _ } = yourI18nInstance
		 * console.log( _('general:greet') )
		 *
		 */
		_                : ( ...opts: Parameters<typeof i18next.t> ) => i18next.t( ...opts ),
		/**
		 * Change language.
		 *
		 * @example
		 * const { changeLanguage } = yourI18nInstance
		 * // change lang to spanish
		 * changeLanguage('es')
		 *
		 */
		changeLanguage   : i18next.changeLanguage,

	}

}
