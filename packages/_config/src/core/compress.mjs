// @ts-nocheck
import {
	join, 
	basename, 
	extname, 
} from 'node:path'
import decompress      from 'decompress'
import decompressTargz from 'decompress-targz'
import {
	mkdir,
	readdir,
	rename, 
	rm, 
} from 'node:fs/promises'
import archiver from 'archiver'
import {
	createWriteStream, 
	existsSync, 
} from 'node:fs'

/**
 * Decompresses an archive file (zip, tar, tgz) to a specified output directory.
 *
 * @param {object}  options           - The options object.
 * @param {string}  options.input     - The path to the input compressed file.
 * @param {string}  options.output    - The directory where the file should be decompressed.
 * @param {string}  [options.newName] - The new name for the decompressed file or directory.
 * @param {boolean} [options.remove]  - Whether to remove the original compressed file after decompression.
 * @example decompressFile( {
  input   : join( __dirname, 'downloads', 'example-file.zip' ), // Path to the compressed file
  output  : join( __dirname, 'decompressed' ), // Directory where the file should be decompressed
  newName : 'renamed-decompressed-file', // New name for the decompressed file or directory (optional)
  remove  : true, // Remove the original compressed file after decompression
  } )
 */
export async function decompressFile( { input, output, newName, remove = false } ) {

	const ext            = extname( input ).toLowerCase()
	const outputFileName = newName || basename( input, ext )
	const outputPath     = join( output, outputFileName )

	try {

		if ( ext === '.zip' ) {

			await decompress( input, output, {
				strip : 1, 
			} )
			console.log( `File decompressed successfully to ${output}` )
		
		} else if ( ext === '.tar' || ext === '.tgz' || ext === '.gz' ) {

			await decompress( input, output, {
				plugins : [
					decompressTargz(),
				], strip : 1, 
			} )
			console.log( `File decompressed successfully to ${output}` )
		
		} else {

			throw new Error( `Unsupported file extension: ${ext}` )
		
		}

		if ( newName ) {

			await rename( join( output, basename( input, ext ) ), outputPath )
			console.log( `File renamed successfully to ${outputPath}` )
		
		}

		if ( remove ) {

			await rm( input )
			console.log( `Original file ${input} removed successfully` )
		
		}
	
	} catch ( error ) {

		// @ts-ignore
		console.error( `Error during decompression: ${error.message}` )
	
	}

}

/**
 * Zips the files in the specified source directory and saves them to the output directory.
 *
 * @param {string} sourceDirectory - The path to the source directory containing files to zip.
 * @param {string} outputDirectory - The path to the output directory where zip files will be saved.
 */
export const zipFilesInDirectory = async ( sourceDirectory, outputDirectory ) => {

	// Function to filter out invisible files
	const filter = file => !( /(^|\/)\.[^\\/\\.]/g ).test( file )

	console.log( {
		name : 'Zip binary',
		data : {
			input  : sourceDirectory,
			output : outputDirectory,
		},
	} )

	// Check if directory paths are provided
	if ( !sourceDirectory || !outputDirectory ) {

		throw new Error( 'Please provide both source directory and output directory paths as arguments.' )
	
	}

	// Ensure that the output directory exists or create it if it doesn't
	if ( !existsSync( outputDirectory ) ) {

		await mkdir( outputDirectory, {
			recursive : true, 
		} )
	
	}
	const createZipForFile = file => {

		return new Promise( ( resolve, reject ) => {

			const sourceFilePath = join( sourceDirectory, file )
			const zipName        = `${file}.zip`
			const output         = createWriteStream( join( outputDirectory, zipName ) )
			const archive        = archiver( 'zip', {
				zlib : {
					level : 9, 
				}, // Maximum compression level
			} )

			output.on( 'close', () => {

				console.log( `${zipName} created successfully` )
				resolve()
	
			} )

			archive.on( 'error', err => {

				console.error( `Error creating ${zipName}:`, err )
				reject( err )
	
			} )

			archive.pipe( output )
			archive.file( sourceFilePath, {
				name : file, 
			} )
	
			archive.finalize()
		
		} )

	}
	
	try {

		// Read the source directory
		const files = await readdir( sourceDirectory )
	
		// Filter out invisible files
		const visibleFiles = files.filter( filter )
	
		// Create a ZIP file for each visible file
		await Promise.all( visibleFiles.map( createZipForFile ) )

	} catch ( error ) {

		console.error( 'Error processing files:', error )
		throw error

	}

}
