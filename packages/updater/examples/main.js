// import { updater } from '@clippo/updater'
import { updater } from '../dist/main.js'

const { notify, updateData } = await updater( {
	name : '@clippo/updater', version : '0.0.1', 
} )

console.log( updateData )
// Display an update notification if an update is available
notify()
// Print update data wherever you want
if( updateData ) console.log( `Update available: ${updateData.latest} for ${updateData.name}` )
