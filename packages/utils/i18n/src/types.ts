/**
 * Options for configuring i18n.
 *
 */
export type I18nOpts = {
    /**
     * Set your translations.
     *
     * @example
     * const locales = {
     *   en: { general: { greet: '🇬🇧 Hello pigeon' } },
     *   es: { general: { greet: '🇪🇸 Hola paloma' } }
     * }
     *
     */
    locales: { 
        /**
         * Specify the language code as the key and provide an object with namespace translations as the value.
         */
        [language: string]: {
            /**
             * Specify the namespace as the key and provide an object with translations as key-value pairs or nested objects.
             */
            [namespace: string] : {
                /**
                 * Define translations using keys as identifiers and values as the translated strings or nested objects for further organization.
                 */
                [key: string]: string | object
            }
        } 
	} 
    /**
     * Default language.
     * If not set, gets the system language and takes the locales object's first language as the fallback language.
     */
    defaultLocale?: string;
}
