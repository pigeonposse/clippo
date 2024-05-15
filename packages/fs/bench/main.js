/* eslint-disable no-unused-vars */
import { Fs }    from '@clippo/fs'
import { Bench } from 'tinybench'
const bench = new Bench( {
	time : 100, 
} )
const fs    = new Fs()
bench
	.add( 'getObjectFrom - Url', async () => {

		const result = await fs.getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
		//console.log( result )
	
	} )
	.add( 'getObjectFrom - Path', async () => {

		const result = await fs.getObjectFrom( './package.json' )
		//console.log( result )
	
	} )
	.add( 'getObjectFromPath', async () => {

		const result = await fs.getObjectFromPath( './','package' )
		//console.log( pkg )
	
	} )

await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run()
console.table( bench.table() )
