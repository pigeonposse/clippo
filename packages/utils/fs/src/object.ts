
import yaml from 'js-yaml'
import toml from 'toml'

import {
	existsFile,
	fetchContentToString,
	validateHomeDir,
	readFile,
	joinPath, 
} from './super'

const objectExts = {
	json : 'json',
	yml  : 'yml',
	yaml : 'yaml',
	toml : 'toml',
}

/**
 * Get object from a JSON file.
 *
 * @param   {string}                     path - Path to the JSON file.
 * @returns {Promise<object | object[]>}      - The parsed JSON object.
 * @throws {Error} If there is an error reading the JSON file.
 * @example import { getObjectFromJSONFile } from "@clippo/fs"
 * 
 * const object = await getObjectFromJSONFile('/my/file.json')
 * console.log( object )
 *
 */
export const getObjectFromJSONFile = async ( path: string )=>{

	try {

		path                    = validateHomeDir( path )
		const fileContentBuffer = await readFile( path )
		const fileContent       = fileContentBuffer.toString( 'utf8' )
		return JSON.parse( fileContent ) as object | object[]
		
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error reading JSON file ${path}: ${ error.message }` )
		
	}
	
}

/**
 * Get object from a YAML file.
 *
 * @param   {string}                     path - Path to the JSON file.
 * @returns {Promise<object | object[]>}      - The parsed JSON object.
 * @throws {Error} If there is an error reading the JSON file.
 * @example import { getObjectFromYAMLFile } from "@clippo/fs"
 * 
 * const object = await getObjectFromYAMLFile('/my/file.yaml')
 * console.log( object )
 *
 */
export const getObjectFromYAMLFile = async( path: string ) =>{

	try {

		path                    = validateHomeDir( path )
		const fileContentBuffer = await readFile( path )
		const fileContent       = fileContentBuffer.toString( 'utf8' )
		return yaml.load( fileContent ) as object | object[]
		
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error reading YAML file ${path}: ${ error.message }` )
		
	}
	
}

/**
 * Get object from a TOML file.
 *
 * @param   {string}                     path - Path to the JSON file.
 * @returns {Promise<object | object[]>}      - The parsed JSON object.
 * @throws {Error} If there is an error reading the JSON file.
 * @example import { getObjectFromTOMLFile } from "@clippo/fs"
 * 
 * const objectFromTOML = await getObjectFromTOMLFile('/my/file.toml')
 * console.log(objectFromTOML)
 *
 */
export const getObjectFromTOMLFile = async ( path: string ) =>{

	try {

		path                    = validateHomeDir( path )
		const fileContentBuffer = await readFile( path )
		const fileContent       = fileContentBuffer.toString( 'utf8' )
		return toml.parse( fileContent ) as object | object[]
		
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error reading TOML file ${path}: ${ error.message }` )
		
	}
	
}

/**
 * Retrieve an object from a file specified by path.
 * Supports JSON, YAML, and TOML formats.
 *
 * @param   {string}          path - Path to the file.
 * @returns {Promise<object>}      - The object retrieved from the file.
 * @throws {Error} If the file does not exist, or if the data is not an object.
 * @example import { getObjectFromFile } from "@clippo/fs"
 * 
 * const objectFromJSON = await getObjectFromFile('/my/file.json')
 * const objectFromYAML = await getObjectFromFile('/my/file.yaml')
 * const objectFromTOML = await getObjectFromFile('/my/file.toml')
 * 
 * console.log(
 *   objectFromJSON,
 *   objectFromYAML,
 *   objectFromTOML
 * )
 *
 */
export const getObjectFromFile = async ( path: string ) =>{

	try {

		const exists = await existsFile( path )
		if( !exists ) throw Error( 'File does not exists' )

		let data
            
		if ( path.endsWith( '.' + objectExts.json ) ) {

			data = await getObjectFromJSONFile( path )
			
		} else if ( path.endsWith( '.' + objectExts.yml ) || path.endsWith( '.' + objectExts.yaml ) ) {

			data = await getObjectFromYAMLFile( path )
			
		}else if ( path.endsWith( '.' + objectExts.toml ) ) {

			data = await getObjectFromTOMLFile( path )
			
		} else {

			throw new Error( 'Unsupported file format. Expected JSON, YAML or TOML.' )
			
		}
		if ( typeof data !== 'object' || data === null ) {

			throw new Error( 'Data is not an object.' )
			
		}
		return data as object 

	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error reading file ${path}: ${ error.message }` )
		
	}

}

