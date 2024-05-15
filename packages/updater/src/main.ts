import { color }               from '@clippo/styles'
import updateNotifier          from 'update-notifier'
import type { UpdaterOptions } from './types'

/**
 * Export types that can be used from outside.
 *
 */
export { UpdaterOptions }

/**
 * Checks for updates of a package and notifies the user.
 *
 * @param   {UpdaterOptions}  opts - Options for the updater.
 * @returns {Promise<object>}      - A promise that resolves to an object with functions for notification and accessing update data.
 * @example
 * // Simple usage:
 * import {name. version } from './package.json' assert {type: 'json'};
 * const { notify, updateData } = await updater( { name, version } );
 * // Display an update notification if an update is available
 * notify();
 * // Print update data wherever you want
 * if( updateData ) console.log(`Update available: ${updateData.latest} for ${updateData.name}`)
 *
 */
export const updater = async ( opts: UpdaterOptions ) => {

	const name           = '`{packageName}`'
	const currentVersion = '`{currentVersion}`'
	const latestVersion  = '`{latestVersion}`'
	const updateCommand  = '`{updateCommand}`'

	const message = (): string => {

		if ( opts.message ) 
			return opts.message( {
				name,
				currentVersion,
				latestVersion,
				updateCommand,
			} )

		return `${color.red( currentVersion )} → ${color.green( latestVersion )}\n\n${updateCommand}`
	
	}

	const up = await updateNotifier( {
		pkg : {
			name    : opts.name,
			version : opts.version,
		},
	} )

	return {
		/**
		 * Displays the update notification. 
		 *
		 * @returns {void} - Nothing is returned.
		 * @example
		 *   import {name. version } from './package.json' assert {type: 'json'};
		 * const { notify } = await updater( { name, version } );
		 * // Display an update notification if an update is available
		 * notify();
		 *
		 */
		notify : (): void =>
			up.notify( {
				message      : message(),
				boxenOptions : {
					title          : 'Update available',
					textAlignment  : 'center',
					titleAlignment : 'center',
					padding        : 1,
					margin         : 1,
					borderColor    : 'yellow',
					borderStyle    : 'round',
					...( opts.box && typeof opts.box === 'object' ? opts.box : {} ),
				},
			} ),
		/** Returns the update data. */
		updateData : up.update,
	}

}
