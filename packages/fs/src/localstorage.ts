import { LocalStorage } from 'node-localstorage'

/**
 * Creates a new instance of LocalStorage with the specified location.
 *
 * @param   {string}       location - The location where the local storage data will be stored.
 * @returns {LocalStorage}          - A new instance of LocalStorage.
 * @see https://www.npmjs.com/package/node-localstorage
 * @example
 * const storage = localstorage('./myStorage'); // Creates a local storage instance in the './myStorage' directory
 * storage.setItem('key', 'value'); // Sets an item in the local storage
 * const value = storage.getItem('key'); // Retrieves the value of the item from the local storage
 *
 */
export default function localstorage( location: string ){

	return new LocalStorage( location )

}
