/**
 * FYLESYSTEM.
 *
 * File for set fylesystem functions.
 *
 */

import {
	stat,
	writeFile,
	access,
	constants,
	readFile as nodeReadFile,
	mkdir,
	rm,
} from 'node:fs/promises'
import { homedir } from 'node:os'
import {
	join,
	resolve, 
} from 'node:path'

/**
 * Joins path segments.
 *
 * @param   {...string} paths - Path segments to join.
 * @returns {string}          - The joined path.
 * @example joinPath('user', 'pigeonposse')
 *
 */
export function joinPath( ...paths: string[] ): string {

	return join( ...paths )

}

/**
 * Resolves path segments into an absolute path.
 *
 * @param   {...string} paths - Path segments to resolve.
 * @returns {string}          - The resolved absolute path.
 */
export const getAbsolutePath = resolve

/**
 * Validates and resolves a path with home directory replacement.
 *
 * @param   {string} path - The path to validate and resolve.
 * @returns {string}      - The validated and resolved absolute path.
 * @example 
 * import { validateHomeDir } from '@clippo/fs'
 * 
 * const path = validateHomeDir('~/Documents') 
 *
 * console.log(path) // returns: /users/{username}/Documents
 * 
 * const path = validateHomeDir('/Home') 
 *
 * console.log(path) // returns same: /Home 
 *
 */
export function validateHomeDir( path: string ): string {

	let resolvedPath: string = path
	if ( path.startsWith( '~/' ) ) {

		resolvedPath = path.replace( /^~(?=$|\/|\\)/, homedir() )
	
	}
	return getAbsolutePath( resolvedPath )

}

/**
 * Reads the content of a file at the specified path.
 *
 * @param   {string}                   path - The path of the file to read.
 * @returns {Promise<string | Buffer>}      - A promise that resolves to the content of the file as a string or buffer.
 * @throws {Error} If an error occurs while reading the file.
 * @example import { readFile } from '@clippo/fs'
 * 
 * try {
 *   const content = await readFile('./example.txt');
 *   console.log(content);
 * } catch (error) {
 *   console.error('Error reading file:', error);
 * }
 *
 */
export const readFile = nodeReadFile

/**
 * Removes a directory and its contents if it exists.
 *
 * @param {string} path - The path of the directory to remove.
 * @throws {Error} If an error occurs while removing the directory.
 * @example import { removeDir } from '@clippo/fs'
 * 
 * try {
 *   await removeDir('./my/path')
 * } catch (e) {
 *   console.log(e)
 * }
 *
 */
export async function removeDir( path: string ): Promise<void> {

	try {

		path = validateHomeDir( path )
		await rm( path, {
			recursive : true,
			force     : true,
		} )
	
	} catch ( error ) {

		// @ts-ignore
		throw new Error( `Error removing ${path}: ${error.message}` )
	
	}

}

/**
 * Removes a directory and its contents if it exists.
 *
 * @param {string} path - The path of the directory to remove.
 * @throws {Error} If an error occurs while removing the directory.
 * @example import { removeDirIfExist } from '@clippo/fs'
 * 
 * await removeDirIfExist('./my/path')
 *
 */
export async function removeDirIfExist( path: string ): Promise<void> {

	path         = validateHomeDir( path )
	const exists = await existsDir( path )
	if ( exists ) await removeDir( path )

}

/**
 * Checks if the given path points to a directory.
 *
 * @param   {string}           path - The path to check.
 * @returns {Promise<boolean>}      - A promise that resolves to true if the path points to a directory, otherwise false.
 * @example import { isDirectory } from '@clippo/fs'
 * 
 * const isDir = await isDirectory('./my/path')
 *
 */
export async function isDirectory( path: string ): Promise<boolean> {

	path        = validateHomeDir( path )
	const stats = await stat( path )
	return stats.isDirectory()

}

/**
 * Creates a directory at the specified path.
 *
 * @param {string} path - The path of the directory to create.
 * @throws {Error} If an error occurs while creating the directory.
 * @example import { createDir } from '@clippo/fs'
 * await createDir('./my/dir')
 *
 */
