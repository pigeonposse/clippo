export const time = () => {
        
	let start: number | undefined, 
		stop: number | undefined

	return { 

		/**
		 * Start time measurement. 
		 *
		 * @example
		 * time.start()
		 *
		 */
		start : () => {

			start = performance.now()
		
		},

		/**
		 * Stop time measurement.
		 *
		 * @example
		 * time.stop()
		 *
		 */
		stop : () => {

			stop = performance.now()
		
		},
		get : () => {

			const now = performance.now()
			if( start && now ) return now - start
			return 
		
		},
		/**
		 * Get result of time measurement.
		 *
		 * @returns {(number|false)} - Elapsed time or false if not available.
		 * @example
		 * const res = time.getResult()
		 *
		 */
		getResult : () => {

			if( start && stop ) return stop - start
			return false
		
		},
	}

}
