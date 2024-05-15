// export const createPlugin: CreatePlugin<'my-plugin',{ toggle: boolean}> = opts => ( {
// 	name       : 'my-plugin', // the name for use in output and error log or debug 
// 	middleware : ( values: object ) => {

// 		// @ts-ignore
// 		if( opts?.toggle && 'log' in values ) values.log?.info( opts )
// 		return {
// 			...values, 
// 			toggle : opts?.toggle,
// 		}

// 	},
// } )

// export const createCorePlugin: CreateCorePlugin<'i18n', I18nOpts> = ( ) => ( {
// 	name       : 'i18n', // the name for use in output and error log or debug 
// 	middleware : async values => {

// 		const I18n = await i18n( values.config.i18n )

// 		return {
// 			...values,
// 			...I18n,
// 		}
	
// 	},
// } )