export async function createDir( path: string ): Promise<void> {

	try {

		path = validateHomeDir( path )
		await mkdir( path, { recursive: true } )
	
	} catch ( error ) {

		throw Error( `Error creating the directory: ${error}` )
	
	}

}

/**
 * Checks if a directory exists at the specified path.
 *
 * @param   {string}           path - The path to check.
 * @returns {Promise<boolean>}      - A promise that resolves to true if a directory exists at the specified path, otherwise false.
 * @example import { existsDir } from '@clippo/fs'
 * const exist = await existsDir('./my/dir')
 *
 */
export async function existsDir( path: string ): Promise<boolean> {

	try {

		path = validateHomeDir( path )
		await access( path, constants.F_OK )
		const stats = await stat( path )
		return stats.isDirectory() // Returns true if it is a directory
	
	} catch ( error ) {

		// @ts-ignore
		if ( error.code === 'ENOENT' ) {

			return false // Directory does not exist
		
		} else {

			throw error // Other error occurred
		
		}
	
	}

}

/**
 * Checks if a file exists at the specified path.
 *
 * @param   {string}           path - The path to the file.
 * @returns {Promise<boolean>}      - A promise that resolves to true if the file exists, otherwise false.
 * @throws {Error} If an error occurs while checking the existence of the file.
 * @example import { existsFile } from '@clippo/fs'
 * 
 * const existPKG = await existsFile('./package.json')
 *
 */
export async function existsFile( path: string ): Promise<boolean> {

	try {

		path = validateHomeDir( path )
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
 * @example import { writeFile } from '@clippo/fs'
 * 
 * await writeFile('./greetFile.txt', 'Hello')
 *
 */
export async function writeFileContent( path: string, content: string | Buffer ): Promise<void> {

	path = validateHomeDir( path )
	await writeFile( path, content )

}

/**
 * Checks if a file or directory exists at the specified path.
 *
 * @param   {string}           path - The path to check.
 * @returns {Promise<boolean>}      - A promise that resolves to true if a file or directory exists at the specified path, otherwise false.
 * @throws {Error} If an error occurs while checking the existence of the path.
 * @example import { existsPath } from '@clippo/fs'
 * 
 * const existPKG = await existsPath('./package.json')
 *
 */
export async function existsPath( path: string ): Promise<boolean> {

	path         = validateHomeDir( path )
	const isFile = await existsFile( path )
	if ( isFile ) return true
	const isDir = await existsDir( path )
	return isDir

}

/**
 * Create an image file from a base64 string.
 *
 * @param {string} base64String - Base64 string representing the image.
 * @param {string} outputPath   - Path to save the image file.
 * @throws {Error} If the base64 string is invalid.
 * @example import { createImageFromBase64 } from '@clippo/fs'
 * const imageBuffer = await createImageFromBase64(base64String)
 *
 */
export async function createImageFromBase64( base64String: string, outputPath: string ): Promise<void> {

	// Extract the content type and base64 data
	// eslint-disable-next-line no-useless-escape
	const matches = base64String.match( /^data:([A-Za-z-+\/]+);base64,(.+)$/ )
	// const contentType = matches[1]
	if ( !matches ) throw Error( 'Invalid base image' )
	const base64Data = matches[ 2 ]

	// Convert base64 to buffer
	const buffer = Buffer.from( base64Data, 'base64' )

	// Write the buffer to a file
	await writeFileContent( outputPath, buffer )

}

/**
 * Fetch content from a URL to string.
 *
 * @param   {string}          url - URL of the resource.
 * @returns {Promise<string>}     - The fetched content.
 * @throws {Error} If there is an error fetching content from the URL.
 * @example import { fetchContentToString } from '@clippo/fs'
 * 
 * const imageData = await fetchContentToString('https://source.unsplash.com/random')
 * console.log(imageData)
 *
 */
export async function fetchContentToString( url: string ): Promise<string> {

	try {

		const response    = await fetch( url )
		const contentType = response.headers.get( 'content-type' )

		if ( contentType?.includes( 'image' ) ) {

			const buffer       = Buffer.from( await response.arrayBuffer() )
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

