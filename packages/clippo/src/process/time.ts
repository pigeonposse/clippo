export const time = () => {
        
	let start: number | undefined, 
		stop: number | undefined

	return { 
		/**
		 * Start time measurement.
		 *
		 * @example
		 *
		 */
		start : () => {

			start = performance.now()
		
		},
		/**
		 * Stop time measurement.
		 *
		 * @example
		 *
		 */
		stop : () => {

			stop = performance.now()
		
		},
		/**
		 * Get result of time measurement.
		 *
		 * @returns {(number|false)} - Elapsed time or false if not available.
		 * @example
		 *
		 */
		getResult : () => {

			if( start && stop ) return stop - start
			return false
		
		},
	}

}
