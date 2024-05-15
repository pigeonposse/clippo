export const time = () => {
        
	let start: number | undefined, 
		stop: number | undefined

	return { 
		/**
		 * Start time measurement.
		 */
		start : () => {

			start = performance.now()
		
		},
		/**
		 * Stop time measurement.
		 */
		stop : () => {

			stop = performance.now()
		
		},
		/**
		 * Get result of time measurement.
		 *
		 * @returns {(number|false)} - Elapsed time or false if not available.
		 */
		getResult : () => {

			if( start && stop ) return stop - start
			return false
		
		},
	}

}
