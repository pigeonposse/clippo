/**
 * Locales for cli.
 *
 * @description Locales for cli.
 */

// eslint-disable-next-line import/default
import y18n       from 'y18n'
import type yargs from 'yargs'
import { Fs }     from '../fs/main'

type LocalesParams = { 
	yargs: typeof yargs 
	dir?: string
	defaltLocale? : string
}

export class Locales {

	yargs
	dir
	defaltLocale
	y18n: typeof y18n | undefined
	fs = new Fs()

	constructor( { yargs, dir, defaltLocale }: LocalesParams ) {

		this.yargs        = yargs
		this.dir          = dir || this.fs.getAbsolutePath( './locale' )
		this.defaltLocale = defaltLocale || 'en'
		this.y18n         = undefined
	
	}
	async init(){

		this.y18n = y18n( {
			directory   : this.dir,
			updateFiles : false,
			locale      : await this.detectLocale(),
		} )
	
	}
	async detectLocale() {
  
		const locale = this.yargs.locale()
  
		try {

			return await this.fs.getObjectFromPath( this.dir, locale.substring( 0, 2 ) )
		
		} catch ( e ) {
 
			return this.defaltLocale
		
		}
  
		return locale
	
	}
  
	__( str: string ) {

		if( !this.y18n ) throw Error( 'You need init' )
		return this.y18n.__( str )
	
	}
  
	__n( singular: string, plural: string, count: number ) {

		if( !this.y18n ) throw Error( 'You need init' )
		return this.y18n.__n( singular, plural, count )
	
	}

}
