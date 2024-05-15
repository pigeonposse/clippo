/* eslint-disable jsdoc/require-jsdoc */
import i18n from '@clippo/i18n'

async function initializeI18n() {

	const { _, getCurrentLocale, getLocales, changeLanguage } = await i18n( {
		locales : {
			en : {
				general : {
					greeting : '🇬🇧 Hello',
					farewell : '🇬🇧 Goodbye',
					nested   : {
						more : 'Read more...',
					},
				},
			},
			es : {
				general : {
					greeting : '🇪🇸 Hola',
					farewell : '🇪🇸 Adiós',
				},
			},
			ja : {
				general : {
					greeting : '🇯🇵 こんにちは',
					farewell : '🇯🇵 さようなら',
				},
			},
			zh : {
				general : {
					greeting : '🇨🇳 你好',
					farewell : '🇨🇳 再见',
				},
			},
			fr : {
				general : {
					greeting : '🇫🇷 Bonjour',
					farewell : '🇫🇷 Au revoir',
				},
			},
		},		
		// defaultLocale : 'en',
	} )

	console.log( {
		t : {
			greet              : _( 'general:greeting' ), // returns your value in your system lang, if not exists return falback lang (first in object, in this case: en)
			nested             : _( 'general:nested:more' ), // returns fallback because only exists in english
			errorNoNS          : _( 'greeting' ), // ERROR: returns key an not the value, because namespace is not set
			errorNestedAndNoNS : _( ':nested:more' ), //ERROR: returns key an not the value, because namespace is not set
		},
		availableLocales : getCurrentLocale(), // Returns the current locale name,
		currentLocale    : getLocales(), // Returns an array of available locales
	} )

	await changeLanguage( 'fr' )

	console.log( {
		t : {
			greet              : _( 'general:greeting' ), // returns your value in your system lang, if not exists return falback lang (first in object, in this case: en)
			nested             : _( 'general:nested:more' ), // returns fallback because only exists in english
			errorNoNS          : _( 'greeting' ), // ERROR: returns key an not the value, because namespace is not set
			errorNestedAndNoNS : _( ':nested:more' ), //ERROR: returns key an not the value, because namespace is not set
		},
		availableLocales : getCurrentLocale(), // Returns the current locale name,
		currentLocale    : getLocales(), // Returns an array of available locales
	} )

}

initializeI18n()