/**
 * Retrieve an object from a file specified by path and filename.
 * Supports JSON, YAML, and TOML formats.
 *
 * @param   {string}                       path     - Path to the directory containing the file.
 * @param   {string}                       filename - Name of the file (without extension).
 * @returns { Promise<object | undefined>}          - The object retrieved from the file.
 * @throws {Error} If the file does not exist, or if the data is not an object.
 * @example import { getObjectFromPath } from "@clippo/fs"
 * 
 * const content = await getObjectFromPath('/my/directory', 'my-file-name')
 * console.log( content )
 *
 */
export const getObjectFromPath = async ( path: string, filename: string ) =>{

	try {

		const exts = Object.values( objectExts )
		for ( let index = 0; index < exts.length; index++ ) {

			const ext      = exts[ index ]
			const filePath = joinPath( path, filename + '.' + ext )
			const exists   = await existsFile( filePath )
			if( exists ){

				const data = await getObjectFromFile( filePath )

				return data
				
			}
			
		}
			
		throw Error( 'Path not exist' )
		
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error reading file ${path} with filename ${filename}: ${ error.message }` )
		
	}

}

/**
 * Retrieve an object from a URL.
 * Supports JSON, YAML, and TOML formats.
 *
 * @param   {string}          url - URL of the resource.
 * @returns {Promise<object>}     - The object retrieved from the URL.
 * @throws {Error} If there is an error fetching data from the URL or parsing the object.
 * @example import { getObjectFromUrl } from "@clippo/fs"
 * 
 * // from YAML url
 * const objectFromYamlUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
 * // from JSON url
 * const objectFromJsonUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/clippo/main/package.json')
 * 
 * console.log( objectFromYamlUrl, objectFromJsonUrl )
 *
 */
export const getObjectFromUrl = async ( url: string ) =>{

	try {

		const getObject = ( data: string ): object => {

			try {

				const r = JSON.parse( data ) as object
				return r
				
			}catch( e ){

				try {

					const r = yaml.load( data ) as object
					return r
					
				}catch( e ){

					try {

						const r = toml.parse( data ) as object
						return r
						
					}catch( e ){

						throw new Error( 'Cannot parse object' )
						
					}
					
				}
				
			}
			
		}
			
		const data = await fetchContentToString( url )

		const res = getObject( data )
			
		return res
		
	}catch( error ) {

		// @ts-ignore
		throw new Error( `Error getting data from ${url}: ${ error.message }` )
		
	}
	
}

/**
 * Retrieve an object from either a file specified by path or a URL.
 * Supports JSON, YAML, and TOML formats.
 *
 * @param   {string}          input - Path to a file or URL of the resource.
 * @returns {Promise<object>}       - The object retrieved from the file or URL.
 * @throws {Error} If there is an error fetching data or parsing the object.
 * @example import { getObjectFrom } from "@clippo/fs"
 * 
 * const objectFromYamlUrl = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
 * const objectFromJSON = await getObjectFrom('/my/file.json')
 * 
 * console.log( objectFromYamlUrl, objectFromJSON )
 *
 */
export const getObjectFrom = async ( input: string ): Promise<object> => {
		
	try {

		if( input.startsWith( 'https://' ) || input.startsWith( 'https://' ) ) {

			const res = await getObjectFromUrl( input )
			return res
	
		}else {

			const res = await getObjectFromFile( input )
			return res
	
		}
		
	}catch( error ) {

		// @ts-ignore
		throw new Error( `Error getting data from ${input}: ${ error.message }` )
	
	}
	
}
