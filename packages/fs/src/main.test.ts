/**
 * Tests.
 *
 * @description File for set test functions.
 */

import {
	describe, it, expect, 
} from 'vitest'
import { Fs } from './main'

const fs                       = new Fs()
const { fetchContentToString } = fs
const path                     = './__test_dir'
const jsonDir                  = fs.getAbsolutePath( './' ) // absolute to execution process
const jsonFileName             = 'package'
const jsonFile                 = jsonFileName + '.json'
const tomlUrl                  = 'https://raw.githubusercontent.com/pigeonposse/super8/main/packages/app/src-tauri/Cargo.toml'
const ymlUrl                   = 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml'
const jsonUrl                  = 'https://raw.githubusercontent.com/pigeonposse/super8/main/package.json'
const imgUrl                   = 'https://source.unsplash.com/random'

describe( 'Fs - Directory', () => {

	it( 'should create check and remove directory successfully', async () => {

		// Arrange
		await fs.createDir( path )
	
		// Act
		const existsBeforeRemoval = await fs.existsDir( path )
		const isDir               = await fs.isDirectory( path )
		await fs.removeDirIfExist( path )
	
		// Assert
		expect( existsBeforeRemoval ).toBe( true )
		expect( isDir ).toBe( true )

	} )

	it( 'should throw error when checking directory on non-existing path', async () => {

		// Arrange
		const exist = await fs.existsDir( path )
		// Act & Assert
		expect( exist ).toBe( false )
		expect( async () => await fs.isDirectory( path ) ).rejects.toThrowError( )

	} )

} )

describe( 'FS - fetchContent', () => {

	it( 'should fetch text content from a URL', async () => {

		const url     = 'https://example.com'
		const content = await fetchContentToString( url )
		expect( typeof content ).toBe( 'string' )
		expect( content ).toContain( 'Example Domain' )
	
	} )
  
	it( 'should fetch base64-encoded image content from a URL', async () => {

		const content = await fetchContentToString( imgUrl )
		expect( typeof content ).toBe( 'string' )

		expect( content ).toMatch( /^data:image\/[a-zA-Z]*;base64,/ )
	
	} )
  
	it( 'should throw an error when URL is invalid', async () => {

		const url = 'https://invalidurl'
		await expect( fetchContentToString( url ) ).rejects.toThrow()
	
	} )

} )

describe( 'FS - get Object From Path', () => {

	it( 'should return data from a JSON file', async () => {

		const data = await fs.getObjectFromPath( jsonDir, jsonFileName )
		expect( typeof data ).toBe( 'object' )
	
	} )

} )

describe( 'FS - get Object From Url', () => {

	it( 'should return parsed YAML data from URL', async () => {
	
		const data = await fs.getObjectFromUrl( ymlUrl )
		expect( typeof data ).toBe( 'object' )
		// // @ts-ignore
		// expect( data.web[0].id ).toBe( 'super8' )
	
	} )

	it( 'should return parsed TOML data from URL', async () => {
	
		const data = await fs.getObjectFromUrl( tomlUrl )
		expect( typeof data ).toBe( 'object' )
		// // @ts-ignore
		// expect( data.package.name ).toBe( 'super8' )
	
	} )

	it( 'should return parsed JSON data from URL', async () => {
	
		const data = await fs.getObjectFromUrl( jsonUrl )
		expect( typeof data ).toBe( 'object' )
		// // @ts-ignore
		// expect( data.name ).toBe( 'super8' )
	
	} )

} )

describe( 'FS - get Object From Unkwon', () => {

	it( 'should return data from a JSON file AND (YAML, TOML, YAML) URL', async () => {

		expect( typeof await fs.getObjectFrom( fs.join( jsonDir, jsonFile ) ) ).toBe( 'object' )
		expect( typeof await fs.getObjectFrom( ymlUrl ) ).toBe( 'object' )
		expect( typeof await fs.getObjectFrom( tomlUrl ) ).toBe( 'object' )
		expect( typeof await fs.getObjectFrom( jsonUrl ) ).toBe( 'object' )
	
	} )

} )
