/**
 * FYLESYSTEM.
 *
 * @description File for set fylesystem functions.
 */
import {
	stat, readFile, writeFile, access, constants, mkdir, rm,
}                        from 'node:fs/promises'
import {
	join, resolve, 
}                        from 'node:path'
import { homedir }       from 'node:os'
import open, { openApp } from 'open'
import yaml              from 'js-yaml'
import toml              from 'toml'
import localStorage      from './localstorage'

export class Fs {

	localStorage = localStorage
	
	/**
	 * Joins path segments.
	 *
	 * @param   {...string} paths - Path segments to join.
	 * @returns {string}          - The joined path.
	 */
	join = join

	/**
	 * Resolves path segments into an absolute path.
	 *
	 * @param   {...string} paths - Path segments to resolve.
	 * @returns {string}          - The resolved absolute path.
	 */
	getAbsolutePath = resolve

	/**
	 * Opens a system file or URL.
	 *
	 * @param {string} target - The file path or URL to open.
	 */
	open = open

	/**
	 * Open an app. Cross-platform.
	 *
	 * @param {string} name - The app you want to open. Can be either builtin supported apps names or other name supported in platform.
	 */
	openApp = openApp

	#objectExts = {
		json : 'json',
		yml  : 'yml',
		yaml : 'yaml',
		toml : 'toml',
	}

	#validateHomeDir( path: string ){

		let resolvedPath: string = path
		if ( path.startsWith( '~/' ) ) {

			resolvedPath = path.replace( /^~(?=$|\/|\\)/, homedir() )
		
		}
		return this.getAbsolutePath( resolvedPath )
	
	}

	/**
	 * Removes a directory and its contents if it exists.
	 *
	 * @param {string} path - The path of the directory to remove.
	 * @throws {Error} If an error occurs while removing the directory.
	 * @example
	 * try {
	 *   await removeDir('./my/path')
	 * }catch(e){
	 *   console.log(e)
	 * }
	 *
	 */
	async removeDir( path: string ){

		try {

			path = this.#validateHomeDir( path )
			await rm( path, {
				recursive : true, 
				force     : true,
			} )
		
		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error removimg ${path}: ${ error.message }` )
		
		}
	
	}

	/**
	 * Removes a directory and its contents if it exists.
	 *
	 * @param {string} path - The path of the directory to remove.
	 * @throws {Error} If an error occurs while removing the directory.
	 * @example
	 * await removeDirIfExist('./my/path')
	 *
	 */
	async removeDirIfExist( path: string ){

		path         = this.#validateHomeDir( path )
		const exists = await this.existsDir( path )
		if( exists ) await this.removeDir( path )
	
	}

	/**
	 * Checks if the given path points to a directory.
	 *
	 * @param   {string}           path - The path to check.
	 * @returns {Promise<boolean>}      - A promise that resolves to true if the path points to a directory, otherwise false.
	 * @example
	 * const isDir = await isDirectory('./my/path')
	 *
	 */
	async isDirectory( path: string ){

		path        = this.#validateHomeDir( path )
		const stats = await stat( path )
		return stats.isDirectory()
	
	}

	/**
	 * Creates a directory at the specified path.
	 *
	 * @param {string} path - The path of the directory to create.
	 * @throws {Error} If an error occurs while creating the directory.
	 * @example
	 * await createDir('./my/dir')
	 *
	 */
	async createDir( path: string ) {

		try {

			path = this.#validateHomeDir( path )
			await mkdir( path, {
				recursive : true, 
			} )
		
		} catch ( error ) {

			throw Error( `Error al crear el directorio: ${error}` )
		
		}
	
	}

	/**
	 * Checks if a directory exists at the specified path.
	 *
	 * @param   {string}           path - The path to check.
	 * @returns {Promise<boolean>}      - A promise that resolves to true if a directory exists at the specified path, otherwise false.
	 * @example
	 * const exist = await existsDir('./my/dir')
	 *
	 */
	async existsDir( path: string ) {

		try {

			path = this.#validateHomeDir( path )
			await access( path, constants.F_OK )
			const stats = await stat( path )
			return stats.isDirectory() // Retorna true si es un directorio
		
		} catch ( error ) {

			// @ts-ignore
			if ( error.code === 'ENOENT' ) {

				return false // El directorio no existe
			
			} else {

				throw error // Ocurrió otro error
			
			}
		
		}
	
	}

	/**
	 * Checks if a file exists at the specified path.
	 *
	 * @param   {string}           path - The path to the file.
	 * @returns {Promise<boolean>}      - A promise that resolves to true if the file exists, otherwise false.
	 * @throws {Error} If an error occurs while checking the existence of the file.
	 * @example
	 * const existPKG = await existsFile('./package.json')
	 *
	 */
	async existsFile( path: string ) {

		try {

			path = this.#validateHomeDir( path )
			await access( path )
			const stats = await stat( path )
			return stats.isFile()
		
		} catch ( error ) {

			// @ts-ignore
			if ( error.code === 'ENOENT' ) {

				return false // File does not exist
			
			} else {

				throw error // Other error occurred
			
			}
		
		}
	
	}

	/**
	 * Writes content to a file at the specified path.
	 *
	 * @param {string}          path    - The path of the file to write to.
	 * @param {string | Buffer} content - The content to write to the file.
	 * @throws {Error} If an error occurs while writing to the file.
	 * @example
	 * await writeFile('./greetFile.txt', 'Hello')
	 *
	 */
	async writeFile( path: string, content: string | Buffer ) {

		path = this.#validateHomeDir( path )
		await writeFile( path, content )
    
	}

	/**
	 * Checks if a file or directory exists at the specified path.
	 *
	 * @param   {string}           path - The path to check.
	 * @returns {Promise<boolean>}      - A promise that resolves to true if a file or directory exists at the specified path, otherwise false.
	 * @throws {Error} If an error occurs while checking the existence of the path.
	 * @example
	 * const existPKG = await existsPath('./package.json')
	 *
	 */
	async existsPath( path: string ) {

		path         = this.#validateHomeDir( path )
		const isFile = await this.existsFile( path )
		if ( isFile ) return true
		const isDir = await this.existsDir( path )
		return isDir
	
	}

	/**
	 * Create an image file from a base64 string.
	 *
	 * @param {string} base64String - Base64 string representing the image.
	 * @param {string} outputPath   - Path to save the image file.
	 * @throws {Error} If the base64 string is invalid.
	 * @example
	 * const imageBuffer = await createImageFromBase64(base64String)
	 *
	 */
	async createImageFromBase64( base64String: string, outputPath: string ) {

		// Extract the content type and base64 data
		// eslint-disable-next-line no-useless-escape
		const matches = base64String.match( /^data:([A-Za-z-+\/]+);base64,(.+)$/ )
		// const contentType = matches[1]
		if ( !matches ) throw Error( 'Invalid base image' )
		const base64Data = matches[2]
	
		// Convert base64 to buffer
		const buffer = Buffer.from( base64Data, 'base64' )
	
		// Write the buffer to a file
		await this.writeFile( outputPath, buffer )

	}

	/**
	 * Fetch content from a URL to string.
	 *
	 * @param   {string}          url - URL of the resource.
	 * @returns {Promise<string>}     - The fetched content.
	 * @throws {Error} If there is an error fetching content from the URL.
	 * @example
	 * const imageData = await fetchContentToString('https://source.unsplash.com/random')
	 * console.log(imageData)
	 *
	 */
	async fetchContentToString( url: string ) {

		try {

			const response    = await fetch( url )
			const contentType = response.headers.get( 'content-type' )

			if ( contentType?.includes( 'image' ) ) {

				const buffer = Buffer.from( await response.arrayBuffer() )

				const base64String = buffer.toString( 'base64' )
				const dataUri      = `data:image/jpeg;base64,${base64String}`

				return dataUri
			
			} else {

				const text = await response.text()

				return text
			
			}
		
		} catch ( error ) {

			// @ts-ignore
			throw new Error( `Error fetching content from URL: ${error.message}` )
		
		}
		
	}

	/**
	 * Get object from a JSON file.
	 *
	 * @param   {string}                     path - Path to the JSON file.
	 * @returns {Promise<object | object[]>}      - The parsed JSON object.
	 * @throws {Error} If there is an error reading the JSON file.
	 * @example
	 * const objectFromJSON = await getObjectFromFile('/my/file.json')
	 * console.log( objectFromJSON )
	 *
	 */
	async getObjectFromJSONFile( path: string ){

		try {

			path                    = this.#validateHomeDir( path )
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
	 * @example
	 * const objectFromYAML = await getObjectFromFile('/my/file.yaml')
	 * console.log( objectFromYAML )
	 *
	 */
	async getObjectFromYAMLFile( path: string ){

		try {

			path                    = this.#validateHomeDir( path )
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
	 * @example
	 * const objectFromTOML = await getObjectFromFile('/my/file.toml')
	 * console.log(objectFromTOML)
	 *
	 */
	async getObjectFromTOMLFile( path: string ){

		try {

			path                    = this.#validateHomeDir( path )
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
	 * @example
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
	async getObjectFromFile( path: string ) {

		try {

			const exists = await this.existsFile( path )
			if( !exists ) throw Error( 'File does not exists' )

			let data
            
			if ( path.endsWith( '.' + this.#objectExts.json ) ) {

				data = await this.getObjectFromJSONFile( path )
			
			} else if ( path.endsWith( '.' + this.#objectExts.yml ) || path.endsWith( '.' + this.#objectExts.yaml ) ) {

				data = await this.getObjectFromYAMLFile( path )
			
			}else if ( path.endsWith( '.' + this.#objectExts.toml ) ) {

				data = await this.getObjectFromTOMLFile( path )
			
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
	 * @example
	 * const content = await getObjectFromPath('/my/directory', 'my-file-name')
	 * console.log( content )
	 *
	 */
	async getObjectFromPath( path: string, filename: string ) {

		try {

			const exts = Object.values( this.#objectExts )
			for ( let index = 0; index < exts.length; index++ ) {

				const ext      = exts[index]
				const filePath = this.join( path, filename + '.' + ext )
				const exists   = await this.existsFile( filePath )
				if( exists ){

					const data = await this.getObjectFromFile( filePath )

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
	 * @example
	 * // from YAML url
	 * const objectFromYamlUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
	 * // from JSON url
	 * const objectFromJsonUrl = await getObjectFromUrl( 'https://raw.githubusercontent.com/pigeonposse/clippo/main/package.json')
	 * 
	 * console.log( objectFromYamlUrl, objectFromJsonUrl )
	 *
	 */
	async getObjectFromUrl( url: string ) {

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
			
			const data = await this.fetchContentToString( url )

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
	 * @example
	 * const objectFromYamlUrl = await getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
	 * const objectFromJSON = await getObjectFrom('/my/file.json')
	 * console.log( objectFromYamlUrl, objectFromJSON )
	 *
	 */
	async getObjectFrom( input: string ): Promise<object> {
		
		try {

			if( input.startsWith( 'https://' ) || input.startsWith( 'https://' ) ) {

				const res = await this.getObjectFromUrl( input )
				return res
	
			}else {

				const res = await this.getObjectFromFile( input )
				return res
	
			}
		
		}catch( error ) {

			// @ts-ignore
			throw new Error( `Error getting data from ${input}: ${ error.message }` )
	
		}
	
	}

}
